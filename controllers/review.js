const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let {id} = req.params; //by using the mergeParams we can access the value of id in review.js file
    let newReview = Review(req.body.review);
    // console.log(req.user);
    newReview.author = req.user._id;
    // console.log(newReview);
    await newReview.save();
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "New Review added!");
    // console.log(`/listings/${id}`);
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res) => {
    let{id, reviewId} = req.params;
    let listing = await Listing.findById(id);
    let arr = listing.reviews.filter((ele) => {
        if(ele != reviewId){
            return ele;
        }
    });
    await Listing.findByIdAndUpdate(id, {reviews: arr});
    await Review.findByIdAndDelete(reviewId);
    req.flash("del", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}