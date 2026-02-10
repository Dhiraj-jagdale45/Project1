const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage, limits:{
    fileSize: 60 * 1024 * 1024 //6MB
} });

//index route and create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingController.createListing))

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//serch route
router.get("/search", wrapAsync(listingController.serchedListings));

//show route and update route and delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, wrapAsync(listingController.destroyListing))

//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

//filter route
router.get("/filter/:category", wrapAsync(listingController.filteredListings));

module.exports = router;    