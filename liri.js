//-------------COMMANDS IN RANDOM FILE--------------------------------//

// do-what-it-says
// spotify-this-song,I Want it That Way
// movie-this,star wars
// concert-this,madona



require("dotenv").config();
// The require package from npm. Previous install
var Spotify = require('node-spotify-api');
// The spotify key in another file to secure. 
var keys = require("./keys.js");

var moment = require('moment');
// Importing keys from keys.js file. 

var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require('fs');


//-------------COMMANDS--------------------------------//
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says



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

  case "concert-this":
    bandsInTown();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
};


function spotifySong() {

  // To get the access to Spotify API. 

  //This conditional is in case the user dont put any movie to search. We recommend Mr NoBody!
  if (!search) {
    // If the variable is diferent to search the variable now has the "Mr NoBody Name"
    search = "the day that never comes metallica";

    console.log("---> You have not entered any songs, we recommend THE DAY THAT NEVER COMES BY METALLICA!");
    console.log("---> These are the first three versions. Enjoy");

    console.log("\n-------------\n");
  } else if (search) {

    // Print in terminal a message for the user
    console.log("---> These are the first three versions. Enjoy")
    console.log("---> If you want a specific song try puting the artist name too:")
    console.log("\n-------------\n");
  };

  spotify.search({ type: 'track', query: search, limit: 3 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(JSON.stringify(data, null, 3)); 

    // The main JSON Object
    var trackInfo = data.tracks.items;
    // console.log(JSON.stringify(trackInfo,null, 3));

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

  //This conditional is in case the user dont put any movie to search. We recommend Mr NoBody!
  if (!search) {
    // If the variable is diferent to search the variable now has the "Mr NoBody Name"
    search = "Mr Nobody";

    console.log("\n---> If you want you can search for a different movie by its name");
    console.log("\n---> You have not entered any movies, we recommend Mr Nobody!\n");
  } else if (search) {
    // Print in terminal a message for the user
    console.log("\n ---> Here is the info for the movie you entered\n");
  };

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
    }).catch(function (error) {
      // handle error
      console.log(error + " --> something is wrong try again");

    }).finally(function () {
      // always executed
    });
};

function bandsInTown() {

  if (!search) {
    // If the variable is diferent to search the variable now has the " Madona concerts Name"
    search = "Madona";

    console.log("\n---> You have not entered any artist or Band, We recommend to look some Madonna concerts!");
  } else if (search) {
    // Print in terminal a message for the user

  };

  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=943e8f5b-037a-453f-84bd-a9aa28593784").then(
    function (response) {
      // console.log(JSON.stringify(response.data, null, 2));
      var concertInfo = response.data;

      if (concertInfo.length <= 0) {
        console.log("OHH!!! So sorry seems like we do not have venues for the artist you entered :( Try with another one.");
      } else {
        console.log("---> Here is the venues available\n");
      };

      for (var i = 0; i < concertInfo.length; i++) {

        var artist = concertInfo[i].artist_id;
        var artistName = concertInfo[i].lineup[0];
        var venueName = concertInfo[i].venue.name;
        var country = concertInfo[i].venue.country;
        var city = concertInfo[i].venue.city;
        var date = concertInfo[i].datetime;
        // I did not use "MM/DD/YYYY" as a format because i thing is easy to the user see the whole 
        // date and the time of the concert
        var dateMoment = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        var tickets = concertInfo[i].offers[0].url;

        console.log("Artist ID:  " + artist);
        console.log("Artist Name:  " + artistName);
        console.log("Venue Name:  " + venueName);
        console.log("Country: " + country);
        console.log("City:  " + city);
        console.log("Date: " + dateMoment);
        console.log("Tickets available here: " + tickets);

        console.log("\n-------------");
      }
    }).catch(function (error) {
      // handle error
      console.log(error + " --> something is wrong try again");

    }).finally(function () {
      // always executed
    });

};

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(',');
    console.log(data);

    liriResponse = data[0];

    if (liriResponse === "spotify-this-song") {
      search = (data[1]);
      spotifySong();
    } else if (liriResponse === "concert-this") {
      search = (data[1]);
      bandsInTown();
    } else if (liriResponse === "movie-this") {
      search = (data[1]);
      movieInfo();
    }
  })
}


fs.appendFile("log.txt", liriResponse + " " + search + "\n", function(err) {

  // If an error was experienced we will log it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Check the log File and you can see your lastes searches" to our node console.
  else {
    console.log("Check the log File and you can see your lastes searches!");
  }

});
