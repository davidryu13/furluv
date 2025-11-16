import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

export default function NavBar() {
  const loc = useLocation();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">FurLuv</Link>
      </div>
      <div className="nav-right">
        {loc.pathname !== '/register' && <Link to="/register" className="nav-link">Register</Link>}
        {loc.pathname !== '/login' && <Link to="/login" className="nav-link">Login</Link>}
      </div>
    </nav>
  );
}
