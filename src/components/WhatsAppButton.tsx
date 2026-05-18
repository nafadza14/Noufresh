import { motion } from 'motion/react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/6285157626264"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-50 transition-colors p-3"
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="https://i.imgur.com/U79kasl.png" 
        alt="WhatsApp" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </motion.a>
  );
}
