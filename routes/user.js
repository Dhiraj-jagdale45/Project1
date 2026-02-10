const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp))

router.route("/login")
.get(userController.renderLoginForm)
.post(redirectUrl, 
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    userController.login
)
router.get("/logout", userController.logout);

module.exports = router;