// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Register from "./routes/Register";

// Dashboard components
import OwnerProfile from "./routes/Dashboard/OwnerProfile";
import PetProfile from "./routes/Dashboard/PetProfile";
import Transactions from "./routes/Dashboard/Transactions";
import Messages from "./routes/Dashboard/Messages";
import Documents from "./routes/Dashboard/Documents";
import Feed from "./routes/Dashboard/Feed";
import Listings from "./routes/Dashboard/Listings";
import AddPet from "./routes/Dashboard/AddPet"; // New AddPet page

// Global NavBar
import Navbar from "./components/NavBar";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Pets state lifted here
  const [pets, setPets] = useState([
    { id: 1, name: "Fluffy", image: "/assets/fluffy-walk.jpg" },
    { id: 2, name: "Buddy", image: "/assets/labrador.jpg" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSearch = (q) => setSearchQuery(q);

  // Wrapper to include Navbar on all dashboard pages
  const DashboardPage = ({ children }) => (
    <div className="dashboard-page">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="main-content">{children}</div>
    </div>
  );

  return (
    <Routes>
      {/* Landing page */}
      <Route
        path="/"
        element={!user ? <Landing /> : <Navigate replace to="/dashboard/feed" />}
      />

      {/* Auth pages */}
      <Route
        path="/login"
        element={!user ? <Login onLogin={handleLogin} /> : <Navigate replace to="/dashboard/feed" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate replace to="/dashboard/feed" />}
      />

      {/* Dashboard pages with global NavBar */}
      <Route
        path="/dashboard/feed"
        element={user ? <DashboardPage><Feed /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/owner-profile"
        element={user ? <DashboardPage><OwnerProfile pets={pets} setPets={setPets} /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/pet-profile/:id"
        element={user ? <DashboardPage><PetProfile pets={pets} /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/add-pet"
        element={user ? <DashboardPage><AddPet pets={pets} setPets={setPets} /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/listings"
        element={user ? <DashboardPage><Listings /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/transactions"
        element={user ? <DashboardPage><Transactions /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/messages"
        element={user ? <DashboardPage><Messages /></DashboardPage> : <Navigate replace to="/login" />}
      />
      <Route
        path="/dashboard/documents"
        element={user ? <DashboardPage><Documents /></DashboardPage> : <Navigate replace to="/login" />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
