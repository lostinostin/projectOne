$(document).ready(function () {

var genreObj = {};


$('#lyric-btn').on('click', function (){

	userInput = $('#lyric-input').val().trim();
	$('#lyric-input').val("");
	var queryURL = "http://api.musixmatch.com/ws/1.1/track.search";

	console.log(queryURL);

	//$('#gifsView').empty();
	    $.ajax({
	        url: queryURL,

	        method: "GET",

	        dataType: 'jsonp',
	        data: {
		        format: "jsonp",
		        callback: 'jsonpCallback',
		        apikey: '455f0aefff3b00f8f559b6b271f6a28d',
		        q_track: userInput
		    }
	    });

	    window.jsonpCallback = function(response) {
	    	console.log(response);
	    	$('#genreButtons').empty();



	    	for (var i=0; i<response.message.body.track_list.length; i++) {

	    		if (response.message.body.track_list[i].track.primary_genres.music_genre_list.length > 0) {

	    		var genreName = response.message.body.track_list[i].track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
	    		var genreBool = true;
	    		

		    		// for (var j=0; j < genreArray.length; j++) {
		    		// 	if (genreArray[j] === genreName) {
		    		// 		genreBool = false;
		    		// 	}
		    		// }
		    		for (var prop in genreObj){
		    			if (genreObj.hasOwnProperty(prop)){
		    				if(prop === genreName){
		    					genreBool = false;
		    					genreObj[prop].push(response.message.body.track_list[i].track.track_id);
		    				}

		    			}

		    			
		    		}
		    		// console.log(response[i]);
		    		// console.log(genreName);

		    		 if (genreBool) {
			    	 	var genre = $('<button class="genre" onclick="getButton()">' + genreName + '</button>');
			    	 	$('#genreButtons').append(genre);
			    	 	//genreArray.push(genreName);
			    	 	genreObj[genreName] = [response.message.body.track_list[i].track.track_id];
			    	 	
		    		 }
	    		
	    		};
	    	} 
	    	console.log(genreObj);
	    	
	    };



});

//$('#genreButtons').on('click', function(){

//});

});

	

