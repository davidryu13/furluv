import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import '../styles/navbar.css';

export default function NavBar({ user, onLogout, onSearch }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDashboard = loc.pathname.startsWith("/dashboard");

  useEffect(() => {
    setNavbarVisible(true);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value); // call parent search handler
  };

  return (
    <nav className={`navbar ${navbarVisible ? 'visible' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="brand">FurLuv</Link>
      </div>

      <div className="navbar-right">
        {isDashboard && (
          <>
            {/* Search bar */}
            <input
              type="text"
              className="navbar-search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {/* Dashboard Icons */}
            <AiFillHome
              className="nav-icon"
              title="Home"
              onClick={() => navigate("/dashboard/feed")}
            />
            <FaPaw
              className="nav-icon"
              title="Listings"
              onClick={() => navigate("/dashboard/listings")}
            />
            <div className="profile-dropdown">
              <FiUser
                className="nav-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => navigate("/dashboard/owner-profile")}>
                    Profile
                  </div>
                  <div className="dropdown-item" onClick={onLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!isDashboard && loc.pathname !== '/register' && (
          <Link to="/register" className="btn small">Register</Link>
        )}
        {!isDashboard && loc.pathname !== '/login' && (
          <Link to="/login" className="btn small">Login</Link>
        )}
      </div>
    </nav>
  );
}
