const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be 3 characters or longer"]
    },
    stars: {
        type: Number,
        required: [true, "Rating is required"]
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [3, "Comment must be 3 characters or longer"]
    },
    // movie_id : {
    //     type: String,
    //     required: [true, "Title is required "]

    // }
}, {timestamps:true});

mongoose.model("Review", ReviewSchema)