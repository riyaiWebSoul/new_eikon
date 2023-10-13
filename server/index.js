const app = require('./api/app'); // Import the Express app

module.exports = async (req, res) => {
  // This is your serverless function handler

  // Implement any necessary CORS headers here if needed
  res.setHeader('Access-Control-Allow-Origin', 'https://nwe-eikon.vercel.app'); // Replace with your desired origin

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  try {
    const message = "Hello shravan aaj server chal jayega";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
  app(req, res);
};
