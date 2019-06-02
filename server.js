var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(express.urlencoded({ extended:  true }));

app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));

app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);
console.log("made it here passed the router.");
// Starting the server to listen on the port
app.listen(PORT, function() {
    console.log("server listening on:  http://localhost:" + PORT);
});