function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var word = a.word;
	word = word.split("");
	var letters = [];
	var repeatedletters = [];
	var repObj = {};

	function fact(a){
		if (a<0){
			return -1;
		}
		else if(a == 0){
			return 1;
		}else{
			return(a * fact(a-1));
		}
	}

	for (let letter of word){
		if(!letters.includes(letter)){
			letters.push(letter);
		}else if(letters.includes(letter)){
			repeatedletters.push(letter);
		}
	}

	if (word.length > letters.length){
		for (let letter of letters){
			if (repeatedletters.includes(letter)){
				repeatedletters.push(letter);
			}
		}
	}

	repeatedletters = repeatedletters.sort();

	let oldletter;
	let counter = 0;
	for(let letter of repeatedletters){
		if (!repObj[letter]){
			repObj[letter] = 1;
		}else{
			repObj[letter] += 1;
		}
	}

	var possibilities = fact(word.length);

	if(Object.keys(repObj).length == 0){
		return possibilities;
	}else{
		for (let key in repObj){
			possibilities = possibilities * (1/fact(repObj[key]));
			#D(possibilities);
		}
	}


}
