import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})