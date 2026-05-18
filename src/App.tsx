import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Program from './pages/Program';
import Consultation from './pages/Consultation';
import About from './pages/About';
import Assessment from './pages/Assessment';
import Checkout from './pages/Checkout';
import WhatsAppButton from './components/WhatsAppButton';
import AdminApp from './admin/AdminApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const isDashboard = window.location.hostname.startsWith('dashboard.') || window.location.pathname.startsWith('/admin');

  if (isDashboard) {
    return (
      <Router basename={window.location.pathname.startsWith('/admin') ? '/admin' : '/'}>
        <AdminApp />
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/program" element={<Program />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/about" element={<About />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/:tier" element={<Checkout />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
