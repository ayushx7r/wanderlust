const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema({
    comment : String,
    rating : {
        type : Number,
        min : [1, "Enter a valid rating"],
        max : [5, "Enter a valid rating"]
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model("Review", reviewSchema);