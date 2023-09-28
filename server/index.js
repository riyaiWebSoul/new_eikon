const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const App = require('./App');
const multer = require('multer');

const server = express();
const HomeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const AboutRouter = require('./routes/about');
const AppointmentRouter = require('./routes/appointment');
const MedicalRouter = require('./routes/medical');
const MapingEcommerceRouter = require('./routes/MapingEcommerce');
const FooterRouter = require('./routes/footer');
const EnquiryRouter = require('./routes/enquiry');
const HealingTouch = require('./routes/healingTouch');
const PatientReview = require('./routes/PatientReview');
const DrList = require('./routes/drList');
const ImageUploadRouter=require('./routes/imagesUpload')
const PORT = process.env.PORT || 8080;
// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/eikon',{ useNewUrlParser: true, useUnifiedTopology: true });
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'imageUpload/'); 
  },
  filename: (req, file, cb) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;
      cb(null, fileName);
  }
});

const upload = multer({ storage });

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
  server.use('/imageUpload',ImageUploadRouter.router);
  // server.use('/imageUpload', express.static('./imageUpload'));
}

const imageUrls = [];

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.post('/upload',ImageUploadRouter.router, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the image name from the uploaded file's filename
  const imageName = req.file.filename;

  // Add the image name to the imageUrls array
  imageUrls.push(imageName);

  // You can send back the updated imageUrls array as a response
  res.json(imageUrls);

  // You can do further processing with the uploaded file here
  // For now, just send a success response
  res.send('File uploaded successfully.');
});

// Start the server on port 8080
async function startServer() {
  await connectToDatabase();
  await setupRoutes();

  server.listen(PORT, () => {
    console.log('Server started on port 8080');
  });
}

startServer();
