const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    teacherid:{
        type:String,
        required:true
    },
    titled:{
        type:Boolean,
        required:true,
        default:true
    },

    
    Date:{
        type:Date,
        required:true,
        default:Date.now
    },
    feedbacknote:{
        type:String,
        required:true,
    }
});
const Feedback = mongoose.model('Feedback',UserSchema);
module.exports = Feedback;