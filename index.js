var createWord = require("./Word.js");
var inquirer = require("inquirer");
var guessedLetters = [];

var ui = new inquirer.ui.BottomBar();
console.clear();

var randomWord = "jamesrader";
//console.log(randomWord);
//createWord(randomWord);

var gameWord = new createWord(randomWord);
//console.log(gameWord);
var display = gameWord.buildWord();
console.clear();
console.log(display + "\n");

function guessLetter() {
  inquirer
    .prompt([
      {
        name: "letterGuess",
        message: "Guess a letter."
      }
    ])
    .then(function(answers) {
      if (answers.letterGuess.length === 1) {
        if (guessedLetters.indexOf(answers.letterGuess) === -1) {
          display = gameWord.checkGuess(answers.letterGuess);
          console.clear();
          console.log(display + "\n");
          if (gameWord.correctCount === gameWord.wordLength) {
            congratulate();
          } else {
            guessedLetters.push(answers.letterGuess);
            console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
            guessLetter();
          }
        } else {
            console.clear();
          console.log(display + "\n");
            console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
          console.log("Uhhh...you already guessed that letter!");
          //ui.log.write("Uhhh...you already guessed that letter!");
          //console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
          guessLetter();
        }
      } else {
        console.log(
          "C'mon...It's a letter guessing game! Please guess a single letter."
        );
        guessLetter();
      }
    });
}

function congratulate() {
  console.log("Congratulations...you win!!!");
}

guessLetter();
