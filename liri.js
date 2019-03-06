require("dotenv").config();
var fs = require("fs"); 
var request = require("request"); 
var moment = require("moment"); 
var Spotify = require('node-spotify-api'); 
var axios = require("axios"); 
var keys = require("./keys.js"); 
var spotify = new Spotify(keys.spotify); 

function concertThis(flag, str){
	bandName = process.argv.slice(3).join(" ").trim(); 
	if(flag) bandName = str.slice(1, str.length-2); 
	var url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"; 

	request(url, function(error, response, body){
		if(JSON.parse(body).length==0){ 
			console.log("\nSorry, no events for " + bandName + "\n");
		} 
		for(var i=0; i<JSON.parse(body).length; i++){
			var date = moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY");  
			var venue = JSON.parse(body)[i].venue.name; 
			var location = JSON.parse(body)[i].venue.country; 
			console.log("\n* Venue name: " + venue); 
			if(location == "United States"){
				console.log("* Venue location: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region + ", " + location); 
			}else{
				console.log("* Venue location: " + JSON.parse(body)[i].venue.city + ", " + location); 
			}
			console.log("* Event date: " + date + "\n");
		}
	});
}

function spotifyThis(flag, str){
	var song = process.argv.slice(3).join(" ").trim(); 
	if(song == "") song = "The Sign Ace of Base"; 
	if(flag) song = str; 

	spotify.search({type: 'track', query: song}, function(err, data){
		if(err) return console.log("Error: " + err); 
		var artists = ""; 
		for(var i = 0; i<data.tracks.items[0].artists.length; i++){
			artists += data.tracks.items[0].artists[i].name; 
			if(i!=data.tracks.items[0].artists.length-1) artists += ", "; 
		}
		console.log("\n* Artist(s): " + artists); 
		console.log("* Song name: " + data.tracks.items[0].name); 
		console.log("* Spotify link: " + data.tracks.items[0].preview_url); 
		console.log("* From album: " + data.tracks.items[0].album.name + "\n"); 
	}); 
}

function movieThis(flag, str){
	var movie = process.argv.slice(3).join(" ").trim(); 
	if(movie == "") movie = "Mr. Nobody"; 
	if(flag) movie = str; 

	axios({
		method:'get',
		url: "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy",
	}).then(function(response){
		var rottenTomatoes = response.data.Ratings.find(item => item.Source === 'Rotten Tomatoes'); 
		if(rottenTomatoes == undefined){
			rottenTomatoes = "N/A"; 
		} else{
			rottenTomatoes = rottenTomatoes.Value; 
		}
		console.log("\n* Movie Title: " + response.data.Title); 
		console.log("* Release Year: " + response.data.Year); 
		console.log("* IMDB Rating: " + response.data.imdbRating); 
		console.log("* Rotten Tomatoes Rating: " + rottenTomatoes); 
		console.log("* Country of Production: " + response.data.Country); 
		console.log("* Movie Language(s): " + response.data.Language); 
		console.log("* Plot Summary: " + response.data.Plot); 
		console.log("* Actors: " + response.data.Actors + "\n"); 
	});
}

function doIt(){
	var contents = fs.readFileSync("random.txt", "utf8").split(","); 
	switch(contents[0]){
		case "concert-this":
		concertThis(true, contents[1]); 
	break; 

	case "spotify-this-song":
		spotifyThis(true, contents[1]); 
	break; 

	case "movie-this":
		movieThis(true, contents[1]);
	break; 
	}
}

// ### BONUS

	// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

	// * Make sure you append each command you run to the `log.txt` file. 

	// * Do not overwrite your file each time you run a command.


switch(process.argv[2].toLowerCase()){
	case "concert-this":
		concertThis(); 
	break; 

	case "spotify-this-song":
		spotifyThis(); 
	break; 

	case "movie-this":
		movieThis();
	break; 

	case "do-what-it-says":
		doIt();
	break; 
}
