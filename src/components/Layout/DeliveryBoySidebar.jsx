
import { useAppContext } from '@/context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Clock, CheckCircle, LogOut, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const DeliveryBoySidebar = () => {
  const { logout, orders, user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  // Count active orders for this delivery boy
  const activeOrdersCount = orders.filter(
    order => order.deliveryBoy?.id === user.id && order.status !== 'delivered'
  ).length;
  
  const navItems = [
    { name: 'Dashboard', path: '/delivery', icon: Home },
    { 
      name: 'Active Orders', 
      path: '/delivery/active', 
      icon: Truck,
      badge: activeOrdersCount || null
    },
    { name: 'Order History', path: '/delivery/history', icon: Clock },
    { name: 'Completed Orders', path: '/delivery/completed', icon: CheckCircle },
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
        <p className="text-sm text-muted-foreground mt-1">Delivery Dashboard</p>
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
                {item.badge && (
                  <Badge className="ml-auto bg-pharma-500 hover:bg-pharma-600">
                    {item.badge}
                  </Badge>
                )}
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

export default DeliveryBoySidebar;
