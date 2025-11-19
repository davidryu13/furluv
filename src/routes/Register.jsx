import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../utils/auth";
import "../styles/auth.css";
import AuthNavbar from "../components/AuthNavbar";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "", email: "", password: "", petName: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName || !form.lastName || !form.username || !form.email || !form.password)
      return setError("Please fill all required fields.");

    const res = register(form);
    if (!res.success) return setError(res.message);

    navigate("/login");
  };

  return (
    <>
      <AuthNavbar />
      <div className="auth-page">
        <div className="auth-card fade-up">
          <h2>Create Your Account</h2>
          {error && <div className="error">{error}</div>}

          <AuthForm onSubmit={handleSubmit}>
            <div className="row-2">
              <div className="input-group">
                <input name="firstName" value={form.firstName} onChange={handleChange} required />
                <label>First Name</label>
              </div>
              <div className="input-group">
                <input name="lastName" value={form.lastName} onChange={handleChange} required />
                <label>Last Name</label>
              </div>
            </div>

            <div className="input-group">
              <input name="username" value={form.username} onChange={handleChange} required />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
              <label>Email</label>
            </div>

            <div className="input-group password-group">
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} required />
              <label>Password</label>
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="input-group">
              <input name="petName" value={form.petName} onChange={handleChange} />
              <label>Pet Name (optional)</label>
            </div>

            <button className="btn" type="submit">Register</button>
            <p className="link-text" onClick={() => navigate("/login")}>
              Already have an account? Login
            </p>
          </AuthForm>
        </div>
      </div>
    </>
  );
}
