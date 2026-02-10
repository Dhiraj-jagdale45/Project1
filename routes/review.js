const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Review
//post Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete Review route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;