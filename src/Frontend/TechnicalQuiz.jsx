import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled(motion.div)`
  background: white;
  color: #000; /* body text visible */
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  text-align: left;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  max-height: 80vh;
  overflow-y: auto;

  @media(max-width:480px){
    padding: 15px;
    font-size:0.9rem;
  }

  h3{color:#321cbbff;margin-bottom:8px;}
  ul{list-style:disc;margin-left:20px;}
  li{margin-bottom:5px;}
`;

const Title = styled.h2`
  font-size:1.8rem;
  color:#321cbbff;
  margin-bottom:15px;
  font-family:"Snap ITC",cursive,sans-serif;
`;

const Section = styled.div`margin-bottom:15px;`;

const CloseButton = styled.button`
  margin-top:20px;
  padding:10px 20px;
  background:#321cbbff;
  color:white;
  border:none;
  border-radius:6px;
  cursor:pointer;
  &:hover{background:#241388;}
`;

const TechnicalQuiz = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <Overlay initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
        <PopupBox initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} exit={{y:50,opacity:0}} transition={{type:"spring",stiffness:300,damping:25}} onClick={e=>e.stopPropagation()}>
          <Title>Technical Quiz</Title>

          <Section>
            <h3>Rules:</h3>
            <ul>
              <li>Team of 2-3 participants</li>
              <li>Time: 30 minutes</li>
              <li>Objective & subjective questions included</li>
            </ul>
          </Section>

          <Section>
            <h3>Topics:</h3>
            <ul>
              <li>Data Structures & Algorithms</li>
              <li>AI & ML Basics</li>
              <li>Networking & Security</li>
              <li>Database Concepts</li>
            </ul>
          </Section>

          <Section>
            <h3>Scoring:</h3>
            <ul>
              <li>Correctness – 50%</li>
              <li>Speed – 30%</li>
              <li>Presentation/Clarity – 20%</li>
            </ul>
          </Section>

          <CloseButton onClick={onClose}>Close</CloseButton>
        </PopupBox>
      </Overlay>
    )}
  </AnimatePresence>
);

export default TechnicalQuiz;
