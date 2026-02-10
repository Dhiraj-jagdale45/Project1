const mongoose = require('mongoose');
const Review = require('./review');
const { ref } = require('joi');
const {Schema} = mongoose;

let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        default: "Others"
    }
});

listingSchema.post("findOneAndDelete", async (data) => {
    if(data && data.reviews.length > 0){
        await Review.deleteMany({_id: {$in: data.reviews}});
    }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;