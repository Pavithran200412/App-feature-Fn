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
        // Fetch all domains to get feature scores
        const domainsResponse = await fetch("http://localhost:5000/getAllDomains");
        if (!domainsResponse.ok) {
          throw new Error("Failed to fetch domain list");
        }
        const domainsData = await domainsResponse.json();
        setAllDomains(domainsData);
        
        // Fetch specific domain details
        if (domainName) {
          const detailsResponse = await fetch("http://localhost:5000/getDomainDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domainName }),
          });
          
          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch domain details");
          }
          
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

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading domain analytics...</p>
      </div>
    );
  }

  // Error state
  if (error || !domainInfo) {
    return (
      <div className="error-container">
        <h2 className="error-title">Unable to load domain data</h2>
        <p className="error-message">{error || "Please try again later"}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Return to Home
        </button>
      </div>
    );
  }

  const { domainDescription, apps } = domainInfo;
  
  // Find the correct domain data from allDomains
  const currentDomainData = allDomains.find(d => d.domain === domainName);
  const featureScores = currentDomainData?.featureScores || {};

  // Calculate feature averages and track which apps contribute to each feature
  const featureAverages = {};
  const featureApps = {};
  
  if (Object.keys(featureScores).length > 0) {
    for (const app in featureScores) {
      const features = featureScores[app];
      for (const [feature, score] of Object.entries(features)) {
        if (!featureAverages[feature]) {
          featureAverages[feature] = { total: 0, count: 0 };
          featureApps[feature] = [];
        }
        featureAverages[feature].total += score;
        featureAverages[feature].count += 1;
        featureApps[feature].push({ app, score });
      }
    }
  }

  const features = Object.keys(featureAverages);
  const scores = features.map(f => (featureAverages[f].total / featureAverages[f].count).toFixed(2));

  // Sort features by average score (highest first)
  const sortedFeatureIndices = scores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.index);

  const sortedFeatures = sortedFeatureIndices.map(index => features[index]);
  const sortedScores = sortedFeatureIndices.map(index => scores[index]);

  const chartData = {
    labels: sortedFeatures,
    datasets: [
      {
        label: `${domainName} Feature Scores`,
        data: sortedScores,
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: (context) => {
            return `${context[0].label} Feature`;
          },
          label: (context) => {
            const featureName = sortedFeatures[context.dataIndex];
            const appList = featureApps[featureName];
            
            // Create array of labels - first is the average
            const labels = [`Average Score: ${context.raw}`];
            
            // Add app-specific scores
            if (appList && appList.length > 0) {
              appList.forEach(item => {
                labels.push(`${item.app}: ${item.score}`);
              });
            }
            
            return labels;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12
          }
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: "Score",
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        title: {
          display: true,
          text: "Features",
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        ticks: {
          font: {
            size: 11
          }
        },
        grid: {
          display: false
        }
      },
    },
  };

  // Get top apps based on average feature scores
  const appAverages = {};
  
  if (Object.keys(featureScores).length > 0) {
    for (const app in featureScores) {
      const features = featureScores[app];
      let totalScore = 0;
      let featureCount = 0;
      
      for (const score of Object.values(features)) {
        totalScore += score;
        featureCount++;
      }
      
      if (featureCount > 0) {
        appAverages[app] = (totalScore / featureCount).toFixed(2);
      }
    }
  }

  // Sort apps by average score
  const sortedApps = Object.entries(appAverages)
    .sort((a, b) => b[1] - a[1])
    .map(([app]) => app);

  return (
    <div className="domain-container">
      <div className="domain-header">
        <h2 className="domain-title">{domainName}</h2>
        <p className="domain-description">{domainDescription}</p>
      </div>

      <div className="domain-content-wrapper">
        <div className="domain-sidebar">
          <div className="domain-box">
            <h3 className="box-title">Apps in {domainName}</h3>
            {apps && apps.length > 0 ? (
              <div className="app-list-container">
                <ul className="app-list">
                  {apps.map((app, index) => (
                    <li 
                      key={index} 
                      className={`app-item ${sortedApps.includes(app) ? 'top-app' : ''}`}
                      onClick={() => navigate("/features", { state: { appName: app } })}
                    >
                      <img
                        src={`https://logo.clearbit.com/${app.toLowerCase()}.com`}
                        alt={`${app} logo`}
                        className="app-logo-small"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      <span>{app}</span>
                      {appAverages[app] && (
                        <span className="app-score">{appAverages[app]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="no-data-message">No apps available in this domain.</p>
            )}
          </div>
          
          <div className="domain-metrics">
            <div className="metric-card">
              <span className="metric-value">{apps?.length || 0}</span>
              <span className="metric-label">Total Apps</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">{features.length}</span>
              <span className="metric-label">Features Analyzed</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">
                {Object.values(appAverages).length > 0 
                  ? (Object.values(appAverages).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / Object.values(appAverages).length).toFixed(1)
                  : "N/A"}
              </span>
              <span className="metric-label">Overall Rating</span>
            </div>
          </div>
        </div>

        <div className="domain-main-content">
          {features.length > 0 ? (
            <div className="chart-container">
              <h3 className="chart-title">Feature Scores Analysis</h3>
              <div className="chart-wrapper">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="chart-insights">
                <h4>Key Insights</h4>
                <ul>
                  {sortedFeatures.slice(0, 3).map((feature, index) => (
                    <li key={index}>
                      <strong>{feature}:</strong> Average score of {sortedScores[index]} across {featureApps[feature].length} apps
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="no-data-container">
              <h3>Feature Scores</h3>
              <p className="no-data-message">No feature scores available for this domain yet.</p>
            </div>
          )}
          
          {sortedApps.length > 0 && (
            <div className="top-apps-section">
              <h3 className="section-title">Top Performing Apps</h3>
              <div className="top-apps-container">
                {sortedApps.slice(0, 3).map((app, index) => (
                  <div 
                    key={index} 
                    className="top-app-card"
                    onClick={() => navigate("/features", { state: { appName: app } })}
                  >
                    <div className="app-rank">{index + 1}</div>
                    <img
                      src={`https://logo.clearbit.com/${app.toLowerCase()}.com`}
                      alt={`${app} logo`}
                      className="app-logo-medium"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div className="app-details">
                      <h4 className="app-name">{app}</h4>
                      <div className="app-rating">
                        <div className="rating-stars">
                          {"★".repeat(Math.floor(appAverages[app]))}
                          {"☆".repeat(5 - Math.floor(appAverages[app]))}
                        </div>
                        <span className="rating-value">{appAverages[app]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="button-wrapper">
        <button className="back-button" onClick={() => navigate("/")}>
          <span className="button-icon">←</span> Back to Home
        </button>
      </div>
    </div>
  );
};

export default DomainPage;