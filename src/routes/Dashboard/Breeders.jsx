import React from 'react';
import '../styles/dashboard.css';

export default function Breeders() {
  const breeders = [
    { breederID: 1, kennelName: 'Happy Paws', location: 'Manila', documents: 'License.pdf' },
    { breederID: 2, kennelName: 'Furry Friends', location: 'Cebu', documents: 'License.pdf' },
  ];

  return (
    <div className="breeder-profiles">
      {breeders.map(b => (
        <div className="breeder-card" key={b.breederID}>
          <h3>{b.kennelName}</h3>
          <p>Location: {b.location}</p>
          <p>Documents: {b.documents}</p>
        </div>
      ))}
    </div>
  );
}
