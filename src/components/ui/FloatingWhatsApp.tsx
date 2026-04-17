
import React from 'react';
import { CONTACT_INFO } from '../../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={CONTACT_INFO.whatsapp_link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with CS on WhatsApp"
    >
      {/* Blinking/Ping Animation Layer */}
      <span className="absolute -inset-1 inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-1000"></span>
      
      {/* Actual Button Content */}
      <div className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full shadow-2xl transition-transform duration-300 hover:scale-105">
        {/* Always visible text */}
        <span className="font-bold text-sm tracking-wide">Chat CS</span>
        
        {/* WhatsApp Image Icon */}
        <img 
          src="https://toppng.com/uploads/preview/whatsapp-icon-logo-png-11536003317vn34oswvvg.png" 
          alt="WhatsApp" 
          referrerPolicy="no-referrer"
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
