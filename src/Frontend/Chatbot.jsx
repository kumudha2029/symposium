import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { TbRobot } from "react-icons/tb"; // Sleek robot icon

// Pulse animation for floating button
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Floating chat button
const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  border: none;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${pulse} 2s infinite ease-in-out;
`;

// Slide-in animation for chat window
const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.4s ease-out;
  z-index: 999;
`;

// Chat header
const ChatHeader = styled.div`
  background: #4a90e2;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

// Chat body
const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;

// Chat input
const ChatInput = styled.input`
  border: none;
  border-top: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  outline: none;
`;

// Message bubble
const Message = styled.div`
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 80%;
  background: ${(props) => (props.user ? "#4a90e2" : "#eee")};
  color: ${(props) => (props.user ? "white" : "black")};
  align-self: ${(props) => (props.user ? "flex-end" : "flex-start")};
`;

// Option buttons
const OptionButton = styled.button`
  margin: 5px 5px 0 0;
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  background: #4a90e2;
  color: white;
  cursor: pointer;
  font-size: 13px;
`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSend = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);

      if (input.toLowerCase() === "hi") {
        setMessages([
          ...newMessages,
          { text: "Welcome! What do you want to know about?", user: false },
        ]);
        setShowOptions(true);
      }
      setInput("");
    }
  };

  const handleOption = (option) => {
    let response = "";
    if (option === "Registration Form") {
      response =
        "To fill the registration form, go to the Register section and enter your details carefully.";
    } else if (option === "Event") {
      response =
        "The event will be held on campus. Check the schedule for timing and venue.";
    } else if (option === "Other") {
      response =
        "Sorry, please mail your question to support@college.com — our team will clarify it for you.";
    } else {
      response = "More details coming soon!";
    }

    setMessages([
      ...messages,
      { text: option, user: true },
      { text: response, user: false },
    ]);
    setShowOptions(false);
  };

  return (
    <>
      {!open && (
        <ChatButton onClick={() => setOpen(true)}>
          <span><TbRobot size={28} color="white" /></span>
        </ChatButton>
      )}

      {open && (
        <ChatWindow>
          <ChatHeader>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TbRobot size={20} /> Chatbot
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </ChatHeader>

          {/* Hint line */}
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              padding: "6px 10px",
              borderBottom: "1px solid #eee",
            }}
          >
            Enter 'hi' to start the chat
          </div>

          <ChatBody>
            {messages.map((msg, index) => (
              <Message key={index} user={msg.user}>
                {msg.text}
              </Message>
            ))}

            {showOptions && (
              <div>
                <OptionButton onClick={() => handleOption("Registration Form")}>
                  Registration Form
                </OptionButton>
                <OptionButton onClick={() => handleOption("Event")}>
                  Event
                </OptionButton>
                <OptionButton onClick={() => handleOption("Other")}>
                  Other
                </OptionButton>
              </div>
            )}
          </ChatBody>

          <ChatInput
            type="text"
            placeholder="Type 'hi' to start..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSend}
          />
        </ChatWindow>
      )}
    </>
  );
};

export default Chatbot;
