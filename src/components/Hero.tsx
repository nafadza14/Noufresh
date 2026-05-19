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
              <img loading="eager" decoding="async" src="/bpom.png" alt="BPOM" className="h-4 w-auto object-contain" />
              BPOM Terdaftar
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
              <img loading="eager" decoding="async" src="/halal.svg" alt="Halal" className="h-5 w-auto object-contain" />
              Halal Certified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Konsultasi Ekslusif 24/7
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
            <img loading="eager" decoding="async" src="/hero.jpg" 
              alt="Noufresh Care Kit" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
