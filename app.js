const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require('https');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {
    currJoke: "Click the joke button for a joke!"
  });
});

app.post('/newJoke', function(req, res){

  const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
  //console.log(url);
  https.get(url, function(response){
    response.on("data", function(data){
      const jokeData = JSON.parse(data);
      //console.log(jokeData);
      const newJoke = jokeData.joke;
      res.render("home", {
        currJoke: newJoke
      })
    })
  });
})


// SUBMIT BUTTON FUNCTIONALITY
// var randomVariable1 = Math.floor(Math.random() * 6) + 1;
// var randomVariable2 = Math.floor(Math.random() * 6) + 1;
// document.querySelector(".img1").setAttribute("src", "images/dice" + randomVariable1 + ".png");
// document.querySelector(".img2").setAttribute("src", "images/dice" + randomVariable2 + ".png");
//
// if (randomVariable1 > randomVariable2) {
//   document.querySelector("h1").innerHTML = "Player 1 Wins!";
// }
// else if (randomVariable2 > randomVariable1) {
//   document.querySelector("h1").innerHTML = "Player 2 Wins!";
// }
// else {
//   document.querySelector("h1").innerHTML = "Draw!";
// }

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
