const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: {type: String, required:true},
    lname: {type: String, required:true},
    experience: {type:Number, required: true},
    position: {type: String, required: true},
    batch: {type: Number, required: true},
    course: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);