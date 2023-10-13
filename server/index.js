module.exports = async (req, res) => {
  try {
    const message = "Hello from a Vercel Serverless Function!";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
