// BackgroundAnimation.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: #26c9deff; /* sky blue */
`;

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 300;

    // Helper function to draw a star
    const drawStar = (x, y, radius, points = 5) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const r = i % 2 === 0 ? radius : radius / 2;
        ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
    };

    // Initialize particles
// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 5 + 2, // increased size: 2 to 7
    speed: Math.random() * 1.5 + 0.5,
    angle: Math.random() * 2 * Math.PI,
    drift: Math.random() * 0.3 + 0.1,
    opacity: Math.random() * 0.5 + 0.5,
    opacitySpeed: Math.random() * 0.03 + 0.01,
  });
}


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        drawStar(p.x, p.y, p.radius);

        // Move particle down
        p.y += p.speed;

        // Drift left/right
        p.x += Math.sin(p.angle) * p.drift;
        p.angle += 0.02;

        // Twinkle
        p.opacity += p.opacitySpeed;
        if (p.opacity > 1 || p.opacity < 0.3) p.opacitySpeed *= -1;

        // Reset if off screen
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default BackgroundAnimation;
