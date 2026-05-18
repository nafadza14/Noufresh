import { motion } from 'motion/react';
import { ShieldAlert, Droplets, Zap, MessageCircleWarning, ArrowDownCircle, Clock9 } from 'lucide-react';

const problems = [
  {
    icon: <MessageCircleWarning className="w-12 h-12 text-mint-fresh" />,
    title: "Sariawan Berulang",
    description: "Gesekan kawat dan braket menyebabkan luka di pipi bagian dalam, bibir, dan lidah. Rasa perih bisa mengganggu makan dan bicara."
  },
  {
    icon: <Droplets className="w-12 h-12 text-mint-fresh" />,
    title: "Gusi Berdarah & Bengkak",
    description: "Plak menumpuk di sekitar bracket yang sulit dijangkau sikat gigi biasa. Bakteri menginfeksi gusi dan menyebabkan peradangan."
  },
  {
    icon: <ShieldAlert className="w-12 h-12 text-mint-fresh" />,
    title: "Gigi Kuning Permanen",
    description: "White spot lesions terbentuk di sekitar bracket akibat demineralisasi. Baru terlihat saat behel dilepas dan bersifat permanen."
  },
  {
    icon: <Zap className="w-12 h-12 text-mint-fresh" />,
    title: "Bau Mulut Membandel",
    description: "Sisa makanan terperangkap di kawat dan bracket. Plak bakteri berkembang biak dan menghasilkan bau yang sulit diatasi."
  },
  {
    icon: <ArrowDownCircle className="w-12 h-12 text-mint-fresh" />,
    title: "Gusi Turun (Resesi)",
    description: "88% pengguna behel jangka panjang mengalami penurunan gusi minimal di salah satu giginya. Ini bisa permanen jika tidak dicegah."
  },
  {
    icon: <Clock9 className="w-12 h-12 text-mint-fresh" />,
    title: "Treatment Diperpanjang",
    description: "Perawatan yang buruk bisa memperpanjang masa pakai behel 3 sampai 6 bulan artinya biaya kontrol tambahan yang membengkak."
  }
];

export default function ProblemSection() {
  return (
    <section className="section-container bg-white">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="section-label">Masalah Pengguna Behel</span>
        <h2 className="text-xl md:text-5xl mb-6">
          Pake behel merupakan investasi besar buatmu, tapi udah tau cara merawatnya gimana?
        </h2>
        <p className="text-[0.9375rem] md:text-xl leading-relaxed">
          Kontrol ke dokter kan cuma sebulan sekali, 29 hari lainnya kamu sering merasa sendirian dan bingung kan gimana cara merawat behel yang baik dan benar? Cari informasi sana sini malah bisa jadi masalah, kamu bisa aja menghadapi berbagai risiko besar seperti:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] border border-gray-100 hover:border-mint-fresh/30 hover:bg-gray-50/50 transition-all group"
          >
            <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300">
              {problem.icon}
            </div>
            <h3 className="text-lg md:text-xl mb-3">{problem.title}</h3>
            <p className="text-gray-500">
              {problem.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
