import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'products', label: t.nav.products, href: '#products' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'testimonial', label: t.nav.testimonial, href: '#testimonial' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy logic
      const sections = ['home', 'products', 'about', 'testimonial', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <nav className="fixed top-6 w-full z-50 px-6">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <a href="#shop" className="flex items-center">
            <img 
              src="https://i.pinimg.com/736x/5f/8d/a6/5f8da69a3469ae669dfeba86821bd87d.jpg" 
              alt={BRAND_NAME} 
              className="h-10 w-auto" 
              referrerPolicy="no-referrer"
            />
          </a>
        </motion.div>

        {/* Desktop Menu - Pill Shape with Sliding Indicator */}
        <div className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-500 ${isScrolled ? 'bg-white/70 backdrop-blur-lg shadow-lg border border-white/20' : 'bg-black/10 backdrop-blur-md border border-white/10'}`}>
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-6 py-2 rounded-full text-[15px] font-semibold transition-colors duration-300 z-10 ${activeTab === item.id ? 'text-primary-dark' : isScrolled ? 'text-gray-500 hover:text-primary-cyan' : 'text-white/80 hover:text-white'}`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] z-[-1]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 transition-all hover:bg-white/10 ${isScrolled ? 'text-primary-dark border-primary-dark/10' : 'text-white'}`}
          >
            <Globe className="w-4 h-4" />
            <span className="text-[13px] font-bold uppercase">{language === 'id' ? 'ID' : 'EN'}</span>
          </button>

          <button 
            onClick={onCartClick}
            className={`relative p-2 transition-colors ${isScrolled ? 'text-primary-dark' : 'text-white'} hover:text-primary-cyan`}
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-cyan text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          
          <a href="#shop">
            <Button className="hidden md:block bg-primary-cyan text-white hover:bg-primary-dark rounded-full px-8 py-2.5 text-[15px] font-bold border-none shadow-lg">
              {t.nav.shopNow}
            </Button>
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-primary-dark' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100"
          >
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-primary-cyan px-4 py-2">{t.nav.home}</a>
              <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-primary-cyan px-4 py-2">{t.nav.products}</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-primary-cyan px-4 py-2">{t.nav.about}</a>
              <a href="#testimonial" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-primary-cyan px-4 py-2">{t.nav.testimonial}</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-primary-cyan px-4 py-2">{t.nav.contact}</a>
              
              <hr className="border-gray-100" />
              <div className="flex items-center justify-between px-4">
                <span className="text-gray-400 text-sm">Language</span>
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-primary-dark font-bold"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'id' ? 'Indonesian' : 'English'}
                </button>
              </div>
              <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button className="w-full bg-primary-cyan text-white border-none">{t.nav.shopNow}</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
