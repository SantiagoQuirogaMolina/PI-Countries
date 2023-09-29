import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Asegúrate de importar BrowserRouter

import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import LandingPage from  "./views/LandingPage/LandingPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="home/id/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
