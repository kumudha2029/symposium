import React from "react";
import styled from "styled-components";
import { FaHome, FaCalendarAlt, FaListAlt, FaEnvelope, FaRegClipboard, FaImages } from "react-icons/fa";
import { motion } from "framer-motion";

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100vh;
  background: url("/popback.jpg") center/cover no-repeat;
  opacity: 0.8;
  color: #fff;
  z-index: 1000;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
`;

const NavItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  font-size: 0.95rem;
  user-select: none;

  &:hover {
    color: #ff4e50;
    text-shadow: 0px 0px 8px rgba(255, 78, 80, 0.8);
  }
`;

// Added FaImages for Gallery
const icons = [<FaHome />, <FaCalendarAlt />, <FaListAlt />, <FaEnvelope />, <FaRegClipboard />];
const labels = ["Home", "Events", "Agenda", "Contact", "Guidelines"];

export default function Sidebar({ sectionRefs, isOpen, toggleSidebar }) {
  const scrollToSection = (i) => {
    sectionRefs[i].current.scrollIntoView({ behavior: "smooth" });
    toggleSidebar(false);
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.8 },
    visible: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    hover: { scale: 1.1, rotate: [0, 2, -2, 0], transition: { duration: 0.4 } },
  };

  return (
    <SidebarWrapper
      variants={sidebarVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
    >
      <CloseButton
        onClick={() => toggleSidebar(false)}
        whileHover={{ scale: 1.3, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </CloseButton>

      {sectionRefs.map((_, i) => (
        <NavItem
          key={i}
          onClick={() => scrollToSection(i)}
          variants={itemVariants}
          whileHover="hover"
        >
          {icons[i]} {labels[i]}
        </NavItem>
      ))}
    </SidebarWrapper>
  );
}
