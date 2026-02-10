const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let user = new User({
            username: username,
            email: email,
        });
        let registeruser = await User.register(user, password); //automatically stored the value in database no need to use User.save()
        // console.log(registeruser);
        req.login(registeruser, (err) => {
            if (err) {
                next(err);
            } else {
                req.flash("success", "User registered!");
                res.redirect("/listings");
            }
        });
    } catch (err) {
        req.flash("del", err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust")
    // console.log(res.locals.redirect);
    if (res.locals.redirect) {
        return res.redirect(res.locals.redirect);
    }
    res.redirect(`/listings`);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        } else {
            req.flash("success", "You are logged out!!");
            res.redirect("/listings");
        }
    })
}