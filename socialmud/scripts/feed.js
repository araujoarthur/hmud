function(c, a)
{	
	
		var caller = c.caller;
		var feedSel = "";
		var sys = #fs.socialmud.sysutils();
		var db = #fs.socialmud.dbutils();
		var methods = #fs.socialmud.methods();
		var feedSelOwner;
		var account;
		var n;
		var guiObj = {};

		guiObj.request = [];

		guiObj.nOptions = ["profile", "friends", "post", "search", "logout", "global"];
		guiObj.nnNotifications = [];

		var gui = a => #fs.socialmud.gui(a);

		a=JSON.parse(JSON.stringify(a||{}));
		
	try{
		if(!sys.isLoggedIn(caller)){
			return sys.callPage("login");
		}else{
			if(a && a.sysAccount){
				account = a.sysAccount;
			}else{
				account = db.getAccount(db.getCallerAuthUser(caller));
			}

			db.setLastActive(account._id, Date.now());
			db.setLastPage(account._id, "feed");

			if(!a || !a.feed){
				feedSelOwner = "main";
			}else{
				feedSelOwner = a.feed;
			}

			if(!a || !a.n || typeof(a.n) != "number"){
				n = 10;
			}else{
				n = a.n > 20 ? 20 : a.n;
			}

			if(a && (a.postAgree || a.postDisagree)){
				let indexHeaderPage = guiObj.request.indexOf("hp") == -1 ? guiObj.request.length-1 : guiObj.request.indexOf("hp")+1;
				if(a.postAgree)	{
					a.postAgree = a.postAgree.trim();
					try{
						let agreeAttempt = db.postAgree(a.postAgree,account.username);
					if(agreeAttempt.ok){
						guiObj.wMessage = "`AYou` `Lagreed` `Awith post` `c"+a.postAgree+"``A.`";
						guiObj.wRelSum = 15;
					}else{
						guiObj.wMessage = "`A" +agreeAttempt.msg+ "`";
						guiObj.wRelSum = 3;
					}
					}catch(e){
						guiObj.wMessage = "`c" +a.postAgree+ "` `A is not a valid post.`";
						guiObj.wRelSum = 6;
					}
				}else{
					a.postDisagree = a.postDisagree.trim();
					try{
						let disagreeAttempt = db.postDisagree(a.postDisagree,account.username);
						if(disagreeAttempt.ok){
							guiObj.wMessage = "`AYou` `Ddisagreed` `Awith post` `c"+a.postDisagree+"``A.`";
							guiObj.wRelSum = 15;
						}else{
							guiObj.wMessage = "`A" +disagreeAttempt.msg+ "`"
							guiObj.wRelSum = 3;
						}
					}catch(e){
						guiObj.wMessage = "`c" +a.postDisagree+ "` `A is not a valid post.`";
						guiObj.wRelSum = 6;
					}

				}
			}else if(a && a.removePost){
				a.removePost = a.removePost.trim();
				if(db.postExists(a.removePost)){
					if(sys.checkPostOwnership(a.removePost, account._id).ok){
						let removeAttempt = db.removePost(a.removePost);
						if(removeAttempt){
							guiObj.wMessage = "`A Post` `c"+a.removePost+"` `A was` `Dremoved``A.`";
							guiObj.wRelSum = 15;
						}else{
							guiObj.wMessage = "`A Post` `c"+a.removePost+"` `A is` `Dnot``A valid.`";
							guiObj.wRelSum = 15;
						}
					}else{
						guiObj.wMessage = "`APost` `c" +a.removePost+ "``A isn't yours.`";
						guiObj.wRelSum = 9;	
					}
				}else{
					guiObj.wMessage = "`A Post` `c"+a.removePost+"` `A does` `Dnot``A exist.`";
					guiObj.wRelSum = 15;
				}
				
				
			}

			if(feedSelOwner == "main"){
				guiObj.request.push(...["h","n","t","hp","p"]);
				guiObj.hpTitle = "! Main Feed !";
				guiObj.tUser = account.username;
				guiObj.tReq = db.getReceivedRequestsCount(account._id);
				guiObj.tFriends = db.getFriendCount(account._id);
				guiObj.pPosts = a && a.startDate && a.endDate ? db.getVisiblePosts(account._id, account.friends, n, a.startDate, a.endDate): db.getVisiblePosts(account._id, account.friends,  n);
			}else if(feedSelOwner == account.username){
				guiObj.request.push(...["h","n","t","hp","p"]);
				guiObj.hpTitle = "! Profile's Feed !";
				guiObj.tUser = account.username;
				guiObj.tReq = db.getReceivedRequestsCount(account._id);
				guiObj.tFriends = db.getFriendCount(account._id);
				guiObj.pPosts = a && a.startDate && a.endDate ?  db.getPostsOnFeed(db.usernameToID(feedSelOwner), n, a.startDate, a.endDate) : db.getPostsOnFeed(db.usernameToID(feedSelOwner), n);
			}else{
				if(db.checkUsername(feedSelOwner)){
					guiObj.request.push(...["h","n","t","hp","p"]);
					guiObj.hpTitle = "! "+feedSelOwner+"'s Feed !";
					guiObj.tUser = account.username;
					guiObj.tReq = db.getReceivedRequestsCount(account._id);
					guiObj.tFriends = db.getFriendCount(account._id);
					guiObj.pPosts = a && a.startDate && a.endDate ? db.getPostsOnFeed(db.usernameToID(feedSelOwner), n, a.startDate, a.endDate) : db.getPostsOnFeed(db.usernameToID(feedSelOwner), n);
				}else{
					return gui({request:["h","em"], emMessage:"`AThis feed doesn't exist!`", emRelSum:3});
				}
			}

			if(!guiObj.pPosts){
				guiObj.request.splice(guiObj.request.indexOf("p"), 1);
				guiObj.request.push("nn");
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

			if(a && (a.postAgree || a.postDisagree)){
				let indexHeaderPage = guiObj.request.indexOf("hp") == -1 ? guiObj.request.length-1 : guiObj.request.indexOf("hp")+1;
				guiObj.request.splice(indexHeaderPage,0,"dw");
			}else if(a && a.removePost){
				let indexHeaderPage = guiObj.request.indexOf("hp") == -1 ? guiObj.request.length-1 : guiObj.request.indexOf("hp")+1;
				guiObj.request.splice(indexHeaderPage,0,"dw");
			}
			return gui(guiObj)
		}
	}catch(error){
		return error.stack;
	}
	return { ok:true, msg:"feed" };
}
