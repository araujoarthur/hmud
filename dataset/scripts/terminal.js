function(c, a)
{
	var caller = c.caller;
	const gtfo = "Connected to dataset.terminal"

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedUsers = ndb.getAllowedUsers();
	if(!allowedUsers.includes(caller)) return gtfo;

	var db = #ns.dataset.db();
	var utils = #ns.native.utils();

	if(a){
		if(a.addPlayerLoc){
			return db.addPlayerLoc(a.addPlayerLoc);
		}else if(a.addNPCLoc){
			return db.addNPCLoc(a.addNPCLoc);
		}else if(a.view){
			return db.view();
		}else if(a.removePlayerLoc){
			return db.removePlayerLoc(a.removePlayerLoc);
		}else if(a.removeNPCLoc){
			return db.removeNPCLoc(a.removeNPCLoc);
		}else if(a.getPlayerLoc){
			return db.getPlayerLoc(a.getPlayerLoc);	
		}
	}
}
