// Listings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listings.css';

const pets = [
  {
    name: 'Kurt',
    breed: 'Manx Cat',
    age: 6,
    status: 'Available',
    image: 'https://placekitten.com/200/200'
  },
  {
    name: 'John Arfbanal',
    breed: 'Golden Retriever',
    age: 8,
    status: 'Not Available',
    image: 'https://placedog.net/200/200?id=1'
  },
  {
    name: 'Keith',
    breed: 'Golden Retriever',
    age: 6,
    status: 'Available',
    image: 'https://placedog.net/200/200?id=2'
  },
  {
    name: 'Ginger',
    breed: 'American Short Hair Cat',
    age: 6,
    status: 'Not Available',
    image: 'https://placekitten.com/201/201'
  }
];

export default function Listings() {
  const navigate = useNavigate();

  const openTransaction = (pet) => {
    // ✅ Correct route
    navigate('/dashboard/transactions', { state: { pet } });
  };

  return (
    <div className="listings-page">
      <h2>Pet Lists 🐾</h2>

      <input
        type="text"
        placeholder="Search"
        className="search-input"
      />

      {pets.map((pet, index) => (
        <div
          className="listing-card"
          key={index}
          onClick={() => openTransaction(pet)}
          style={{ cursor: "pointer" }}
        >
          <img src={pet.image} alt={pet.name} className="pet-image" />
          <div className="pet-info">
            <p><strong>Name:</strong> {pet.name}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years old</p>
            <p>
              <strong>Status:</strong>
              <span className={`status ${pet.status === 'Available' ? 'available' : 'not-available'}`}>
                {pet.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
