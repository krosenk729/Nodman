function Letter(char){
	this.val = char;
	this.guessed = false;
	this.show = ()=>{
		return this.guessed ? this.val : '_ ';
	};
	this.guess = (char)=>{
		return this.val === char ? this.guessed = true : false;
	}
}

module.exports = Letter;