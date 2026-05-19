import { motion } from 'motion/react';
import { Video, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';

const features = [
  {
    icon: <Video className="w-5 h-5" />,
    title: "Video Call 1-on-1",
    desc: "Diskusi langsung dengan dokter gigi spesialis konservasi & orthodontist."
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Jadwal Fleksibel",
    desc: "Pilih waktu konsultasi yang sesuai dengan rutinitas harian Anda."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Terverifikasi KKI",
    desc: "Semua dokter kami terdaftar resmi dan memiliki izin praktik aktif."
  }
];

export default function TelehealthSection() {
  return (
    <section className="bg-brand-secondary overflow-hidden py-24">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-cyan-600 rounded-full text-xs font-semibold">
              <HeartPulse className="w-3 h-3" />
              TELEHEALTH SERVICE
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-medium text-slate-900 leading-tight">
              Kontrol Behel Jadi Lebih <br />
              <span className="text-medical-blue italic">Simpel & Nyaman.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Tidak sempat ke klinik? Dapatkan saran medis profesional untuk masalah gusi, kawat lepas, atau sariawan langsung dari smartphone Anda.
            </p>
            
            <div className="grid sm:grid-cols-1 gap-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-teal-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center text-brand-primary shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="btn-primary h-14 !px-8 bg-medical-blue hover:bg-sky-700">
              Jadwalkan Konsultasi
            </button>
          </div>

          <div className="flex-1 relative">
            <div className="aspect-square rounded-[3rem] bg-teal-100 overflow-hidden shadow-inner relative">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
                alt="Telehealth Consultation" 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
              
              {/* Floating Status */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-800">12 Dokter Online</span>
                </div>
              </div>
            </div>
            
            {/* Artistic circles */}
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
