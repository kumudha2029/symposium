// PaperPresentation.jsx
import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url("/popback.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled(motion.div)`
  color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  text-align: left;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: 15px;
    font-size: 0.9rem;
  }

  h3 {
    color: yellow;
    margin-bottom: 8px;
  }

  ul {
    margin-left: 20px;
    list-style: disc;
  }

  li {
    margin-bottom: 5px;
    word-break: break-word;
  }

  a {
    color: #ffd700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.7rem;
  color: yellow;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 15px;
`;

const AmountBox = styled.div`
  background: linear-gradient(90deg, #ff9800, #ff5722);
  color: #fff;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;


const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: #321cbbff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #241388;
  }
`;

const PaperPresentation = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <PopupBox
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title>Papernza</Title>

          {/* Rules Section */}
          <Section>
            <h3>Rules:</h3>
            <ul>
              <li>Individual / Team (Max Two Students).</li>
              <li>
                Paper Selection Will be Intimated <br /> Through Email Only
              </li>
              <li>
                Send your paper to the following <br /> mail id:{" "}
                <a href="mailto:pinnacle@gtec.ac.in">
                  <strong>pinnacle@gtec.ac.in</strong>
                </a>
              </li>
              <li>
                Last date for submission of paper <br /> through mail - OCT 13,
                2025
              </li>
              <li>
                Presentation time: 5 min + <br /> 2 min Q&amp;A
              </li>
            </ul>
          </Section>

          {/* Topics Section */}
          <Section>
            <h3>Topics:</h3>
            <ul>
              <li>AI/ML</li>
              <li>Cloud and Edge Computing</li>
              <li>Quantum Computing</li>
              <li>Internet of Things(IOT)</li>
              <li>Bussiness Intelligence and Analytics</li>
              <li>Augmented Reality / Virtual Reality</li>
              <li>Cyber Security</li>
              <li>Digital Transformaaation</li>
              <li>Future trends in IT,AI & Business System</li>
               <li>Digital Sustainability & Ethics</li>
            </ul>
          </Section>

          {/* Paper Format Section */}
          <Section>
            <h3>Paper Format:</h3>
            <ul>
              <li>Paper : A4</li>
              <li>Format : IEEE</li>
              <li>Max No of Pages : 10</li>
              <li>Line Spacing : 1.5</li>
              <li>Font type : Times New Roman</li>
              <li>Size : 12</li>
            </ul>
          </Section>

          {/* Highlighted Amount */}
          <AmountBox>💰 Registration Fee: ₹200 per Head</AmountBox>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </PopupBox>
      </Overlay>
    )}
  </AnimatePresence>
);

export default PaperPresentation;
