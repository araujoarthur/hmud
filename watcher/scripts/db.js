function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var db = #db.f({_id:{$exists:true}}).array();
	var header = ["`A                                              ████                                              `\n",
	"`A                             ██████████████████████████████████████████                             `\n",
	"`A                     ██████████████████████████████████████████████████████████                     `\n",
	"`A                ████████████████████████████████████████████████████████████████████                `\n",
	"`A             ██████████████████████████████████████████████████████████████████████████             `\n",
	"`A          ████████████████████████████████████████████████████████████████████████████████          `\n",
	"`A         ██████████████████████████████████████████████████████████████████████████████████         `\n",
	"`A        ████████████████████████████████████████████████████████████████████████████████████        `\n",
	"`A         ██████████████████████████████████████████████████████████████████████████████████         `\n",
	"`A          ████████████████████████████████████████████████████████████████████████████████          `\n",
	"`A            ████████████████████████████████████████████████████████████████████████████            `\n",
	"`A        █      ██████████████████████████████████████████████████████████████████████      █        `\n",
	"`A        ████        ████████████████████████████████████████████████████████████        ████        `\n",
	"`A        ████████           ██████████████████████████████████████████████           ████████        `\n",
	"`A        ██████████████                 ██████████████████████                 ██████████████        `\n",
	"`A        ██████████████████████                                        ██████████████████████        `\n",
	"`A         ██████████████████████████████████████████████████████████████████████████████████         `\n",
	"`A          ████████████████████████████████████████████████████████████████████████████████          `\n",
	"`A            ████████████████████████████████████████████████████████████████████████████            `\n",
	"`A               ██████████████████████████████████████████████████████████████████████               `\n",
	"`A        ███         ████████████████████████████████████████████████████████████         ███        `\n",
	"`A        ███████            ██████████████████████████████████████████████            ███████        `\n",
	"`A        █████████████                   ████████████████████                   █████████████        `\n",
	"`A        ██████████████████████                                        ██████████████████████        `\n",
	"`A         ██████████████████████████████████████████████████████████████████████████████████         `\n",
	"`A          ████████████████████████████████████████████████████████████████████████████████          `\n",
	"`A            ████████████████████████████████████████████████████████████████████████████            `\n",
	"`A        █       ████████████████████████████████████████████████████████████████████                `\n",
	"`A        ███         ████████████████████████████████████████████████████████████         ███        `\n",
	"`A        ████████            ████████████████████████████████████████████             ███████        `\n",
	"`A        █████████████                     ████████████████                     █████████████        `\n",
	"`A        ███████████████████████                                       ██████████████████████        `\n",
	"`A         ██████████████████████████████████████████████████████████████████████████████████         `\n",
	"`A          ████████████████████████████████████████████████████████████████████████████████          `\n",
	"`A             ███████████████████████████████████████████████████████████████████████████            `\n",
	"`A                ████████████████████████████████████████████████████████████████████                `\n",
	"`A                     ██████████████████████████████████████████████████████████                     `\n",
	"`A                            ████████████████████████████████████████████                            `\n",
	"`A                                            ████████████                                            `\n"];

	var dbname = ["                             `N .d8888b.  888                        888 `\n",
	"                             `Nd88P  Y88b 888                        888 `\n",
	"                             `O888    888 888                        888 `\n",
	"                             `O888        888  .d88b.  888  888  .d88888 `\n",
	"                             `Q888        888 d88\"\"88b 888  888 d88\" 888 `\n",
	"                             `Q888    888 888 888  888 888  888 888  888 `\n",
	"                             `SY88b  d88P 888 Y88..88P Y88b 888 Y88b 888 `\n",
	"                             `S \"Y8888P\"  888  \"Y88P\"   \"Y88888  \"Y88888 `\n",
	"`A                                                      Database Manager`"];

	var top = header.join("") + dbname.join("") + "\n\n\n";

	var options = ["view", "reset", "search","getone", "insert", "clear","update","gatherl0cket","filll0cket","addl0cket","fillc00","fillez40","fillez21","removeOne","fillDataCheck"];

	var keytypes = ["k3y_v1", "k3y_v2", "k3y_v3"];

	const optstr = "`A[``LAVAILABLE OPTIONS``A]`\n\n`E»` `N view`\n `A		Will just show everything inside database`\n\n`E»` `N search`\n `A		Use it combined with filter:{\"keys\"}`\n\n`E»` `N reset`\n`A		 Reset database to default`"+
	 "\n\n`E»` `N insert`\n`A		 Use it with``N params`:`V{object}``A to insert data`\n\n`E»` `N removeOne`\n`A		 Removes only one set matching a query sent from query:{object}`"+
	 "\n\n`E»` `N clear`\n`A		 Removes everything except CloudDBM Installation Data`\n\n`E»` `N update`\n`A		 Use it with query:{object} and newdata:{object} to update data`"+
	 "\n\n`E»` `N fillez21`\n`A		 Fills DB with EZ_21's passcodes`\n\n`E»` `N fillez40`\n`A		 Fills DB with EZ_40's prime numbers from 1 to 100`"+
	 "\n\n`E»` `N fillc00`\n`A		 Fills DB with c001 to c003 colors`\n\n`E»` `N gatherl0cket`\n`A		 Scraps market and fill DB with k3y's tokens for posterior use`"+
	 "\n\n`E»` `N filll0cket`\n`A		 Fills DB with l0cket k3ys. Provide the k3y type you want by: key:\"type\"``D[YOU MUST USE AFTER gatherl0cket]`\n\n`E»` `N addl0cket`\n`A		 Manually adds a l0cket k3y value. Use with value:\"value\" and key:\"type\"`";

	const opsuc = "`LOperation Success!`";


	/*Core functions*/


