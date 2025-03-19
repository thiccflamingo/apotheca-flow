
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  History, 
  X,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderCard from '@/components/UI/OrderCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const OrderHistoryPage = () => {
  const { orders, user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Filter orders for this delivery boy
  const myOrders = orders.filter(order => 
    order.deliveryBoy && order.deliveryBoy.id === user.id
  );
  
  // Apply search and status filters
  const filteredOrders = myOrders.filter(order => {
    const matchesSearch = 
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `#${order.id}`.includes(searchQuery);
    
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Order History</h1>
        <p className="text-muted-foreground">
          View all your past and current orders
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="All Statuses" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Orders display */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <History className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter 
              ? "Try adjusting your search or filter criteria" 
              : "You don't have any orders yet"}
          </p>
          
          {(searchQuery || statusFilter) && (
            <div className="flex gap-2">
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  size="sm"
                >
                  <X className="h-4 w-4 mr-1" /> Clear Search
                </Button>
              )}
              
              {statusFilter && (
                <Button 
                  variant="outline" 
                  onClick={() => setStatusFilter('')}
                  size="sm"
                >
                  <X className="h-4 w-4 mr-1" /> Clear Filter
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
