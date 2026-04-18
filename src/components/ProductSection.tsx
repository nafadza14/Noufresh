import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { PRODUCTS, BRAND_NAME } from '../constants';
import Button from './ui/Button';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ onAddToCart }) => {
  const { t } = useLanguage();

  const handleAddToCart = () => {
    const product = PRODUCTS[0];
    onAddToCart({
      ...product,
      name: t.productData.name,
      description: t.productData.description,
      ingredients: t.productData.ingredients
    });
  };

  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-cyan/10 text-primary-cyan rounded-full text-[14px] font-medium tracking-wider mb-6">
            {t.products.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark leading-tight tracking-tight">
            {t.products.title} <span className="text-primary-cyan">{BRAND_NAME}?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
          {/* Large Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-5xl bg-primary-dark p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          >
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">{t.products.card1.title}</h3>
              <p className="text-gray-400 max-w-md text-sm md:text-base">{t.products.card1.description}</p>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <Button 
                onClick={handleAddToCart}
                className="bg-primary-cyan text-white hover:bg-white hover:text-primary-cyan rounded-full px-8 py-4 border-none"
              >
                {t.products.card1.cta}
              </Button>
              <span className="text-sm text-gray-500">{t.products.card1.social}</span>
            </div>
            {/* Decorative background for the card */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-striped-white opacity-5"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-cyan/20 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-5xl bg-primary-cyan p-12 text-white flex flex-col justify-between min-h-[300px]"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.products.card2.title}</h3>
              <p className="text-white/80 text-sm">{t.products.card2.description}</p>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="rounded-5xl bg-gray-100 p-12 text-primary-dark flex flex-col justify-between min-h-[300px]"
          >
             <div className="w-12 h-12 bg-primary-cyan/10 rounded-2xl flex items-center justify-center mb-6">
              <ArrowRight className="w-6 h-6 text-primary-cyan" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.products.card3.title}</h3>
              <p className="text-gray-500 text-sm">{t.products.card3.description}</p>
            </div>
          </motion.div>

          {/* Medium Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 rounded-5xl overflow-hidden relative group min-h-[400px]"
          >
            <img 
              src="https://i.pinimg.com/736x/d5/9c/9b/d59c9b01f544ab482350e2d16c4c7a85.jpg" 
              alt="Treatment" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
              <h3 className="text-3xl font-bold text-white mb-2">{t.products.card4.title}</h3>
              <p className="text-gray-300 max-w-sm">{t.products.card4.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
