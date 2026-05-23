import React, { useState, useEffect } from 'react';
import {
  Bell, Filter, RefreshCw, Clock, CheckCircle,
  XCircle, AlertCircle, Calendar, Send, SkipForward
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Reminder {
  id: string;
  customer_id: string;
  phone: string;
  tier: string;
  day_number: number;
  scheduled_at: string;
  sent_at: string | null;
  status: 'pending' | 'sent' | 'failed' | 'skipped';
  created_at: string;
  customers?: { name: string };
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600 border border-amber-200',
  sent: 'bg-green-50 text-green-600 border border-green-200',
  failed: 'bg-red-50 text-red-600 border border-red-200',
  skipped: 'bg-gray-100 text-gray-500 border border-gray-200',
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  sent: 'Terkirim',
  failed: 'Gagal',
  skipped: 'Dilewati',
};

const TIER_COLORS: Record<string, string> = {
  Trial: 'bg-amber-50 text-amber-600',
  Starter: 'bg-blue-50 text-blue-600',
  Complete: 'bg-purple-50 text-purple-600',
  Pro: 'bg-emerald-50 text-emerald-600',
};

export default function RemindersAdmin() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [tierFilter, setTierFilter] = useState('Semua Tier');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadReminders = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('reminders')
        .select('*, customers(name)')
        .order('scheduled_at', { ascending: true });
      setReminders(data || []);
    } catch (err) {
      console.error('Error loading reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReminders(); }, []);

  // Summary calculations
  const now = new Date();
  const weekEnd = new Date(now.getTime() + 7 * 86400000);
  const todayStr = now.toISOString().slice(0, 10);

  const totalPending = reminders.filter(r => r.status === 'pending').length;
  const sentToday = reminders.filter(r => r.status === 'sent' && r.sent_at?.startsWith(todayStr)).length;
  const totalFailed = reminders.filter(r => r.status === 'failed').length;
  const scheduledThisWeek = reminders.filter(r =>
    r.status === 'pending' &&
    new Date(r.scheduled_at) >= now &&
    new Date(r.scheduled_at) <= weekEnd
  ).length;

  // Filtered reminders
  const filtered = reminders.filter(r => {
    const matchStatus = statusFilter === 'Semua Status' || r.status === statusFilter.toLowerCase().replace('terkirim', 'sent').replace('gagal', 'failed').replace('dilewati', 'skipped').replace('pending', 'pending');
    const matchTier = tierFilter === 'Semua Tier' || r.tier === tierFilter;
    return matchStatus && matchTier;
  });

  const handleSendNow = async (reminderId: string) => {
    setProcessingId(reminderId);
    try {
      const res = await fetch('/api/reminders/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminder_id: reminderId })
      });
      const data = await res.json();
      if (data.sent > 0) {
        await loadReminders();
      } else {
        alert('Gagal kirim reminder: ' + (data.error || 'Coba lagi'));
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSkip = async (reminderId: string) => {
    await supabase.from('reminders').update({ status: 'skipped' }).eq('id', reminderId);
    await loadReminders();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reminder Manager</h1>
          <p className="text-gray-500">Kelola dan pantau jadwal reminder WhatsApp semua pelanggan.</p>
        </div>
        <button
          onClick={loadReminders}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-gray-500 text-sm font-medium">Total Pending</span>
            <div className="p-2 bg-amber-50 rounded-lg"><Clock className="text-amber-500 w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalPending}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-gray-500 text-sm font-medium">Terkirim Hari Ini</span>
            <div className="p-2 bg-green-50 rounded-lg"><CheckCircle className="text-green-500 w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{sentToday}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-gray-500 text-sm font-medium">Gagal</span>
            <div className="p-2 bg-red-50 rounded-lg"><XCircle className="text-red-500 w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalFailed}</div>
          {totalFailed > 0 && <p className="text-xs text-red-500 mt-1">Perlu perhatian</p>}
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-gray-500 text-sm font-medium">Minggu Ini</span>
            <div className="p-2 bg-blue-50 rounded-lg"><Calendar className="text-blue-500 w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{scheduledThisWeek}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mint-fresh appearance-none cursor-pointer"
            >
              {['Semua Status', 'Pending', 'Terkirim', 'Gagal', 'Dilewati'].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mint-fresh appearance-none cursor-pointer"
            >
              {['Semua Tier', 'Trial', 'Starter', 'Complete', 'Pro'].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <span className="ml-auto text-sm text-gray-400 flex items-center">{filtered.length} reminder</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-bold border-b border-gray-100">
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Nomor WA</th>
                <th className="p-4 font-semibold">Tier</th>
                <th className="p-4 font-semibold text-center">Hari ke</th>
                <th className="p-4 font-semibold">Dijadwalkan</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Terkirim pada</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-gray-400">Tidak ada reminder yang sesuai.</td></tr>
              ) : (
                filtered.map(reminder => (
                  <tr key={reminder.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">{reminder.customers?.name || 'Customer'}</td>
                    <td className="p-4 text-gray-500 font-mono text-xs">{reminder.phone}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${TIER_COLORS[reminder.tier] || 'bg-gray-100 text-gray-500'}`}>
                        {reminder.tier}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-gray-900">{reminder.day_number}</td>
                    <td className="p-4 text-gray-600 text-xs">
                      {new Date(reminder.scheduled_at).toLocaleString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_BADGE[reminder.status]}`}>
                        {STATUS_LABEL[reminder.status]}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">
                      {reminder.sent_at
                        ? new Date(reminder.sent_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                        : <span className="text-gray-300">Belum</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {(reminder.status === 'pending' || reminder.status === 'failed') && (
                          <button
                            onClick={() => handleSendNow(reminder.id)}
                            disabled={processingId === reminder.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-mint-fresh/10 text-mint-fresh text-xs font-bold rounded-lg hover:bg-mint-fresh/20 transition-colors disabled:opacity-50"
                          >
                            <Send size={12} />
                            {processingId === reminder.id ? '...' : 'Kirim'}
                          </button>
                        )}
                        {reminder.status === 'pending' && (
                          <button
                            onClick={() => handleSkip(reminder.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <SkipForward size={12} />
                            Lewati
                          </button>
                        )}
                        {(reminder.status === 'sent' || reminder.status === 'skipped') && (
                          <span className="text-gray-300 text-xs">Selesai</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
