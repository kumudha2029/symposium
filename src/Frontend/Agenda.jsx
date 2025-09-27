import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// ✅ Allow dynamic height based on content
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* align content from top */
  align-items: center;
  background: url("/src/Frontend/background.jpg") no-repeat center center fixed;
  background-size: cover;
  scroll-snap-align: start;
  color: #fff;
  padding: 60px 20px; /* increased padding for breathing space */
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 50px;
  font-family: "Snap ITC", cursive, sans-serif;
  color: #2316b6ff;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  width: 100%;
`;

const EventCard = styled(motion.div)`
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  padding: 20px;
  border-radius: 20px;
  width: 250px;
  min-height: 120px;
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
  }

  p {
    margin-top: 5px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default function Agenda() {
  const schedule = [
    { time: "9:00 AM", event: "Registration & Welcome" },
    { time: "10:00 AM", event: "Opening Ceremony" },
    { time: "11:00 AM", event: "Technical Workshops" },
    { time: "1:00 PM", event: "Lunch Break" },
    { time: "2:00 PM", event: "Paper Presentations" },
    { time: "4:00 PM", event: "Competitions & Activities" },
    { time: "5:00 PM", event: "Closing Ceremony" },
  ];

  return (
    <Section>
      <Title>Agenda</Title>
      <CardContainer>
        {schedule.map((item, index) => (
          <EventCard
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <span>{item.time}</span>
            <p>{item.event}</p>
          </EventCard>
        ))}
      </CardContainer>
    </Section>
  );
}
