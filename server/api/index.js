const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// ... Other imports and configurations ...

// Your routes and other middleware here
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

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);

  // Check if the error status is 500 (Internal Server Error)
  if (res.statusCode === 500) {
    // Log the request details
    console.error('Request URL:', req.originalUrl);
    console.error('Request Method:', req.method);
    console.error('Request Body:', req.body);
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
});

if (process.env.NOW_REGION) {
  // Export the app as the handler for the serverless function
  module.exports = app;
} else {
  // Start the local development server if not running as a serverless function
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
