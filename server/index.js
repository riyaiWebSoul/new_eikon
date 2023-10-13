const app=require('../api/app')

  module.exports = async (req, res) => {
    // This is your serverless function handler
    // It uses the Express app for handling HTTP requests
  
    // Implement any necessary CORS headers here if needed
    res.setHeader('Access-Control-Allow-Origin', 'https://nwe-eikon.vercel.app'); // Replace with your desired origin
  
    if (req.method === 'OPTIONS') {
      // Handle preflight requests
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.status(204).end();
      return;
    }
  
    // Pass the request and response objects to your Express app
   
  };
    
  app(req, res);