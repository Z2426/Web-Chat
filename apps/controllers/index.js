var express = require("express");
var hashpass = require("../helpers/hashpass");
var user_model = require("../models/user");
var router = express.Router();

//router.use("/user",__dirname + "controllers/user.js");

router.get("/login",function(req,res){
    res.render("login");
});

router.get("/register",function(req,res){
        res.render("register",{data:{}});
    });

 router.post("/register",function(req,res){
        var user = req.body;
        if(user.email.trim().length == 0 || user.password.trim().length == 0){
             err = {
                message: "Cannot to blank",
                error: true
            }
            res.render("register",{data:err});
        }

        var passs = hashpass.hashPass(user.password);

        var adduser = {
            email: user.email,
            pass: passs,
            create_time: new Date(),
            update_time: new Date()
        }

        var result = user_model.addUser(adduser);

        result.then(function(data){
            var err = {
                message: "Successful account registration",
                error: true
            }
            res.render("register",{data:err});
        }).catch(function(err){
            var err = {
                message: "Error",
                error: true
            }
            res.render("register",{data:err});
        });
    });

module.exports = router;