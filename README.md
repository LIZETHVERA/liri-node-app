# Liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
- LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies using APIs.

# Commands: 
  
Liri.js can take in one of the following commands:

- concert-this
- spotify-this-song
- movie-this
- do-what-it-says

# node liri.js concert-this <artist/band name here> : 

- We take madonna as an example

![image](https://github.com/LIZETHVERA/liri-node-app/blob/master/images/concert.JPG)


# node liri.js concert-this <no band or artist> : 
  - When the user does not select anything: 
  - We put madonna as defaut. 

```
console.log("\n---> You have not entered any artist or Band, We recommend to look some Madonna concerts!");
``` 

![image](https://github.com/LIZETHVERA/liri-node-app/blob/master/images/concertNo.JPG)
  
