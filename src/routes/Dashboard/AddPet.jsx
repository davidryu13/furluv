// src/routes/Dashboard/AddPet.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/addpet.css";

export default function AddPet({ setPets }) {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    image: null,
  });

  const dogBreeds = [
    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Bulldog",
    "Beagle", "Poodle", "Rottweiler", "Yorkshire Terrier", "Boxer", "Dachshund",
    "Siberian Husky", "Chihuahua", "Shih Tzu", "Doberman", "Australian Shepherd"
  ];

  const catBreeds = [
    "Siamese", "Persian", "Maine Coon", "Ragdoll", "Bengal", "Sphynx",
    "British Shorthair", "Scottish Fold", "Abyssinian", "Oriental"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPetData({ ...petData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!petData.name || !petData.breed || !petData.age) {
      alert("Please fill out all fields!");
      return;
    }
    const newPet = {
      id: Date.now(),
      name: petData.name,
      type: petData.type,
      breed: petData.breed,
      age: petData.age,
      image: petData.image || "/assets/default-pet.jpg",
    };
    setPets(prev => [...prev, newPet]);
    navigate("/dashboard/owner-profile");
  };

  return (
    <div className="add-pet-page">
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/dashboard/owner-profile")}
      >
        ← Back to Owner Profile
      </button>

      <h2>Add Your Pet 🐾</h2>
      <form className="add-pet-form" onSubmit={handleSubmit}>
        <label>Pet Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter pet name"
          value={petData.name}
          onChange={handleChange}
        />

        <label>Type</label>
        <select name="type" value={petData.type} onChange={handleChange}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>

        <label>Breed</label>
        <select
          name="breed"
          value={petData.breed}
          onChange={handleChange}
        >
          <option value="">Select breed</option>
          {(petData.type === "Dog" ? dogBreeds : catBreeds).map((b, idx) => (
            <option key={idx} value={b}>{b}</option>
          ))}
        </select>

        <label>Age (years)</label>
        <input
          type="number"
          name="age"
          placeholder="Enter pet age"
          min="0"
          value={petData.age}
          onChange={handleChange}
        />

        <label>Pet Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {petData.image && (
          <img
            src={petData.image}
            alt="Pet Preview"
            className="pet-image-preview"
          />
        )}

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}
