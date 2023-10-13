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

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(morgan('default'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS for a specific origin
app.use(cors({
  origin: ["https://eikon-client.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true,
}));

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected');
  
      // Call the setupRoutes function to register your routes
      setupRoutes();
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }

// Define your routes using async functions
async function setupRoutes() {
  // Routes for various endpoints
  app.use('/products', productRouter.router);
  app.use('/user', userRouter.router);
  app.use('/about', AboutRouter.router);
  app.use('/home', HomeRouter.router);
  app.use('/appointments', AppointmentRouter.router);
  app.use('/medical', MedicalRouter.router);
  app.use('/MapingEcommerce', MapingEcommerceRouter.router);
  app.use('/footer', FooterRouter.router);
  app.use('/enquiry', EnquiryRouter.router);
  app.use('/healingTouch', HealingTouch.router);
  app.use('/PatientReview', PatientReview.router);
  app.use('/drList', DrList.router);
  app.use('/imageUpload', ImageUploadRouter.router);
  app.use('/loginId', LoginIdRouter.router);

  // Add a route to fetch data from MongoDB
  app.get('/', async (req, res) => {
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
setupRoutes();
connectToDatabase()
// Start the app
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

module.exports = app;
