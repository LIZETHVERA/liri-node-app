require("dotenv").config();
// The require package from npm. Previous install
var Spotify = require('node-spotify-api');
// The spotify key in another file to secure. 
var keys = require("./keys.js");
// Importing keys from keys.js file. 
var spotify = new Spotify(keys.spotify);

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
