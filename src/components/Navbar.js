// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import '../Navbar.css';

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    { path: '/watchlist', label: 'Watchlist' },
    { path: '/subscriptions', label: 'Subscriptions' },
    { path: '/cart', label: 'Cart' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-ez">EZ</span>
          <span className="brand-tech">Tech</span>
          <span className="brand-movie">Movie</span>
        </Link>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label === 'Cart' ? (
                <span className="cart-link-wrap">
                  🛒 Cart
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </span>
              ) : (
                link.label
              )}
            </Link>
          </li>
        ))}

        {/* Signed-in user lives inside the list so it aligns with the
            other nav items. Logging out clears the session, which sends
            the user back to /login via ProtectedRoute. */}
        {user && (
          <li className="navbar-user">
            <img
              className="user-avatar"
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
            <button className="logout-btn" onClick={logout}>
              Sign out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;