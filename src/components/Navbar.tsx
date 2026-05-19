import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-nav ${isScrolled ? 'glass-nav-scrolled py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between relative">
        <div className="flex items-center z-[60]">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <img loading="eager" decoding="async" src="/logo.png" 
              alt="Noufresh Logo" 
              className="h-5 md:h-6 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/about" className="text-[1rem] font-medium text-gray-600 hover:text-mint-fresh transition-colors tracking-[-0.01em]">Tentang</Link>
          <Link to="/assessment" className="text-[1rem] font-medium text-gray-600 hover:text-mint-fresh transition-colors tracking-[-0.01em]">Assessment</Link>
          <Link to="/program" className="text-[1rem] font-medium text-gray-600 hover:text-mint-fresh transition-colors tracking-[-0.01em]">Program</Link>
          <Link to="/shop" className="text-[1rem] font-medium text-gray-600 hover:text-mint-fresh transition-colors tracking-[-0.01em]">Produk</Link>
          <Link to="/consultation" className="text-[1rem] font-medium text-gray-600 hover:text-mint-fresh transition-colors tracking-[-0.01em] flex items-center gap-1.5">
            Telehealth
            <span className="text-[7px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter shadow-sm border border-red-200">Soon</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6 z-[60]">
          <Link to="/shop" className="px-5 py-2 rounded-full border border-mint-fresh text-mint-fresh font-bold text-[13px] md:text-sm hover:bg-mint-fresh hover:text-white transition-all">
            Pesan Sekarang
          </Link>
          
          <button 
            className="p-2 text-gray-900 md:hidden relative z-[70] bg-white/10 rounded-lg active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white z-50 md:hidden flex flex-col pt-32 px-10 gap-6 overflow-hidden"
          >
            <Link 
              to="/about" 
              className="text-lg font-semibold text-gray-900 py-3 border-b border-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link 
              to="/assessment" 
              className="text-lg font-semibold text-gray-900 py-3 border-b border-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              to="/program" 
              className="text-lg font-semibold text-gray-900 py-3 border-b border-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Program
            </Link>
            <Link 
              to="/shop" 
              className="text-lg font-semibold text-gray-900 py-3 border-b border-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Produk
            </Link>
            <Link 
              to="/consultation" 
              className="text-lg font-semibold text-gray-900 py-3 border-b border-gray-50 flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Telehealth
              <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded-full font-black uppercase tracking-widest border border-red-100">Coming Soon</span>
            </Link>
            <div className="mt-6 pt-6">
              <Link 
                to="/shop" 
                className="btn-primary w-full text-center flex items-center justify-center h-13 rounded-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pesan Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
