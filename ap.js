const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/wiki1",{useNewUrlParser:true});
const ArticlesSchema ={
    title:String,
    contsnt:String


}
const Articles = mongoose.model("Articles",ArticlesSchema);



app.route("/articles").get(function(req,res){
    Articles.find(function(err,foundArticle){
    res.send(foundArticle);
});})

.post(function(req,res){
    const newarticle = new Articles({title:req.body.title,content:req.body.content});
        newarticle.save(function(err){
            if(!err){
                res.send("success new articles added");
            }else{
                res.send(err);
            }
        });
    })
    .delete(function(req,res){
        const newarticle = new Articles({title:req.body.title,content:req.body.content});
            newarticle.save(function(err){
                if(!err){
                    res.send("success new articles deleted");
                }else{
                    res.send(err);
                }
            });

});
app.route("/articles/:articleTitle")
.get(function(req,res){
    Articles.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("no articles mashing");
        }

    });

});


app.route("/articles/:articlesTitle")
.get(function(req,res){
    

    Articles.findOne({title:req.params.articles},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("not articles was founded");
        }
    });

});



app.listen(3000,function(){
    console.log("ap sucessfully running")
});