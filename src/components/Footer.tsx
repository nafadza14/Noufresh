import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-6 text-center md:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
          {/* Quick Links */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 text-[10px] tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><Link to="/" className="hover:text-mint-fresh transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-mint-fresh transition-colors">Tentang</Link></li>
              <li><Link to="/#program" className="hover:text-mint-fresh transition-colors">Program</Link></li>
              <li><Link to="/assessment" className="hover:text-mint-fresh transition-colors">Assessment</Link></li>
              <li><Link to="/consultation" className="hover:text-mint-fresh transition-colors">Blog Kesehatan Gigi</Link></li>
            </ul>
          </div>

          {/* PROGRAM */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 text-[10px] tracking-[0.2em]">Program</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><Link to="/checkout/starter" className="hover:text-mint-fresh transition-colors">Behel Care Starter</Link></li>
              <li><Link to="/checkout/complete" className="hover:text-mint-fresh transition-colors">Behel Care Complete</Link></li>
              <li><Link to="/checkout/pro" className="hover:text-mint-fresh transition-colors">Behel Care Pro</Link></li>
              <li><Link to="/checkout/refill" className="hover:text-mint-fresh transition-colors">Refill Order</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 text-[10px] tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><Link to="/terms" className="hover:text-mint-fresh transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link to="/privacy" className="hover:text-mint-fresh transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/refund" className="hover:text-mint-fresh transition-colors">Kebijakan Refund</Link></li>
            </ul>
          </div>

          {/* HUBUNGI KAMI */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 text-[10px] tracking-[0.2em]">Hubungi Kami</h4>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li>
                <a href="https://wa.me/6285157626264" target="_blank" rel="noopener noreferrer" className="hover:text-mint-fresh transition-colors flex items-center justify-center md:justify-start gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/noufresh" target="_blank" rel="noopener noreferrer" className="hover:text-mint-fresh transition-colors flex items-center justify-center md:justify-start gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@noufreshid" target="_blank" rel="noopener noreferrer" className="hover:text-mint-fresh transition-colors flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.44-3.6 2.38-7.1 6.04-7.48.98-.13 1.97.02 2.92.3v4.07c-.71-.35-1.54-.45-2.31-.31-1.53.25-2.83 1.62-2.92 3.16-.14 1.3.62 2.61 1.79 3.2.78.42 1.69.57 2.58.43 1.27-.15 2.4-1.01 2.81-2.22.18-.53.25-1.08.24-1.64.01-4.32-.01-8.64.01-12.96-.28-.01-.58-.01-.86-.01z"/>
                  </svg>
                  TikTok
                </a>
              </li>
              <li>
                <a href="mailto:hello@noufreshcare.com" className="hover:text-mint-fresh transition-colors flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://i.imgur.com/TPWEtiW.png" 
                alt="Noufresh Logo" 
                className="h-5 md:h-6 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="text-[0.875rem] font-medium text-gray-400 hidden md:block">
              © {new Date().getFullYear()} Noufresh Care. All rights reserved.
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-black text-gray-400 tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              BPOM Terdaftar | Halal Certified
            </div>
          </div>

          <div className="text-[10px] font-black text-gray-400 tracking-widest md:hidden">
            © {new Date().getFullYear()} Noufresh Care. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

