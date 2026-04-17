import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Marketing Director",
    content: "Noufresh has completely changed my daily routine. I feel so much more confident in meetings knowing my breath is fresh all day.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The nano technology is real. It's not just a spray; it feels like it's actually cleaning my mouth. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Yoga Instructor",
    content: "I love that it's natural and effective. I keep one in my gym bag and one in my car. It's a lifesaver!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();

  // Simple content translation for testimonials if needed, but usually names/roles are fine.
  // For a real app, these would come from a localized database.
  const localizedTestimonials = testimonials.map(item => {
    if (language === 'id') {
      const idContent: Record<number, string> = {
        1: "Noufresh telah benar-benar mengubah rutinitas harian saya. Saya merasa jauh lebih percaya diri dalam rapat mengetahui napas saya segar sepanjang hari.",
        2: "Teknologi nano itu nyata. Ini bukan sekadar semprotan; rasanya seperti benar-benar membersihkan mulut saya. Sangat merekomendasikan!",
        3: "Saya suka karena alami dan efektif. Saya simpan satu di tas olahraga dan satu di mobil saya. Sangat membantu!"
      };
      const idRoles: Record<string, string> = {
        "Marketing Director": "Direktur Pemasaran",
        "Software Engineer": "Insinyur Perangkat Lunak",
        "Yoga Instructor": "Instruktur Yoga"
      };
      return { ...item, content: idContent[item.id], role: idRoles[item.role] || item.role };
    }
    return item;
  });

  return (
    <section id="testimonial" className="py-24 px-6 bg-primary-light">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary-cyan/10 text-primary-cyan rounded-full text-[14px] font-medium tracking-wider mb-6"
          >
            {t.testimonials.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[48px] lg:text-[56px] font-extrabold text-primary-dark leading-[1.1]"
          >
            {t.testimonials.title} <span className="text-primary-cyan">{t.testimonials.titleAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localizedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-shadow duration-500"
            >
              <div className="absolute top-8 right-8 text-primary-cyan/10 group-hover:text-primary-cyan/20 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-[18px] leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-primary-dark">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
