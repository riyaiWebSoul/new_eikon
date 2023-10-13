module.exports = async (req, res) => {
  try {
    const message = "Hello api ";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
