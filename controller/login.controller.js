
const user = require('../models/home.model');


module.exports.getLogin = (req,res) =>{
    res.render('login');
}


module.exports.login = async (req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    let users = await user.find();
    let result = users.filter( element =>{
        return element.username == username && element.password == password;
    });
    if(result.length !== 0){
        req.session.username = result[0].name;
        req.session.idUsername = result[0].id;
        res.redirect('/');
    }else{
        res.render('login',{errorMessage:"Tài khoản không tồn tại",username:username});
    }
    console.log(result[0]._id);
}
