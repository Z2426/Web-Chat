var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var controller = require(__dirname + "/apps/controllers");

var app = express(); // express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// tro? ve` folder chua file ejs
app.set("views",__dirname + "/apps/views");
app.set("view engine","ejs");

//cấu hình static folder
app.use("/static",express.static(__dirname + "/public"));

app.use(controller); // controller

//var host = config.get(server.host);
var port = config.get("server.port");

app.listen(port,function(){
   console.log("Server is running"); 
});
