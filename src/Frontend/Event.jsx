// EventsPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import PaperPresentation from "./PaperPresentation";
import TechnicalQuiz from "./TechnicalQuiz";
import CodingDebugging from "./CodingDebugging";
import PosterDesign from "./PosterDesign";
import Innovathon from "./Innovathon";

import presentationImg from "./presentation.jpg";
import techicalquizimg from "./technicalquiz.jpg";
import codeanddebugimg from "./codeanddebug.jpg";
import posterdesignimg from "./posterdesign.jpg";
import innovathonimg from "./innovathon.jpg";

// ----- Background Video -----
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
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

// ----- Page Wrapper -----
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
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
`;

// ----- Card Grid -----
const CardGrid = styled(motion.div)`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    justify-items: center;
  }
`;

// ----- Card -----
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 320px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  object-position: top;

  @media (max-width: 768px) {
    height: 130px;
  }
`;

const CardContent = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  color: #ffe600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewDetails = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:after {
    content: "→";
    font-size: 1rem;
  }

  &:hover {
    color: #ff4e50;
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

function EventsPage() {
  const navigate = useNavigate();
  const [activeEvent, setActiveEvent] = useState(null); // store event key

  const events = [
    { id: 1, title: "Paper Presentation", img: presentationImg, component: PaperPresentation },
    { id: 2, title: "Technical Quiz", img: techicalquizimg, component: TechnicalQuiz },
    { id: 3, title: "Coding & Debugging", img: codeanddebugimg, component: CodingDebugging },
    { id: 4, title: "Poster Design", img: posterdesignimg, component: PosterDesign },
    { id: 5, title: "Innovathon", img: innovathonimg, component: Innovathon },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
            <CardImage src={event.img} alt={event.title} />
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
        {activeEvent && (() => {
          const EventComponent = events.find(e => e.id === activeEvent)?.component;
          return EventComponent ? (
            <EventComponent
              isOpen={true}
              onClose={() => setActiveEvent(null)}
            />
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

export default EventsPage;
