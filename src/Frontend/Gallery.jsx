// Gallery.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// ---------- Styled Components ----------

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
  position: relative;
  width: 100%;
  min-height: ${(props) => (props.isSection ? "70vh" : "100vh")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: ${(props) => (props.isSection ? "20px 0" : "50px 0")};
`;

const Slideshow = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.isSection ? "2rem" : "3rem")};
  margin-bottom: ${(props) => (props.isSection ? "20px" : "40px")};
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
`;

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  z-index: 10;
`;

// ---------- Component ----------

const Gallery = ({ isSection = false }) => {
  const images = [
    "https://i.ibb.co/bgydGrnz/1.jpg",
    "https://i.ibb.co/zWKc92q7/2.jpg",
    "https://i.ibb.co/M5tvPByR/3.jpg",
    "https://i.ibb.co/zhFV6FN6/4.jpg",
    "https://i.ibb.co/7d1Z50LH/5.jpg",
    "https://i.ibb.co/s9xFYvzH/6.jpg",
    "https://i.ibb.co/CD9FzTM/7.jpg",
    "https://i.ibb.co/rf5dcPvn/8.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Slideshow auto-change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Mark loaded when video or first image is ready
  const handleLoaded = () => {
    if (!loaded) {
      setLoaded(true);
    }
  };

  return (
    <>
      {!loaded && <Loader>Loading Gallery...</Loader>}

      {/* Background Video */}
      <VideoBackground
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/poster.jpg"
        onLoadedData={handleLoaded}
      >
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>

      <Overlay isSection={isSection}>
        <Title isSection={isSection}>
          {isSection ? "Symposium 2024" : "Gallery Page - Symposium 2024"}
        </Title>

        <Slideshow>
          {images.map((src, i) => (
            <Slide key={i} active={i === current}>
              <SlideImage
                src={src}
                alt={`photo${i + 1}`}
                loading="lazy"
                onLoad={i === 0 ? handleLoaded : undefined}
              />
            </Slide>
          ))}
        </Slideshow>
      </Overlay>
    </>
  );
};

export default Gallery;
