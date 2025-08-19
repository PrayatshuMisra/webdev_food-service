import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navigation';
import Footer from './components/footer-block';
import Home from './pages/home-main-page';
import Restaurants from './pages/restro-page';
import RestaurantDetails from './pages/restro-details-page';
import Cart from './pages/cart-page';
import Login from './pages/login-page';
import Profile from './pages/profile-page';
import { CartProvider } from './context/cart-context';
import { AuthProvider, useAuth } from './context/user-login-auth';

import { formatCurrency } from './utils/formatters';

export { formatCurrency };

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-pulse text-4xl font-bold text-primary">
          FoodOS
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Login />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
