import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-primary-cyan rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-full h-full bg-striped-white opacity-10 pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text & Form */}
            <div className="text-white">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
                Mari Berkolaborasi
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Tertarik menjadi distributor, reseller, atau memiliki pertanyaan seputar produk kami? Hubungi kami sekarang.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Email</p>
                    <p className="font-semibold text-lg">{CONTACT_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Telepon / WhatsApp</p>
                    <p className="font-semibold text-lg">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                   <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Alamat HQ & Pabrik</p>
                    <p className="font-medium leading-relaxed max-w-sm">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map / Image */}
            <div className="bg-white rounded-3xl p-2 shadow-lg rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* Updated map to query PT Noor Walida Kosmetika directly */}
               <iframe 
                src="https://maps.google.com/maps?q=PT.%20Noor%20Walida%20Kosmetika&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '1.5rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;