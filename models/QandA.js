const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    studentid: {
        type:String,
        required:true
    },
    studentname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answers:{
        type:[{
            type:String,
            default:'No Answers Yet.'
        }]
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const QandA = mongoose.model('QandA',UserSchema)
module.exports = QandA