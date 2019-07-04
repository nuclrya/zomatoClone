module.exports = (req, res, next) =>{
    if(!req.session.isLoggedIn){
        req.flash('error','You need to be logged in')
        return res.redirect('/login');
    }
    next();
}