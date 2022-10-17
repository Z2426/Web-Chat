var connect = require("../common/ConnectionDB");
var q = require("q");

var conn = connect.getConnection();

function account_valid(user) {
    var email = user.email;
    var pass_login = user.password;
    console.log(`${email} ${pass_login}`)
    if (user) {
        var defer = q.defer();
        var data = 0;
        var command = `SELECT count(*) FROM webchat.user where 
        email=${email} and pass=${pass_login};`
        console.log(command);
        var query = conn.query(command, function(err, rows, fields) {
            if (err) throw err;
            console.log('Query result: ', rows.length);
        });



    }

    function addUser(user) {
        if (user) {
            var defer = q.defer();

            var query = conn.query('INSERT INTO user SET ?', user, function(err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
            return defer.promise;
        }
        return false;
    }

    module.exports = {
        addUser: addUser,
        account_valid: account_valid
    };