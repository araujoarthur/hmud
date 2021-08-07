function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();

	var db = #fs.socialmud.dbutils();
	var sys = #fs.socialmud.sysutils();
	var account;

	var gui = a => #fs.socialmud.gui(a)

	if(sys.isLoggedIn(caller)){
		if(a && a.sysAccount){
			account = a.sysAccount;
		}else{
			account = db.getAccount(db.getCallerAuthUser(caller).split("_")[1]);
			let page = db.getLastPage(account.username);
		}

		let logoutAttempt = db.logout(account.username,caller)

		if (logoutAttempt.ok){
			return gui({request:["h","sm"], smMessage:"`AYou Disconnected!`", smRelSum:3});
		}else{
			return gui({request:["h","em"], emMessage:"`ALogout failed - Please, report this issue`", emRelSum:3});
		}
	}else{
		return sys.callPage("login");
	}

}
