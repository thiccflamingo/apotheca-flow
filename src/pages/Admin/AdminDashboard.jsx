
import { useAppContext } from '@/context/AppContext';
import { 
  Package, 
  ShoppingBag, 
  Truck, 
  Users, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/UI/StatsCard';
import OrderCard from '@/components/UI/OrderCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const { products, orders, deliveryBoys } = useAppContext();
  
  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalDeliveryBoys = deliveryBoys.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inTransitOrders = orders.filter(order => order.status === 'in-transit').length;
  
  // Mock sales data for chart
  const salesData = [
    { name: 'Mon', sales: 2400 },
    { name: 'Tue', sales: 1398 },
    { name: 'Wed', sales: 9800 },
    { name: 'Thu', sales: 3908 },
    { name: 'Fri', sales: 4800 },
    { name: 'Sat', sales: 3800 },
    { name: 'Sun', sales: 4300 },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your pharmacy today.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Products" 
          value={totalProducts} 
          icon={Package} 
          trend={{
            direction: 'up',
            value: '+5%',
            label: 'from last month'
          }}
        />
        <StatsCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={ShoppingBag} 
          trend={{
            direction: 'up',
            value: '+12%',
            label: 'from last month'
          }}
        />
        <StatsCard 
          title="Delivery Staff" 
          value={totalDeliveryBoys} 
          icon={Truck} 
        />
        <StatsCard 
          title="Pending Orders" 
          value={pendingOrders} 
          icon={TrendingUp} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="hsl(var(--pharma-500))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  minimal={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
