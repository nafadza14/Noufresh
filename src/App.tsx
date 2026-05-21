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
import AssessmentResult from './pages/AssessmentResult';
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

function AppContent() {
  const location = useLocation();
  const isResultPage = location.pathname === '/assessment/result';

  return (
    <div className="flex flex-col min-h-screen">
      {!isResultPage && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/program" element={<Program />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/about" element={<About />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/result" element={<AssessmentResult />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:tier" element={<Checkout />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {!isResultPage && <Footer />}
      {!isResultPage && <WhatsAppButton />}
    </div>
  );
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
      <AppContent />
    </Router>
  );
}

