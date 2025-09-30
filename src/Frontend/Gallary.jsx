// GalleryWithVideo.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// ---------- Styled Components ----------
const PageWrapper = styled.div`
  position: relative;
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); // dark overlay for contrast
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin: 10px 0;
  }
`;

const GalleryContainer = styled.div`
  width: 90%;
  height: 50vh; // reduced height for horizontal images
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  margin-bottom: 40px;

  @media (max-width: 768px) {
    height: 45vh;
    border-radius: 8px;
  }
  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const GalleryTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.3s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // fit full horizontal images
  display: block;
  user-select: none;
  pointer-events: none;
  background-color: #111;
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;

  &.left {
    left: 10px;
  }
  &.right {
    right: 10px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    padding: 6px 10px;
  }
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  z-index: 10;
`;

const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin: 0 4px;
  background-color: #555;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;

  &.active {
    background-color: white;
  }

  @media (max-width: 480px) {
    height: 8px;
    width: 8px;
    margin: 0 3px;
  }
`;

// ---------- Component ----------
const GalleryWithVideo = () => {
  const imageFilenames = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const getSlideWidth = () => containerRef.current.offsetWidth;

  const updateSlide = (index) => {
    const slideWidth = getSlideWidth();
    const newTranslate = -index * slideWidth;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.3s ease-out";
      trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (currentIndex < imageFilenames.length - 1) updateSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) updateSlide(currentIndex - 1);
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < imageFilenames.length) updateSlide(index);
  };

  // Swipe Handlers
  const touchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const touchMove = (e) => {
    if (!isDragging) return;
    const newX = e.touches[0].clientX;
    setCurrentX(newX);
    const deltaX = newX - startX;
    const slideWidth = getSlideWidth();
    let newTranslate = prevTranslate + deltaX;
    const maxTranslate = 0;
    const minTranslate = -((imageFilenames.length - 1) * slideWidth);
    newTranslate = Math.min(maxTranslate, Math.max(minTranslate, newTranslate));
    if (trackRef.current) trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    e.preventDefault();
  };

  const touchEnd = () => {
    if (!isDragging) return;
    const deltaX = currentX - startX;
    const threshold = getSlideWidth() * 0.2;
    let newIndex = currentIndex;
    if (deltaX < -threshold && currentIndex < imageFilenames.length - 1) newIndex++;
    else if (deltaX > threshold && currentIndex > 0) newIndex--;
    updateSlide(newIndex);
    setIsDragging(false);
  };

  // Resize
  useEffect(() => {
    const handleResize = () => updateSlide(currentIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Initial Load
  useEffect(() => {
    updateSlide(0);
  }, []);

  return (
    <PageWrapper>
      <BackgroundVideo autoPlay loop muted>
        <source src="videos/background.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Overlay />

      <Title>Symposium 2024</Title>

      <GalleryContainer ref={containerRef} aria-label="Image Gallery">
        <GalleryTrack ref={trackRef} role="list">
          {imageFilenames.map((filename, index) => (
            <Slide key={index} role="listitem">
              <SlideImg src={`images/${filename}`} alt={`Slide ${index + 1}`} />
            </Slide>
          ))}
        </GalleryTrack>

        <NavBtn className="left" onClick={prevSlide} aria-label="Previous Slide">
          ❮
        </NavBtn>
        <NavBtn className="right" onClick={nextSlide} aria-label="Next Slide">
          ❯
        </NavBtn>

        <DotsWrapper role="tablist">
          {imageFilenames.map((_, index) => (
            <Dot
              key={index}
              className={index === currentIndex ? "active" : ""}
              role="tab"
              aria-selected={index === currentIndex ? "true" : "false"}
              tabIndex={0}
              onClick={() => goToSlide(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToSlide(index);
                }
              }}
            />
          ))}
        </DotsWrapper>

        {/* Touch events overlay */}
        <div
          style={{ position: "absolute", inset: 0, zIndex: 5 }}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        />
      </GalleryContainer>
    </PageWrapper>
  );
};

export default GalleryWithVideo;
