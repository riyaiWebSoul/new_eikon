const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

// Import route modules for various parts of your application
const HomeRouter = require('./routes/home');
const ProductRouter = require('./routes/product');
const UserRouter = require('./routes/user');
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

AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-s3-region',
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'your-s3-bucket-name',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));
server.use(cors({
  origin: ["https://eikon-client.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));

// Define your routes using async functions
server.use('/imageUploads', express.static('public/images'));

// Define routes for various parts of your application
server.use('/home', HomeRouter);
server.use('/products', ProductRouter);
server.use('/user', UserRouter);
server.use('/about', AboutRouter);
server.use('/appointments', AppointmentRouter);
server.use('/medical', MedicalRouter);
server.use('/MapingEcommerce', MapingEcommerceRouter);
server.use('/footer', FooterRouter);
server.use('/enquiry', EnquiryRouter);
server.use('/healingTouch', HealingTouch);
server.use('/PatientReview', PatientReview);
server.use('/drList', DrList);
server.use('/imageUpload', ImageUploadRouter);
server.use('/loginId', LoginIdRouter);

server.get('/listImages', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images directory' });
    }

    const imageFiles = files.filter((file) => {
      const extname = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
    });

    const imageUrls = imageFiles.map((file) => `/${file}`);
    res.json({ images: imageUrls });
  });
});

server.post('/imageUpload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = req.file.location;
  res.json({ imageUrl });
  res.send('File uploaded successfully.');
});

server.delete('/deleteImage/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'images', filename);
  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting image' });
    }

    res.json({ message: 'Image deleted successfully' });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
