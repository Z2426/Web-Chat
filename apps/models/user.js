var connect = require("../common/ConnectionDB");
var q = require("q");

var conn = connect.getConnection();

function addUser(user){
    if(user){
        var defer = q.defer();

        var query = conn.query('INSERT INTO user SET ?',user,function(err,result){
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
    addUser:addUser
};