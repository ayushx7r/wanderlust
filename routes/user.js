const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");
const getAuthenticated = passport.authenticate("local", {failureRedirect : "/login", failureFlash : true});

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(redirectUrl, wrapAsync(userController.signup));

router.route("/login") 
    .get(userController.renderLoginForm)
    .post(redirectUrl, getAuthenticated, userController.login);

router.get("/logout", userController.logout);

module.exports = router;