require("dotenv").config();
var fs = require("fs"); 
var request = require("request"); 
var moment = require("moment"); 
var Spotify = require('node-spotify-api'); 
var keys = require("./keys.js"); 
var spotify = new Spotify(keys.spotify); 

function concertThis(){
	bandName = process.argv.slice(3).join(" ").trim(); 
	var url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"; 

	request(url, function(error, response, body){
		if(JSON.parse(body).length==0){ 
			console.log("Sorry, no events for " + bandName);
		} 
		for(var i=0; i<JSON.parse(body).length; i++){
			var date = moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY");  
			var venue = JSON.parse(body)[i].venue.name; 
			var location = JSON.parse(body)[i].venue.country; 
			console.log("Venue name: " + venue); 
			if(location == "United States"){
				console.log("Venue location: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region + ", " + location); 
			}else{
				console.log("Venue location: " + JSON.parse(body)[i].venue.city + ", " + location); 
			}
			console.log("Event date: " + date + "\n");
		}
	});
}

function spotifyThis(){

	// `node liri.js spotify-this-song '<song name here>'`

 //   * This will show the following information about the song in your terminal/bash window

 //     * Artist(s)

 //     * The song's name

 //     * A preview link of the song from Spotify

 //     * The album that the song is from

 //   * If no song is provided then your program will default to "The Sign" by Ace of Base.

}

function movieThis(){

	// `node liri.js movie-this '<movie name here>'`

 //   * This will output the following information to your terminal/bash window:

 //     ```
 //       * Title of the movie.
 //       * Year the movie came out.
 //       * IMDB Rating of the movie.
 //       * Rotten Tomatoes Rating of the movie.
 //       * Country where the movie was produced.
 //       * Language of the movie.
 //       * Plot of the movie.
 //       * Actors in the movie.

 	// * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

}

function doIt(){

	// `node liri.js do-what-it-says`

	//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

	//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

	//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

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
