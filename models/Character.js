function Character(char){
	this.val = char[0].toUpperCase();
	this.guessed = true;
	this.show = ()=>{
		return this.val + ' ';
	};

	this.guess = ()=>{
		return false;
	}
}

module.exports = Character;