// Home.jsx
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Event from "./Event";
import Agenda from "./Agenda";
import Contact from "./Contact";
import CountdownTimer from "./CountdownTimer";
import Rules from "./Rules";
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  background: url("/Poster.png") center center / cover no-repeat; /* 👈 poster as background */
`;


const PageWrapper = styled.div`
  position: relative;
  z-index: 1;   /* ✅ content sits above video */
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
`;

const Section = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  padding: 0 20px;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  color: white;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-family: "Cinzel Decorative", serif;
  color: #2cc0d6ff;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const InfoBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.55);
  padding: 12px 25px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  margin-bottom: 15px;
  text-align: center;
  max-width: 280px;
  color: #ffffff;

  p {
    margin: 5px 0;
    font-size: 1rem;
  }

  a {
    color: #ffe600;
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      color: #ff4e50;
    }
  }
`;

const HeroButton = styled(motion.button)`
  padding: 12px 25px;
  margin-top: 5px;
  margin-bottom: 60px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const GtecLogo = styled(motion.img)`
  width: 105px;
  height: auto;

  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 480px) {
    width: 65px;
  }
`;

const AnniversaryLogo = styled(motion.img)`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 65px;
  }
  @media (max-width: 480px) {
    width: 55px;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef();
  const eventRef = useRef();
  const agendaRef = useRef();
  const contactRef = useRef();
  const rulesRef = useRef();
  const galleryRef = useRef();
  const sectionRefs = [heroRef, eventRef, agendaRef, contactRef, rulesRef, galleryRef];
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
      {/* Sidebar Menu Button */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          fontSize: "2rem",
          color: "#ffffff",
          zIndex: 300,
          cursor: "pointer",
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu />
      </div>
<VideoBackground
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  poster="/Poster.png"   // ✅ correct path
>
  <source src="/BackgroundVideo.mp4" type="video/mp4" />
</VideoBackground>


      {/* Page Content */}
      <PageWrapper>
        <Sidebar sectionRefs={sectionRefs} isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

        {/* Hero Section */}
        <Section
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              marginTop: "40px",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GtecLogo src="/gtec.jpeg" alt="GTEC Logo" whileHover={{ scale: 1.05 }} />
              <HeroTitle>Ganadipathy Tulsi's Jain Engineering College</HeroTitle>
            </div>
            <h6
              style={{
                color: "#ffffff",
                fontSize: "0.75rem",
                margin: "0px",
                marginLeft: "70px",
                marginTop: "5px",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              Chittoor Cuddalore Road, Kaniyambadi Vellore - 632102
            </h6>
            <h6
              style={{
                fontSize: "1rem",
                lineHeight: 1,
                margin: "15px 0",
                fontFamily: "Times New Roman, Times, serif",
                textAlign: "center",
                color: "#ffe600",
              }}
            >
              The Department of IT, AI&DS and CSBS <br />
              proudly presents
            </h6>
          </motion.div>

          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              flexWrap: "wrap",
              margin: "0px auto",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <HeroSubtitle style={{ fontSize: "1.5rem", margin: "0px" }}>
              National Level <br /> Technical Symposium
            </HeroSubtitle>
            <AnniversaryLogo src="/25year.png" alt="25 Years Celebration" whileHover={{ scale: 1.05 }} />
          </motion.div>

          <HeroSubtitle
            style={{
              fontSize: "3rem",
              background: "linear-gradient(45deg, #f9d423, #ff4e50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0px auto 2px auto",
              lineHeight: 1,
            }}
          >
            Pinnacle 25
          </HeroSubtitle>

          <h6
            style={{
              color: "white",
              fontSize: "0.9rem",
              lineHeight: 1.1,
              margin: "0px 0 10px 0",
              fontFamily: "Times New Roman, Times, serif",
              textAlign: "center",
            }}
          >
            A Summit of IT, AI & Business System
          </h6>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 3 }}>
            <CountdownTimer />
          </motion.div>

          <InfoBox>
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

          <motion.div style={{ display: "flex", gap: "15px", marginTop: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            <HeroButton onClick={scrollToNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Explore Events →
            </HeroButton>
            <HeroButton onClick={() => navigate("/Register")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Register
            </HeroButton>
          </motion.div>
        </Section>

        {/* Event Section */}
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

        {/* Rules Section */}
        <Section ref={rulesRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <Rules />
        </Section>

        {/* Gallery Section */}
        <Section ref={galleryRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
          <Gallery isSection={true} />
        </Section>
      </PageWrapper>
    </>
  );
}
