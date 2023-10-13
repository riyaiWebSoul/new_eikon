const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  try {
    // Connection URL
    const url = 'mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/'; // Replace with your MongoDB connection string

    // Database Name
    const dbName = 'eikon'; // Replace with your database name

    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true });

    // Connect to the server
    await client.connect();
    
    // Select a specific database
    const db = client.db(dbName);

    // Perform database operations here, e.g., retrieve data
    const collection = db.collection('footers','abouts','drlists'); // Replace with your collection name
    const data = await collection.find({}).toArray(); // Retrieve all documents

    // Close the connection
    client.close();

    // Send the retrieved data as a response
    res.status(200).json({ data });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
