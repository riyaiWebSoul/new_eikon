const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const server = express();
const PORT = process.env.PORT || 8080;
const mongodbURL = process.env.MONGODB_URL;

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('default'));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// CORS Configuration
server.use(cors({
  origin: ["https://nwe-eikon-riya-surenas-projects.vercel.app/"], // Add your actual frontend domain(s)
  methods: ["POST", "GET"],
  credentials: true,
}));

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Define your routes using async functions
async function setupRoutes() {
  server.use('/imageUploads', express.static('public/images'));
  // Add other routes here
}

// Start the server on the specified port
async function startServer() {
  await connectToDatabase();
  await setupRoutes();

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
