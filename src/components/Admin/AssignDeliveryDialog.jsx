
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import DeliveryBoyCard from '@/components/UI/DeliveryBoyCard';

const AssignDeliveryDialog = ({ open, onOpenChange, orderId }) => {
  const { deliveryBoys, assignOrder } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDeliveryBoys = deliveryBoys.filter(boy => 
    boy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAssign = (orderId, deliveryBoyId) => {
    assignOrder(orderId, deliveryBoyId);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Delivery</DialogTitle>
          <DialogDescription>
            Select a delivery person to assign to this order.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search delivery staff..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filteredDeliveryBoys.map(boy => (
            <DeliveryBoyCard 
              key={boy.id} 
              deliveryBoy={boy} 
              onAssign={handleAssign}
              orderId={orderId}
            />
          ))}
          
          {filteredDeliveryBoys.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No delivery staff found matching your search.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeliveryDialog;
