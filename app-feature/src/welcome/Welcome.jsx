import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [appName, setAppName] = useState("");
  const [domainName, setDomainName] = useState("");

  const handleSearch = async () => {
    if (appName.trim() === "") return;

    try {
      const res = await fetch("http://localhost:5000/getAppDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ appName })
      });

      const data = await res.json();

      navigate("/features", {
        state: {
          appName: data.appName,
          features: data.features,
          domainName: data.domainName,
          googleRating: data.googleRating,
          analysisRating: data.analysisRating
        }
      });
    } catch (err) {
      console.error("Failed to fetch app details", err);
    }
  };

  const handleDomainSearch = () => {
    if (domainName.trim() === "") return;
  
    navigate("/domains", {
      state: {
        appName: "",           // Passing empty value as requested
        domainName: domainName
      }
    });
  };

  const handleAppKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleDomainKeyPress = (event) => {
    if (event.key === "Enter") {
      handleDomainSearch();
    }
  };

  return (
    <div className="container">
      <h1 className="heading">App-Feature Analysis and Comment-Driven Rating System</h1>

      {/* App Search */}
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search The App"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          onKeyDown={handleAppKeyPress}
        />
        <div className="search-icons">
          <img src="https://storage.googleapis.com/a1aa/image/vtVIh3-UrfJ2_G42n3P8pOW6A-qgu5tNLgI-5qcM-fM.jpg" alt="mic" />
          <img src="https://storage.googleapis.com/a1aa/image/5Airk7ztLPWrp4nPdFeTe_HeYXTb39KXhrNaR4SGe3E.jpg" alt="lens" />
        </div>
      </div>

      <button className="search-button" onClick={handleSearch}>Search App</button>

      {/* Domain Search */}
      <div className="search-box domain-search">
        <i className="fas fa-globe"></i>
        <input
          type="text"
          placeholder="Search By Domain (e.g., Social Media)"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          onKeyDown={handleDomainKeyPress}
        />
      </div>

      <button className="search-button" onClick={handleDomainSearch}>Search Domain</button>

      <div className="about">
        The App - Feature Analysis and Comment - Driven Rating System is a comprehensive feedback and evaluation framework...
        {/* (About content remains unchanged) */}
      </div>
    </div>
  );
}

export default Welcome;
