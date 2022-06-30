function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to native.utils"

	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	

	function decorrupt(	){
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
			if(parts[i]){
				
				r+=parts[i]/1*Math.pow(10,21-3*i)
			}	
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

	function isNPC(name){
		name = name.match(/(abandoned|abndnd|anon|anonymous|derelict|uknown|unidentified|unknown)(|_jr|_(?:jr|dd|wb|pr|ls)(?:ttl|wlf|rvn|stg|wvr))_([a-z0-9]{6})/);
		return (name && name.length) == 4 ? true:false;
	}

	function isLocScript(loc){
		loc = loc.match(/(pub|pubinfo|info|pub_info|out|public|extern|external|entry|access|p)_([a-z0-9]{6})/);
		return (loc && loc.length) == 3 ? true:false;
	}

	function isLOC(name){ /* Returns if a loc could be valid, not if it exists */
		name = name.split(".");
		return (name && name.length == 2 && isLocScript(name[1])) ? true:false;
	}

	function splitLoc(loc){
		if(isLOC(loc)){
			let splitted = loc.split(".");
			return {ok:true, username:splitted[0], script:splitted[1]};
		}else{
			return {ok:false};
		}
	}


	function serializeSpecs(){
		var rawret = #ns.sys.specs();
		if(rawret.ok == false) return {ok:false};
		var ret = rawret.split("\n");

		const rgxVal = /(\w+): (\d+)/
		const rgxClass = /`.(\w+)`\(`.(\d+)`\) `.(\w+)`\(`.(\d+)`\) `.(\w+)`\(`.(\d+)`\) `.(\w+)`\(`.(\d+)`\) `.(\w+)`\(`.(\d+)`\)/;
		const rgxNextHardline = /`.(\w+)`: `.(\w+)`/;
		const rgxGC = /`.(\w+)`: (\w+)/;
		let sobj = {}
		for(let line of ret){
			let arr;
			if(line.match(rgxClass)){
				arr = line.match(rgxClass).splice(1,10);
				for(let i = 0; i<arr.length; i+=2){
					sobj[arr[i]] =  parseInt(arr[i+1]);	
				}
			}else if(line.match(rgxNextHardline)){
				arr = line.match(rgxNextHardline).splice(1,5);
				sobj[arr[0]] = arr[1];
			}else if(line.match(rgxGC)){
				arr = line.match(rgxGC).splice(1,5);
				sobj[arr[0]] = toGCNum(arr[1])
			}else if(line.match(rgxVal)){
				arr = line.match(rgxVal).splice(1,5);
				let key = arr[0];
				let value = parseInt(arr[1]);
				if (Object.keys(sobj).includes(key)) key = "script_"+key;
				sobj[key] = value;
			}
		}
		
		return sobj;
	}


	function getUpgrades(){
		var upgrades = #ns.sys.upgrades({full:true}); 
		var loaded = [];
		var unloaded = [];
		
		for(let item of upgrades){
			if(item.loaded){
				loaded.push(item);
			}else{
				unloaded.push(item);
			}
		}

		return {loaded, unloaded}
	}

	function getUpgradesStringified(){
		return JSON.stringify(getUpgrades());
	}
	function getBalances(){
		let jade = toGCNum(#ns.jade.vita().split("\n").map(o=>{if(o.match(/(\w+ \w+ ==) (\w+)/)) return o.match(/(\w+ \w+ ==) (\w+)/)[2]}).filter(o=>o)[0]);
		let acct = #ns.accts.balance();
		return {jade,acct};
	}


	if((caller != "native") && !(allowedScripts.includes(script))) {
		return gtfo;
	}else{
		return {
			decorrupt,
			decolorize,
			toGCNum,
			toGCStr,
			isNPC,
			isLOC,
			isLocScript,
			splitLoc,
			serializeSpecs,
			getUpgrades,
			getUpgradesStringified,
			getBalances
		}
	}
	
	
}
