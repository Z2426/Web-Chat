var connect = require("../common/ConnectionDB");
var q = require("q");

var conn = connect.getConnection();

function addUser(user){
    if(user){
        var defer = q.defer();

        var query = conn.query("INSERT INTO user SET ?",user,function(err,result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
       return defer.promise;
    }
    return false;
}

function searchEmail(email){
    if(email){
        var defer = q.defer();

        var query = conn.query('SELECT * FROM user WHERE ?',{email : email},function(err,result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function searchid(id){
    if(id){
        var defer = q.defer();

        var query = conn.query('SELECT * FROM user WHERE ?',{id : id},function(err,result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

// add information for user
// function addinfor(infor){
//     if(infor){
//         var defer = q.defer();
//         var query = conn.query("INSERT INTO profile_edit SET ?",infor,function(err,result){
//             if(err){
//                 defer.reject(err);
//             }
//             else{
//                 defer.resolve(result);
//             }
//         });
//         return defer.promise;
//     }
//     return false;
// }

//update infor
function updateuser(data){
    if(data){
        var defer = q.defer();

        var query = conn.query("UPDATE user SET gender = ?, about = ?, location = ?, country = ?, display_name = ?, update_time = ?, image = ?, occupation = ? WHERE id = ?",
        [data.gender,data.about,data.location,data.country,data.display_name,data.update_time,data.avatar,data.occupation,data.id],function(err,result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

// update infor No images
function updateusernoimage(data){
    if(data){
        var defer = q.defer();

        var query = conn.query("UPDATE user SET gender = ?, about = ?, location = ?, country = ?, display_name = ?, update_time = ?, occupation = ? WHERE id = ?",
        [data.gender,data.about,data.location,data.country,data.display_name,data.update_time,data.occupation,data.id],function(err,result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    addUser:addUser,
    searchEmail: searchEmail,
    searchid: searchid,
    updateuser: updateuser,
    updateusernoimage: updateusernoimage
};