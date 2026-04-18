import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import Button from './ui/Button';
import { SERVICES } from '../constants';

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
        <div className="h-full flex flex-col justify-center px-6 lg:px-24 pt-24 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-3 py-1 bg-primary-cyan/20 text-primary-cyan rounded-full text-[11px] md:text-[13px] font-bold tracking-wider mb-4 md:mb-6 border border-primary-cyan/30">
              Oralcare yang beneran works buat kamu
            </div>
            
            <h1 className="text-4xl md:text-[42px] lg:text-[64px] font-extrabold text-white mb-4 md:mb-5 leading-[1.1] md:leading-[1.1] tracking-[-0.03em]">
              Bye Bye Bau Mulut <br className="hidden md:block" />
              <span className="text-primary-cyan text-3xl md:text-[42px] lg:text-[64px] leading-tight block mt-1 md:mt-2">Melindungi dari Pagi Sampai Sore Hari</span>
            </h1>
            
            <p className="text-gray-200 text-sm md:text-[15px] lg:text-[17px] font-normal mb-6 md:mb-8 max-w-md leading-relaxed md:leading-[1.6] opacity-90">
              Noufresh pakai teknologi khusus biar nafas kamu segar lebih lama bukan cuma 30 menit lalu hilang. <br className="hidden md:block mt-2" />
              <span className="text-white font-medium mt-2 md:mt-1 inline-block">Tanpa alkohol I Tanpa rasa terbakar I Halal.</span>
            </p>
            
            <div className="flex flex-col gap-5 md:gap-6 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <a href="#shop">
                  <Button className="w-full sm:w-auto bg-primary-cyan text-white hover:bg-primary-dark rounded-full px-7 py-3.5 text-[15px] font-bold flex items-center justify-center gap-3 group border-none shadow-xl transition-all duration-300">
                    Coba Sekarang &rarr;
                  </Button>
                </a>
                <a href="#about" className="text-white hover:text-primary-cyan text-sm md:text-[15px] font-medium underline underline-offset-4 decoration-white/30 hover:decoration-primary-cyan transition-colors mt-2 sm:mt-0">
                  Kok bisa tahan lama?
                </a>
              </div>
              
              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white/90 text-[10px] md:text-xs font-semibold mt-1 bg-black/20 p-3 rounded-2xl md:bg-transparent md:p-0">
                {["Teknologi Khusus", "Tanpa Alkohol", "Halal", "BPOM"].map((trust, i) => (
                  <div key={i} className="flex items-center gap-1.5 shrink-0">
                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-primary-cyan flex items-center justify-center">
                      <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {trust}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Product Card - Right Side Above Tags */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-60 right-6 lg:right-24 glass-card rounded-3xl p-3 w-48 md:w-60 shadow-2xl border border-white/10 hidden md:block"
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
            <p className="text-white text-[12px] font-medium mb-3 leading-snug opacity-90 hidden md:block">
              Produk #1 Oralcare Non-Alcohol paling cocok buat kamu
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-[11px] font-bold text-white">4.9 rating</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 opacity-60" />
            </div>
          </motion.div>

          {/* Floating Service Tags - Bottom Right */}
          <div className="absolute bottom-20 right-6 lg:right-24 hidden lg:flex flex-wrap gap-2.5 max-w-[400px] justify-end pb-4 md:pb-0">
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

          {/* Bottom Info Bar with Logos */}
          <div className="absolute bottom-0 left-0 w-full px-4 md:px-6 lg:px-24 py-3 md:py-4 flex items-center justify-center border-t border-white/10 backdrop-blur-sm bg-black/10 z-20">
            <div className="flex items-center gap-4 md:gap-8">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Halal_Indonesia.svg/1280px-Halal_Indonesia.svg.png" 
                alt="Halal" 
                className="h-8 md:h-10 object-contain drop-shadow-md bg-white/10 rounded-md p-1"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/id/thumb/a/a8/BADAN_POM.png/330px-BADAN_POM.png" 
                alt="BPOM" 
                className="h-8 md:h-10 object-contain drop-shadow-md bg-white/10 rounded-md p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
