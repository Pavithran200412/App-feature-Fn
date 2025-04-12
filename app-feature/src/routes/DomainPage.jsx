import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./DomainPage.css"; // make sure this file is updated

const DomainPage = () => {
  const location = useLocation();
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

  const { domainDescription, apps } = domainInfo;

  return (
    <div className="domain-container">
      <div className="box centered">
        <h2 className="domain-title">{domainName}</h2>
        <p className="domain-description">{domainDescription}</p>
      </div>

      <div className="box centered app-list-box">
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
    </div>
  );
};

export default DomainPage;
