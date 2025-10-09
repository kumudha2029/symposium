import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ----- Video Background -----
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

// ----- Page Wrapper -----
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 30px 20px;
  border-radius: 16px;
  color: #fff;
  backdrop-filter: blur(0px);
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 90vh;
  margin-top: 60px;

  @media (max-width: 480px) {
    width: 70%;
    max-width: none;
    padding: 15px;
    margin-top: 40px;
  }
`;

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

  @media (max-width: 480px) {
    right: 20px;
    padding: 8px 12px;
    font-size: 0.85rem;
  }
`;

const CongratsBox = styled.div`
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding: 20px;
  color: #0a2fc5ff;
  max-width: 500px;
  width: 100%;
  margin-top: 80px;

  @media (max-width: 480px) {
    width: 90%;
    margin-top: 60px;
  }
`;

const CongratsTitle = styled.h1`
  color: yellow;
  font-size: 2rem;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Eventname = styled.h1`
  color: yellow;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CongratsText = styled.p`
  color: white;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const EventList = styled.ul`
  color: white;
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

  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [isOtherCollege, setIsOtherCollege] = useState(false);
  const [isOtherBranch, setIsOtherBranch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCollegeChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherCollege(true);
      setFormData({ ...formData, college: "" });
    } else {
      setIsOtherCollege(false);
      setFormData({ ...formData, college: value });
    }
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherBranch(true);
      setFormData({ ...formData, branch: "" });
    } else {
      setIsOtherBranch(false);
      setFormData({ ...formData, branch: value });
    }
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

    setStatus("loading");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyFTl9pFS8YAN86WmTyn0-rXIOxSFlfjI1isVG1Vz7HAXB9v7IwhS-VZ6OPzepzSQan9w/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setStatus("success");
      } else {
        alert("Something went wrong with registration!");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to Google Sheets!");
      setStatus("idle");
    }
  };

  return (
    <PageWrapper>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <BackButton onClick={() => navigate("/")}>⬅ Back</BackButton>

      {status === "idle" && (
        <FormWrapper>
          <Title>Event Registration</Title>
          <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="participant 1 , participant 2"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="participant 1 Email, participant 2 Email"
              value={formData.email}
              onChange={handleChange}
              required
              multiple
            />

            <Label>Gender</Label>
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>

           <Label>College</Label>
            <Select
              name="college"
              value={isOtherCollege ? "Other" : formData.college}
              onChange={handleCollegeChange}
              required={!isOtherCollege}
            >
              <option value="">Select College</option>
              <option value="C. Abdul Hakeem College of Engineering and Technology">C. Abdul Hakeem College of Engineering and Technology</option>
              <option value="Annai Mira College of Engineering and Technology">Annai Mira College of Engineering and Technology</option>
              <option value="Kingston Engineering College">Kingston Engineering College</option>
              <option value="Sree Krishna College of Engineering">Sree Krishna College of Engineering</option>
              <option value="Global Institute of Engineering and Technology">Global Institute of Engineering and Technology</option>
              <option value="Adhiparasakthi College of Engineering">Adhiparasakthi College of Engineering</option>
              <option value="Ranippettai Engineering College">Ranippettai Engineering College</option>
              <option value="Saraswathi Velu College of Engineering">Saraswathi Velu College of Engineering</option>
              <option value="Sri Nandhanam College and Technology">Sri Nandhanam College and Technology</option>
              <option value="Podhigai College of Engineering and Technology">Podhigai College of Engineering and Technology</option>
              <option value="Shri Sitheswarar Engineering College">Shri Sitheswarar Engineering College</option>
              <option value="Bharathidasan Engineering College">Bharathidasan Engineering College</option>
              <option value="Thanthai Periyar Government Institute of Technology">Thanthai Periyar Government Institute of Technology</option>
              <option value="Sri Balaji Chockalingam Engineering College">Sri Balaji Chockalingam Engineering College</option>
              <option value="University College of Engineering">University College of Engineering</option>
              <option value="Arunai Engineering College">Arunai Engineering College</option>
              <option value="Other">Other</option>
            </Select>

            {isOtherCollege && (
              <Input
                type="text"
                name="college"
                placeholder="Enter your college"
                value={formData.college}
                onChange={handleChange}
                required
              />
            )}

            <Label>Degree</Label>
            <Select name="degree" value={formData.degree} onChange={handleChange} required>
              <option value="">Select Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </Select>

            <Label>Branch</Label>
            <Select
              name="branch"
              value={isOtherBranch ? "Other" : formData.branch}
              onChange={handleBranchChange}
              required={!isOtherBranch}
            >
              <option value="">Select Branch</option>
              <option value="AI & DS">AI & DS</option>
              <option value="CS & BS">CS & BS</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="Other">Other</option>
            </Select>

            {isOtherBranch && (
              <Input
                type="text"
                name="branch"
                placeholder="Enter your branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            )}

            <Label>Year</Label>
            <Select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </Select>

            <Label>Phone</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            <Label>Events</Label>
            <CheckboxWrapper>
              {["Paper Presentation", "Technical Quiz", "Coding & Debugging", "Tech Talks", "Crypto Crack"].map(
                (event) => (
                  <label key={event}>
                    <input
                      type="checkbox"
                      value={event}
                      checked={formData.events.includes(event)}
                      onChange={handleCheckboxChange}
                    />
                    {event}
                  </label>
                )
              )}
            </CheckboxWrapper>

            <Button type="submit">Register</Button>
          </form>
        </FormWrapper>
      )}

      {status === "loading" && (
        <CongratsBox>
          <CongratsTitle>⏳ Registering...</CongratsTitle>
          <CongratsText>Please wait while we confirm your registration.</CongratsText>
        </CongratsBox>
      )}

      {status === "success" && (
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
