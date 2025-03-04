const express = require("express");
const app = express();
const ejs = require("ejs");
require("dotenv").config();

const port = 4158;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/images", express.static("./public/images"));
app.use("/three", express.static(__dirname + "/node_modules/three/build/"));
app.use("/three/examples", express.static(__dirname + "/node_modules/three/examples/"));


app.get('/', (req, res) => {

    res.render("terminal");
});

app.get("/planet", (req, res) => {

    res.render("planet");
});

app.listen(port, () => {
    console.log("Node application listening on port " + port);
});