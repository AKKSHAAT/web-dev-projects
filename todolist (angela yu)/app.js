const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();
const PORT = 3000;
var item = "";
var items = [];
let workItems = [];

const day = date.getDay();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    
    res.render("list", {ListTitle:day , newListItem:items });

});

app.post("/", (req,res) => {
    item = req.body.newItem;
    // console.log(req.body.List);
    if(req.body.List === 'Work List'){
        workItems.push(item);
        res.redirect("work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req,res)=>{
    res.render("list", {ListTitle: "Work List", newListItem:workItems });
});
app.post("/work", (req,res) =>{
    item = req.body.newItem;

    workItems.push(item);
    
    res.redirect("work");
})


app.get("/about", (req, res)=>{
    res.render("about")
})


app.listen(PORT, () => {
    console.log("server is running at port: "+PORT);
});