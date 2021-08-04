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
				#db.i(nU);
				return true;
			}
		}
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

	function login(u,p,c){
		if(getCallerAuthUser(c)){
			return {ok:true, msg:"Caller already logged in as: "+getCallerAuthUser(c).split('_')[1]}
		}
		let account = #db.f({type:"account", username:u}).first();
		if(account){
			if(account.password.toLowerCase() == p.toLowerCase()){
				setAuthCaller(u,c);
				return {ok:true, msg:"Login Authorized!"};
			}else{
				return {ok:false, msg:"Wrong Password!"};
			}
		}else{
			return {ok:false, msg:"Wrong username!"};
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
	}

	/* Profile */

	function setDescription(u,d){
		#db.u({type:"account", _id:ac+u},{$set:{description:d}})
	}

	function setLastActive(u){
		#db.u({type:"account", _id:ac+u},{$set:{lastactive:Date.now()}})
		return true;
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

	/*Flow*/

	switch(a.func.toLowerCase()){
		case "view": return #db.f({_id:{$exists:true}}).array();
		case "reset": return #db.r({_id:{$exists:true}});
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
	}
}
