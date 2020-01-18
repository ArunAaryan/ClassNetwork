const express = require('express')
const router = express.Router();
const Posts = require('../models/Posts')
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
module.exports = router;