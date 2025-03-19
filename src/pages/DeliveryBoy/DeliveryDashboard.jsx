
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  CheckCircle, 
  Truck, 
  MapPin, 
  CheckCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import StatsCard from '@/components/UI/StatsCard';
import OrderCard from '@/components/UI/OrderCard';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';

const DeliveryDashboard = () => {
  const { orders, user, updateOrderStatus } = useAppContext();
  const [statusUpdateDialog, setStatusUpdateDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  // Filter orders for this delivery boy
  const myOrders = orders.filter(order => 
    order.deliveryBoy && order.deliveryBoy.id === user.id
  );
  
  const activeOrders = myOrders.filter(order => order.status !== 'delivered');
  const completedOrders = myOrders.filter(order => order.status === 'delivered');
  const pendingPickupOrders = myOrders.filter(order => order.status === 'assigned');
  const inTransitOrders = myOrders.filter(order => order.status === 'in-transit');
  
  // Get the first active order for quick access
  const currentActiveOrder = activeOrders.length > 0 ? activeOrders[0] : null;
  
  const workloadPercentage = (activeOrders.length / 3) * 100;
  
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
        <h1 className="text-2xl font-bold mb-1">Delivery Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your deliveries.
        </p>
      </div>
      
      {/* Workload indicator */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Your Workload</h3>
            <span className="text-sm font-medium">
              {activeOrders.length} of 3 orders active
            </span>
          </div>
          <Progress 
            value={workloadPercentage} 
            className={`h-2 ${
              workloadPercentage === 0
                ? 'bg-muted'
                : workloadPercentage >= 100
                  ? 'bg-red-100'
                  : 'bg-amber-100'
            }`}
            indicatorClassName={`${
              workloadPercentage === 0
                ? 'bg-green-500'
                : workloadPercentage >= 100
                  ? 'bg-red-500'
                  : 'bg-amber-500'
            }`}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Available</span>
            <span>Busy</span>
            <span>Full Capacity</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Pending Pickup" 
          value={pendingPickupOrders.length} 
          icon={ShoppingBag}
        />
        <StatsCard 
          title="In Transit" 
          value={inTransitOrders.length} 
          icon={Truck}
        />
        <StatsCard 
          title="Delivered Today" 
          value={completedOrders.filter(o => 
            new Date(o.updatedAt).toDateString() === new Date().toDateString()
          ).length} 
          icon={CheckCircle}
        />
        <StatsCard 
          title="Total Completed" 
          value={completedOrders.length} 
          icon={TrendingUp}
        />
      </div>
      
      {/* Current active order */}
      {currentActiveOrder ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Current Active Order</h2>
          <OrderCard 
            order={currentActiveOrder} 
            actions={renderOrderActions(currentActiveOrder)}
          />
        </div>
      ) : (
        <Card className="mb-6 bg-muted/30">
          <CardContent className="py-8 flex flex-col items-center justify-center text-center">
            <div className="bg-muted/50 p-3 rounded-full mb-3">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No Active Orders</h3>
            <p className="text-muted-foreground text-sm">
              You don't have any orders assigned to you right now.
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Recently completed orders */}
      {completedOrders.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Recently Completed Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedOrders
              .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
              .slice(0, 3)
              .map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  minimal={true}
                />
              ))}
          </div>
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
                  <div className="text-muted-foreground flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> 
                    {selectedOrder?.customer?.address}
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

export default DeliveryDashboard;
