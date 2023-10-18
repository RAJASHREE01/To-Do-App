import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://user:pass@cluster0.lyg7lci.mongodb.net/?retryWrites=true&w=majority");

const itemsSchema  = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "code"
});

const item2 = new Item({
    name: "make pull request"
});

const defaultItems = [item1, item2]

const listSchema = {
    name: String,
    items: [defaultItems]
}

// const List = mongoose.model("List", listSchema)

app.get("/", (req, res) => {
    Item.find({}).then(function(foundItem){
        console.log(foundItem)
        
        res.render("index", {listTitle: "Today", newListItems: foundItem});
  })
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})