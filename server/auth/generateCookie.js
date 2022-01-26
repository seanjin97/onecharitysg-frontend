const jwt = require('jsonwebtoken');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

const generateToken = (res, email, name, role) => {
  const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
  const accessToken = jwt.sign(
      {'email': email, 'name': name, 'role': role}, 
      process.env.PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: '7d'
  });
  
  return res.cookie('AuthEbsToken', accessToken, {
    expires: new Date(Date.now() + expiration),
    httpOnly: true,
    // secure: true,
    // sameSite: "none",
  });
};
module.exports = generateToken