	function _l0cketFill(){

		let keys = #fs.market.browse({name:"k3y_v1"});
		let indexes = [];
		let kvalues = [];
		for(let item of keys){
			indexes.push(item.i);
		}

		for(let idx of indexes){
			let kvalue = #fs.market.browse({i:idx}).upgrade.k3y;
			if(!(kvalues.includes(kvalue))){
				kvalues[kvalue] = 1; // JS accepts indexes that aren't integers
				if(Date.now() - _START>4000){
					return{ok:false, msg:kvalues};
				}
			}
		}
		if(Date.now() - _START>4500){
			return{ok:false, msg:kvalues};
		}else{
				kvalues = Object.keys(kvalues);
		}


		return kvalues;

		// #db.us({lockName:"l0cket"},{$setOnInsert:{class:"lockData"},$addToSet:{lockData:{$each:kvalues}}});
	}
