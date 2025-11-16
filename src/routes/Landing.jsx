import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import '../styles/landing.css';

export default function Landing() {
  const user = getCurrentUser();

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-left">
          <h1>Welcome to FurLuv</h1>
          <p>The social home for pets and their humans — connect, share, and explore breeding options responsibly.</p>
          {!user ? (
            <div className="cta-buttons">
              <Link to="/register" className="btn large">Create Account</Link>
              <Link to="/login" className="btn outline large">Login</Link>
            </div>
          ) : (
            <div>
              <p>Hi, <strong>{user.username}</strong> — ready to check your pet's profile?</p>
              <Link to="/" className="btn large">Go to Feed</Link>
            </div>
          )}
        </div>
        <div className="hero-right">
          <img src="/assets/pet-illustration.jpg" alt="cute pets" className="hero-img"/>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>🐶 Pet profiles & feed</li>
          <li>❤️ Breeding match system (coming soon)</li>
          <li>🐾 Groups, events, and pet care tips</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Create your FurLuv account and pet profile</li>
          <li>Connect with nearby pet owners</li>
          <li>Share photos, updates, and explore breeding options</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"FurLuv connected me with so many pet lovers in my area!"</p>
            <span>- Jamie P.</span>
          </div>
          <div className="testimonial-card">
            <p>"My dog found a perfect playmate thanks to FurLuv."</p>
            <span>- Alex R.</span>
          </div>
          <div className="testimonial-card">
            <p>"Easy to use and very pet-friendly platform."</p>
            <span>- Samira K.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
