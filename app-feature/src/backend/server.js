import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load domain descriptions
const domainDescriptions = {
  "Social Media": "Platforms that enable users to connect, share content, and interact with each other in real-time.",
  "E-Commerce": "Applications used to buy and sell products or services through digital transactions.",
  "Food Delivery": "Apps that allow users to order food from nearby restaurants and have it delivered to their location.",
  "Entertainment": "Apps offering content like movies, TV shows, or live broadcasts for enjoyment.",
  "Messaging": "Applications designed for direct communication through text, voice, or video.",
  "Professional Networking": "Platforms used to build professional relationships, find jobs, and grow careers.",
  "Video Editing": "Applications that allow users to edit and create videos with various tools and features.",
  "General": "Apps that don't fall under a specific domain or have a broad functionality."
};

// Load domain mapping
const domainMapping = {
  facebook: "Social Media",
  instagram: "Social Media",
  twitter: "Social Media",
  amazon: "E-Commerce",
  flipkart: "E-Commerce",
  snapchat: "General",
  linkedin: "Professional Networking",
  zomato: "Food Delivery",
  swiggy: "Food Delivery",
  netflix: "Entertainment",
  hotstar: "Entertainment",
  whatsapp: "Messaging",
  telegram: "Messaging",
  kinemastervideoeditor: "Video Editing",
  filmrprovideoeditor: "Video Editing",
  powerdirector: "Video Editing",
  photoeditor: "Video Editing",
  pixlraiArtphotoeditor: "Video Editing",
  snaptuneaiphotoeditor: "Video Editing",
  picplusphotoeditorpro: "Video Editing",
  blurrrcapcutprovideoeditor: "Video Editing",
  picsartaiphotoeditorvideo: "Video Editing",
  pizapdesigneditphotos: "Video Editing",
  captionsfortalkingvideos: "Video Editing",
  stopmotionstudio: "Video Editing",
  adobepremiererush: "Video Editing"
};

// Load featureScores from external JSON
const featureScoresData = JSON.parse(fs.readFileSync('./featureScores.json', 'utf-8'));

// Load ratings from ratings.json
const ratingsData = JSON.parse(fs.readFileSync('./ratings.json', 'utf-8'));

