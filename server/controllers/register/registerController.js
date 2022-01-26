const User = require('../../models/user.model')
const axios = require('axios');
//const generateToken = require('./path/to/generateToken');

async function register(req, res) {

    const { email, name, password } = req.body;

    console.log(email, name, password);

    if (await User.findOne({ email: email })) {
        res.status(409).end(JSON.stringify({
            'status': 'Email already exist'
        }))
    }

    // user not found
    const user = new User({
        email:email, 
        name:name, 
        password:password
    });

    // save user
    try {
        await user.save();
        console.log('Successfully saved user');
        res.status(200).end(JSON.stringify({
            'status': 'user created'
        }));

    } catch (error) {
        console.log('Error saving user to mongoDB');
        console.log(error);
        
        res.status(500).end(JSON.stringify({
            'status': 'Error saving user'
        }))

    }
    
    axios.post('https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/User', {
        email: email,
        name: name,
        userType: null
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // save user to odata
    // https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/
}

module.exports = {
    register
}
