const express = require("express");
const passport = require("passport");
const Posts = require("../models/Posts");
const Admin = require("../models/Admin");
const Users = require("../models/User");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/viewteachers", ensureAuthenticated, (req, res) => {
  if (req.user.currentuser === "admin") {
    Users.find(
      {
        currentuser: "teacher"
      },
      {
        _id: 1,
        name: 1
      },
      (err, teacher) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(typeof teacher);
        console.log(teacher);
        console.log(teacher.length);
        console.log(teacher[0]);
       res.render('viewteachers',{teacher:teacher})
      }
    ); //student users
  } else {
    res.send("!unauthorized");
  } //check for current user
}); //close the request(admin-getuserlist)

router.post('/viewteachers',(req,res)=>{
  res.send(req.body)
})





router.get("/viewstudents", ensureAuthenticated, (req, res) => {
  if (req.user.currentuser === "admin") {
    Users.find(
      {
        currentuser: "student"
      },
      (err, student) => {
        if (err) {
          console.log(err);
        }
      }
      

    );
    // console.log(teacher)
    // console.log(typeof(teacherlist))
    res.render('viewstudents',student);
    // res.render('viewusers',{
    //   teacherlist,
    //   studentlist
    // })//res.render close
  } else {
    res.send("!unauthorized");
  } //check for current user
}); //close the request(admin-getuserlist)

module.exports = router;
