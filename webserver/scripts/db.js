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

	var options = ["view", "reset", "search","getone", "insert", "clear","update"];

	const optstr = "`A[``LAVAILABLE OPTIONS``A]`\n\n`E»` `N view`\n `A		Will just show everything inside database`\n\n`E»` `N search`\n `A		Use it combined with filter:{\"keys\"}`\n\n`E»` `N reset`\n`A		 Reset database to default`"+
	 "\n\n`E»` `N insert`\n`A		 Use it with``N params`:`V{object}``A to insert data`\n\n`E»` `N clear`\n`A		 Removes everything except CloudDBM Installation Data`\n\n`E»` `N update`\n`A		 Use it with query:{object} and newdata:{object} to update data`";

	const opsuc = "`LOperation Success!`";


	/*Core functions*/



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

	if(a.filter && typeof(a.filter) != "object"){
		return top + "\n`DERROR!` `AYou must pass a JSON object as filter!`\n\n\n\n";;
	}

	if(a.params && typeof(a.params) != "object"){
		return top + "\n`DERROR!` `AYou must pass a JSON object as insert parameters!`\n\n\n\n";;
	}

	var option = a.option;

	switch(option){
		case "view": return db;
		case "getone": return _getOne(a.filter).result;
		case "update": return _updateOne({query:a.query,newdata:a.newdata});
		case "insert": return _insertOne(a.params);
		case "reset": return _dbReset();
		case "clear": return _dbClear();
	}

}
