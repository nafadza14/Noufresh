import { motion } from 'motion/react';
import { Microscope, MessageCircle, Package, Bell } from 'lucide-react';

const features = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: "Formulasi Khusus Behel",
    description: "Non-alkohol (tidak iritasi sariawan) + fluoride (cegah demineralisasi di sekitar bracket)"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Chat Konsultasi 24/7",
    description: "Tanya apa saja soal perawatan behel langsung ke Behel Care Consultant via WhatsApp"
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Kit Perawatan Lengkap",
    description: "Mouthwash + interdental brush + sikat khusus behel + orthodontic wax dalam 1 paket"
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Reminder Perawatan Harian",
    description: "Pengingat rutin via WA supaya kamu konsisten menjaga kebersihan gigi selama pakai behel"
  }
];

export default function SolutionSection() {
  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="section-label">Solusi Noufresh</span>
            <h2 className="text-xl md:text-5xl mb-6 md:mb-8 leading-tight">
              Bukan cuma mouthwash. <br className="hidden md:block" />
              <span className="text-mint-fresh italic">Pendamping harianmu.</span>
            </h2>
            <p className="text-[0.9375rem] md:text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
              Noufresh Behel Care menggabungkan produk oralcare yang diformulasikan khusus pengguna behel dengan akses konsultasi WhatsApp tanpa batas.
            </p>
 
            <div className="space-y-6 md:space-y-8 text-left max-w-xl mx-auto lg:mx-0">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] md:rounded-2xl bg-mint-fresh text-white flex items-center justify-center shrink-0 shadow-lg shadow-mint-fresh/20">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-0.5 md:mb-1 text-sm md:text-base">{f.title}</h4>
                    <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-primary mt-12 w-full sm:w-auto h-14 md:h-16">
              Dapatkan Kit Noufresh
            </button>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img loading="lazy" decoding="async" src="https://i.pinimg.com/736x/54/c0/49/54c0494dedfe10b852a767528fd9409d.jpg" 
                alt="Noufresh Product Kit" 
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-dark/40 to-transparent"></div>
            </motion.div>
            
            {/* Decoration */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-mint-fresh/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
