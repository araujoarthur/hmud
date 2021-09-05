function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to log.lib";

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedScripts = ndb.getScripts();
	if(caller != "log" && !allowedScripts.includes(script)) return gtfo;

	var ldb = #ns.log.db();

	var manager = ldb.getSettings();

	/* Exceptions */
	


	/* Insert Functions */

	function newLog(logtype, ccaller, data, cscript = script){
		let date = Date.now();
		if (typeof data != "object") throw "Data is not an object";
		if (!manager.logTypes.includes(logtype)) throw "Logtype not recognized";

		let loglist = ldb.checkLogList(date);
		if(loglist.ok){
			ldb.writeLog(loglist.id, ccaller, logtype, date, data, cscript);
			return {ok:true}
		}else{
			let nll = ldb.createLogList(date);
			ldb.writeLog(nll.id, ccaller, logtype, date, data, cscript);
			return {ok:true}
		}

		return {ok:false}
	}

	/* Clean functions */
	function clean(date = Date.now()){
		ldb.cleanLowerThan(date);
		return {ok:true};
	}

	return {
		newLog,
		clean,
	}
}	
