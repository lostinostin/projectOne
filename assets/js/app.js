$(document).ready(function () {

$('#lyric-btn').on('click', function (){

	var userInput = $('#lyric-input').val().trim();
	var queryURL = "http://api.musixmatch.com/ws/1.1/track.search?apikey=455f0aefff3b00f8f559b6b271f6a28d&q_track=" + userInput;

	console.log(queryURL);

	//$('#gifsView').empty();
	    $.ajax({
	        url: queryURL,

	        type: "GET",

		    // Tell jQuery we're expecting JSONP
		    dataType: "jsonp xml",
		 
		    // Work with the response
		    success: function( response ) {
		        console.log( response ); // server response
		    }
	    })
	    .done(function (response) {
	    	//$.each(response, function (index, value) { <-- I couldn't get it to work using this, and idk why?
	    	for (var i=0; i<response.message.body.track_list.length; i++) {
	    		console.log(response.message.body.track_list[i]);
	    		/*var results = 
	    		$('#gifsView').append(image);*/
	    	};

	    	$('#moreGifs').show().html('more');

		});


});
	

});