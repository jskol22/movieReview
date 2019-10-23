const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");
const Review = mongoose.model("Review");

class MovieController {
    getAll(req, res) {
        Movie.find()
            .then(movies => res.json(movies))
            .catch(err => res.json(err));
    }
    create(req, res) {
        let movie = new Movie({title: req.body.title});
        console.log(req)
        movie.save()
            .then(() => {
                delete req.body.title
                let review = new Review({...req.body, movie_id: movie._id })
                review.save();
                Movie.findOneAndUpdate({_id: movie._id},  { $push: { reviews: review } }, {runValidators: true})
                .then( res.json({ status: "ok" })) 
            })
            .catch(err => res.json(err));
    }
    getOne(req,res) {
        Movie.findOne({_id: req.params._id})
        .then(movie => res.json(movie))
        .catch(err => res.json(err));
    }
    review(req,res) {
        Movie.findByIdAndUpdate(
            {_id: req.params._id}, 
            {$push: {reviews: req.body}}, 
            {runValidators: true}
        )
        .then(() => res.json({status: "ok"}))
        .catch(err => res.json(err));
    }
    delete(req, res) {
        Movie.remove({ _id: req.params._id })
            .then(() => res.json({ status: "ok" }))
            .catch(err => res.json(err));
    }
}

module.exports = new MovieController();