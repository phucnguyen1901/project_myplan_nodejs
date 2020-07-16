
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    plans: [{
        id: mongoose.Schema.Types.ObjectId,
        namePlan:String,
        count:Number,
        date:Date
    }]
})


module.exports = mongoose.model('users',user)














