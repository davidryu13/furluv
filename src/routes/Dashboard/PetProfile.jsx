import React from 'react';
import '../../styles/petprofile.css';

export default function PetProfile() {
  return (
    <div className="pet-profile-page">
      <h2>Pet Profile</h2>
      <div className="pet-card">
        <h3>Fluffy</h3>
        <p>Type: Dog</p>
        <p>Breed: Golden Retriever</p>
        <p>Age: 2 years</p>
        <p>Bio: Loves to play fetch and cuddle.</p>
      </div>
    </div>
  );
}
