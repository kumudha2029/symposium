import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #ffeb3b;
  font-size: 2.5rem;
  margin: 0 auto 40px auto;
  text-align: center;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  gap: 40px;
  width: 100%;
  max-width: 500px;
  grid-template-columns: 1fr;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

const CardContainer = styled.div`
  perspective: 1000px;
  display: flex;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 100%;
  min-height: 50px;
  cursor: pointer;
  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.8s cubic-bezier(0.27, 1.55);
`;

const CardFace = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
  transform-origin: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  padding: 15px;
`;

const FrontCard = styled(CardFace)`
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  color: #fff;
  font-size: 1rem;
`;

const BackCard = styled(CardFace)`
  background: transparent; // overlay removed
  color: #fff;
  transform: rotateY(180deg);
  font-size: 0.9rem;
`;

const TimeCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 0.9rem;
`;

export default function Agenda() {
  const schedule = [
    { time: "9:30 AM", event: "Prayer Song & Tamil Thaaivazhthu" },
    { time: "9:35 AM", event: "Lighting the Kuthuvilakku"},
    { time: "9:40 AM", event: "Welcome Address by Converner"},
    { time: "9:45 AM", event: "Presidential Address by Prinicpal"},
    { time: "9:55 AM", event: "Introduction of Chief Guest" },
    { time: "10:00 AM", event: "Honouring the Chief guest" },
    { time: "10:05 AM", event: "Release of Souvenir" },
    { time: "10:10 AM", event: "Keynote Address by Chief Guest" },
    { time: "10:30 AM", event: "Vote of Thanks" },
    { time: "10:45 AM", event: "Technical Events"},
    { time: "4:00 PM", event: "Valedictory Function"},
    { time: "4:40 PM", event: "National Anthem"},
  ];

  const [flipped, setFlipped] = useState({});

  const handleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Section>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>

      <ContentWrapper>
        <Title>Agenda</Title>
        <CardGrid>
          {schedule.map((item, index) => {
            const [time, meridiem] = item.time.split(" ");
            return (
              <CardContainer key={index} onClick={() => handleFlip(index)}>
                <Card animate={{ rotateY: flipped[index] ? 180 : 0 }}>
                  <FrontCard>
                    <TimeCircle>
                      <div>{time}</div>
                      <div style={{ fontSize: "0.7rem" }}>{meridiem}</div>
                    </TimeCircle>
                    <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>Click for event</div>
                  </FrontCard>
                  <BackCard>
                    <div>{item.event}</div>
                    <div style={{ fontSize: "0.85rem", marginTop: "8px" }}>{item.details}</div>
                  </BackCard>
                </Card>
              </CardContainer>
            );
          })}
        </CardGrid>
      </ContentWrapper>
    </Section>
  );
}
