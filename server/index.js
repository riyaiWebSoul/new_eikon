module.exports = async (req, res) => {
  try {
    const message = "Hello shravan aaj server chal jayega ";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
