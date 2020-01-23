const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    studentid:{
        type:String,
    },
    studentname:{
        type:String
    },
    eventid:{
        type:String,
    },
    note:{
        type:String,
        default:''
    },
    status:{
        type:String,
        default:'pending'
    }




})


    const Event = mongoose.model('Permission',UserSchema);
// below code is to create Admins


module.exports = Event;