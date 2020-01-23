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
   },
   Note:{
       type:String
   }
})

const Event = mongoose.model('Event',UserSchema);
// below code is to create Events


module.exports = Event;