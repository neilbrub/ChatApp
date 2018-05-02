var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var port = 8080;

app.use(express.static('Client'));

var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log("A user connected!");

	socket.on('message', function(msg){
		io.emit('message', msg);
	});
	
	socket.on('disconnect', function(socket){
		console.log("A user disconnected!")
	});
});

server.listen(port, function() {
	console.log("Chat server running on port " + port + "!");
});
