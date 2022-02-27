const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require('https');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res){
  res.render("home", {
    currJoke: "Click the joke button for a joke!",
    gameStatus:"Perhaps you'd like to try your luck?:",
    die1: "images/dice6.png",
    die2: "images/dice6.png"
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
        currJoke: newJoke,
        gameStatus:"Perhaps you'd like to try your luck?:",
        die1: "images/dice6.png",
        die2: "images/dice6.png"
      })
    })
  });
})

app.post('/rolledDie', function(req, res){

  var randomVariable1 = Math.floor(Math.random() * 6) + 1;
  var randomVariable2 = Math.floor(Math.random() * 6) + 1;
  var newGameStatus = "";

  if (randomVariable1 > randomVariable2) {
    newGameStatus = "You Win!"
  }
  else if (randomVariable2 > randomVariable1) {
    newGameStatus = "You Lost..."
  }
  else {
    newGameStatus = "Draw!"
  }
  res.render("home", {
    currJoke: "Click the joke button for a joke!",
    gameStatus:newGameStatus,
    die1: "images/dice" + randomVariable1 + ".png",
    die2: "images/dice" + randomVariable2 + ".png"
  });

})

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
