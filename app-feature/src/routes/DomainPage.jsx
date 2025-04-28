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
  const [allDomains, setAllDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const domainsResponse = await fetch("http://localhost:5000/getAllDomains");
        const domainsData = await domainsResponse.json();
        setAllDomains(domainsData);

        if (domainName) {
          const detailsResponse = await fetch("http://localhost:5000/getDomainDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domainName }),
          });
          const detailsData = await detailsResponse.json();
          setDomainInfo(detailsData);
        } else {
          throw new Error("Domain name not provided");
        }
      } catch (err) {
        console.error("Error fetching domain data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [domainName]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading domain analytics...</p>
      </div>
    );
  }

  if (error || !domainInfo) {
    return (
      <div className="error-container">
        <h2>Unable to load domain data</h2>
        <p>{error || "Please try again later"}</p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  const { domainDescription, apps } = domainInfo;
  const sortedApps = [...apps]
    .filter(app => app.analysisRating !== undefined && app.analysisRating !== null)
    .sort((a, b) => b.analysisRating - a.analysisRating);

  const topApp = sortedApps[0];
  const topAppName = topApp?.name;

  const currentDomainData = allDomains.find(
    (d) => d.domain.toLowerCase() === domainName.toLowerCase()
  );

  if (!currentDomainData) {
    return <div className="error-container"><h2>Domain not found</h2></div>;
  }

  const featureScores = currentDomainData?.featureScores || {};

  // ✅ Aggregate feature scores and prepare breakdown
  const aggregatedFeatureScores = {};
  const featureAppBreakdown = {};

  Object.entries(featureScores).forEach(([appName, scores]) => {
    Object.entries(scores).forEach(([feature, score]) => {
      if (!aggregatedFeatureScores[feature]) {
        aggregatedFeatureScores[feature] = 0;
        featureAppBreakdown[feature] = [];
      }
      aggregatedFeatureScores[feature] += score;
      featureAppBreakdown[feature].push({ app: appName, score });
    });
  });

  const sortedFeatures = Object.entries(aggregatedFeatureScores).sort((a, b) => b[1] - a[1]);
  const labels = sortedFeatures.map(([feature]) => feature);
  const dataPoints = sortedFeatures.map(([, score]) => score.toFixed(2));

  const chartData = {
    labels,
    datasets: [
      {
        label: `Total Feature Scores Across Apps`,
        data: dataPoints,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `${context[0].label} Feature`,
          label: (context) => {
            const feature = context.label;
            const breakdown = featureAppBreakdown[feature]
              .sort((a, b) => b.score - a.score)
              .map(({ app, score }) => `${app}: ${score.toFixed(2)}`);
            return breakdown;
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
        beginAtZero: true,
        title: { display: true, text: "Total Score" },
      },
      x: {
        title: { display: true, text: "Features" },
      },
    },
  };

  return (
    <div className="domain-container">
      <h1>{domainName}</h1>
      <p className="domain-description">{domainDescription}</p>

      {labels.length > 0 ? (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No feature data available for this domain.</p>
      )}

      <h2 className="top-apps-title">Top Apps in {domainName} (by Analysis Rating)</h2>
      <ul className="top-apps-list">
        {sortedApps.length > 0 ? (
          sortedApps.map((app, idx) => (
            <li key={idx} className="top-app-item">
              <strong>{app.name}</strong> - Analysis Rating: {app.analysisRating}
            </li>
          ))
        ) : (
          <p>No apps found with analysis ratings.</p>
        )}
      </ul>
      <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
    </div>
  );
};

export default DomainPage;
