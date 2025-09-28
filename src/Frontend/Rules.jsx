import React, { forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BackgroundAnimation from "./BackgroundAnimation"; // <-- import your background animation

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

const RulesSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent; /* background now handled by BackgroundAnimation */
  color: #fff;
  padding: 20px;
  position: relative;
  z-index: 1; /* keep content above the background */
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
  "💳 Payment should be done on 26 October only.",
  "🆔 Kindly carry your ID card at all times.",
  "✅ Please maintain discipline throughout the event."
];

// ✅ Forward ref so parent can scroll to it
const Rules = forwardRef((props, ref) => {
  return (
    <>
      <BackgroundAnimation /> {/* render background behind rules */}
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
