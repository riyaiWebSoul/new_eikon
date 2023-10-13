const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { urlencoded, json } = require('body-parser');
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
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(morgan('default'));

  mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      mongoose.connection.on('error', err => {
        console.log('connection failed');
      });
      
      mongoose.connection.on('connected', () => {
        console.log('connected successfully with the database');
      });
      
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload({
    useTempFiles:true
  }))
 
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
  app.use('/images', express.static('public/images'));

  app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
  })

module.exports = app;