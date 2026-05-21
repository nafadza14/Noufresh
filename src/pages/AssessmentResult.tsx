import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  MessageCircle, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  Lightbulb, 
  Star, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Zap 
} from 'lucide-react';

// Meta Pixel simulator and logger
const firePixelEvent = (name: string, params?: any) => {
  console.log(`[Meta Pixel Event: ${name}]`, params);
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', name, params);
  }
};

interface ColorTheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  scoreColor: string;
  badgeBg: string;
  badgeText: string;
}

interface TierInfo {
  id: string;
  labelNew: string;
  subtext: string;
  colorTheme: ColorTheme;
  recommendedProduct: string;
  recommendedPrice: string;
  recommendedTier: 'complete' | 'starter' | 'trial';
  checkoutUrl: string;
  strikethroughPrice?: string;
  badgeText: string;
  testimonial: {
    quote: string;
    name: string;
    location: string;
    detail: string;
  };
  inclusions: string[];
  defaultInsights: Array<{
    iconName: 'clock' | 'zap' | 'alert-triangle' | 'alert-circle' | 'wrench' | 'trending-up' | 'lightbulb' | 'star' | 'check';
    title: string;
    body: string;
    style: 'danger' | 'warning' | 'success' | 'info';
  }>;
}

const CATEGORIES_DATA: Record<string, TierInfo> = {
  risiko_tinggi: {
    id: 'risiko_tinggi',
    labelNew: 'Gigi kamu butuh bantuan sekarang',
    subtext: 'Sebelum terlambat dan biaya jadi lebih besar',
    colorTheme: {
      primary: '#f43f5e',
      primaryLight: '#fff1f2',
      primaryDark: '#be123c',
      scoreColor: '#f43f5e',
      badgeBg: '#fff1f2',
      badgeText: '#be123c'
    },
    recommendedProduct: 'Behel Care Complete 90 Hari',
    recommendedPrice: 'Rp 349.000',
    strikethroughPrice: 'Rp 499.000',
    recommendedTier: 'complete',
    checkoutUrl: '/checkout/complete',
    badgeText: 'Perlu segera ditangani',
    testimonial: {
      quote: "Skor saya 38, dokter hampir minta behel dilepas dulu karena gusi. Pakai program Noufresh 30 hari, gusi berhenti berdarah dan skor naik ke 71.",
      name: "Rina",
      location: "Bekasi",
      detail: "behel metal, 10 bulan pemakaian"
    },
    inclusions: [
      "3 botol Mouthwash Noufresh Behel Edition",
      "30 pcs Interdental Brush",
      "Sikat gigi khusus behel V shape",
      "Orthodontic Wax pereda sariawan",
      "Mirror dental mini",
      "Chat Behel Care Consultant tanpa batas 90 hari",
      "Reminder perawatan harian via WhatsApp"
    ],
    defaultInsights: [
      {
        iconName: 'clock',
        title: 'Behel bisa diperpanjang 3 sampai 6 bulan',
        body: 'Kalau pola ini berlanjut, dokter bisa minta kamu tunda lepas behel. Itu artinya Rp 600rb sampai Rp 3jt biaya kontrol tambahan yang tidak perlu.',
        style: 'danger'
      },
      {
        iconName: 'zap',
        title: 'Bercak putih permanen mulai terbentuk',
        body: 'White spot lesions tumbuh diam diam di sekitar bracket. Baru terlihat jelas setelah behel lepas dan tidak bisa dihilangkan.',
        style: 'danger'
      },
      {
        iconName: 'alert-triangle',
        title: 'Risiko harus lepas behel lebih awal',
        body: 'Gusi yang terus berdarah bisa berkembang ke gingivitis aktif. Pada tahap itu dokter wajib hentikan perawatan ortho dulu.',
        style: 'danger'
      }
    ]
  },
  perlu_perhatian: {
    id: 'perlu_perhatian',
    labelNew: 'Ada beberapa kebiasaan yang perlu diperbaiki',
    subtext: 'Sekarang masih bisa dicegah sebelum jadi masalah besar',
    colorTheme: {
      primary: '#eab308',
      primaryLight: '#fef9c3',
      primaryDark: '#854d0e',
      scoreColor: '#eab308',
      badgeBg: '#fef9c3',
      badgeText: '#854d0e'
    },
    recommendedProduct: 'Behel Care Starter 30 Hari',
    recommendedPrice: 'Rp 149.000',
    recommendedTier: 'starter',
    checkoutUrl: '/checkout/starter',
    badgeText: 'Paling pas untuk kondisi kamu',
    testimonial: {
      quote: "Saya pikir sikat 2x sehari sudah cukup. Ternyata ada area yang terus terlewat. Setelah 30 hari pakai kit Noufresh, skor naik ke 78 dan dokter bilang gusi saya jauh lebih sehat.",
      name: "Dinda",
      location: "Jakarta",
      detail: "behel keramik, 14 bulan pemakaian"
    },
    inclusions: [
      "1 botol Mouthwash Noufresh Behel Edition (300ml)",
      "10 pcs Interdental Brush",
      "Panduan digital Rawat Behel 30 Hari Pertama",
      "Chat Behel Care Consultant 30 hari",
      "Gratis ongkir"
    ],
    defaultInsights: [
      {
        iconName: 'alert-circle',
        title: 'Area bracket mulai rentan menumpuk plak',
        body: 'Bercak putih belum terbentuk, tapi kondisi sudah mendukung pembentukannya. Periode pencegahan masih terbuka sekitar 30 sampai 60 hari ke depan.',
        style: 'warning'
      },
      {
        iconName: 'wrench',
        title: 'Teknik sikat gigi belum optimal untuk behel',
        body: 'Sikat biasa tidak bisa menjangkau area di bawah kawat. Interdental brush bisa menutup celah ini dan hasilnya terasa dalam seminggu.',
        style: 'warning'
      }
    ]
  },
  cukup_baik: {
    id: 'cukup_baik',
    labelNew: 'Perawatan kamu sudah di jalur yang benar',
    subtext: 'Tinggal satu atau dua hal kecil untuk naik ke level aman',
    colorTheme: {
      primary: '#16c0f9',
      primaryLight: '#f0fdff',
      primaryDark: '#0c7295',
      scoreColor: '#16c0f9',
      badgeBg: '#f0fdff',
      badgeText: '#0c7295'
    },
    recommendedProduct: 'Behel Care Starter 30 Hari',
    recommendedPrice: 'Rp 149.000',
    recommendedTier: 'starter',
    checkoutUrl: '/checkout/starter',
    badgeText: 'Untuk peningkatan dan perawatan berkala',
    testimonial: {
      quote: "Skor saya 65. Saya pikir sudah aman. Ternyata dokter masih lihat ada karang gigi kecil di bracket belakang. 30 hari pakai Noufresh, bersih total.",
      name: "Nisa",
      location: "Bandung",
      detail: "behel metal, 6 bulan pemakaian"
    },
    inclusions: [
      "1 botol Mouthwash Noufresh Behel Edition (300ml)",
      "10 pcs Interdental Brush",
      "Panduan digital Rawat Behel 30 Hari Pertama",
      "Chat Behel Care Consultant 30 hari",
      "Gratis ongkir"
    ],
    defaultInsights: [
      {
        iconName: 'trending-up',
        title: 'Hampir sempurna, tinggal konsistensi',
        body: 'Kebiasaanmu sudah baik. Yang kurang adalah konsistensi di malam hari dan penggunaan mouthwash khusus ortho secara rutin.',
        style: 'success'
      },
      {
        iconName: 'lightbulb',
        title: 'Skor 80 ke atas bisa dicapai dalam 30 hari',
        body: 'Dengan tambahan satu alat dan rutinitas malam yang lebih ketat, kamu bisa masuk zona aman sebelum kontrol berikutnya.',
        style: 'info'
      }
    ]
  },
  sangat_baik: {
    id: 'sangat_baik',
    labelNew: 'Perawatan kamu sudah sangat baik',
    subtext: 'Kamu termasuk 15 persen pengguna behel dengan perawatan terbaik',
    colorTheme: {
      primary: '#0d9488',
      primaryLight: '#f0fdfa',
      primaryDark: '#115e59',
      scoreColor: '#0d9488',
      badgeBg: '#f0fdfa',
      badgeText: '#115e59'
    },
    recommendedProduct: 'Behel Care Trial Kit 14 Hari',
    recommendedPrice: 'Rp 49.000',
    recommendedTier: 'trial',
    checkoutUrl: '/checkout/trial',
    badgeText: 'Coba dulu 14 hari',
    testimonial: {
      quote: "Skor saya 83 dari assessment pertama. Saya coba trial kit Noufresh buat lengkapin rutinitas. Setelah 14 hari, skor naik ke 91 dan nafas jauh lebih segar.",
      name: "Sari",
      location: "Yogyakarta",
      detail: "self ligating, 8 bulan pemakaian"
    },
    inclusions: [
      "1 botol Mouthwash Noufresh Behel Edition (100ml)",
      "5 pcs Interdental Brush",
      "Panduan digital PDF personal",
      "Akses chat WhatsApp 14 hari"
    ],
    defaultInsights: [
      {
        iconName: 'check',
        title: 'Rutinitas sikat kamu sudah optimal',
        body: 'Frekuensi dan teknik sikat kamu sudah tepat untuk kondisi behel. Ini yang paling sulit dibangun dan kamu sudah punya.',
        style: 'success'
      },
      {
        iconName: 'star',
        title: 'Satu langkah lagi menuju sempurna',
        body: 'Mouthwash khusus ortho bisa menutup area yang sikat tidak bisa jangkau dan mempertahankan skor di atas 90.',
        style: 'info'
      }
    ]
  }
};

