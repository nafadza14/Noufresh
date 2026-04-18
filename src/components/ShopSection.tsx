import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

interface ShopSectionProps {
  onAddToCart: (product: Product) => void;
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={onToggle}
        className="w-full py-4 flex justify-between items-center text-left group"
      >
        <span className="text-sm font-bold text-primary-dark group-hover:text-primary-cyan transition-colors">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-xs text-gray-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShopSection: React.FC<ShopSectionProps> = ({ onAddToCart }) => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [openAccordions, setOpenAccordions] = useState<Record<number, string | null>>({});

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const updateQty = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const toggleAccordion = (productId: number, section: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [productId]: prev[productId] === section ? null : section
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const selectedSizeId = selectedSizes[product.id];
    const selectedSize = product.sizes?.find(s => s.id === selectedSizeId) || (product.sizes ? product.sizes[0] : null);
    
    const productToAdd = {
      ...product,
      price: selectedSize ? selectedSize.price : product.price,
      volume: selectedSize ? selectedSize.volume : product.volume
    };

    for (let i = 0; i < qty; i++) {
      onAddToCart(productToAdd);
    }
    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <section id="shop" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block px-4 py-1.5 bg-primary-cyan/10 text-primary-cyan rounded-full text-[14px] font-medium tracking-wider mb-4">
              Shop Collection
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark leading-tight tracking-tight">
              Choose your <span className="text-primary-cyan">freshness</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-cyan hover:border-primary-cyan hover:text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-cyan hover:border-primary-cyan hover:text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0">
                <motion.div 
                  className="bg-white rounded-[32px] p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {product.tag && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-primary-dark/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {product.tag}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-primary-dark leading-tight mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-base md:text-lg font-extrabold text-primary-cyan">
                          Rp{(selectedSizes[product.id] ? product.sizes?.find(s => s.id === selectedSizes[product.id])?.price : product.price)?.toLocaleString()}
                        </span>
                        {product.original_price && (
                          <span className="text-xs text-gray-400 line-through">Rp{product.original_price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    {/* Accordion Details */}
                    <div className="border-t border-gray-100 mb-6">
                      <AccordionItem 
                        title={t.productData.labels.description} 
                        isOpen={openAccordions[product.id] === 'desc'} 
                        onToggle={() => toggleAccordion(product.id, 'desc')}
                      >
                        {product.description}
                      </AccordionItem>
                      
                      {product.sizes && (
                        <AccordionItem 
                          title={t.productData.labels.availableSize} 
                          isOpen={openAccordions[product.id] === 'size-info'} 
                          onToggle={() => toggleAccordion(product.id, 'size-info')}
                        >
                          {product.sizes.map(s => s.volume).join(', ')}
                        </AccordionItem>
                      )}

                      <AccordionItem 
                        title={t.productData.labels.ingredients} 
                        isOpen={openAccordions[product.id] === 'ingredients'} 
                        onToggle={() => toggleAccordion(product.id, 'ingredients')}
                      >
                        <ul className="space-y-1 list-disc pl-4">
                          {product.ingredients.map(ing => (
                            <li key={ing}>{ing}</li>
                          ))}
                        </ul>
                      </AccordionItem>

                      <AccordionItem 
                        title={t.productData.labels.benefits} 
                        isOpen={openAccordions[product.id] === 'benefits'} 
                        onToggle={() => toggleAccordion(product.id, 'benefits')}
                      >
                        <ul className="space-y-1 list-disc pl-4">
                          {product.benefits.map(benefit => (
                            <li key={benefit}>{benefit}</li>
                          ))}
                        </ul>
                      </AccordionItem>

                      <AccordionItem 
                        title={t.productData.labels.formulatedWithout} 
                        isOpen={openAccordions[product.id] === 'formulated'} 
                        onToggle={() => toggleAccordion(product.id, 'formulated')}
                      >
                        <p>{product.formulated_without.join(', ')}</p>
                      </AccordionItem>

                      <AccordionItem 
                        title={t.productData.labels.howToUse} 
                        isOpen={openAccordions[product.id] === 'usage'} 
                        onToggle={() => toggleAccordion(product.id, 'usage')}
                      >
                        {product.how_to_use}
                      </AccordionItem>
                    </div>

                    {/* Size Selection */}
                    {product.sizes && (
                      <div className="mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.productData.labels.size}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size.id}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size.id }))}
                              className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all border ${
                                (selectedSizes[product.id] || product.sizes![0].id) === size.id
                                  ? 'bg-[#E9D16D] border-[#E9D16D] text-white shadow-md shadow-yellow-500/20'
                                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              {size.label} : {size.volume}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-8">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.productData.labels.quantity}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg p-1">
                          <button 
                            onClick={() => updateQty(product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary-dark transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input 
                            type="text" 
                            readOnly 
                            value={quantities[product.id] || 1}
                            className="w-10 text-center font-bold text-sm focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQty(product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary-dark transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#E9D16D] text-white hover:bg-[#d4be63] rounded-xl py-4 font-bold border-none shadow-lg shadow-yellow-500/10 transition-all active:scale-[0.98]"
                    >
                      {t.productData.labels.addToCart}
                    </Button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
