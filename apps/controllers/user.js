var express = require("express");
var user_model = require("../models/user.js");
var handle = require("../helpers/handleString.js");
var fs = require("fs");
const e = require("express");
var router = express.Router();

router.get("/",function(req,res){
    var info = req.session.username;// lưu thông tin của user khi đăng nhập
    var user = user_model.searchEmail(info.email);
    user.then(function(result){
        var data_user = result[0];
        var searchidGeneral = user_model.searchidGeneral(data_user.id);
        searchidGeneral.then(function(test){
            var params = test[0];
            if(params == undefined){
                var general = user_model.addGeneral(data_user.id);   
                general.then(function(answer){
                    res.render("info_user/index",{data:data_user});
                }).catch(function(err){
                    res.json({Error:err});
                });
            }
            else{
                res.render("info_user/index",{data:data_user});
        }
        }).catch(function(err){
            res.json({Error:err});
        });
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
    if(infor.notice == "favorite"){ // Xử lý phần general infor updated
        var data = {
            education: infor.education,
            hobbies: infor.hobbies,
            interest: infor.interest,
            work: infor.work,
            id_user: infor.id
        }
        var general = user_model.updateGeneral(data);
        general.then(function(result){
            res.json({status_code: 200});
        }).catch(function(err){
            res.json({status_code: 500});
        });
    }
    else{ // Xử lý phần profile updated
    //update tất cả các thông tin bao gồm cả ảnh
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
    //update tất cả các thông tin ko có ảnh
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