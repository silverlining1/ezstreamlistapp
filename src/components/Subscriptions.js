// src/components/Subscriptions.js
import React, { useState } from 'react';
import list from '../data';
import { useCart } from '../CartContext';
import './Subscriptions.css';

function Subscriptions() {
  const { addToCart, cartItems } = useCart();
  const [warnings, setWarnings]   = useState({});
  const [confirmed, setConfirmed] = useState({});

  const subscriptions = list.filter((item) => item.type === 'subscription');
  const accessories   = list.filter((item) => item.type === 'accessory');

  const handleAdd = (item) => {
    const result = addToCart(item);

    if (!result.success) {
      setWarnings((prev) => ({ ...prev, [item.id]: result.message }));
      setTimeout(() => setWarnings((prev) => ({ ...prev, [item.id]: null })), 3500);
    } else {
      setConfirmed((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => setConfirmed((prev) => ({ ...prev, [item.id]: false })), 1500);
    }
  };

  const inCart = (id) => cartItems.some((c) => c.id === id);

  const renderCard = (item) => (
    <div key={item.id} className={`product-card ${inCart(item.id) ? 'in-cart' : ''}`}>
      <div className="card-img-wrap">
        <img src={item.img} alt={item.service} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.service}</h3>
        <p className="card-info">{item.serviceInfo}</p>
        <p className="card-price">${item.price.toFixed(2)}</p>

        {warnings[item.id] && (
          <div className="warning-label" role="alert">
            ⚠️ {warnings[item.id]}
          </div>
        )}

        <button
          className={`add-btn ${confirmed[item.id] ? 'added' : ''}`}
          onClick={() => handleAdd(item)}
        >
          {confirmed[item.id] ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="subscriptions-page">
      <section className="product-section">
        <h2 className="section-heading">
          <span className="accent">Subscription</span> Plans
        </h2>
        <p className="section-sub">
          Select a streaming plan. Each subscription type may only be added once.
        </p>
        <div className="product-grid">{subscriptions.map(renderCard)}</div>
      </section>

      <section className="product-section">
        <h2 className="section-heading">
          <span className="accent">EZTech</span> Accessories
        </h2>
        <p className="section-sub">
          Shirts and phone cases — add as many as you like.
        </p>
        <div className="product-grid">{accessories.map(renderCard)}</div>
      </section>
    </div>
  );
}

export default Subscriptions;
