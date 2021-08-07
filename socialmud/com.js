function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var account;

	var gui = a => #fs.socialmud.gui(a)

	if(!sys.isLoggedIn(caller)){
		return sys.callPage("login");
	}else{
		if(a && a.sysAccount){
			account = a.sysAccount;
		}else{
			account = db.getAccount(db.getCallerAuthUser(caller).split("_")[1]);
			let page = db.getLastPage(account.username);
		}

		db.setLastActive(account.username, Date.now());

		if (a && a.page && sys.pages.includes(a.page)) {
			if(!sys.restrictedPages.includes(a.page)){
				db.setLastPage(account.username, page);
			}
			return sys.callPage(a.page)
		} else if (account.lastPage != ""){
			return sys.callPage(account.lastpage);
		}else{
			setLastPage(account.username,"feed");
			return sys.callPage("feed");
		}
	}

	return { ok:true };
}
