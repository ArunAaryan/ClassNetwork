const express = require('express')

const Feedback = require('../models/Feedback');
const Posts = require('../models/Posts');
const Permission = require('../models/permission')
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
        // console.log(title)
        const newpost = new Posts({
        email,
        name,
        title,
        post,
        postcolor
      });
      // console.log(newpost._id)
      // console.log(typeof(newpost._id))
     newpost.save().then(user=>{
       req.flash('success_msg', 'Posted');
        
     res.redirect('/dashboard');
 })
     .catch(err=>console.log(err));
      
        
    });

router.get('/posts',ensureAuthenticated,(req,res)=>{
  if(req.user.currentuser==="teacher"){
    // console.log(req.user)
    Posts.find({email:req.user.email},null,{sort:{_id:-1}},(err,posts)=>{
      if(err){
        console.log(err);
        return
      }
      if(posts){
        res.render("myposts",{
          posts:posts
 
      })
    }
      // console.log(data)

  else{
    res.send('!unauthorized!')
  }
})
  
  }
})
  

router.post('/posts/delete',ensureAuthenticated,(req,res)=>{
  // console.log(req.body)
  if(req.user.currentuser==="teacher"){
    let posts = req.body.post_id;
    // console.log("posts array "+posts)
    // console.log("type of posts "+typeof(posts))
    // console.log("posts length "+posts.length)
    if(typeof(posts)==="string")//if only one post then it returns a string so we convert it into array.
    {
      posts = [posts]
    }
    // console.log(posts[0])
    // console.log(posts.length)
    
    for(var i = 0;i<posts.length;i++){
      Posts.deleteOne({_id: posts[i]}).then(user=>{
    }).catch(err=>console.log(err));
         
  }
          req.flash('success_msg', 'Deleted ' +posts.length+' Posts');
          res.redirect('/dashboard');
  }//if
    
  
  else{
    res.send('!unauthorized!')
  }
       });
      

router.get('/getfeedback',ensureAuthenticated,(req,res)=>{
Feedback.find({teacherid:req.user._id},null,{sort:{_id:-1}},(err,feedbacknotes)=>{
  if(err){
    console.log(err);
    return
  }
  // console.log(feedbacknotes)
  // console.log('user name is '+feedbacknotes[0].username)
  // console.log(req.user._id)
  // console.log(req.user.name)
  if(feedbacknotes){
    // console.log(feedbacknotes.username)
    res.render('showfeedbackt',{
    feedbacknotes:feedbacknotes
    })
  }
})

})//.get

router.get('/requests',(req,res)=>{
  Permission.find({status:"pending"},null,{sort:{_id:1}},(err,requests)=>{
    if(err){ console.log(err)}
    if(requests){
      res.render('viewrequests',{requests:requests,len:requests.length})
    }
  })
})

router.post('/requests',(req,res)=>{
  console.log(req.body)
  let requests=req.body.requestid
  if(typeof(requests)==="string"){
    requests=[requests]
  }
  if(req.body.options==="accepted"){
  for(i=0;i<requests.length;i++){
  Permission.updateOne({_id: requests[i]},{$set:{status:"accepted"}}).then(user=>{
  }).catch(err=>console.log(err));
  req.flash('updated')
  res.redirect('/teacher/requests')
  }
}
  else if(req.body.options==="rejected") {
    for(i=0;i<requests.length;i++){
      Permission.updateOne({_id: requests[i]},{$set:{status:"rejected"}}).then(user=>{
      }).catch(err=>console.log(err));
      req.flash('rejected')
  res.redirect('/teacher/requests')
  }
}

})


module.exports = router;
      