import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="section-label mb-4 inline-block">Pendamping Perawatan Behel #1 di Indonesia</span>
          <h1 className="main-heading mb-4 px-4 md:px-0 text-balance">
            Pakai Behel Tapi Bingung Kalau <span className="text-mint-fresh italic">Ada Masalah?</span>
          </h1>
          <p className="subtext text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed px-6 md:px-0">
            Program perawatan gigi 90 hari khusus pengguna behel dengan produk oralcare khusus untuk pengguna behel + konsultasi WhatsApp 24/7 bersama Behel Care Consultant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6 md:px-0 w-full max-w-lg mx-auto">
            <Link 
              to="/assessment"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group min-w-[240px]"
            >
              Mulai Assessment Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/shop"
              className="btn-secondary w-full sm:w-auto min-w-[200px] flex items-center justify-center"
            >
              Lihat Program
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
              <img src="https://upload.wikimedia.org/wikipedia/id/thumb/a/a8/BADAN_POM.png/330px-BADAN_POM.png" alt="BPOM" className="h-4 w-auto object-contain" />
              BPOM Terdaftar
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Halal_Indonesia.svg" alt="Halal" className="h-5 w-auto object-contain" />
              Halal Certified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
              <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-new-png-image_6315990.png" alt="WhatsApp" className="h-5 w-auto object-contain" /> Konsultasi Ekslusif 24/7
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 w-full max-w-5xl"
        >
          <div className="aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl relative">
            <img 
              src="https://i.imgur.com/SpNSZ4r.png" 
              alt="Noufresh Care Kit" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
