import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Apakah Noufresh aman untuk semua jenis behel?",
    answer: "Ya. Noufresh Behel Edition diformulasikan untuk semua jenis behel: metal konvensional, ceramic, self ligating, lingual, dan clear aligner. Formulasi non alkohol memastikan tidak ada iritasi tambahan pada mukosa mulut."
  },
  {
    question: "Apa bedanya dengan mouthwash biasa?",
    answer: "Mouthwash biasa banyak yang mengandung alkohol tinggi yang memperparah sariawan. Noufresh diformulasikan non alkohol + fluoride konsentrasi tepat. Plus, kamu dapat akses chat konsultasi 24/7."
  },
  {
    question: "Bagaimana cara kerja chat Behel Care Consultant?",
    answer: "Setelah membeli program, kamu akan akses ke WhatsApp kami. Kamu bisa mengirim pertanyaan, foto kondisi gigi, atau keluhan kapan saja. Tim kami akan merespons dalam waktu kurang dari 15 menit di jam operasional."
  },
  {
    question: "Berapa lama estimasi pengiriman?",
    answer: "Kit dikirim via kurir ekspres. Estimasi: Jabodetabek 1 sampai 2 hari kerja, luar Jabodetabek 2 sampai 4 hari kerja. Gratis ongkos kirim untuk semua program."
  },
  {
    question: "Bagaimana kalau saya merasa tidak cocok?",
    answer: "Kami memberikan garansi 30 hari uang kembali tanpa syarat. Jika dalam 30 hari merasa tidak cocok, hubungi kami via WhatsApp dan kami akan refund penuh."
  },
  {
    question: "Apakah Noufresh menggantikan kontrol ke dokter gigi?",
    answer: "Tidak. Noufresh adalah pendamping perawatan harian. Kami tetap merekomendasikan kamu kontrol rutin ke ortodontis sesuai jadwal."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-container bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <span className="section-label">Faq</span>
        <h2 className="text-2xl md:text-5xl mb-6">Pertanyaan yang Sering Ditanyakan</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left group transition-all"
              >
                <span className={`text-base md:text-xl font-bold transition-colors ${openIndex === i ? 'text-mint-fresh' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-mint-fresh text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pb-8 text-gray-500 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
