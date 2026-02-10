const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1, 
        max: 5
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;