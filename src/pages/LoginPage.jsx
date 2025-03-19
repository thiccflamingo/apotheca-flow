
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, ShieldCheck, Truck, User } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    
    // Mock login with default user data based on role
    let userData = {};
    
    switch (selectedRole) {
      case 'admin':
        userData = { id: 1, name: 'Admin User' };
        login(selectedRole, userData);
        navigate('/admin');
        break;
      case 'delivery':
        userData = { id: 1, name: 'John Smith', contact: '555-123-4567' };
        login(selectedRole, userData);
        navigate('/delivery');
        break;
      case 'customer':
        userData = { id: 1, name: 'Customer User', email: 'customer@example.com' };
        login(selectedRole, userData);
        navigate('/');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pharma-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-pharma-100 rounded-full text-pharma-600 mb-4">
            <Package className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PharmaCare</h1>
          <p className="text-gray-600 mt-2">Pharmacy Inventory Management System</p>
        </div>
        
        <Card className="shadow-lg border-0 overflow-hidden animate-scale-in">
          <CardHeader className="bg-white pb-4">
            <CardTitle className="text-xl text-center">Log in to your account</CardTitle>
            <CardDescription className="text-center">
              Choose a role to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-4 pt-6">
            <div className="grid gap-4">
              <Button
                variant="outline"
                className={`p-6 flex items-center justify-start gap-3 text-left ${
                  role === 'admin' ? 'border-pharma-500 bg-pharma-50' : ''
                }`}
                onClick={() => handleRoleSelect('admin')}
              >
                <div className="h-10 w-10 rounded-full bg-pharma-100 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-pharma-600" />
                </div>
                <div>
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">
                    Manage inventory, orders and delivery staff
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className={`p-6 flex items-center justify-start gap-3 text-left ${
                  role === 'delivery' ? 'border-pharma-500 bg-pharma-50' : ''
                }`}
                onClick={() => handleRoleSelect('delivery')}
              >
                <div className="h-10 w-10 rounded-full bg-pharma-100 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-pharma-600" />
                </div>
                <div>
                  <div className="font-medium">Delivery Staff</div>
                  <div className="text-xs text-muted-foreground">
                    Manage deliveries and update order status
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className={`p-6 flex items-center justify-start gap-3 text-left ${
                  role === 'customer' ? 'border-pharma-500 bg-pharma-50' : ''
                }`}
                onClick={() => handleRoleSelect('customer')}
              >
                <div className="h-10 w-10 rounded-full bg-pharma-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-pharma-600" />
                </div>
                <div>
                  <div className="font-medium">Customer</div>
                  <div className="text-xs text-muted-foreground">
                    Browse products and place orders
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col pt-0">
            <p className="px-6 py-4 text-xs text-center text-muted-foreground">
              This is a demo application. Click on any role to log in without credentials.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
