var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var port = 8080;

app.use(express.static('Client'));

var io = require('socket.io')(server);

// Assigning connections persistent IDs
var allSockets = [];
io.on('connect', function(socket){

	var socket_id = insert(allSockets, socket);

	console.log(`\nA user connected! [id ${socket_id + 1}]`);

	socket.on('message', function(msg){
		io.emit('message', msg);
	});
	
	socket.on('disconnect', function(){
		console.log(`\nUser ${socket_id + 1} disconnected!`);
		allSockets[socket_id] = null;
		allSockets = pruneSocketList(allSockets);
	});
});

server.listen(port, function() {
	console.log("Chat server running on port " + port + "!");
});

function insert(list, item){
	var i;
	for(i = 0; i < list.length; i++){
		if(list[i] === null){
			list[i] = item;
			allSockets = list;
			return i;
		}
	}

	//List full, append new item
	list.push(item);
	allSockets = list;
	return i;
}

function pruneSocketList(socketList){
	while(socketList[socketList.length - 1] === null){
		socketList.pop();
		console.log("Popping")
	}
	return socketList;
}