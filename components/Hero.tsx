import React from 'react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      {/* Dominant Cyan Background with Striped Gradient Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-cyan/10 hidden lg:block rounded-l-[5rem]"></div>
      
      {/* Striped decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-striped-cyan opacity-20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-striped-cyan opacity-10 rounded-full blur-lg"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block py-1 px-4 rounded-full bg-primary-cyan text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-md shadow-primary-cyan/20">
              New Arrival
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
              Senyum Cerah & <br/>
              <span className="relative z-10 text-primary-cyan">
                Nafas Segar
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-cyan/20 -z-10 rounded-full transform -skew-x-12"></span>
              </span> Seketika
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Diformulasikan oleh <strong>PT. Noor Walida Kosmetika</strong> dengan teknologi Nanoenkapsulasi. Solusi praktis untuk generasi aktif.
            </p>
            
            <div className="relative inline-flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button withArrow className="text-lg px-10 py-4 shadow-xl shadow-primary-cyan/30">
                Belanja Sekarang
              </Button>
              <Button variant="outline" className="text-lg px-10 py-4">
                Pelajari Produk
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative z-10">
                {/* Main Product/Lifestyle Image */}
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] lg:aspect-[4/5] mx-auto max-w-md lg:max-w-full">
                  <img 
                    src="https://i.pinimg.com/736x/52/2c/75/522c75b9e9a1ab43066724d16952d08f.jpg" 
                    alt="Wanita tersenyum cerah menggunakan produk Noufresh" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Decorative striped overlay on image corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-striped-white opacity-50 rounded-bl-[3rem]"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-bounce duration-[3000ms]">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">BPOM Certified</p>
                      <p className="text-xs text-gray-500">Aman & Teruji</p>
                    </div>
                  </div>
                </div>

                 <div className="absolute -top-10 -right-10 -z-10 w-full h-full border-2 border-primary-cyan/30 rounded-[3rem]"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;