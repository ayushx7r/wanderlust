const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        url : String,
        filename : String,
    },
    price : {
        type : Number,
        min : [1, "Enter valid price "],
    },
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    coordinates : {
        type : [Number],
        required : true
    },
    category : {
        type : String,
        enum : ["cabins", "rooms", "iconiccities", "amazingviews", "camping", "beaches", "castles", "tropical", "apartments"]
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;