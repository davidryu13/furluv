import React from 'react';
import '../../styles/transactions.css';

export default function Transactions() {
  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <div className="transaction-card">
        <p>ID: 001</p>
        <p>Date: 2025-11-17</p>
        <p>Amount: $50</p>
        <p className="status pending">Status: Pending</p>
      </div>
      <div className="transaction-card">
        <p>ID: 002</p>
        <p>Date: 2025-11-16</p>
        <p>Amount: $100</p>
        <p className="status completed">Status: Completed</p>
      </div>
    </div>
  );
}
