import express from "express";


const app = express();
const port = 3001;

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})