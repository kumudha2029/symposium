// Gallery.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// ---------- Styled Components ----------

// Background video
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1; /* behind everything */
`;

const PageWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical centering */
  align-items: center;     /* horizontal centering */
  position: relative;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #fff;
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  margin-bottom: 30px; /* space between title and gallery */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GalleryContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 900px;
  overflow: hidden;
  z-index: 1;
`;

const GalleryWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const GalleryTrack = styled.div`
  display: flex;
  transition: transform 0.3s ease-out;
`;

const GallerySlide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 70vh; /* desktop default */
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 50vh; /* adjust for tablets */
  }

  @media (max-width: 480px) {
    max-height: 40vh; /* adjust for small phones */
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem; /* default desktop size */
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 2;
  opacity: 0.8;

  ${({ prev }) => prev && `left: 10px;`}
  ${({ next }) => next && `right: 10px;`}

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem; /* smaller size for tablets/mobiles */
    padding: 0.3rem 0.6rem; /* optional: adjust padding too */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* very small phones */
    padding: 0.2rem 0.5rem;
  }
`;


const DotsContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background: ${({ active }) =>
    active ? "#fff" : "rgba(255,255,255,0.5)"};
  border-radius: 50%;
  cursor: pointer;
`;

// ---------- React Component ----------

const Gallery = () => {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
  ];

  // Update slide width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const width = trackRef.current.children[0].getBoundingClientRect().width;
        setSlideWidth(width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(images.length - 1);
    }
  };

  return (
    <PageWrapper>
      {/* Background Video */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>

      {/* Title */}
      <Header>Symposium 2024</Header>

      {/* Gallery */}
      <GalleryContainer>
        <GalleryWrapper>
          <GalleryTrack
            ref={trackRef}
            style={{
              transform: `translateX(-${currentIndex * slideWidth}px)`,
            }}
          >
            {images.map((src, i) => (
              <GallerySlide key={i}>
                <SlideImage src={src} alt={`photo${i + 1}`} />
              </GallerySlide>
            ))}
          </GalleryTrack>
        </GalleryWrapper>

        {/* Navigation Buttons */}
        <NavButton prev onClick={prevSlide}>
          &#10094;
        </NavButton>
        <NavButton next onClick={nextSlide}>
          &#10095;
        </NavButton>

        {/* Dots */}
        <DotsContainer>
          {images.map((_, i) => (
            <Dot key={i} active={i === currentIndex} onClick={() => goToSlide(i)} />
          ))}
        </DotsContainer>
      </GalleryContainer>
    </PageWrapper>
  );
};

export default Gallery;
