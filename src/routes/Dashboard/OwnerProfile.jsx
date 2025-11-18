import React, { useState } from 'react';
import '../../styles/ownerprofile.css';
import { FaPlus } from 'react-icons/fa';

export default function OwnerProfile() {
  const [pets, setPets] = useState([
    { id: 1, name: 'Fluffy', image: '/assets/fluffy-walk.jpg' },
    { id: 2, name: 'Buddy', image: '/assets/labrador.jpg' },
  ]);

  const addPet = () => {
    const newPetName = prompt('Enter new pet name:');
    if (!newPetName) return;
    const newPet = {
      id: pets.length + 1,
      name: newPetName,
      image: '/assets/default-pet.jpg', // placeholder image
    };
    setPets([...pets, newPet]);
  };

  return (
    <div className="owner-profile">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img src="/assets/cover.jpg" alt="Cover" />
      </div>

      {/* Profile Avatar */}
      <div className="profile-avatar">
        <img src="/assets/profile.jpg" alt="Profile" />
      </div>

      {/* Name and Club */}
      <div className="owner-info">
        <h2>John Doe</h2>
        <p className="club">Pet Lovers Club</p>
      </div>

      {/* Stats */}
      <div className="stats">
        <div>
          <h3>120</h3>
          <p>Followers</p>
        </div>
        <div>
          <h3>85</h3>
          <p>Following</p>
        </div>
        <div>
          <h3>{pets.length}</h3>
          <p>Posts</p>
        </div>
      </div>

      {/* Manage Documents */}
      <div className="manage-documents">
        <button>Manage Documents</button>
      </div>

      {/* Pets Section */}
      <div className="pets-section">
        <h3>Pets</h3>
        <div className="pets-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image} alt={pet.name} />
              <p>{pet.name}</p>
            </div>
          ))}
          {/* Add Pet Button */}
          <div className="pet-card add-pet" onClick={addPet}>
            <FaPlus className="plus-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
