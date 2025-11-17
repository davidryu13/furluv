import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard/Dashboard';

export default function App() {
  const [user, setUser] = useState(null); // null = logged out

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Landing page */}
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard/feed" />} />

        {/* Login page */}
        <Route
          path="/login"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard/feed" />}
        />

        {/* Register page */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard/feed" />}
        />

        {/* Dashboard protected route */}
        <Route
          path="/dashboard/*"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
