import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Search, Send, AlertTriangle,
  CheckCircle, Bot, User, ChevronRight, RefreshCw
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  phone: string;
  direction: 'inbound' | 'outbound';
  message: string;
  handled_by: 'agent' | 'human';
  is_escalated: boolean;
  created_at: string;
}

interface CustomerThread {
  phone: string;
  name: string;
  tier: string | null;
  lastMessage: string;
  lastTime: string;
  hasEscalation: boolean;
  escalationId: string | null;
  filter: 'agent' | 'human' | 'mixed';
}

const TIER_COLORS: Record<string, string> = {
  Trial: 'bg-amber-50 text-amber-600',
  Starter: 'bg-blue-50 text-blue-600',
  Complete: 'bg-purple-50 text-purple-600',
  Pro: 'bg-emerald-50 text-emerald-600',
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = diffMs / 3600000;
  if (diffH < 1) return `${Math.floor(diffMs / 60000)}m lalu`;
  if (diffH < 24) return `${Math.floor(diffH)}j lalu`;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export default function WACenter() {
  const [threads, setThreads] = useState<CustomerThread[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Eskalasi' | 'Agent' | 'Manual'>('Semua');
  const [loading, setLoading] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [isResolvingEscalation, setIsResolvingEscalation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---- Data Loading ----
  const loadThreads = async () => {
    setLoading(true);
    try {
      // Ambil semua percakapan terbaru per phone
      const { data: convos } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      // Ambil customers & escalations
      const { data: customers } = await supabase.from('customers').select('phone, name, tier');
      const { data: escalations } = await supabase
        .from('escalations')
        .select('phone, id, status')
        .eq('status', 'open');

      const customerMap: Record<string, { name: string; tier: string | null }> = {};
      (customers || []).forEach(c => { customerMap[c.phone] = { name: c.name, tier: c.tier }; });

      const escalationMap: Record<string, string> = {};
      (escalations || []).forEach(e => { escalationMap[e.phone] = e.id; });

      // Group by phone
      const phoneMap: Record<string, CustomerThread> = {};
      (convos || []).forEach((msg: Message) => {
        if (!phoneMap[msg.phone]) {
          const customer = customerMap[msg.phone];
          // Determine filter type for this thread
          const handledByTypes = (convos || [])
            .filter((m: Message) => m.phone === msg.phone)
            .map((m: Message) => m.handled_by);
          const hasHuman = handledByTypes.includes('human');
          const hasAgent = handledByTypes.includes('agent');
          const filter = hasHuman && hasAgent ? 'mixed' : hasHuman ? 'human' : 'agent';

          phoneMap[msg.phone] = {
            phone: msg.phone,
            name: customer?.name || msg.phone,
            tier: customer?.tier || null,
            lastMessage: msg.message,
            lastTime: msg.created_at,
            hasEscalation: !!escalationMap[msg.phone],
            escalationId: escalationMap[msg.phone] || null,
            filter
          };
        }
      });

      setThreads(Object.values(phoneMap));
    } catch (err) {
      console.error('Error loading threads:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (phone: string) => {
    setLoadingMsgs(true);
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .eq('phone', phone)
      .order('created_at', { ascending: true });
    setMessages(data || []);
    setLoadingMsgs(false);
  };

  // ---- Realtime ----
  useEffect(() => {
    loadThreads();

    const channel = supabase
      .channel('wa-center-conversations')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'conversations'
      }, () => {
        loadThreads();
        if (selectedPhone) loadMessages(selectedPhone);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    if (selectedPhone) loadMessages(selectedPhone);
  }, [selectedPhone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ---- Actions ----
  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedPhone || isSending) return;
    setIsSending(true);
    try {
      const response = await fetch('/api/agent/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: selectedPhone, message: replyText.trim(), sent_by: 'human' })
      });
      if (response.ok) {
        setReplyText('');
        await loadMessages(selectedPhone);
        await loadThreads();
      } else {
        const err = await response.json();
        alert('Gagal kirim: ' + (err.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleResolveEscalation = async (escalationId: string) => {
    setIsResolvingEscalation(true);
    await supabase
      .from('escalations')
      .update({ status: 'resolved', resolved_by: 'human', resolved_at: new Date().toISOString() })
      .eq('id', escalationId);
    await loadThreads();
    setIsResolvingEscalation(false);
  };

  // ---- Filtered Threads ----
  const filtered = threads.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm);
    const matchFilter =
      activeFilter === 'Semua' ||
      (activeFilter === 'Eskalasi' && t.hasEscalation) ||
      (activeFilter === 'Agent' && t.filter === 'agent') ||
      (activeFilter === 'Manual' && t.filter === 'human');
    return matchSearch && matchFilter;
  });

  const selectedThread = threads.find(t => t.phone === selectedPhone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WA Center</h1>
          <p className="text-gray-500">Monitor percakapan WhatsApp, tangani eskalasi, dan balas manual.</p>
        </div>
        <button
          onClick={loadThreads}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Split Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex" style={{ height: '72vh' }}>

        {/* ---- LEFT PANEL ---- */}
        <div className="w-80 flex-shrink-0 border-r border-gray-100 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau nomor..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-mint-fresh"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {(['Semua', 'Eskalasi', 'Agent', 'Manual'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 py-2.5 text-xs font-bold whitespace-nowrap transition-colors ${
                  activeFilter === tab
                    ? 'text-mint-fresh border-b-2 border-mint-fresh bg-mint-fresh/5'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {tab === 'Eskalasi' && threads.filter(t => t.hasEscalation).length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {threads.filter(t => t.hasEscalation).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-400 text-sm">Memuat percakapan...</div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">Tidak ada percakapan.</div>
            ) : (
              filtered.map(thread => (
                <button
                  key={thread.phone}
                  onClick={() => setSelectedPhone(thread.phone)}
                  className={`w-full text-left px-4 py-3.5 border-b border-gray-50 transition-colors flex items-start gap-3 ${
                    selectedPhone === thread.phone ? 'bg-mint-fresh/5 border-l-2 border-l-mint-fresh' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500 font-bold text-sm">
                    {thread.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-semibold text-gray-900 text-sm truncate">{thread.name}</span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{formatTime(thread.lastTime)}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-1.5 truncate">{thread.phone}</div>
                    <p className="text-xs text-gray-500 truncate">{thread.lastMessage.slice(0, 45)}{thread.lastMessage.length > 45 ? '...' : ''}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {thread.hasEscalation && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">ESKALASI</span>
                      )}
                      {thread.tier && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${TIER_COLORS[thread.tier] || 'bg-gray-100 text-gray-500'}`}>
                          {thread.tier}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ---- RIGHT PANEL ---- */}
        <div className="flex-1 flex flex-col min-w-0">
          {!selectedPhone ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
              <MessageCircle size={40} className="opacity-30" />
              <p className="text-sm font-medium">Pilih percakapan untuk mulai</p>
            </div>
          ) : (
            <>
              {/* Thread Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{selectedThread?.name || selectedPhone}</div>
                  <div className="text-xs text-gray-400">{selectedPhone}</div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedThread?.tier && (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${TIER_COLORS[selectedThread.tier] || 'bg-gray-100 text-gray-500'}`}>
                      {selectedThread.tier}
                    </span>
                  )}
                </div>
              </div>

              {/* Escalation Banner */}
              {selectedThread?.hasEscalation && selectedThread.escalationId && (
                <div className="mx-4 mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-semibold">Customer ini dalam status eskalasi</span>
                  </div>
                  <button
                    onClick={() => handleResolveEscalation(selectedThread.escalationId!)}
                    disabled={isResolvingEscalation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-60"
                  >
                    <CheckCircle size={14} />
                    {isResolvingEscalation ? 'Memproses...' : 'Tandai Selesai'}
                  </button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loadingMsgs ? (
                  <div className="text-center text-gray-400 text-sm py-8">Memuat pesan...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8">Belum ada pesan.</div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === 'inbound' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[70%] ${msg.direction === 'inbound' ? 'items-start' : 'items-end'} flex flex-col gap-1`}>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.direction === 'inbound'
                              ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                              : msg.handled_by === 'agent'
                              ? 'bg-mint-fresh/10 text-teal-800 rounded-tr-sm border border-mint-fresh/20'
                              : 'bg-gray-700 text-white rounded-tr-sm'
                          }`}
                        >
                          {msg.message}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 px-1">
                          {msg.direction === 'outbound' && (
                            <>
                              {msg.handled_by === 'agent' ? (
                                <><Bot size={10} /><span>Agent Nadia</span></>
                              ) : (
                                <><User size={10} /><span>Karyawan</span></>
                              )}
                              <span>·</span>
                            </>
                          )}
                          <span>{new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-3 items-end">
                  <textarea
                    rows={2}
                    placeholder="Ketik balasan manual..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh resize-none transition-colors"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || isSending}
                    className="flex items-center gap-2 px-5 py-3 bg-mint-fresh text-white font-bold rounded-xl text-sm hover:bg-mint-fresh/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-mint-fresh/20 flex-shrink-0"
                  >
                    <Send size={16} />
                    {isSending ? 'Mengirim...' : 'Kirim'}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 px-1">Enter untuk kirim · Shift+Enter untuk baris baru</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
