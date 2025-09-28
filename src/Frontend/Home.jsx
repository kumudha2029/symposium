import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Event from "./Event";
import Agenda from "./Agenda";
import Contact from "./Contact";
import CountdownTimer from "./CountdownTimer";
import BackgroundAnimation from "./BackgroundAnimation";

// ----- Page Wrapper -----
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  html, body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
`;

// ----- Section -----
const Section = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

// ----- Hero Section -----
const HeroTitle = styled(motion.h1)`
  font-family: "Snap ITC", cursive, sans-serif;
  font-size: 2.5rem;
  color: #2316b6ff;
  text-align: center;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-family: "Snap ITC", cursive, sans-serif;
  font-size: 2rem;
  color: #2316b6ff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  padding: 15px 25px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  margin-bottom: 25px;
  text-align: center;
  max-width: 350px;

  p {
    margin: 5px 0;
    font-size: 1rem;
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

const HeroButton = styled(motion.button)`
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
  margin-top: 20px;

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
  height: 100vh;
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <Hamburger onClick={() => setSidebarOpen(true)}>
        <FiMenu />
      </Hamburger>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} sectionRefs={sectionRefs} />

      <PageWrapper>
        {/* Background Animation */}
        <BackgroundAnimation />

        {/* Hero Section */}
        <Section ref={heroRef} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 }}}}>
          <HeroTitle
            variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, duration: 1.5 }}}}
          >
            Ganadipathy Tulsi's Jain Engineering College
          </HeroTitle>

          <HeroSubtitle
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2 }}}}
          >
            Pinnacle's 25
          </HeroSubtitle>

          <HeroText
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2 }}}}
          >
            Empowering innovation, knowledge, and <br />creativity for a brighter tomorrow.
          </HeroText>

          <InfoBox
            variants={{ hidden: { opacity: 0, rotateY: 90 }, visible: { opacity: 1, rotateY: 0, transition: { duration: 1.2 }}}}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <CountdownTimer />
          </motion.div>

          <HeroButton
            onClick={scrollToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.5, delay: 0.2 } }}
          >
            Explore Events →
          </HeroButton>
        </Section>
<br/>
<br/>
<br/>
        {/* Events Section */}
        <Section ref={eventRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <Event />
        </Section>

        {/* Agenda Section */}
        <Section ref={agendaRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <Agenda />
        </Section>
        {/* Contact Section */}
        <Section ref={contactRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <Contact />
        </Section>
      </PageWrapper>
    </>
  );
}