const COMPLAINT_INSIGHTS: Record<string, {
  title: string;
  body: string;
  style: 'danger' | 'warning' | 'success' | 'info';
  iconName: 'clock' | 'zap' | 'alert-triangle' | 'alert-circle' | 'wrench' | 'trending-up' | 'lightbulb' | 'star' | 'check';
}> = {
  "Gusi sering berdarah": {
    title: "Gusi berdarah tanda radang aktif",
    body: "Gusi yang sering berdarah saat sikat gigi adalah tanda gingivitis akibat akumulasi plak di bracket. Jika dibiarkan, dokter gigi bisa menunda proses pergeseran gigi kamu.",
    style: "danger",
    iconName: "alert-triangle"
  },
  "Makanan sering nyangkut": {
    title: "Makanan membusuk diam diam di sela kawat",
    body: "Sisa makanan yang tertinggal di sela behel membusuk dalam beberapa jam dan memicu karang gigi keras yang sulit dibersihkan dengan sikat biasa.",
    style: "warning",
    iconName: "clock"
  },
  "Sariawan berulang": {
    title: "Gesekan kawat memicu sariawan kronis",
    body: "Gesekan kawat atau bracket tajam terus menerus memicu luka sariawan berulang. Orthodontic Wax khusus behel Noufresh sangat membantu melapisi kawat tajam seketika.",
    style: "warning",
    iconName: "zap"
  },
  "Bau mulut": {
    title: "Bakteri bracket memicu bau mulut tak sedap",
    body: "Bracket menahan sisa air liur dan bakteri. Tanpa sikat khusus dan mouthwash khusus ortho, bakteri memproduksi gas sulfur penyebab bau mulut.",
    style: "danger",
    iconName: "alert-circle"
  },
  "Gigi sensitif": {
    title: "Email gigi melemah di sekitar bracket",
    body: "Rasa ngilu saat makan atau minum dingin adalah sinyal demineralisasi email gigi mulai terjadi di area pengeleman bracket behel.",
    style: "warning",
    iconName: "wrench"
  }
};

