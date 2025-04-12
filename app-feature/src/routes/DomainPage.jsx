import React, { useEffect, useState } from "react";
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
import "./DomainPage.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DomainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domainName } = location.state || {};
  const [domainInfo, setDomainInfo] = useState(null);

  useEffect(() => {
    if (domainName) {
      fetch("http://localhost:5000/getDomainDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainName }),
      })
        .then((res) => res.json())
        .then((data) => setDomainInfo(data))
        .catch((err) => console.error("Error fetching domain details:", err));
    }
  }, [domainName]);

  if (!domainInfo) {
    return <div className="loading">Loading domain details...</div>;
  }

  const { domainDescription, apps, featureScores } = domainInfo;

  const featureAverages = {};
  if (featureScores) {
    for (const app in featureScores) {
      const features = featureScores[app];
      for (const [feature, score] of Object.entries(features)) {
        if (!featureAverages[feature]) {
          featureAverages[feature] = { total: 0, count: 0 };
        }
        featureAverages[feature].total += score;
        featureAverages[feature].count += 1;
      }
    }
  }

  const features = Object.keys(featureAverages);
  const scores = features.map(f => (featureAverages[f].total / featureAverages[f].count).toFixed(2));

  const chartData = {
    labels: features,
    datasets: [
      {
        label: `${domainName} Feature Scores`,
        data: scores,
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Score: ${context.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Features",
        },
      },
    },
  };

  return (
    <div className="domain-container">
      <div className="box centered">
        <h2 className="domain-title">{domainName}</h2>
        <p className="domain-description">{domainDescription}</p>
      </div>

      <div className="box app-list-box">
        <h3 className="box-title">Apps in {domainName}</h3>
        {apps && apps.length > 0 ? (
          <ul className="app-list">
            {apps.map((app, index) => (
              <li key={index} className="app-item">
                {app}
              </li>
            ))}
          </ul>
        ) : (
          <p>No apps available in this domain.</p>
        )}
      </div>

      <div className="box chart-box">
        <h3 className="box-title">Feature Scores (Avg)</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="button-wrapper">
        <button className="back-button" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default DomainPage;
