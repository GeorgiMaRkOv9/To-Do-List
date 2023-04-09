const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let itemArray = ["Buy Food", "Cook Food", "Eat Food"];

let workItemArray = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    
 let day = date();

 res.render("list", {listTitle: day, newListItemArray: itemArray});

});

app.post("/", function(req, res) {

   let item = req.body.newItem;

   if (req.body.list === "Work") {
      workItemArray.push(item);
      res.redirect("/work");
   } else {
      itemArray.push(item);
      res.redirect("/");
   };

  
});

app.get("/work", function(req, res) {
   res.render("list", {listTitle: "Work List", newListItemArray: workItemArray});
});

app.get("/about", (req, res) =>{
   res.render("about")
})

app.listen(3000, () =>{
    console.log("Server started on port 3000!");
});


