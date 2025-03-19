
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

const OrderCard = ({ order, actions = null, minimal = false }) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className={`${minimal ? 'p-3' : 'p-5'}`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${minimal ? 'text-sm' : 'text-base'}`}>
                Order #{order.id}
              </h3>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-muted-foreground text-xs mt-1">
              {format(new Date(order.createdAt), 'MMM d, yyyy · h:mm a')}
            </p>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${minimal ? 'text-base' : 'text-lg'}`}>
              ${order.total.toFixed(2)}
            </div>
            {order.deliveryBoy && (
              <p className="text-xs text-muted-foreground mt-1">
                Delivery: {order.deliveryBoy.name}
              </p>
            )}
          </div>
        </div>

        {!minimal && (
          <>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Customer</h4>
              <div className="text-sm space-y-1">
                <p>{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.address}</p>
                <p className="text-muted-foreground">{order.customer.contact}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Items</h4>
              <ul className="text-sm space-y-1">
                {order.products.map((product) => (
                  <li key={product.id} className="flex justify-between">
                    <span>
                      {product.quantity} × {product.name}
                    </span>
                    <span>${(product.price * product.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>

      {actions && (
        <CardFooter className={`bg-gray-50 ${minimal ? 'p-3' : 'p-4'}`}>
          <div className="flex gap-2 w-full">{actions}</div>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderCard;
