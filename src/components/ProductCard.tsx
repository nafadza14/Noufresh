import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  key?: any;
}

export default function ProductCard({ name, price, image, category, rating }: ProductProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl p-4 border border-slate-100 transition-all hover:shadow-xl group"
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4 relative">
        <img loading="lazy" decoding="async" src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute bottom-3 right-3 p-3 bg-white text-brand-primary rounded-xl shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-brand-primary hover:text-white">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      <div>
        <div className="text-[10px] font-bold text-brand-primary tracking-widest mb-1">{category}</div>
        <h3 className="font-display font-semibold text-lg text-slate-900 mb-1 leading-tight">{name}</h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
          ))}
          <span className="text-[10px] text-slate-400 font-medium ml-1">({rating})</span>
        </div>
        <div className="text-lg font-bold text-slate-900">{price}</div>
      </div>
    </motion.div>
  );
}
