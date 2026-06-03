// src/App.js
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';

import Navbar from './components/Navbar';
import Featured from './components/Featured';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import Subscriptions from './components/Subscriptions';
import Cart from './components/Cart';

import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Featured />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2026 EZTechMovie &mdash; StreamList | INT499 Capstone Project</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
