require("dotenv").config();
// The require package from npm. Previous install
var Spotify = require('node-spotify-api');
// The spotify key in another file to secure. 
var keys = require("./keys.js");
// Importing keys from keys.js file. 
var spotify = new Spotify(keys.spotify);

var axios = require("axios");


// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// var command = process.argv[2];
// How the user can search the song with space and another parameters. 
var liriResponse = process.argv[2];
var search = process.argv.slice(3).join(" ");

switch (liriResponse) {
  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movieInfo();
    break;
};


function spotifySong() {
  // To get the access to Spotify API. 
  spotify.search({ type: 'track', query: search, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(JSON.stringify(data, null, 3)); 

    // The main JSON Object
    var trackInfo = data.tracks.items;
    // console.log(JSON.stringify(trackInfo,null, 3));

    // Print in terminal a message for the user. 
    console.log(">>>>>Here are the first number five coincidences")
    console.log(">>>>>If you want a specific song try puting the artist name too:")
    console.log("\n-------------\n");

    // For to iterate over the object length and bring the different options.
    for (var i = 0; i < trackInfo.length; i++) {

      var artists = trackInfo[i].artists[0].name;
      var album = trackInfo[i].album.name;
      var songName = trackInfo[i].name;
      var previewLink = trackInfo[i].preview_url;

      console.log("Artist Name:  " + artists);
      console.log("Song Name: " + songName);
      console.log("Album Name:  " + album);
      console.log("Preview Link: " + previewLink);
      console.log("\n-------------\n");
    }

  });

};

function movieInfo() {
 
 
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        // console.log(response);
        // console.log(response.data.Ratings);

        console.log("Title of the movie:  " + response.data.Title);
        console.log("year came out: " + response.data.Year);
        console.log("IMDB Rating:  " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes:  " + response.data.Ratings[1].Value);
        console.log("Country:  " + response.data.Country);
        console.log("Language:  " + response.data.Language);
        console.log("Plot:  " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }
    );

};