$(document).ready(function () {
	var genreObj = {Miscellaneous: []};
	var dbLoad = new Firebase("https://tipot.firebaseio.com/");
	var currentlySignedIn;

	

	$("#quickstart-sign-up").on("click", function(e){
		e.preventDefault();
		var email = $("#email").val();
		var validPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20})/;
		var password = $("#password").val();
		var testedPassword = password.match(validPassword);
		
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		
			if (email.length < 6) {
				alert('Please enter a valid email address');
				return;
			}
			if (testedPassword === null) {
				alert('Password must be at least 8 characters long include at least one number, lowercase letter, uppercase letter, special character.');
				return;
			}
		});

	});

	$("#quickstart-sign-in").on("click", function(e){

		if (firebase.auth().currentUser) {
			firebase.auth().signOut();
		} else {
		var email = $("#email").val();
		var password = $("#password").val();

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(e){
			console.log(e.message);
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Sorry, that password is incorrect')
			}
		});
		// $('.wrapper').show();
		// 		$('.demo-layout').hide(); 
		}
	});

	firebase.auth().onAuthStateChanged(function(user){
		console.log("auth Changed", user);
		currentlySignedIn = user;
		console.log(currentlySignedIn);
		if(user){
			$('.wrapper').show();
			$('.demo-layout').hide();
			firebase.database().ref("/user-counter/"+firebase.auth().currentUser.uid).once("value").then(function(data){
				console.log(data.val());
				// $('.wrapper').show();
				// $('.demo-layout').hide();
				// window.location.href = "index.html";
				
			});
		} else {

			//window.location.href = "authTest.html";
			$('.wrapper').hide();
			$('.login-page').show();
			document.getElementById('quickstart-sign-in').disabled = false;
			debugger;
		}
	});

	$("#lyric-btn").on("click", function(){
		var user = firebase.auth().currentUser;

		if(user){
			var counterKey = firebase.database().ref().child("counter").push().key;
			var updates = {};
			updates['/counter/' + counterKey] = 1;
			updates['/user-counter/' + user.uid + '/' + counterKey] = 1;

  			console.log(firebase.database().ref().update(updates));
		}
	});

	$("#sign-out").on("click", function(){
		firebase.auth().signOut();

	});

	$('#lyric-btn').on('click', function (){

		userInput = $('#lyric-input').val().trim();

		$('#lyric-input').val("");

		
		var queryURL = "http://api.musixmatch.com/ws/1.1/track.search";
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

	    		dbLoad.push({
					lyric_input: userInput,
					user: currentlySignedIn
				});

	    		if (response.message.body.track_list[i].track.primary_genres.music_genre_list.length > 0) {


		    		var genreName = response.message.body.track_list[i].track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
		    		var genreBool = true;
		    		var trackID = response.message.body.track_list[i].track.track_id;
		    		var spotifyID = response.message.body.track_list[i].track.track_spotify_id;
		    		var trackName = response.message.body.track_list[i].track.track_name;
		    		var trackArtist = response.message.body.track_list[i].track.artist_name;
	    		
	    			//Loops through genreObj properties and checks if genre already exists. If it does, sets boolean to false
	    			//and pushes new array with current trackID and spotifyID

		    		for (var prop in genreObj){
		    			// Initial condition to begin checking if a property is in genreObj
		    			if (genreObj.hasOwnProperty(prop)) {
		    				// If a property exists in the object that is equal to genreName 
		    				if (prop === genreName) {
		    					genreBool = false;
		    					genreObj[prop].push([trackID, spotifyID, trackName, trackArtist]);
		    				}
		    			}
		    		}

		    		//If the genre doesn't exist: creates new button for that genre and property for that genre in genreObj with
		    		//an array of arrays containing the current trackID and spotifyID
		    		if (genreBool) {
				    	var genre = $('<button class="genre" id=' + genreName + '>' + genreName + '</button>');
				    	$('#genreButtons').append(genre);
				    	genreObj[genreName] = [[trackID, spotifyID, trackName, trackArtist]];
		    		}
	    		}
	    		else{
	    			var trackID = response.message.body.track_list[i].track.track_id;
	    			var spotifyID = response.message.body.track_list[i].track.track_spotify_id;
	    			var trackName = response.message.body.track_list[i].track.track_name;
		    		var trackArtist = response.message.body.track_list[i].track.artist_name;
	    			genreObj.Miscellaneous.push([trackID, spotifyID, trackName, trackArtist]);
	    		}

	    		return false;
	    	} 

	    	dbLoad.on("child_added", function(snapshot) {

	    		var miscButton = $('<button class="genre" id="Miscellaneous">Miscellaneous</button>');
		    	$('#genreButtons').append(miscButton);
		    	console.log(genreObj);

			}, function (errorObject) {
				console.log("the read failed: " + errorObject.code);
			});

	    	
	    };
	});





	$(document).on('click', '.genre', function(){

		var genrePicked = $(this).attr('id'); //sets to the ID of the genreButton that was picked
		pickedTrackList = genreObj[genrePicked]; //sets to the property in genreObj that matches the button id. This is an array
		//console.log(pickedTrackList); //logs array with all of the tracks for that genre
		//console.log(pickedTrackList[0][0], pickedTrackList[0][1]); //logs the trackID and spotifyID of the first track for the picked genre
		var counter = 0;

		for (i = 0; i < pickedTrackList.length; i++){
			var queryURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get";

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
	});
});