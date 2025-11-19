// src/routes/Dashboard/Messages.jsx
import React, { useState } from "react";
import "../../styles/messages.css";

const mockChats = [
  { id: 1, name: "Kurt", lastMessage: "Looking forward to the breeding session!", status: "online" },
  { id: 2, name: "John Arfbanal", lastMessage: "Thanks for your message!", status: "offline" },
  { id: 3, name: "Keith", lastMessage: "Can we schedule a visit?", status: "online" },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState([
    { sender: "owner", text: "Hi! Are you available for the breeding session?" },
    { sender: "user", text: "Yes! I am available tomorrow." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="messages-fullscreen">
      <div className="messages-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h3>Chats</h3>
          {mockChats.map(chat => (
            <div
              key={chat.id}
              className={`chat-contact ${selectedChat.id === chat.id ? "active" : ""}`}
              onClick={() => {
                setSelectedChat(chat);
                setMessages([
                  { sender: "owner", text: "Hi! Are you available for the breeding session?" },
                  { sender: "user", text: "Yes! I am available tomorrow." },
                ]);
              }}
            >
              <span className={`status-dot ${chat.status}`}></span>
              <div className="contact-info">
                <p className="contact-name">{chat.name}</p>
                <p className="contact-last">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <h3>{selectedChat.name}</h3>
          <div className="messages-area">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender === "user" ? "user-msg" : "owner-msg"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
