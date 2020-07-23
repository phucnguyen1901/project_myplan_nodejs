
const user = require('../models/home.model');
const { render } = require('pug');
const { response } = require('express');
const moment = require('moment-timezone');

module.exports.home = async (req,res) =>{
    let a = req.session.idUsername;
    let users = await user.find({_id: a})
    res.render('home',{plans:users});
}

module.exports.out = (req,res) =>{
    let out = req.body.Out;
    if(out == '1'){
        req.session.destroy( (err) =>{
            console.log("K Xong");
        });
        res.redirect('/');
    }
    // }else{
    //     console.log("K Xog");
    //     res.redirect('/');
    // }

}

module.exports.confirmDelete = (req,res) =>{
    let idMain = req.body.idMain;
    let id = req.body.id
    let deleteId = {'_id':id};
    user.findByIdAndUpdate(
        {_id:idMain},
        {$pull: {'plans':deleteId}},
        (err, success) =>{
            if(err){
                console.log("Err");
            }else{
                console.log("Success");
            }
        }
    )
    res.redirect('/');
}



module.exports.confirmComplete = (req,res)=>{
    let idMain = req.body.idMain;
    let id = req.body.id;
    console.log(id);
    console.log(idMain);
    let count = parseInt(req.body.countConfirm) + 1;
    let newPlan = {'plans.$.count':count};
    user.update(
        {_id:idMain,'plans._id':id},
        {$set:newPlan},
        (err, success) =>{
            if(err){
                console.log("Err");
            }else{
                console.log("Success");
            }
        }
    )
    res.redirect('/');
}



module.exports.homePost = async (req,res) =>{
    let planNewName = req.body.nameCreate;
    let idMain = req.body.idCreate;
    let now =  new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    console.log(b);
    let newPlan = {"namePlan":planNewName,"count":0,"date": now};
    user.findByIdAndUpdate(
        {_id:idMain},
        {$push:{plans:newPlan}},
    ).exec();
    res.redirect('/');
}



