import React from "react";
import styled from "styled-components";

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

// Background Video
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Overlay for readability
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45); /* darken video slightly */
  z-index: -1;
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
  color: #ffeb3b; /* bright yellow for contrast */
  font-size: 2.3rem;
  margin: 0 auto 40px auto;
  padding: 0 10px;
  text-align: center;
  font-family: "Snap ITC", cursive, sans-serif;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.7);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

// Scrollable timeline container
const TimelineWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 75vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  flex-shrink: 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

// Rectangular box for event
const EventBox = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.35);

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
      {/* Video Background */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />

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
