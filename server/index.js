const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  let client;
  try {
    // Connection URL
    const url = 'mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/'; // Replace with your MongoDB connection string

    // Database Name
    const dbName = 'eikon'; // Replace with your database name

    // Create a new MongoClient
    client = new MongoClient(url, { useNewUrlParser: true });

    // Connect to the server
    await client.connect();

    // Select a specific database
    const db = client.db(dbName);

    // Get a list of all collections in the database
    const collections = await db.listCollections().toArray();

    // Define an object to store data from each collection
    const allData = {};

    // Iterate through the collections and retrieve data
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const data = await collection.find({}).toArray();
      allData[collectionName] = data;
    }

    // Send the retrieved data as a response
    res.status(200).json({ data: allData });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      // Close the connection in the finally block to ensure it's always closed
      client.close();
    }
  }
};
