const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const res = require("express/lib/response");
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

})
.put(function(req, res){
    Articles.updateMany({title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        {overwrite: true},function(err){
            if(!err){
                res.send("successfully update articles");
            }
        });
}).patch(function(req,res){
    Articles.updateOne({title:req.params.articleTitle},{$set:req.body},function(err){
        if(!err){
            res.send("success full patch")
        }

    });
}).delete(function(req, req){
    Articles.deleteOne({title:req.params.articleTitle},function(err){
        if(!err){
            res.send("sucees deleted");s
        }else{
            res.send(err);
        }
    });
});


    

    
app.listen(3000,function(){
    console.log("ap sucessfully running")
});