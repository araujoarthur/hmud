function(c, a)
{
	try{
		var caller = c.caller;
		var sys = #fs.socialmud.sysutils();
		var db = #fs.socialmud.dbutils();
		var account;

		var gui = a => #fs.socialmud.gui(a)


		a=JSON.parse(JSON.stringify(a||{}));
		
		if(!sys.isLoggedIn(caller)){
			return sys.callPage("login");
		}else{
			if(a && a.sysAccount){
				account = a.sysAccount;
			}else{
				account = db.getAccount(db.getCallerAuthUser(caller));
				let page = db.getLastPage(account._id);
			}

			db.setLastActive(account._id, Date.now());

			if (a && a.page && sys.pages.includes(a.page.trim())){
				a.page = a.page.trim()
				if(!sys.restrictedPages.includes(a.page)){
					db.setLastPage(account._id, a.page);
				}
				let page = a.page
				delete a.page;
				return sys.callPage(page, a)
			} else if (account.lastPage != ""){
				return sys.callPage(account.lastpage);
			}else{
				setLastPage(account._id,"feed");
				return sys.callPage("feed");
			}
		}
	}catch(error){
		return error.stack;
	}
	return { ok:true };
}
