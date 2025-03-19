
import { useAppContext } from '@/context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Truck, Users, BarChart, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdminSidebar = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: BarChart },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Delivery Staff', path: '/admin/delivery-staff', icon: Truck },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="h-full flex flex-col bg-white border-r shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-pharma-700">
          <Package className="h-6 w-6" />
          <span>PharmaCare</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full justify-start text-muted-foreground hover:text-foreground" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
