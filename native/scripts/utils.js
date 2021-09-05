function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to native.utils"

	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	

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

	function decolorize(str){
		return str.replace(/`[a-zA-Z0-9]([^`\n]+?)`/g,'$1');
	}

	function toGCNum(str) {
		var parts=str.match(/^(-?)(?:([0-9]{1,5})Q)?(?:([0-9]{1,3})T)?(?:([0-9]{1,3})B)?(?:([0-9]{1,3})M)?(?:([0-9]{1,3})K)?([0-9]{1,3})?GC$/)
		if(!parts)return false
	
		var r=0;
		for(var i=2;i<parts.length;++i) {
			if(parts[i])
				r+=parts[i]/1*Math.pow(10,21-3*i)
		}
		if(parts[1]=='-')r*=-1;
		return r;
	}

	function toGCStr(num){
	var parts=[];
	  var sign=Math.sign(num);
	  num=Math.abs(num);
	  while(parts.length<5) {
		parts.unshift(num%1000);
		num=Math.floor(num/1000);
	  }
	  parts.unshift(num);
	  var k = ['Q', 'T', 'B', 'M', 'K', ''];
	  var ret='';
	  for(var i = 0; i < parts.length; ++i)
		  if(parts[i]) ret += parts[i] + k[i];
	  return (sign==-1?'-':'')+(ret||0)+'GC'
	}

	if((caller != "native") && !(allowedScripts.includes(script))) {
		return gtfo;
	}else{
		return {
			decorrupt,
			decolorize,
			toGCNum,
			toGCStr
		}
	}
	
	
}
