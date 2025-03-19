
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  ChevronDown, 
  Package, 
  Search, 
  Filter, 
  ShoppingBag, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OrderCard from '@/components/UI/OrderCard';
import StatusBadge from '@/components/UI/StatusBadge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const OrdersPage = () => {
  const { orders, deliveryBoys, assignOrder } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState('');
  
  // Filter orders by search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `#${order.id}`.includes(searchQuery);
    
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const handleOpenAssignDialog = (order) => {
    setSelectedOrder(order);
    setSelectedDeliveryBoy('');
    setAssignDialogOpen(true);
  };
  
  const handleAssign = () => {
    if (selectedOrder && selectedDeliveryBoy) {
      assignOrder(selectedOrder.id, parseInt(selectedDeliveryBoy));
      setAssignDialogOpen(false);
    }
  };
  
  const renderOrderActions = (order) => {
    if (order.status === 'pending') {
      return (
        <Button 
          onClick={() => handleOpenAssignDialog(order)}
          className="flex-1 bg-pharma-500 hover:bg-pharma-600"
          size="sm"
        >
          Assign to Delivery
        </Button>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1"
      >
        View Details
      </Button>
    );
  };
  
  // Available delivery boys (who don't already have too many orders)
  const availableDeliveryBoys = deliveryBoys.filter(db => db.assignedOrders < 3);
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage all customer orders
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders by customer or ID..." 
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
              actions={renderOrderActions(order)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter 
              ? "Try adjusting your search or filter criteria" 
              : "There are no orders in the system yet"}
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
      
      {/* Assign Order Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Order to Delivery Staff</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Order Details</h3>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Order #{selectedOrder?.id}</span>
                  {selectedOrder && <StatusBadge status={selectedOrder.status} />}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {selectedOrder?.customer.name} - {selectedOrder?.customer.address}
                </div>
                <div className="text-sm font-medium">
                  Total: ${selectedOrder?.total.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Select Delivery Staff:
              </label>
              
              {availableDeliveryBoys.length > 0 ? (
                <Select 
                  value={selectedDeliveryBoy} 
                  onValueChange={setSelectedDeliveryBoy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose delivery staff" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDeliveryBoys.map(deliveryBoy => (
                      <SelectItem 
                        key={deliveryBoy.id} 
                        value={deliveryBoy.id.toString()}
                      >
                        {deliveryBoy.name} ({deliveryBoy.assignedOrders} active orders)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
                  All delivery staff are at maximum capacity. Please wait for some orders to be completed.
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!selectedDeliveryBoy || availableDeliveryBoys.length === 0}
              className="bg-pharma-500 hover:bg-pharma-600"
            >
              Assign Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
