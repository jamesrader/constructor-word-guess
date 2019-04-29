var createWord = require("./Word.js");
var inquirer = require("inquirer");
var guessedLetters = [];

console.clear();

var randomWord = "jamesrader";

var gameWord = new createWord(randomWord);

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
          var correctOrNot = updateRemainingGuesses();
          if (gameWord.correctCount === gameWord.wordLength) {
            winMessage();
          } else if (gameWord.remainingGuesses === 0){
            lossMessage();
          } else {  
            guessedLetters.push(answers.letterGuess);
            console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
            console.log(correctOrNot + "\n");
            console.log("Incorrect guesses remaining: " + gameWord.remainingGuesses + "\n");
            guessLetter();
          }
        } else {
          console.clear();
          console.log(display + "\n");
          console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
          console.log("Incorrect guesses remaining: " + gameWord.remainingGuesses + "\n");
          console.log("Uhhh...you already guessed that letter!");
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

function updateRemainingGuesses() {
    if (gameWord.newCorrect === 0){
        gameWord.remainingGuesses --;
        return "Incorrect!";
    }
        return "Correct!";
}

function winMessage() {
  console.log("Congratulations...you win!!!");
}

function lossMessage() {
    console.log("Sorry...you're out of guesses. You lose.")
}

guessLetter();
