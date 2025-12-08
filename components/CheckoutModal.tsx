import React, { useState } from 'react';
import { X, Truck, CreditCard, ShieldCheck, Copy, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { PAYMENT_METHODS, BANK_ACCOUNTS } from '../constants';
import Button from './ui/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  clearCart: () => void;
}

const COURIERS = [
  { id: 'jne', name: 'JNE Reguler', etd: '2-3 Hari', price: 12000 },
  { id: 'jnt', name: 'J&T Express', etd: '1-3 Hari', price: 15000 },
  { id: 'sicepat', name: 'SiCepat HALU', etd: '2-4 Hari', price: 10000 },
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total, clearCart }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [selectedCourier, setSelectedCourier] = useState(COURIERS[0]);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const grandTotal = total + selectedCourier.price;

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Disalin: ' + text);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Left Side: Summary (Hidden on Mobile Success) */}
        {step !== 'success' && (
           <div className="w-full md:w-2/5 bg-gray-50 p-8 border-r border-gray-100 overflow-y-auto hidden md:block">
            <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-cyan" /> Ringkasan Pesanan
            </h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                   <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                     <img src={item.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-gray-800 line-clamp-2">{item.name}</p>
                     <p className="text-xs text-gray-500 mt-1">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                   </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim ({selectedCourier.name})</span>
                <span>Rp {selectedCourier.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
                <span>Total Bayar</span>
                <span className="text-primary-cyan">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Forms */}
        <div className={`flex-1 flex flex-col ${step === 'success' ? 'w-full' : ''}`}>
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold font-serif text-gray-900">
              {step === 'shipping' ? 'Informasi Pengiriman' : step === 'payment' ? 'Metode Pembayaran' : 'Pesanan Berhasil'}
            </h2>
            {step !== 'success' && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="flex-1 p-8 overflow-y-auto">
            
            {/* STEP 1: SHIPPING */}
            {step === 'shipping' && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-cyan focus:outline-none"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
                    <input 
                      type="tel" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-cyan focus:outline-none"
                      placeholder="0812..."
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                   <textarea 
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-cyan focus:outline-none"
                      rows={3}
                      placeholder="Jalan, No Rumah, Kecamatan, Kota..."
                      value={form.address}
                      onChange={e => setForm({...form, address: e.target.value})}
                   />
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Kurir</label>
                   <div className="grid grid-cols-1 gap-3">
                     {COURIERS.map(courier => (
                       <div 
                        key={courier.id} 
                        onClick={() => setSelectedCourier(courier)}
                        className={`border rounded-xl p-4 cursor-pointer flex justify-between items-center transition-all ${selectedCourier.id === courier.id ? 'border-primary-cyan bg-cyan-50' : 'border-gray-200 hover:border-primary-cyan/50'}`}
                       >
                         <div className="flex items-center gap-3">
                           <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                             <Truck className="w-5 h-5 text-primary-cyan" />
                           </div>
                           <div>
                             <p className="font-bold text-gray-900">{courier.name}</p>
                             <p className="text-xs text-gray-500">Estimasi {courier.etd}</p>
                           </div>
                         </div>
                         <span className="font-semibold text-gray-700">Rp {courier.price.toLocaleString('id-ID')}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 'payment' && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                 <div className="grid grid-cols-1 gap-3">
                    {PAYMENT_METHODS.map(method => (
                       <div 
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedPayment === method.id ? 'border-primary-cyan bg-cyan-50' : 'border-gray-200 hover:border-gray-300'}`}
                       >
                         <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-full ${selectedPayment === method.id ? 'bg-primary-cyan text-white' : 'bg-gray-100 text-gray-500'}`}>
                             {method.icon === 'qr-code' && <CreditCard className="w-5 h-5" />}
                             {method.icon === 'building-library' && <ShieldCheck className="w-5 h-5" />}
                             {method.icon === 'banknotes' && <span className="font-bold text-sm">Rp</span>}
                           </div>
                           <div>
                             <p className="font-bold text-gray-900">{method.name}</p>
                             <p className="text-sm text-gray-500">{method.description}</p>
                           </div>
                         </div>
                         
                         {/* Payment Details Expansion */}
                         {selectedPayment === method.id && method.id === 'transfer' && (
                           <div className="mt-4 pl-14 space-y-3 animate-in fade-in">
                             {BANK_ACCOUNTS.map((bank, idx) => (
                               <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                   <img src={bank.logo} alt={bank.bank_name} className="h-6 object-contain w-12" />
                                   <div>
                                     <p className="font-bold text-sm">{bank.bank_name}</p>
                                     <p className="text-xs text-gray-500">{bank.account_holder}</p>
                                   </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="font-mono font-bold text-gray-800 text-sm">{bank.account_number}</p>
                                    <button onClick={() => handleCopy(bank.account_number)} className="text-xs text-primary-cyan hover:underline flex items-center justify-end gap-1 mt-1">
                                      <Copy className="w-3 h-3" /> Salin
                                    </button>
                                 </div>
                               </div>
                             ))}
                           </div>
                         )}

                         {selectedPayment === method.id && method.id === 'qris' && (
                           <div className="mt-4 pl-14 animate-in fade-in">
                             <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block text-center w-full">
                               <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                                className="w-48 h-48 mx-auto opacity-80" 
                                alt="QRIS Placeholder"
                               />
                               <p className="text-sm text-gray-500 mt-2">Scan menggunakan GoPay, OVO, Dana, atau Mobile Banking</p>
                             </div>
                           </div>
                         )}
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center text-center h-full animate-in zoom-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                   <ShieldCheck className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Terima Kasih!</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  Pesanan Anda telah kami terima. Konfirmasi dan resi pengiriman akan dikirimkan melalui WhatsApp ke nomor <strong>{form.phone}</strong>.
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-md border border-gray-100 mb-8">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">ID Pesanan</p>
                  <p className="text-2xl font-mono font-bold text-gray-900">NF-{Math.floor(Math.random() * 100000)}</p>
                </div>
                <Button onClick={onClose} className="w-full max-w-xs">
                  Kembali ke Beranda
                </Button>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          {step !== 'success' && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
               <div className="block md:hidden">
                 <p className="text-xs text-gray-500">Total</p>
                 <p className="font-bold text-lg text-primary-cyan">Rp {grandTotal.toLocaleString('id-ID')}</p>
               </div>
               
               <div className="flex gap-4 ml-auto">
                 {step === 'payment' && (
                   <Button variant="outline" onClick={() => setStep('shipping')}>
                     Kembali
                   </Button>
                 )}
                 
                 {step === 'shipping' ? (
                   <Button onClick={() => setStep('payment')} withArrow className="ml-auto">
                     Lanjut Pembayaran
                   </Button>
                 ) : (
                   <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700 from-green-500 to-green-600">
                     Konfirmasi Pesanan
                   </Button>
                 )}
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;