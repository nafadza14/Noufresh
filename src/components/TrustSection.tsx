import { motion } from 'motion/react';
import { ShieldCheck, Award, Droplets, UserCheck } from 'lucide-react';

const trustItems = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-mint-fresh" />,
    title: "BPOM Terdaftar",
    description: "Semua produk Noufresh terdaftar resmi di BPOM dan aman digunakan sesuai regulasi Indonesia."
  },
  {
    icon: <Award className="w-8 h-8 text-mint-fresh" />,
    title: "Halal Certified",
    description: "Bersertifikasi halal untuk kenyamanan dan ketenangan seluruh pengguna Noufresh."
  },
  {
    icon: <Droplets className="w-8 h-8 text-mint-fresh" />,
    title: "Formulasi Non Alkohol",
    description: "Dirancang khusus untuk pengguna behel yang rentan sariawan tidak menyebabkan iritasi mukosa."
  },
  {
    icon: <UserCheck className="w-8 h-8 text-mint-fresh" />,
    title: "Rekomendasi Dokter",
    description: "Formulasi fluoride + non-alkohol sesuai standar perawatan yang direkomendasikan klinik gigi."
  }
];

export default function TrustSection() {
  return (
    <section className="bg-white py-24 border-t border-gray-50">
      <div className="section-container !py-0">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Kenapa Noufresh?</span>
          <h2 className="text-xl md:text-5xl mb-4 leading-tight">Dipercaya karena Komitmen pada Kualitas</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
            >
              <div className="mb-6 transform transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
