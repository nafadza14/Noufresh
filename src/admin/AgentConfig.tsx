import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, Save, ToggleLeft, ToggleRight, Tag, X,
  Plus, Send, RefreshCw, BookOpen, MessageSquare, Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Config {
  agent_enabled: string;
  system_prompt: string;
  knowledge_base: string;
  escalation_keywords: string;
}

export default function AgentConfig() {
  const [config, setConfig] = useState<Config>({
    agent_enabled: 'true',
    system_prompt: '',
    knowledge_base: '',
    escalation_keywords: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  // Chip input state
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const keywordInputRef = useRef<HTMLInputElement>(null);

  // Preview/Test state
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // Load config
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('agent_config')
        .select('config_key, config_value');

      const configObj: Partial<Config> = {};
      (data || []).forEach(row => {
        configObj[row.config_key as keyof Config] = row.config_value;
      });

      const merged: Config = {
        agent_enabled: configObj.agent_enabled || 'true',
        system_prompt: configObj.system_prompt || '',
        knowledge_base: configObj.knowledge_base || '',
        escalation_keywords: configObj.escalation_keywords || ''
      };

      setConfig(merged);
      setKeywords(
        merged.escalation_keywords
          ? merged.escalation_keywords.split(',').map(k => k.trim()).filter(Boolean)
          : []
      );
    } catch (err) {
      console.error('Error loading config:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (key: keyof Config, value: string) => {
    setSaving(key);
    try {
      const { error } = await supabase
        .from('agent_config')
        .update({ config_value: value, updated_at: new Date().toISOString() })
        .eq('config_key', key);

      if (error) throw error;
      setConfig(prev => ({ ...prev, [key]: value }));
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } catch (err: any) {
      alert('Gagal simpan: ' + err.message);
    } finally {
      setSaving(null);
    }
  };

  const handleToggleAgent = () => {
    const newVal = config.agent_enabled === 'true' ? 'false' : 'true';
    saveConfig('agent_enabled', newVal);
  };

  const handleAddKeyword = () => {
    const kw = newKeyword.trim().toLowerCase();
    if (!kw || keywords.includes(kw)) return;
    const updated = [...keywords, kw];
    setKeywords(updated);
    setNewKeyword('');
    saveConfig('escalation_keywords', updated.join(','));
    keywordInputRef.current?.focus();
  };

  const handleRemoveKeyword = (kw: string) => {
    const updated = keywords.filter(k => k !== kw);
    setKeywords(updated);
    saveConfig('escalation_keywords', updated.join(','));
  };

  const handleTestAgent = async () => {
    if (!testMessage.trim()) return;
    setIsTesting(true);
    setTestResponse('');
    try {
      const systemPrompt = `${config.system_prompt}\n\nInformasi Produk:\n${config.knowledge_base}`;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: testMessage }]
        })
      });

      if (!res.ok) {
        // Fallback: call our own API
        const fallbackRes = await fetch('/api/agent/reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: 'test-preview', message: testMessage, sent_by: 'preview' })
        });
        const fb = await fallbackRes.json();
        setTestResponse(fb.error ? 'Perlu ANTHROPIC_API_KEY untuk test preview.' : testMessage);
      } else {
        const data = await res.json();
        setTestResponse(data.content?.[0]?.text || 'Tidak ada respons.');
      }
    } catch (err: any) {
      setTestResponse('Tidak dapat menghubungi Claude API. Pastikan ANTHROPIC_API_KEY sudah diset di environment.');
    } finally {
      setIsTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <RefreshCw size={16} className="animate-spin" /> Memuat konfigurasi agent...
        </div>
      </div>
    );
  }

  const isEnabled = config.agent_enabled === 'true';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Config</h1>
        <p className="text-gray-500">Kelola kepribadian, pengetahuan, dan perilaku AI agent Nadia.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (main settings) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. Toggle Agent Status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50 mb-5">
              <div className={`p-2 rounded-lg ${isEnabled ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                <Bot size={20} className={isEnabled ? 'text-emerald-500' : 'text-gray-400'} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Status Agent</h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Agent saat ini: <span className={isEnabled ? 'text-emerald-600' : 'text-red-500'}>
                    {isEnabled ? 'AKTIF' : 'NONAKTIF'}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {isEnabled
                    ? 'Semua pesan WA masuk akan dibalas otomatis oleh Nadia.'
                    : 'Agent dimatikan. Karyawan harus balas manual via WA Center.'}
                </p>
              </div>
              <button
                onClick={handleToggleAgent}
                disabled={saving === 'agent_enabled'}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isEnabled
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isEnabled ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                {saving === 'agent_enabled' ? 'Menyimpan...' : (isEnabled ? 'Nonaktifkan' : 'Aktifkan')}
              </button>
            </div>
          </div>

          {/* 2. System Prompt */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50 mb-5">
              <div className="p-2 bg-violet-50 rounded-lg"><MessageSquare size={20} className="text-violet-500" /></div>
              <h2 className="text-lg font-bold text-gray-900">Karakter & Kepribadian Agent</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Tulis siapa agent ini, bagaimana cara bicaranya, apa yang boleh dan tidak boleh dikatakan.
            </p>
            <textarea
              rows={8}
              value={config.system_prompt}
              onChange={e => setConfig(prev => ({ ...prev, system_prompt: e.target.value }))}
              placeholder="Contoh: Kamu adalah Nadia, konsultan perawatan behel dari Noufresh Care..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh resize-none transition-all leading-relaxed"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => saveConfig('system_prompt', config.system_prompt)}
                disabled={saving === 'system_prompt'}
                className="flex items-center gap-2 px-5 py-2.5 bg-mint-fresh text-white font-bold text-sm rounded-xl hover:bg-mint-fresh/90 transition-colors shadow-md shadow-mint-fresh/20 disabled:opacity-60"
              >
                <Save size={15} />
                {saving === 'system_prompt' ? 'Menyimpan...' : saved === 'system_prompt' ? 'Tersimpan!' : 'Simpan'}
              </button>
            </div>
          </div>

          {/* 3. Knowledge Base */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50 mb-5">
              <div className="p-2 bg-blue-50 rounded-lg"><BookOpen size={20} className="text-blue-500" /></div>
              <h2 className="text-lg font-bold text-gray-900">Informasi Produk & FAQ</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Semua info produk, cara pakai, pertanyaan umum beserta jawaban, kontraindikasi.
            </p>
            <textarea
              rows={10}
              value={config.knowledge_base}
              onChange={e => setConfig(prev => ({ ...prev, knowledge_base: e.target.value }))}
              placeholder="Contoh: Produk Noufresh Care dirancang khusus untuk pemilik behel. Trial 14 hari..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh resize-none transition-all leading-relaxed"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={() => saveConfig('knowledge_base', config.knowledge_base)}
                disabled={saving === 'knowledge_base'}
                className="flex items-center gap-2 px-5 py-2.5 bg-mint-fresh text-white font-bold text-sm rounded-xl hover:bg-mint-fresh/90 transition-colors shadow-md shadow-mint-fresh/20 disabled:opacity-60"
              >
                <Save size={15} />
                {saving === 'knowledge_base' ? 'Menyimpan...' : saved === 'knowledge_base' ? 'Tersimpan!' : 'Simpan'}
              </button>
            </div>
          </div>

          {/* 4. Escalation Keywords */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50 mb-5">
              <div className="p-2 bg-red-50 rounded-lg"><Zap size={20} className="text-red-500" /></div>
              <h2 className="text-lg font-bold text-gray-900">Kata Trigger Eskalasi</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Jika pesan customer mengandung kata-kata ini, percakapan akan dieskalasi ke karyawan dan agent berhenti membalas.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[44px] p-3 bg-gray-50 border border-gray-200 rounded-xl">
              {keywords.length === 0 && (
                <span className="text-gray-300 text-sm">Belum ada kata trigger...</span>
              )}
              {keywords.map(kw => (
                <span
                  key={kw}
                  className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full"
                >
                  {kw}
                  <button
                    onClick={() => handleRemoveKeyword(kw)}
                    className="hover:text-red-900 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add keyword input */}
            <div className="flex gap-2">
              <input
                ref={keywordInputRef}
                type="text"
                value={newKeyword}
                onChange={e => setNewKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddKeyword()}
                placeholder="Ketik kata, tekan Enter atau klik Tambah..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-mint-fresh"
              />
              <button
                onClick={handleAddKeyword}
                disabled={!newKeyword.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-40"
              >
                <Plus size={15} /> Tambah
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (preview & test) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50 mb-5">
              <div className="p-2 bg-mint-fresh/10 rounded-lg"><Bot size={20} className="text-mint-fresh" /></div>
              <h2 className="text-lg font-bold text-gray-900">Preview & Test</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Simulasikan pesan customer dan lihat bagaimana Nadia akan merespons dengan konfigurasi saat ini.
            </p>

            <textarea
              rows={4}
              value={testMessage}
              onChange={e => setTestMessage(e.target.value)}
              placeholder="Contoh: Kak, produk noufresh aman ga buat behel metal?"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh resize-none mb-3"
            />

            <button
              onClick={handleTestAgent}
              disabled={!testMessage.trim() || isTesting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-mint-fresh text-white font-bold text-sm rounded-xl hover:bg-mint-fresh/90 transition-colors shadow-md shadow-mint-fresh/20 disabled:opacity-50"
            >
              <Send size={15} />
              {isTesting ? 'Memproses...' : 'Test Agent'}
            </button>

            {testResponse && (
              <div className="mt-4">
                <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                  <Bot size={12} className="text-mint-fresh" /> Respons Nadia:
                </div>
                <div className="bg-mint-fresh/5 border border-mint-fresh/20 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                  {testResponse}
                </div>
              </div>
            )}

            {/* Status summary */}
            <div className="mt-6 pt-5 border-t border-gray-50 space-y-2">
              <div className="text-xs font-bold text-gray-400 mb-3">Konfigurasi Aktif</div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Status Agent</span>
                <span className={`font-bold ${isEnabled ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isEnabled ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">System Prompt</span>
                <span className="font-bold text-gray-700">{config.system_prompt.length} karakter</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Knowledge Base</span>
                <span className="font-bold text-gray-700">{config.knowledge_base.length} karakter</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Kata Eskalasi</span>
                <span className="font-bold text-gray-700">{keywords.length} kata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
