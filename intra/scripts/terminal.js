function(context, args)
{
	var caller = c.caller;
	const gtfo = "Connected to intra.terminal"

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedUsers = ndb.getAllowedUsers();
	var bots = ndb.getBots();
	if(!allowedUsers.includes(caller)&&!bots.includes(caller)) return gtfo;

	var il = #ns.intra.lib();

	if(a){
		if(a.registerUser && a.corp){
			return il.registerUser(a.registerUser,a.corp);
		}else if(a.whitelistCorp){
			return il.insertWhitelistedCorp(a.whitelistCorp);
		}else if(a.insertPermission && a.desc && a.usage){
			try {
				return il.insertPermission(a.insertPermission, a.desc, a.usage);	
			} catch (error) {
				return error.stack
			}
			
		}else if(a.getRegister){
			return il.getRegister(a.getRegister);
		}else if(a.getRegisters){
			return il.getRegisters();
		}else if(a.getPermission){
			return il.getPermission(a.getPermission);
		}else if(a.getPermissions){
			return il.getPermissions();
		}else if(a.getSettings){
			return il.getSettings();
		}else if(a.isWhitelistedCorp){
			return il.isWhitelistedCorp(a.isWhitelistedCorp);
		}else if(a.view){
			return #db.f({}).array();
		}else if(a.removeUser){
			return il.removeUser(a.removeUser)
		}else if(a.addAlt && a.user){
			return il.addAlt(a.user, a.addAlt);
		}else if(a.removeAlt && a.user){
			return il.removeAlt(a.user, a.removeAlt);
		}else if(a.banAccount){
			return il.banAccount(a.banAccount);
		}else if(a.unbanAccount){
			return il.unbanAccount(a.unbanAccount);
		}else if(a.changeCorp && a.user){
			return il.changeCorp(a.user, a.changeCorp);
		}else if(a.setCorpLevel && a.user){
			return il.setCorpLevel(a.user, a.setCorpLevel);
		}else if(a.isPermission){
			return il.isPermission(a.isPermission);
		}else if(a.givePermission && a.user){
			return il.givePermission(a.user, a.givePermission);
		}else if(a.revokePermission && a.user){
			return il.revokePermission(a.user, a.revokePermission);
		}else if(a.reset){
			return #db.r({});
		}else if("isPermissionCode" in a){
			return il.isPermissionCode(a.isPermissionCode);
		}
	}
}
