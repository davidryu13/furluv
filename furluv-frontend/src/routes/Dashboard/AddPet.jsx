// src/routes/Dashboard/AddPet.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/addpet.css";

export default function AddPet({ pets = [], setPets }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof setPets !== "function") {
      console.error(
        "AddPet: `setPets` is not a function or was not provided. Make sure Dashboard passes setPets to the AddPet route."
      );
    }
  }, [setPets]);

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
    setPetData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const url = URL.createObjectURL(file);
      setPetData(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Error creating object URL for image:", err);
      alert("Could not load image preview.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petData.name.trim() || !petData.breed.trim() || petData.age === "") {
      alert("Please fill out all fields.");
      return;
    }

    if (typeof setPets !== "function") {
      alert("Cannot add pet: internal error (setPets missing). See console for details.");
      console.error("AddPet handleSubmit: setPets is not a function:", setPets);
      return;
    }

    const newPet = {
      id: Date.now(),
      name: petData.name.trim(),
      type: petData.type,
      breed: petData.breed,
      age: String(petData.age),
      image: petData.image || "/assets/default-pet.jpg",
    };

    console.info("AddPet: adding pet", newPet);

    setPets(prev => {
      const base = Array.isArray(prev) ? prev : (pets || []);
      return [...base, newPet];
    });

    navigate("/dashboard/owner-profile");
  };

  return (
    <div className="add-pet-page">
      <button className="back-button" onClick={() => navigate("/dashboard/owner-profile")}>
        ← Back to Owner Profile
      </button>

      <h2>Add Your Pet 🐾</h2>

      <form className="add-pet-form" onSubmit={handleSubmit}>
        {/* Pet name spans full width */}
        <div className="span-2">
          <label>Pet Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter pet name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type */}
        <div>
          <label>Type</label>
          <select name="type" value={petData.type} onChange={handleChange}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>

        {/* Breed */}
        <div>
          <label>Breed</label>
          <select
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          >
            <option value="">Select breed</option>
            {(petData.type === "Dog" ? dogBreeds : catBreeds).map((b, idx) => (
              <option key={idx} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Age */}
        <div>
          <label>Age (years)</label>
          <input
            type="number"
            name="age"
            placeholder="Enter pet age"
            min="0"
            value={petData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image uploader - spans full width */}
        <div className="image-uploader">
          <label className="upload-btn" htmlFor="pet-photo">
            <svg style={{width:16,height:16}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {petData.image ? "Change Photo" : "Upload Photo"}
          </label>

          <input id="pet-photo" type="file" accept="image/*" onChange={handleImageUpload} />

          <div style={{flex:1}}>
            <div className="help">Recommended: square photo, max 2MB</div>
          </div>

          <div className="image-preview">
            {petData.image ? <img src={petData.image} alt="preview" /> : <div style={{color:'#c7c7d9'}}>No photo</div>}
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={() => navigate("/dashboard/owner-profile")}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
}
