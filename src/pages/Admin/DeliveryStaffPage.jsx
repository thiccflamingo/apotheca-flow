
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { 
  Search, 
  Truck, 
  BadgeCheck, 
  Clock, 
  X, 
  Plus, 
  Check, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const DeliveryStaffPage = () => {
  const { deliveryBoys } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter delivery boys by search
  const filteredDeliveryBoys = deliveryBoys.filter(deliveryBoy => 
    deliveryBoy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deliveryBoy.contact.includes(searchQuery)
  );
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Delivery Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your delivery staff and track their performance
          </p>
        </div>
        <Button className="bg-pharma-500 hover:bg-pharma-600">
          <Plus className="h-4 w-4 mr-2" /> Add Delivery Staff
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search delivery staff..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {/* Staff display */}
      {filteredDeliveryBoys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeliveryBoys.map(deliveryBoy => (
            <Card key={deliveryBoy.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white shadow">
                    <AvatarImage src={deliveryBoy.image} alt={deliveryBoy.name} />
                    <AvatarFallback>{deliveryBoy.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{deliveryBoy.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{deliveryBoy.contact}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Active Orders:</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${deliveryBoy.assignedOrders === 0 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : deliveryBoy.assignedOrders >= 3 
                          ? 'bg-red-50 text-red-600 border-red-200' 
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }
                    `}
                  >
                    {deliveryBoy.assignedOrders} / 3
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <BadgeCheck className="h-4 w-4" />
                      <span>Completed Orders:</span>
                    </div>
                    <span className="font-medium">{deliveryBoy.completedOrders}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Workload</span>
                      <span className="font-medium">
                        {deliveryBoy.assignedOrders === 0 
                          ? 'Available' 
                          : deliveryBoy.assignedOrders >= 3 
                            ? 'Full Capacity' 
                            : 'Active'
                        }
                      </span>
                    </div>
                    <Progress 
                      value={(deliveryBoy.assignedOrders / 3) * 100} 
                      className={`h-2 ${
                        deliveryBoy.assignedOrders === 0 
                          ? 'bg-muted' 
                          : deliveryBoy.assignedOrders >= 3 
                            ? 'bg-red-100' 
                            : 'bg-amber-100'
                      }`}
                      indicatorClassName={`${
                        deliveryBoy.assignedOrders === 0 
                          ? 'bg-green-500' 
                          : deliveryBoy.assignedOrders >= 3 
                            ? 'bg-red-500' 
                            : 'bg-amber-500'
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <Truck className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No delivery staff found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? "Try adjusting your search criteria" 
              : "There are no delivery staff registered yet"}
          </p>
          
          {searchQuery && (
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

export default DeliveryStaffPage;
