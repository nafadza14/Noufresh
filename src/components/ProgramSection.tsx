import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const defaultPrograms = [
  {
    tier: "starter",
    name: "Dental Kit Starter",
    price: "Rp 149.000",
    duration: "30 Hari",
    description: "Mulai rawat gigi behelmu dengan benar",
    includes: [
      "1 botol Mouthwash Noufresh Behel Edition (300ml)",
      "10 pcs Interdental Brush",
      "Panduan digital 'Rawat Behel 30 Hari Pertama'",
      "Akses chat WA Consultant 30 hari",
      "Free Ongkir"
    ],
    highlighted: false
  },
  {
    tier: "complete",
    name: "Dental Kit Complete",
    price: "Rp 349.000",
    duration: "90 Hari",
    badge: "Best Seller",
    description: "Program lengkap 90 hari untuk hasil maksimal",
    includes: [
      "3 botol Mouthwash Noufresh Behel Edition",
      "30 pcs Interdental Brush",
      "Sikat gigi khusus behel (V shape)",
      "Orthodontic Wax (sariawan relief)",
      "Mirror dental mini",
      "Panduan digital '90 Hari Bebas Sariawan'",
      "Chat WhatsApp Consultant Unlimited 90 hari",
      "Reminder perawatan harian"
    ],
    highlighted: true
  },
  {
    tier: "pro",
    name: "Dental Kit Pro",
    price: "Rp 599.000",
    duration: "180 Hari",
    description: "Pendampingan penuh sampai behel lepas",
    includes: [
      "Semua isi Complete × 2",
      "Konsul video 1x dengan dokter gigi mitra",
      "Whitening preparation kit",
      "Priority response di chat WA",
      "Box exclusive storage"
    ],
    highlighted: false
  }
];

export default function ProgramSection() {
  const [programs, setPrograms] = useState<any[]>(defaultPrograms);

  useEffect(() => {
    async function fetchPackages() {
      const { data, error } = await supabase.from('packages').select('*').order('price', { ascending: true });
      if (!error && data && data.length > 0) {
        const formatted = data.map(pkg => ({
          tier: pkg.id,
          name: pkg.name,
          price: `Rp ${pkg.price.toLocaleString('id-ID')}`,
          duration: pkg.duration,
          badge: pkg.badge,
          description: pkg.description,
          includes: pkg.includes || [],
          highlighted: pkg.highlighted
        }));
        setPrograms(formatted);
      }
    }
    fetchPackages();
  }, []);

  return (
    <section id="program" className="bg-gray-50 py-24 md:py-32 overflow-hidden">
      <div className="section-container !py-0">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <span className="section-label">Pilih Program</span>
          <h2 className="text-xl md:text-5xl mb-6">Program Behel Care yang Tepat untuk Kamu</h2>
          <p className="text-gray-500 text-base">Semua program termasuk akses chat WhatsApp dengan Behel Care Consultant + panduan perawatan personal.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start mb-16">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-[2.5rem] p-8 md:p-10 border transition-all duration-300 ${p.highlighted ? 'border-mint-fresh shadow-2xl lg:scale-105 z-10' : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'}`}
            >
              {p.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mint-fresh text-white text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                  {p.badge}
                </div>
              )}
              
              <div className="mb-8">
                <div className="text-sm font-bold text-mint-fresh tracking-widest mb-2">{p.name}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-4xl font-extrabold text-gray-900">{p.price}</span>
                  <span className="text-gray-400 font-medium text-xs md:text-sm">/ {p.duration}</span>
                </div>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {p.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-mint-fresh shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-[14px] leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={`/checkout/${p.tier}`}
                className={`w-full h-13 md:h-14 rounded-full font-bold transition-all flex items-center justify-center text-[13px] md:text-sm ${p.highlighted ? 'bg-mint-fresh text-white hover:opacity-90 shadow-xl shadow-mint-fresh/20' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
              >
                Pilih {p.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 font-medium">
          <ShieldCheck className="w-5 h-5 text-mint-fresh" />
          <span>Garansi 30 hari uang kembali. Tanpa syarat.</span>
        </div>
      </div>
    </section>
  );
}
