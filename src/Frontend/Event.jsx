// EventsPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import PaperPresentation from "./PaperPresentation";
import TechnicalQuiz from "./TechnicalQuiz";
import CodingDebugging from "./CodingDebugging";
import PosterDesign from "./TechTalks";
import Innovathon from "./CodeCraze";

import presentationImg from "./presentation.jpg";
import technicalquizimg from "./technicalquiz.jpg";
import codeanddebugimg from "./codeanddebug.jpg";
import posterdesignimg from "./posterdesign.jpg";
import innovathonimg from "./innovathon.jpg";

// ----- Background -----
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

// ----- Wrapper -----
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-top: 60px;
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
  position: relative;
  color: #ffffff;
`;

// ----- Title -----
const Title = styled(motion.h1)`
  color: #ffeb3b;
  font-size: 2.3rem;
  margin: 0 auto 40px auto;
  padding: 0 10px;
  text-align: center;
  font-family: "Times New Roman", Times, serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 25px;
    margin-top: 20px;
  }
`;

// ----- Card Grid -----
const CardGrid = styled(motion.div)`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

// ----- Card -----
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 280px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CardImage = styled(motion.div)`
  flex: 1;
  width: 100%;
  height: 150px;
  background: url(${(props) => props.src}) center/cover no-repeat;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 10px 15px;
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #ffe600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewDetails = styled(motion.span)`
  color: #fff;
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:after {
    content: "→";
    font-size: 1rem;
    display: inline-block;
    transition: transform 0.3s;
  }

  &:hover {
    color: #ff4e50;

    &:after {
      transform: translateX(5px);
    }
  }
`;

const Button = styled(motion.button)`
  padding: 12px 25px;
  margin-top: 50px;
  margin-bottom: 80px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
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

// ----- Animations -----
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 6, ease: "easeOut" } },
};

export default function EventsPage() {
  const navigate = useNavigate();
  const [activeEvent, setActiveEvent] = useState(null);

  const events = [
    { id: 1, title: "Paper Presentation", img: presentationImg, component: PaperPresentation },
    { id: 2, title: "Technical Quiz", img: technicalquizimg, component: TechnicalQuiz },
    { id: 3, title: "Coding & Debugging", img: codeanddebugimg, component: CodingDebugging },
    { id: 4, title: "Tech Talks", img: posterdesignimg, component: PosterDesign },
    { id: 5, title: "Crypto Crack", img: innovathonimg, component: Innovathon },
  ];

  return (
    <PageWrapper>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <OverlayBackground />

      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Pinnacle's Events
      </Title>

      <CardGrid variants={containerVariants} initial="hidden" animate="visible">
        {events.map((event) => (
          <Card
            key={event.id}
            onClick={() => setActiveEvent(event.id)}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <CardImage src={event.img} />
            <CardContent>
              <CardTitle>{event.title}</CardTitle>
              <CardFooter>
                <ViewDetails>View Details</ViewDetails>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </CardGrid>

      {/* Animated Popups */}
      <AnimatePresence>
        {activeEvent &&
          (() => {
            const EventComponent = events.find((e) => e.id === activeEvent)?.component;
            return EventComponent ? (
              <EventComponent isOpen={true} onClose={() => setActiveEvent(null)} />
            ) : null;
          })()}
      </AnimatePresence>

      <Button
        onClick={() => navigate("/Register")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      >
        Register
      </Button>
    </PageWrapper>
  );
}
