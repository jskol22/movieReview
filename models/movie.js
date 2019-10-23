const mongoose = require("mongoose");
const ReviewSchema = require("./review");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be 3 characters or longer"]
    },
    reviews: [ReviewSchema]
}, {timestamps:true});


mongoose.model("Movie", MovieSchema);