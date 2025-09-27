import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaHome, FaCalendarAlt, FaEnvelope, FaListAlt } from "react-icons/fa";

// ----- Sidebar Styles -----
const SidebarWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  background: ${(props) => (props.active ? "rgba(255,78,80,0.8)" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#ccc")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 78, 80, 0.6);
    color: #fff;
    transform: translateX(5px);
  }
`;

// ----- Section Styles -----
const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  scroll-snap-align: start;
`;

const HomeSection = styled(Section)`background: #3498db; color: #fff;`;
const EventsSection = styled(Section)`background: #2ecc71; color: #fff;`;
const ContactSection = styled(Section)`background: #f1c40f; color: #000;`;
const AgendaSection = styled(Section)`background: #e67e22; color: #fff;`;

// ----- Sidebar Component -----
const iconMap = {
  0: <FaHome />,
  1: <FaCalendarAlt />,
  2: <FaEnvelope />,
  3: <FaListAlt />,
};

const labelMap = {
  0: "Home",
  1: "Events",
  2: "Contact",
  3: "Agenda",
};

function AnimatedSidebar({ sectionRefs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const heights = sectionRefs.map((ref) => ref.current.offsetTop);
    const currentIndex = heights.findIndex((top, i) => {
      const nextTop = heights[i + 1] || Infinity;
      return scrollPosition >= top && scrollPosition < nextTop;
    });
    setActiveIndex(currentIndex !== -1 ? currentIndex : 0);
  };

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return (
    <SidebarWrapper>
      {sectionRefs.map((_, index) => (
        <NavItem
          key={index}
          active={index === activeIndex}
          onClick={() => scrollToSection(index)}
        >
          {iconMap[index]}
          {labelMap[index]}
        </NavItem>
      ))}
    </SidebarWrapper>
  );
}

// ----- Main Page Component -----
export default function App() {
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const contactRef = useRef(null);
  const agendaRef = useRef(null);

  const sectionRefs = [homeRef, eventsRef, contactRef, agendaRef];

  return (
    <div style={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100vh" }}>
      <AnimatedSidebar sectionRefs={sectionRefs} />
      <HomeSection ref={homeRef}>Home</HomeSection>
      <EventsSection ref={eventsRef}>Events</EventsSection>
      <ContactSection ref={contactRef}>Contact</ContactSection>
      <AgendaSection ref={agendaRef}>Agenda</AgendaSection>
    </div>
  );
}
