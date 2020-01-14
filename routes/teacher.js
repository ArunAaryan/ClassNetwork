const express = require('express')
const Posts = require('../models/Posts');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.post('/dashboard',(req, res, next)=>{
        // console.log('title is'+req.body.title);
        // console.log(req.user);
        const email = req.user.email;
        const name = req.user.name;
        const title = req.body.title;
        const post =req.body.post;
        const postcolor = req.body.postcolor;
        console.log(title)
       const newpost = new Posts({
        email,
        name,
        title,
        post,
        postcolor
      });
     newpost.save().then(user=>{
       req.flash('success_msg', 'Posted');
        
     res.redirect('/dashboard');
 })
     .catch(err=>console.log(err));
      ``
        
      });

router.get('/posts',ensureAuthenticated,(req,res)=>{
  console.log(req.user)
  Posts.find({email:req.user.email},(err,posts)=>{
    if(err){
      console.log(err);
      return
    }
    if(posts){
      res.render("myposts",{
        posts:posts
      })
    }
  })
});

router.post('/posts/delete',ensureAuthenticated,(req,res)=>{
  console.log(req.body)
  const posts = req.body.post_title;
  
  for(var i = 0;i<posts.length;i++){
    Posts.deleteOne({title:posts[i]}).then(user=>{
        
  }).catch(err=>console.log(err));
       
}
req.flash('success_msg', 'Deleted ' +posts.length+' Posts');
         
        res.redirect('/dashboard');
       });
 

module.exports = router;
      