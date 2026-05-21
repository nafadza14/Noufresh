import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRICING_TIERS } from '../lib/pricing';

interface ProgramSectionProps {
  showTrial?: boolean;
}

export default function ProgramSection({ showTrial = false }: ProgramSectionProps) {
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const activeTiers = showTrial 
      ? PRICING_TIERS 
      : PRICING_TIERS.filter(t => t.id !== 'trial');
    
    const formatted = activeTiers.map(t => ({
      tier: t.id,
      name: t.full_name,
      price: t.pricing.sale_price_display,
      originalPrice: t.pricing.original_price_display,
      savingsPercentage: t.pricing.savings_percentage,
      pricePerDay: t.pricing.price_per_day_display,
      duration: `${t.duration_days} Hari`,
      badge: t.badge,
      description: t.tagline,
      includes: showTrial ? t.kit_contents_display : t.homepage_items,
      highlighted: t.highlighted,
      anchorFraming: t.anchor_framing,
      ctaLabel: t.cta.label
    }));
    setPrograms(formatted);
  }, [showTrial]);

  return (
    <section id="program" className="bg-gray-50 py-24 md:py-32 overflow-hidden">
      <div className="section-container !py-0">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <span className="section-label">Pilih Program</span>
          <h2 className="text-xl md:text-5xl mb-6">Program Behel Care yang Tepat untuk Kamu</h2>
          <p className="text-gray-500 text-base">Semua program sudah termasuk 3 produk Noufresh eksklusif dan akses chat WhatsApp dengan Behel Care Consultant.</p>
        </div>

        <div className={`grid gap-8 items-start mb-16 ${showTrial ? 'sm:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-[2.5rem] p-8 md:p-10 border transition-all duration-300 ${p.highlighted ? 'order-first lg:order-none border-mint-fresh shadow-2xl lg:scale-105 z-10' : 'order-last lg:order-none border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'}`}
            >
              {p.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mint-fresh text-white text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                  {p.badge}
                </div>
              )}
              
              <div className="mb-8">
                <div className="text-sm font-bold text-mint-fresh tracking-widest mb-2">{p.name}</div>
                
                {p.originalPrice && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-400 line-through">{p.originalPrice}</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Hemat {p.savingsPercentage}
                    </span>
                  </div>
                )}

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-4xl font-extrabold text-gray-900">{p.price}</span>
                  <span className="text-gray-400 font-medium text-xs md:text-sm">/ {p.duration}</span>
                </div>
                
                {p.pricePerDay && (
                  <div className="text-xs text-gray-500 mt-1">
                    = {p.pricePerDay}
                  </div>
                )}
                
                {p.anchorFraming && (
                  <div className="text-xs text-gray-400 font-medium italic mt-2">
                    {p.anchorFraming}
                  </div>
                )}

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
                {p.ctaLabel}
              </Link>
            </motion.div>
          ))}
        </div>

        {!showTrial && (
          <div className="text-center mb-12">
            <Link 
              to="/program" 
              className="inline-flex items-center gap-2 text-mint-fresh hover:text-mint-dark font-bold text-sm transition-colors cursor-pointer group"
            >
              <span>Lihat semua isi paket</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-3 text-center border-t border-gray-100/80 pt-8">
          <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
            <ShieldCheck className="w-5 h-5 text-mint-fresh" />
            <span>Garansi 30 hari uang kembali. Tanpa syarat.</span>
          </div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Produk BPOM Terdaftar dan Halal Certified</span>
        </div>
      </div>
    </section>
  );
}
