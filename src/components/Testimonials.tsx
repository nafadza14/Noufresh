import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: "Dina R.",
    role: "Mahasiswi, PTN di Yogyakarta",
    content: "Serius beda banget. Pakai pagi, sampai sore masih kerasa segar. Mouthwash lain mah udah hilang sebelum sampai kampus 😭",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Rina K.",
    role: "Pegawai BUMN",
    content: "Mouthspray nya jadi best friendku di kantor. Tinggal semprot, langsung PD ngomong di depan rapat yang ga ada habis habisnya. Plus packaging nya lucu!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Bayu S.",
    role: "Freelancer",
    content: "Dulu suka minder kalau ngobrol dekat klien, padahal kan harus dapetin hatinya buat deal project. Sekarang habis kumur Noufresh pagi, gak pernah kepikiran soal nafas lagi, jadi PD.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  }
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

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
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark leading-tight tracking-tight"
          >
            {t.testimonials.title} <span className="text-primary-cyan">{t.testimonials.titleAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 relative z-10">
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
