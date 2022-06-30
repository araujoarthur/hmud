function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to dataset.db";
	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	if(!allowedScripts.includes(script)) return gtfo;

	var utils = #ns.native.utils();

	/* Insert */
	function addPlayerLoc(loc){
		let info = utils.splitLoc(loc);
		return #db.us({_id:"playerlocs"}, {$set:{["data."+info.username]:info.script}});
	}

	function addNPCLoc(loc){
		let info = utils.splitLoc(loc);
		return #db.us({_id:"npclocs"}, {$set:{["data."+info.username]:info.script}});
	}

	/* Remove */
	function removePlayerLoc(username){
		return #db.us({_id:"playerlocs"}, {$unset:{["data."+username]:""}});
	}

	function removeNPCLoc(username){
		return #db.us({_id:"npclocs"}, {$unset:{["data."+username]:""}});
	}

	/* Check */
	function playerEntryExists(username){
		let loc = #db.f({_id:"playerlocs", ["data."+username]:{$exists:true}}).first();
		return !!loc

	}

	function npcEntryExists(username){
		let loc = #db.f({_id:"npclocs", ["data."+username]:{$exists:true}}).first();
		return !!loc 
	}

	/* Get */

	function getPlayerLoc(username){
		let loc = #db.f({_id:"playerlocs", ["data."+username]:{$exists:true}}).first();
		if(loc){
			return {ok:true, username:username, script:loc.data[username],playerloc:username+"."+loc.data[username]};
		}else{
			return {ok:false}
		}
	}

	function getNPCLoc(username){
		let loc = #db.f({_id:"npclocs", ["data."+username]:{$exists:true}}).first();
		if(loc){
			return {ok:true, username:username, script:loc.data[username],playerloc:username+"."+loc.data[username]};
		}else{
			return {ok:false}
		}
	}

	function view(){
		return #db.f({}).array();
	}

	return {
		addPlayerLoc,
		addNPCLoc,
		removePlayerLoc,
		removeNPCLoc,
		playerEntryExists,
		npcEntryExists,
		getPlayerLoc,
		view
	}
}
