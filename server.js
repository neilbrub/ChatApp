var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var port = 8080;

app.use(express.static('Client'));

var io = require('socket.io')(server);

io.on('connection', function(socket){
	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});

server.listen(port, function() {
	console.log("Chat server running on port " + port + "!");
});
