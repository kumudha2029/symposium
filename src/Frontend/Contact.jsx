import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import styled from "styled-components";
import { motion } from "framer-motion";

// ---------- Video Background ----------
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1; /* stay behind content */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;

// Content overlay so it sits above background
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----- Title -----
const Title = styled.h2`
  color: #eaea15ff;
  font-size: 2.3rem;
  margin-top: 50px;
  padding: 0 10px;
  text-align: center;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// ----- Icon Container -----
const IconBar = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

// ----- Icon Card -----
const IconCard = styled(motion.a)`
  color: #e5f023ff;
  font-size: 2rem;
  padding: 10px;
  border: 2px solid #e5f023ff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.15);
    background-color: rgba(0, 224, 255, 0.15);
    color: #00bcd4;
    border-color: #00bcd4;
  }
`;

// ----- Address -----
const Address = styled(motion.div)`
  font-size: 1.1rem;
  color: #f0f0f0;
  line-height: 1.8;
  text-align: center;
  margin: 20px;
`;

const Section = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: #fff;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 60px 15px 100px 15px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`;

const CoordinatorCard = styled(motion.div)`
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  padding: 20px;
  border-radius: 20px;
  width: 250px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
  }

  span {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  p {
    font-size: 1rem;
    margin: 2px 0;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default function Contact() {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const coordinators = [
    { name: "coordinator 1", phone: "+91" },
    { name: "coordinator 2", phone: "+91" },
  ];

  return (
    <Section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background Video */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />

      {/* Content overlay */}
      <ContentWrapper>
        <Title>Contact Us</Title>

        <IconBar>
          <IconCard
            href="mailto:abc@gmail.com"
            title="Email"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
          >
            <FiMail />
          </IconCard>
        </IconBar>

        <Address variants={itemVariants}>
          <strong>Address:</strong>
          <br />
         vellore 
        </Address>

        {/* Coordinators */}
        <CardContainer>
          {coordinators.map((c, i) => (
            <CoordinatorCard key={i} variants={itemVariants}>
              <span>{c.name}</span>
              <p>
                <FiPhone /> {c.phone}
              </p>
            </CoordinatorCard>
          ))}
        </CardContainer>
      </ContentWrapper>
    </Section>
  );
}
