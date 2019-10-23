const mongoose = require("mongoose");

module.exports = function(DB_NAME) {
    mongoose.connect(`mongodb://localhost/${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
    require("../models/movie");

}