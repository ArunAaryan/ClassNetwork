
// 'mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<collectionname>?retryWrites=true&w=majority';
if(process.env.NODE_ENV==="production"){
    module.exports = require("./prod")
}else{
    module.exports = require("./devkey")
}

