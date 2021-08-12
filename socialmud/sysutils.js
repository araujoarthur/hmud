function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var db = #fs.socialmud.dbutils();
	var pages = ["com", "feed", "credits", "blog", "documentation", "post", "profile", "search", "register", "login", "logout","friends"];
	var restrictedPages = ["com","register","login","logout"];
	var restrictedUsernames = ["register", "admin", "moderator", "public", "private", "shared", "friends", "feed","verified","main","profile"];
	const ac = "account_"

	function removeIDTag(idtag){
		if(idtag.startsWith(ac)){
			return{ok:true, msg:idtag.split("_")[1]}
		}else{
			return {ok:false, msg:"It's not an ID"}
		}
	}
	function isLoggedIn(user){
		if(db.getCallerAuthUser(user) != null){
			return true;
		}else{
			return false;
		}
	}

	function callPage(page, sargs){
		page = page.trim();
		if(pages.includes(page)){
			switch(page){
				case "com": return #fs.socialmud.com(sargs);
				case "feed": return #fs.socialmud.feed(sargs);
				case "credits": return #fs.socialmud.credits(sargs);
				case "blog": return #fs.socialmud.blog(sargs);
				case "documentation": return #fs.socialmud.documentation(sargs);
				case "post": return #fs.socialmud.post(sargs);
				case "profile": return #fs.socialmud.profile(sargs);
				case "search": return #fs.socialmud.search(sargs);
				case "login": return #fs.socialmud.login(sargs);
				case "details": return #fs.socialmud.details(sargs);
				case "verify": return #fs.socialmud.verify(sargs);
				case "admin": return #fs.socialmud.admin(sargs);
				case "friends": return #fs.socialmud.friends(sargs);
			}
		}else{
			return {ok:false, msg:page};
		}
	}
	
	function checkPostOwnership(pId,id){
		let post = #db.f({type:"post", author:id, _id:{$oid:pId}}).first();
		if(post){
			if(post.author == id){
				return {ok:true, exists:true, msg:"Post exists and ownership is confirmed", owner:db.idToUsername(post.author)}
			}else{
				return {ok:false, exists:true, msg:"Post exists but ownership is not confirmed", owner:db.idToUsername(post.author)}
			}
		}else{
			return {ok:false, exists:false, msg:"Post doesn't exist", owner:""}
		}
	}

	function sendRequest(f,r){
		let receiver = db.usernameToID(r);
		let request = db.checkRequest(f,receiver);
		let friendship = db.checkFriendship(f,receiver);
		if(request && request.ok){
			if(receiver == request.to){
				return {ok:false, exists:true, friends:false, sent:true, from:request.from, to:request.to, msg:"`OYou already sent a request to this user`", mRelSum:3}
			}else if(receiver == request.from){
				return {ok:false, exists:true, friends:false, sent:false, from:request.from, to:request.to, msg:"`OYou already have a request from this user`", mRelSum:3}
			}
		}else if(receiver == f){
			return {ok:false, exists:true, friends:false, sent:true, from:request.from, to:request.to, msg:"`DYou can't send a request to yourself.`", mRelSum:3}
		}else if(friendship.ok){
			return {ok:false, exists:false, friends:true, sent:null, msg:"`OThis user is already on your friend list.`", mRelSum:3}
		}else{
			let reqSent = db.sendRequest(f,receiver);
			return {ok:true, exists:true, friends:false, sent:true, msg:"`LRequest Sent`", mRelSum:3}
		}
	}

	function acceptRequest(f,r){
		let sender = db.usernameToID(f);
		let request = db.checkRequest(sender,r);
		if(request.ok && request.to == r){
			let friendship = db.createFriendship(sender,r);
			if(friendship){
				return {ok:true, friends:true, from:request.from, to:request.r, msg:"`LRequest Accepted.`", mRelSum:3}
			}else{
				return {ok:false, friends:false, from:request.from, to:request.r, msg:"`DFailed to accept request.`", mRelSum:3}
			}
		}else{
			return {ok:false, friends:false, from:request.from, to:request.r, msg:"`DRequest does not exist.`", mRelSum:3}
		}
	}

	function rejectRequest(f,r){/* Takes Username (f) and Id(r) then converts the username f to id in sender */
		let sender = db.usernameToID(f);
		let request = db.checkRequest(sender,r);
		if(sender && request.ok && request.to == r){
			let requestRemoval = db.removeRequest(sender,r);
			if(requestRemoval){
				return {ok:true, friends:false, from:request.from, to:request.r, msg:"`ARequest ``Drejected``A.`", mRelSum:9};	
			}else{
				return {ok:false, friends:false, from:request.from, to:request.r, msg:"`AFailed to reject request.`", mRelSum:3};
			}
		}else{
			return {ok:false, friends:false, from:request.from, to:request.r, msg:"`ARequest does not exist.`", mRelSum:3};
		}
	}

	function removeRequest(f,r){
		let receiver = db.usernameToID(r);
		let request = db.checkRequest(f,receiver);
		if(request.ok && request.to == receiver){
			let requestRemoval = db.removeRequest(f,receiver);
			if(requestRemoval){
				return {ok:true, friends:false, from:request.from, to:request.r, msg:"`ARequest ``Dremoved``A.`", mRelSum:9};	
			}else{
				return {ok:false, friends:false, from:request.from, to:request.r, msg:"`AFailed to remove request.`", mRelSum:3};
			}
		}else{
			return {ok:false, friends:false, from:request.from, to:request.r, msg:"`ARequest does not exist.`", mRelSum:3};
		}
	}

	function addFriend(f,r){
		let receiver = db.usernameToID(r);
		if(f == receiver){
			return {ok:false, msg:"`DYou can't add yourself as friend`", mRelSum:3}; 
		}else if(!db.checkUsername(r)){
			return {ok:false, msg:"`DUser ``C"+r+"``D does not exist.`", mRelSum:9}; 
		}else{
			let request = sendRequest(f,r);
			if(!request.ok){
				if((request.exists && request.sent) || (!request.exists && request.sent == null)){
					return {ok:false, msg:request.msg, mRelSum:request.mRelSum};
				}else if(request.exists && !request.sent){
					let acceptAttempt = acceptRequest(receiver,f)
					return {ok:true, msg:request.msg + " - " + acceptAttempt.msg, mRelSum:request.mRelSum + acceptAttempt.mRelSum};
				}
			}else{
				return {ok:true, msg:request.msg, mRelSum:request.mRelSum}; 
			}
		}
		
	}

	function removeFriend(u1,u2){
		if(db.usernameToID(u2) != null){
			if(!(u1 == u2)){
				if(db.checkFriendship(u1,db.usernameToID(u2)).friendship){
					if(db.removeFriendship(u1,db.usernameToID(u2))){
						return {ok:true, msg:"`LUser` `c"+u2+"` `Lremoved from friend list!`", mRelSum:9}
					}else{
						return {ok:false, msg:"`DFailed to remove friend!`", mRelSum:3}
					}
				}else{
					return {ok:false, msg:"`AUser` `c"+u2+"` `Dis not``A in your friend list.` ", mRelSum:12}	
				}
			}else{
				return {ok:false, msg:"`DYou can't remove yourself!`", mRelSum:3}
			}
		}else{
			return {ok:false, msg:"`AUsername` `c"+u2+"` `Ddoes not``A exist.` ", mRelSum:12}
		}
		
	}

	function hasBeenPosted(text){
		let postAttempt = db.findPostByText(text);
		if(postAttempt){
			let diff = Date.now() - postAttempt.date;
			if(diff < 15*60*1000){
				return true
			}else{
				return false;
			}
		}else{
			return false
		}
	}

	function createPost(user,location,text){
		let privacy = "public";
		if(!db.checkUsername(location)){
			return {ok:false, msg:"`DThis feed does not exist`", mRelSum:3}
		}else if((location == user.username) || db.checkFriendship(user._id,location).friendship){
			if((db.getUserLastPost(user._id) == null) || !(db.getUserLastPost(user._id).content == text)){
				if(!hasBeenPosted(text)){
					if(text.length <= 400){
						let postAttempt = db.createPost(user._id,location,text,privacy);
						if(postAttempt.ok){
							return {ok:true, msg:"`LPost Published!`", mRelSum:3, post:postAttempt.post};
						}else{
							return {ok:false, msg:"`DFailed Posting.`", mRelSum:3}
						}
					}else{
						return {ok:false, msg:"`DPost maximum char count is 400. Your post had:` `C"+text.length.toString()+"``D.`", mRelSum:9};	
					}
				}else{
					return {ok:false, msg:"`DSomeone already said that less than 1/4 hour ago.`", mRelSum:3}
				}
			}else{
				return {ok:false, msg:"`DYou're trying to post the same thing twice.`", mRelSum:3};	
			}

		}else{
			return {ok:false, msg:"`DYou can't post on non-friend feeds`", mRelSum:3};
		}
	}


	

	if(a && a.cli){
		return false
	}
	else{
		return {
			pages,
			restrictedUsernames,
			isLoggedIn,
			callPage,
			checkPostOwnership,
			addFriend,
			removeFriend,
			removeRequest,
			rejectRequest,
			acceptRequest,
			createPost,
			removeIDTag
		}
	}
}
