const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; 
        req.flash("del", "You must be logged to create a listing!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.redirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirect = req.session.redirectUrl;
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let isempty = true;
    for (let key in req.body) {
        isempty = false;
        break;
    }
    if (isempty) {
        throw new ExpressError(400, "Listing is required!!");
    }
    if (!req.file && req.originalUrl == "/listings") {
    throw new ExpressError(400, "Image is required");
    }
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, `${error.message}`);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body); 
    if(error){
        throw new ExpressError(400, `${error.message}`);
    }
    else{
        next();
    }
}