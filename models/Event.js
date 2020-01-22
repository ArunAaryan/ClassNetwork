const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   Adminid:{
    type:String,
    required:true
   },
   EventName:{
       type:String,
       required:true
   },
   StartDate:{
       type:Date,
   },
   EndDate:{
       type:Date,
   }
})

const Event = mongoose.model('Event',UserSchema);
// below code is to create Admins


module.exports = Event;