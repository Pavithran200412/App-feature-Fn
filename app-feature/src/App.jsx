import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../src/welcome/Welcome";  // Fix the import path
import AppFeaturePage from "./routes/AppFeaturePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/features" element={<AppFeaturePage />} />
      </Routes>
    </Router>
  );
}

export default App;
