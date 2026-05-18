import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';

const categories = ['All', 'Mouthwash', 'Mouthspray', 'Teeth Whitening', 'Behel Equipment'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <section className="bg-white pt-32 md:pt-48 pb-16 border-b border-gray-100">
        <div className="section-container !py-0 text-center max-w-3xl mx-auto">
          <span className="section-label">Oral Care Essentials</span>
          <h1 className="text-3xl md:text-6xl mb-6">Solusi Perawatan Behel</h1>
          <p className="text-lg text-gray-500">Peralatan dental berkualitas yang dirancang khusus oleh orthodontist untuk menjaga kesehatan gigi selama bracket terpasang.</p>
        </div>
      </section>

      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          {/* Horizontal Filters */}
          <div className="flex flex-col items-center mb-16 gap-8">
            <div className="inline-flex flex-wrap justify-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedCategory === c ? 'bg-mint-fresh text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="w-full flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari produk dental..." 
                  className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-mint-fresh outline-none text-sm transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-semibold text-gray-700 hover:border-mint-fresh transition-colors w-full md:w-auto justify-center">
                <SlidersHorizontal className="w-4 h-4" /> Filter Advanced
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="w-12 h-12 border-4 border-mint-fresh/20 border-t-mint-fresh rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 font-medium">Memuat produk...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={`Rp ${p.price.toLocaleString('id-ID')}`}
                  category={p.category}
                  rating={p.rating || 5.0}
                  image={p.image_url}
                />
              ))}
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 mt-8">
              <p className="text-gray-400 font-medium">Maaf, produk tidak ditemukan dalam kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
