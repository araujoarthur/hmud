function(c, a)
{
	var caller = c.caller;
	var db = #ns.native.db();
	const gtfo = "Connected to native.manage"
	if(db == "Connected to native.db") return gtfo

	var allowedUsers = db.getAllowedUsers();

	if(!allowedUsers.includes(caller)) return gtfo
	if(a){
		if(a.addAllowed){
			return db.writeAllowedUser(a.addAllowed.toLowerCase());
		}else if(a.addBot){ /* Receives a name to add */
			return db.writeBot(a.addBot.toLowerCase());
		}else if(a.isAllowed){
			return db.isAllowedUser(a.isAllowed.toLowerCase());
		}else if(a.isBot){
			return db.isBot(a.isBot.toLowerCase());
		}else if(a.find && a.list){
			return db.findOnList(a.list.toLowerCase(), a.find.toLowerCase());
		}else if(a.getAllowed){
			return db.getAllowedUsers();
		}else if(a.getBots){
			return db.getBots();
		}else if(a.view){
			return db.view();
		}else if(a.removeBot){
			return db.removeBot(a.removeBot.toLowerCase());
		}else if(a.removeAllowed){
			return db.removeAllowed(a.removeAllowedUser.toLowerCase());
		}else if(a.addScript){
			return db.writeScript(a.addScript.toLowerCase())
		}else if(a.removeScript){
			return db.removeScript(a.removeScript.toLowerCase())
		}else if(a.isScript){
			return db.isScript(a.isScript.toLowerCase());
		}else if(a.getScripts){
			return db.getScripts();
		}else if(a.addLibrary){
			return db.writeLibrary(a.addLibrary.toLowerCase());
		}else if(a.removeLibrary){
			return db.removeLibrary(a.addLibrary.toLowerCase());
		}else if(a.isLibrary){
			return db.isLibrary(a.isLibrary.toLowerCase());
		}else if(a.addTool){
			return db.addTool(a.addTool.toLowerCase());
		}else if(a.removeTool){
			return db.removeTool(a.removeTool.toLowerCase());
		}else if(a.isTool){
			return db.isTool(a.isTool(a.isTool.toLowerCase()));
		}else if(a.getTools){
			return db.getTools();
		}else if(a.getLibraries){
			return db.getLibraries();
		}else if(a.insertScript && a.scriptType){
			return db.insertScript(a.insertScript.toLowerCase(), a.scriptType.toLowerCase());
		}else if(a.deleteScript){
			return db.deleteScript(a.deleteScript.toLowerCase());
		}else if(a.addQueue){
			return db.writeQueue(a.addQueue.toLowerCase());
		}else if(a.removeQueue){
			return db.removeQueue(a.removeQueue.toLowerCase());
		}else if(a.isQueue){
			return db.isQueue(a.isQueue.toLowerCase());
		}else if(a.getQueues){
			return db.getQueues();
		}
	}else{
		return gtfo + "\nNo input detected"
	}
}
