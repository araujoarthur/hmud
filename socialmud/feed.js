function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var feedSel = "";
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var feedSelOwner;
	var account;
	var n;
	var guiObj = {};
	guiObj.request = [];

	var gui = a => #fs.socialmud.gui(a);

	if(!sys.isLoggedIn(caller)){
		return sys.callPage("login");
	}else{
		if(a && a.sysAccount){
			account = a.sysAccount;
		}else{
			account = db.getAccount(db.getCallerAuthUser(caller).split("_")[1]);
			let page = db.getLastPage(account.username);
		}

		db.setLastActive(account.username, Date.now());

		if(!a || !a.feed){
			feedSelOwner = "main";
		}else{
			feedSelOwner = a.feed;
		}

		if(!a || !a.n || typeof(n) != "number"){
			n = 10;
		}else{
			n = a.n;
		}

		if(a && (a.postAgree && a.postDisagree)){
			db.postAgree(account.username)
		}

		if(feedSelOwner == "main"){
				guiObj.request.push(...["h","n","t","hp","p"]);
				guiObj.hpTitle = "! Main Feed !";
				guiObj.nOptions = ["profile", "friends", "post", "search", "logout"];
				guiObj.tUser = account.username;
				guiObj.tReq = db.getReceivedRequestsCount(account.username);
				guiObj.tFriends = db.getFriendCount(account.username);
				guiObj.pPosts = db.getVisiblePosts(account.username, account.friends,  n);
		}else if(feedSelOwner == account.username){
			guiObj.request.push(...["h","n","t","hp","p"]);
			guiObj.hpTitle = "! Profile's Feed !";
			guiObj.nOptions = ["profile", "friends", "post", "search", "logout"];
			guiObj.tUser = account.username;
			guiObj.tReq = db.getReceivedRequestsCount(account.username);
			guiObj.tFriends = db.getFriendCount(account.username);
			guiObj.pPosts = db.getPostsOnFeed(feedSelOwner, n);
		}else{
			if(db.checkRegister(feedSelOwner)){
				guiObj.request.push(...["h","n","t","hp","p"]);
				guiObj.hpTitle = "! "+feedSelOwner+"'s Feed !";
				guiObj.nOptions = ["profile", "friends", "post", "search", "logout"];
				guiObj.tUser = account.username;
				guiObj.tReq = db.getReceivedRequestsCount(account.username);
				guiObj.tFriends = db.getFriendCount(account.username);
				guiObj.pPosts = db.getPostsOnFeed(feedSelOwner, n);
			}else{
				return gui({request:["h","em"], emMessage:"`AThis feed doesn't exist!`", emRelSum:3});
			}
		}

		return gui(guiObj)
	}

	return { ok:true, msg:"feed" };
}
