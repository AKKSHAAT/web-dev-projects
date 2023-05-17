const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

// schema of item
const itemsSchema = {
  name : String
};

const Item = mongoose.model("item",itemsSchema);

// schema of Lists
const ListSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("list", ListSchema);



let def1 = new Item({
  name: "click + button to add new item"
});
let def2 = new Item({
  name: "<-- click this to delete an item"
});
const defaultArray = [def1,def2];


app.get("/", async function(req, res) {     // in home
  const items = [];
  try{
    let data = await Item.find({});   //find item from db

    data.forEach( (data)=>
    {
      items.push(data);         //push item in arr
    });
    console.log(items.length);

    // if(data.length === 0){             // agar arr = khali
    //     Item.insertMany(defaultArray);     // we push 2 item in db and redirect(refresh)
    //     res.redirect("/");
    // }
    // else{
      res.render("list", {listTitle: "Today", newListItems: items});      // verna we load normal items
    // }
  }

  catch(err){
    res.render("list", {listTitle:":( Error while connecting to the Database", newListItems: items} );
    console.log(err);
  }

});

app.post("/", async function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list;

    let task = new Item({
      name:item})

    if(listName === "Today") {
      try{
        task.save();
      }
      catch(err){
        console.log(err);
      }
      res.redirect("/");
    } else {
      let foundList = await List.findOne({name: listName});
      try{
        foundList.items.push(task);
        foundList.save()
      }
      catch(err){
        console.log("ERROR! "+ err);
      }
      res.redirect("/" + listName); 
    }
});

app.post("/delete", async function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.ListName;

    if (listName === "Today") {
      try {
        const result = await Item.deleteOne({_id: checkedItemId});
        res.redirect("/"); 
      } 
      catch (error) {
        console.log(error);
        res.redirect("/");
      }
    }  
    else{
        const itemToDelete = await List.findOneAndUpdate( {name : listName}, {$pull: {items: {_id: checkedItemId} } } )
        .then(()=>{
          console.log("DELETED!");
          res.redirect("/" + listName);
        })
        .catch ((err)=>{
        console.log("ERROR WHILE DELETING!: "+checkedItemId +err); })
      }
    }

);


app.get("/:ListName", async function(req,res){
  const customListName = _.capitalize(req.params.ListName); 

  try {
    const result = await List.findOne( {name: customListName} )
    .then((result)=>{
      if (!result) {    // Adding if list does not exist
        const list = new List({
          name: customListName ,
          items: defaultArray });
    
        list.save(); 
        console.log("ADDED!");
        res.redirect("/"+customListName);
      } 
      else {
        res.render("list", {listTitle: result.name, newListItems: result.items}); 
      };
    })

  } catch (error) {  
    console.log("ERROR Finding List" + error);
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


