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

// API: Get App Details
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
    googleRating: (Math.random() * 2 + 3).toFixed(1), // Between 3.0 to 5.0
    analysisRating: (Math.random() * 2 + 3).toFixed(1)
  };

  res.json(response);
});

// Sample Domain Data for DomainPage
const allDomains = [
  {
    domain: "Social Media",
    apps: ["Facebook", "Instagram", "Twitter"],
    featureScores: {
      Facebook: { "News Feed": 4, "Live Streaming": 5, "Marketplace": 3 },
      Instagram: { "Stories": 5, "Reels": 4, "Explore": 4 },
      Twitter: { "Tweet": 5, "Retweet": 4, "Trends": 3 }
    }
  },
  {
    domain: "E-Commerce",
    apps: ["Amazon", "Flipkart"],
    featureScores: {
      Amazon: { "Cart": 5, "Prime": 4, "Reviews": 4 },
      Flipkart: { "Deals": 4, "Ratings": 5, "Wishlist": 3 }
    }
  },
  {
    domain: "Food Delivery",
    apps: ["Zomato", "Swiggy"],
    featureScores: {
      Zomato: { "Restaurant Search": 5, "Menu": 4, "Reviews": 4 },
      Swiggy: { "Food Delivery": 5, "Offers": 4, "Tracking": 4 }
    }
  },
  {
    domain: "Entertainment",
    apps: ["Netflix", "Hotstar"],
    featureScores: {
      Netflix: { "Streaming": 5, "My List": 4, "Categories": 4 },
      Hotstar: { "Live Sports": 5, "Series": 4, "Watchlist": 3 }
    }
  },
  {
    domain: "Messaging",
    apps: ["WhatsApp", "Telegram"],
    featureScores: {
      WhatsApp: { "Chats": 5, "Status": 4, "Calls": 4 },
      Telegram: { "Channels": 5, "Bots": 4, "Secret Chats": 4 }
    }
  },
  {
    domain: "Professional Networking",
    apps: ["LinkedIn"],
    featureScores: {
      LinkedIn: { "Jobs": 5, "Messaging": 4, "Connections": 4 }
    }
  }
];

// API: Get All Domains
app.get('/getAllDomains', (req, res) => {
  res.json(allDomains);
});

// API: Get Domain Details (used in DomainPage)
app.post('/getDomainDetails', (req, res) => {
  const { domainName } = req.body;

  if (!domainName) {
    return res.status(400).json({ error: "domainName is required" });
  }

  const description = domainDescriptions[domainName] || "No description available.";

  const domainData = allDomains.find(d => d.domain === domainName);

  if (!domainData) {
    return res.status(404).json({ error: "Domain not found" });
  }

  const apps = domainData.apps;

  res.json({
    domainName,
    domainDescription: description,
    apps
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
