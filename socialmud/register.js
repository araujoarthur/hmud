function(c, a)
{
	try{
		var caller = c.caller;
		var l = #fs.scripts.lib();
		var db = #fs.socialmud.dbutils();
		var sys = #fs.socialmud.sysutils();

		var gui = a => #fs.socialmud.gui(a)

		if(!sys.isLoggedIn(caller)){
			if(!a || !a.password || !a.username){
				return gui({request:["h","em"], emMessage:"`AYou must provide an``N username``A and``N password``A combination to ``Lregister``A!`", emRelSum:21});
			}else{
				a.username = a.username.trim();
				a.password = a.password.trim();
				if(!sys.restrictedUsernames.includes(a.username.toLowerCase())){
					if(db.registerUser(a.username, a.password)){
						return gui({request:["h","sm"], smMessage:"`AAccount Created! You can now login on socialmud.login{username:\"u\", password:\"p\"}`", smRelSum:3});
					}else {
						return gui({request:["h","em"], emMessage:"`AFailed to create account! Username``h already exists.`", emRelSum:6});
					}
				}else{
					return gui({request:["h","em"], emMessage:"`AYou used a restricted username!`", emRelSum:3});
				}

			}

		}else{
			return sys.callPage("com");
		}
	}catch(error){
		return error.stack;
	}
	return { ok:true, msg:"register" };
}
