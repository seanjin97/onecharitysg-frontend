// authController.js - Auth Controller module
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.authenticate = async (req, res) => {
    console.log("Authenticate")
    const { email, name, role } = req.body;
    try {
        console.log('Creating cookie');
        //access token      
        let accessToken = jwt.sign(
            {'email': email, 'name': name, 'role': role}, 
            process.env.PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: '7d'
        });
        console.log('Access cookie created successfully');

        res.cookie("AuthEbsToken", accessToken, {secure: false, httpOnly: true})
        res.send();
        
    } catch (error) {
        console.log('Error creating cookie');
        return res.status(500).json(error.toString());
    }
};


exports.verify = async (req, res, next) => {
    
    console.log('Verifying cookie');

    try {
        // console.log(req.cookies['AuthEbsToken']);
        // console.log(req.cookies);
        let token = req.cookies['AuthEbsToken'];
        
        if (!token) {
            console.log('Not logged in');
            return res.status(401).json('You need to login!');
        }

        let pkey = fs.readFileSync(path.join(__dirname, 'public.pem'));
        let payload = await jwt.verify(token, pkey);

        let url = "https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/User?$filter=contains(email,'"+payload.email+"')";
        
        try {
            const response = await axios.get(url, {
                headers: {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            })
            // console.log(payload.email);
            // console.log(response.data);
            payload['role'] = response.data.value[0]['userType'];
            console.log(payload);
        } catch (error) {
            console.log("Problem fetching user details from odata");
            console.log(error);
        }
        
        console.log('cookie checked successfully');

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(payload);

        
    } catch (error) {
        return res.status(500).json(error.toString());
    }
    
}

exports.clear = async (req, res) => {

    try {
        res.clearCookie("AuthEbsToken");
        res.send('cookie cleared');
        console.log('cookie cleared successfully');

    } catch (error) {
        return res.status(500).json(error.toString());
    }
    
}