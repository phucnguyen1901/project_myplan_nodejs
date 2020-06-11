
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:String,
    plans: Array
})


module.exports = mongoose.model('users',user)














