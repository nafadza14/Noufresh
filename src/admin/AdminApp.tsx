import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import DashboardLayout from './DashboardLayout';
import DashboardOverview from './DashboardOverview';
import ProductsAdmin from './ProductsAdmin';
import OrdersAdmin from './OrdersAdmin';
import CustomersAdmin from './CustomersAdmin';
import SettingsAdmin from './SettingsAdmin';
import AssessmentsAdmin from './AssessmentsAdmin';
import PackagesAdmin from './PackagesAdmin';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/orders" element={<OrdersAdmin />} />
        <Route path="/assessments" element={<AssessmentsAdmin />} />
        <Route path="/packages" element={<PackagesAdmin />} />
        <Route path="/products" element={<ProductsAdmin />} />
        <Route path="/customers" element={<CustomersAdmin />} />
        <Route path="/settings" element={<SettingsAdmin />} />
        {/* Fallbacks for other placeholder routes */}
        <Route path="*" element={<div className="p-8 text-center text-gray-500 font-medium">Halaman sedang dalam pengembangan</div>} />
      </Routes>
    </DashboardLayout>
  );
}
