const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateReview, isAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


//Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//DELETE Review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;