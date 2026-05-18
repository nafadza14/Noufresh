import { motion } from 'motion/react';
import { ClipboardCheck, PackageOpen, MessageSquareHeart } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Isi Assessment Gratis",
    description: "Jawab 7 pertanyaan tentang kondisi behel kamu. Langsung dapat skor + diagnosis + panduan PDF personal.",
    icon: <ClipboardCheck className="w-8 h-8" />
  },
  {
    number: "02",
    title: "Pilih Program & Terima Kit",
    description: "Pilih program yang sesuai. Kit perawatan lengkap dikirim ke rumahmu dalam 2 sampai 3 hari kerja.",
    icon: <PackageOpen className="w-8 h-8" />
  },
  {
    number: "03",
    title: "Mulai Perawatan + Chat WhatsApp",
    description: "Ikuti panduan harian dan chat Behel Care Consultant via WA kapan pun ada keluhan atau pertanyaan.",
    icon: <MessageSquareHeart className="w-8 h-8" />
  }
];

export default function HowItWorks() {
  return (
    <section id="program" className="section-container bg-white">
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
        <span className="section-label">Cara Kerja</span>
        <h2 className="text-2xl md:text-5xl mb-6">
          3 Langkah Menuju Gigi Sehat Selama Pakai Behel
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="text-6xl md:text-8xl font-black text-mint-fresh/10 mb-[-1.5rem] md:mb-[-2rem] select-none tracking-tighter">
              {step.number}
            </div>
            <div className="relative z-10 w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-mint-fresh shadow-sm mb-6 group-hover:bg-mint-fresh group-hover:text-white transition-all duration-300">
              {step.icon}
            </div>
            <h3 className="text-xl md:text-2xl mb-4 text-gray-900 group-hover:text-mint-fresh">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
