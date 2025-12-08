import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TECH_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    caption: "Laboratorium R&D Modern"
  },
  {
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    caption: "Uji Klinis Dokter Gigi"
  },
  {
    url: "https://images.unsplash.com/photo-1581093458791-9f302e68383e?auto=format&fit=crop&q=80&w=800",
    caption: "Teknologi Nanoenkapsulasi"
  },
  {
    url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    caption: "Produksi Higienis"
  }
];

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TECH_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % TECH_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + TECH_IMAGES.length) % TECH_IMAGES.length);

  return (
    <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Stripe */}
      <div className="absolute top-0 left-0 w-full h-2 bg-striped-cyan opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Company Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-primary-cyan font-bold tracking-wider uppercase text-sm mb-4 block">Tentang Kami</span>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900 mb-8">
            PT. Noor Walida Kosmetika
          </h2>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary-cyan/10">
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              <strong>Noufresh</strong> lahir dari dedikasi panjang dalam penelitian dan pengembangan. Melalui serangkaian uji coba klinis yang ketat dan formulasi presisi, kami hadir dengan visi besar untuk menjadi pemimpin pasar di industri perawatan mulut (oral care).
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-light mt-4">
              Berada di bawah naungan <strong>PT. Noor Walida Kosmetika</strong>, Noufresh berkomitmen menghadirkan produk berkualitas nomor satu yang tidak hanya membersihkan, tetapi juga merawat kesehatan mulut secara menyeluruh. Kami menjawab kebutuhan masyarakat modern akan solusi yang efektif, praktis, dan terpercaya.
            </p>
          </div>
        </div>

        {/* Technology Carousel & Info */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 lg:p-12 mb-20 border border-primary-cyan/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-striped-cyan opacity-10 rounded-bl-full"></div>
           
           <div className="flex flex-col lg:flex-row items-center gap-12">
             
             {/* Carousel Section */}
             <div className="lg:w-1/2 w-full">
               <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                 {/* Slides */}
                 <div className="absolute inset-0 transition-all duration-700 ease-in-out">
                    <img 
                      src={TECH_IMAGES[currentSlide].url} 
                      alt={TECH_IMAGES[currentSlide].caption} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                      <p className="text-white font-bold text-xl">{TECH_IMAGES[currentSlide].caption}</p>
                    </div>
                 </div>

                 {/* Controls */}
                 <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 backdrop-blur text-white hover:text-primary-cyan p-2 rounded-full transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 backdrop-blur text-white hover:text-primary-cyan p-2 rounded-full transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight className="w-6 h-6" />
                 </button>
               </div>
             </div>

             {/* Tech Info */}
             <div className="lg:w-1/2 w-full">
               <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">Inovasi Teknologi Terdepan</h3>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 Kami menggabungkan bahan alami terbaik dengan teknologi Nanoenkapsulasi mutakhir. Proses ini memastikan bahan aktif meresap lebih efektif, memberikan perlindungan lebih lama, dan sensasi kesegaran yang tak tertandingi.
               </p>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary-cyan/20 flex items-center justify-center text-primary-cyan font-bold">1</div>
                   <span className="text-gray-700">Riset mendalam oleh ahli farmasi & dokter gigi</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary-cyan/20 flex items-center justify-center text-primary-cyan font-bold">2</div>
                   <span className="text-gray-700">Bahan baku premium berstandar internasional</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary-cyan/20 flex items-center justify-center text-primary-cyan font-bold">3</div>
                   <span className="text-gray-700">Proses produksi higienis dan bersertifikat</span>
                 </li>
               </ul>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;