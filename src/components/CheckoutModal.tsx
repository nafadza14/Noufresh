import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, CreditCard, ShieldCheck, Copy, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { PAYMENT_METHODS, BANK_ACCOUNTS } from '../constants';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [selectedCourier, setSelectedCourier] = useState(COURIERS[0]);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [copied, setCopied] = useState<string | null>(null);

  const grandTotal = total + selectedCourier.price;

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row"
          >
            
            {/* Left Side: Summary (Hidden on Mobile Success) */}
            {step !== 'success' && (
               <div className="w-full md:w-2/5 bg-gray-50 p-8 border-r border-gray-100 overflow-y-auto hidden md:block">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-cyan" /> {t.checkout.summary}
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
                    <span>{t.checkout.subtotal}</span>
                    <span>Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t.checkout.shipping} ({selectedCourier.name})</span>
                    <span>Rp {selectedCourier.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
                    <span>{t.cart.total}</span>
                    <span className="text-primary-cyan">Rp {grandTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Right Side: Forms */}
            <div className={`flex-1 flex flex-col ${step === 'success' ? 'w-full' : ''}`}>
              
              {/* Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                <h2 className="text-2xl font-extrabold text-primary-dark">
                  {step === 'shipping' ? t.checkout.shippingInfo : step === 'payment' ? t.checkout.paymentMethod : t.checkout.success}
                </h2>
                {step !== 'success' && (
                  <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Content Body */}
              <div className="flex-1 p-8 overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  {/* STEP 1: SHIPPING */}
                  {step === 'shipping' && (
                    <motion.div 
                      key="shipping"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">{t.checkout.form.name}</label>
                          <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-cyan focus:bg-white focus:outline-none transition-all"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">{t.checkout.form.phone}</label>
                          <input 
                            type="tel" 
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-cyan focus:bg-white focus:outline-none transition-all"
                            placeholder="0812..."
                            value={form.phone}
                            onChange={e => setForm({...form, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">{t.checkout.form.address}</label>
                         <textarea 
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-cyan focus:bg-white focus:outline-none transition-all"
                            rows={3}
                            placeholder="Street, House No, District, City..."
                            value={form.address}
                            onChange={e => setForm({...form, address: e.target.value})}
                         />
                      </div>

                      <div className="space-y-4">
                         <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">{t.checkout.form.courier}</label>
                         <div className="grid grid-cols-1 gap-4">
                           {COURIERS.map(courier => (
                             <div 
                              key={courier.id} 
                              onClick={() => setSelectedCourier(courier)}
                              className={`group border-2 rounded-2xl p-5 cursor-pointer flex justify-between items-center transition-all ${selectedCourier.id === courier.id ? 'border-primary-cyan bg-primary-cyan/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                             >
                               <div className="flex items-center gap-4">
                                 <div className={`p-3 rounded-xl transition-colors ${selectedCourier.id === courier.id ? 'bg-primary-cyan text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                   <Truck className="w-6 h-6" />
                                 </div>
                                 <div>
                                   <p className="font-bold text-primary-dark">{courier.name}</p>
                                   <p className="text-xs text-gray-500">{t.checkout.form.estimated} {courier.etd}</p>
                                 </div>
                               </div>
                               <span className="font-extrabold text-primary-dark">Rp {courier.price.toLocaleString('id-ID')}</span>
                             </div>
                           ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PAYMENT */}
                  {step === 'payment' && (
                    <motion.div 
                      key="payment"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                       <div className="grid grid-cols-1 gap-4">
                          {PAYMENT_METHODS.map(method => (
                             <div 
                              key={method.id}
                              onClick={() => setSelectedPayment(method.id)}
                              className={`group border-2 rounded-3xl p-6 cursor-pointer transition-all ${selectedPayment === method.id ? 'border-primary-cyan bg-primary-cyan/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                             >
                               <div className="flex items-center gap-5">
                                 <div className={`p-4 rounded-2xl transition-all ${selectedPayment === method.id ? 'bg-primary-cyan text-white shadow-lg shadow-primary-cyan/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                   {method.icon === 'qr-code' && <CreditCard className="w-6 h-6" />}
                                   {method.icon === 'building-library' && <ShieldCheck className="w-6 h-6" />}
                                   {method.icon === 'banknotes' && <span className="font-bold text-lg">Rp</span>}
                                 </div>
                                 <div>
                                   <p className="font-bold text-primary-dark text-lg">{method.name}</p>
                                   <p className="text-sm text-gray-500">{method.description}</p>
                                 </div>
                               </div>
                               
                               {/* Payment Details Expansion */}
                               {selectedPayment === method.id && method.id === 'transfer' && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: 'auto', opacity: 1 }}
                                   className="mt-6 pl-20 space-y-4 overflow-hidden"
                                 >
                                   {BANK_ACCOUNTS.map((bank, idx) => (
                                     <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                                       <div className="flex items-center gap-4">
                                         <img src={bank.logo} alt={bank.bank_name} className="h-8 object-contain w-16" />
                                         <div>
                                           <p className="font-bold text-sm text-primary-dark">{bank.bank_name}</p>
                                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{bank.account_holder}</p>
                                         </div>
                                       </div>
                                       <div className="text-right">
                                          <p className="font-mono font-bold text-primary-dark text-base">{bank.account_number}</p>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleCopy(bank.account_number);
                                            }} 
                                            className="text-[11px] font-bold text-primary-cyan hover:text-primary-dark flex items-center justify-end gap-1 mt-1 transition-colors"
                                          >
                                            {copied === bank.account_number ? (
                                              <><CheckCircle2 className="w-3 h-3 text-green-500" /> Copied</>
                                            ) : (
                                              <><Copy className="w-3 h-3" /> Copy</>
                                            )}
                                          </button>
                                       </div>
                                     </div>
                                   ))}
                                 </motion.div>
                               )}

                               {selectedPayment === method.id && method.id === 'qris' && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: 'auto', opacity: 1 }}
                                   className="mt-6 pl-20 overflow-hidden"
                                 >
                                   <div className="bg-white p-6 rounded-3xl border border-gray-100 text-center w-full shadow-sm">
                                     <img 
                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                                      className="w-48 h-48 mx-auto opacity-90" 
                                      alt="QRIS Placeholder"
                                     />
                                     <p className="text-xs font-medium text-gray-500 mt-4 max-w-[200px] mx-auto">Scan menggunakan GoPay, OVO, Dana, atau Mobile Banking</p>
                                   </div>
                                 </motion.div>
                               )}
                             </div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 3: SUCCESS */}
                  {step === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
                         <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                         <CheckCircle2 className="w-16 h-16 text-green-500 relative z-10" />
                      </div>
                      <h2 className="text-4xl font-extrabold text-primary-dark mb-4">{t.checkout.thankYou}</h2>
                      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
                        {t.checkout.orderReceived} <strong>{form.phone}</strong>.
                      </p>
                      <div className="bg-gray-50 p-8 rounded-[32px] w-full max-w-md border border-gray-100 mb-10">
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-2">Order ID</p>
                        <p className="text-3xl font-mono font-extrabold text-primary-dark">NF-{Math.floor(Math.random() * 100000)}</p>
                      </div>
                      <Button onClick={onClose} className="w-full max-w-xs bg-primary-dark text-white hover:bg-primary-cyan rounded-2xl py-5 border-none">
                        {t.checkout.backHome}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

               {/* Footer Actions */}
              {step !== 'success' && (
                <div className="p-8 border-t border-gray-100 bg-white flex justify-between items-center">
                   <div className="block md:hidden">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</p>
                     <p className="font-extrabold text-2xl text-primary-cyan">Rp {grandTotal.toLocaleString('id-ID')}</p>
                   </div>
                   
                   <div className="flex gap-4 ml-auto">
                     {step === 'payment' && (
                       <Button 
                        variant="outline" 
                        onClick={() => setStep('shipping')}
                        className="rounded-2xl px-8 border-gray-200 text-gray-500 hover:bg-gray-50"
                       >
                         {t.checkout.back}
                       </Button>
                     )}
                     
                     {step === 'shipping' ? (
                       <Button 
                        onClick={() => setStep('payment')} 
                        withArrow 
                        className="ml-auto bg-primary-cyan text-white hover:bg-primary-dark rounded-2xl px-10 py-4 border-none shadow-lg shadow-primary-cyan/20"
                       >
                         {t.checkout.continuePayment}
                       </Button>
                     ) : (
                       <Button 
                        onClick={handlePlaceOrder} 
                        className="bg-green-500 hover:bg-green-600 text-white rounded-2xl px-10 py-4 border-none shadow-lg shadow-green-500/20"
                       >
                         {t.checkout.confirmOrder}
                       </Button>
                     )}
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
