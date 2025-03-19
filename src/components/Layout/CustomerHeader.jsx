
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { Package, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const CustomerHeader = () => {
  const { cart, user, logout } = useAppContext();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-pharma-700">
          <Package className="h-6 w-6" />
          <span className="text-xl font-semibold hidden sm:inline-block">PharmaCare</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pharma-600 hover:bg-gray-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Search (hidden on mobile) */}
        <div className="hidden md:flex w-1/3 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search for products..." 
            className="w-full pl-9"
          />
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative text-gray-700 hover:text-pharma-600">
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-pharma-500">
                {cartItemsCount}
              </Badge>
            )}
          </Link>
          
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link 
                to="/account" 
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-pharma-600"
              >
                <User className="h-5 w-5" />
                <span>My Account</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="ml-2"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-pharma-500 hover:bg-pharma-600">
                Login
              </Button>
            </Link>
          )}
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search for products..." 
                  className="w-full pl-9"
                />
              </div>
              
              {/* Mobile navigation */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pharma-600 hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Mobile user actions */}
              {user && (
                <div className="pt-2 border-t flex flex-col space-y-1">
                  <Link 
                    to="/account" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pharma-600 hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-3 text-sm font-medium text-gray-700 hover:text-pharma-600 hover:bg-gray-100" 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;
