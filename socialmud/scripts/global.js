function(context, args)
{
	var caller = context.caller;
	var caller = c.caller;
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var n;
	var account;
	var guiObj = {};
	const ac = "account_";

	guiObj.request = [];

	guiObj.request.push("h","n","t","hp");
	guiObj.nOptions = ["profile", "feed", "friends", "post", "search", "logout"];
	guiObj.nnNotifications = [];
	guiObj.hpTitle = "! Global Feed !";
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
		db.setLastPage(account._id, "global");

		if(a && a.n){
			n = a.n;
		}else{
			n = 10;
		}
		let posts;
		if(a && a.startDate && a.endDate){
			a.startDate = a.startDate.trim();
			a.endDate = a.endDate.trim();
			posts = db.getGlobalFeed(n,a.startDate, a.endDate);
		}else{
			posts = db.getGlobalFeed(n)
		}
		if(posts){
			guiObj.request.push("p");
			guiObj.pPosts = posts
		}else{
			if(a && a.startDate && a.endDate){
				if(methods.parseDate(a.startDate).ok===false || methods.parseDate(a.endDate).ok === false){
					guiObj.nnNotifications.push(["`DInvalid Input Format`",3]);
				}else if(methods.parseDate(a.startDate) > methods.parseDate(a.endDate)){
					guiObj.nnNotifications.push(["`NendDate``A(``V"+a.endDate+"``A) can't be earlier than ``NstartDate``A(``V"+a.startDate+"``A)`",24]);
				}else{
					guiObj.nnNotifications.push(["`DNo posts found between ``A"+a.startDate+"``D and ``A"+a.endDate+"`",12]);
				}	
			}else{
				guiObj.nnNotifications.push(["`DThere are no posts!`",3]);
			}
		}
		
		return gui(guiObj)

	}
	return { ok:false };
}
