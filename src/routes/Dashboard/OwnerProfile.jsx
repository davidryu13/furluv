// src/routes/Dashboard/OwnerProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ownerprofile.css";
import { FaPlus, FaEdit, FaCamera } from "react-icons/fa";

export default function OwnerProfile({ pets = [], setPets, posts = [], setPosts }) {
  const navigate = useNavigate();

  const [ownerInfo, setOwnerInfo] = useState({
    name: "John Doe",
    profile: "/assets/profile.jpg",
    cover: "/assets/cover.jpg",
    club: "Pet Lovers Club",
    location: "Manila, Philippines",
  });

  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [editData, setEditData] = useState({ ...ownerInfo });

  // ==========================
  // ADD PET
  // ==========================
  const addPet = () => {
    const newPetName = prompt("Enter new pet name:");
    if (!newPetName) return;
    const newPet = {
      id: pets.length + 1,
      name: newPetName,
      image: "/assets/default-pet.jpg",
    };
    setPets([...pets, newPet]);
  };

  // ==========================
  // CREATE POST
  // ==========================
  const addPost = () => setShowPostPopup(true);

  const attachPhoto = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setPostImage(URL.createObjectURL(e.target.files[0]));
      }
    };
    fileInput.click();
  };

  const submitPost = () => {
    if (!postText && !postImage) {
      alert("Post cannot be empty!");
      return;
    }

    const newPost = {
      id: Date.now(),
      image: postImage,
      title: ownerInfo.name,
      content: postText,
      liked: false,
      showComments: false,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);

    setShowPostPopup(false);
    setPostText("");
    setPostImage(null);

    navigate("/dashboard/feed");
  };

  // ==========================
  // EDIT PROFILE
  // ==========================
  const openEditPopup = () => {
    setEditData({ ...ownerInfo });
    setShowEditPopup(true);
  };

  const handleEditChange = (field, value) =>
    setEditData({ ...editData, [field]: value });

  const handleEditImage = (field) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setEditData({
          ...editData,
          [field]: URL.createObjectURL(e.target.files[0]),
        });
      }
    };
    fileInput.click();
  };

  const submitEdit = () => {
    setOwnerInfo({ ...editData });
    setShowEditPopup(false);
  };

  return (
    <div className="owner-profile">

      {/* Cover */}
      <div className="cover-photo">
        <img src={ownerInfo.cover} alt="Cover" />
      </div>

      {/* Avatar */}
      <div className="profile-avatar" onClick={openEditPopup}>
        <img src={ownerInfo.profile} alt="Profile" />
        <FaEdit className="edit-icon" />
      </div>

      {/* Owner Info */}
      <div className="owner-info">
        <h2 onClick={openEditPopup}>{ownerInfo.name}</h2>
        <p className="club">{ownerInfo.club}</p>
        <p className="location">{ownerInfo.location}</p>
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
          <h3>{posts.length}</h3>
          <p>Posts</p>
        </div>
      </div>

      {/* Documents */}
      <div className="manage-documents">
        <button onClick={() => navigate("/dashboard/documents")}>
          Manage Documents
        </button>
      </div>

      {/* Pets */}
      <div className="pets-section">
        <h3>Pets</h3>
        <div className="pets-grid">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="pet-card"
              onClick={() => navigate(`/dashboard/pet-profile/${pet.id}`)}
            >
              <img src={pet.image} alt={pet.name} />
              <p>{pet.name}</p>
            </div>
          ))}

          <div className="pet-card add-pet" onClick={addPet}>
            <FaPlus className="plus-icon" />
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="create-post">
        <img
          src={ownerInfo.profile}
          alt="User"
          className="create-post-avatar"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="create-post-input"
          onClick={addPost}
        />
        <button className="attach-photo-btn" onClick={attachPhoto}>
          <FaCamera />
        </button>
      </div>

      {/* Post Popup */}
      {showPostPopup && (
        <div className="post-popup">
          <div className="post-content">
            <h3>Create Post</h3>

            <textarea
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

            <div className="popup-attach-photo" onClick={attachPhoto}>
              <FaCamera className="popup-camera-icon" />
              <span>Attach Photo</span>
            </div>

            {postImage && (
              <img src={postImage} alt="Preview" className="post-preview" />
            )}

            <div className="post-actions">
              <button onClick={() => setShowPostPopup(false)}>Cancel</button>
              <button onClick={submitPost}>Post</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile popup */}
      {showEditPopup && (
        <div className="edit-popup">
          <div className="edit-content">
            <h3>Edit Profile</h3>

            <div className="edit-avatar-section">
              <img src={editData.profile} alt="Profile" className="edit-avatar" />
              <button
                onClick={() => handleEditImage("profile")}
                className="edit-photo-btn"
              >
                <FaCamera /> Change Profile
              </button>
            </div>

            <div className="edit-cover-section">
              <img src={editData.cover} alt="Cover" className="edit-cover" />
              <button
                onClick={() => handleEditImage("cover")}
                className="edit-photo-btn"
              >
                <FaCamera /> Change Cover
              </button>
            </div>

            <input
              type="text"
              value={editData.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              className="edit-input"
            />

            <input
              type="text"
              value={editData.location}
              onChange={(e) => handleEditChange("location", e.target.value)}
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
