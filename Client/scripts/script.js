function stripeHistory(){
	$('ol.history > li:odd').addClass('oddItem');
	$('ol.history > li:even').addClass('evenItem');
	return;
}

jQuery(function($){

	stripeHistory();

});

var socket = io();

$('form').on('submit', function(){
	var text = $('#message').val();
	$('#message').val("");
	socket.emit("message", text);
	return false;
});

socket.on('message', function(msg){
	$('#chatHistory').append('<li>' + msg + '</li>');
	stripeHistory();
});

