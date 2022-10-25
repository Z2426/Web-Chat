var express = require("express");
var user_model = require("../models/user.js");
var handle = require("../helpers/handleString.js");

var router = express.Router();

router.get("/",function(req,res){
    var info = req.session.username;
    var user = user_model.searchEmail(info.email);
    user.then(function(result){
        var data_user = result[0];
        res.render("info_user/index",{data:data_user});
    }).catch(function(err){
        res.json({Error:err});
    });
});

router.get("/edit/:id",function(req,res){
    var id = req.params.id;
    var user = user_model.searchid(id);
    user.then(function(result){
        var data_user = result[0];
        res.render("info_user/edit",{data:data_user});
    }).catch(function(err){
        res.json({Error:err});
    });
});

router.put("/edit",function(req,res){
    var infor = req.body;
    var string = infor.name;
    var params = {
        first_name: string.slice(0,handle.CountSpacefirst(string)),
        last_name: string.slice(handle.CountSpacefirst(string) + 1),
        gender: infor.gender,
        about: infor.about,
        location: infor.location,
        country: infor.country,
        id: infor.id
    }

    var infor_update = user_model.updateuser(params);

    infor_update.then(function(result){
        res.json({status_code: 200});
    }).catch(function(err){
        res.json({status_code: 500});
    });

});
module.exports = router;