const INSIGHT_STYLES = {
  danger: {
    background: '#fff1f2',
    iconColor: '#f43f5e',
    titleColor: '#be123c',
    bodyColor: '#4b5563'
  },
  warning: {
    background: '#fef9c3',
    iconColor: '#ca8a04',
    titleColor: '#854d0e',
    bodyColor: '#4b5563'
  },
  success: {
    background: '#f0fdf4',
    iconColor: '#16a34a',
    titleColor: '#15803d',
    bodyColor: '#4b5563'
  },
  info: {
    background: '#f0f9ff',
    iconColor: '#0284c7',
    titleColor: '#0369a1',
    bodyColor: '#4b5563'
  }
};

export default function AssessmentResult() {
  const [searchParams] = useSearchParams();
  const mainCtaRef = useRef<HTMLButtonElement>(null);
  
  // 1. Read URL Search Params
  const scoreParam = searchParams.get('score');
  const catParam = searchParams.get('category');
  const durationParam = searchParams.get('duration') ? decodeURIComponent(searchParams.get('duration') || '') : '';
  
  let complaintsParam: string[] = [];
  try {
    const rawKeluhan = searchParams.get('keluhan');
    if (rawKeluhan) {
      complaintsParam = JSON.parse(decodeURIComponent(rawKeluhan));
    }
  } catch (e) {
    console.error('Failed to parse keluhan search param', e);
  }

  // Fallbacks
  const score = scoreParam ? Math.max(0, Math.min(100, parseInt(scoreParam))) : 52;
  const categoryId = catParam && CATEGORIES_DATA[catParam] ? catParam : 'perlu_perhatian';
  const categoryData = CATEGORIES_DATA[categoryId];

  // 2. Animated Score Count-up Hook/Effect
  const [animatedScore, setAnimatedScore] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; // 1.2s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quadratic
      const easeOutQuad = progress * (2 - progress);
      setAnimatedScore(Math.floor(easeOutQuad * score));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setAnimatedScore(score);
      }
    };

    window.requestAnimationFrame(step);
  }, [score]);

  // 3. Sticky Bottom CTA Visibility Logic
  const [showStickyCta, setShowStickyCta] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sticky bottom CTA when the main primary CTA is visible
        if (entry.isIntersecting) {
          setShowStickyCta(false);
        } else {
          // Only show after scrolling ~300px
          if (window.scrollY > 300) {
            setShowStickyCta(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (mainCtaRef.current) {
      observer.observe(mainCtaRef.current);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        if (mainCtaRef.current) {
          const rect = mainCtaRef.current.getBoundingClientRect();
          const inViewport = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
          setShowStickyCta(!inViewport);
        } else {
          setShowStickyCta(true);
        }
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Meta Pixel View Event on mount
  useEffect(() => {
    firePixelEvent('ViewContent', {
      content_name: `Assessment Result - ${categoryId}`,
      content_category: 'Assessment',
      value: score
    });
  }, [categoryId, score]);

  const handleCheckoutClick = () => {
    firePixelEvent('InitiateCheckout', {
      content_name: categoryData.recommendedProduct,
      value: categoryData.recommendedTier === 'complete' ? 349000 : (categoryData.recommendedTier === 'starter' ? 149000 : 49000),
      currency: 'IDR',
      num_items: 1
    });
  };

  const handleWaClick = () => {
    firePixelEvent('Contact', {
      content_name: 'WA Fallback from Result Page',
      category: categoryId
    });
  };

  // Compile Dynamic Insights
  // 1. Prioritize insight cards matching their actual selected complaints
  // 2. If fewer than 3, append default insights from the category
  // 3. Max out at 3 cards
  const renderInsights = () => {
    const cards: Array<{
      iconName: 'clock' | 'zap' | 'alert-triangle' | 'alert-circle' | 'wrench' | 'trending-up' | 'lightbulb' | 'star' | 'check';
      title: string;
      body: string;
      style: 'danger' | 'warning' | 'success' | 'info';
    }> = [];

    // Filter out 'Belum ada keluhan'
    const activeComplaints = complaintsParam.filter(c => c !== 'Belum ada keluhan');
    
    // Add complaint-specific insights
    activeComplaints.forEach(complaint => {
      if (COMPLAINT_INSIGHTS[complaint]) {
        cards.push(COMPLAINT_INSIGHTS[complaint]);
      }
    });

    // If still have spots, fill with default tier insights
    categoryData.defaultInsights.forEach(dInsight => {
      if (cards.length < 3 && !cards.some(c => c.title === dInsight.title)) {
        cards.push(dInsight);
      }
    });

    // Make sure we have at least 2 cards to look premium
    if (cards.length < 2) {
      categoryData.defaultInsights.forEach(dInsight => {
        if (cards.length < 2 && !cards.some(c => c.title === dInsight.title)) {
          cards.push(dInsight);
        }
      });
    }

    return cards.slice(0, 3);
  };

  const finalInsights = renderInsights();

  // Helper to render Lucide Icons based on string name
  const renderIcon = (name: string, color: string, className = "w-5 h-5") => {
    switch (name) {
      case 'clock':
        return <Clock className={className} style={{ color }} />;
      case 'zap':
        return <Zap className={className} style={{ color }} />;
      case 'alert-triangle':
        return <AlertTriangle className={className} style={{ color }} />;
      case 'alert-circle':
        return <AlertCircle className={className} style={{ color }} />;
      case 'wrench':
        return <Wrench className={className} style={{ color }} />;
      case 'trending-up':
        return <TrendingUp className={className} style={{ color }} />;
      case 'lightbulb':
        return <Lightbulb className={className} style={{ color }} />;
      case 'star':
        return <Star className={className} style={{ color }} />;
      default:
        return <Check className={className} style={{ color }} />;
    }
  };

  // Compile Dynamic WA Message
  const waUrl = `https://wa.me/6285157626264?text=${encodeURIComponent(
    `Halo Noufresh! Skor assessment saya adalah ${score}/100 (kategori: ${categoryData.labelNew}). Boleh konsultasi dulu mengenai kondisi gigi behel saya?`
  )}`;

  // Custom circular SVG progress dimensions
  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <>
      {/* Main Container: Clean, white spacing, Satoshi + Inter fonts, centered max-width 480px */}
      <main className="bg-gray-50/50 min-h-screen pb-28 font-sans">
        <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-sm border-x border-gray-100/60 relative flex flex-col">
          
          {/* 1. Header (Logo Only, Centered) */}
          <header className="py-5 border-b border-gray-100/80 flex justify-center items-center bg-white/90 backdrop-blur-md sticky top-0 z-40">
            <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
              <img 
                src="/logo.png" 
                alt="Noufresh Logo" 
                className="h-5 w-auto object-contain"
              />
            </Link>
          </header>

          {/* Body Content */}
          <div className="px-6 pt-6 flex-grow">
            
            {/* 2. Beautiful Clean Score Hero Section */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-[2rem] p-7 text-center mb-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden"
              style={{ backgroundColor: categoryData.colorTheme.primaryLight }}
            >
              <span 
                className="text-[11px] font-bold tracking-[0.06em] block mb-5"
                style={{ color: categoryData.colorTheme.primary }}
              >
                Hasil assessment kamu
              </span>
              
              {/* Circular Gauge Score */}
              <div className="relative w-32 h-32 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-gray-100/80"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={categoryData.colorTheme.primary}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                  <span 
                    className="text-3xl font-black tracking-tight"
                    style={{ color: categoryData.colorTheme.primary }}
                  >
                    {animatedScore}
                  </span>
                  <span className="text-[9px] font-semibold text-gray-400">skor kamu</span>
                </div>
              </div>

              <h2 
                className="text-[19px] font-bold leading-tight tracking-tight mb-2.5"
                style={{ color: categoryData.colorTheme.primaryDark }}
              >
                {categoryData.labelNew}
              </h2>
              
              <p 
                className="text-xs font-medium leading-relaxed"
                style={{ color: categoryData.colorTheme.primaryDark, opacity: 0.8 }}
              >
                {categoryData.subtext}
              </p>
            </motion.section>

            {/* 3. Consequence-based Insights Section */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mb-8"
            >
              <h3 className="text-xs font-semibold text-gray-400 mb-4 pl-1">
                Yang perlu kamu tahu
              </h3>
              
              <div className="space-y-4">
                {finalInsights.map((insight, index) => {
                  const styleTheme = INSIGHT_STYLES[insight.style];
                  return (
                    <div 
                      key={index}
                      className="p-6 rounded-[1.5rem] flex gap-5 border border-gray-100/80 shadow-[0_8px_24px_rgba(0,0,0,0.015)]"
                      style={{ backgroundColor: 'white' }}
                    >
                      <div 
                        className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: styleTheme.background }}
                      >
                        {renderIcon(insight.iconName, styleTheme.iconColor, "w-5 h-5")}
                      </div>
                      <div className="flex-grow space-y-1.5">
                        <h4 
                          className="text-[14.5px] font-bold tracking-tight text-gray-900 leading-tight"
                        >
                          {insight.title}
                        </h4>
                        <p className="text-[12.5px] leading-relaxed text-gray-500 font-medium">
                          {insight.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* 4. Testimoni Card (Social Proof pre-CTA) */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <h3 className="text-xs font-semibold text-gray-400 mb-4 pl-1">
                Yang dialami orang dengan kondisi serupa
              </h3>
              
              <div className="bg-gray-50/60 p-7 rounded-[2rem] border border-gray-100/60 relative overflow-hidden space-y-4">
                <span className="text-5xl text-mint-fresh/15 font-serif absolute -top-1 left-2 select-none">“</span>
                <p className="text-[13px] text-gray-600 italic leading-relaxed relative z-10 pl-5 font-medium">
                  {categoryData.testimonial.quote}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100/60 pt-4 pl-5">
                  <div className="text-[12px] font-bold text-gray-800">
                    {categoryData.testimonial.name}, {categoryData.testimonial.location}
                  </div>
                  <div className="text-[10.5px] font-semibold text-gray-400">
                    {categoryData.testimonial.detail}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 5. Recommended Program Package Card */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mb-6"
            >
              <h3 className="text-xs font-semibold text-gray-400 mb-4 pl-1">
                Rekomendasi paket untukmu
              </h3>

              {/* Recommended Product Box */}
              <div 
                className="bg-white rounded-[2.25rem] p-8 border shadow-[0_12px_40px_rgba(0,0,0,0.025)] transition-all space-y-6"
                style={{ borderColor: `${categoryData.colorTheme.primary}30` }}
              >
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-[17px] font-bold text-gray-900 leading-tight tracking-tight">
                    {categoryData.recommendedProduct}
                  </h4>
                  <span 
                    className="text-[10px] font-semibold px-3 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: categoryData.colorTheme.badgeBg, color: categoryData.colorTheme.badgeText }}
                  >
                    {categoryData.badgeText}
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2.5">
                  <span 
                    className="text-2xl font-black tracking-tight"
                    style={{ color: categoryData.colorTheme.primary }}
                  >
                    {categoryData.recommendedPrice}
                  </span>
                  
                  {categoryData.strikethroughPrice && (
                    <span className="text-xs font-bold text-gray-400 line-through">
                      {categoryData.strikethroughPrice}
                    </span>
                  )}
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <h5 className="text-[10px] font-bold text-gray-400 tracking-wider">
                    Paket sudah termasuk
                  </h5>
                  
                  <ul className="space-y-3.5">
                    {categoryData.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${categoryData.colorTheme.primary}12` }}
                        >
                          <Check 
                            className="w-3 h-3" 
                            style={{ color: categoryData.colorTheme.primary }} 
                          />
                        </div>
                        <span className="text-[12.5px] font-medium text-gray-600 leading-normal">
                          {inclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 6. Primary CTA Section */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Primary checkout button */}
              <Link 
                to={categoryData.checkoutUrl}
                onClick={handleCheckoutClick}
                className="block w-full"
              >
                <button 
                  ref={mainCtaRef}
                  className="w-full h-13 rounded-full text-white font-bold text-[14px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-lg cursor-pointer bg-mint-fresh"
                  style={{ 
                    backgroundColor: '#16c0f9',
                    boxShadow: '0 8px 30px -4px rgba(22, 192, 249, 0.45)'
                  }}
                >
                  {categoryId === 'risiko_tinggi' && "Mulai program saya sekarang"}
                  {categoryId === 'perlu_perhatian' && "Mulai perbaikan sekarang"}
                  {categoryId === 'cukup_baik' && "Tingkatkan skor ke 80"}
                  {categoryId === 'sangat_baik' && `Coba trial kit seharga ${categoryData.recommendedPrice}`}
                  
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 flex justify-center items-center flex-wrap gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-mint-fresh" />
                  <span>Garansi 30 hari uang kembali</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-mint-fresh"></div>
                  <span>BPOM dan Halal</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-mint-fresh"></div>
                  <span>Konsul WhatsApp 24 jam</span>
                </div>
              </div>
            </motion.section>

            {/* 7. Upsell Section (Only for perlu_perhatian) */}
            {categoryId === 'perlu_perhatian' && (
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px bg-gray-100 flex-grow"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">atau</span>
                  <div className="h-px bg-gray-100 flex-grow"></div>
                </div>

                <Link to="/checkout/complete" className="block w-full">
                  <button className="w-full py-3.5 px-6 rounded-full border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 bg-transparent font-bold text-[12px] active:scale-[0.98] transition-all text-center cursor-pointer">
                    Lihat program 90 hari yang lebih lengkap seharga Rp 349.000
                  </button>
                </Link>
              </motion.section>
            )}

            {/* 8. WhatsApp Fallback Section */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="mt-8 border-t border-gray-100 pt-6 pb-12 text-center"
            >
              <p className="text-xs text-gray-400 font-bold mb-3">
                Masih ragu?
              </p>
              
              <a 
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWaClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 hover:bg-green-100/80 text-[12.5px] text-green-600 hover:text-green-700 font-bold transition-all shadow-[0_2px_10px_rgba(34,197,94,0.05)]"
              >
                <MessageCircle className="w-4 h-4 fill-current text-green-500" />
                <span>Chat dulu dengan Behel Care Consultant</span>
              </a>
            </motion.section>

          </div>
        </div>
      </main>

      {/* 9. Sticky Bottom CTA Footer (Scroll activated) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100/60 py-3.5 px-6 flex justify-center items-center shadow-lg transition-transform duration-300 ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-full max-w-[432px]">
          <Link 
            to={categoryData.checkoutUrl}
            onClick={handleCheckoutClick}
            className="block w-full"
          >
            <button 
              className="w-full h-13 rounded-full text-white font-bold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg cursor-pointer bg-mint-fresh"
              style={{ 
                backgroundColor: '#16c0f9',
                boxShadow: '0 8px 30px -4px rgba(22, 192, 249, 0.45)'
              }}
            >
              {categoryId === 'risiko_tinggi' && "Mulai program sekarang seharga Rp 349.000"}
              {categoryId === 'perlu_perhatian' && "Mulai perbaikan seharga Rp 149.000"}
              {categoryId === 'cukup_baik' && "Tingkatkan skor seharga Rp 149.000"}
              {categoryId === 'sangat_baik' && "Coba trial seharga Rp 49.000"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
