// app.js - main app
// refactor

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = express();
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const specs = require('./swagger');

let appEnv = require('cfenv').getAppEnv();
let mongoConnect = require('./db/mongo-connect.js');

// Import route
const apiRouter = require('./routes/apiRoute');

// env var
var path = process.env.MONGO_URI;

try {
    // connect mongo
    console.log('Connecting to mongo')
    mongoConnect(appEnv);
    
} catch (error) {
  console.log('Error connecting to mongoDB');
  console.log(error);
  
}

// Use utils
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// CORS 
server.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  else if (req.hostname.endsWith('cfapps.us10.hana.ondemand.com')) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + req.hostname)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');    
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');   
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next()
})

// Use routes
server.use('/api', apiRouter);

// server.listen(process.env.PORT, () => console.log('server started on port '+process.env.PORT));
server.listen(5000, () => console.log('server started on port 5000'));