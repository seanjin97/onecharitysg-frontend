
const mongoose = require("mongoose");
require('dotenv').config();

function MongoConnect(oAppenv) {

    if (oAppenv.isLocal === true) {
        const uri = process.env.MONGO_LOCAL_URI;
        mongoose.connect(uri);
    } 
    else{
        mongoose.connect(oAppenv.services.mongodb[0].credentials.uri);
    }
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Successfully connected to MongoDB!");
    });
}

module.exports = MongoConnect;