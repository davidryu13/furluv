// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">FurLuv</div>
        <nav>
          <ul>
            <li><NavLink to="/dashboard/feed" className={({isActive}) => isActive ? "active" : ""}>Feed</NavLink></li>
            <li><NavLink to="/dashboard/pet-profile" className={({isActive}) => isActive ? "active" : ""}>Pet Profile</NavLink></li>
            <li><NavLink to="/dashboard/listings" className={({isActive}) => isActive ? "active" : ""}>Listings</NavLink></li>
            <li><NavLink to="/dashboard/transactions" className={({isActive}) => isActive ? "active" : ""}>Transactions</NavLink></li>
          </ul>
        </nav>
      </div>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}
