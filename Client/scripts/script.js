function stripeHistory(){
	$('ol.history > li:odd').addClass('oddItem');
	$('ol.history > li:even').addClass('evenItem');
	return;
}

jQuery(function($){

	$('#heading').text("JS Time!");
	$('#p1').text(gridSize(GRID));

	stripeHistory();

	$('form').on('submit', function(){
		$('#chatHistory').append('<li>' + $('#message').val() + '</li>');
		stripeHistory();
		$('#message').val("");
		return false;
	})
});