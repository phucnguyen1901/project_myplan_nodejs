
module.exports.requireAuth = (req,res,next) =>{

    if(!req.session.username){
        res.redirect('/login');
        return;
    }

    res.locals.Name = req.session.username;

    next();
}








