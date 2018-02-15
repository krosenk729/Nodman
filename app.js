const Character = require('./models/Character');
const Letter = require('./models/Letter');
const Word = require('./models/Word');
const Game = require('./models/Game');
const fs = require('fs');
const inquirer = require('inquirer');
const promptNewGame = [{
	type: 'list',
	name: 'playagain',
	message: 'Do you want to play again?',
	choices: ['Yes', 'No']
}];
const promptTurn = [{
	type: 'input',
	name: 'guess',
	message: 'Guess a letter',
	validate: (v)=>{
		return v.match(/^[A-Za-z]$/) ? true : 'Please enter a single letter guess';
	}
}];
const game = new Game();

let playGame = function(game){
	fs.appendFile('test/log.txt', `playgame for word ${game.word.val} \n`);
	console.log(`Guessing: \t${game.word.show()}\n`);
	console.log(`Guessed: \t${game.guesses}`);
	console.log(`Remaining: \t${game.remaining()} guesses \n`);
	inquirer.prompt(promptTurn).then((answer)=>{
		fs.appendFile('test/log.txt', `user guessed ${answer.guess} \n`);
		if(game.play(answer.guess) === -1){
			console.log('~*~*~*~*~*~*~*~*~*~*~\nHave you guessed that before? Try a new guess\n');	
			playGame(game);
		} else if(game.word.guessed()){
			game.win();
			playAgain(game);
		} else if(game.remaining() <= 0 ){
			game.lose();
			playAgain(game);
		} else {
			playGame(game);
		}
	});

	let playAgain = function(game){
		console.log(`Current score: ${game.wins} wins, ${game.loses} loses\n`);
		inquirer.prompt(promptNewGame).then((answer)=>{
			if(answer.playagain === 'Yes'){
				return playGame(game);
			} else { 
				return console.log('~*~*~*~*~*~*~*~*~*~*~\nThanks for playing!');
			}
		})
	}
}
playGame(game);