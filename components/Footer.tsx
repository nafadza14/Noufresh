import React from 'react';
import { BRAND_NAME } from '../constants';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan to-primary-pink inline-block">
              {BRAND_NAME}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Membawa senyum cerah ke seluruh Indonesia dengan produk perawatan gigi yang aman, efektif, dan alami.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary-cyan hover:text-white hover:border-primary-cyan transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">Perusahaan</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Karir</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">Bantuan</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Pengiriman</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Pengembalian</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-pink transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-lg">Tetap Terhubung</h4>
            <p className="text-gray-500 mb-4 text-sm">Dapatkan info promo dan produk terbaru.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan"
              />
              <button 
                type="button"
                className="px-4 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-pink transition-all duration-300 shadow-lg shadow-gray-200"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;