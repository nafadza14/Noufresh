import { motion } from 'motion/react';
import { Heart, Users, Shield, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: <Heart className="w-10 h-10 text-mint-fresh" />,
    title: "Peduli",
    description: "Kami peduli dengan kesehatan gigi kamu, bukan cuma sekadar penjualan produk."
  },
  {
    icon: <Users className="w-10 h-10 text-mint-fresh" />,
    title: "Pendampingan",
    description: "Setiap pelanggan mendapat perhatian personal dari tim Behel Care Consultant kami."
  },
  {
    icon: <Shield className="w-10 h-10 text-mint-fresh" />,
    title: "Kualitas",
    description: "Produk BPOM + Halal. Formulasi non-alkohol sesuai standar orthodontic internasional."
  }
];

export default function About() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="section-label">Cerita Kami</span>
            <h1 className="text-3xl md:text-7xl mb-8">
              Menjadikan Perawatan Behel <br className="hidden md:block" /> 
              <span className="text-mint-fresh">Lebih Mudah Sesuah Rencana.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Noufresh Care lahir dari pengalaman nyata: sariawan yang tidak kunjung sembuh, gusi berdarah yang diabaikan, dan rasa bingung merawat gigi saat pakai behel. Kami membangun Noufresh supaya tidak ada lagi pengguna behel yang merasa sendirian.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-container border-b border-gray-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Perjalanan memakai behel adalah sebuah investasi besar baik secara finansial maupun waktu. Namun, kami menyadari bahwa dukungan medis seringkali berhenti setelah Anda melangkah keluar dari pintu klinik ortodontis.
            </p>
            <p>
              Di antara jadwal kontrol bulanan, banyak masalah kecil yang bisa menjadi besar: bracket yang lepas, sariawan yang mengganggu aktivitas makan, hingga penumpukan plak yang menyebabkan bau mulut.
            </p>
            <p className="font-bold text-gray-900 italic">
              "Kami percaya bahwa setiap senyum behel layak mendapatkan perlindungan terbaik setiap harinya."
            </p>
            <p>
              Itulah mengapa Noufresh hadir bukan hanya sebagai toko produk dental, tapi sebagai sistem pendukung (support system) yang menemani Anda selama 24/7 melalui teknologi telehealth.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200" 
                alt="Our Vision" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-mint-fresh text-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
              <div className="text-3xl font-black mb-2">90 Hari</div>
              <div className="text-sm font-medium opacity-80 tracking-widest">Program Pendampingan Transformasi Senyum</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-container bg-gray-50/50">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Nilai-Nilai Kami</span>
          <h2 className="text-2xl md:text-5xl mb-4">Prinsip Kami</h2>
          <p className="text-gray-500 text-lg">Prinsip yang kami pegang dalam setiap produk dan layanan.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-center hover:shadow-xl transition-all"
            >
              <div className="mb-6 mx-auto">{v.icon}</div>
              <h3 className="text-2xl mb-4">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-5xl mb-8 leading-tight">Produk Tersertifikasi & Teruji secara Medis</h2>
          <p className="text-lg text-gray-500 mb-12">
            Semua produk Noufresh diproduksi di pabrik berstandar BPOM dengan bahan yang terdaftar dan aman digunakan jangka panjang untuk kesehatan mulut Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-mint-fresh" />
              </div>
              <span className="font-bold text-gray-900 tracking-widest text-xs">BPOM Approved</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-mint-fresh" />
              </div>
              <span className="font-bold text-gray-900 tracking-widest text-xs">Halal Certified</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-mint-fresh" />
              </div>
              <span className="font-bold text-gray-900 tracking-widest text-xs">Non Alcohol Gel</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
