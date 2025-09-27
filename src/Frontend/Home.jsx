import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Event from "./Event";
import Contact from "./Contact";
import Agenda from "./Agenda";
import CountdownTimer from "./CountdownTimer";

// ----- Page Wrapper -----
const PageWrapper = styled.div`
  height: 100dvh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;

  @media (max-width: 768px) {
    scroll-snap-type: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

// ----- Section Wrapper -----
const Section = styled(motion.section)`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100dvh;
    scroll-snap-align: none;
  }
`;

// ----- Hero Section -----
const Hero = styled(Section)`
  text-align: center;
  background: url("/src/Frontend/background.jpg") no-repeat center center;
  background-size: cover;
  position: relative;
  padding-top: 80px;
`;

const HeroTitle = styled(motion.h2)`
  font-size: 2rem;
  color: #2316b6ff;
  font-family: "Snap ITC", cursive, sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-family: "Snap ITC", cursive, sans-serif;
  color: #2316b6ff;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 90%;
  line-height: 1.5;
  opacity: 0.9;
  margin: 5px 0 20px 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoBox = styled(motion.div)`
  margin: 15px 0;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  p {
    margin: 4px 0;
    font-size: 0.95rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }

  a {
    color: #1b1a19ff;
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      color: #ff4e50;
    }
  }
`;

const Button = styled(motion.button)`
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.4s;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #7923f9ff, #ff4e50);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 25px;
  }
`;

// ----- Sidebar -----
const Hamburger = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: #2316b6ff;
  cursor: pointer;
  z-index: 300;
`;

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100dvh;
  background: #394ca2ff;
  color: #fff;
  z-index: 500;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  align-self: flex-end;
`;

const NavItem = styled.div`
  color: #fff;
  font-size: 1.2rem;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    color: #ff4e50;
  }
`;

function Sidebar({ isOpen, toggleSidebar, sectionRefs }) {
  const labels = ["Home", "Events", "Agenda", "Contact"];

  const handleScroll = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
    toggleSidebar(false);
  };

  return (
    <SidebarWrapper
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <CloseButton onClick={() => toggleSidebar(false)}>×</CloseButton>
      {sectionRefs.map((_, i) => (
        <NavItem key={i} onClick={() => handleScroll(i)}>
          {labels[i]}
        </NavItem>
      ))}
    </SidebarWrapper>
  );
}

// ----- Main Home Component -----
export default function Home() {
  const heroRef = useRef();
  const eventRef = useRef();
  const agendaRef = useRef();
  const contactRef = useRef();

  const sectionRefs = [heroRef, eventRef, agendaRef, contactRef];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToNext = () => {
    const wrapper = document.documentElement;
    const viewportHeight = window.innerHeight;
    const currentSection = Math.floor(wrapper.scrollTop / viewportHeight);
    const nextSection = Math.min(currentSection + 1, sectionRefs.length - 1);
    sectionRefs[nextSection].current.scrollIntoView({ behavior: "smooth" });
  };

  // animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Hamburger onClick={() => setSidebarOpen(true)}>
        <FiMenu />
      </Hamburger>

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={setSidebarOpen}
        sectionRefs={sectionRefs}
      />

      <PageWrapper>
        {/* Hero Section */}
        <Hero
          ref={heroRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <HeroTitle
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, type: "spring", stiffness: 200 }}
          >
            Ganadipathy Tulsi's Jain Engineering College
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Pinnacle's 25
          </HeroSubtitle>

          <HeroText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          >
            Empowering innovation, knowledge, and creativity for a brighter
            tomorrow.
          </HeroText>

          <InfoBox
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            <p>📅 Date: 16th October 2025</p>
            <p>⏰ Time: 9:00 AM – 5:00 PM</p>
            <p>
              📍 Location:{" "}
              <a
                href="https://www.google.com/maps?q=Ganadipathy+Tulsi's+Jain+Engineering+College"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          </InfoBox>

          <CountdownTimer />

          <Button
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.2,
              delay: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #151514ff" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToNext}
          >
            Explore Events →
          </Button>
        </Hero>

        {/* Events Section */}
        <Section
          ref={eventRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Event />
        </Section>

        {/* Agenda Section */}
        <Section
          ref={agendaRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Agenda />
        </Section>

        {/* Contact Section */}
        <Section
          ref={contactRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <Contact />
        </Section>
      </PageWrapper>
    </>
  );
}
