import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['Mouthwash', 'Mouthspray', 'Teeth Whitening', 'Behel Equipment'];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleEditClick = (product: any) => {
    setIsEditing(product.id);
    setEditForm(product);
  };

  const handleSave = async () => {
    if (!editForm.name || !editForm.price || !editForm.category) {
      alert('Nama, harga, dan kategori wajib diisi!');
      return;
    }

    if (isAdding) {
      const { error } = await supabase.from('products').insert([{
        name: editForm.name,
        description: editForm.description || '',
        price: parseInt(editForm.price, 10) || 0,
        category: editForm.category,
        image_url: editForm.image_url || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070',
        rating: editForm.rating || 5.0
      }]);
      
      if (error) {
        if (error.code === '42P01') {
          alert('Gagal: Tabel "products" belum dibuat di Supabase.');
        } else {
          alert('Gagal menyimpan: ' + error.message);
        }
      }
    } else {
      const { error } = await supabase.from('products').update({
        name: editForm.name,
        description: editForm.description || '',
        price: parseInt(editForm.price, 10) || 0,
        category: editForm.category,
        image_url: editForm.image_url || '',
        rating: editForm.rating || 5.0
      }).eq('id', isEditing);
      
      if (error) alert('Gagal memperbarui: ' + error.message);
    }

    setIsAdding(false);
    setIsEditing(null);
    setEditForm({});
    fetchProducts();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({});
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus produk ini?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus: ' + error.message);
      } else {
        fetchProducts();
      }
    }
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditForm({ name: '', description: '', price: '', category: CATEGORIES[0], image_url: '', rating: 5.0 });
    setIsEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola katalog produk yang tampil di halaman Shop.</p>
        </div>
        <button onClick={startAdd} className="btn-primary flex items-center gap-2 h-12 px-6">
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <th className="p-4">Info Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga (Rp)</th>
                <th className="p-4">Deskripsi</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {loading && !isAdding && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat produk...</td></tr>
              )}
              {isAdding && (
                <tr className="bg-mint-fresh/5">
                  <td className="p-4 space-y-2">
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Nama Produk" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="URL Foto Produk" value={editForm.image_url} onChange={(e) => setEditForm({...editForm, image_url: e.target.value})} />
                  </td>
                  <td className="p-4">
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-4">
                    <input type="number" className="w-32 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Contoh: 150000" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} />
                  </td>
                  <td className="p-4">
                    <textarea className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="Deskripsi Singkat" rows={2} value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} />
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2 h-full items-center mt-2">
                    <button onClick={handleSave} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"><Save size={16} /></button>
                    <button onClick={handleCancel} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"><X size={16} /></button>
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  {isEditing === product.id ? (
                    <>
                      <td className="p-4 space-y-2">
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" placeholder="URL Foto Produk" value={editForm.image_url} onChange={(e) => setEditForm({...editForm, image_url: e.target.value})} />
                      </td>
                      <td className="p-4">
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})}>
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td className="p-4">
                        <input type="number" className="w-32 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} />
                      </td>
                      <td className="p-4">
                        <textarea className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint-fresh" rows={2} value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} />
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2 items-center">
                        <button onClick={handleSave} className="px-3 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-lg hover:bg-green-100 transition-colors">Simpan</button>
                        <button onClick={handleCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img loading="lazy" decoding="async" src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"><ImageIcon size={20}/></div>
                          )}
                          <span className="font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{product.category}</span>
                      </td>
                      <td className="p-4 font-bold text-mint-fresh">Rp {product.price?.toLocaleString('id-ID')}</td>
                      <td className="p-4 text-gray-500 max-w-xs truncate">{product.description || '-'}</td>
                      <td className="p-4 flex justify-end gap-2 items-center h-full">
                        <button onClick={() => handleEditClick(product)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors">
                          Hapus
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {!loading && products.length === 0 && !isAdding && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada produk. Silakan tambahkan produk baru.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
