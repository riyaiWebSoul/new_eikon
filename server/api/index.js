const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

module.exports = async (req, res) => {
  try {
    const message = "Hello shravan aaj server chal jayega ";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Server error" });
  }
};




const server = http.createServer(app);
server.listen(port,()=>{console.log('this app is running on '+port)});