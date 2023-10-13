const { createServer } = require('@vercel/node');
const app = require('./api/app');

module.exports = createServer(app);



