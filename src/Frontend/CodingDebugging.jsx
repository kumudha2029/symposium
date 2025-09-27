import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  text-align: left;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #321cbbff;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;
`;

const Section = styled.div`
  margin-bottom: 15px;
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

function PaperPresentation({ onClose }) {
  return (
    <Overlay>
      <PopupBox>
        <Title>Coding & Debugging</Title>

        <Section>
          <h3>Rules:</h3>
          <ul>
            <li>Max 2 participants per team</li>
            <li>Paper must be original</li>
            <li>Presentation time: 7 min + 3 min Q&amp;A</li>
          </ul>
        </Section>

        <Section>
          <h3>Topics:</h3>
          <ul>
            <li>Artificial Intelligence</li>
            <li>Blockchain</li>
            <li>Cybersecurity</li>
            <li>IoT</li>
          </ul>
        </Section>

        <Section>
          <h3>Scoring Panel:</h3>
          <ul>
            <li>Content – 40%</li>
            <li>Presentation – 30%</li>
            <li>Q&amp;A – 30%</li>
          </ul>
        </Section>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupBox>
    </Overlay>
  );
}

export default PaperPresentation;
