const express = require("express"),
    app = express(),
    path = require("path"),
    DB_NAME = "moviedb",
    port = 8000,
    cors = require("cors");

app.get("/", (req, res, next) => {
    res.redirect("/movies");
})

app.use(express.static(__dirname + "/client/build"))
app.use(express.json());
app.use(cors());

require("./utils/mongoose")(DB_NAME)
require("./utils/routes")(app)

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/build/index.html'));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});