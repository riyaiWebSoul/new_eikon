const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  try {
    // Extract the request path
    const { path } = req;

    if (path === 'https://nwe-eikon.vercel.app/') {
      // Handle the root path
      // Connection URL
      const url = 'mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/';
      // Database Name
      const dbName = 'eikon';
      // Create a new MongoClient
      const client = new MongoClient(url, { useNewUrlParser: true });

      // Connect to the server
      await client.connect();

      // Select a specific database
      const db = client.db(dbName);

      // Perform database operations here, e.g., retrieve data
      const collection = db.collection('footers'); // Replace with your collection name
      const data = await collection.find({}).toArray(); // Retrieve all documents

      // Close the connection
      client.close();

      // Send the retrieved data as a response
      res.status(200).json({ data });
    } else if (path === '/other') {
      // Handle another path
      // You can define different route handlers for different paths
      res.status(200).json({ message: 'This is another route.' });
    } else {
      // Handle unknown paths (404 Not Found)
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
