// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Register from "./routes/Register";

import Dashboard from "./routes/Dashboard/Dashboard";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [pets, setPets] = useState([
    { id: 1, name: "Fluffy", image: "/assets/fluffy-walk.jpg" },
    { id: 2, name: "Buddy", image: "/assets/labrador.jpg" },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Fluffy just had a walk!",
      content: "Check out the latest updates from pet lovers near you.",
      image: "/assets/fluffy-walk.jpg",
      liked: false,
      comments: [],
      showComments: false,
    },
    {
      id: 2,
      title: "New Puppy Listing",
      content: "A cute Labrador is available for adoption.",
      image: "/assets/labrador.jpg",
      liked: false,
      comments: [],
      showComments: false,
    },
  ]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Routes>
      {/* Landing and auth */}
      <Route
        path="/"
        element={!user ? <Landing /> : <Navigate replace to="/dashboard/feed" />}
      />
      <Route
        path="/login"
        element={!user ? <Login onLogin={handleLogin} /> : <Navigate replace to="/dashboard/feed" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate replace to="/dashboard/feed" />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          user ? (
            <Dashboard
              user={user}
              onLogout={handleLogout}
              pets={pets}
              setPets={setPets}
              posts={posts}
              setPosts={setPosts}
            />
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
