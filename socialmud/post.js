function(c, a)
{
	try{
		var caller = c.caller;
		var l = #fs.scripts.lib();
		var sys = #fs.socialmud.sysutils();
		var db = #fs.socialmud.dbutils();
		var account;
		var n;
		var guiObj = {};
		const ac = "account_";

		guiObj.request = [];

		guiObj.request.push("h","n","t","hp","pi");
		guiObj.nOptions = ["feed", "friends", "profile", "search", "logout"];
		guiObj.nnNotifications = [];
		guiObj.hpTitle= "! Posting !";

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
			db.setLastPage(account._id, "post");

			if(a && a.postContent){
				if(!a.postLocation){
					a.postLocation = account.username;
				}else{
					a.postLocation = a.postLocation.trim();
				}

				let postAttempt = sys.createPost(account,a.postLocation,a.postContent);
				if(postAttempt.ok){
					guiObj.request.push("nn");
					guiObj.nnNotifications.push([postAttempt.msg,postAttempt.mRelSum]);
					guiObj.request.push("p");
					guiObj.pPosts = [postAttempt.post];
				}else{
					guiObj.request.push("nn");
					guiObj.nnNotifications.push([postAttempt.msg,postAttempt.mRelSum]);	
				}
			}

			return gui(guiObj);

		}
	}catch(error){
		return error.stack;
	}
	return { ok:true, msg:"post" };
}
