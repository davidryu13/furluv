import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../utils/auth';
import '../styles/auth.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', petName: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.email || !form.password) {
      setError('Please fill all required fields.');
      return;
    }

    const res = register(form);
    if (!res.success) {
      setError(res.message);
      return;
    }

    navigate('/');
  }

  return (
    <div className="auth-page">
      <h2>Create your FurLuv account</h2>
      {error && <div className="error">{error}</div>}
      <AuthForm onSubmit={handleSubmit} submitLabel="Register">
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} placeholder="e.g. petlover123" />
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="choose a password" />
        </label>
        <label>
          Pet's Name (optional)
          <input name="petName" value={form.petName} onChange={handleChange} placeholder="Fluffy" />
        </label>
      </AuthForm>
    </div>
  );
}
