function(c, a)
{
	try{
		var caller = c.caller;
		var l = #fs.scripts.lib();
		var sys = #fs.socialmud.sysutils();
		var db = #fs.socialmud.dbutils();
		var account;
		var guiObj = {};

		var gui = a => #fs.socialmud.gui(a);

		guiObj.request = [];
		guiObj.shHeaders = [];
		

		guiObj.nOptions = ["profile", "feed", "post", "search", "logout"];
		guiObj.request.push("h","n","t","hp");
		guiObj.hpTitle = "! Friends !";

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
			db.setLastPage(account._id, "friends");

			try {


				if(a){
					guiObj.nnNotifications = [];
					let reqAttempt;
					guiObj.request.push("nn");
					if(a.removeFriend){
						a.removeFriend = a.removeFriend.trim();
						reqAttempt = sys.removeFriend(account._id, a.removeFriend);	
						guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum]);
					}else if(a.addFriend){
						a.addFriend = a.addFriend.trim();
						reqAttempt = sys.addFriend(account._id, a.addFriend);
						guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum]);
					}else if(a.rejectRequest){
						a.rejectRequest = a.rejectRequest.trim();
						reqAttempt = sys.rejectRequest(a.rejectRequest,account._id);
						guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum]);
					}else if(a.acceptRequest){
						a.acceptRequest = a.acceptRequest.trim();
						reqAttempt = sys.acceptRequest(a.acceptRequest,account._id);
						guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum]);
					}else if(a.removeRequest){
						a.removeRequest = a.removeRequest.trim();
						reqAttempt = sys.removeRequest(account._id, a.removeRequest);
						guiObj.nnNotifications.push([reqAttempt.msg,reqAttempt.mRelSum]);
					}
				}
				
			} catch (error) {
				return error.stack;
			}
		
			

			guiObj.flFriends = account.friends.map(o=>db.idToUsername(o));
			if(guiObj.flFriends.length > 0){
				guiObj.request.push("fl");	
			}else{
				guiObj.request.push("sh");
				guiObj.shHeaders.push(["`LEmpty`",3])
			}

			guiObj.request.push("sh");
			guiObj.shHeaders.push(["`fReceived Requests`",3]);

			
			guiObj.rrReq = account.username;

			if(guiObj.rrReq == null){
				guiObj.request.push("sh");
				guiObj.shHeaders.push(["`LEmpty`",3])
			}else{
				if (guiObj.rrReq.length == 1){
					guiObj.rrReq = [guiObj.rrReq];
				}
				guiObj.request.push("rr");
			}

			guiObj.request.push("sh");
			guiObj.shHeaders.push(["`fSent Requests`",3])

			guiObj.srReq = account.username;

			if(guiObj.srReq == null){
				guiObj.request.push("sh");
				guiObj.shHeaders.push(["`LEmpty`",3])
			}
			else{
				guiObj.request.push("sr")	
			}

			try {
				return gui(guiObj);
			} catch (error) {
				return error.stack;
			}

		}
	}catch(error){
		return error.stack;
	}

	return { ok:true, mgs:"friends" };
}
