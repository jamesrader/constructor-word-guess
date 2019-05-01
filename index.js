var createWord = require("./Word.js");
var inquirer = require("inquirer");
var colors = require("colors/safe");
var guessedLetters = [];
var randomArray = [];
var gameWord = {};
var title = "WordGuess - Football Terminology";

console.clear();
setupArray();
chooseRandomWord();

function setupArray(){
const footballTerms = ["first down", "touchdown", "quarterback", "wide receiver", "running back", "tight end", "lineman", "linebacker", "defensive back", "safety", "goalpost", "gridiron", "pigskin", "fumble", "interception", "huddle", "lateral", "placekicker", "tackle", "kickoff"];
randomArray = footballTerms;
}

function chooseRandomWord(){
if (randomArray.length === 0){
    setupArray();
}
//console.log(randomArray);
var randomIndex = Math.floor(Math.random() * randomArray.length)
var randomWord = randomArray[randomIndex];
//console.log(randomWord);
gameWord = new createWord(randomWord);
randomArray.splice(randomIndex,1);
makeWord();
}

function makeWord(){
var display = gameWord.buildWord();
console.clear();
console.log(colors.cyan(title) + "\n");
console.log(display + "\n");
//console.log(gameWord.wordLength);
guessedLetters = [];
guessLetter();
}

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
          console.log(colors.cyan(title) + "\n");
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
            //console.log("Correct: " + gameWord.correctCount + " out of " + gameWord.wordLength + "\n");
            guessLetter();
          }
        } else {
          console.clear();
          console.log(colors.cyan(title) + "\n");
          console.log(display + "\n");
          console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
          console.log("Incorrect guesses remaining: " + gameWord.remainingGuesses + "\n");
          console.log(colors.yellow("Uhhh...you already guessed that letter!\n"));
          guessLetter();
        }
      } else {
        console.clear();
        console.log(colors.cyan(title) + "\n");
        console.log(display + "\n");
        console.log("Guessed letters: " + guessedLetters.join(", ") + "\n");
        console.log("Incorrect guesses remaining: " + gameWord.remainingGuesses + "\n");
        console.log(
          colors.yellow("C'mon...It's a letter guessing game! Please guess a single letter.\n")
        );
        guessLetter();
      }
    });
}

function updateRemainingGuesses() {
    if (gameWord.newCorrect === 0){
        gameWord.remainingGuesses --;
        return colors.red("Incorrect!");
    }
        return colors.green("Correct!");
}

function winMessage() {
  console.log(colors.green("Congratulations...you win!!!\n"));
  nextOrEnd();
}

function lossMessage() {
    console.log(colors.red("Sorry...you're out of guesses. You lose.\n"));
    nextOrEnd();
}

function nextOrEnd(){
    inquirer
    .prompt([
      {
        type: "list",
        name: "command",
        choices: ["Next Word", "Exit"]
      }
    ])
    .then(function(answers) {
      console.log(answers.command);

      switch (answers.command) {

        case "Next Word":
          chooseRandomWord();
          break;

        case "Exit":
          console.clear();
      }
    });
}
