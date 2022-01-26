const User = require('../../models/user.model')

async function update(req, res) {

    const { role } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) throw 'Email not found';

        user.role = role;
        user.save();
        
        res.status(200).end();
        console.log('role updated');

    } catch (error) {
        console.log('Error updating user');
        console.log(error);
        
        res.status(500).end(JSON.stringify({
            'status': 'Error updating role'
        }));
    }
}

module.exports = {
  update
}