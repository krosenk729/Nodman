const Word = require('./Word');
const randomWord = require('random-word');

function Game(){
	const maxguess = 12;
	this.wins = 0;
	this.loses = 0;
	this.word = new Word( randomWord() );
	this.guesses = [];

	this.remaining = ()=>{
		return maxguess - this.guesses.length;
	}

	// return -1 if already guessed
	// return false if not found
	// return true if found 
	this.play = (char)=>{
		char = char[0].toLowerCase();
		if( this.guesses.indexOf(char) !== -1 ){ return -1;}
		this.guesses.push(char);
		return this.word.guess(char) === true;
	}

	this.reset = ()=>{
		this.guesses = [];
		this.word = new Word( randomWord() );
	}

	this.win = ()=>{
		console.log('~*~*~*~*~*~*~*~*~*~*~\nColor me impressed\nYOU WON!!!!!!!\n');
		this.wins++;
		this.reset();
		return true;
	}

	this.lose = ()=>{
		console.log('~*~*~*~*~*~*~*~*~*~*~\nSad trombone\nYOU LOST!!!!!!!\n');
		this.loses++;
		this.reset();
		return true;
	}
}

module.exports = Game;