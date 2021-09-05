function(c, a){ // anagram:
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var anagram = a.anagram.split('').sort().join('');
	var list = #db.f({_id:"mag_"+anagram}, {words:true}).first();
	if(list){
			return {ok:true, msg:list.words};
	}
	else{
		return {ok:false, msg:[""]};
	}


}
