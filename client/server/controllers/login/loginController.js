const User = require('../../models/user.model')
require('dotenv').config()

const generateToken = require('../../auth/generateCookie');

async function login(req, res) {

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) throw 'Email not found';

        //user exists, check password
        if (password != user.password) {
            throw 'Incorrect password';
        }
        
        console.log(email, password, 'logged in');
        console.log('creating cookie');
        await generateToken(res, email, user.name, user.role);
        res.status(200).end(JSON.stringify({
            'status': 'user logged in',
            'email': email,
            'name': user.name,
            'role': user.role
        }));
        console.log('access cookie created successfully');

    } catch (error) {
        console.log('Error logging in user');
        console.log(error);
        
        res.status(500).end(JSON.stringify({
            'status': 'Error logging in user'
        }));
    }
}

module.exports = {
    login
}