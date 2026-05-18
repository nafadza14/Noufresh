import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AssessmentCTA() {
  return (
    <section className="bg-mint-fresh/5 py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="cta-gradient rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-xl md:text-3xl lg:text-5xl text-white mb-6">
              Assessment Kebersihan <br className="hidden md:block" /> Behel Kamu Gratis
            </h2>
            <p className="text-white/80 text-[0.875rem] md:text-lg mb-10 leading-relaxed">
              7 pertanyaan, 60 detik, langsung tahu hasilnya + dapat panduan PDF personal sesuai kondisi behelmu.
            </p>
            <Link 
              to="/assessment"
              className="btn-pill bg-white text-mint-fresh hover:bg-gray-50 px-8 md:px-10 h-12 md:h-14 font-bold inline-flex items-center justify-center gap-2 mx-auto text-sm md:text-base"
            >
              Mulai Assessment Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-trust/20 rounded-full blur-3xl -ml-24 -mb-24"></div>
        </div>
      </div>
    </section>
  );
}
