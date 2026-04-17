import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onUpdateQty,
  onCheckout
}) => {
  const { t } = useLanguage();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-cyan" />
                  <h2 className="text-xl font-bold text-gray-900">{t.cart.title}</h2>
                  <span className="bg-primary-cyan text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)} {t.cart.items}
                  </span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-xl font-bold text-primary-dark mb-2">{t.cart.empty}</p>
                    <p className="text-gray-500 text-sm mb-8 max-w-[200px]">
                      Fill it with your favorite products to start your freshness journey!
                    </p>
                    <Button 
                      className="bg-primary-cyan text-white hover:bg-primary-dark rounded-full px-8 border-none" 
                      onClick={onClose}
                    >
                      {t.nav.shopNow}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-primary-dark text-base leading-tight mb-1">{item.name}</h3>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.volume}</p>
                              </div>
                              <button 
                                onClick={() => onRemove(item.id)}
                                className="text-gray-300 hover:text-red-500 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <div className="font-extrabold text-primary-cyan text-lg">
                                Rp {item.price.toLocaleString('id-ID')}
                              </div>
                              
                              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200/50">
                                <button 
                                  onClick={() => onUpdateQty(item.id, -1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-primary-cyan hover:text-white transition-all text-gray-500"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-bold w-8 text-center text-primary-dark">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQty(item.id, 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-primary-cyan hover:text-white transition-all text-gray-500"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <span>Subtotal</span>
                      <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-dark font-bold">{t.cart.total}</span>
                      <span className="text-2xl font-extrabold text-primary-dark">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary-cyan text-white hover:bg-primary-dark rounded-2xl py-5 text-lg font-bold shadow-xl shadow-primary-cyan/20 border-none" 
                    onClick={onCheckout}
                  >
                    {t.cart.checkout}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;