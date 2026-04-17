import React from 'react';
import { motion } from 'motion/react';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 bg-primary-dark text-white overflow-hidden relative">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              {t.contact.title} <br />
              <span className="text-primary-cyan">{t.contact.subtitle}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl leading-relaxed">
              {t.contact.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input 
                type="email" 
                placeholder={t.contact.placeholder} 
                className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-cyan transition-colors"
              />
              <Button className="bg-primary-cyan text-white hover:bg-white hover:text-primary-cyan rounded-full px-8 py-4 border-none">
                {t.contact.subscribe}
              </Button>
            </div>
          </motion.div>

          {/* Right: Map / Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-5xl overflow-hidden h-[400px] relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
            <div className="absolute inset-0 bg-primary-dark/20 pointer-events-none"></div>
          </motion.div>

        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-striped-white opacity-5"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-cyan/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact;
