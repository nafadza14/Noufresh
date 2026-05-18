import React, { useState } from 'react';
import { Save, Shield, Bell, Store } from 'lucide-react';

export default function SettingsAdmin() {
  const [storeName, setStoreName] = useState('NoufreshCare Indonesia');
  const [email, setEmail] = useState('admin@noufresh.com');
  const [whatsapp, setWhatsapp] = useState('081234567890');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Sistem</h1>
        <p className="text-gray-500">Konfigurasi informasi toko dan pengaturan keamanan dashboard.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Store size={20} /></div>
              <h2 className="text-lg font-bold text-gray-900">Informasi Toko</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Toko</label>
                <input 
                  type="text" 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh focus:ring-1 focus:ring-mint-fresh transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Kontak</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh focus:ring-1 focus:ring-mint-fresh transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Admin</label>
                  <input 
                    type="text" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh focus:ring-1 focus:ring-mint-fresh transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
              <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><Bell size={20} /></div>
              <h2 className="text-lg font-bold text-gray-900">Notifikasi</h2>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-5 h-5 text-mint-fresh bg-gray-100 border-gray-300 rounded focus:ring-mint-fresh"
              />
              <span className="text-sm text-gray-700 font-medium">Kirim notifikasi email setiap ada pesanan baru</span>
            </label>

            <div className="pt-6">
              <button type="submit" className="btn-primary flex items-center gap-2 h-12 px-6">
                <Save size={18} /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50 mb-4">
              <div className="p-2 bg-red-50 text-red-500 rounded-lg"><Shield size={20} /></div>
              <h2 className="text-lg font-bold text-gray-900">Keamanan</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ubah Password</label>
                <input 
                  type="password" 
                  placeholder="Password Lama"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh mb-3"
                />
                <input 
                  type="password" 
                  placeholder="Password Baru"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-mint-fresh mb-3"
                />
                <button className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl text-sm hover:bg-gray-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
