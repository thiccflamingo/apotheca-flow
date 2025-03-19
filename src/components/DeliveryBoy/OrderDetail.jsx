
import { format } from 'date-fns';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, CheckCircle, Package, MapPin, Phone, User } from 'lucide-react';
import StatusBadge from '@/components/UI/StatusBadge';

const OrderDetail = ({ order }) => {
  const { updateOrderStatus } = useAppContext();

  const handleUpdateStatus = (status) => {
    updateOrderStatus(order.id, status);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-lg font-semibold mb-1">Order #{order.id}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {format(new Date(order.createdAt), 'MMM d, yyyy · h:mm a')}
              </span>
              <StatusBadge status={order.status} />
            </div>
          </div>
          <div className="text-xl font-bold">${order.total.toFixed(2)}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-pharma-500" />
              Customer Information
            </h4>
            <div className="bg-muted/30 p-3 rounded-md">
              <div className="font-medium">{order.customer.name}</div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>{order.customer.address}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Phone className="h-4 w-4" />
                <div>{order.customer.contact}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-pharma-500" />
              Order Items
            </h4>
            <div className="bg-muted/30 p-3 rounded-md">
              <ul className="space-y-2 divide-y">
                {order.products.map((product) => (
                  <li key={product.id} className="flex justify-between pt-2 first:pt-0">
                    <span>
                      {product.quantity} × {product.name}
                    </span>
                    <span className="font-medium">${(product.price * product.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between pt-2 mt-2 border-t font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 p-4">
        <div className="w-full flex flex-wrap gap-2 justify-end">
          {order.status === 'assigned' && (
            <Button 
              onClick={() => handleUpdateStatus('in-transit')}
              className="bg-pharma-500 hover:bg-pharma-600"
            >
              <Truck className="h-4 w-4 mr-2" />
              Mark as In Transit
            </Button>
          )}
          
          {order.status === 'in-transit' && (
            <Button 
              onClick={() => handleUpdateStatus('delivered')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Delivered
            </Button>
          )}
          
          {order.status === 'delivered' && (
            <div className="text-green-600 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Order completed successfully
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderDetail;
