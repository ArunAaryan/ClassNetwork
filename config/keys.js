
// 'mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<collectionname>?retryWrites=true&w=majority';
if(process.env.NODE_ENV==="production"){
    console.log('in production')
    module.exports = require("./prod")
}else{
    console.log('In development=>')
    module.exports = require("./devkey")
}

