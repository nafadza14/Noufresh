import { motion } from 'motion/react';
import { Video, Calendar, ShieldCheck, UserCheck, MessageSquare, Clock } from 'lucide-react';

const steps = [
  { icon: <Calendar className="w-8 h-8" />, title: "Pilih Jadwal", desc: "Tentukan waktu konsultasi yang paling nyaman bagi Anda." },
  { icon: <Video className="w-8 h-8" />, title: "Konsultasi Video", desc: "Berdiskusi langsung secara tatap muka melalui room konsultasi kami." },
  { icon: <MessageSquare className="w-8 h-8" />, title: "Resep & Saran", desc: "Terima catatan medis dan rekomendasi produk sesuai kondisi Anda." },
];

const doctors = [
  { name: 'drg. Sarah Anindita', spec: 'Orthodontist', years: '8 Tahun', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop' },
  { name: 'drg. Budi Hartono', spec: 'General Dentist', years: '12 Tahun', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop' },
  { name: 'drg. Amelia Putri', spec: 'Periodontist', years: '6 Tahun', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop' },
];

export default function Consultation() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden hero-gradient pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-mint-fresh/10 text-mint-fresh rounded-full text-xs font-bold mb-8 tracking-widest"
          >
            <Clock className="w-4 h-4" /> Respon Cepat &lt; 15 Menit
          </motion.div>
          <h1 className="main-heading mb-6 px-4 md:px-0 text-balance">
            Akses Spesialis <br className="hidden md:block" />
            <span className="text-mint-fresh italic">Tanpa Antre.</span>
          </h1>
          <p className="subtext text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed px-6 md:px-0">
            Dapatkan diagnosa awal dan rekomendasi perawatan kawat gigi langsung dari ahlinya. Aman, terpercaya, dan profesional.
          </p>
          <button className="btn-primary w-full sm:w-auto h-13 px-10 text-[13px] md:text-sm shadow-xl shadow-mint-fresh/20 flex items-center justify-center cursor-pointer">
            Jadwalkan Sekarang
          </button>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-container bg-white">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="section-label">Telehealth Service</span>
          <h2 className="text-3xl md:text-5xl mb-6 font-bold text-gray-900">Cara Kerja Konsultasi Digital</h2>
          <p className="subtext text-gray-500">Tiga langkah mudah untuk senyum yang lebih sehat tanpa perlu keluar rumah.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((s, i) => (
            <div key={i} className="text-center group bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl hover:border-mint-fresh/20 transition-all duration-300">
              <div className="w-20 h-20 bg-white text-mint-fresh rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-mint-fresh group-hover:text-white transition-all duration-500">
                <div className="transform transition-transform duration-500 group-hover:scale-110">{s.icon}</div>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{s.title}</h4>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor List */}
      <section className="bg-gray-50 py-24 md:py-32 border-y border-gray-100">
        <div className="section-container !py-0">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="section-label">Klinik Gigi Digital</span>
            <h2 className="text-3xl md:text-5xl mb-6 font-bold text-gray-900">Behel Care Consultants</h2>
            <p className="subtext text-gray-500 mb-8">Pilih dokter yang sesuai dengan kebutuhan perawatan orthodontic Anda.</p>
            <div className="flex items-center justify-center gap-3 text-mint-fresh font-extrabold tracking-widest text-xs md:text-sm bg-mint-fresh/10 py-3 px-6 rounded-full inline-flex mx-auto">
              <UserCheck className="w-5 h-5" /> 24 Dokter Tersedia Online
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((d, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-mint-fresh/30 transition-all flex flex-col items-center text-center"
              >
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shrink-0 shadow-inner mb-8">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-bold text-gray-900 text-xl mb-1">{d.name}</h4>
                  <div className="text-sm text-mint-fresh font-bold mb-4 tracking-wide">{d.spec}</div>
                  <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase bg-gray-50 px-4 py-1.5 rounded-full mb-8">Exp. {d.years}</div>
                  <button className="w-full btn-secondary h-12 text-xs hover:bg-mint-fresh hover:text-white hover:border-mint-fresh transition-all cursor-pointer">
                    Jadwalkan Temu
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-container bg-white text-center pb-32">
        <h3 className="text-gray-400 font-black tracking-[0.2em] text-[10px] uppercase mb-16 opacity-70">Bekerjasama & Terdaftar Secara Resmi</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          <img 
            src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062013/pdgi_logo_1.jpg?itok=G0L20Ikm" 
            alt="PDGI" 
            className="h-12 md:h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Logo_Kementerian_Komunikasi_dan_Digital_Republik_Indonesia_%282024_full_version%29.svg/1280px-Logo_Kementerian_Komunikasi_dan_Digital_Republik_Indonesia_%282024_full_version%29.svg.png" 
            alt="KOMDIGI" 
            className="h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png" 
            alt="KEMENKES" 
            className="h-10 md:h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          />
        </div>
      </section>
    </div>
  );
}
