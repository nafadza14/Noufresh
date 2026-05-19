import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import AssessmentCTA from '../components/AssessmentCTA';
import HowItWorks from '../components/HowItWorks';
import TrustSection from '../components/TrustSection';
import ProgramSection from '../components/ProgramSection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BottomCTA from '../components/BottomCTA';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: '1',
    name: 'Orthodontic Soft Wax',
    price: 'Rp 45.000',
    category: 'Protection',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559591967-df399c4ff803?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Ultra-Soft Brace Brush',
    price: 'Rp 65.000',
    category: 'Daily Care',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Teal Interdental Kit',
    price: 'Rp 89.000',
    category: 'Deep Clean',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Night Align Serum',
    price: 'Rp 120.000',
    category: 'Serum',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      
      <ProblemSection />
      <SolutionSection />
      
      <AssessmentCTA />
      
      <HowItWorks />
      
      <section className="section-container bg-white border-t border-gray-50">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Katalog Produk</span>
          <h2 className="text-2xl lg:text-5xl mb-6">
            Pilihan Dokter untuk <br className="hidden md:block" />
            <span className="text-mint-fresh italic">Perawatan Harian.</span>
          </h2>
          <p className="text-gray-500 text-base mb-8">
            Produk kurasi terbaik yang dirancang khusus untuk memudahkan pembersihan area tersulit pada kawat gigi.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-mint-fresh font-bold hover:gap-3 transition-all cursor-pointer">
            Lihat Semua Produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard {...p} />
            </motion.div>
          ))}
        </div>
      </section>

      <ProgramSection />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <BottomCTA />
    </main>
  );
}
