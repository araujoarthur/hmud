function(c, a)
{
	
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to native.test"

	var db = #ns.native.db();
	if(db == "Connected to native.db") return gtfo;

	var allowedUsers = db.getAllowedUsers();

	if(!allowedUsers.includes(caller)) return gtfo
	
	return #ns.native.utils();
	
}
