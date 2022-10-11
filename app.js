var express = require("express");
var config = require("config");
var http = require("http");

var app = express();
//var host = config.get(server.host);
var port = config.get("server.port");

/// test run
var server = http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("Hello");
    res.end();
});

server.listen(port,function(){
   console.log("Server is running"); 
});