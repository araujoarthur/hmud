function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var n;
	var account;
	var guiObj = {};
	const ac = "account_";

	guiObj.request = [];

	guiObj.request.push("h","n","t","hp");
	guiObj.nOptions = ["profile", "friends", "post", "search", "logout"];
	guiObj.nnNotifications = [];
	guiObj.hpTitle = "! Global Feed !";
	var gui = a => #fs.socialmud.gui(a);
		

	if(!sys.isLoggedIn(caller)){
		return sys.callPage("login");
	}else{
		if(a && a.sysAccount){
			account = a.sysAccount;
		}else{
			account = db.getAccount(db.getCallerAuthUser(caller));
		}

		guiObj.tUser = account.username;
		guiObj.tReq = db.getReceivedRequestsCount(account._id);
		guiObj.tFriends = db.getFriendCount(account._id);

		db.setLastActive(account._id, Date.now());
		db.setLastPage(account._id, "global");

		if(a && a.n){
			n = a.n;
		}else{
			n = 10;
		}


	}
	return { ok:false };
}
