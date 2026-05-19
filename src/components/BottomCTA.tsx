import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function BottomCTA() {
  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="section-container">
        <div className="cta-gradient rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-24 relative flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden">
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <h2 className="text-xl md:text-3xl lg:text-7xl text-white mb-8 leading-tight">
              Mulai Perjalanan Gigi Sehat <br className="hidden lg:block" /> 
              <span className="text-white/60 italic">Bebas Khawatir.</span>
            </h2>
            <p className="text-white/80 text-base md:text-2xl mb-12 max-w-xl">
              Isi assessment gratis sekarang. Tanpa appointment. Tanpa biaya konsultasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <Link 
                to="/assessment"
                className="btn-pill bg-white text-gray-900 hover:bg-gray-50 h-13 md:h-14 px-8 md:px-12 text-[13px] md:text-sm shadow-2xl font-bold flex items-center justify-center transition-all"
              >
                Mulai Assessment Sekarang
              </Link>
              <a 
                href="https://wa.me/6285157626264"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 h-13 md:h-14 px-8 md:px-12 text-[13px] md:text-sm font-bold flex items-center justify-center transition-all"
              >
                Chat WhatsApp Kami
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative z-10 pointer-events-none">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md mx-auto lg:max-w-none"
            >
              <img loading="lazy" decoding="async" src="https://i.imgur.com/3922842e-a488-4513-ab35-3e7d3d161e76.jpg"
                alt="Noufresh Care Experience"
                className="w-full h-full object-contain bg-white rounded-3xl shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"; }}
              />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-mint-light/30 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-1/2 -right-1/4 w-full h-[200%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
