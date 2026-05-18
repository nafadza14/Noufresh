import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Eye, Truck, CheckCircle, XCircle, Package, Printer, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  product_name: string;
  total_price: number;
  status: string;
  notes: string;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST205') {
          setError('Tabel "orders" belum dibuat di Supabase. Silakan buat tabel terlebih dahulu.');
        } else {
          setError(error.message);
        }
      } else {
        setOrders(data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    } else {
      alert('Gagal mengupdate status: ' + error.message);
    }
  };

  const insertDummyData = async () => {
    setLoading(true);
    const dummyOrders = [
      { id: 'NF-1042', customer_name: 'Budi Santoso', customer_phone: '081234567890', shipping_address: 'Jl. Sudirman No 12, Jakarta', product_name: 'Complete 90 Day Kit', total_price: 349000, status: 'Menunggu Pengiriman', notes: 'Tolong packing aman' },
      { id: 'NF-1041', customer_name: 'Siti Aminah', customer_phone: '085678901234', shipping_address: 'Komp. Melati Asri B2, Bandung', product_name: 'Starter Kit', total_price: 149000, status: 'Selesai', notes: '' },
      { id: 'NF-1040', customer_name: 'Andi Wijaya', customer_phone: '081122334455', shipping_address: 'Jl. Merdeka 45, Surabaya', product_name: 'Professional Kit', total_price: 599000, status: 'Selesai', notes: 'Titip di pos satpam' },
      { id: 'NF-1039', customer_name: 'Rina Marlina', customer_phone: '089988776655', shipping_address: 'Jl. Diponegoro 9, Medan', product_name: 'Complete 90 Day Kit', total_price: 349000, status: 'Diproses', notes: '' }
    ];

    const { error } = await supabase.from('orders').insert(dummyOrders);
    if (error) {
      alert('Gagal membuat data dummy: ' + error.message);
      setLoading(false);
    } else {
      fetchOrders();
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload(); // Reload to restore React bindings
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diproses': return 'bg-blue-50 text-blue-600';
      case 'Menunggu Pengiriman': return 'bg-orange-50 text-orange-600';
      case 'Selesai': return 'bg-green-50 text-green-600';
      case 'Dibatalkan': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pesanan</h1>
          <p className="text-gray-500">Kelola dan pantau seluruh pesanan pelanggan NoufreshCare.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={insertDummyData} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm">
            + Buat Data Dummy
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari ID atau Nama..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mint-fresh"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mint-fresh appearance-none cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Diproses">Diproses</option>
              <option value="Menunggu Pengiriman">Menunggu Pengiriman</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-red-600">
          <h3 className="font-bold text-lg mb-2">Terjadi Kesalahan Database</h3>
          <p>{error}</p>
          {error.includes('belum dibuat') && (
            <div className="mt-4 p-4 bg-white rounded-lg text-sm font-mono overflow-x-auto text-gray-800 border border-red-100">
              <p className="font-bold mb-2 text-gray-900">// Jalankan SQL ini di Supabase SQL Editor:</p>
              CREATE TABLE orders (<br/>
              &nbsp;&nbsp;id TEXT PRIMARY KEY,<br/>
              &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),<br/>
              &nbsp;&nbsp;customer_name TEXT NOT NULL,<br/>
              &nbsp;&nbsp;customer_phone TEXT,<br/>
              &nbsp;&nbsp;shipping_address TEXT NOT NULL,<br/>
              &nbsp;&nbsp;product_name TEXT NOT NULL,<br/>
              &nbsp;&nbsp;total_price NUMERIC NOT NULL,<br/>
              &nbsp;&nbsp;status TEXT DEFAULT 'Diproses',<br/>
              &nbsp;&nbsp;notes TEXT<br/>
              );
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold">Pelanggan</th>
                  <th className="p-4 font-semibold">Produk</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Total</th>
                  <th className="p-4 font-semibold text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={7} className="p-8 text-center text-gray-500">Memuat data dari Supabase...</td></tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">#{order.id}</td>
                      <td className="p-4 text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 text-gray-900 font-medium">{order.customer_name}</td>
                      <td className="p-4 text-gray-600">{order.product_name}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-semibold text-gray-900">{formatRupiah(order.total_price)}</td>
                      <td className="p-4 flex flex-wrap justify-center gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                          Detail
                        </button>
                        {order.status === 'Diproses' && (
                          <button onClick={() => handleStatusChange(order.id, 'Menunggu Pengiriman')} className="px-3 py-1.5 bg-orange-50 text-orange-500 text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors">
                            Kirim
                          </button>
                        )}
                        {order.status === 'Menunggu Pengiriman' && (
                          <button onClick={() => handleStatusChange(order.id, 'Selesai')} className="px-3 py-1.5 bg-green-50 text-green-500 text-xs font-bold rounded-lg hover:bg-green-100 transition-colors">
                            Selesai
                          </button>
                        )}
                        {(order.status === 'Diproses' || order.status === 'Menunggu Pengiriman') && (
                          <button onClick={() => handleStatusChange(order.id, 'Dibatalkan')} className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors">
                            Batal
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400">
                      Tidak ada pesanan yang sesuai dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="text-mint-fresh" />
                Detail Pesanan #{selectedOrder.id}
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white text-gray-500 hover:bg-gray-100 rounded-full transition-colors shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-4">Informasi Pelanggan</div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">No. Handphone (WhatsApp)</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Alamat Pengiriman</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-gray-400 mb-4">Rincian Pesanan</div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Produk</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.product_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Tagihan</p>
                      <p className="font-bold text-mint-fresh text-lg">{formatRupiah(selectedOrder.total_price)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status Saat Ini</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    {selectedOrder.notes && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Catatan Tambahan</p>
                        <p className="font-medium text-gray-800 bg-yellow-50 p-3 rounded-xl text-sm border border-yellow-100">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-4">
              <button onClick={() => setSelectedOrder(null)} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Tutup
              </button>
              <button onClick={handlePrint} className="px-6 py-2.5 bg-mint-fresh text-white font-bold rounded-xl hover:bg-mint-fresh/90 transition-colors flex items-center gap-2 shadow-lg shadow-mint-fresh/20">
                <Printer size={18} /> Print Label Pengiriman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container */}
      {selectedOrder && (
        <div className="hidden">
          <div ref={printRef} style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', border: '2px solid #000', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '15px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>NOUFRESH CARE</h2>
              <p style={{ margin: 0, fontSize: '12px' }}>Label Pengiriman Pesanan</p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Penerima:</h3>
              <p style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold' }}>{selectedOrder.customer_name}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '16px' }}>HP: {selectedOrder.customer_phone}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', lineHeight: '1.4' }}>{selectedOrder.shipping_address}</p>
            </div>

            <div style={{ borderTop: '1px dashed #ccc', paddingTop: '15px', marginBottom: '15px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Detail Produk:</h3>
              <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>{selectedOrder.product_name}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Order ID: #{selectedOrder.id}</p>
              {selectedOrder.notes && (
                <p style={{ margin: '10px 0 0 0', fontSize: '14px', padding: '10px', border: '1px solid #000' }}>
                  <strong>Catatan:</strong> {selectedOrder.notes}
                </p>
              )}
            </div>
            
            <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px', color: '#666' }}>
              Terima kasih telah berbelanja di NoufreshCare!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
