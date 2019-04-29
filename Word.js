var createLetters = require ("./Letter.js");

var Word = function (word){
    //console.log(word);
    this.currentWord = word;
    this.currentCharacters = [];
    this.finished = false;
    this.correctCount = 0;
    this.wordLength = this.currentWord.length;

     for(i=0; i<this.currentWord.length; i++){
        var currentCharacter = this.currentWord.charAt(i);
        //console.log(currentCharacter);
        this.currentCharacterObj = new createLetters(currentCharacter);
        //var revealed = this.currentCharacterObj.checkCharacter(currentCharacter);
        //console.log(revealed);
        this.currentCharacters.push(this.currentCharacterObj);
    }

    //console.log(currentCharacters);

    this.buildWord = function(){
        var builtWord = "";
        for (i=0; i<this.currentCharacters.length; i++){
            builtWord += this.currentCharacters[i].displayCharacter() + " ";
        }
        return builtWord;
        }
    
    this.checkGuess = function(guess){
        for (i=0; i<this.currentCharacters.length; i++){
            //console.log(this.currentCharacters[i]);
            var correct = this.currentCharacters[i].checkCharacter(guess);
            //console.log(correct);
            if (correct === true){
                this.correctCount ++;
            }
            //createLetters.checkCharacter(this.currentCharacters[i]);
        }
        //console.log(this.correctCount);
        var updatedWord = this.buildWord();
        return updatedWord;
    }

    //buildWord();
}

    module.exports = Word;