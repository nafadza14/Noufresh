import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Settings, 
  LogOut,
  Users,
  ClipboardList,
  MessageCircle,
  Bell,
  Bot
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function DashboardLayout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  const location = useLocation();
  const [escalationCount, setEscalationCount] = useState(0);
  const [pendingReminderCount, setPendingReminderCount] = useState(0);

  // Load badge counts
  const loadBadgeCounts = async () => {
    try {
      const { count: escCount } = await supabase
        .from('escalations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      const { count: remCount } = await supabase
        .from('reminders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setEscalationCount(escCount || 0);
      setPendingReminderCount(remCount || 0);
    } catch {
      // Silently fail — tables may not exist yet
    }
  };

  useEffect(() => {
    loadBadgeCounts();

    // Realtime subscription for escalations
    const escChannel = supabase
      .channel('sidebar-escalations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'escalations' }, loadBadgeCounts)
      .subscribe();

    const remChannel = supabase
      .channel('sidebar-reminders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reminders' }, loadBadgeCounts)
      .subscribe();

    return () => {
      supabase.removeChannel(escChannel);
      supabase.removeChannel(remChannel);
    };
  }, []);

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { path: '/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
    { path: '/assessments', icon: <ClipboardList size={20} />, label: 'Hasil Assessment' },
    { path: '/packages', icon: <Package size={20} />, label: 'Paket Perawatan' },
    { path: '/products', icon: <Package size={20} />, label: 'Produk Satuan' },
    { path: '/customers', icon: <Users size={20} />, label: 'Pelanggan' },
  ];

  const agentNavItems = [
    { 
      path: '/wa-center', 
      icon: <MessageCircle size={20} />, 
      label: 'WA Center', 
      badge: escalationCount > 0 ? escalationCount : null,
      badgeColor: 'bg-red-500'
    },
    { 
      path: '/reminders', 
      icon: <Bell size={20} />, 
      label: 'Reminder Manager', 
      badge: pendingReminderCount > 0 ? pendingReminderCount : null,
      badgeColor: 'bg-amber-500'
    },
    { 
      path: '/agent-config', 
      icon: <Bot size={20} />, 
      label: 'Agent Config', 
      badge: null,
      badgeColor: ''
    },
  ];

  const settingsItems = [
    { path: '/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  const renderNavItem = (item: any) => {
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
        <span className="flex-1">{item.label}</span>
        {item.badge !== null && item.badge !== undefined && (
          <span className={`${item.badgeColor} text-white text-[10px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center`}>
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
      </Link>
    );
  };

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
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
          {/* Menu Utama */}
          <div className="text-xs font-black text-gray-400 tracking-widest mb-2 px-4">MENU UTAMA</div>
          {navItems.map(renderNavItem)}

          {/* Divider + AI Agent section */}
          <div className="my-4 border-t border-gray-100" />
          <div className="text-xs font-black text-gray-400 tracking-widest mb-2 px-4">AI AGENT</div>
          {agentNavItems.map(renderNavItem)}

          {/* Divider + Settings */}
          <div className="my-4 border-t border-gray-100" />
          {settingsItems.map(renderNavItem)}
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
