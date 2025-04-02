import React from "react";

function AppFeaturePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="border border-white p-8 w-3/4">
        {/* Header Section */}
        <div className="flex justify-between mb-4">
          <button className="border border-white px-4 py-2">App Name</button>
          <div className="border border-white px-6 py-2">Domain Name of the App</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="border border-white p-6 text-center h-40 flex items-center justify-center">
            <p className="-rotate-90">List of App Features</p>
          </div>
          <div className="border border-white p-6 h-40 text-center">Domain Descriptions</div>

          {/* Middle Column */}
          <div className="border border-white p-6 text-center h-40">Graph</div>

          {/* Bottom Row */}
          <div className="col-span-2 flex justify-around">
            <div className="border border-white p-4">Google Rating</div>
            <div className="border border-white p-4">Our Analysis Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppFeaturePage;
