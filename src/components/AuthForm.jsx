import React from 'react';

export default function AuthForm({ children, onSubmit, submitLabel }) {
  return (
    <div className="auth-card">
      <form onSubmit={onSubmit} className="auth-form">
        {children}
        <button type="submit" className="btn">{submitLabel}</button>
      </form>
    </div>
  );
}
