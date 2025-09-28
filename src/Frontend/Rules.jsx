import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const RulesSection = styled(motion.section)`
  width: 90%;
  max-width: 800px;
  margin: 60px auto;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const RuleList = styled.ul`
  padding-left: 20px;
  line-height: 2;
  font-size: 1.2rem;
`;

const RuleItem = styled(motion.li)`
  margin-bottom: 15px;
`;

const rules = [
  "👔 Kindly follow the formal dress code.",
  "⏰ Please try to enter the venue on time.",
  "💳 We request that payment be done on 26 October only.",
  "🆔 Kindly carry your ID card at all times.",
  "✅ Please maintain discipline throughout the event."
];

  return (
    <RulesSection
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Title>Event Rules 📜</Title>
      <RuleList>
        {rules.map((rule, index) => (
          <RuleItem
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
          >
            {rule}
          </RuleItem>
        ))}
      </RuleList>
    </RulesSection>
  );

export default Rules;
