import React from "react";
import { FiMail } from "react-icons/fi";
import styled from "styled-components";

const ContactContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url("/src/Frontend/background.jpg") no-repeat center center fixed;
  background-size: cover;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: #f0f0f0; /* Light text for dark background */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
`;

const IconBar = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
`;

const IconLink = styled.a`
  color: #2b12cdff; /* Bright cyan icon */
  font-size: 2rem;
  padding: 14px;
  border: 2px solid #1912d4ff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.15);
    background-color: rgba(0, 224, 255, 0.15); /* subtle glow */
    color: #00bcd4;
    border-color: #00bcd4;
  }
`;

const Address = styled.div`
  font-size: 1.1rem;
  color: #171717ff; /* slightly brighter for readability */
  line-height: 1.8;
  text-align: center;
`;

const ContactInfo = () => {
  return (
    <ContactContainer>
      <IconBar>
        <IconLink
          href="mailto:kumudha2920@gmail.com"
          title="Email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiMail />
        </IconLink>
      </IconBar>

      <Address>
        <strong>Address:</strong>
        <br />
      </Address>
    </ContactContainer>
  );
};

export default ContactInfo;
