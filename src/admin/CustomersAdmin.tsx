import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function CustomersAdmin() {
  const [customers] = useState([
    { id: 'CUST-001', name: 'Budi Santoso', email: 'budi.santoso@email.com', phone: '081234567890', address: 'Tebet Timur, Jakarta Selatan', orders: 2, totalSpent: 'Rp 498.000', joined: '10 Mei 2026' },
    { id: 'CUST-002', name: 'Siti Aminah', email: 'siti.am@email.com', phone: '085678901234', address: 'Dago, Bandung', orders: 1, totalSpent: 'Rp 149.000', joined: '12 Mei 2026' },
    { id: 'CUST-003', name: 'Andi Wijaya', email: 'andi.w@email.com', phone: '081122334455', address: 'Kebayoran Baru, Jakarta', orders: 4, totalSpent: 'Rp 1.198.000', joined: '01 Mei 2026' },
    { id: 'CUST-004', name: 'Rina Marlina', email: 'rina.marlina@email.com', phone: '089988776655', address: 'Sumur Bandung, Bandung', orders: 1, totalSpent: 'Rp 349.000', joined: '13 Mei 2026' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Pelanggan</h1>
          <p className="text-gray-500">Informasi detail pelanggan NoufreshCare.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Cari nama atau email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-mint-fresh"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-bold border-b border-gray-100">
                <th className="p-4 font-semibold">ID Pelanggan</th>
                <th className="p-4 font-semibold">Nama</th>
                <th className="p-4 font-semibold">Kontak</th>
                <th className="p-4 font-semibold">Lokasi</th>
                <th className="p-4 font-semibold text-center">Total Pesanan</th>
                <th className="p-4 font-semibold text-right">Total Belanja</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-400">{customer.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Bergabung: {customer.joined}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">{customer.email}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{customer.phone}</div>
                    </td>
                    <td className="p-4 text-gray-600 max-w-[200px] truncate" title={customer.address}>
                      {customer.address}
                    </td>
                    <td className="p-4 text-center font-bold text-gray-900">{customer.orders} kali</td>
                    <td className="p-4 text-right font-bold text-mint-fresh">{customer.totalSpent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    Pelanggan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
