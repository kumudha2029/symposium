import React, { useState } from "react";
import styled from "styled-components";
import { FaRobot } from "react-icons/fa";

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #394ca2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

const ChatWindow = styled.div`
  width: 320px;
  height: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: #394ca2ff;
  color: white;
  padding: 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Messages = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  font-size: 14px;
`;

const InputBox = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  border-top: 1px solid #ddd;
  outline: none;
  font-size: 14px;
`;

const OptionButton = styled.button`
  margin: 6px 6px 0 0;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #394ca2ff;
  color: white;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #2d3888;
  }
`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 Please type 'hi' to start the chat." },
  ]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSend = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const userText = input.trim().toLowerCase();
      let newMessages = [...messages, { from: "user", text: input }];

      if (userText === "hi") {
        newMessages.push({
          from: "bot",
          text: "Welcome to the Symposium 🎉 What do you want to do?",
        });
        setShowOptions(true);
      } else {
        newMessages.push({
          from: "bot",
          text: "Please type 'hi' to start.",
        });
        setShowOptions(false);
      }

      setMessages(newMessages);
      setInput("");
    }
  };

  const handleOption = (option) => {
    let newMessages = [...messages, { from: "user", text: option }];
    if (option === "Explore Events") {
      newMessages.push({
        from: "bot",
        text:
          "🎭 You can explore all events on our website. (Here you can add your events link)\n\n👉 Explore Events\n👉 Register",
      });
    } else if (option === "Register") {
      newMessages.push({
        from: "bot",
        text: `📝 To register, please provide the following in one message:\n
1️⃣ FULL NAME (CAPS) followed by initial  
2️⃣ Team Members (if any)  
3️⃣ One Working Email 📧  
4️⃣ One Working Phone Number 📱  
5️⃣ Full College Name 🏫  
6️⃣ Your Feedback 💬\n\n👉 Explore Events\n👉 Register`,
      });
    }
    setMessages(newMessages);
    setShowOptions(true);
  };

  return (
    <ChatbotWrapper>
      {!open && (
        <ChatIcon onClick={() => setOpen(true)}>
          <FaRobot />
        </ChatIcon>
      )}
      {open && (
        <ChatWindow>
          <Header>
            Symposium Chatbot
            <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
              ✖
            </span>
          </Header>
          <Messages>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === "bot" ? "left" : "right",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    background: msg.from === "bot" ? "#f1f1f1" : "#394ca2ff",
                    color: msg.from === "bot" ? "#000" : "#fff",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    display: "inline-block",
                    maxWidth: "80%",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {showOptions && (
              <div style={{ marginTop: "8px" }}>
                <OptionButton onClick={() => handleOption("Explore Events")}>
                  👉 Explore Events
                </OptionButton>
                <OptionButton onClick={() => handleOption("Register")}>
                  👉 Register
                </OptionButton>
              </div>
            )}
          </Messages>
          <InputBox
            placeholder="Type 'hi' to start..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSend}
          />
        </ChatWindow>
      )}
    </ChatbotWrapper>
  );
}
