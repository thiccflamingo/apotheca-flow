
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import {
  Search,
  Filter,
  Package,
  Truck,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import OrderCard from '@/components/UI/OrderCard';
import AssignDeliveryDialog from '@/components/Admin/AssignDeliveryDialog';

const OrdersPage = () => {
  const { orders } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Filter orders by search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         `order #${order.id}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssignClick = (orderId) => {
    setSelectedOrderId(orderId);
    setAssignDialogOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Orders Management</h1>
        <p className="text-muted-foreground">
          View and manage customer orders, assign delivery staff
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or order #..."
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
                <SelectValue placeholder="All Orders" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders grid */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              actions={
                order.status === 'pending' ? (
                  <Button
                    onClick={() => handleAssignClick(order.id)}
                    className="w-full bg-pharma-500 hover:bg-pharma-600"
                    size="sm"
                  >
                    <Truck className="h-4 w-4 mr-2" /> Assign Delivery
                  </Button>
                ) : null
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter
              ? "Try adjusting your search or filter criteria"
              : "No orders have been placed yet"}
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

      {/* Assign Delivery Dialog */}
      <AssignDeliveryDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default OrdersPage;
