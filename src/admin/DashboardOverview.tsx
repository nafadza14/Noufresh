import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
}

export default function DashboardOverview() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Set default to current month
  const currentYearMonth = new Date().toISOString().slice(0, 7);
  const [startMonth, setStartMonth] = useState(currentYearMonth);
  const [endMonth, setEndMonth] = useState(currentYearMonth);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diproses': return 'bg-blue-50 text-blue-600';
      case 'Menunggu Pengiriman': return 'bg-orange-50 text-orange-600';
      case 'Selesai': return 'bg-green-50 text-green-600';
      case 'Dibatalkan': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Filter orders by selected month range
  const filteredOrders = orders.filter((order) => {
    const orderMonth = order.created_at.slice(0, 7);
    return orderMonth >= startMonth && orderMonth <= endMonth;
  });

  const totalRevenue = filteredOrders.reduce((acc, curr) => acc + curr.total_price, 0);
  const totalOrders = filteredOrders.length;
  const processingCount = filteredOrders.filter(o => o.status === 'Diproses' || o.status === 'Menunggu Pengiriman').length;
  const finishedCount = filteredOrders.filter(o => o.status === 'Selesai').length;

  const toShipOrders = filteredOrders.filter(o => o.status === 'Menunggu Pengiriman' || o.status === 'Diproses').slice(0, 5);

  // Prepare Chart Data
  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const chartDataObj: Record<string, number> = {};
  
  sortedOrders.forEach(order => {
    const dateStr = new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    if (!chartDataObj[dateStr]) chartDataObj[dateStr] = 0;
    chartDataObj[dateStr] += order.total_price;
  });

  const chartData = Object.keys(chartDataObj).map(date => ({
    date,
    total: chartDataObj[date]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-sm">
          <p className="text-gray-500 font-medium mb-1">{label}</p>
          <p className="font-bold text-mint-fresh">
            {formatRupiah(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview Dashboard</h1>
          <p className="text-gray-500">Ringkasan performa penjualan dan operasional NoufreshCare.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm">
            <span className="text-xs font-bold text-gray-500">Mulai:</span>
            <input 
              type="month" 
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="text-sm font-semibold outline-none bg-transparent cursor-pointer text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm">
            <span className="text-xs font-bold text-gray-500">Sampai:</span>
            <input 
              type="month" 
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="text-sm font-semibold outline-none bg-transparent cursor-pointer text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Data Penjualan</span>
            <div className="p-2 bg-gray-50 rounded-lg"><TrendingUp className="text-mint-fresh" /></div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">{formatRupiah(totalRevenue)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Order Masuk</span>
            <div className="p-2 bg-gray-50 rounded-lg"><Package className="text-blue-500" /></div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">{totalOrders}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Proses Kirim</span>
            <div className="p-2 bg-gray-50 rounded-lg"><Clock className="text-orange-500" /></div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">{processingCount}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 font-medium text-sm">Selesai</span>
            <div className="p-2 bg-gray-50 rounded-lg"><CheckCircle className="text-green-500" /></div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">{finishedCount}</span>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Grafik Penjualan</h2>
        <div className="h-72 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="total" stroke="#2dd4bf" strokeWidth={3} dot={{ r: 4, fill: '#2dd4bf', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  tickFormatter={(value) => `Rp ${value / 1000}k`}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Tidak ada data penjualan pada rentang bulan ini.
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Order Terbaru</h2>
            <Link to="/orders" className="text-mint-fresh text-sm font-semibold hover:underline">Lihat Semua</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 font-bold border-b border-gray-100">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Pelanggan</th>
                  <th className="pb-3 font-semibold">Produk</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500">Memuat data...</td></tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-semibold text-gray-900">#{order.id}</td>
                      <td className="py-4 text-gray-600">{order.customer_name}</td>
                      <td className="py-4 text-gray-600">{order.product_name}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-semibold text-gray-900">{formatRupiah(order.total_price)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-400">Belum ada order.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Required */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Harus Dikirim</h2>
          <div className="space-y-4">
            {toShipOrders.length > 0 ? toShipOrders.map((item) => {
              const orderDate = new Date(item.created_at);
              return (
                <div key={item.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:border-mint-fresh transition-colors cursor-pointer">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">#{item.id}</div>
                    <div className="text-xs text-gray-500">{item.customer_name}</div>
                  </div>
                  <div className="text-xs font-semibold text-orange-500">
                    {orderDate.toLocaleDateString('id-ID')}
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-6 text-gray-400 text-sm">Tidak ada pesanan yang harus dikirim.</div>
            )}
            {toShipOrders.length > 0 && (
              <Link to="/orders" className="block w-full mt-4 py-3 bg-gray-50 text-center text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Proses Semua ({toShipOrders.length})
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
