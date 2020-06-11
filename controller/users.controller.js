
// const plan = require('../models/home.model');

// module.exports.homeUser = async(req,res) =>{
//     let plans = await plan.find();
//     res.render('users',{plans:plans});
// }

module.exports.homeUser = (req,res) =>{
    let nameValue = req.body.planName;
    // res.send(nameValue);
    res.render('users',{name:nameValue});
}