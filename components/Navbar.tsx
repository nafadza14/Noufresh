import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { BRAND_NAME, NAV_ITEMS } from '../constants';
import Button from './ui/Button';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo - Single Color */}
        <div className="flex items-center">
          <a href="#" className="text-4xl font-serif font-bold text-primary-cyan tracking-tight lowercase">
            {BRAND_NAME}
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-gray-500 hover:text-primary-cyan font-medium transition-colors text-sm uppercase tracking-wide font-sans"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="icon">
            <Search className="w-5 h-5" />
          </Button>
          
          <div className="relative group">
             <Button variant="icon" onClick={onCartClick}>
              <ShoppingBag className="w-5 h-5" />
            </Button>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary-pink text-white text-[10px] flex items-center justify-center rounded-full ring-2 ring-white font-bold animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </div>
          
          <div className="ml-2 text-sm font-semibold text-gray-400 cursor-pointer hover:text-primary-cyan">
            ID | EN
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <div className="relative" onClick={onCartClick}>
            <ShoppingBag className="w-6 h-6 text-gray-600" />
             {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-pink text-white text-[10px] flex items-center justify-center rounded-full ring-2 ring-white font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 border-t">
           {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-gray-600 hover:text-primary-cyan font-serif font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;