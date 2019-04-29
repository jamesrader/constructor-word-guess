var Letter = function(letter){
    //console.log("HERE!");
    this.character = letter;
    //console.log(this.character);
    this.revealed = false;


    this.checkCharacter = function(guess){
        if (this.character === guess){
            this.revealed = true;
            return true;
            //console.log(this.revealed);
            //this.displayCharacter();
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

    //this.displayCharacter();
    
}

    module.exports = Letter;

