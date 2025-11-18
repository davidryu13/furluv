// src/routes/Dashboard/Dashboard.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import "../../styles/dashboard.css";

import Feed from "./Feed";
import PetProfile from "./PetProfile";
import Listings from "./Listings";
import Transactions from "./Transactions";
import OwnerProfile from "./OwnerProfile"; // <-- new import

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard no-sidepanels">
      {/* Top Navigation Bar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Dashboard Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="feed" />} />
          <Route path="feed" element={<Feed />} />
          <Route path="pet-profile" element={<PetProfile />} />
          <Route path="listings" element={<Listings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="owner-profile" element={<OwnerProfile />} /> {/* Owner Profile route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
