//https://nextjs.org/docs/advanced-features/custom-server

const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = next({})
const handle = app.getRequestHandler()
const apiRouter = require('./server/routes/apiRoute');

app.prepare().then(() => {
  const server = express();

  let appEnv = require('cfenv').getAppEnv();
  let mongoConnect = require('./server/db/mongo-connect');
  mongoConnect(appEnv);

  // dependencies
  server.use(cookieParser());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  // config
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

  // paths
  server.use('/api', apiRouter);
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('Ready on '+process.env.PORT)
  })

})