function scrollToAnchor(aid){
		console.log('hit');
	    var aTag = $("a[name='"+ aid +"']");
	    $('html, body').animate({scrollTop: aTag.offset().top},'slow');
	}

$(document).ready(function () {
<<<<<<< Updated upstream
var genreObj = {};
=======




	var genreObj = {Miscellaneous: []};
	
>>>>>>> Stashed changes

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

	    	// var genreArray = [];
	    	//var genreObj = {};

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

<<<<<<< Updated upstream
		    			
=======
		    		//If the genre doesn't exist: creates new button for that genre and property for that genre in genreObj with
		    		//an array of arrays containing the current trackID and spotifyID
		    		if (genreBool) {
				    	var genre = $('<button class="genre btn btn-default btn-block btn-lg" id=' + genreName + '>' + genreName + '</button>');
				    	$('#genreButtons').append(genre);
				    	genreObj[genreName] = [[trackID, spotifyID, trackName, trackArtist]];
>>>>>>> Stashed changes
		    		}
		    		// console.log(response[i]);
		    		// console.log(genreName);

		    		 if (genreBool) {
			    	 	var genre = $('<button class="genre">' + genreName + '</button>');
			    	 	$('#genreButtons').append(genre);
			    	 	//genreArray.push(genreName);
			    	 	genreObj[genreName] = [response.message.body.track_list[i].track.track_id];
			    	 	
		    		 }
	    		
	    		};
	    	} 
<<<<<<< Updated upstream
=======
	    	var miscButton = $('<button class="genre btn btn-default btn-block btn-lg" id="Miscellaneous">Miscellaneous</button>');
	    	$('#genreButtons').append(miscButton);
>>>>>>> Stashed changes
	    	console.log(genreObj);
	    	
	    };
<<<<<<< Updated upstream

=======
	    scrollToAnchor('gButtons');
	    return false;
	    
	});

	$(document).on('click', '.genre', function(){
		$('#results').empty();
>>>>>>> Stashed changes


});

$('#genreButtons').on('click', function(){

});

<<<<<<< Updated upstream
=======
			$.ajax({
	        url: queryURL,
	        method: "GET",
	        dataType: 'jsonp',
	        data: {
		        format: "jsonp",
		        callback: 'jsonpCallbackFinal',
		        apikey: '455f0aefff3b00f8f559b6b271f6a28d',
		        track_id: pickedTrackList[i][0]
		    }
	    })
			window.jsonpCallbackFinal = function(response) {
				var trackLyrics = response.message.body.lyrics.lyrics_body;
				var parsedTrackLyrics = trackLyrics.replace(/\n/g,"<br />");
				$('#results').append("<div><h2>" + pickedTrackList[counter][2] + " by " + 
					pickedTrackList[counter][3] + "</h2><iframe src='https://embed.spotify.com/?uri=spotify:track:" + 
					pickedTrackList[counter][1] + "' frameborder='0' allowtransparency='true'></iframe><p>" + 
					parsedTrackLyrics + "</p></div>");
				counter++;
			}
		}
		scrollToAnchor('lyricResults');
	});
>>>>>>> Stashed changes
});

	

