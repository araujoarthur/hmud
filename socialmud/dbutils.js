function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();

	const ac = "account_"

	/* Register, Login & Account */

	function checkRegister(id){/* Receives _id */
		if(#db.f({type:"account", _id:id},{username:true}).first()){
			return true;
		}else{
			return false;
		}
	}

	function checkUsername(u){ /* Receives Username */
		if(#db.f({type:"account", username:u},{username:true}).first()){
			return true;
		}else{
			return false;
		}
	}

	function getNonSensitiveData(u){ /* Receives Username */
		return #db.f({type:"account", username:u}).first();
	}

	function registerUser(u,p){/* Receives username and password. GENERATES THE ID */
		if (u && p){
			if(checkRegister(ac+u)){
				return false;
			}else{
				let nU = {};
				nU._id = ac+u;
				nU.type = "account";
				nU.username = u;
				nU.password = p.toLowerCase();
				nU.authcaller = "";
				nU.attached = "";
				nU.verified = false;
				nU.vip = false;
				nU.lastactive =  Date.now();
				nU.friends = [];
				nU.description = "";
				nU.defaultprivacy = "public";
				nU.lastpage = "";
				nU.registerdate = Date.now();
				nU.lastUserChange = Date.now();
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

	function setAuthCaller(id,c){ /*Receives ID and Caller*/
		#db.u({type:"account", _id:id},{$set:{authcaller:c}});
		return true;
	}

	function getCallerAuthUser(c){ /*Receives Caller*/
		let auth = #db.f({type:"account", authcaller:c}).first();
		if(auth){
			return auth._id;
		}else {
			return null;
		}
	}

	function getUserAuthCaller(u){ /*Receives ID*/
		let auth = #db.f({type:"account", _id:u}).first();
		if(auth){
			return auth.authcaller;
		}else {
			return null;
		}
	}

	function getAccount(id){/* Receives ID */
		let account = #db.f({type:"account", _id:id}).first();
		if(account){
			return account;
		}else{
			return null;
		}
	}

	function login(u,p,c){ //Receives username, password and caller;
		if(getCallerAuthUser(c)){
			return {ok:true, msg:"Caller already logged in as: "+idToUsername(getCallerAuthUser(c)), account:getAccount(usernameToID(u))}
		}
		let uID = usernameToID(u);
		let account = #db.f({type:"account", _id:uID}).first();
		if(account){
			if(account.password.toLowerCase() == p.toLowerCase()){
				setAuthCaller(uID,c);
				return {ok:true, msg:"Login Authorized!", account:getAccount(uID)};
			}else{
				return {ok:false, msg:"Wrong Password!"};
			}
		}else{
			return {ok:false, msg:"Username not registered!"};
		}
	}

	function logout(u,c){ /* Receives ID and Caller */
		if(getUserAuthCaller(u) == c){
			setAuthCaller(u,"");
			return {ok:true, msg:"Logout Authorized!"};
		}else{
			return {ok:false, msg:"You can't logout an account you are not logged in."};
		}
	}

	function setPassword(id,p){/* Receives ID and Password */
		#db.u({type:"account", _id:id},{$set:{password:p}})
		return true;
	}

	function setDefaultPrivacy(id,p){
		#db.u({type:"account", _id:id},{$set:{defaultprivacy:p}});
		return true;
	}

	function usernameToID(u){ /* Receives Username */
		let id = #db.f({type:"account", username:u},{_id:true}).first();
		if(id){
			return id._id;
		}else{
			return null;
		}
	}

	function idToUsername(id){/* Receives ID */
		let username = #db.f({type:"account", _id:id},{username:true}).first();
		if(username){
			return username.username;
		}else{
			return null;
		}
	}

	function setVip(id){ /* Receives ID */
		let uDoc = #db.f({type:"account", _id:id},{vip:true}).first();
		if(uDoc){
			#db.u({type:"account", _id:id},{$set:{vip:!uDoc.vip}});
			return true;
		}else{
			return false;
		}
	}

	function setVerified(id){/* Receives ID */
		let uDoc = #db.f({type:"account", _id:id},{verified:true}).first();
		if(uDoc){
			#db.u({type:"account", _id:id},{$set:{verified:!uDoc.verified}});
			return true;
		}else{
			return false;
		}
	}

	function setDescription(id,d){/* Receives ID and Description */
		#db.u({type:"account", _id:id},{$set:{description:d}});
		return true;
	}

	function setLastActive(id){ /* Receives ID */
		#db.u({type:"account", _id:id},{$set:{lastactive:Date.now()}});
		return true;
	}

	function getRegisterDate(id){ /* Receives ID */
		return #db.f({type:"account", _id:id}, {registerdate:true}).first().registerdate;
	}



	/* Friendship */

	function checkRequest(u1,u2){ /* Receives IDs (u1 and u2) */
		let request = #db.f({type:"request", $and:[{users:u1},{users:u2}]}).first();
		if(request){
			return {ok:true, from:request.users[0], to:request.users[1]};
		}else{
			return {ok:false};
		}
	}

	function checkFriendship(u1,u2){/* Receives ID */
		let accountU1 = #db.f({type:"account", _id:u1}).first();
		if(accountU1.friends.includes(u2)){
			return {ok:true, friendship:true, u1:idToUsername(u1), u2:idToUsername(u2)};
		}else{
			return {ok:false, friendship:false, u1:idToUsername(u1), u2:idToUsername(u2)};
		}
	}


	function sendRequest(f,r){/* Receives IDs (from and receiver) */
		let req = {}
		req.type = "request";
		req.users = [f,r];

		try {
			#db.us(req,{$setOnInsert:{date:Date.now()}})
			return true
		} catch (e) {
			return false;
		}
	}

	function removeRequest(u1,u2){/* Takes 2 IDs (u1 and u2) */
		if(#db.r({type:"request", $and:[{users:u1},{users:u2}]})){
			return true;
		}else{
			return false;
		}
	}

	function createFriendship(f,r){/*takes two ids (f and r)*/
		let friendships = [#db.u({type:"account", _id:f},{$addToSet:{friends:r}}), #db.u({type:"account", _id:r},{$addToSet:{friends:f}})];
		if(friendships[0][0].nModified == 1 && friendships[1][0].nModified == 1){
			return removeRequest(f,r);
			return true;
		}else{
			removeFriendship(f,r);
			return false;
		}
	}

	function removeFriendship(f,r){/* Receives ID */
		let friendships = #db.u({type:"account", _id:{$in:[f,r]}},{$pullAll:{friends:[r,f]}});
		return true;
	}

	function getRequest(f,r){
		let request = #db.f({type:"request", "users.0":f, "users.1":r}).first();
		if(request){
			return request;
		}else{
			return null;
		}
	}

	function getFriendCount(id){
		let dbres = #db.f({type:"account", _id:id},{friends:true}).first();
		return dbres.friends.length;
	}

	function getReceivedRequests(id){
		let requests = #db.f({type:"request", "users.1":id}).array();
		if(requests.length > 0){
			return requests;
		}else{
			return null;
		}
	}

	function getSentRequests(id){ /* receives userID */
		let requests = #db.f({type:"request", "users.0":id}).array();
		if(requests.length > 0){
			return requests;
		}else{
			return null;
		}
	}

	function getReceivedRequestsCount(id){
		return #db.f({type:"request", "users.1":id}).count();
	}

	function getSentRequestsCount(id){
		return #db.f({type:"request", "users.0":id}).count();
	}

	function getFriendList(id){
		return #db.f({type:"account", _id:id},{friends:true}).first().friends;
	}

	/* Posts */
	function postExists(pId){
		if(#db.f({type:"post", _id:{$oid:pId}}).first()){
			return true;
		}else{
			return false;
		}
	}

	function getUserLastPost(id){
		let post = #db.f({type:"post", author:id}).sort({date:-1}).first();
		if(post){
			return post;
		}else{
			return null;
		}
	}

	function findPostByText(text){
		let post = #db.f({type:"post", content:text}).sort({date:-1}).first();
		if(post){
			return post;
		}else{
			return null;
		}
	}

	function createPost(id,l,t,p){
		let post = {}
		post._id = #db.ObjectId();
		post.type = "post";
		post.author = id;
		post.location = usernameToID(l);
		post.content = t;
		post.date = Date.now();
		post.privacy = p;
		post.agrees = [];
		post.disagrees = [];
		#db.i(post);
		return {ok:true, post:post}
	}

	function postAgree(pId,id){
		let post = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(post){
				#db.u({type:"post", _id:{$oid:pId}},{$pull:{disagrees:id},$addToSet:{agrees:id}});
				return {ok:true, msg:"Agreed!"};
		}else{
			return {ok:false, msg:"Wrong ID"}
		}
	}

	function setPostPrivacy(id,pId,p){
		#db.u({type:"post", _id:{$oid:pId}}, {$set:{privacy:p}});
		return true;
	}

	function postDisagree(pId,id){
		let post = #db.f({type:"post", _id:{$oid:pId}}).first();
		if(post){
				#db.u({type:"post", _id:{$oid:pId}},{$pull:{agrees:id},$addToSet:{disagrees:id}});
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

	function getPostsFromUser(id,n){//gets posts from user
		let posts = #db.f({type:"post", author:id}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else {
			return null;
		}
	}

	function getUserPostCount(id){//gets post count for user
		return #db.f({type:"post", author:id}).count();
	}

	function getFeedPostCount(feed,id){//gets post count received by user
		return #db.f({type:"post", location:feed, author:{$ne:id}}).count();
	}

	function getPostsFromFriends(friends,n){//Gets posts only from friends
		let posts = #db.f({type:"post", author:{$in:friends}}).sort({date:-1}).limit(n).array();
		if(posts){
			return posts;
		}else{
			return null;
		}
	}

	function getVisiblePosts(id,friends,n){//Gets posts from user and friend
		let posts = #db.f({type:"post", author:{$in:[id,...friends]}}).sort({date:-1}).limit(n).array();
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
		if(#db.f({type:"post", _id:{$oid:pId}}).first()){
			#db.r({type:"post", _id:{$oid:pId}});
			return true;	
		}else{
			return false;
		}
	}

	/* Navigation */

	function getLastPage(id){
		return #db.f({type:"account", _id:id},{lastpage:true}).first();
	}

	function setLastPage(id,p){
		#db.u({type:"account", _id:id},{$set:{lastpage:p}})
	}

	/*Flow*/

	if(!a || !a.cli){
		return {view:a => #db.f({}).array(),
		reset:a => #db.r({}),
		checkRegister,
		removeRequest,
		removeFriendship,
		registerUser,
		sendRequest,
		createFriendship,
		getFriendCount,
		getReceivedRequests,
		getReceivedRequestsCount,
		getSentRequestsCount,
		getSentRequests,
		getFriendList,
		setAuthCaller,
		getCallerAuthUser,
		getUserAuthCaller,
		login,
		logout,
		setDescription,
		setLastActive,
		createPost,
		getPostsFromUser,
		getUserPostCount,
		getPostsFromFriends,
		removePost,
		postAgree,
		postDisagree,
		getPostAgrees,
		getPostDisagrees,
		getPostAgreesCount,
		getPostDisagreesCount,
		setDefaultPrivacy,
		setPostPrivacy,
		getVisiblePosts,
		getPostsOnFeed,
		getLastPage,
		setLastPage,
		getAccount,
		getFeedPostCount,
		getRegisterDate,
		searchUser,
		postExists,
		checkUsername,
		getNonSensitiveData,
		checkRequest,
		checkFriendship,
		idToUsername,
		usernameToID,
		getUserLastPost,
		findPostByText}
	}else{
		switch(a.func.toLowerCase()){
			case "view": return #db.f({}).array();
			case "reset": return #db.r({});
			case "checkregister": return checkRegister(a.u);
			case "removerequest": return removeRequest(a.u1,a.u2);
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
			case "searchuser": return searchUser(a.w)
			case "getnonsensitivedata": return getNonSensitiveData(a.u);
			case "checkrequest": return checkRequest(a.u1,a.u2);
			case "checkfriendship": return checkFriendship(a.u1,a.u2);
			case "getuserlastpost": return getUserLastPost(a.u);
			case "findpostbytext": return findPostByText(a.text);
		}
	}




}
