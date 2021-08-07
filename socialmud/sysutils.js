function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var db = #fs.socialmud.dbutils();
	var pages = ["com", "feed", "credits", "blog", "documentation", "post", "profile", "search", "register", "login", "logout"];//Use on DBUTILS after admin is ready
	var restrictedPages = ["com","register","login","logout"];//Use on DBUTILS after admin is ready
	var restrictedUsernames = ["register", "admin", "moderator", "public", "private", "shared", "friends", "feed","verified","main","profile"];//Use on DBUTILS after admin is ready

	function isLoggedIn(user){
		if(db.getCallerAuthUser(user) != null){
			return true;
		}else{
			return false;
		}
	}

	function callPage(page, sargs){
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
			}
		}else{
			return null;
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
			callPage
		}
	}
}
