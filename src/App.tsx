
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import AppLayout from "@/components/Layout/AppLayout";

// Auth pages
import LoginPage from "@/pages/LoginPage";

// Admin pages
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import InventoryPage from "@/pages/Admin/InventoryPage";
import OrdersPage from "@/pages/Admin/OrdersPage";
import DeliveryStaffPage from "@/pages/Admin/DeliveryStaffPage";

// Delivery Boy pages
import DeliveryDashboard from "@/pages/DeliveryBoy/DeliveryDashboard";
import ActiveOrdersPage from "@/pages/DeliveryBoy/ActiveOrdersPage";
import OrderHistoryPage from "@/pages/DeliveryBoy/OrderHistoryPage";

// Customer pages
import HomePage from "@/pages/Customer/HomePage";
import ProductsPage from "@/pages/Customer/ProductsPage";
import CartPage from "@/pages/Customer/CartPage";

// Error page
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Main App Layout - wraps all authenticated routes */}
            <Route path="/" element={<AppLayout />}>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/inventory" element={<InventoryPage />} />
              <Route path="/admin/orders" element={<OrdersPage />} />
              <Route path="/admin/delivery-staff" element={<DeliveryStaffPage />} />
              
              {/* Delivery Boy Routes */}
              <Route path="/delivery" element={<DeliveryDashboard />} />
              <Route path="/delivery/active" element={<ActiveOrdersPage />} />
              <Route path="/delivery/history" element={<OrderHistoryPage />} />
              
              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
