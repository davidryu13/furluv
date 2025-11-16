import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/auth';
import '../styles/auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError('Please fill both fields.');
      return;
    }

    const res = login(form);
    if (!res.success) {
      setError(res.message);
      return;
    }

    navigate('/');
  }

  return (
    <div className="auth-page">
      <h2>Welcome back</h2>
      {error && <div className="error">{error}</div>}
      <AuthForm onSubmit={handleSubmit} submitLabel="Login">
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="your password" />
        </label>
      </AuthForm>
    </div>
  );
}
