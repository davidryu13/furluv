// src/routes/Dashboard/Dashboard.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import "../../styles/dashboard.css";

import Feed from "./Feed";
import PetProfile from "./PetProfile";
import Listings from "./Listings";
import Transactions from "./Transactions";
import OwnerProfile from "./OwnerProfile";
import AddPet from "./AddPet";

export default function Dashboard({ user, onLogout, pets, setPets }) {
  return (
    <div className="dashboard no-sidepanels">
      {/* Top Navigation Bar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Dashboard Content */}
      <div className="main-content">
        <Routes>
          {/* Default dashboard route */}
          <Route path="/" element={<Navigate to="feed" />} />

          {/* Dashboard pages */}
          <Route path="feed" element={<Feed />} />
          <Route path="pet-profile/:id" element={<PetProfile pets={pets} />} /> {/* Dynamic pet id */}
          <Route path="listings" element={<Listings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route
            path="owner-profile"
            element={<OwnerProfile pets={pets} setPets={setPets} />}
          />
           <Route
    path="add-pet"
    element={<AddPet pets={pets} setPets={setPets} />} 
    />

          {/* Catch-all */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
