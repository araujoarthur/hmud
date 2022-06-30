function(c, a)
{
	var caller = c.caller;
	const gtfo = "Connected to intra.net";

	const header = ["`K _                       ______  _______ _______ `\n",
		"`K(_)      _              |  ___ \\(_______|_______)`\n",
		"`K _ ____ | |_   ____ ____| |   | |_____   _       `\n",
		"`K| |  _ \\|  _) / ___) _  | |   | |  ___) | |      `\n",
		"`K| | | | | |__| |  ( ( | | |   | | |_____| |_____ `\n",
		"`K|_|_| |_|\\___)_|   \\_||_|_|   |_|_______)\\______)`\n",
		"\n",
		"`FCorp cooperation system`\n\n\n\n"];

	var lib =  #ns.intra.lib();
	var usr = lib.getRegister(caller);

	var nav = ["`KHello, ``V" + usr.register.username+"``K.`\n\n",
	"`KCorp Name: ``V" + usr.register.corp.name + " ``N("+usr.register.corp.level+")`\n\n\n",
	];
	if(!usr.ok) return gtfo;
	if(!usr.register.account.status) return {ok:false, msg:"Account suspended"};

	let struct = #ns.structure.db();

	if(a && (a.code||a.help>=0)){
		if(a.code == 0){/* Botnet Status */
			let status

		}else if(a.code == 1){ 

		}else if(a.code == 2){
			
		}else if(a.code == 3){
			
		}else if(a.code == 4){
			
		}else if(a.code == 5){
			
		}else if(a.code == 6){
			
		}else if(a.help >= 0){
			let help = [];
			if(typeof a.help != "number"){
				help.push("`DCODE MUST BE A NUMBER`");
			}else if(!lib.isPermissionCode(a.help).ok){
				help.push("`DCODE ``V"+a.help.toString()+"``D DOES NOT EXIST!`")
			}else{
				let permStuff = #db.f({_id:"permission_codes", [a.help]:{$exists:true}}).first()[a.help];
				let permData = #db.f({_id:"permissions", [permStuff]:{$exists:true}}).first()[permStuff];
				help.push("`I HELP FOR PERMISSION` `N"+permStuff+"`\n\n")
				help.push("`DCODE:       ` `A"+permData.code.toString()+"`\n");
				help.push("`DDESCRIPTION: ``A"+permData.desc+"`\n");
				help.push("`DUSAGE:       ``A"+permData.usage+"`\n");
			}
			return header.join("") + nav.join("") + help.join("")
		}
	}else{
		let response = [];
		response.push("`HNavigate using code:000 and the needed arguments`\n");
		response.push("`HFor usage help, type help:000, replace 000 with the code`\n\n\n");
		response.push("`DCODE"+" ".repeat(5)+"DESCRIPTION`\n\n");
		let dbPerms = lib.getPermissions();
		let permsKeys = Object.keys(dbPerms);

		for(let perm of usr.register.account.permissions){
			if(permsKeys.includes(perm)){
				response.push("`N"+dbPerms[perm].code.toString().padEnd(4," ")+"``V"+" ".repeat(5)	+dbPerms[perm].desc+"`\n");
			}			
		}
		return header.join("") + nav.join("")  + response.join("");
	}

	
}
