import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/features"); // Redirect to AppFeaturePage
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="border border-white p-6 w-1/2 text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search Box"
            className="border border-white bg-black text-white p-2 w-3/4"
          />
          <button onClick={handleSearch} className="border border-white bg-black text-white p-2">
            Search
          </button>
        </div>
        <div className="border border-white bg-black text-white p-4 flex items-center justify-center h-48">
          About Page
        </div>
      </div>
    </div>
  );
}

export default Welcome;
