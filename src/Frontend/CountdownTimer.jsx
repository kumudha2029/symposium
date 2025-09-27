import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// ----- Flip Animation -----
const flip = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
`;

const TimerWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
`;

const TimeBox = styled.div`
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  color: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  perspective: 1000px;
`;

const TimeNumber = styled.div`
  display: inline-block;
  animation: ${flip} 0.7s ease-in-out;
`;

const TimeLabel = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
`;

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const today = new Date();
    const endDate = new Date("2025-10-16T23:59:59");
    const diff = endDate - today;

    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [prevTime, setPrevTime] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTime(timeLeft);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <TimerWrapper>
      {timeLeft.days > 0 && (
        <TimeBox>
          <TimeNumber key={timeLeft.days}>{timeLeft.days}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
        </TimeBox>
      )}
      <TimeBox>
        <TimeNumber key={timeLeft.hours}>{timeLeft.hours}</TimeNumber>
        <TimeLabel>Hours</TimeLabel>
      </TimeBox>
      <TimeBox>
        <TimeNumber key={timeLeft.minutes}>{timeLeft.minutes}</TimeNumber>
        <TimeLabel>Minutes</TimeLabel>
      </TimeBox>
      <TimeBox>
        <TimeNumber key={timeLeft.seconds}>{timeLeft.seconds}</TimeNumber>
        <TimeLabel>Seconds</TimeLabel>
      </TimeBox>
    </TimerWrapper>
  );
};

export default CountdownTimer;
