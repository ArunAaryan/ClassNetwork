const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   CourseName:{
    type:String,
    required:true
   },
   Syllabus:{
       type:String,
   },
   Assignments:{
       type:String,
   },
   otherContent:{
       type:String,
   },
   teacherid:{
       type:String,
   }
})

const Course = mongoose.model('Course',UserSchema);
// below code is to create Admins


module.exports = Course;