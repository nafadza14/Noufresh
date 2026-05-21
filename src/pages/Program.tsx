import ProgramSection from '../components/ProgramSection';
import { ShieldCheck, CheckCircle2, Clock, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Program() {
  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Header */}
      <section className="hero-gradient py-20 text-center">
        <div className="section-container !py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="section-label mb-4 inline-block">Program Perawatan Eksklusif</span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Investasi Terbaik untuk <span className="text-mint-fresh">Senyum Sempurna</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Pilih paket yang paling sesuai dengan durasi perawatan behel Anda. Dapatkan pendampingan profesional di setiap langkahnya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Details Section */}
      <ProgramSection showTrial={true} />

      {/* Kenapa Harus Memilih Program Kami */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="section-container !py-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai Lebih di Setiap Paket</h2>
            <p className="text-gray-500">Selain produk berkualitas, Anda mendapatkan layanan premium berikut di semua tier program.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-mint-fresh/10 text-mint-fresh rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Konsultan Pribadi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Akses prioritas ke WhatsApp Consultant. Tidak perlu bingung saat kawat lepas, sariawan parah, atau ngilu berkepanjangan. Kami selalu siap membantu.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-mint-fresh/10 text-mint-fresh rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Panduan & Reminder</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Menerima jadwal harian untuk menyikat gigi, mengganti karet (jika mandiri), dan membersihkan sela-sela gigi menggunakan alat yang tepat.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-mint-fresh/10 text-mint-fresh rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Produk Terkurasi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Semua item di dalam kit dipilih secara medis khusus untuk pasien ortodontik, terdaftar resmi di BPOM dan bersertifikat Halal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
