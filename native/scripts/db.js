function(c, a)
{
	var caller = c.caller;

	/* Write */
	function writeAllowedUser(user){ /* Receives username */
		return #db.us({_id:"allowedUsers"},{$addToSet:{users:user}});
	}

	function writeBot(user){ /* Receives username */
		return #db.us({_id:"bots"}, {$addToSet:{bots:user}});
	}

	function writeScript(script){ /* Receives scriptname */
		return #db.us({_id:"scripts"}, {$addToSet:{scripts:script}});
	}

	function writeTool(tool){ /* Receives scriptname */
		return #db.us({_id:"tools"}, {$addToSet:{tools:tool}});
	}

	function writeLibrary(lib){ /* Receives scriptname */
		return #db.us({_id:"libraries"}, {$addToSet:{libraries:lib}});
	}

	function writeQueue(queue){ /* Receives scriptname */
		return #db.us({_id:"queues"}, {$addToSet:{queues:queue}});
	}

	function insertScript(script,type){ /* Receives scriptname and type then write the script and the type */
		writeScript(script);
		if(type == "tool"){
			writeTool(script);
			return true;
		}else if(type == "library"){
			writeLibrary(script);
			return true;
		}else if(type == "queue"){
			writeQueue(script);
			return true;
		}else{
			removeScript(script)
		}
	}

	/* Remove */
	function removeAllowedUser(user){ /* Receives username */
		return #db.us({_id:"allowedUsers"},{$pull:{users:user}});
	}

	function removeBot(user){ /* Receives username */
		return #db.us({_id:"bots"}, {$pull:{bots:user}})
	}

	function removeScript(script){ /* Receives scriptname */
		return #db.us({_id:"scripts"}, {$pull:{scripts:script}})
	}

	function removeTool(tool){ /* Receives scriptname */
		return #db.us({_id:"tools"}, {$pull:{tools:tool}})
	}

	function removeLibrary(lib){ /* Receives scriptname */
		return #db.us({_id:"libraries"}, {$pull:{libraries:lib}})
	}

	function removeQueue(queue){ /* Receives scriptname */
		return #db.us({_id:"queues"}, {$pull:{queues:queue}})
	}
	
	function deleteScript(script){ /* Receives scriptname, removes from scripts set and from tools or libraries set */
		removeScript(script);
		removeTool(script);
		removeLibrary(script);
		removeQueue(script);
	}

	/* Get */
	function isAllowedUser(user){ /* Receives username */
		let allowedUser = #db.f({_id:"allowedUsers", users:user}).first();
		if(allowedUser){
			return true;
		}else{
			return false;
		}
	}

	function isBot(user){ /* Receives username */
		let bot = #db.f({_id:"bots", bots:user}).first();
		if(bot){
			return true;
		}else{
			return false;
		}
	}

	function isScript(script){ /* Receives scriptname */
		let rscript = #db.f({_id:"scripts", scripts:script}).first();
		if(rscript){
			return true;
		}else{
			return false;
		}
	}

	function isTool(tool){ /* Receives scriptname */
		let rtool = #db.f({_id:"tool", tool:tool}).first();
		if(rtool){
			return true;
		}else{
			return false;
		}
	}

	function isLibrary(lib){ /* Receives scriptname */
		let rlib = #db.f({_id:"libraries", tool:lib}).first();
		if(rlib){
			return true;
		}else{
			return false;
		}
	}

	function isQueue(queue){ /* Receives scriptname */
		let rq = #db.f({_id:"queue", queues:queue}).first();
		if(rq){
			return true;
		}else{
			return false;
		}
	}

	function findOnList(list,name){ /* Receives list name and username ||| There isn't and never will be an addToList for adding into generic lists to prevent typos on DB. */
		let generic;
		if(list == "allowedUsers"){
			generic = #db.f({_id:list, users:name});
		}else if(list == "bots"){
			generic = #db.f({_id:list, bots:name});
		}
		if(generic){
			return true;
		}else{
			return false;
		}
	}

	function getAllowedUsers(){ /* Receives nothing */
		return #db.f({_id:"allowedUsers"}).first().users;
	}

	function getBots(){ /* Receives nothing */
		return #db.f({_id:"bots"}).first().bots;
	}

	function getScripts(){ /* Receives nothing */
		return #db.f({_id:"scripts"}).first().scripts;
	}

	function getTools(){ /* Receives nothing */
		return #db.f({_id:"tools"}).first().tools;
	}

	function getLibraries(){ /* Receives nothing */
		return #db.f({_id:"libraries"}).first().libraries;
	}

	function getQueues(){ /* Receives nothing */
		return #db.f({_id:"queues"}).first().queues;
	}


	/* Debug */
	function view(){
		return #db.f({_id:{$exists:true}}).array();
	}

	if(caller == "native" || (c.calling_script != null && getScripts().includes(c.calling_script))){
		return {
			writeAllowedUser,
			writeBot,
			writeScript,
			writeTool,
			writeLibrary,
			writeQueue,
			insertScript,
			removeAllowedUser,
			removeBot,
			removeScript,
			removeTool,
			removeLibrary,
			removeQueue,
			deleteScript,
			isAllowedUser,
			isBot,
			isScript,
			isTool,
			isLibrary,
			isQueue,
			findOnList,
			getAllowedUsers,
			getBots,
			getScripts,
			getTools,
			getLibraries,
			getQueues,
			view
		}
	}else{
		return "Connected to native.db";
	}
}
