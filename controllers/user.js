const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        let newUser = new User({email, username});
        const user = await User.register(newUser, password);

        req.login(user, (err) => {
            if(err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            let redirect = res.locals.redirectUrl || "/listings";
            res.redirect(redirect);
        })  
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirect = res.locals.redirectUrl || "/listings";
    res.redirect(redirect);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    })
};