// Features mapping (added to resolve ReferenceError)
// Features mapping (added to resolve ReferenceError)
const featuresMapping = {
  facebook: ["Login",
    "Post Sharing",
    "Notifications",
    "News Feed",
    "Messages"],
  instagram: ["Login",
    "Post Sharing",
    "Stories",
    "Notifications",
    "Messages"],
  twitter: ["Login",
    "Tweeting",
    "Notifications",
    "Trending Topics",
    "Direct Messages"],
  amazon: ["Product Search",
     "Payment",
      "Ratings",
      "Cart",
      "Order History"],
  flipkart: ["Product Search",
    "Payment",
    "Ratings",
    "Cart",
    "Order History"],
  snapchat: ["Login",
    "Stories",
    "Chat",
    "Snapchat Filters",
    "Video Chat"],
  linkedin: ["Profile Creation",
    "Job Search",
    "Networking",
    "Job Alerts",
    "Messaging"],
  zomato: ["Restaurant Search",
    "Menu",
    "Order Tracking",
    "Payment",
    "Reviews"],
  swiggy: ["Restaurant Search",
    "Order Tracking",
    "Payment",
    "Reviews",
    "Delivery Tracking"],
  netflix: ["Streaming",
    "Content Library",
    "Watchlist",
    "Recommendations",
    "User Profile"],
  hotstar: ["Streaming",
    "Content Library",
    "Watchlist",
    "Live TV",
    "User Profile"],
  whatsapp: ["Messaging",
    "Voice Call",
    "Video Call",
    "Group Chat",
    "Status"],
  telegram: ["Messaging",
    "File Sharing",
    "Group Chat",
    "Voice Call",
    "Channels"],
  kinemastervideoeditor: ["Video Features",
    "AI Features",
    "User Interface",
    "Content",
    "Monetization",
    "Performance",
    "Technical Issues",
    "Social Media",
    "Authentication"],
  filmrprovideoeditor: ["AI Features",
    "User Interface",
    "Content",
    "Monetization",
    "Performance",
    "Technical Issues",
    "Video Features",
    "Authentication"],
  powerdirector: ["Video Features",
    "Monetization",
    "User Interface",
    "Advertising",
    "Camera & Media",
    "AI Features",
    "Audio Features",
    "Gaming & Interaction",
    "Technical Issues",
    "Maps & Location",
    "Social Media",
    "Content",
    "Learning & Tutorials",
    "Accessibility",
    "Performance",
    "Authentication",
    "Customization",
    "Security & Privacy",
    "Collaboration & Access",
    "Offline Features"],
  photoeditor: ["Monetization",
    "AI Features",
    "Video Features",
    "User Interface",
    "Performance",
    "Authentication",
    "Technical Issues",
    "Content",
    "Social Media"],
  pixlraiartphotoeditor: ["Video Features",
    "AI Features",
    "Monetization",
    "Performance",
    "Technical Issues",
    "User Interface",
    "Content",
    "Social Media",
    "Authentication"],
  snaptuneaiphotoeditor: ["AI Features",
    "Monetization",
    "Video Features",
    "Content",
    "Performance",
    "User Interface",
    "Social Media",
    "Maps & Location",
    "Gaming & Interaction",
    "Camera & Media",
    "Customization",
    "Advertising"],
  picplusphotoeditorpro: ["AI Features",
    "User Interface",
    "Monetization",
    "Video Features",
    "Performance",
    "Content",
    "Social Media",
    "Technical Issues"],
  blurrrcapcutprovideoeditor: ["Performance",
    "Video Features",
    "AI Features",
    "User Interface",
    "Monetization",
    "Content",
    "Offline Features",
    "Advertising",
    "Technical Issues",
    "Security & Privacy",
    "Camera & Media",
    "Gaming & Interaction",
    "Collaboration & Access",
    "Social Media",
    "Customization",
    "Learning & Tutorials",
    "Audio Features",
    "Maps & Location"],
  picsartaiphotoeditorvideo: ["Monetization",
    "AI Features",
    "Performance",
    "Video Features",
    "User Interface",
    "Content",
    "Authentication",
    "Technical Issues",
    "Social Media"],
  pizapdesigneditphotos: ["AI Features",
    "Camera & Media",
    "Video Features",
    "Content",
    "Technical Issues",
    "User Interface",
    "Performance",
    "Advertising",
    "Social Media",
    "Authentication",
    "Maps & Location",
    "Gaming & Interaction",
    "Customization",
    "Offline Features",
    "Monetization",
    "Collaboration & Access"],
  captionsfortalkingvideos: ["Collaboration & Access",
    "Technical Issues",
    "Monetization",
    "Content",
    "Video Features",
    "AI Features",
    "Authentication",
    "User Interface",
    "Performance"],
  stopmotionstudio: ["Monetization",
    "Video Features",
    "AI Features",
    "User Interface",
    "Technical Issues",
    "Social Media",
    "Content",
    "Performance",
    "Authentication"],
  adobepremiererush: ["Collaboration & Access",
    "Video Features",
    "Audio Features",
    "Monetization",
    "Performance",
    "User Interface",
    "AI Features",
    "Authentication",
    "Technical Issues",
    "Learning & Tutorials",
    "Maps & Location",
    "Content",
    "Camera & Media",
    "Offline Features",
    "Security & Privacy",
    "Social Media",
    "Gaming & Interaction",
    "Customization",
    "Advertising",
    "Accessibility"]
};

