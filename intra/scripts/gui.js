function(c, a)
{
	var caller = c.caller;
	var lib = #ns.intra.lib();
	function drawHeader(){
		let response = ["`K _                       ______  _______ _______ `\n",
		"`K(_)      _              |  ___ \\(_______|_______)`\n",
		"`K _ ____ | |_   ____ ____| |   | |_____   _       `\n",
		"`K| |  _ \\|  _) / ___) _  | |   | |  ___) | |      `\n",
		"`K| | | | | |__| |  ( ( | | |   | | |_____| |_____ `\n",
		"`K|_|_| |_|\\___)_|   \\_||_|_|   |_|_______)\\______)`\n",
		"\n",
		"`FCorp cooperation system`\n\n\n\n"];

		return response.join("");
	}

	function drawPagelist(perms){
		let response = [];
		response.push("`HNavigate using code:000 and the needed arguments`\n");
		response.push("`HFor usage help, type help:000, replace 000 with the code`\n\n\n");
		response.push("`DCODE"+" ".repeat(5)+"DESCRIPTION`\n\n");
		let dbPerms = lib.getPermissions();
		let permsKeys = Object.keys(dbPerms);

		for(let perm of perms){
			if(permsKeys.includes(perm)){
				response.push("`N"+dbPerms[perm].code.toString().padEnd(4," ")+"``V"+" ".repeat(5)	+dbPerms[perm].desc+"`\n");
			}			
		}
		return response.join("");
	}

	function drawHelp(code){
		
	}

	return drawHeader() + drawPagelist(["RD_TEST","RD_MODIFY"]);

	for(let item of a.request){

	}
	return res.join("");
}
