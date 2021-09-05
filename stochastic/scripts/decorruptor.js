function(c, a)
{
	var caller = c.caller;
	var corrupted = "¡¢Á¤Ã¦§¨©ª".split("")

	function decorrupt(s,ar = null,to = 4000){
		let isCorrupted = true;
		let sCall = s.call(ar);
		if(Array.isArray(sCall)) sCall = sCall.join("\n")
		let decorrupted = sCall.replace(/`[a-zA-Z0-9][¡¢Á¤Ã¦§¨©ª]`/g,'¡').split("");
		do{	
			sCall = s.call(ar);
			sCall = Array.isArray(sCall) ? sCall.join("\n").replace(/`[a-zA-Z0-9][¡¢Á¤Ã¦§¨©ª]`/g,'¡') : sCall.replace(/`[a-zA-Z0-9][¡¢Á¤Ã¦§¨©ª]`/g,'¡');
			isCorrupted = false;

			for(var i = 0; i<decorrupted.length; i++){
				if(decorrupted[i] == "¡"){
					isCorrupted=true; 
					decorrupted[i] = sCall[i];
					continue;
				}
			}

		}while(isCorrupted && (Date.now - _START > to))
		
		return decorrupted.join("");
	}
	if(a && a.target){
		let t = a.target;
		delete a.target
		try{
			return Object.keys(a).length > 0 ? decorrupt(t, a) : decorrupt(t);
			
		} catch (error) {
			return error.stack
		}
		
	}else{
		return {ok:false, msg:"No arg target:#s.scipts.trust found"}
	}
}
