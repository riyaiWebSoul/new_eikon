const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

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
const LoginIdRouter = require('./routes/loginId');
const ImageUploadRouter = require('./routes/imagesUpload');

const PORT = process.env.PORT || 8080;

const server = express();

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('default'));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// Enable CORS for a specific origin
server.use(cors({
  origin: ["https://deploy-mean-1whq.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true,
}));

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://riyasurena137:R8Emr9gv8LkpVLNg@cluster0.q3ocj1n.mongodb.net/eikon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Define your routes using async functions
async function setupRoutes() {
  // Routes for various endpoints
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

  // Add a route to fetch data from MongoDB
  server.get('/', async (req, res) => {
    try {
      const db = await connectToDatabase(); // Connect to the database
      const collection = db.collection('eikon'); // Replace with your collection name

      // Query MongoDB to retrieve data (modify this query as needed)
      const data = await collection.find({}).toArray();

      // Send the retrieved data as a JSON response
      res.json({ data });
    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    }
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
