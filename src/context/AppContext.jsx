
import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// Mock data for our application
const mockProducts = [
  { id: 1, name: 'Ibuprofen', description: 'Pain reliever, 200mg tablets', category: 'Pain Relief', price: 8.99, stock: 150, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2340' },
  { id: 2, name: 'Amoxicillin', description: 'Antibiotic, 500mg capsules', category: 'Antibiotics', price: 12.99, stock: 75, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=2340' },
  { id: 3, name: 'Loratadine', description: 'Antihistamine, 10mg tablets', category: 'Allergy', price: 9.99, stock: 120, image: 'https://images.unsplash.com/photo-1550572017-9aedf5cbc4ba?auto=format&fit=crop&q=80&w=2340' },
  { id: 4, name: 'Omeprazole', description: 'Acid reducer, 20mg capsules', category: 'Digestive Health', price: 15.99, stock: 90, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=2340' },
  { id: 5, name: 'Acetaminophen', description: 'Pain reliever, 500mg tablets', category: 'Pain Relief', price: 7.99, stock: 200, image: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?auto=format&fit=crop&q=80&w=2340' },
  { id: 6, name: 'Salbutamol Inhaler', description: 'Bronchodilator, 100mcg', category: 'Respiratory', price: 24.99, stock: 35, image: 'https://images.unsplash.com/photo-1580281657702-257584239a55?auto=format&fit=crop&q=80&w=2340' },
  { id: 7, name: 'Aspirin', description: 'Blood thinner, 81mg tablets', category: 'Heart Health', price: 6.99, stock: 250, image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=2340' },
  { id: 8, name: 'Metformin', description: 'Diabetes medication, 500mg tablets', category: 'Diabetes', price: 11.99, stock: 100, image: 'https://images.unsplash.com/photo-1603807008857-ad66b70431e2?auto=format&fit=crop&q=80&w=2340' },
];

const mockDeliveryBoys = [
  { id: 1, name: 'John Smith', contact: '555-123-4567', assignedOrders: 2, completedOrders: 15, image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2340' },
  { id: 2, name: 'Michael Johnson', contact: '555-987-6543', assignedOrders: 1, completedOrders: 23, image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=2340' },
  { id: 3, name: 'David Wilson', contact: '555-456-7890', assignedOrders: 0, completedOrders: 18, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2340' },
];

const mockOrders = [
  { 
    id: 1, 
    customer: { id: 1, name: 'Emma Thompson', address: '123 Maple St', contact: '555-111-2222' }, 
    products: [
      { id: 1, name: 'Ibuprofen', quantity: 2, price: 8.99 },
      { id: 3, name: 'Loratadine', quantity: 1, price: 9.99 }
    ], 
    total: 27.97, 
    status: 'pending', 
    createdAt: '2023-10-01T10:30:00', 
    deliveryBoy: null
  },
  { 
    id: 2, 
    customer: { id: 2, name: 'Robert Davis', address: '456 Oak Ave', contact: '555-333-4444' }, 
    products: [
      { id: 5, name: 'Acetaminophen', quantity: 1, price: 7.99 },
      { id: 7, name: 'Aspirin', quantity: 2, price: 6.99 }
    ], 
    total: 21.97, 
    status: 'assigned', 
    createdAt: '2023-10-02T14:45:00', 
    deliveryBoy: { id: 1, name: 'John Smith' }
  },
  { 
    id: 3, 
    customer: { id: 3, name: 'Lisa Wilson', address: '789 Pine Ln', contact: '555-555-6666' }, 
    products: [
      { id: 4, name: 'Omeprazole', quantity: 1, price: 15.99 }
    ], 
    total: 15.99, 
    status: 'in-transit', 
    createdAt: '2023-10-03T09:15:00', 
    deliveryBoy: { id: 1, name: 'John Smith' }
  },
  { 
    id: 4, 
    customer: { id: 4, name: 'James Brown', address: '101 Cedar Rd', contact: '555-777-8888' }, 
    products: [
      { id: 6, name: 'Salbutamol Inhaler', quantity: 1, price: 24.99 },
      { id: 8, name: 'Metformin', quantity: 1, price: 11.99 }
    ], 
    total: 36.98, 
    status: 'in-transit', 
    createdAt: '2023-10-04T16:20:00', 
    deliveryBoy: { id: 2, name: 'Michael Johnson' }
  },
  { 
    id: 5, 
    customer: { id: 5, name: 'Sarah Miller', address: '202 Elm St', contact: '555-999-0000' }, 
    products: [
      { id: 2, name: 'Amoxicillin', quantity: 1, price: 12.99 }
    ], 
    total: 12.99, 
    status: 'delivered', 
    createdAt: '2023-10-01T11:45:00', 
    deliveryBoy: { id: 3, name: 'David Wilson' }
  },
];

// Create the context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);
  const [deliveryBoys, setDeliveryBoys] = useState(mockDeliveryBoys);
  const [orders, setOrders] = useState(mockOrders);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Product operations
  const addProduct = (product) => {
    const newProduct = { id: Date.now(), ...product };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => product.id === id ? { ...product, ...updatedProduct } : product));
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };

  // Order operations
  const createOrder = (orderData) => {
    const newOrder = { 
      id: Date.now(), 
      ...orderData, 
      status: 'pending', 
      createdAt: new Date().toISOString(), 
      deliveryBoy: null 
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    toast.success('Order placed successfully');
    return newOrder;
  };

  const assignOrder = (orderId, deliveryBoyId) => {
    const deliveryBoy = deliveryBoys.find(db => db.id === deliveryBoyId);
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'assigned', deliveryBoy: { id: deliveryBoy.id, name: deliveryBoy.name } };
      }
      return order;
    }));
    
    setDeliveryBoys(deliveryBoys.map(db => {
      if (db.id === deliveryBoyId) {
        return { ...db, assignedOrders: db.assignedOrders + 1 };
      }
      return db;
    }));
    
    toast.success(`Order assigned to ${deliveryBoy.name}`);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        let updatedOrder = { ...order, status };
        
        // If order is delivered, update delivery boy stats
        if (status === 'delivered' && order.deliveryBoy) {
          setDeliveryBoys(deliveryBoys.map(db => {
            if (db.id === order.deliveryBoy.id) {
              return { 
                ...db, 
                assignedOrders: db.assignedOrders - 1,
                completedOrders: db.completedOrders + 1
              };
            }
            return db;
          }));
        }
        
        return updatedOrder;
      }
      return order;
    }));
    
    toast.success(`Order status updated to ${status}`);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    toast.success(`${product.name} added to cart`);
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Authentication simulation
  const login = (role, userData) => {
    setUser({ role, ...userData });
    toast.success(`Logged in as ${role}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AppContext.Provider value={{
      // State
      products,
      deliveryBoys,
      orders,
      cart,
      user,
      
      // Product operations
      addProduct,
      updateProduct,
      deleteProduct,
      
      // Order operations
      createOrder,
      assignOrder,
      updateOrderStatus,
      
      // Cart operations
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      calculateCartTotal,
      
      // Authentication
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
