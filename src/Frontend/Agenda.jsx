import React from "react";
import styled from "styled-components";
import BackgroundAnimation from "./BackgroundAnimation";

// ----- Section Wrapper -----
const Section = styled.section`
  width: 100%;
  height: 100vh; 
  position: relative;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

// Content overlay
const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Title
const Title = styled.h2`
  color: #321cbbff;
  font-size: 2.3rem;
  margin: 0 auto 40px auto;
  padding: 0 10px;
  text-align: center;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

// Scrollable timeline container
const TimelineWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 65vh; // scrollable container height
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
  }
`;

// Single timeline item
const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Circle for time
const TimeCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  color: #fff;
  display: flex;
  flex-direction: column; /* stack time + am/pm */
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  flex-shrink: 0;
  text-align: center;
`;

// Rectangular box for event
const EventBox = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 0.95rem;
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
      <BackgroundAnimation />
      <ContentWrapper>
        <Title>Agenda</Title>
        <TimelineWrapper>
          {schedule.map((item, index) => {
            const [time, meridiem] = item.time.split(" ");
            return (
              <TimelineItem key={index}>
                <TimeCircle>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>{time}</div>
                  <div style={{ fontSize: "12px", fontWeight: "normal" }}>{meridiem}</div>
                </TimeCircle>
                <EventBox>{item.event}</EventBox>
              </TimelineItem>
            );
          })}
        </TimelineWrapper>
      </ContentWrapper>
    </Section>
  );
}
