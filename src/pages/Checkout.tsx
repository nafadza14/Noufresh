import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';

import AddressForm from '../components/Checkout/AddressForm';
import { supabase } from '../lib/supabase';

const tiers: Record<string, any> = {
  trial: { 
    name: 'Behel Care Trial Kit', 
    price: 'Rp 59.000', 
    duration: '14 Hari', 
    items: [
      'Noufresh Mouth Spray 10ml',
      '5 pcs Interdental Brush'
    ] 
  },
  starter: { 
    name: 'Behel Care Starter', 
    price: 'Rp 179.000', 
    duration: '30 Hari', 
    items: [
      'Noufresh Mouthwash 250ml',
      'Noufresh Mouth Spray 10ml',
      'Noufresh Purple Toothpaste 20ml',
      '10 pcs Interdental Brush',
      'Orthodontic Wax 1 pak'
    ] 
  },
  complete: { 
    name: 'Behel Care Complete', 
    price: 'Rp 399.000', 
    duration: '90 Hari', 
    items: [
      '3 botol Noufresh Mouthwash 250ml',
      'Noufresh Mouth Spray 20ml',
      'Noufresh Purple Toothpaste 20ml',
      '30 pcs Interdental Brush',
      'Sikat Gigi Khusus Behel V Shape',
      'Orthodontic Wax 3 pak',
      'Mirror Dental Mini'
    ] 
  },
  pro: { 
    name: 'Behel Care Pro', 
    price: 'Rp 749.000', 
    duration: '180 Hari', 
    items: [
      '6 botol Noufresh Mouthwash 250ml',
      '2 botol Noufresh Mouth Spray 20ml',
      '2 buah Noufresh Purple Toothpaste 20ml',
      '60 pcs Interdental Brush',
      '2 pcs Sikat Gigi Khusus Behel V Shape',
      'Orthodontic Wax 6 pak',
      'Mirror Dental Mini'
    ] 
  },
};

export default function Checkout() {
  const { tier = 'complete' } = useParams();
  const product = tiers[tier] || tiers.complete;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressData, setAddressData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct full address
    const fullAddress = `${addressData.streetAddress || ''}, ${addressData.additionalDetails || ''}, ${addressData.villageName || ''}, ${addressData.districtName || ''}, ${addressData.cityName || ''}, ${addressData.provinceName || ''} - ${addressData.postalCode || ''}`;
    
    // Parse price to numeric
    const priceNumeric = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
    
    // Generate order ID
    const orderId = `NF-${Math.floor(1000 + Math.random() * 9000)}`;

    const { error } = await supabase.from('orders').insert([{
      id: orderId,
      customer_name: name,
      customer_phone: phone,
      shipping_address: fullAddress,
      product_name: product.name,
      total_price: priceNumeric,
      status: 'Menunggu Pembayaran',
      notes: email ? `Email: ${email}` : ''
    }]);

    if (error) {
      setIsSubmitting(false);
      if (error.code === 'PGRST205') {
        alert('Gagal: Tabel "orders" belum dibuat di Supabase.');
      } else {
        alert('Gagal membuat pesanan: ' + error.message);
      }
      return;
    }

    try {
      // Call backend to get Midtrans Snap token
      const response = await fetch('/api/midtrans/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: priceNumeric,
          customer_details: {
            first_name: name,
            email: email || 'no-email@example.com',
            phone: phone,
            billing_address: {
              first_name: name,
              address: fullAddress,
              city: addressData.cityName || '',
              postal_code: addressData.postalCode || '',
              country_code: 'IDN'
            }
          },
          item_details: [{
            id: product.name,
            price: priceNumeric,
            quantity: 1,
            name: product.name
          }]
        })
      });

      const data = await response.json();

      if (!data.token) {
        throw new Error(data.error || 'Token tidak diterima dari server');
      }

      setIsSubmitting(false);

      // Trigger Midtrans Snap Popup
      (window as any).snap.pay(data.token, {
        onSuccess: async function(result: any) {
          // Update order status
          await supabase.from('orders').update({ status: 'Diproses' }).eq('id', orderId);
          window.location.href = '/checkout/complete';
        },
        onPending: async function(result: any) {
          window.location.href = '/checkout/complete';
        },
        onError: function(result: any) {
          alert('Pembayaran gagal!');
        },
        onClose: function() {
          alert('Anda menutup popup sebelum menyelesaikan pembayaran');
        }
      });
    } catch (err: any) {
      setIsSubmitting(false);
      alert('Terjadi kesalahan saat menghubungi server pembayaran: ' + err.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-12 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="mb-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-gray-900 transition-colors tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Kembali Belanja
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              Informasi Pengiriman
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Nama Lengkap</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="nama kamu" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Nomor WhatsApp</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="08123456XXXX" pattern="^(08|628)[0-9]{7,13}$" onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('masukkan nomor wa yang benar')} onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="emailkamu@gmail.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" />
              </div>

              <div className="py-4">
                <div className="h-px bg-gray-100 w-full mb-8"></div>
                <h3 className="text-lg font-bold mb-6">Alamat Pengiriman</h3>
                <AddressForm onAddressChange={setAddressData} />
              </div>


              <div className="pt-8">
                <button disabled={isSubmitting} type="submit" className={`w-full btn-primary h-15 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'shadow-mint-fresh/20'}`}>
                  <CreditCard className="w-5 h-5" /> {isSubmitting ? 'Memproses...' : `Bayar Sekarang ${product.price}`}
                </button>
                <p className="text-center text-gray-400 text-xs font-bold tracking-widest mt-6 flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" /> Transaksi Terenkripsi & Aman
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-mint-fresh" /> Ringkasan Pesanan
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <div>
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-xs text-mint-fresh font-bold tracking-widest">Program {product.duration}</div>
                  </div>
                  <div className="font-extrabold">{product.price}</div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500 italic">
                  <span>Pengiriman (Express)</span>
                  <span className="text-mint-fresh">GRATIS</span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>{product.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                {product.items?.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-gray-400 font-bold tracking-widest ">
                    <span className="w-1.5 h-1.5 bg-mint-fresh rounded-full"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-mint-fresh p-8 rounded-[2rem] text-white">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="w-8 h-8 opacity-50" />
                <h4 className="font-bold">Noufresh Guarantee</h4>
              </div>
              <p className="text-sm opacity-80 leading-relaxed font-medium">Garansi 30 hari uang kembali jika Anda tidak merasa ada perubahan pada kebersihan behel Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
