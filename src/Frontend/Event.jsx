import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundAnimation from "./BackgroundAnimation";
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
`;

// ----- Title -----
const Title = styled(motion.h1)`
  color: #321cbbff;
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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
  color: #ffeb3b;

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
  margin-bottom:80px;
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
  const [showPaper, setShowPaper] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCoding, setShowCoding] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [showInnovathon, setShowInnovathon] = useState(false);

  const events = [
    { id: 1, title: "Paper Presentation", img: presentationImg, onClick: () => setShowPaper(true) },
    { id: 2, title: "Technical Quiz", img: techicalquizimg, onClick: () => setShowQuiz(true) },
    { id: 3, title: "Coding & Debugging", img: codeanddebugimg, onClick: () => setShowCoding(true) },
    { id: 4, title: "Poster Design", img: posterdesignimg, onClick: () => setShowPoster(true) },
    { id: 5, title: "Innovathon", img: innovathonimg, onClick: () => setShowInnovathon(true) },
  ];

  // Card animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <PageWrapper>
      {/* Background Animation */}
      <BackgroundAnimation />

      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Pinnacle's Events
      </Title>

      <CardGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <Card
            key={event.id}
            onClick={event.onClick}
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

      {/* Individual Popups */}
      {showPaper && <PaperPresentation onClose={() => setShowPaper(false)} />}
      {showQuiz && <TechnicalQuiz onClose={() => setShowQuiz(false)} />}
      {showCoding && <CodingDebugging onClose={() => setShowCoding(false)} />}
      {showPoster && <PosterDesign onClose={() => setShowPoster(false)} />}
      {showInnovathon && <Innovathon onClose={() => setShowInnovathon(false)} />}

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
