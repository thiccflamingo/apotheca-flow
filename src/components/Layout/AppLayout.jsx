
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DeliveryBoySidebar from './DeliveryBoySidebar';
import CustomerHeader from './CustomerHeader';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const AppLayout = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user && !location.pathname.includes('/login')) {
      navigate('/login');
    }
    
    // Close sidebar on mobile when route changes
    setSidebarOpen(false);
  }, [location.pathname, user, navigate]);
  
  // Handle page transitions
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('animate-fade-in');
      const timeout = setTimeout(() => {
        main.classList.remove('animate-fade-in');
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);
  
  if (!user && !location.pathname.includes('/login')) {
    return null; // Don't render anything while redirecting
  }
  
  // If the path is login or customer-facing pages, render without admin sidebar
  if (location.pathname.includes('/login') || (user?.role === 'customer' || !user)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {user?.role === 'customer' && <CustomerHeader />}
        <main className="flex-1 transition-all duration-200">
          {children}
        </main>
      </div>
    );
  }
  
  // Admin and delivery boy layouts include a sidebar
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row transition-all duration-200">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md border"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Sidebar for admin and delivery boy */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {user?.role === 'admin' ? <AdminSidebar /> : <DeliveryBoySidebar />}
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 transition-all duration-200 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
