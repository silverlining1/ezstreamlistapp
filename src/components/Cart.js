// src/components/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  /* ── Empty state ── */
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="cart-heading">Your Cart</h2>
        <div className="cart-empty">
          <p className="empty-icon">🛒</p>
          <p className="empty-text">Your cart is empty.</p>
          <Link to="/subscriptions" className="shop-link">
            Browse Subscriptions &amp; Accessories
          </Link>
        </div>
      </div>
    );
  }

  /* ── Cart with items ── */
  return (
    <div className="cart-page">
      <div className="cart-top-row">
        <h2 className="cart-heading">Your Cart</h2>
        <button className="clear-btn" onClick={clearCart}>
          Clear All
        </button>
      </div>

      <div className="cart-layout">
        {/* ── Item rows ── */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-row">
              <div className="cart-row-img">
                <img src={item.img} alt={item.service} />
              </div>

              <div className="cart-row-info">
                <p className="cart-item-name">{item.service}</p>
                <p className="cart-item-sub">{item.serviceInfo}</p>
                <span className={`type-badge ${item.type}`}>
                  {item.type === 'subscription' ? 'Subscription' : 'Accessory'}
                </span>
              </div>

              <div className="cart-row-controls">
                {/* Quantity controls */}
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                    /* Subscriptions are capped at 1 */
                    disabled={item.type === 'subscription' && item.quantity >= 1}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <aside className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-lines">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-line">
                <span className="summary-line-name">
                  {item.service}
                  {item.quantity > 1 && (
                    <span className="summary-qty"> ×{item.quantity}</span>
                  )}
                </span>
                <span className="summary-line-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span>
              Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
            <span className="summary-total-price">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
          <Link to="/subscriptions" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
