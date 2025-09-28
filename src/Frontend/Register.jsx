import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "./BackgroundAnimation";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  html, body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 30px 20px;
  border-radius: 16px;
  color: #fff;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 90vh;
  margin-top:300px;

  /* Center horizontally */
  margin-top:60px;

  /* Optional: add some vertical spacing on mobile */
  @media (max-width: 600px) {
    padding: 10px 15px;
  }
`;


// ----- Titles -----
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #ffeb3b;
  font-family: "Snap ITC", cursive, sans-serif;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

// ----- Input Elements -----
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  box-sizing: border-box;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

// ----- Buttons -----
const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  margin-bottom: 15px;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }
`;

// ----- Congrats Box -----
const CongratsBox = styled.div`
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding: 20px;
  color: #0a2fc5ff;
  max-width: 500px;
  width: 100%;
  margin-top:50px;               /* horizontal center */
`;

const CongratsTitle = styled.h1`
  color: #0a2fc5ff;
  font-size: 2rem;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Eventname = styled.h1`
  color: #0a2fc5ff;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CongratsText = styled.p`
  color: #191818ff;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const EventList = styled.ul`
  color: #191818ff;
  font-size: 1.2rem;
  padding-left: 20px;
  margin-top: 10px;
  list-style: none;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding-left: 15px;
  }
`;

const EventItem = styled.li`
  margin: 5px 0;
`;

// ----- Registration Component -----
function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    college: "",
    degree: "",
    branch: "",
    year: "",
    phone: "",
    events: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedEvents = [...formData.events];
    if (checked) updatedEvents.push(value);
    else updatedEvents = updatedEvents.filter((ev) => ev !== value);
    setFormData({ ...formData, events: updatedEvents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.events.length === 0) {
      alert("Please select at least one event!");
      return;
    }
    setSubmitted(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby6-dwzaHdxmMT7Pno5SRXLoqfd7gH5gCIppU_-L8G4VospmrS2h9uW2X1ZSyfMAlM_uQ/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.status !== "success") {
        alert("Something went wrong with registration!");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to Google Sheets!");
    }
  };

  return (
    <PageWrapper>
      <BackgroundAnimation />
      <BackButton onClick={() => navigate("/")}>⬅ Back</BackButton>

      {!submitted ? (
        <FormWrapper>
          <Title>Event Registration</Title>
          <form onSubmit={handleSubmit}>
            <Label>Name *</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <Label>Email *</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <Label>Gender *</Label>
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>

            <Label>College *</Label>
            <Input type="text" name="college" value={formData.college} onChange={handleChange} required />

            <Label>Degree *</Label>
            <Select name="degree" value={formData.degree} onChange={handleChange} required>
              <option value="">Select Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </Select>

            <Label>Branch *</Label>
            <Select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="">Select Branch</option>
              <option value="AI & DS">AI & DS</option>
              <option value="CS & BS">CS & BS</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
            </Select>

            <Label>Year *</Label>
            <Select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </Select>

            <Label>Phone *</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            <Label>Events *</Label>
            <CheckboxWrapper>
              {["Poster Presentation", "Innovathon", "Coding & Debugging", "Paper Presentation"].map((event) => (
                <label key={event}>
                  <input
                    type="checkbox"
                    value={event}
                    checked={formData.events.includes(event)}
                    onChange={handleCheckboxChange}
                  />
                  {event}
                </label>
              ))}
            </CheckboxWrapper>

            <Button type="submit">Register</Button>
          </form>
        </FormWrapper>
      ) : (
        <CongratsBox>
          <CongratsTitle>🎉 Congratulations {formData.name}!</CongratsTitle>
          <CongratsText>
            You have successfully registered on <Eventname>Pinnacles 25</Eventname> for the following events:
          </CongratsText>
          <EventList>
            {formData.events.map((event, index) => (
              <EventItem key={index}>
                {index + 1}. {event}
              </EventItem>
            ))}
          </EventList>
        </CongratsBox>
      )}
    </PageWrapper>
  );
}

export default RegistrationPage;
