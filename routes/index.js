const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Posts = require('../models/Posts')
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  

  if(req.user.isTeacher){
    res.render('teachersdashboard',{
    user:req.user
  })
}
  else{
    
    (function(){
      console.log(req.user.name)
      Posts.find({},function(err, data){
        res.render('dashboard',{
          username:req.user.name,
          postdata :data
        })

        console.log(data)
      })
    
   })();
  

  }
});


module.exports = router;
