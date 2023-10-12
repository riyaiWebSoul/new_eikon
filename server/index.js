const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const server = express();
const fs = require('fs');
const http = require('http');
const HomeRouter = require('./api/routes/home');
const productRouter = require('./api/routes/product');
const userRouter = require('./api/routes/user');
const AboutRouter = require('./api/routes/about');
const AppointmentRouter = require('./api/routes/appointment');
const MedicalRouter = require('./api/routes/medical');
const MapingEcommerceRouter = require('./api/routes/MapingEcommerce');
const FooterRouter = require('./api/routes/footer');
const EnquiryRouter = require('./api/routes/enquiry');
const HealingTouch = require('./api/routes/healingTouch');
const PatientReview = require('./api/routes/PatientReview');
const DrList = require('./api/routes/drList');
const LoginIdRouter = require('./api/routes/loginId');
const ImageUploadRouter = require('./api/routes/imagesUpload');
const PORT = process.env.PORT || 8080;

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon', {
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
server.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

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
  origin: ["https://nwe-eikon-riya-surenas-projects.vercel.app/"], // Add your actual frontend domain(s)
  methods: ["POST", "GET"],
  credentials: true,
}));
// Define your routes using async functions
async function setupRoutes() {
  server.use('/imageUploads', express.static('public/images'));
  server.use('/products', productRouter.router);
  server.use('/user', userRouter.router);
  server.use('/about', AboutRouter.router);
  server.use('/home', HomeRouter.router);
  server.use('/appointments', AppointmentRouter.router);
  server.use('/medical', MedicalRouter.router);
  server.use('/MapingEcommerce', MapingEcommerceRouter.router);
  server.use('/footer', FooterRouter.router);
  server.use('/enquiry', EnquiryRouter.router);
  server.use('/healingTouch', HealingTouch.router);
  server.use('/PatientReview', PatientReview.router);
  server.use('/drList', DrList.router);
  server.use('/imageUpload', ImageUploadRouter.router);
  server.use('/loginId', LoginIdRouter.router);
  server.use('/images', express.static('public/images'));
}


// Start the server on port 8080
async function startServer() {
  await connectToDatabase();
  await setupRoutes();

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
