// Example serverless function
module.exports = async (req, res) => {
    const message = "Hello from a Vercel Serverless Function!";
    res.status(200).json({ message });
  };
  