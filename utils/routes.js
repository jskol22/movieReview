const Movies = require("../controllers/movies");

module.exports = function(app) {
    app.get("/api/movies", Movies.getAll);
    app.post("/api/movies", Movies.create);
    app.get("/api/movie/:_id", Movies.getOne);
    app.post("/api/movies/:_id/review", Movies.review);
    app.delete("/api/movies/:_id", Movies.delete)
}
