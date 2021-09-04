const express = require("express");
const path = require("path");
const app = express();

const Port = process.env.PORT || 3002;


// constants
var public = path.join(__dirname, "/public");


app.use(express.static(public));
// GET Request
app.get("/", (req, res) => {
    res.sendFile(public + "/index.html");
})



// POST Request
app.listen(Port, () => {
    console.log("app")
})