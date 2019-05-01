var Letter = function(letter){
    this.character = letter;
    this.revealed = false;
    this.ignore = false
    if (this.character === " " || this.character === "-"){
        this.revealed = true;
        this.ignore = true;
    }

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

