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

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // Kiểm tra email không đúng cấu trúc or mật khẩu trống
        if(!filter.test(user.email) || user.password.trim().length == 0){
            var err = {
                message: "Wrong email or password",
                error: true
            }
            res.render("register",{data:err});
        }

        var passs = hashpass.hashPass(user.password);

        var semail = user_model.searchEmail(user.email);

        semail.then(function(data){
            var save = data[0];
            if(save){
            var err = {
                message: "Email already exists",
                error: true
            }
             res.render("register",{data:err});
            }
            else{
                var adduser = {
                    email: user.email,
                    pass: passs,
                    create_time: new Date(),
                    update_time: new Date()
                }
        
                var result = user_model.addUser(adduser);
    
             // Thông báo kết quả khi thêm vào CSDL success hay ko
            result.then(function(data){
                var err = {
                    message: "Successful account registration",
                    error: true
                }
                res.render("register",{data:err});
            }).catch(function(err){
                var erro = {
                    message: "Error",
                    error: true
                }
                res.render("register",{data:erro});
            });
    }
        }).catch(function(err){
            var erro = {
                message: "Error",
                error: true
            }
            console.log(err);
            res.render("register",{data:erro});
        });
    });

module.exports = router;