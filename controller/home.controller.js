
const plan = require('../models/home.model')

// module.exports.home = async (req,res) =>{
//     let user = await plans.find()
//     console.log(user)
//     res.render('test',{users:user});
// }

module.exports.home = async (req,res) =>{
    let plans = await plan.find();
    res.render('home',{plans:plans});
}

// module.exports.homePost = async (req,res) =>{
//     let plans = await plan.find();
//     res.render('home',{plans:plans});
// }