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
  justify-content: left;
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
  margin-bottom: 35px;
  font-family: "Snap ITC", cursive, sans-serif;
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
          <Title>Code Craze</Title>

          {/* Rules Section */}
          <Section>
            <h3>Rules:</h3>
            <ul>
              <li>Each Team Must Consist of Two Members.</li>
              <li>
                The Team Should Complete The First Stage To Move Further
              </li>

              <li>
                The Game Consist Of Four Stages.
              </li>
              <li>
                Hints Will be Provided.
              </li>
            </ul>
          </Section>
          <AmountBox>💰 Registration Fee: ₹100 per Head</AmountBox>

          <CloseButton onClick={onClose}>Close</CloseButton>
        </PopupBox>
      </Overlay>
    )}
  </AnimatePresence>
);

export default PaperPresentation;
