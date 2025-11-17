// src/routes/Dashboard/Dashboard.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../styles/dashboard.css";

import Feed from "./Feed";
import PetProfile from "./PetProfile";
import Listings from "./Listings";
import Transactions from "./Transactions";

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="feed" />} />
          <Route path="feed" element={<Feed />} />
          <Route path="pet-profile" element={<PetProfile />} />
          <Route path="listings" element={<Listings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
