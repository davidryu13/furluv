// src/routes/Dashboard/PetProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/petprofile.css";
import { FaEdit, FaCamera } from "react-icons/fa";
import { findPetById, isOwner } from "../../utils/petProfileLogic";

export default function PetProfile({ pets = [], setPets, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const foundPet = findPetById(pets, id);
    if (!foundPet) {
      navigate("/dashboard/owner-profile");
      return;
    }
    setPet(foundPet);
    setEditData({ ...foundPet });
  }, [id, pets]);

  if (!pet) return null;

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleEditImage = (field) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setEditData({ ...editData, [field]: URL.createObjectURL(e.target.files[0]) });
      }
    };
    fileInput.click();
  };

  const submitEdit = () => {
    setPets(pets.map(p => (p.id === pet.id ? { ...editData } : p)));
    setPet({ ...editData });
    setShowEditPopup(false);
  };

  return (
    <div className="petprofile-fullscreen">
      <button className="back-btn" onClick={() => navigate("/dashboard/owner-profile")}>
        ← Back to Owner Profile
      </button>

      <div className="petprofile-content">
        <h2>{pet.name}</h2>
        <img src={pet.image} alt={pet.name} className="petprofile-image" />

        <div className="pet-details">
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age} year(s)</p>
        </div>

        {isOwner(pet, user) && (
          <button className="edit-pet-btn" onClick={() => setShowEditPopup(true)}>
            <FaEdit /> Edit Pet
          </button>
        )}
      </div>

      {/* Edit Popup */}
      {showEditPopup && (
        <div className="edit-popup">
          <div className="edit-content">
            <h3>Edit Pet</h3>

            <img src={editData.image} alt="Pet" className="edit-avatar" />
            <button onClick={() => handleEditImage("image")} className="edit-photo-btn">
              <FaCamera /> Change Photo
            </button>

            <input
              type="text"
              value={editData.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              placeholder="Pet Name"
              className="edit-input"
            />
            <input
              type="text"
              value={editData.type}
              onChange={(e) => handleEditChange("type", e.target.value)}
              placeholder="Type (Dog/Cat)"
              className="edit-input"
            />
            <input
              type="text"
              value={editData.breed}
              onChange={(e) => handleEditChange("breed", e.target.value)}
              placeholder="Breed"
              className="edit-input"
            />
            <input
              type="number"
              value={editData.age}
              onChange={(e) => handleEditChange("age", e.target.value)}
              placeholder="Age"
              className="edit-input"
            />

            <div className="edit-actions">
              <button onClick={() => setShowEditPopup(false)}>Cancel</button>
              <button onClick={submitEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
