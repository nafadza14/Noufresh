import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Nisa, 20 tahun",
    location: "Jakarta",
    behel_type: "Behel Metal, 10 bulan",
    quote: "Sebelum pakai Noufresh, sariawan udah kayak temen sehari-hari. Sekarang udah 2 bulan ga sariawan lagi. Chat consultant-nya juga responsif banget, berasa punya asisten dokter pribadi.",
    avatar: "https://i.pinimg.com/736x/74/dd/d2/74ddd2420c24023dff86f47813b78348.jpg",
    rating: 5
  },
  {
    name: "Dinda, 26 tahun",
    location: "Bandung",
    behel_type: "Behel Ceramic, 14 bulan",
    quote: "Yang bikin aku beli bukan mouthwash-nya, tapi chat WA-nya. Setiap ada masalah bisa langsung nanya, ga perlu nunggu jadwal kontrol. Worth every rupiah.",
    avatar: "https://i.pinimg.com/736x/63/eb/07/63eb07de87ba6e9518c4e04dd3150f61.jpg",
    rating: 5
  },
  {
    name: "Rina, 30 tahun",
    location: "Surabaya",
    behel_type: "Self ligating, 5 bulan",
    quote: "Dokter gigi mitra bilang gusiku jauh lebih sehat dibanding pasien behel lain di bulan ke 5. Noufresh + reminder harian bener bener bikin aku disiplin rawat gigi.",
    avatar: "https://i.pinimg.com/1200x/00/33/cb/0033cbee5026a0f19b2b6d59bb93b09d.jpg",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="bg-white py-24 md:py-32">
      <div className="section-container !py-0">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label">Cerita Mereka</span>
          <h2 className="text-xl md:text-5xl mb-6">Dari Pengguna Behel, untuk Pengguna Behel</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50/50 p-6 md:p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-mint-fresh text-mint-fresh" />
                ))}
              </div>
              <div className="relative mb-8">
                <Quote className="w-10 h-10 text-mint-fresh opacity-10 absolute -top-4 -left-4" />
                <p className="text-gray-700 leading-relaxed italic text-base md:text-lg relative z-10">
                   "{t.quote}"
                </p>
              </div>
              <div className="mt-auto pt-8 border-t border-gray-200/50 w-full flex flex-col items-center">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover mb-4 shadow-sm grayscale-[0.5] hover:grayscale-0 transition-all duration-500" />
                <h4 className="font-extrabold text-gray-900">{t.name}</h4>
                <div className="text-[12px] font-bold text-mint-fresh tracking-widest mt-1">{t.behel_type}</div>
                <div className="text-[11px] text-gray-400 font-medium mt-1">{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
