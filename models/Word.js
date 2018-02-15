const Character = require('./Character');
const Letter = require('./Letter');

function Word(word){
	this.val = word;
	this.letters = [];
	for(let i of word){
		if( i.match(/[^\w]/i) ){
			this.letters.push(new Character(i));
		} else {
			this.letters.push(new Letter(i));
		}
	}

	// length is based on letters only (no non-alpha characters)
	this.length = this.letters.filter((i)=> i.constructor === Letter).length;

	// returns true if guess was found 
	// returns false if guess not found
	this.guess = (char)=>{
		let found = false;
		this.letters.forEach((i)=>{
			if(i.guess(char)){ found = true }
		});
		return found;
	};

	// returns true if entire word has been guessed
	this.guessed = ()=>{
		return this.letters.every((i) => i.guessed);
	};

	// returns a string of all letters based on current state
	this.show = ()=>{
		return this.letters.reduce((total, current)=> total += current.show(), '');
	};
}

module.exports = Word;