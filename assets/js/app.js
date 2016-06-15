$(document).ready(function () {

	var genreObj = {};
	var queryURL;
	var genreyName;
	var track;
	var genreBool;
	var genre;
	var genreClicked;
	var j;
	var trackIdArray = [];
	var trackID;
	var trackName;
	var trackDiv;

	$('#lyric-btn').on('click', function (){
		$('#results').empty();
		trackIdArray = [];
		userInput = $('#lyric-input').val().trim();
		$('#lyric-input').val("");
		queryURL = "http://api.musixmatch.com/ws/1.1/track.search";

		console.log(queryURL);

	    $.ajax({
	        url: queryURL,

	        method: "GET",

	        dataType: 'jsonp',
	        data: {
		        format: "jsonp",
		        callback: 'jsonpCallback',
		        apikey: '455f0aefff3b00f8f559b6b271f6a28d',
		        // Changed from q_track to q_lyrics
		        q_lyrics: userInput
		    }
	    });

	    window.jsonpCallback = function(response) {

	    	console.log(response);
	    	$('#genreButtons').empty();
	    	

	    	for (var i=0; i<response.message.body.track_list.length; i++) {

	    		if (response.message.body.track_list[i].track.primary_genres.music_genre_list.length > 0) {

		    		genreName = response.message.body.track_list[i].track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
	    			track = response.message.body.track_list[i].track.track_id
	    		 	genreBool = true;

	    			// Iterates over the properties of the object
	    			// This won't run if the property isn't in the object
		    		for (var prop in genreObj){
		    			// Initial condition to begin checking if a property is in genreObj
		    			if (genreObj.hasOwnProperty(prop)) {
		    				// If a property exists in the object that is equal to genreName 
		    				if (prop === genreName) {
		    					genreBool = false;
		    					genreObj[prop].push(track);
		    				}
		    			}
		    		}

		    		// console.log(response[i]);
		    		// console.log(genreName);

		    		if (genreBool) {
			    	 	genre = $('<button id="'+ genreName + '" class="genre btn btn-secondary btn-block">' + genreName + '</button>');
			    	 	$('#genreButtons').append(genre);
			    	 	genreObj[genreName] = [track];

		    		}
	    		
	    		};
	    	} 	    	
	    };
	});

	$('#genreButtons').on('click', 'button', function(e){
		$('#results').empty();
		trackIdArray = [];
		genreClicked = e.target.id;
		console.log(genreClicked);
		console.log(genreObj);

		/*-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

		You can loop through the object properties like Josh did. You can also do it with the 
		jQuery.each() funciton as seen below. Either one works :D
	
		// for (var prop in genreObj) {
		// 	if (genreClicked === prop) {
		// 		alert(genreObj[prop]);
		// 	}
		// }

		-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_*/

		$.each(genreObj, function(key, element) {

			if (genreClicked === key) {
				for (j=0; j<element.length; j++) {
					trackID = element[j];
					trackIdArray.push(trackID);
					//$('#results').append(trackIdArray + " ");

				}
				
			}

		}); 

		// The following code needs to run FOR EACH object in the trackIdArray so an ajax call is made for each track_id

		for(var k = 0; k < trackIdArray[k]; k++) {
			console.log(trackIdArray[k]);

			queryURL = "http://api.musixmatch.com/ws/1.1/track.get";
			console.log(queryURL);

			    $.ajax({
			        url: queryURL,

			        method: "GET",

			        dataType: 'jsonp',
			        data: {
				        format: "jsonp",
				        callback: 'jsonpCallback',
				        apikey: '455f0aefff3b00f8f559b6b271f6a28d',
				        track_id: trackIdArray[k]
				    }
			    });

		    window.jsonpCallback = function(response) {
		    	console.log(response);

		    	trackName = response.message.body.track.track_name;
		    	var 
		    	trackDiv = ('<div class="container"><div class="row"><div>' + trackName);
		    	$('#results').append(trackDiv);
		    	console.log(trackName);
			    

		    };
		}
		
	}); 

	

		

});