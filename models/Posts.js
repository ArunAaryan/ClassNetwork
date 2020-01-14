const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
      },
      title:{
          type:String,
          required:true
      },

      post:{
          type:String,
          required:true
      },
      postcolor:{
          type:String,
          
      },
      Date:{
          type:Date,
          default:Date.now
      }


})
const Posts = mongoose.model('Posts', UserSchema);
//Posts will also be the collection name. NO need to specify explcitly.
module.exports = Posts;
