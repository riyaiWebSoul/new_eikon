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

    // Define the collections
    const collection = db.collection('footers');
    const about = db.collection('abouts');
    const appointments = db.collection('appointments');
    const mapingecommerces = db.collection('mapingecommerces'); // Replace with your collection name
    const medicals = db.collection('medicals');
    const homes = db.collection('homes');
    const images = db.collection('images');
    const healingtouches = db.collection('healingtouches');
    const patientreviews = db.collection('patientreviews');




    // Retrieve data from each collection
    const collectionData = await collection.find({}).toArray();
    const aboutData = await about.find({}).toArray();
    const appointmentsData = await appointments.find({}).toArray();
    const mapingecommercesData = await mapingecommerces.find({}).toArray();
    const medicalsData = await medicals.find({}).toArray();
    const homesData = await homes.find({}).toArray();
    const imagesData = await images.find({}).toArray();
    const healingtouchesData = await healingtouches.find({}).toArray();
    const patientreviewsData = await patientreviews.find({}).toArray();






    // Close the connection
    client.close();

    // Send the retrieved data as a response
    res.status(200).json({
      collectionData,
      aboutData,
      appointmentsData,
      mapingecommercesData,medicalsData,homesData,imagesData,healingtouchesData,patientreviewsData
    });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
