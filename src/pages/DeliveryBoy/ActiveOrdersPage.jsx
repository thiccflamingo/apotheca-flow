
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCheck,
  Phone,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OrderCard from '@/components/UI/OrderCard';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { format } from 'date-fns';

const ActiveOrdersPage = () => {
  const { orders, user, updateOrderStatus } = useAppContext();
  const [statusUpdateDialog, setStatusUpdateDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  // Filter active orders for this delivery boy
  const activeOrders = orders.filter(order => 
    order.deliveryBoy && 
    order.deliveryBoy.id === user.id && 
    order.status !== 'delivered'
  );
  
  const handleOpenStatusUpdate = (order, status) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setStatusUpdateDialog(true);
  };
  
  const handleUpdateStatus = () => {
    if (selectedOrder && newStatus) {
      updateOrderStatus(selectedOrder.id, newStatus);
      setStatusUpdateDialog(false);
    }
  };
  
  const renderOrderActions = (order) => {
    if (order.status === 'assigned') {
      return (
        <Button 
          onClick={() => handleOpenStatusUpdate(order, 'in-transit')}
          className="flex-1 bg-pharma-500 hover:bg-pharma-600"
        >
          <Truck className="h-4 w-4 mr-2" /> Start Delivery
        </Button>
      );
    } else if (order.status === 'in-transit') {
      return (
        <Button 
          onClick={() => handleOpenStatusUpdate(order, 'delivered')}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <CheckCheck className="h-4 w-4 mr-2" /> Mark as Delivered
        </Button>
      );
    }
    return null;
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Active Orders</h1>
        <p className="text-muted-foreground">
          Manage your current active orders
        </p>
      </div>
      
      {activeOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeOrders.map(order => (
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
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Active Orders</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any orders assigned to you right now.
          </p>
        </div>
      )}
      
      {/* Status Update Dialog */}
      <Dialog open={statusUpdateDialog} onOpenChange={setStatusUpdateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Order #{selectedOrder?.id}</h3>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="text-sm">
                  <div className="font-medium mb-1">{selectedOrder?.customer?.name}</div>
                  <div className="text-muted-foreground flex items-start gap-1 mb-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> 
                    {selectedOrder?.customer?.address}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1 mb-2">
                    <Phone className="h-4 w-4 flex-shrink-0" /> 
                    {selectedOrder?.customer?.contact}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4 flex-shrink-0" /> 
                    Order placed: {selectedOrder ? format(new Date(selectedOrder.createdAt), 'MMM d, yyyy · h:mm a') : ''}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm mb-4">
              {newStatus === 'in-transit' ? (
                <div className="flex gap-2">
                  <Truck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Start Delivery?</p>
                    <p>This will update the order status to "In Transit".</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <CheckCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Mark as Delivered?</p>
                    <p>This will complete the order and remove it from your active orders.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setStatusUpdateDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateStatus}
              className={newStatus === 'delivered' ? 'bg-green-600 hover:bg-green-700' : 'bg-pharma-500 hover:bg-pharma-600'}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveOrdersPage;
