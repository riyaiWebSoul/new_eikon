module.exports = async (req, res) => {
  try {
    const db = client.db('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/');
    const collection = db.collection('eikon');

    // Example: Insert a document
    await collection.insertOne({ name: 'John' });

    // Example: Query documents
    const result = await collection.find({ name: 'John' }).toArray();

    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
