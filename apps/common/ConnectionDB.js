var config = require("config");
var mysql = require("mysql2");

// tao ket noi voi mysql
var connection = mysql.createConnection({
    host: config.get("mysql.host"),
    user: config.get("mysql.user"),
    password: config.get("mysql.password"),
    database: config.get("mysql.database"),
    port: config.get("mysql.port")
});

connection.connect();

//kiem tra xem co ket noi chua, neu chua ket noi thi` ket noi lai--------------
function getConnection() {
    if (!connection) {
        connection.connect();
    }
    return connection;
};

module.exports = {
    getConnection: getConnection
}