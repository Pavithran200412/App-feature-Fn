import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppFeaturePage.css"; // Ensure the CSS file exists

const AppFeaturePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Top Section */}
      <div className="top-section">
        <div className="box small">App Name</div>
        <div className="box large">Domain Name of the App</div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="box medium">List to App Feature</div>
        <div className="box medium">Graph</div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="box small">Domain Descriptions</div>
        <div className="box small">Google Rating</div>
        <div className="box small">Our Analysis Rating</div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default AppFeaturePage;
