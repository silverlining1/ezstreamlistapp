// src/components/Featured.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Featured.css';

function Featured() {
  const featuredTitles = [
    { id: 1, title: 'Stellar Odyssey', genre: 'Sci-Fi', rating: '★★★★★' },
    { id: 2, title: 'Dark Horizon',    genre: 'Thriller', rating: '★★★★☆' },
    { id: 3, title: 'The Lost Coast',  genre: 'Drama',    rating: '★★★★★' },
  ];

  return (
    <div className="featured-page">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          Welcome to <span className="hero-accent">StreamList</span>
        </h1>
        <p className="hero-sub">
          Your personal hub for movies, shows, and streaming subscriptions.
        </p>
        <div className="hero-actions">
          <Link to="/subscriptions" className="btn-primary">Browse Subscriptions</Link>
          <Link to="/watchlist"     className="btn-secondary">My Watchlist</Link>
        </div>
      </section>

      {/* Featured titles */}
      <section className="featured-section">
        <h2 className="section-heading">
          <span className="accent">Featured</span> Titles
        </h2>
        <div className="cards">
          {featuredTitles.map((t) => (
            <div key={t.id} className="card">
              <div className="card-placeholder" />
              <div className="card-info">
                <p className="card-genre">{t.genre}</p>
                <h3 className="card-title">{t.title}</h3>
                <p className="card-rating">{t.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Featured;
