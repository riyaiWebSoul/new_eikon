const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000; // Choose a port for your server

// Connection URL and Database Name
const url = 'mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/';
const dbName = 'eikon';

// Middleware to parse JSON requests
app.use(express.json());

// Route to fetch data from MongoDB
app.get('/data', async (req, res) => {
  try {
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true });

    // Connect to the server
    await client.connect();

    // Select a specific database
    const db = client.db(dbName);

    // Access individual collections
    const footersCollection = db.collection('footers');
    const aboutsCollection = db.collection('abouts');
    const drlistsCollection = db.collection('drlists');

    // Perform database operations for each collection
    const footersData = await footersCollection.find({}).toArray();
    const aboutsData = await aboutsCollection.find({}).toArray();
    const drlistsData = await drlistsCollection.find({}).toArray();

    // Close the connection
    client.close();

    // Send the retrieved data as a response
    res.status(200).json({ footersData, aboutsData, drlistsData });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
