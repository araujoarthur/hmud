function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();

	var utils = #ns.native.utils();

	/*
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
	
	return toGCNum("11T921B361M570K593GC");
	return toGCNum("9Q7T199B254M740K991GC");
	*/
	
	/* getBalances
	let jade = toGCNum(#ns.jade.vita().split("\n").map(o=>{if(o.match(/(\w+ \w+ ==) (\w+)/)) return o.match(/(\w+ \w+ ==) (\w+)/)[2]}).filter(o=>o)[0]);
	let acct = #ns.accts.balance();
	return {jade,acct};
	*/ 
	
	
	/* getUpgrade
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
	*/

	/* serializeSpecs
	const ret = #ns.sys.specs().split("\n");
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
			sobj[arr[0]] = arr[1]
		}else if(line.match(rgxVal)){
			arr = line.match(rgxVal).splice(1,5);
			let key = arr[0];
			let value = parseInt(arr[1]);
			if (Object.keys(sobj).includes(key)) key = "script_"+key;
			sobj[key] = value;
		}
	}
	
	return sobj;
	*/

}
