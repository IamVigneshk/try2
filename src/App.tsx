import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import About from './components/About';
import ScanningInterface from './components/ScanningInterface';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

interface User {
  email: string;
  password: string;
  isPremium: boolean;
  dateAdded: string;
  lastScan?: string;
  status: 'active' | 'inactive';
}

function App() {
  const [scanInfo, setScanInfo] = useState<{
    isScanning: boolean;
    targetInfo?: { type: 'domain' | 'ip'; value: string };
    isAdmin?: boolean;
  }>({
    isScanning: false,
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleScanStart = (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => {
    setScanInfo({
      isScanning: true,
      targetInfo,
      isAdmin,
    });
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
  };

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleUserLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    return !!user;
  };

  const handleReturnHome = () => {
    setScanInfo({ isScanning: false });
    setShowAdminLogin(false);
    setIsAdminAuthenticated(false);
  };

  if (showAdminLogin) {
    return <AdminLogin onLoginSuccess={handleAdminLogin} />;
  }

  if (isAdminAuthenticated) {
    return (
      <AdminDashboard 
        onLogout={() => setIsAdminAuthenticated(false)} 
        onAddUser={handleAddUser}
        users={users}
        onReturnHome={handleReturnHome}
      />
    );
  }

  if (scanInfo.isScanning && scanInfo.targetInfo) {
    return (
      <ScanningInterface 
        targetInfo={scanInfo.targetInfo} 
        isAdmin={scanInfo.isAdmin || false}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        onScanStart={handleScanStart} 
        onAdminClick={() => setShowAdminLogin(true)}
        onUserLogin={handleUserLogin}
      />
      <Hero onScanStart={handleScanStart} />
      <Features />
      <Services />
      <About />
    </div>
  );
}

export default App;