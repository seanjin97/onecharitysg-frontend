const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let http = require('http');

module.exports = async function (event, context) {

  const req = event.http.request;
  const res = event.http.response

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const allowedOrigins = ['http://localhost:3000', 'https://g1t3-node-auth-srv.cfapps.us10.hana.ondemand.com', 'https://ebs-g1t3.cfapps.us10.hana.ondemand.com/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  try {

    let cookies = parseCookies( req.headers.cookie );
    console.log(cookies);
    let token = cookies['AuthEbsToken'];

    if (!token) {
      res.statusCode = 401;
      res.send('No Token found!');
    }
    else {

      let pkey = fs.readFileSync(path.join(__dirname, 'public.pem'));
      let payload = await jwt.verify(token, pkey);
  
      res.statusCode = 200;
      res.send(payload);
    }

  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

function parseCookies(str) {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = { };
  for ( let m ; m = rx.exec(str) ; )
    obj[ m[1] ] = decodeURIComponent( m[2] );
  return obj;
}
