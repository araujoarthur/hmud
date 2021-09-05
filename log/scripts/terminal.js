function(c, a)
{
	var caller = c.caller;
	const gtfo = "Connected to log.terminal"

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedUsers = ndb.getAllowedUsers();
	if(!allowedUsers.includes(caller)) return gtfo;

	var ldb = #ns.log.db();
	var ll = #ns.log.lib();

	if(a){
		if(a.view){
			return ldb.view();
		}else if(a.writeLog && a.logType && a.logData){
			return ldb.writeLog(a.writeLog, caller, a.logType, a.logData);
		}else if(a.removeLogList){
			return ldb.removeLogList(a.removeLogList);
		}else if (a.checkLogList){
			return ldb.checkLogList(Date.now());
		}else if(a.createLogList){
			return ldb.createLogList(Date.now());
		}else if(a.removeLog && a.LogList){
			return ldb.removeLog(a.LogList, a.removeLog);
		}else if(a.addLogType){
			return ldb.addLogType(a.addLogType)
		}else if(a.removeLogType){
			return ldb.removeLogType(a.removeLogType);
		}else if(a.clearLowerThan){
			return ldb.clearLowerThan(Date.now()-30000);
		}else if(a.newLog, a.newLogType){
			return ll.newLog(a.newLogType, caller, a.newLog)
		}
	}else{
		return gtfo;
	}
	

}
