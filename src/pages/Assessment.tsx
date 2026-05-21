import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Download, MessageCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const questions = [
  {
    id: 'q1',
    question: "Sudah berapa lama kamu pakai behel?",
    options: ["kurang dari 3 bulan", "3 sampai 6 bulan", "6 sampai 12 bulan", "1 sampai 2 tahun", "lebih dari 2 tahun"]
  },
  {
    id: 'q2',
    question: "Jenis behel apa yang kamu pakai?",
    options: ["Metal konvensional", "Keramik atau transparan", "Self ligating", "Lingual", "Clear aligner"]
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
    options: ["Minggu lalu", "2 sampai 4 minggu lalu", "1 sampai 2 bulan lalu", "lebih dari 2 bulan lalu", "Belum pernah"]
  },
  {
    id: 'q7',
    question: "Data diri kamu",
    type: 'form'
  }
];

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    umur: ''
  });
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

      // Calculate score and category dynamically
      let score = 100;

      // Q3 (complaints): id 'q3'
      const keluhanSelected = (answers['q3'] as string[]) || [];
      if (keluhanSelected.length > 0 && !keluhanSelected.includes('Belum ada keluhan')) {
        score -= Math.min(30, keluhanSelected.length * 10);
      }

      // Q4 (brush frequency): id 'q4'
      const sikatGigi = answers['q4'] as string;
      if (sikatGigi === '2x') score -= 5;
      else if (sikatGigi === '1x') score -= 20;
      else if (sikatGigi === 'Tidak teratur') score -= 25;

      // Q5 (helper tools): id 'q5'
      const alatBantu = (answers['q5'] as string[]) || [];
      if (alatBantu.includes('Tidak pakai sama sekali') || alatBantu.length === 0) {
        score -= 25;
      } else {
        let offsets = 0;
        if (alatBantu.includes('Interdental brush')) offsets += 10;
        if (alatBantu.includes('Dental floss')) offsets += 8;
        if (alatBantu.includes('Obat kumur')) offsets += 7;
        score -= Math.max(0, 25 - offsets);
      }

      // Q6 (last ortho visit): id 'q6'
      const kontrol = answers['q6'] as string;
      if (kontrol === '1 sampai 2 bulan lalu') score -= 10;
      else if (kontrol === '> 2 bulan lalu') score -= 20;
      else if (kontrol === 'Belum pernah') score -= 25;

      score = Math.max(0, Math.min(100, score));

      let categoryId = 'perlu_perhatian';
      let categoryLabel = 'Ada 2–3 Kebiasaan yang Perlu Diperbaiki';
      if (score <= 39) {
        categoryId = 'risiko_tinggi';
        categoryLabel = 'Gigi Kamu Butuh Bantuan Sekarang';
      } else if (score <= 59) {
        categoryId = 'perlu_perhatian';
        categoryLabel = 'Ada 2–3 Kebiasaan yang Perlu Diperbaiki';
      } else if (score <= 79) {
        categoryId = 'cukup_baik';
        categoryLabel = 'Perawatan Kamu Sudah di Jalur yang Benar';
      } else {
        categoryId = 'sangat_baik';
        categoryLabel = 'Perawatan Kamu Sudah Sangat Baik';
      }

      // Save to Supabase
      const { error } = await supabase.from('assessments').insert([{
        name: formData.nama,
        phone: formData.whatsapp,
        age: formData.umur,
        result: `${score} Poin (${categoryLabel})`,
        answers: answers
      }]);

      if (error) {
        console.error('Error saving assessment:', error);
        if (error.code === '42P01') {
          console.log('Tabel assessments belum dibuat.');
        } else {
          alert('Gagal menyimpan data: ' + error.message);
        }
      }

      setTimeout(() => {
        setIsSubmitting(false);
        const complaintsParam = encodeURIComponent(JSON.stringify(keluhanSelected));
        const durationParam = encodeURIComponent(answers['q1'] as string || '');
        navigate(`/assessment/result?score=${score}&category=${categoryId}&keluhan=${complaintsParam}&duration=${durationParam}`);
      }, 800);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
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
