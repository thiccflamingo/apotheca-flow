
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Package, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DeliveryBoyCard = ({ deliveryBoy, onAssign, orderId }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={deliveryBoy.image} alt={deliveryBoy.name} />
            <AvatarFallback>{getInitials(deliveryBoy.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium">{deliveryBoy.name}</h3>
            <p className="text-sm text-muted-foreground">{deliveryBoy.contact}</p>
            
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs">
                <Package className="h-3 w-3 text-pharma-500" />
                <span>{deliveryBoy.assignedOrders} active</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{deliveryBoy.completedOrders} completed</span>
              </div>
            </div>
          </div>

          {orderId && (
            <Button 
              onClick={() => onAssign(orderId, deliveryBoy.id)} 
              size="sm"
              className="bg-pharma-500 hover:bg-pharma-600"
            >
              Assign
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryBoyCard;
