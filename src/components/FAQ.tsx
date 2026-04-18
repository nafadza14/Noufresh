import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-white border text-primary-dark border-gray-100 rounded-3xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex justify-between items-center text-left"
      >
        <span className="font-bold pr-4 lg:text-lg">{question}</span>
        <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-cyan text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-gray-500 text-[15px] leading-relaxed border-t border-gray-50 pt-4 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50/50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-cyan/10 text-primary-cyan rounded-full text-[14px] font-medium tracking-wider mb-6">
            {t.faq?.badge || "FAQ"}
          </div>
          <h2 className="text-3xl md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] text-primary-dark">
            {t.faq?.title || "Pertanyaan umum"} <br />
            <span className="text-primary-cyan">{t.faq?.titleAccent || "Yang Sering Ditanyakan"}</span>
          </h2>
        </div>

        <div className="space-y-4">
          {t.faq?.items?.map((item: any, index: number) => (
            <FAQItem
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
