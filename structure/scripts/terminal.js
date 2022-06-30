function(c, a)
{
	var caller = c.caller;
	const gtfo = "Connected to structure.terminal"

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedUsers = ndb.getAllowedUsers();
	var bots = ndb.getBots();
	if(!allowedUsers.includes(caller)&&!bots.includes(caller)) return gtfo;

	var db = #ns.structure.db();
	var utils = #ns.native.utils();
	try {
		if(a){
			if(a.updateUser){
				return db.updateUser();
			}else if(a.updateBotnet){
				return db.updateBotnet();
			}else if(a.reset){
				return db.reset();
			}else if(a.view){
				return db.view();
			}else if(a.viewnoup){
				return #db.f({_id:{$ne:"botnet"}},{upgrades:0}).array();
			}else if(a.viewbotnet){
				return #db.f({_id:"botnet"},{botnet_upgrades:0}).array()
			}
		}else{
			return gtfo;
		}	
	} catch (error) {
		return error.stack;
	}
	
}
