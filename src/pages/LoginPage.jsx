
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, ShoppingCart, Truck, Building } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [adminData, setAdminData] = useState({ username: '', password: '' });
  const [deliveryData, setDeliveryData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData({ ...deliveryData, [name]: value });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login request
    setTimeout(() => {
      login('admin', {
        id: 1,
        name: 'Admin User',
        username: adminData.username,
      });
      navigate('/admin');
      setIsLoading(false);
    }, 800);
  };

  const handleDeliveryLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Find the delivery boy based on username (for demo)
    const deliveryBoyId = 
      deliveryData.username.toLowerCase() === 'john' ? 1 : 
      deliveryData.username.toLowerCase() === 'michael' ? 2 : 
      deliveryData.username.toLowerCase() === 'david' ? 3 : 1;
    
    // Simulate login request
    setTimeout(() => {
      login('delivery', {
        id: deliveryBoyId,
        name: `Delivery User ${deliveryBoyId}`,
        username: deliveryData.username,
      });
      navigate('/delivery');
      setIsLoading(false);
    }, 800);
  };

  const handleCustomerLogin = () => {
    setIsLoading(true);
    
    // Simulate login request
    setTimeout(() => {
      login('customer', {
        id: 1,
        name: 'Customer User',
      });
      navigate('/');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-pharma-50 to-blue-50">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-pharma-700">MediTrack</CardTitle>
            <CardDescription>Pharmacy Inventory Management System</CardDescription>
          </CardHeader>

          <Tabs defaultValue="customer">
            <TabsList className="grid grid-cols-3 mb-4 mx-4">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {/* Customer Tab */}
            <TabsContent value="customer">
              <CardContent className="text-center space-y-4">
                <div className="mx-auto rounded-full bg-pharma-100 w-16 h-16 flex items-center justify-center mb-2">
                  <ShoppingCart className="h-8 w-8 text-pharma-500" />
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Welcome to MediTrack</h3>
                  <p className="text-muted-foreground mt-1">
                    Browse our pharmacy products without an account
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={handleCustomerLogin} 
                  className="w-full bg-pharma-500 hover:bg-pharma-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Continue as Customer"}
                </Button>
              </CardFooter>
            </TabsContent>

            {/* Delivery Tab */}
            <TabsContent value="delivery">
              <CardContent>
                <form onSubmit={handleDeliveryLogin}>
                  <div className="mx-auto rounded-full bg-pharma-100 w-16 h-16 flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-pharma-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery-username">Username</Label>
                      <Input 
                        id="delivery-username" 
                        name="username" 
                        placeholder="Enter your username" 
                        value={deliveryData.username}
                        onChange={handleDeliveryChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery-password">Password</Label>
                      <Input 
                        id="delivery-password" 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={deliveryData.password}
                        onChange={handleDeliveryChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-pharma-500 hover:bg-pharma-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Delivery Staff"}
                  </Button>
                  
                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    <p>Demo: Username: john, michael, or david</p>
                    <p>Password: any (for demo purposes)</p>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            {/* Admin Tab */}
            <TabsContent value="admin">
              <CardContent>
                <form onSubmit={handleAdminLogin}>
                  <div className="mx-auto rounded-full bg-pharma-100 w-16 h-16 flex items-center justify-center mb-4">
                    <Building className="h-8 w-8 text-pharma-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-username">Username</Label>
                      <Input 
                        id="admin-username" 
                        name="username" 
                        placeholder="Enter your username" 
                        value={adminData.username}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input 
                        id="admin-password" 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={adminData.password}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-pharma-500 hover:bg-pharma-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Admin"}
                  </Button>
                  
                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    <p>Demo: Username: admin</p>
                    <p>Password: any (for demo purposes)</p>
                  </div>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
