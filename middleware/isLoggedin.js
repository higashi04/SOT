module.exports = function  (req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Necesitas iniciar sesión')
        return res.redirect('/')
    }
    next();
}
