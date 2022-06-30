function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to intra.lib";

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedScripts = ndb.getScripts();
	if(caller != "intra" && !allowedScripts.includes(script)) return gtfo;
	
	var m = #ns.native.methods();

	function insertWhitelistedCorp(corp){
		corp = corp.toLowerCase();
		return #db.us({_id:"management"},{$addToSet:{corps:corp}})
	}

	function insertPermission(perm,desc, usage){
		perm = perm.toUpperCase();
		let q = getPermissions();
		var code;
		if(!q){
			code = 0;
			#db.us({_id:"permissions"},{$set:{[perm]:{code:0, desc, usage}}})
		}else{
			code = q[Object.keys(q)[Object.keys(q).length-1]].code+1;
			#db.us({_id:"permissions"},{$set:{[perm]:{code:code, desc, usage}}});
		}
		if(!Object.keys(q).includes(perm)){
			#db.us({_id:"permission_codes"}, {$set:{[code]:perm}});
		}
		return #db.us({_id:"management"},{$addToSet:{permissions:perm}});
	}

	function registerUser(user,corp){
		user = user.toLowerCase();
		corp = corp.toLowerCase();
		if (getRegister(user).ok) return {ok:false};
		if (!isWhitelistedCorp(corp).ok) return {ok:false};
		let usr = {};
		usr._id = "register_"+user;
		usr.username = user;
		usr.alts = [];
		usr.account = {}
		usr.account.status = 1;
		usr.account.permissions = [];
		usr.corp = {};
		usr.corp.name = corp;
		usr.corp.level = 0;
		usr.finance = {};
		usr.finance.corp_credit = 0;
		usr.finance.corp_limit = 0;
		usr.finance.corp_debt = 0;
		usr.finance.corp_investment = 0;

		return #db.i(usr)
	}

	function addAlt(user,alt){
		user = user.toLowerCase();
		alt = alt.toLowerCase();
		return #db.u({_id:"register_"+user},{$addToSet:{alts:alt}});
	}

	function setUserCredit(user, credit){
		user = user.toLowerCase();
		if(!getRegister(user).ok || typeof credit != "number") return {ok:false};
	}

	function setUserLimit(user, limit){
		user = user.toLowerCase();
		if(!getRegister(user).ok || typeof limit != "number") return {ok:false};
	}

	function setUserDebt(user, debt){
		user = user.toLowerCase();
		if(!getRegister(user).ok || typeof debt != "number") return {ok:false};
	}

	function setUserInvestment(user, inv){
		user = user.toLowerCase();
		if(!getRegister(user).ok || typeof inv != "number") return {ok:false};
	}

	function setUserBonus(user, bonus){
		user = user.toLowerCase();
		if(!getRegister(user).ok || typeof bonus != "number") return {ok:false};
	}

	function getUserFinances(user){
		let q = getRegister(user);
		if(!q.ok) return {ok:false};
		return q.finance;
	}

	function givePermission(user, perm){
		user = user.toLowerCase();
		perm = perm.toUpperCase();
		if(!isPermission(perm).ok || !getRegister(user)) return {ok:false};
		return #db.u({_id:"register_"+user},{$addToSet:{"account.permissions":perm}})
	}

	function revokePermission(user, perm){
		user = user.toLowerCase();
		perm = perm.toUpperCase();
		if(!isPermission(perm).ok || !getRegister(user)) return {ok:false};
		return #db.u({_id:"register_"+user},{$pull:{"account.permissions":perm}})
	}

	function changeCorp(user, corp){
		user = user.toLowerCase();
		corp = corp.toLowerCase();
		if(!isWhitelistedCorp(corp).ok || !getRegister(user).ok) return {ok:false};
		return #db.u({_id:"register_"+user},{$set:{"corp.name":corp, "corp.level":0}})
	}

	function setCorpLevel(user, level){
		if(!getRegister(user).ok || typeof level != "number") return {ok:false};
		return #db.u({_id:"register_"+user},{$set:{"corp.level":level}})
	}

	function removeAlt(user,alt){
		user = user.toLowerCase();
		alt = alt.toLowerCase();
		if(!isAltOf(alt,user).ok) return {ok:false}
		return #db.u({_id:"register_"+user},{$pull:{alts:alt}});
	}

	function banAccount(user){
		user = user.toLowerCase();
		if(!getRegister(user).ok) return {ok:false}
		return #db.u({_id:"register_"+user},{$set:{"account.status":0}});
	}

	function unbanAccount(user){
		user = user.toLowerCase();
		if(!getRegister(user).ok) return {ok:false}
		return #db.u({_id:"register_"+user},{$set:{"account.status":1}});
	}

	function removeUser(user){
		user = user.toLowerCase();
		if(!getRegister(user).ok) return {ok:false};
		return #db.r({_id:"register_"+user});
	}

	function getRegister(user){
		user = user.toLowerCase();
		let register = #db.f({_id:"register_"+user}).first();
		return register ? {ok:true, register} : {ok:false};
	}

	function isWhitelistedCorp(corp){
		corp = corp.toLowerCase();
		return #db.f({_id:"management", corps:corp}).first() ? {ok:true} : {ok:false};
	}

	function isPermission(perm){
		perm = perm.toUpperCase();
		let settings = getSettings();
		return settings.permissions.includes(perm) ? {ok:true} : {ok:false};
	}

	function isAltOf(alt,user){
		user = user.toLowerCase();
		alt = alt.toLowerCase();
		q = getRegister(user);
		if(!q.ok) return {ok:false};
		return q.alts.includes(alt) ? {ok:true} : {ok:false};
	}

	function isPermissionCode(code){
		if(typeof code != "number") return {ok:false};
		let q = #db.f({_id:"permission_codes", [code]:{$exists:true}}).first();
		return q ? {ok:true} : {ok:false};
	}

	function getSettings(){
		return #db.f({_id:"management"}).first();
	}

	function getPermissions(){
		return #db.f({_id:"permissions"}).first();
	}

	function getPermission(perm){
		perm = perm.toUpperCase();
		let q = #db.f({_id:"permissions", [perm]:{$exists:true}}).first()
		return q ? {ok:true, perm:perm, desc:q[perm].desc, code:q[perm].code} : {ok:false}
	}

	function getRegisters(){
		return #db.f({_id:{$regex:/(register_.+)/}}).array();
	}

	return {
		insertWhitelistedCorp,
		insertPermission,
		registerUser,
		addAlt,
		givePermission,
		changeCorp,
		setCorpLevel,
		setUserCredit,
		setUserBonus,
		setUserDebt,
		setUserLimit,
		setUserInvestment,
		getUserFinances,
		removeAlt,
		banAccount,
		unbanAccount,
		revokePermission,
		removeUser,
		getRegister,
		getRegisters,
		getPermissions,
		getPermission,
		getSettings,
		isWhitelistedCorp,
		isPermission,
		isAltOf,
		isPermissionCode
	}
}
