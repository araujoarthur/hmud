function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var db = #fs.socialmud.dbutils();
	var sys = #fs.socialmud.sysutils();
	var account;

	var gui = a => #fs.socialmud.gui(a)


	if(sys.isLoggedIn(caller)){
		account = db.getAccount(db.getCallerAuthUser(caller).split("_")[1]);
		let page = db.getLastPage(account.username);
		return sys.callPage(page, {sysAccount:account});
	}else if(!args){
		return gui({request:["h","H"]})
	}else if(!args.username || !args.password){
		return gui({request:["h","em"], emMessage:"`AYou must provide an ``Nusername``A and``N password``A combination`", emRelSum:15});
	}else if(args.username && args.password){
		let loginAttempt = db.login(args.username, args.password,caller);
		if (loginAttempt.ok == true){
			let page = loginAttempt.account.lastpage != "" ? loginAttempt.account.lastpage : "feed";
			return sys.callPage(page, {sysAccount:loginAttempt.account});
		}else{
			return gui({request:["h","em"], emMessage:"`A"+loginAttempt.msg+"`", emRelSum:3});
		}
	}

}
