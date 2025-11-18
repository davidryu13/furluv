import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <main className="landing-container">

      {/* Learn More Button */}
      <button className="learn-more-btn" onClick={() => setShowPopup(true)}>
        Learn More
      </button>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              ✕
            </button>
            <h2>About FurLuv</h2>
            <p>
              FurLuv is a platform for pet owners to connect, share stories, find matches,
              and join local pet communities. Create profiles for your pets, post updates,
              explore breeding options responsibly, and interact with pet lovers near you.
            </p>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="landing-left">
          <img
            src="/assets/landing.png"
            alt="dog and cat"
            className="landing-img animate-float"
          />
        </div>

        <div className="landing-right fade-in">
          <h1 className="landing-title">Welcome to FurLuv</h1>
          <p className="landing-text">
            A modern pet community where you can connect, share, and find trusted
            pet matches with ease.
          </p>

          <div className="landing-buttons">
            <Link to="/login" className="btn-login btn-anim">LOGIN</Link>
            <Link to="/register" className="btn-create btn-anim">CREATE ACCOUNT</Link>
          </div>
        </div>
      </section>

      {/* EXTRA FEATURES SECTION */}
      <section className="extra-features fade-in-delay">
        <h2>Why Choose FurLuv?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🐶</span>
            <h3>Pet Profiles</h3>
            <p>Showcase your pets with photos, traits, and unique stories.</p>
          </div>

          <div className="feature-card">
            <span>❤️</span>
            <h3>Matchmaking</h3>
            <p>Find responsible and trusted pet matches nearby.</p>
          </div>

          <div className="feature-card">
            <span>📸</span>
            <h3>Pet Feed</h3>
            <p>Post pictures & updates so your pets can shine.</p>
          </div>

          <div className="feature-card">
            <span>🌍</span>
            <h3>Community</h3>
            <p>Connect with pet lovers and breeders in your area.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
