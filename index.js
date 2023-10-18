import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin:hS4JfB9mrw9i1LYy@cluster0.lyg7lci.mongodb.net/?retryWrites=true&w=majority");

const itemsSchema  = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);



const listSchema = {
    name: String,
    items: []
}

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
    Item.find({}).then(function(foundItem){
        
        res.render("index", {listTitle: "Today", newListItems: foundItem});
  })
})

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item ({
        name : itemName
    });

    if(itemName == "Today"){
        item.save().then(function(){
            console.log('saved');
            res.redirect("/");
        })
    } else {
        List.findOne({name: listName}).then(function(foundList) {
            if(foundList){
                foundList.items.push(item);
                foundList.save().then(function(){
                    console.log("saved to "+listName);
                    res.redirect("/" + listName);
                });
            }
        })
    }
})

app.post("/delete", (req, res ) => {
    const checkedbox = req.body.checkbox;
    const listName = req.body.listName;

    if(listName == "Today"){
        Item.findByIdAndDelete(checkedbox).then(function(){
            console.log("deleted");
            res.redirect("/");
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull : {items: {_id:checkedbox}}}).then(function( found) {
            console.log(listName);
            console.log("deleted");
            res.redirect("/"+listName);
        })
    }
    
})


app.get("/:customListName", (req, res) => {
    const customListName = req.params.customListName;

    List.findOne({name: customListName}).then(function( found)  {
        if(!found){
            const list = new List({
                name: customListName, 
                items: []
            });
            list.save().then(function() {
                console.log("saved in custom");
                res.redirect("/"+customListName);
            });
            
        }else {
            res.render("index", {listTitle: found.name, newListItems: found.items});
        }
        })
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})