import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AppFeaturePage.css";

// Domain mapping based on known apps
const domainMapping = {
  facebook: "Social Media",
  instagram: "Social Media",
  twitter: "Social Media",
  amazon: "E-Commerce",
  flipkart: "E-Commerce",
  snapchat: "Social Media",
  linkedin: "Professional Networking",
  zomato: "Food Delivery",
  swiggy: "Food Delivery",
  netflix: "Entertainment",
  hotstar: "Entertainment",
  whatsapp: "Messaging",
  telegram: "Messaging",
};

const AppFeaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appName = location.state?.appName || "N/A";
  const domainName =
    domainMapping[appName.trim().toLowerCase()] || "General";

  return (
    <div className="container">
      {/* Top Section */}
      <div className="top-section">
        <div className="box small">
          <span className="box-text">{appName}</span>
        </div>
        <div className="box large">
          <span className="box-text">{domainName}</span>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="box medium">
          <span className="box-text">List to App Feature</span>
        </div>
        <div className="box medium">
          <span className="box-text">
            <img
              src="https://www.chartjs.org/media/logo-title.svg"
              alt="Generated Graph"
              style={{ width: "100%" }}
            />
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="box small">
          <span className="box-text">Domain Descriptions</span>
        </div>
        <div className="box small">
          <span className="box-text">Google Rating</span>
        </div>
        <div className="box small">
          <span className="box-text">Our Analysis Rating</span>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default AppFeaturePage;
