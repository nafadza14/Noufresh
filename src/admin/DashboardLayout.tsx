import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Settings, 
  LogOut,
  Users,
  ClipboardList
} from 'lucide-react';

export default function DashboardLayout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { path: '/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
    { path: '/assessments', icon: <ClipboardList size={20} />, label: 'Hasil Assessment' },
    { path: '/packages', icon: <Package size={20} />, label: 'Paket Perawatan' },
    { path: '/products', icon: <Package size={20} />, label: 'Produk Satuan' },
    { path: '/customers', icon: <Users size={20} />, label: 'Pelanggan' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <img loading="lazy" decoding="async" src="/logo.png" 
            alt="Noufresh Logo" 
            className="h-6"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          <div className="text-xs font-black text-gray-400 tracking-widest mb-2 px-4">MENU UTAMA</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive 
                    ? 'bg-mint-fresh text-white shadow-md shadow-mint-fresh/20' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
