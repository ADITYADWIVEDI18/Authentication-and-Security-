//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()

app.use(express.static("public"))   //used to access local files
app.set('view engine' , 'ejs')      //used for express js where all ejs files stored in by default 'views' folder
app.use(bodyParser.urlencoded({extended:true})) 


// Connect to database server also create userDB database.
mongoose.connect("mongodb://localhost:27017/userDB" , {useNewUrlParser:true}); 


app.get("/",function(req,res){
    res.render("home");
})

app.get("/login",function(req,res){
    res.render("login");  
})

app.get("/register",function(req,res){
    res.render("register");
})

// Schema of User Database
const userSchema = {
    email : String ,
    password: String
};

// User model
const User = new mongoose.model("User",userSchema);

// Post Route

app.post("/register" , function(req,res){

    // Create new user item in userDB database
    const newUser = new User({
        email:req.body.email,
        password:req.body.password
    })

    // Save the above in userDB database
    newUser.save(function(err){
        if(err){console.log(err);}
        else{res.render("secrets");}
    })

})

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
        if(err){console.log(err);}
        else{
            if(foundUser){
                if(foundUser.password===password){
                    res.render("secrets");
                }
            }
        }
    });
});

app.listen("3000" , function(req,res){
    console.log("Started Port 3000");
})
