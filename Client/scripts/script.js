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
	var text = $('#message').val(); //Grab user's comment
	if(text != ""){
		$('#message').val(""); //Clear the text input area
		socket.emit("message", text);
		socket.emit("another_thing");
	}
	return false;
});

socket.on('message', function(msg){
	$('#chatHistory').append('<li>' + msg + '</li>'); //Add the new comment!
	stripeHistory();
});

socket.on('another_thing', function(){
	console.log("And another thing!");
});
