const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); 
    if (!listing) {
        req.flash("del", "Listings is not available");
        res.redirect("/listings");
    }
    else {
        let listing_reviews = await Review.find({ _id: { $in: listing.reviews } });
        let listing_owner = await User.find({_id: listing.owner}); 
        let arrReviewsuserId = listing_reviews.map((obj) => (obj.author));
        let reviews_owner = [];
        for(user of arrReviewsuserId) {
            let owner = await User.findOne({_id: user});
            reviews_owner.push(owner);
        }
        res.render("listings/show.ejs", { listing, listing_reviews, listing_owner, reviews_owner});
    }
}

module.exports.createListing = async (req, res) => {
    if (req.body.category === "Select Category") {
        req.body.category = "Others";
    }
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image.url = url;
    newListing.image.filename = filename;
    await newListing.save();
    req.flash("success", "New Listing added!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("del", "Listings is not available");
        res.redirect("/listings");
    } else {
        let originalurl = listing.image.url;
        originalurl = originalurl.replace("/upload", "/upload/w_300/q_auto");
        res.render("./listings/edit.ejs", { listing, originalurl });
    }
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
    if(req.file){
        listing.image.url = req.file.path;
        listing.image.filename = req.file.filename;
        await listing.save();
    }
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("del", "Listing deleted!");
    res.redirect("/listings");
}

module.exports.filteredListings = async (req, res) => {
    let {category} = req.params;
    let allListings = await Listing.find({category: category});
    if(allListings.length > 0){
        res.render("listings/index.ejs", { allListings });
    }else{
        req.flash("del", "Listing is not available for that filter");
        res.redirect("/listings");
    }
}

module.exports.serchedListings = async (req, res) => {
    let {country} = req.query;
    let allListings = await Listing.find({country: country});
    if(allListings.length > 0){
        res.render("listings/index.ejs", { allListings });
    }else{
        req.flash("del", "Listing is not available");
        res.redirect("/listings");
    }
}