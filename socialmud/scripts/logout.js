function(c, a)
{
	try{
		var caller = c.caller;
		var db = #fs.socialmud.dbutils();
		var sys = #fs.socialmud.sysutils();
		var account;

		var gui = a => #fs.socialmud.gui(a)

		a=JSON.parse(JSON.stringify(a||{}));
		
		if(sys.isLoggedIn(caller)){
			if(a && a.sysAccount){
				account = a.sysAccount;
			}else{
				account = db.getAccount(db.getCallerAuthUser(caller));
			}

			db.setLastActive(account._id, Date.now());

			let logoutAttempt = db.logout(account._id,caller)

			if (logoutAttempt.ok){
				return gui({request:["h","sm"], smMessage:"`AYou Disconnected!`", smRelSum:3});
			}else{
				return gui({request:["h","em"], emMessage:"`ALogout failed - Please, report this issue`", emRelSum:3});
			}
		}else{
			return sys.callPage("login");
		}
	}catch(error){
		return error.stack;
	}

}
