import React, { useState, useEffect } from 'react';
import { Plus, Edit, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('packages').select('*').order('price', { ascending: true });
    if (!error && data) {
      setPackages(data);
    }
    setLoading(false);
  };

  const handleEditClick = (pkg: any) => {
    setIsEditing(pkg.id);
    setEditForm({
      ...pkg,
      includesText: Array.isArray(pkg.includes) ? pkg.includes.join('\n') : ''
    });
  };

  const handleSave = async () => {
    if (!editForm.id || !editForm.name || !editForm.price) {
      alert('ID, Nama, dan Harga wajib diisi!');
      return;
    }

    const includesArray = editForm.includesText
      ? editForm.includesText.split('\n').filter((i: string) => i.trim() !== '')
      : [];

    const payload = {
      id: editForm.id.toLowerCase(),
      name: editForm.name,
      price: parseInt(editForm.price, 10) || 0,
      duration: editForm.duration || '',
      description: editForm.description || '',
      includes: includesArray,
      badge: editForm.badge || null,
      highlighted: editForm.highlighted || false
    };

    if (isAdding) {
      const { error } = await supabase.from('packages').insert([payload]);
      
      if (error) {
        if (error.code === '42P01') {
          alert('Gagal: Tabel "packages" belum dibuat di Supabase.');
        } else {
          alert('Gagal menyimpan: ' + error.message);
        }
      }
    } else {
      const { error } = await supabase.from('packages').update(payload).eq('id', isEditing);
      if (error) alert('Gagal memperbarui: ' + error.message);
    }

    setIsAdding(false);
    setIsEditing(null);
    setEditForm({});
    fetchPackages();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({});
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditForm({ id: '', name: '', duration: '', price: '', description: '', includesText: '', badge: '', highlighted: false });
    setIsEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paket Perawatan</h1>
          <p className="text-gray-500">Kelola paket perawatan (Starter, Complete, Pro) dan isi dari setiap paket.</p>
        </div>
        <button onClick={startAdd} className="btn-primary flex items-center gap-2 h-12 px-6">
          <Plus size={18} /> Tambah Paket
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <th className="p-4">ID & Nama Paket</th>
                <th className="p-4">Harga & Durasi</th>
                <th className="p-4">Isi Paket (Baris per item)</th>
                <th className="p-4">Pengaturan Tambahan</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {loading && !isAdding && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat paket perawatan...</td></tr>
              )}
              {isAdding && (
                <tr className="bg-mint-fresh/5">
                  <td className="p-4 space-y-2 align-top">
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="ID (contoh: starter)" value={editForm.id} onChange={(e) => setEditForm({...editForm, id: e.target.value})} />
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Nama Paket" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                  </td>
                  <td className="p-4 space-y-2 align-top">
                    <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Harga (Angka)" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} />
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Durasi (contoh: 30 Hari)" value={editForm.duration} onChange={(e) => setEditForm({...editForm, duration: e.target.value})} />
                  </td>
                  <td className="p-4 align-top">
                    <textarea className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh h-24" placeholder="Tulis satu item per baris..." value={editForm.includesText} onChange={(e) => setEditForm({...editForm, includesText: e.target.value})} />
                  </td>
                  <td className="p-4 space-y-2 align-top">
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Badge (contoh: Best Seller)" value={editForm.badge} onChange={(e) => setEditForm({...editForm, badge: e.target.value})} />
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Deskripsi Singkat" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} />
                    <label className="flex items-center gap-2 text-gray-700 cursor-pointer mt-2">
                      <input type="checkbox" checked={editForm.highlighted} onChange={(e) => setEditForm({...editForm, highlighted: e.target.checked})} className="w-4 h-4 accent-mint-fresh" />
                      Highlight (Tengah)
                    </label>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2 align-top">
                    <button onClick={handleSave} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"><Save size={16} /></button>
                    <button onClick={handleCancel} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"><X size={16} /></button>
                  </td>
                </tr>
              )}
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  {isEditing === pkg.id ? (
                    <>
                      <td className="p-4 space-y-2 align-top">
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh opacity-50 cursor-not-allowed" disabled value={editForm.id} />
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                      </td>
                      <td className="p-4 space-y-2 align-top">
                        <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} />
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.duration} onChange={(e) => setEditForm({...editForm, duration: e.target.value})} />
                      </td>
                      <td className="p-4 align-top">
                        <textarea className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh h-24" value={editForm.includesText} onChange={(e) => setEditForm({...editForm, includesText: e.target.value})} />
                      </td>
                      <td className="p-4 space-y-2 align-top">
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Badge (opsional)" value={editForm.badge || ''} onChange={(e) => setEditForm({...editForm, badge: e.target.value})} />
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} />
                        <label className="flex items-center gap-2 text-gray-700 cursor-pointer mt-2">
                          <input type="checkbox" checked={editForm.highlighted} onChange={(e) => setEditForm({...editForm, highlighted: e.target.checked})} className="w-4 h-4 accent-mint-fresh" />
                          Highlight (Tengah)
                        </label>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2 align-top">
                        <button onClick={handleSave} className="px-3 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-lg hover:bg-green-100 transition-colors">Simpan</button>
                        <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 align-top">
                        <div className="font-semibold text-gray-900">{pkg.name}</div>
                        <div className="text-xs font-medium text-mint-fresh tracking-widest uppercase mt-1">ID: {pkg.id}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-bold text-gray-900">Rp {pkg.price?.toLocaleString('id-ID')}</div>
                        <div className="text-gray-500 text-sm mt-1">{pkg.duration}</div>
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 text-xs">
                          {pkg.includes?.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 align-top">
                        {pkg.badge && <span className="inline-block px-2 py-1 bg-mint-fresh text-white text-[10px] font-bold rounded mb-2">{pkg.badge}</span>}
                        <p className="text-xs text-gray-500">{pkg.description}</p>
                        {pkg.highlighted && <div className="text-[10px] font-bold text-orange-500 mt-2">⭐ Highlighted</div>}
                      </td>
                      <td className="p-4 flex justify-end gap-2 align-top">
                        <button onClick={() => handleEditClick(pkg)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {!loading && packages.length === 0 && !isAdding && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada paket. Silakan tambahkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
