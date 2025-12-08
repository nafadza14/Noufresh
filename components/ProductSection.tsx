import React from 'react';
import { ShoppingCart, Heart, Star, Droplets } from 'lucide-react';
import { PRODUCTS } from '../constants';
import Button from './ui/Button';
import { Product } from '../types';

interface ProductSectionProps {
  onAddToCart: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ onAddToCart }) => {
  return (
    <section id="products" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Koleksi <span className="italic text-primary-cyan">Terfavorit</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Produk perawatan gigi terbaik yang menggabungkan bahan alami dan teknologi modern.
          </p>
          <div className="w-24 h-1 bg-primary-cyan mx-auto mt-6 rounded-full opacity-50"></div>
          
          {/* Decorative dots */}
          <div className="absolute top-0 right-10 w-20 h-20 bg-pattern-dots opacity-20 hidden lg:block"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(91,198,229,0.2)] transition-all duration-500">
              
              {/* Product Image Area */}
              <div className="relative h-80 overflow-hidden bg-gray-50">
                {product.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-primary-cyan text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {product.tag}
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>

                <img 
                  src={product.image} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="#facc15" className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-400 flex items-center bg-gray-50 px-2 py-1 rounded-md">
                      <Droplets className="w-3 h-3 mr-1" /> {product.volume}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary-cyan transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  
                  {/* Key Benefits Snippet */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <span key={idx} className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full border border-cyan-100">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-dashed border-gray-200">
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-400 line-through decoration-red-400">
                      Rp {product.original_price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-12 h-12 rounded-full bg-primary-cyan text-white flex items-center justify-center shadow-lg shadow-primary-cyan/30 hover:scale-110 active:scale-95 transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-20">
          <Button variant="outline" className="px-12 py-4">
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;