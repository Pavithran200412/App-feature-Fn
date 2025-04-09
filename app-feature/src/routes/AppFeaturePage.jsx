import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./AppFeaturePage.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

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

const domainDescriptions = {
  "Social Media": "Social Media platforms allow users to create, share content, and connect globally.",
  "E-Commerce": "E-Commerce platforms enable online buying and selling of products and services.",
  "Professional Networking": "Platforms that connect professionals for networking, job opportunities, and collaborations.",
  "Food Delivery": "Services that deliver meals from restaurants to users at their doorstep.",
  "Entertainment": "Apps offering streaming of movies, shows, and videos for entertainment.",
  "Messaging": "Apps designed for real-time text, voice, and media communication.",
  "General": "This app belongs to a general domain not categorized specifically."
};

const googleRatings = {
  facebook: 4.1,
  instagram: 4.4,
  twitter: 4.0,
  amazon: 4.5,
  flipkart: 4.3,
  snapchat: 4.2,
  linkedin: 4.3,
  zomato: 4.0,
  swiggy: 4.1,
  netflix: 4.6,
  hotstar: 4.4,
  whatsapp: 4.3,
  telegram: 4.2,
};

const AppFeaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appName = location.state?.appName || "N/A";
  const features = location.state?.features || [];
  const lowerApp = appName.trim().toLowerCase();

  const domainName = domainMapping[lowerApp] || "General";
  const domainDesc = domainDescriptions[domainName];
  const googleRating = googleRatings[lowerApp] || "N/A";
  const analysisRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Simulated rating

  const featureScores = features.map((feature) => ({
    feature,
    score: Math.floor(Math.random() * 5) + 1,
    app: appName,
  }));

  const chartData = {
    labels: featureScores.map((f) => f.feature),
    datasets: [
      {
        label: `${appName} Feature Score`,
        data: featureScores.map((f) => f.score),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const feature = featureScores[index].feature;
            const score = featureScores[index].score;
            const app = featureScores[index].app;
            return `${app} has a score of ${score} for ${feature}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Features",
        },
      },
      y: {
        title: {
          display: true,
          text: "Score",
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const renderStars = (rating) => {
    if (rating === "N/A") return "N/A";
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="container">
      <div className="top-section">
        <div className="app-name-section">
          <img
            src={`https://logo.clearbit.com/${lowerApp}.com`}
            alt={`${appName} icon`}
            className="app-icon"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h2 className="app-name">{appName}</h2>
        </div>
        <h2 className="domain-heading">{domainName}</h2>
      </div>

      <div className="middle-section">
        <div className="box medium feature-box">
          <span className="box-text">App Features</span>
          <div className="feature-list vertical">
            {features.length > 0 ? (
              features.map((feature, index) => (
                <div className="feature-card plain" key={index}>
                  <span className="feature-name">{feature}</span>
                </div>
              ))
            ) : (
              <p>No features available.</p>
            )}
          </div>
        </div>

        <div className="box medium">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bottom-section">
        <div className="box small">
          <span className="box-text">Domain Description</span>
          <p className="box-content">{domainDesc}</p>
        </div>

        <div className="box small">
          <span className="box-text">Google Rating</span>
          <div className="rating-display">
            <span className="stars">{renderStars(googleRating)}</span>
            <span className="rating-value">{googleRating}</span>
          </div>
        </div>

        <div className="box small">
          <span className="box-text">Our Analysis Rating</span>
          <div className="rating-display">
            <span className="stars">{renderStars(analysisRating)}</span>
            <span className="rating-value">{analysisRating}</span>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default AppFeaturePage;
