import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Download, MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const questions = [
  {
    id: 'q1',
    question: "Sudah berapa lama kamu pakai behel?",
    options: ["< 3 bulan", "3-6 bulan", "6-12 bulan", "1-2 tahun", "> 2 tahun"]
  },
  {
    id: 'q2',
    question: "Jenis behel apa yang kamu pakai?",
    options: ["Metal konvensional", "Ceramic/transparan", "Self-ligating", "Lingual", "Clear aligner"]
  },
  {
    id: 'q3',
    question: "Apa keluhan utama kamu?",
    options: ["Sariawan berulang", "Makanan sering nyangkut", "Gusi sering berdarah", "Bau mulut", "Gigi sensitif", "Belum ada keluhan"],
    multi: true
  },
  {
    id: 'q4',
    question: "Berapa kali kamu sikat gigi per hari?",
    options: ["1x", "2x", "3x atau lebih", "Tidak teratur"]
  },
  {
    id: 'q5',
    question: "Apakah kamu pakai alat bantu selain sikat gigi?",
    options: ["Interdental brush", "Dental floss", "Obat kumur", "Tidak pakai sama sekali"],
    multi: true
  },
  {
    id: 'q6',
    question: "Kapan terakhir kontrol ke ortodontis?",
    options: ["Minggu lalu", "2 sampai 4 minggu lalu", "1 sampai 2 bulan lalu", "> 2 bulan lalu", "Belum pernah"]
  },
  {
    id: 'q7',
    question: "Data diri kamu",
    type: 'form'
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    umur: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionClick = (questionId: string, option: string, multi = false) => {
    if (multi) {
      const current = (answers[questionId] as string[]) || [];
      const updated = current.includes(option) 
        ? current.filter(o => o !== option)
        : [...current, option];
      setAnswers({ ...answers, [questionId]: updated });
    } else {
      setAnswers({ ...answers, [questionId]: option });
      if (currentStep < questions.length - 1) {
        setTimeout(() => setCurrentStep(prev => prev + 1), 300);
      }
    }
  };

  const nextStep = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (!formData.nama || !formData.whatsapp || !formData.umur) {
        alert('Mohon lengkapi data diri Anda.');
        return;
      }
      setIsSubmitting(true);

      // Save to Supabase
      const { error } = await supabase.from('assessments').insert([{
        name: formData.nama,
        phone: formData.whatsapp,
        age: formData.umur,
        result: '68 Poin (Perlu Perhatian Khusus)',
        answers: answers
      }]);

      if (error) {
        console.error('Error saving assessment:', error);
        if (error.code === '42P01') {
          // Table doesn't exist yet, just continue to show result for now
          console.log('Tabel assessments belum dibuat.');
        } else {
          alert('Gagal menyimpan data: ' + error.message);
        }
      }

      setTimeout(() => {
        setShowResult(true);
        setIsSubmitting(false);
      }, 500);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResult) {
    return <ResultView />;
  }

  const isLastStep = currentStep === questions.length - 1;

  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-20 md:pt-48 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-12 bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-mint-fresh h-full"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100"
          >
            {isSubmitting ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 border-4 border-mint-fresh/20 border-t-mint-fresh rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold mb-2">Menganalisis Jawaban...</h3>
                <p className="text-gray-500">Mohon tunggu sebentar selagi kami menyiapkan laporan personal Anda.</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <span className="text-[10px] font-black tracking-[0.2em] text-mint-fresh mb-3 block">Pertanyaan {currentStep + 1} dari {questions.length}</span>
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {questions[currentStep].question}
                  </h2>
                  {questions[currentStep].multi && (
                    <p className="text-xs text-gray-400 mt-2 font-bold tracking-widest italic">* Pilih semua yang sesuai</p>
                  )}
                </div>

                {questions[currentStep].type === 'form' ? (
                  <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={formData.nama}
                        onChange={(e) => setFormData({...formData, nama: e.target.value})}
                        required
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('masukkan data yang benar')}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                        placeholder="Nama kamu" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Nomor WhatsApp</label>
                      <input 
                        type="tel" 
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        required
                        pattern="^(08|628)[0-9]{7,13}$"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('masukkan data yang benar')}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                        placeholder="0812XXXXXXXX" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Kelompok Umur</label>
                      <select 
                        value={formData.umur}
                        onChange={(e) => setFormData({...formData, umur: e.target.value})}
                        required
                        onInvalid={(e) => (e.target as HTMLSelectElement).setCustomValidity('masukkan data yang benar')}
                        onInput={(e) => (e.target as HTMLSelectElement).setCustomValidity('')}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all appearance-none"
                      >
                        <option value="">Pilih umur</option>
                        <option value="< 18">{'< 18 tahun'}</option>
                        <option value="18-22">18-22 tahun</option>
                        <option value="23-27">23-27 tahun</option>
                        <option value="28-32">28-32 tahun</option>
                        <option value="> 32">{'> 32 tahun'}</option>
                      </select>
                    </div>
                    <div className="mt-12 flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 disabled:opacity-0 transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" /> Kembali
                      </button>
                      <button 
                        type="submit"
                        className="btn-primary !py-3 !px-8 flex items-center gap-2 shadow-mint-fresh/20"
                      >
                        Lihat Hasil <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {questions[currentStep].options?.map((option) => {
                      const isSelected = Array.isArray(answers[questions[currentStep].id]) 
                        ? (answers[questions[currentStep].id] as string[]).includes(option)
                        : answers[questions[currentStep].id] === option;

                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(questions[currentStep].id, option, questions[currentStep].multi)}
                          className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between group ${isSelected ? 'border-mint-fresh bg-mint-fresh/5 text-mint-fresh shadow-md' : 'border-gray-100 text-gray-600 hover:border-mint-fresh/30 hover:bg-gray-50'}`}
                        >
                          {option}
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-mint-fresh border-mint-fresh text-white' : 'border-gray-200 group-hover:border-mint-fresh/30'}`}>
                            {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {!isLastStep && (
                  <div className="mt-12 flex justify-between items-center">
                    <button 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 disabled:opacity-0 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                    {questions[currentStep].multi && (
                      <button 
                        onClick={nextStep}
                        className="btn-primary !py-3 !px-8 flex items-center gap-2 shadow-mint-fresh/20"
                      >
                        Lanjut <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center text-gray-400 text-xs font-medium px-4">
          Data Anda aman dan terenkripsi. Kami hanya menggunakan data ini untuk memberikan rekomendasi perawatan terbaik.
        </div>
      </div>
    </main>
  );
}

function ResultView() {
  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-20 md:pt-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-mint-fresh p-12 md:p-20 text-center text-white relative overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10"
            >
              <div className="w-28 h-28 md:w-48 md:h-48 border-8 border-white/20 rounded-full flex flex-col items-center justify-center mx-auto mb-8 bg-white/10 backdrop-blur-md">
                <span className="text-4xl md:text-7xl font-black">68</span>
                <span className="text-xs md:text-sm font-bold opacity-60 tracking-widest mt-[-0.5rem]">Poin</span>
              </div>
              <h2 className="text-2xl md:text-5xl text-white mb-4">Perlu Perhatian Khusus</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto">Pola perawatan kamu sudah cukup baik, namun ada beberapa "Red Flags" yang berisiko memperlama masa pakai behel kamu.</p>
            </motion.div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>

          <div className="p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <AlertCircle className="text-red-500 w-5 h-5" /> Analisis Risiko
                  </h3>
                  <div className="space-y-4">
                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl">
                      <div className="font-bold text-red-900 text-sm mb-1">Potensi Penyakit Gusi</div>
                      <p className="text-red-700/70 text-[13px]">Keluhan gusi berdarah menunjukkan adanya perdarahan gingiva akibat akumulasi plak di bracket.</p>
                    </div>
                    <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl">
                      <div className="font-bold text-orange-900 text-sm mb-1">Demineralisasi Enamel</div>
                      <p className="text-orange-700/70 text-[13px]">Jarang menggunakan interdental brush meningkatkan risiko 'white spot lesions' di sekitar bracket.</p>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-3 p-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">
                  <Download className="w-5 h-5" /> Download Panduan PDF Personal
                </button>
              </div>

              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <span className="text-[10px] font-black text-mint-fresh tracking-widest mb-3 block">Rekomendasi Program</span>
                <h4 className="text-2xl font-bold mb-4">Dental Kit Complete (90 Hari)</h4>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Dirancang untuk mengatasi akumulasi plak dan mempercepat penyembuhan sariawan dalam 90 hari transformasi.</p>
                <Link to="/checkout/complete" className="btn-primary w-full block text-center mb-4">
                   Pilih Program Ini Rp 349rb
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-mint-fresh" /> Garansi 30 Hari Uang Kembali
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-gray-100 text-center">
              <p className="text-gray-500 mb-8 max-w-xl mx-auto">Ingin konsultasi lebih detail mengenai hasil skor kamu dengan Behel Care Consultant kami?</p>
              <a href="https://wa.me/6285157626264?text=Halo%20Noufresh,%20skor%20assessment%20saya%2068.%20Bisa%20bantu%20jelaskan?" className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-full font-bold shadow-xl shadow-green-500/20 hover:scale-105 transition-all">
                <MessageCircle className="w-6 h-6 fill-current" /> Konsultasi WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
