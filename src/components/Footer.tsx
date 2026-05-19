import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-8 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 relative z-10">
          {/* Column 1: Company */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">About Us</Link></li>
              <li><Link to="/#program" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Services</Link></li>
              <li><Link to="/assessment" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Dentist</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><a href="https://wa.me/6285157626264" target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Contact Us</a></li>
              <li><Link to="/consultation" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Blog</Link></li>
              <li><Link to="/#faq" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Faq</Link></li>
              <li><Link to="/404" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">404 Error</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-8">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Terms and Conditions</Link></li>
              <li><Link to="/refund" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">License</Link></li>
              <li><Link to="/refund" className="text-[15px] font-medium text-gray-600 hover:text-mint-fresh transition-colors">Instruction</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="md:pl-4">
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-4">We'd love to help you with ease</h4>
            <a 
              href="mailto:hello@noufreshcare.com" 
              className="text-2xl md:text-3xl font-normal text-gray-900 hover:text-mint-fresh transition-colors tracking-tight mb-8 block"
            >
              hello@noufreshcare.com
            </a>
            
            <h5 className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-4">Follow Us</h5>
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/6285157626264" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-mint-fresh hover:text-white hover:border-mint-fresh transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/noufresh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-mint-fresh hover:text-white hover:border-mint-fresh transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@noufreshid" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-mint-fresh hover:text-white hover:border-mint-fresh transition-all"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.44-3.6 2.38-7.1 6.04-7.48.98-.13 1.97.02 2.92.3v4.07c-.71-.35-1.54-.45-2.31-.31-1.53.25-2.83 1.62-2.92 3.16-.14 1.3.62 2.61 1.79 3.2.78.42 1.69.57 2.58.43 1.27-.15 2.4-1.01 2.81-2.22.18-.53.25-1.08.24-1.64.01-4.32-.01-8.64.01-12.96-.28-.01-.58-.01-.86-.01z"/>
                </svg>
              </a>
              <a 
                href="mailto:hello@noufreshcare.com" 
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-mint-fresh hover:text-white hover:border-mint-fresh transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Large Watermark Text */}
        <div className="text-[13vw] font-black text-gray-100/70 text-center select-none leading-none tracking-tighter my-4 md:my-6 transition-all duration-300">
          Noufresh
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 tracking-wider">
          <div>
            © {new Date().getFullYear()} All Rights Reserved
          </div>
          <div className="flex items-center gap-8">
            <Link to="/terms" className="hover:text-mint-fresh transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-mint-fresh transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