// API: Get App Details
app.post('/getAppDetails', (req, res) => {
  const { appName } = req.body;
  const lowerApp = appName.trim().toLowerCase();

  // Determine domain name based on app name
  const domainName = domainMapping[lowerApp] || "General";
  
  // Get features for the app
  const features = featuresMapping[lowerApp] || ["Login", "Sign up", "Notifications"];
  
  // Get the description for the domain
  const domainDescription = domainDescriptions[domainName];
  
  // Get the feature scores for the app from the featureScoresData
  const featureScores = featureScoresData[domainName] && featureScoresData[domainName][lowerApp] ? featureScoresData[domainName][lowerApp] : {};
  
  // Generate random ratings if not available
  const googleRating = ratingsData[lowerApp]?.googleRating || (Math.random() * 2 + 3).toFixed(1);
  const analysisRating = ratingsData[lowerApp]?.analysisRating || (Math.random() * 2 + 3).toFixed(1);

  const response = {
    appName: appName,
    domainName,
    domainDescription,
    features,
    googleRating,
    analysisRating,
    featureScores  // Add featureScores to the response
  };

  res.json(response);
});

// All Domain Data
const allDomains = [
  {
    domain: "Social Media",
    apps: ["Facebook", "Instagram", "Twitter"],
    featureScores: featureScoresData["Social Media"]
  },
  {
    domain: "E-Commerce",
    apps: ["Amazon", "Flipkart"],
    featureScores: featureScoresData["E-Commerce"]
  },
  {
    domain: "Food Delivery",
    apps: ["Zomato", "Swiggy"],
    featureScores: featureScoresData["Food Delivery"]
  },
  {
    domain: "Entertainment",
    apps: ["Netflix", "Hotstar"],
    featureScores: featureScoresData["Entertainment"]
  },
  {
    domain: "Messaging",
    apps: ["WhatsApp", "Telegram"],
    featureScores: featureScoresData["Messaging"]
  },
  {
    domain: "Professional Networking",
    apps: ["LinkedIn"],
    featureScores: featureScoresData["Professional Networking"]
  },
  {
    domain: "General",
    apps: ["Snapchat"],
    featureScores: featureScoresData["General"]
  },
  {
    domain: "Video Editing",
    apps: [
      "CaptionsForTalkingVideos", "StopMotionStudio", "BlurrrCapcutprovideoeditor",
      "FilmrProVideoEditor", "SnaptuneAIPhotoEditor", "PowerDirector", "PixlrAIArtPhotoEditor",
      "AdobePremiereRush", "PicsartAIPhotoEditorVideo", "PicPlusPhotoEditorPro",
      "PiZapDesignEditPhotos", "KineMasterVideoEditor", "PhotoEditor"
    ],
    featureScores: featureScoresData["Video Editing"]
  }
];

// Get All Domains
app.get('/getAllDomains', (req, res) => {
  res.json(allDomains);
});

app.post('/getDomainDetails', (req, res) => {
  const { domainName } = req.body;

  if (!domainName) {
    return res.status(400).json({ error: "domainName is required" });
  }

  // Get description for the domain
  const description = domainDescriptions[domainName] ||
    domainDescriptions[Object.keys(domainDescriptions).find(d => d.toLowerCase() === domainName.toLowerCase())] ||
    "No description available.";

  // Get the domain data
  const domainData = allDomains.find(d => d.domain.toLowerCase() === domainName.toLowerCase());

  if (!domainData) {
    return res.status(404).json({ error: "Domain not found" });
  }

  const apps = domainData.apps;
  const featureScores = domainData.featureScores || {};

  // Attach ratings for each app
  const appsWithRatings = apps.map(app => {
    const lowerApp = app.toLowerCase();  // Make app name lowercase for comparison with ratingsData

    return {
      name: app,
      googleRating: ratingsData[lowerApp]?.googleRating || (Math.random() * 2 + 3).toFixed(1),  // Default rating if not found
      analysisRating: ratingsData[lowerApp]?.analysisRating || (Math.random() * 2 + 3).toFixed(1),  // Default rating if not found
    };
  });

  // Return the domain details with apps and ratings
  res.json({
    domainName: domainData.domain,
    domainDescription: description,
    apps: appsWithRatings,
    featureScores
  });
});



// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
