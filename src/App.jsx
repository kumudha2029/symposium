import React from "react";
import Home from "./Frontend/Home";
import Event from "./Frontend/Event";
import Register from "./Frontend/Register";
import Contact from "./Frontend/Contact";
import Rules from "./Frontend/Rules";
import Gallery from "./Frontend/Gallery";  
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/Gallery" element={<Gallery />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App;
