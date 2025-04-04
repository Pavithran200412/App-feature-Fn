import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/features", {
        state: {
          appName: searchQuery,
        },
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1 className="heading">App-Feature Analysis and Comment-Driven Rating System</h1>
      
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search The App"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="search-icons">
          <img src="https://storage.googleapis.com/a1aa/image/vtVIh3-UrfJ2_G42n3P8pOW6A-qgu5tNLgI-5qcM-fM.jpg" alt="mic" />
          <img src="https://storage.googleapis.com/a1aa/image/5Airk7ztLPWrp4nPdFeTe_HeYXTb39KXhrNaR4SGe3E.jpg" alt="lens" />
        </div>
      </div>

      <button className="search-button" onClick={handleSearch}>Search</button>

      <div className="about">
        {/* About text here */}
        The App - Feature Analysis and Comment - Driven Rating System is a comprehensive feedback and evaluation framework designed to provide in - depth insights into mobile or web applications based on user interactions and opinions.Instead of relying solely on overall star ratings, this system allows users to rate individual features of an app — such as user interface, performance, security, usability, and battery efficiency — offering a more granular and accurate assessment.It may also include automated analysis tools that utilize natural language processing (NLP) to extract commonly mentioned features from user comments and group them accordingly, enabling comparative analysis between similar applications.In addition, the comment - driven rating component enhances the feedback loop by analyzing user - generated reviews to determine sentiment and relevance.Even when users leave only a comment without a star rating, sentiment analysis algorithms can predict and assign a likely score based on the tone and keywords used.The system may also incorporate credibility scoring, which weighs reviews based on the reviewer 's history, the length and detail of the comment, and how other users engage with it (such as likes or dislikes). Advanced versions of this system can even detect and flag fake or spam reviews using AI models trained on patterns of suspicious behavior. Overall, this system benefits both users and developers—users gain a transparent and feature-focused perspective when selecting apps, while developers receive targeted feedback for continuous improvement. It can be implemented in app marketplaces, review platforms, or beta-testing environments, making it a valuable tool in enhancing app quality and user satisfaction.
      </div>
    </div>
  );
}

export default Welcome;
