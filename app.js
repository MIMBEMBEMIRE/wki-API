const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/wiki1",{useNewUrlParser:true});

const articlesSchema = {title:String,content:String};
const Articles = mongoose.model("articles", articlesSchema);



app.get("/articles",function(req,res){
    Articles.find(function(err,foundArticle){
    res.send(foundArticle);

    });
    
});
app.post("/articles",function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);
    const newarticle = new Articles({title:req.body.title,content:req.body.content});
    newarticle.save();
   
    
});


app.listen(3000,function(){
    console.log("the server is running sucess full")
});