
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { Search, Package, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderDetail from '@/components/DeliveryBoy/OrderDetail';

const ActiveOrdersPage = () => {
  const { orders, user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter active orders assigned to the current delivery boy
  const activeOrders = orders.filter(order => 
    (order.status === 'assigned' || order.status === 'in-transit') && 
    order.deliveryBoy?.id === user?.id
  );
  
  // Apply search filter
  const filteredOrders = activeOrders.filter(order => 
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `order #${order.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Active Orders</h1>
        <p className="text-muted-foreground">
          View and manage your current deliveries
        </p>
      </div>
      
      {/* Search bar */}
      {activeOrders.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by customer name, address or order #..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}
      
      {/* Orders list */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <OrderDetail key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {activeOrders.length > 0 
              ? "No orders match your search" 
              : "No active orders"
            }
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeOrders.length > 0 
              ? "Try adjusting your search criteria" 
              : "You don't have any active orders assigned to you"
            }
          </p>
          
          {activeOrders.length > 0 && searchQuery && (
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              size="sm"
            >
              <X className="h-4 w-4 mr-1" /> Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveOrdersPage;
