
import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href="https://wa.me/6285157626264" 
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
        
        {/* WhatsApp SVG Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.916-.446-.445 0-.967.174-1.472.744-.505.57-1.932 1.887-1.932 4.604 0 2.717 1.979 5.341 2.254 5.713.272.371 3.868 6.223 9.49 8.169 3.754 1.301 4.516 1.044 5.334.969.818-.075 2.624-1.071 2.995-2.106.372-1.035.372-1.921.272-2.105-.101-.174-.372-.272-.669-.421z"/>
        </svg>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
