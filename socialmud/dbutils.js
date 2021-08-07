function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();

	const ac = "account_"

	/* Register & login */

	function checkRegister(u){
		if(#db.f({type:"account", _id:ac+u},{username:true}).first()){
			return true;
		}else{
			return false;
		}
	}

	function registerUser(u,p){
		if (u && p){
			if(checkRegister(u)){
				return false;
			}else{
				let nU = {};
				nU._id = ac+u;
				nU.type = "account";
				nU.username = u;
				nU.password = p.toLowerCase();
				nU.authcaller = "";
				nU.verified = false;
				nU.vip = false;
				nU.lastactive =  Date.now();
				nU.friends = [];
				nU.description = "";
				nU.defaultprivacy = "public";
				nU.lastpage = "";
				nU.registerdate = Date.now();
				#db.i(nU);
				return true;
			}
		}
	}

	function searchUser(word){
		let results = #db.f({type:"account", username:{$regex:word}},{username:true, lastactive:true}).array();
		let retRes = [];
		if (results){
			for(let result of results){
				retRes.push([result.username,result.lastactive]);
			}
		}
		return retRes;
	}

	function setAuthCaller(u,c){
		#db.u({type:"account", _id:ac+u},{$set:{authcaller:c}});
		return true;
	}

	function getCallerAuthUser(c){
		let auth = #db.f({type:"account", authcaller:c}).first();
		if(auth){
			return auth._id;
		}else {
			return null;
		}
	}

	function getUserAuthCaller(u){
		let auth = #db.f({type:"account", _id:ac+u}).first();
		if(auth){
			return auth.authcaller;
		}else {
			return null;
		}
	}

	function getAccount(u){
		let account = #db.f({type:"account", _id:ac+u}).first();
		if(account){
			return account;
		}else{
			return null;
		}
	}

	function login(u,p,c){
		if(getCallerAuthUser(c)){
			return {ok:true, msg:"Caller already logged in as: "+getCallerAuthUser(c).split('_')[1], account:getAccount(u)}
		}
		let account = #db.f({type:"account", username:u}).first();
		if(account){
			if(account.password.toLowerCase() == p.toLowerCase()){
				setAuthCaller(u,c);
				return {ok:true, msg:"Login Authorized!", account:getAccount(u)};
			}else{
				return {ok:false, msg:"Wrong Password!"};
			}
		}else{
			return {ok:false, msg:"Wrong Username!"};
		}
	}

	function logout(u,c){
		if(getUserAuthCaller(u) == c){
			setAuthCaller(u,"");
			return {ok:true, msg:"Logout Authorized!"};
		}else{
			return {ok:false, msg:"You can't logout an account you are not logged in."};
		}
	}

	function setPassword(u,p){
		#db.u({type:"account", _id:ac+u},{$set:{password:p}})
		return true;
	}

	function setDefaultPrivacy(u,p){
		#db.u({type:"account", _id:ac+u},{$set:{defaultprivacy:p}});
		return true;
	}

	/* Profile */

	function setDescription(u,d){
		#db.u({type:"account", _id:ac+u},{$set:{description:d}});
		return true;
	}

	function setLastActive(u){
		#db.u({type:"account", _id:ac+u},{$set:{lastactive:Date.now()}});
		return true;
	}

	function getRegisterDate(u){
		return #db.f({type:"account", _id:ac+u}, {registerdate:true}).first().registerdate;
	}

	/* Friendship */

	function sendRequest(f,r){
		let req = {}
		req.type = "request";
		req.users = [ac+f,ac+r];

		try {
			#db.us(req,{$setOnInsert:{date:Date.now()}})
			return true
		} catch (e) {
			return false;
		}
	}

	function removeRequest(u){
		if(#db.r({users:ac+u})[0].n){
			return true;
		}else{
			return false;
		}
	}

	function createFriendship(f,r){
		let friendships = [#db.u({type:"account", _id:ac+f},{$addToSet:{friends:ac+r}}), #db.u({type:"account", _id:ac+r},{$addToSet:{friends:ac+f}})];
		if(friendships[0][0].nModified == 1 && friendships[1][0].nModified == 1){
			return removeRequest(f);
			return true;
		}else{
			removeFriendship(f,r);
			return false;
		}
	}

	function removeFriendship(f,r){
		let friendships = #db.u({type:"account", _id:{$in:[ac+f,ac+r]}},{$pullAll:{friends:[ac+r,ac+f]}});
		return true;
	}

	function getRequest(f,r){
		let request = #db.f({type:"request", "users.0":ac+f, "users.1":ac+r}).first();
		if(request){
			return request;
		}else{
			return null;
		}
	}

	function getFriendCount(u){
		let dbres = #db.f({type:"account", _id:ac+u},{friends:true}).first();
		return dbres.friends.length;
	}

	function getReceivedRequests(u){
		let requests = #db.f({type:"request", "users.1":ac+u}).array();
		if(requests){
			return requests
		}else{
			return null;
		}
	}

	function getSentRequests(u){
		let requests = #db.f({type:"request", "users.0":ac+u}).array();
		if(requests){
			return requests;
		}else{
			return null;
		}
	}

	function getReceivedRequestsCount(u){
		return #db.f({type:"request", "users.1":ac+u}).count();
	}

	function getSentRequestsCount(u){
		return #db.f({type:"request", "users.0":ac+u}).count();
	}

	function getFriendList(u){
		return #db.f({type:"account", _id:ac+u},{friends:true}).first().friends;
	}

	/* Posts */
	function createPost(u,l,t,p){
		let post = {}
		post.type = "post";
		post.author = ac+u;
		post.location = l;
		post.content = t;
		post.date = Date.now();
		post.privacy = p;
		post.agrees = [];
		post.disagrees = [];
		#db.i(post);
		return true;
	}

	function postAgree(pId,u){
		let post = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(post){
				#db.u({type:"post", _id:{$oid:pId}},{$pull:{disagrees:u},$addToSet:{agrees:u}});
				return {ok:true, msg:"Agreed!"};
		}else{
			return {ok:false, msg:"Wrong ID"}
		}
	}

	function setPostPrivacy(u,pId,p){
		let user = #db.f({type:"account", _id:ac+u}).first();
		let post = #db.f({type:"post", _id:{$Oid:pId}}).first();
		if (user._id == post.author){
			#db.u({type:"post", _id:{$oid:pId}}, {$set:{privacy:p}})
			return{ok:true, msg:"Privacy Updated!"};
		}else{
			return {ok:false, msg:"You're not post author"};
		}

	}

	function postDisagree(pId,u){
		let post = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(post){
				#db.u({type:"post", _id:{$oid:pId}},{$pull:{agrees:u},$addToSet:{disagrees:u}});
				return {ok:true, msg:"Disagreed!"};
		}else{
			return {ok:false, msg:"Wrong ID"}
		}
	}

	function getPostAgrees(pId){
		let agrees = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(agrees){
			return agrees.agrees;
		}else{
			return null;
		}
	}

	function getPostDisagrees(pId){
		let disagrees = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(disagrees){
			return disagrees.disagrees;
		}else{
			return null;
		}
	}

	function getPostAgreesCount(pId){
		let agrees = #db.f({type:"post", _id:{$oid:pId}},{agrees:true}).first();
		if(agrees){
			return agrees.agrees.length;
		}else{
			return null;
		}
	}

	function getPostDisagreesCount(pId){
		let disagrees = #db.f({type:"post", _id:{$oid:pId}},{disagrees:true}).first();
		if(disagrees){
			return disagrees.disagrees.length;
		}else{
			return null;
		}
	}

	function getPostsFromUser(u,n){//gets posts from user
		let posts = #db.f({type:"post", author:ac+u}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else {
			return null;
		}
	}

	function getUserPostCount(u){//gets post count for user
		return #db.f({type:"post", author:ac+u}).count();
	}

	function getFeedPostCount(feed,u){//gets post count for user
		return #db.f({type:"post", location:u, author:{$ne:ac+u}}).count();
	}

	function getPostsFromFriends(friends,n){//Gets posts only from friends
		let posts = #db.f({type:"post", author:{$in:friends}}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else{
			return null;
		}
	}

	function getVisiblePosts(u,friends,n){//Gets posts from user and friend
		let posts = #db.f({type:"post", author:{$in:[u,...friends]}}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else{
			return null;
		}
	}

	function getPostsOnFeed(feed,n){//Gets posts on specific feed
		let posts = #db.f({type:"post", location:feed}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else {
			return null;
		}
	}

	function removePost(pId){
		#db.r({type:"post", _id:{$oid:pId}});
		return true;
	}

	/* Navigation */

	function getLastPage(u){
		return #db.f({type:"account", _id:ac+u},{lastpage:true}).first();
	}

	function setLastPage(u,p){
		#db.u({type:"account", _id:ac+u},{$set:{lastpage:p}})
	}

	/*Flow*/

	if(!a || !a.cli){
		return {view:a => #db.f({}).array(),
		reset:a => #db.r({}),
		checkRegister:checkRegister,
		removeRequest:removeRequest,
		removeFriendship:removeFriendship,
		registerUser:registerUser,
		sendRequest:sendRequest,
		createFriendship:createFriendship,
		getFriendCount:getFriendCount,
		getReceivedRequests:getReceivedRequests,
		getReceivedRequestsCount:getReceivedRequestsCount,
		getSentRequestsCount:getSentRequestsCount,
		getSentRequests:getSentRequests,
		getFriendList:getFriendList,
		setAuthCaller:setAuthCaller,
		getCallerAuthUser:getCallerAuthUser,
		getUserAuthCaller:getUserAuthCaller,
		login:login,
		logout:logout,
		setDescription:setDescription,
		setLastActive:setLastActive,
		createPost:createPost,
		getPostsFromUser:getPostsFromUser,
		getUserPostCount:getUserPostCount,
		getPostsFromFriends:getPostsFromFriends,
		removePost:removePost,
		postAgree:postAgree,
		postDisagree:postDisagree,
		getPostAgrees:getPostAgrees,
		getPostDisagrees:getPostDisagrees,
		getPostAgreesCount:getPostAgreesCount,
		getPostDisagreesCount:getPostDisagreesCount,
		setDefaultPrivacy:setDefaultPrivacy,
		setPostPrivacy:setPostPrivacy,
		getVisiblePosts:getVisiblePosts,
		getPostsOnFeed:getPostsOnFeed,
		getLastPage:getLastPage,
		setLastPage:setLastPage,
		getAccount:getAccount,
		getFeedPostCount:getFeedPostCount,
		getRegisterDate:getRegisterDate,
		searchUser:searchUser}
	}else{
		switch(a.func.toLowerCase()){
			case "view": return #db.f({}).array();
			case "reset": return #db.r({});
			case "checkregister": return checkRegister(a.u);
			case "removerequest": return removeRequest(a.u);
			case "removefriendship": return removeFriendship(a.f,a.r);
			case "registeruser": return registerUser(a.u,a.p);
			case "sendrequest": return sendRequest(a.f,a.r);
			case "createfriendship": return createFriendship(a.f, a.r);
			case "getfriendcount": return getFriendCount(a.u);
			case "getreceivedrequests": return getReceivedRequests(a.u);
			case "getsentrequests": return getSentRequests(a.u);
			case "getreceivedrequestscount": return getReceivedRequestsCount(a.u);
			case "getsentrequestscount": return getSentRequestsCount(a.u);
			case "getfriendlist": return getFriendList(a.u);
			case "setauthcaller": return setAuthCaller(a.u, a.c);
			case "getcallerauthuser": return getCallerAuthUser(a.c);
			case "getuserauthcaller": return getUserAuthCaller(a.u);
			case "login": return login(a.u,a.p,a.c);
			case "logout": return logout(a.u,a.c);
			case "setdescription": return setDescription(a.u, a.d);
			case "setlastactive": return setLastActive(a.u);
			case "createpost": return createPost(a.u, a.l, a.t,a.p);
			case "getpostsfromuser": return getPostsFromUser(a.u,a.n);
			case "getuserpostcount": return getUserPostCount(a.u);
			case "getpostsfromfriends": return getPostsFromFriends(a.u,a.n);
			case "removepost": return removePost(a.pid);
			case "postagree": return postAgree(a.pid, a.u);
			case "postdisagree": return postDisagree(a.pid, a.u);
			case "getpostagrees": return getPostAgrees(a.pid);
			case "getpostdisagrees": return getPostDisagrees(a.pid);
			case "getpostdisagreescount": return getPostDisagreesCount(a.pid);
			case "getpostagreescount": return getPostAgreesCount(a.pid);
			case "setdefaultprivacy": return setDefaultPrivacy(a.u,a.p);
			case "setpostprivacy": return setPostPrivacy(a.u, a.pid, a.p)
			case "getlastpage": return getLastPage(a.u);
			case "setlastpage": return setLastPage(a.u,a.p);
			case "getaccount": return getAccount(a.u);
			case "getfeedpostcount": return getFeedPostCount(a.feed, a.u);
			case "getregisterdate": return getRegisterDate(a.u);
			case "searchuser": return searchUser(a.w);
		}
	}




}
