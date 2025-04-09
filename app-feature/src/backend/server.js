// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Domain Descriptions
const domainDescriptions = {
  "Social Media": "Platforms that enable users to connect, share content, and interact with each other in real-time.",
  "E-Commerce": "Applications used to buy and sell products or services through digital transactions.",
  "Food Delivery": "Apps that allow users to order food from nearby restaurants and have it delivered to their location.",
  "Entertainment": "Apps offering content like movies, TV shows, or live broadcasts for enjoyment.",
  "Messaging": "Applications designed for direct communication through text, voice, or video.",
  "Professional Networking": "Platforms used to build professional relationships, find jobs, and grow careers.",
  "General": "Apps that don't fall under a specific domain or have a broad functionality."
};

// Domain Mapping
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
  telegram: "Messaging"
};

// Features Mapping
const featuresMapping = {
  facebook: ["News Feed", "Live Streaming", "Marketplace"],
  instagram: ["Stories", "Reels", "Explore"],
  twitter: ["Tweet", "Retweet", "Trends"],
  amazon: ["Cart", "Prime", "Reviews"],
  flipkart: ["Deals", "Ratings", "Wishlist"],
  snapchat: ["Streaks", "Filters", "Discover"],
  linkedin: ["Jobs", "Messaging", "Connections"],
  zomato: ["Restaurant Search", "Menu", "Reviews"],
  swiggy: ["Food Delivery", "Offers", "Tracking"],
  netflix: ["Streaming", "My List", "Categories"],
  hotstar: ["Live Sports", "Series", "Watchlist"],
  whatsapp: ["Chats", "Status", "Calls"],
  telegram: ["Channels", "Bots", "Secret Chats"]
};

// API Route
app.post('/getAppDetails', (req, res) => {
  const { appName } = req.body;
  const lowerApp = appName.trim().toLowerCase();

  const domainName = domainMapping[lowerApp] || "General";
  const features = featuresMapping[lowerApp] || ["Login", "Sign up", "Notifications"];
  const domainDescription = domainDescriptions[domainName];

  const response = {
    appName: appName,
    domainName,
    domainDescription,
    features,
    googleRating: (Math.random() * 2 + 3).toFixed(1), // Random between 3.0 and 5.0
    analysisRating: (Math.random() * 2 + 3).toFixed(1)
  };

  res.json(response);
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
