const express = require("express");
const passport = require("passport");
const Posts = require("../models/Posts");
const Admin = require("../models/Admin");
const User = require("../models/User");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/viewteachers", ensureAuthenticated, (req, res) => {
  if (req.user.currentuser === "admin") {
    User.find(
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
        // console.log(typeof teacher);
        // console.log(teacher);
        // console.log(teacher.length);
        // console.log(teacher[0]);
        res.render("viewteachers", { teacher: teacher });
      }
    ); //student users
  } else {
    res.send("!unauthorized");
  } //check for current user
}); //close the request(admin-getuserlist)

router.post("/viewteachers", (req, res) => {
  //this is to delete teachers
  console.log(req.body)
  if (req.user.currentuser === "admin") {
    let userid = req.body.userid;
    if(!userid){
      req.flash('error_msg','No users selected!')
      res.redirect('/admin/viewteachers')
      return;
    }
    if (typeof(userid) === "string") {
      
        userid = [userid]
      }
      // console.log(posts[0])
      // console.log(posts.length)
      
      for(var i = 0;i<userid.length;i++){
        // console.log(userid[i])
        // console.log(typeof(userid[i]))
        User.deleteOne({_id: userid[i]}).then(user=>{
      }).catch(err=>console.log(err));
           
    }
      req.flash('success_msg', 'Deleted ' +userid.length+'users');
      res.redirect('/admin/viewteachers')
           
    }//if
   else {
    res.send("!unauthorized");
  }
  // res.send(req.body);
  // console.log(req.body.userid);
  // console.log(typeof req.body.userid);
});

router.get("/viewstudents", ensureAuthenticated, (req, res) => {
  if (req.user.currentuser === "admin") {
    User.find(
      {
        currentuser: "student"
      },
      {
        _id: 1,
        name: 1
      },
      (err, student) => {
        if (err) {
          console.log(err);
          return;
        }
       
        res.render("viewstudents", { student: student });
      }
    ); //student users
  } else {
    res.send("!unauthorized");
  } //check for cur
});


router.post("/viewstudents", (req, res) => {
  //this is to delete teachers
  console.log(req.body)
  if (req.user.currentuser === "admin") {
    let userid = req.body.userid;
    if(!req.body.toggleAction){
      req.flash('error','Select action type')
      res.redirect('/admin/viewstudents')
      return
    }
    if(!userid){
      req.flash('error_msg','No users selected!')
      res.redirect('/admin/viewstudents')
      return;
    }
    if(req.body.toggleAction==="setTeacher"){
      if (typeof(userid) === "string") {
      
        userid = [userid]
      }
      // console.log(posts[0])
      // console.log(posts.length)
      
      for(var i = 0;i<userid.length;i++){
        // console.log(userid[i])
        // console.log(typeof(userid[i]))
        User.updateOne({_id: userid[i]},{$set:{currentuser:"teacher"}}).then(user=>{
      }).catch(err=>console.log(err));
           
    }
      req.flash('success_msg', 'Updated' +userid.length+'users');
      res.redirect('/admin/viewstudents')
    }
    else{
    if (typeof(userid) === "string") {
      
        userid = [userid]
      }
      // console.log(posts[0])
      // console.log(posts.length)
      
      for(var i = 0;i<userid.length;i++){
        // console.log(userid[i])
        // console.log(typeof(userid[i]))
        User.deleteOne({_id: userid[i]}).then(user=>{
      }).catch(err=>console.log(err));
           
    }
      req.flash('success_msg', 'Deleted ' +userid.length+' users');
      res.redirect('/admin/viewstudents')
  }//else
    }//if admin
   else {
    res.send("!unauthorized");
  }
  // res.send(req.body);
  // console.log(req.body.userid);
  // console.log(typeof req.body.userid);
});
module.exports = router;
