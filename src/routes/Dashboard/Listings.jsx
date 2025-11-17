import React from 'react';
import '../../styles/listings.css';

export default function Listings() {
  return (
    <div className="listings-page">
      <h2>Listings</h2>
      <div className="listing-card">
        <h3>Fluffy - Golden Retriever</h3>
        <p>Age: 2 years</p>
        <p>Status: Available</p>
      </div>
      <div className="listing-card">
        <h3>Mittens - Persian Cat</h3>
        <p>Age: 1 year</p>
        <p>Status: Pending</p>
      </div>
    </div>
  );
}
