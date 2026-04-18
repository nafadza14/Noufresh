import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import ShopSection from './components/ShopSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { Product, CartItem } from './types';

import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans text-primary-dark overflow-x-hidden selection:bg-primary-cyan selection:text-white">
        <Navbar 
          cartCount={cartItemCount} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <ShopSection onAddToCart={addToCart} />
          <ProductSection onAddToCart={addToCart} />
          <Testimonials />
          <FAQ />
          <Contact />
        </motion.main>
        
        <Footer />
        <FloatingWhatsApp />

        {/* Shopping Logic Components */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          total={cartTotal}
          clearCart={() => setCart([])}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;
