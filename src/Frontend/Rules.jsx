import React, { forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const Title = styled.h2`
  color: yellow;
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

const RulesSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: #fff;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const RuleList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding-left: 0;
`;

const RuleItem = styled.li`
  margin: 10px 0;
  font-size: 1.2rem;
  z-index: 2;
`;

const rules = [
  "👔 Kindly follow the formal dress code.",
  "⏰ Please try to enter the venue on time.",
  "💳 Payment should be done on 16th October (online payment) only.",
  "🆔 Kindly carry your ID card at all times.",
  "✅ Please maintain discipline throughout the event.",
  "💡 The Registration fee for paper presentation is Rs.200/- per participant.",
  "📌 Registration fee Rs.100/- per participant to participate in all the other events."
];

const Rules = forwardRef((props, ref) => {
  return (
    <>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />

      <RulesSection
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Guidelines 📜</Title>
        <RuleList>
          {rules.map((rule, i) => (
            <RuleItem key={i}>{rule}</RuleItem>
          ))}
        </RuleList>
      </RulesSection>
    </>
  );
});

export default Rules;
