
const user = require('../models/test.model');

module.exports.homeUser = async(req,res) =>{
    let plans = await user.find();
    console.log(plans)
    res.render('users',{plans:plans});
}

// module.exports.homeUser = (req,res) =>{
//     let nameValue = req.body.planName;
//     // res.send(nameValue);
//     res.render('users',{name:nameValue});
// }