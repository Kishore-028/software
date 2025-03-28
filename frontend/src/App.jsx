import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./pages/CartContext"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderTracking from "./pages/OrderTracking";
import HomeAdmin from "./pages/HomeAdmin";
import MenuVendor from "./pages/MenuVendor";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/OrderDetails";
import UpdateOrderStatus from "./pages/UpdateOrderStatus";
import OrderSuccess from "./pages/OrderSuccess"; // Import the OrderSuccess page
import Analytics from "./pages/Analytic"; 


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [isAuthenticated]);  // Re-run effect when isAuthenticated changes

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
    navigate("/"); // Redirect to home page
  };
  
  

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home isAuthenticated={isAuthenticated} handleLogout={handleLogout} />} />
      <Route path="/core/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/core/signup" element={<Signup />} />
      <Route path="/core/admin/order/:id" element={<OrderDetails />} />
      <Route path="/core/admin/order/:id/update" element={<UpdateOrderStatus />} />
      <Route path="/core/admin/dashboard" element={<Dashboard />} />
      <Route path="/core/admin/vendormenu" element={<MenuVendor />} />
      <Route path="/core/admin/home" element={<HomeAdmin />} />
      

      {/* Protected Routes (Require Login) */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
      <Route path="/core/home" element={<Home />} />
      
        <Route path="/core/menu" element={<Menu />} />
        <Route path="/core/order" element={<Order />} /> 
        <Route path="/core/user/home" element={<HomeUser />} />
        
        
        
        
        <Route path="/core/user/home" element={<Home />} />
        <Route path="/core/contact" element={<Contact />} />
        <Route path="/core/browse" element={<Browse />} />
        <Route path="/core/user/cart" element={<Cart />} />
        <Route path="/core/user/profile" element={<Profile />} />
        <Route path="/core/user/order-tracking" element={<OrderTracking />} />
        <Route path="/core/user/menu" element={<Menu />} />
        <Route path="/core/user/order-success" element={<OrderSuccess />} /> 
        <Route path="/core/admin/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;
