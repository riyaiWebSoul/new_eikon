const express = require('express');
const app = express();
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
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
// const fileUpload = require('express-fileupload');


mongoose.connect('mongodb+srv://riyasurena137:fkzWxbSYzkDyN3X9@cluster0.q3ocj1n.mongodb.net/eikon',{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(fileUpload({
//   useTempFiles:true
// }))

app.use(cors());

app.use('/imageUploads', express.static('public/images'));
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