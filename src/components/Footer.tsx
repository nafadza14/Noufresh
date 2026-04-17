import React from 'react';
import { BRAND_NAME, CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-footer-gradient select-none pointer-events-none whitespace-nowrap opacity-10">
        {BRAND_NAME}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="https://i.pinimg.com/736x/5f/8d/a6/5f8da69a3469ae669dfeba86821bd87d.jpg" 
                alt={BRAND_NAME} 
                className="h-10 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-primary-dark font-medium mb-6 tracking-widest text-[14px]">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">{t.nav.home}</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">{t.nav.products}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">{t.nav.about}</a></li>
              <li><a href="#testimonial" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">{t.nav.testimonial}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-primary-dark font-medium mb-6 tracking-widest text-[14px]">{t.footer.support}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">Privacy policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">Terms of service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-cyan transition-colors text-[14px]">Cookie policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-dark font-medium mb-6 tracking-widest text-[14px]">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 text-[14px]">{CONTACT_INFO.email}</li>
              <li className="text-gray-400 text-[14px]">{CONTACT_INFO.phone}</li>
              <li className="text-gray-400 text-[14px]">{CONTACT_INFO.address}</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} {BRAND_NAME}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            {Object.entries(CONTACT_INFO.socials).map(([name, href]) => (
              <a key={name} href={href} className="text-gray-400 hover:text-primary-cyan transition-colors capitalize text-xs">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
