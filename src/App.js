// src/App.js
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Featured from './components/Featured';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import Subscriptions from './components/Subscriptions';
import Cart from './components/Cart';
import CreditCard from './components/CreditCard';

import './App.css';

function AppLayout() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Featured />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CreditCard />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© 2026 EZTechMovie &mdash; StreamList | INT499 Capstone Project</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public login screen, no Navbar */}
          <Route path="/login" element={<Login />} />

          {/* Everything else requires sign-in. An unauthenticated visit
              to any of these routes redirects to /login exclusively. */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;