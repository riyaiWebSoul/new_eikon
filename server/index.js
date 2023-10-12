const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
 
const path = require('path');
const server = express();
const fs = require('fs');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8080;

// Connect to the MongoDB database
// async function connectToDatabase() {
//   try {
//     await mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Database connected');
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//   }
// }

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('default'));

// Serve static files from the 'public' directory
server.use(express.static('public'));
server.use(cors());

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Configure Multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public', 'images'));
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage });
server.use(cors({
  origin: ["nwe-eikon-om4agqzni-riya-surenas-projects.vercel.app"], // Add your actual frontend domain(s)
  methods: ["POST", "GET"],
  credentials: true,
}));
// Define your routes using async functions


// Start the server on port 8080
async function startServer() {
  // await connectToDatabase();
  

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer(app);
