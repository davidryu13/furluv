import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import "../../styles/messages.css";

export default function Messages() {
  const location = useLocation();
  const incomingUser = location.state?.user;

  // Chats state: each chat has id, name, lastMessage, status
  const [chats, setChats] = useState([]);

  // Selected chat id
  const [selectedChatId, setSelectedChatId] = useState(null);

  // Messages mapped by chat id
  const [messagesMap, setMessagesMap] = useState({});

  // Add incoming user if not exists
  useEffect(() => {
    if (incomingUser) {
      setChats((prev) => {
        const exists = prev.find((chat) => chat.name === incomingUser.name);
        if (!exists) {
          const newChat = {
            id: Date.now(),
            name: incomingUser.name,
            lastMessage: "",
            status: "offline",
          };
          return [...prev, newChat];
        }
        return prev;
      });
    }
  }, [incomingUser]);

  // Set selected chat to incoming user or first chat if none selected
  useEffect(() => {
    if (incomingUser) {
      const chat = chats.find((chat) => chat.name === incomingUser.name);
      if (chat) {
        setSelectedChatId(chat.id);
      }
    } else if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }
  }, [incomingUser, chats, selectedChatId]);

  // Initialize messages for new chats if missing
  useEffect(() => {
    if (selectedChatId && !messagesMap[selectedChatId]) {
      const chat = chats.find((c) => c.id === selectedChatId);
      setMessagesMap((prev) => ({
        ...prev,
        [selectedChatId]: [
          {
            sender: "owner",
            text: `Hi this is ${chat?.name || "user"}! Your pet is so adorable, is your pet available for breeding?`,
          },
        ],
      }));
    }
  }, [selectedChatId, messagesMap, chats]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChatId) return;

    const userMessage = newMessage.trim();

    // Add your message
    setMessagesMap((prev) => {
      const prevMessages = prev[selectedChatId] || [];
      return {
        ...prev,
        [selectedChatId]: [...prevMessages, { sender: "user", text: userMessage }],
      };
    });

    // Clear input
    setNewMessage("");

    // Update last message preview in chats list
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, lastMessage: userMessage }
          : chat
      )
    );

    // Contextual auto-reply after 1.5 seconds
    setTimeout(() => {
      let replyText = "Thanks for your message!";

      const lowerMsg = userMessage.toLowerCase();

      if (lowerMsg.includes("yes") || lowerMsg.includes("available")) {
        replyText = "Oh that's terrific! So when can we start?";
      } else if (lowerMsg.includes("no")) {
        replyText = "Oh, I see. Let me know if anything changes!";
      } else if (lowerMsg.includes("breeding")) {
        replyText = "Can you tell me more about your pet's breeding availability?";
      } else if (
        lowerMsg.includes("compliment") ||
        lowerMsg.includes("cute") ||
        lowerMsg.includes("love")
      ) {
        replyText = "Thank you! Your pet looks wonderful too!";
      } else if (
        lowerMsg.includes("add my pet on the pet listing") ||
        lowerMsg.includes("add my pet to the pet listing") ||
        lowerMsg.includes("add my pet listing")
      ) {
        replyText = "Okay noted, thank you!";
      } else if (
        lowerMsg.includes("thank you") ||
        lowerMsg.includes("thanks")
      ) {
        replyText = "You're very kind! Your pet must be amazing!";
      }

      setMessagesMap((prev) => {
        const prevMessages = prev[selectedChatId] || [];
        return {
          ...prev,
          [selectedChatId]: [...prevMessages, { sender: "owner", text: replyText }],
        };
      });
    }, 1500);
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="messages-fullscreen">
      <div className="messages-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h3>Chats</h3>
          {chats.length === 0 && <p>No chats yet.</p>}
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-contact ${
                selectedChatId === chat.id ? "active" : ""
              }`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <Avatar
                name={chat.name}
                round={true}
                size="40"
                className="contact-profile"
              />
              <div className="contact-info">
                <p className="contact-name">{chat.name}</p>
                <p className="contact-last">{chat.lastMessage || "No messages yet"}</p>
              </div>
              <span className={`status-dot ${chat.status}`}></span>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <h3>
            {selectedChat ? (
              <>
                <Avatar
                  name={selectedChat.name}
                  round={true}
                  size="50"
                  className="contact-profile"
                  style={{ marginRight: 10, verticalAlign: "middle" }}
                />
                {selectedChat.name}
              </>
            ) : (
              "Select a chat"
            )}
          </h3>
          <div className="messages-area">
            {(messagesMap[selectedChatId] || []).map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.sender === "user" ? "user-msg" : "owner-msg"
                }`}
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
              disabled={!selectedChat}
            />
            <button onClick={sendMessage} disabled={!selectedChat}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
