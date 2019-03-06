# liri-node-app

##Overview

LIRI is a node application which allows users to make queries for data about concert events, movies, and songs. There are four command options:
	+ concert-this
	+ spotify-this-song
	+ movie-this
	+ do-what-it-says

A command is given to Liri in the format of: `node liri <command name> <song/band name>`

All commands and their terminal output are logged in a file called log.txt. 
Demonstration of the app available in video format at: https://drive.google.com/file/d/1gyC2MWoNLb6cTbuV04Z350f_w4BEnEKo/view

###Concert-this
	
The concert-this command makes a request to the Bands In Town API for the requested band/artist. It then retrieves and prints information for:
	+ Venue Name
	+ Venue Location
	+ Date of the Event

If there are multiple events for the requested band/artist, this information will be displayed for all retrieved events. If there are no scheduled events, LIRI will display an error message stating that there are no events upcoming. 

###Spotify-this-song

The spotify-this-song command makes a request to the Spotify API for the requested song using the node-spotify-api package. A song may be requested as just the song title, or as the song title along with the artist name. It then retrieves and prints information for:
	+ Artist(s)
	+ Name of the song
	+ The preview link for the song on Spotify
	+ The album from which the song is derived

If the user does not specify a song name, the command will automatically retrieve and print information for "The Sign" by Ace of Base. 

###Movie-this

The movie-this command makes a request to the OMDB API via the axios package. It then retrieves and prints information for:
	+ Movie title
	+ Release year
	+ IMDB rating
	+ Rotten tomatoes rating
	+ Production country
	+ Movie language(s)
	+ Plot summary
	+ Actors

If the user does not specify a movie, the command will automatically retrieve and print information for the movie "Mr. Nobody". 

###Do-what-it-says

The do-what-it-says command reads information from a separate file called random.txt. Random.txt contains a command and a song/band/movie to retrieve data for. The command and the song/band/movie are separated in the file by a single comma. 

Based on whichever command is listed in the file, the do-what-it-says command then calls and executes the appropriate function to retrieve data on the file-listed song/band/movie. 



