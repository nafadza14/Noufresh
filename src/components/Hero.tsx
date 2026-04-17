import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import Button from './ui/Button';
import { SERVICES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMAGES = [
  "https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/9775440/pexels-photo-9775440.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/5842006/pexels-photo-5842006.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/31219728/pexels-photo-31219728.jpeg?auto=compress&cs=tinysrgb&w=1920"
];

const PRODUCT_IMAGES = [
  "https://i.pinimg.com/736x/25/2e/01/252e014cb899c846b2a52d4ef3cff867.jpg",
  "https://i.pinimg.com/736x/6d/8f/c2/6d8fc2dc85d323248a4560a08880191a.jpg",
  "https://i.pinimg.com/736x/3b/91/d7/3b91d74674616032734f98d8262eb052.jpg",
  "https://i.pinimg.com/736x/3b/91/d7/3b91d74674616032734f98d8262eb052.jpg"
];

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    const productTimer = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
    }, 2000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(productTimer);
    };
  }, []);

  return (
    <section id="home" className="h-screen w-full relative overflow-hidden">
      {/* Background Image Slider with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={HERO_IMAGES[currentImageIndex]} 
            alt="Fresh breath background" 
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto h-full relative z-10">
        <div className="h-full flex flex-col justify-center px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-[42px] lg:text-[64px] font-extrabold text-white mb-5 leading-[1.1] tracking-[-0.03em]">
              {t.hero.title} <br />
              <span className="text-primary-cyan">{t.hero.subtitle}</span>
            </h1>
            <p className="text-gray-200 text-[15px] lg:text-[17px] font-normal mb-8 max-w-md leading-[1.6] opacity-90">
              {t.hero.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#shop">
                <Button className="bg-primary-cyan text-white hover:bg-primary-dark rounded-full px-7 py-3.5 text-[15px] font-bold flex items-center gap-3 group border-none shadow-xl transition-all duration-300">
                  {t.hero.shopNow}
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-primary-cyan" />
                  </div>
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Floating Product Card - Right Side Above Tags */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-72 right-6 lg:right-24 glass-card rounded-3xl p-3 w-60 shadow-2xl border border-white/10 hidden md:block"
          >
            <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[1.2/1]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentProductIndex}
                  src={PRODUCT_IMAGES[currentProductIndex]} 
                  alt="Product" 
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <p className="text-white text-[12px] font-medium mb-3 leading-snug opacity-90">
              Produk-produk #1 Oralcare Non Alcohol paling cocok buat kamu
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-[11px] font-bold text-white">{t.hero.rating}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 opacity-60" />
            </div>
          </motion.div>

          {/* Floating Service Tags - Bottom Right */}
          <div className="absolute bottom-16 right-6 lg:right-24 hidden lg:flex flex-wrap gap-2.5 max-w-[400px] justify-end">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (i * 0.1) }}
                className={`px-6 py-3 rounded-full text-[13px] font-bold backdrop-blur-md border transition-all duration-300 cursor-default ${service.active ? 'bg-white text-primary-dark border-white shadow-lg' : 'bg-black/20 text-white border-white/10 hover:bg-black/30'}`}
              >
                {service.label}
              </motion.div>
            ))}
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 w-full px-6 lg:px-24 py-6 flex items-center justify-between text-white/60 text-xs tracking-widest border-t border-white/10">
            <div className="flex items-center gap-8">
              <span>{t.hero.science}</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
                  className="hover:text-white transition-colors uppercase"
                >
                  prev
                </button>
                <span className="text-white">0{currentImageIndex + 1} / 0{HERO_IMAGES.length}</span>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
                  className="hover:text-white transition-colors uppercase"
                >
                  next
                </button>
              </div>
            </div>
            <span>{t.hero.scroll}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
