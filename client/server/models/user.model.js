var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema ({
    email: { type: String, unique: true, required: true},
    name: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, default: null}, // By default all users are volunteers
    createdDate: { type: Date, default: Date.now}

})

module.exports = mongoose.model('User', UserSchema);

