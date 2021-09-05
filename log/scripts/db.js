function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to log.db";
	const day = 86400000;

	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	if(!allowedScripts.includes(script)) return gtfo;

	
	
	
	/* Write */
	function writeLog(id, ccaller, logtype, date, data, cscript){
		let log = {}
		log.id = ccaller + "_" + date;
		log.script = cscript;
		log.logType = logtype;
		log.t = date;
		log.logData = data;

		return #db.u({_id:id},{$push:{logs:{$each:[log], $sort:{t:1}}}});
	}

	function createLogList(date){
		let log = {};
		log._id = "log_" + date.toString() + "_" + (date+day).toString();
		log.startDate = date;
		log.endDate = date + day;;
		log.logs = [];
		res = #db.i(log);
		return {res:res, id:log._id}
	}

	function addLogType(entry){
		return #db.us({_id:"management"},{$addToSet:{logTypes:entry}});
	}

	/* Set */

	function setLastClean(date){
		return #db.us({_id:"management"}, {$set:{lastclean:date}});
	}

	/* Remove */
	function removeLog(loglist,logid){
		return #db.u({_id:loglist, entry:"log"}, {$pull:{logs:{id:logid}}});
	}

	function removeLogList(id){
		return #db.r({_id:id});
	}

	function removeLogType(entry){
		return #db.us({_id:"management"},{$pull:{logTypes:entry}});
	}

	function clearLowerThan(date){ /*Removes all entries below specified date*/
		setLastClean(date)
		return #db.r({_id:{$ne:"management"}, endDate:{$lte:date}});
	}

	/* Check */
	
	function checkLogList(date){
		let list =  #db.f({_id:{$ne:"management"}, startDate:{$lte:date}, endDate:{$gte:date}}).first();
		return list ? {ok:!!list, id:list._id} : {ok:!!list};
	}

	/* Get */

	function getSettings(){
		return #db.f({_id:"management"}).first();
	}

	/* View */
	function view(){
		return #db.f({}).array();
	}

	function getLastClean(){
		getSettings().lastclean;
	}
	


	return {
		writeLog,
		createLogList,
		addLogType,
		removeLog,
		removeLogList,
		removeLogType,
		clearLowerThan,
		checkLogList,
		getSettings,
		view,
		getLastClean,
		lastclean:getLastClean()
	}
}
