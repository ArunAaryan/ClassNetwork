const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Feedback = require('../models/Feedback')
const Posts = require('../models/Posts')
const User = require('../models/User')

//onclick handlers


router.get('/posts',(req,res)=>{
    // console.log(req.body)
    if(req.user.currentuser==="student"){
        Posts.find({},null,{sort:{_id:-1}},(function(err, data){
            if(err) throw err;
            res.render('studentpostsglobal',{
              username:req.user.name,
              postdata :data
            })
    
            // console.log(data)
          })
    
          )
    }
})//

router.get('/course',(req,res)=>{
  console.log(req.query)
  if(req.user.currentuser==="student"){
    if(req.query.coursename){
      res.render('course')
    }
    else if(req.query.options){
      res.render('assignments')
    }
  }//if
})//post

router.get('/feedback',ensureAuthenticated,(req,res)=>{
  let teacherlist=""
  if(req.user.currentuser==="student"){
      User.find({currentuser:"teacher"},{_id:1,name:1},(err,data)=>{
        if(err) throw err;
        // console.log(data);
        res.render('feedback',{
          teacherlist:data
        })

      })
      
      // res.render('feedback')
      
      }
   
  
  else{
    res.send('!unauthorized')
  }
})

router.post('/feedback',ensureAuthenticated,(req,res)=>{
  if(req.user.currentuser==="student"){
    console.log(req.body)
    const username = req.user.name
    const teacherid = req.body.teacherid
    const titled = req.body.titled
    const feedbacknote = req.body.feedbacknote
    const userid = req.user._id;
    console.log(teacherid)
    console.log(titled)
    console.log(feedbacknote)
    console.log(userid)
    const newfeedback = new Feedback({
      userid,
      username,
      teacherid,
      titled,
      feedbacknote
    });
    // console.log(Date)
    newfeedback.save().then(user=>{
      
     
})
    .catch(err=>console.log(err));
     
    req.flash('success_msg', 'Feedback Sent');
    res.redirect('/student/feedback');
    // res.end()
  }//if
})//router.post
module.exports = router;