try {
	function _updateOne(params){
			try {
				#db.u(params.query,params.newdata);
				return {ok:true, msg:opsuc};
			} catch (e) {
				return {ok:false, msg: "`DERROR!` - Something failed on updating: " + e.stack};
			}
	}

	function _insertOne(params){
		try {
			#db.i(params);
			return {ok:true, msg:opsuc};
		} catch (e) {
			return {ok:false, msg: "`DERROR!` - Something failed on inserting: " + e.stack};
		}
	}

	function _getOne(params){
		try {
			let resultgo = #db.f(params).first();
			return {ok:true, msg:opsuc, result:resultgo};
		} catch (e) {
				return {ok:false, msg:"`DERROR!` - Something failed on searching: " + e.stack};
		}
	}

	function _dbReset(){
		try {
			#db.r({_id:{$exists:true}});
			return {ok:true}
		} catch (e) {
			return {ok:false, msg:"`DERROR!` - Something failed on DB Reseting: " + e.stack};
		}
	}

	function _dbClear(){
		try {
			#db.r({class:{$not: {$eq:"cloudDBinstalldata"}}});
			return {ok:true}
		} catch (e) {
			return {ok:false, msg:"`DERROR!` - Something failed on DB Clear: " + e.stack};
		}
	}

	function _ez21Fill(){
			let lock = {};
			lock.lockName = "EZ_21";
			lock.lockData = ["open","release","unlock"];
			lock.class = "lockData"
			try {
				let resp = #db.us({lockName:lock.lockName}, lock);
				return {ok:true, msg:resp};
			} catch (e) {
				return {ok:false, msg:"`DERROR! ` `A Something went wrong: `" + e.stack};
			}
	}

	function _ez40Fill(){
			let lock = {};
			lock.lockName = "EZ_40";
			lock.lockData = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
			lock.class = "lockData"
			try {
				let resp = #db.us({lockName:lock.lockName}, {$set:lock});
				return {ok:true, msg:resp};
			} catch (e) {
				return {ok:false, msg:"`DERROR! ` `A Something went wrong: `" + e.stack};
			}
	}

	function _c00Fill(){
			let lock = {};
			lock.lockName = "c00";
			lock.lockData = ["red","orange","yellow","lime","green","cyan","blue","purple"]; // ORDER IS IMPORTANT!
			lock.class = "lockData"
			try {
				let resp = #db.us({lockName:lock.lockName}, lock);
				return {ok:true, msg:resp};
			} catch (e) {
				return {ok:false, msg:"`DERROR! ` `A Something went wrong: `" + e.stack};
			}
	}

	function _l0cketGather(key){
		let keys = #fs.market.browse({name:key});
		let tokens = "";
		for(let token of keys){
			if(keys[0] == token){
				tokens = token.i;
			}else{
				tokens = tokens + "," + token.i;
			}
		}
		#db.us({class:"l0cketTokens_"+key}, {$addToSet:{tokens:{$each:tokens.split(',')}}});
		return {ok:true, msg:"`LDone!`"}
	}

	function _l0cketFill(key){
		var done = 0;
		while(Date.now() - _START < 4000){
			var tokens = #db.f({class:"l0cketTokens_"+key},{tokens:{$slice:25}}).first();

			if(tokens.tokens.length == 0){
				#db.r({class:"l0cketTokens_"+key});
				return {ok:true, msg:"`LDone!`"};
			}
			done += tokens.tokens.length
			var remove = tokens.tokens.slice();
			while(tokens.tokens.length){
					var tokencol = tokens.tokens.splice(0,5);
					let kvalues = [];
					let keys = #fs.market.browse({i:tokencol});
					for (let key of keys){
						kvalues[key.upgrade.k3y] = 1;
					}
					#db.us({lockName:"l0cket_"+key},{$setOnInsert:{class:"lockData"},$addToSet:{lockData:{$each:Object.keys(kvalues)}}});
			}
			#db.u1({class:"l0cketTokens_"+key}, {$pullAll:{tokens:remove}});
		}

		return {ok:false, msg:"Done: " + done}
	}

	function _fillDataCheck(phrase, answer, tier){
		let lock = {}
		lock.lockName = "DATA_CHECK_";
		lock.lockData = []
		let lockData = {};

		if (tier==1){
			lock.lockName +="V1";
		}else if(tier==2){
			lock.lockName +="V2";
		}else if(tier==3){
			lock.lockName +="V3";
		}else if(tier==4){
			lock.lockName +="V4";
		}else if(tier==5){
			lock.lockName +="V5";
		}


		lockData.phrase = phrase;
		lockData.answer = answer;

		lock.lockData[0] = lockData;

		var ret = #db.u1({lockName:lock.lockName,"lockData.phrase":lock.lockData[0].phrase},{$setOnInsert:{class:"lockData"},$set:{"lockData.$":lock.lockData[0]}}); // Searches for a lockName and lockData.phrase on each of array elements to see if one matches, if there's a match, updates lockData FULLY.

		if (ret[0].n == 0){ // If there's no match
			#db.us({lockName:lock.lockName}, {$setOnInsert:{class:"lockData"}, $addToSet:{lockData:lock.lockData[0]}});// Check for the lockData, if don't exist, adds.
		}
		return ret;

	}


	/*Flow functions*/

	function checkInstallation(){
		let installation = _getOne({class:"cloudDBinstalldata"}).result;
		if (installation == null){
			installation = {}
			installation.installedBy = caller;
			installation.installDate = _START;
			installation.installedAt = c.this_script.split('.')[0];
			installation.class = "cloudDBinstalldata";
			return _insertOne(installation);
		} else{
			return installation;
		}
	}


	/*Debug Flow */


	/*Program Flow*/

	if(!checkInstallation().class){
		return top + "\n`A Database just installed!`";
	}


	if(!a || !a.option){
		return top + "\n`DFORBIDDEN!` `AYou must use option:\"key\" to use this script!`\n\n\n\n" + optstr;
	}



	if(!(options.includes(a.option)) && typeof(a.option) != "object"){
		return top + "\n`DFORBIDDEN!` `AOption ``N"+a.option+"``A is not accepted by the script.`\n\n\n\n" + optstr;
	}

	if(!(options.includes(a.option)) && typeof(a.option) == "object"){
		return top + "`DFORBIDDEN!` `AScriptor ``N"+a.option.name+"``A is not accepted by the script.`\n\n\n\n" + optstr;
	}

	if(((a.option == "gatherl0cket") || (a.option == "filll0cket") || (a.option == "addl0cket")) && !(a.key)){
		return top + "\n`DERROR!` `AYou must provide a k3y type in key:\"value\"`\n\n\n\n";
	}

	if(((a.option == "gatherl0cket") || (a.option == "filll0cket") || (a.option == "addl0cket")) && !(keytypes.includes(a.key))){
		return top + "\n`DERROR!` `AYou must provide a valid k3y type in key:\"value\" as follows: "+keytypes.join(", ")+"`\n\n\n\n";
	}

	if(a.filter && typeof(a.filter) != "object"){
		return top + "\n`DERROR!` `AYou must pass a JSON object as filter!`\n\n\n\n";
	}

	if(a.params && typeof(a.params) != "object"){
		return top + "\n`DERROR!` `AYou must pass a JSON object as insert parameters!`\n\n\n\n";
	}



	var option = a.option;

	switch(option){
		case "view": return db;
		case "getone": return _getOne(a.filter).result;
		case "update": return _updateOne({query:a.query,newdata:a.newdata});
		case "insert": return _insertOne(a.params);
		case "removeOne": return #db.r(a.query);
		case "reset": return _dbReset();
		case "clear": return _dbClear();
		case "fillez21": return _ez21Fill();
		case "fillez40": return _ez40Fill();
		case "fillc00": return _c00Fill();
		case "filll0cket": return _l0cketFill(a.key);
		case "gatherl0cket": return _l0cketGather(a.key);
		case "addl0cket": return _l0cketAdd(a.key);
		case "fillDataCheck": return _fillDataCheck(a.phrase, a.answer, a.tier);
	}


	} catch (e) {
		return e.stack
	}
}
