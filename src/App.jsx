import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard/Dashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Routes>
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard/feed" />} />
      <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard/feed" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard/feed" />} />
      <Route path="/dashboard/*" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

