const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Schema = mongoose.Schema;
const userSchema = new Schema({
        _id : ObjectId ,
        user_id : String,
        pswd : String,
        dob : String
}, { collection: 'users' });

const updation =mongoose.model('test',userSchema);

module.exports= updation;