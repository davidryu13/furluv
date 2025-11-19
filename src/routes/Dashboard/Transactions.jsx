// src/routes/Dashboard/Transactions.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/transactions.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function Transactions() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pet = state?.pet;

  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [amount, setAmount] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const confirmBooking = () => {
    if (!date || !amount) {
      alert("Please select a date and enter an amount!");
      return;
    }
    setBookingConfirmed(true);
    setTimeout(() => {
      alert(`Booking confirmed for ${pet.name} on ${date} for ₱${amount}`);
      setBookingConfirmed(false);
      setDate("");
      setAmount("");
    }, 200);
  };

  if (!pet) return <p className="center-text">No pet selected.</p>;

  return (
    <div className="transactions-fullscreen">
      {/* Content only, NavBar is global now */}
      <div className="transaction-content">
        <h2>Breeding Transaction 🐾</h2>

        <img src={pet.image} alt={pet.name} className="transaction-pet-image" />

        <p><strong>Pet:</strong> {pet.name}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>

        <div className="transaction-field">
          <label><strong>Date of Breeding:</strong></label>
          <div className="date-picker">
            <input
              type="text"
              placeholder="Select date"
              value={date}
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <FaCalendarAlt
              className="calendar-icon"
              onClick={() => setShowCalendar(!showCalendar)}
            />
          </div>
          {showCalendar && (
            <input
              type="date"
              className="calendar-popup"
              onChange={(e) => {
                setDate(e.target.value);
                setShowCalendar(false);
              }}
            />
          )}
        </div>

        <div className="transaction-field">
          <label><strong>Transaction Amount:</strong></label>
          <input
            type="number"
            className="amount-input"
            placeholder="Enter amount (₱)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <p className="status-text">
          <strong>Status:</strong>
          <span className={`status ${pet.status === "Available" ? "available" : "not-available"}`}>
            {pet.status}
          </span>
        </p>

        <div className="transaction-buttons">
          <button className="book-btn" onClick={confirmBooking}>
            Book
          </button>

          <button
            className="message-btn"
            onClick={() => navigate("/dashboard/messages", { state: { pet } })}
          >
            Message Owner
          </button>
        </div>

        {bookingConfirmed && <p className="booking-success">✅ Booking Confirmed!</p>}
      </div>
    </div>
  );
}
