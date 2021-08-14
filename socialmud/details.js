function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var account;
	var guiObj = {};
	const ac = "account_";
	
	guiObj.request = [];

	guiObj.request.push("h","n","t","hp");
	guiObj.nOptions = ["feed", "friends", "post", "search", "logout"];
	guiObj.nnNotifications = [];
	guiObj.hpTitle = "! Details !"

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
		db.setLastPage(account._id, "feed");

		if(a && a.post){
			try {
				let postAtt = db.getPost(a.post);
				if(postAtt){
					guiObj.request.push("p");
					guiObj.pPosts = [postAtt];
					guiObj.request.push("sh");
					guiObj.shHeaders = [];
					guiObj.gnLists = [];
					guiObj.shHeaders.push(["`LAgrees`",3]);
					guiObj.request.push("gn");
					guiObj.gnLists.push(db.getPostAgrees(a.post));
					guiObj.request.push("sh");
					guiObj.shHeaders.push(["`DDisagrees`",3]);
					guiObj.request.push("gn");
					guiObj.gnLists.push(db.getPostDisagrees(a.post));
				}else{
					if (!guiObj.request.includes("nn")){
						guiObj.request.push("nn");
					}
					guiObj.nnNotifications.push(["`c"+a.post+"` `Ddoes not exist.`",6]);
				}
			} catch (error) {
				return error.stack
				if (!guiObj.request.includes("nn")){
					guiObj.request.push("nn");
				}
				guiObj.nnNotifications.push(["`c"+a.post+"` `Dis not a valid post.`",6]);
			}
			
		}else{
			guiObj.request.push("di")
		}

		return gui(guiObj)
	}


	return { ok:true, msg:"details"};
}
