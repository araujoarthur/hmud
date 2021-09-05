function(c, a)
{
	try{
		var caller = c.caller;
		var sys = #fs.socialmud.sysutils();
		var db = #fs.socialmud.dbutils();
		var account;
		var guiObj = {};
		const ac = "account_";

		guiObj.request = [];

		guiObj.request.push("h","n","t","hp");
		guiObj.nOptions = ["feed", "global", "friends", "post", "search", "logout"];
		guiObj.nnNotifications = [];

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
			db.setLastPage(account._id, "profile");

			if(a && a.addFriend){
				a.addFriend = a.addFriend.trim();
				let reqAttempt = sys.addFriend(account._id, a.addFriend);
				guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum])
			}

			if(a && (a.profile && (a.profile != account.username))){
				a.profile = a.profile.trim();
				if(db.checkUsername(a.profile)){
					guiObj.request.push("pp");
					guiObj.hpTitle = "! "+a.profile +" - Profile !"
					guiObj.ppAcct = db.getNonSensitiveData(a.profile);
				}else{
					guiObj.request.push("dw");
					guiObj.request.push("pp");
					guiObj.wMessage = "`AUsername` `D"+a.profile+"` `Adoesn't exist.`";
					guiObj.wRelSum = 9;	
					guiObj.hpTitle = "! Profile !"
					guiObj.ppAcct = db.getNonSensitiveData(account.username);
				}
			}else{
				guiObj.request.push("pp");
				guiObj.hpTitle = "! Profile !";
				guiObj.ppAcct = db.getNonSensitiveData(account.username);
			}

			if(guiObj.nnNotifications.length > 0){
				let indexHeaderPage = guiObj.request.indexOf("pp");
				guiObj.request.splice(indexHeaderPage-1,0,"nn");
			}

			return gui(guiObj);	
		}
	}catch(error){
		return error.stack;
	}
	return { ok:true, msg:"profile" };
}
