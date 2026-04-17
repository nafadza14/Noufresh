import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '98%', label: t.about.stats.feedback },
    { value: '2k+', label: t.about.stats.customers },
    { value: '4.9*', label: t.about.stats.rating },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-primary-light">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-primary-cyan/10 text-primary-cyan rounded-full text-[14px] font-medium tracking-wider mb-6">
              {t.about.badge}
            </div>
            <h2 className="text-[56px] lg:text-[64px] font-extrabold mb-8 leading-[1.1]">
              {t.about.title} <br />
              <span className="text-primary-cyan">{t.about.titleAccent}</span>
            </h2>
            <p className="text-gray-500 text-[18px] font-normal mb-12 max-w-xl leading-relaxed">
              {t.about.description}
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-4xl font-bold text-primary-dark mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image Grid / Bento */}
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-4xl overflow-hidden h-full"
            >
              <img 
                src="https://i.pinimg.com/736x/d5/9c/9b/d59c9b01f544ab482350e2d16c4c7a85.jpg" 
                alt="Lab" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-4xl overflow-hidden bg-primary-cyan flex items-center justify-center p-8 text-white text-center"
              >
                <div>
                  <p className="text-5xl font-bold mb-2">10+</p>
                  <p className="text-sm tracking-widest opacity-80">{t.about.research}</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-4xl overflow-hidden"
              >
                <img 
                  src="https://i.pinimg.com/736x/d5/9c/9b/d59c9b01f544ab482350e2d16c4c7a85.jpg" 
                  alt="Product" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
