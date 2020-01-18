const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Posts = require('../models/Posts')
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  

  if(req.user.currentuser==="teacher"){
    res.render('teachersdashboard',{
    user:req.user
  })
}
  else if(req.user.currentuser==="student"){
      res.render('studentdashboard');
      // console.log(req.user.name)
     

  }
  else{
    res.render('admin')
  }
});




module.exports = router;
