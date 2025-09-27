import React, { useState } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url("/src/Frontend/background.jpg") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 40px 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #ffeb3b;
  font-family: "Snap ITC", cursive, sans-serif;
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
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }
`;

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    degree: "",
    branch: "",
    year: "",
    email: "",
    phone: "",
    events: [],
  });

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

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwaSmCcevPpMfNHZJK8DjK2FGQbwW64kzzli3O5kyreRscjQSatgXOPWUu9hn_aB20AiA/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        alert("Registration Successful!");
        setFormData({
          name: "",
          gender: "",
          degree: "",
          branch: "",
          year: "",
          email: "",
          phone: "",
          events: [],
        });
      } else {
        alert("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to Google Sheets!");
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Event Registration</Title>
        <form onSubmit={handleSubmit}>
          <Label>Participant's Name *</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <Label>Gender *</Label>
          <Select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>

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

          <Label>Year of Study *</Label>
          <Select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </Select>

          <Label>Email ID *</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <Label>Phone Number *</Label>
          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <Label>Events *</Label>
          <CheckboxWrapper>
            {["Poster Presentation", "Innovathon", "Coding & Debugging", "Paper Presentation"].map(event => (
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
    </PageWrapper>
  );
}

export default RegistrationPage;
