
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash, 
  X, 
  Plus, 
  Minus, 
  ChevronRight, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, calculateCartTotal, createOrder, user } = useAppContext();
  const navigate = useNavigate();
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState({
    name: user?.name || '',
    address: '',
    contact: ''
  });
  
  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };
  
  const handleRemove = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutDialog(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };
  
  const handlePlaceOrder = () => {
    const order = {
      customer: {
        id: user?.id || Date.now(),
        name: orderData.name,
        address: orderData.address,
        contact: orderData.contact
      },
      products: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: parseFloat(calculateCartTotal())
    };
    
    createOrder(order);
    setOrderPlaced(true);
    
    // Reset form
    setOrderData({
      name: '',
      address: '',
      contact: ''
    });
  };
  
  const closeDialog = () => {
    setCheckoutDialog(false);
    if (orderPlaced) {
      setOrderPlaced(false);
      navigate('/');
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Your Cart</h1>
        <p className="text-muted-foreground">
          Review your items before checkout
        </p>
      </div>
      
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/4 h-36 sm:h-auto">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-muted hover:bg-muted/80 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="px-4 py-1 text-center min-w-[40px]">
                            {item.quantity}
                          </span>
                          
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="ml-auto font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => clearCart()}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Clear Cart
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/products')}
                className="gap-2"
              >
                <ChevronRight className="h-4 w-4" /> Continue Shopping
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculateCartTotal()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>$0.00</span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateCartTotal()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-pharma-500 hover:bg-pharma-600"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          
          <Button 
            onClick={() => navigate('/products')}
            className="bg-pharma-500 hover:bg-pharma-600"
          >
            Start Shopping
          </Button>
        </div>
      )}
      
      {/* Checkout Dialog */}
      <Dialog open={checkoutDialog} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {orderPlaced ? (
            // Order Success Screen
            <div className="py-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <DialogTitle className="mb-2">Order Placed Successfully!</DialogTitle>
              <DialogDescription className="mb-6">
                Your order has been received and is being processed.
              </DialogDescription>
              
              <Button 
                onClick={closeDialog}
                className="bg-pharma-500 hover:bg-pharma-600"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            // Checkout Form
            <>
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
                <DialogDescription>
                  Fill in your delivery details to complete your order.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={orderData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={orderData.address} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input 
                      id="contact" 
                      name="contact" 
                      value={orderData.contact} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Total Items:</span>
                    <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Order Total:</span>
                    <span>${calculateCartTotal()}</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={closeDialog}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePlaceOrder}
                  className="bg-pharma-500 hover:bg-pharma-600"
                  disabled={!orderData.name || !orderData.address || !orderData.contact}
                >
                  Place Order
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
