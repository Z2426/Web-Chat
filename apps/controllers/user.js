var express = require("express");
var user_model = require("../models/user.js");
var handle = require("../helpers/handleString.js");
var fs = require("fs");
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
    if(infor.image_name != ""){
    var path = './public/images/user/'+ req.body.id + req.body.image_name;
    var image    = req.body.image_data;
    var data     = image.split(',')[1];
    fs.writeFileSync(path,data,{encoding:'base64'});    
    var params = {
        gender: infor.gender,
        about: infor.about,
        location: infor.location,
        country: infor.country,
        display_name: infor.name,
        update_time: new Date(),
        id: infor.id,
        occupation: infor.occupation,
        avatar: infor.id + infor.image_name
    }
    var infor_update = user_model.updateuser(params);
    infor_update.then(function(result){
        res.json({status_code: 200});
    }).catch(function(err){
        res.json({status_code: 500});
    });
    }
    else{
        var params = {
            gender: infor.gender,
            about: infor.about,
            location: infor.location,
            country: infor.country,
            display_name: infor.name,
            update_time: new Date(),
            id: infor.id,
            occupation: infor.occupation,
        }
        var infor_update = user_model.updateusernoimage(params);
        infor_update.then(function(result){
            res.json({status_code: 200});
        }).catch(function(err){
            res.json({status_code: 500});
        }); 
    }

});

router.get("/view/:id",function(req,res){
    var id = req.params.id;
    var user = user_model.searchid(id);
    user.then(function(result){
        var data_user = result[0];
        res.render("info_user/view",{data:data_user});
    }).catch(function(err){
        res.json({Error:err});
    });
});
module.exports = router;