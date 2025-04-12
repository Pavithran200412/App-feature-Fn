import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./welcome/Welcome"; 
import AppFeaturePage from "./routes/AppFeaturePage";
import DomainPage from "./routes/DomainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/features" element={<AppFeaturePage />} />
        <Route path="/domains" element={<DomainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
