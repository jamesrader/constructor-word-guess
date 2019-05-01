var createLetters = require ("./Letter.js");

var Word = function (word){
    this.currentWord = word;
    this.currentCharacters = [];
    this.finished = false;
    this.correctCount = 0;
    this.previousCorrect = 0;
    this.newCorrect = 0;
    this.remainingGuesses = 10;
    //this.wordLength = this.currentWord.length;

     for(i=0; i<this.currentWord.length; i++){
        var currentCharacter = this.currentWord.charAt(i);
        this.currentCharacterObj = new createLetters(currentCharacter);
        this.currentCharacters.push(this.currentCharacterObj);
    }

    this.buildWord = function(){
        var builtWord = "";
        this.wordLength = this.currentWord.length;
        for (i=0; i<this.currentCharacters.length; i++){
            builtWord += this.currentCharacters[i].displayCharacter() + " ";
            if (this.currentCharacters[i].ignore === true){
                this.wordLength --;
            }
        }
        console.log(this.wordLength);
        return builtWord;
        }
    
    this.checkGuess = function(guess){
        this.previousCorrect = this.correctCount;
        console.log("Previous: " + this.previousCorrect);
        for (i=0; i<this.currentWord.length; i++){
            var correct = this.currentCharacters[i].checkCharacter(guess);
            if (correct === true){
                this.correctCount ++;
        } 
        }
        this.newCorrect = this.correctCount - this.previousCorrect;
        console.log("New: " + this.newCorrect);
        var updatedWord = this.buildWord();
        return updatedWord;
    }
}

    module.exports = Word;