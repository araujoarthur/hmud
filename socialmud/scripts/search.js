function(c, a)
{
	var caller = c.caller;
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var account;
	var guiObj = {};
	const ac = "account_";
	
	guiObj.request = [];

	guiObj.request.push("h","n","t","hp");
	guiObj.nOptions = ["profile", "global", "friends", "post", "search", "logout"];
	guiObj.nnNotifications = [];
	guiObj.hpTitle = "! Search !"

	var gui = a => #fs.socialmud.gui(a);

	a=JSON.parse(JSON.stringify(a||{}));

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
		db.setLastPage(account._id, "search");

		if(a && a.search){
			let searchAtt = sys.userSearch(a.search);
			if(searchAtt.ok){
				guiObj.request.push("s");
				guiObj.sResults = searchAtt.searchResults;
			}else{
				guiObj.request.push("nn");
				guiObj.nnNotifications.push(["`dSearch returned no results`",3])
			}
		}else{
			guiObj.request.push("ds")
		}

		return gui(guiObj)
	}
	return { ok:false, msg:"search" };
}
