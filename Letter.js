var Letter = function(letter){
    this.character = letter;
    this.revealed = false;

    this.checkCharacter = function(guess){
        if (this.character === guess){
            this.revealed = true;
            return true;
        }
        return false;
    }

    this.displayCharacter = function(){
        if (this.revealed === true){
            return this.character
        } else {
            return "_";
        }
    }  
}

    module.exports = Letter;

