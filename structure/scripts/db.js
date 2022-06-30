function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to structure.db";
	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	if(caller != "structure" && !allowedScripts.includes(script)) return gtfo;

	let utils = #ns.native.utils();

	var allowedUsers = db.getAllowedUsers();
	var bots = db.getBots();
	/* Update */
	function updateUser(){
		if(!allowedUsers.includes(caller)&&!bots.includes(caller)) return {ok:false};
		let specs = utils.serializeSpecs();
		if(specs && specs.ok == false) return #db.us({_id:"user_"+caller},{$set:{username:caller, inited:false, xfer_rate_per_minute_to_any:20, 
			xfer_rate_per_hour_to_single:40, max_up_tier:0, max_hold_up:0, max_load_up:0, hardlines_per_12h:256,hardline_recovery_ms:168750}})
		switch(specs.tier){
			case 1:
				specs.xfer_rate_per_minute_to_any = 30;
				specs.xfer_rate_per_hour_to_single = 50;
				specs.max_up_tier = 1;
				specs.max_hold_up = 32;
				specs.max_load_up = 8;
				specs.hardlines_per_12h = 32;
				specs.hardline_recovery_ms = 1350000;
				break;
			case 2:
				specs.xfer_rate_per_minute_to_any = 50;
				specs.xfer_rate_per_hour_to_single = 200;
				specs.max_up_tier = 2;
				specs.max_hold_up = 64;
				specs.max_load_up = 16;
				specs.hardlines_per_12h = 24;
				specs.hardline_recovery_ms = 1.8e+6;
				break;
			case 3:
				specs.xfer_rate_per_minute_to_any = 100;
				specs.xfer_rate_per_hour_to_single = 500;
				specs.max_up_tier = 3;
				specs.max_hold_up = 128;
				specs.max_load_up = 32;
				specs.hardlines_per_12h = 18;
				specs.hardline_recovery_ms = 2.4e+6;
				break;
			case 4:
				specs.xfer_rate_per_minute_to_any = 200;
				specs.xfer_rate_per_hour_to_single = 900;
				specs.max_up_tier = 12;
				specs.max_hold_up = 256;
				specs.max_load_up = 64;
				specs.hardlines_per_12h = 12;
				specs.hardline_recovery_ms = 3.6e+6;
				break;
		}

		let balances = utils.getBalances();
		let upgrades = utils.getUpgradesStringified();
		let result = {username:caller, inited:true};

		Object.assign(result,specs);
		result.channels = #ns.chats.channels();
		result.channels = result.channels.map(o => utils.decolorize(o));
		result.upgrades = upgrades;	
		result.totalgc = balances.jade + balances.acct;

		Object.assign(result,balances);

		return #db.us({_id:"user_"+caller},{$set:result});
	}

	function updateBotnet(){
		let database = #db.f({_id:{$ne:"botnet"}}).array();
		let result = {};
		let botnetups = {}
		result.total_users = 0;
		result.total_upgrades = 0;
		result.total_holdable_up = 0;
		result.total_loadable_up = 0;
		result.total_loaded = 0;
		result.total_unloaded = 0;
		result.botnet_upgrades = "";
		result.total_script_slots = 0;
		result.total_public_slots = 0;
		result.total_loaded = 0;
		result.total_unloaded = 0;
		result.active_channels = new Set();
		result.total_max_gc = 0;
		result.total_gc = 0;
		result.total_acct_gc = 0;
		result.total_jade_gc = 0;
		result.tier_4 = [];
		result.tier_3 = [];
		result.tier_2 = [];
		result.tier_1 = [];
		result.uninited = [];
		result.available_hl_inited = 0;
		result.totalhl_per_12h = 0;
		result.totalhl_per_12h_inited = 0;
		
		
		for(let item of database){
			result.total_users +=1;
			result.totalhl_per_12h += item.hardlines_per_12h;
			if(!item.inited){
				result.uninited.push(item.username);
			}else{
				switch (item.tier){
					case 1:
						result.tier_1.push(item.username);
						break;
					case 2:
						result.tier_2.push(item.username);
						break;
					case 3:
						result.tier_3.push(item.username);
						break;
					case 4:
						result.tier_4.push(item.username);
						break;
				}

				result.total_upgrades += item.slots;
				result.total_holdable_up += item.max_hold_up;
				result.total_loadable_up += item.max_load_up;
				result.total_loaded += item.loaded;
				result.total_script_slots += item.script_slots;
				result.total_public_slots += item.publics;

				result.total_max_gc += item.gc_max;
				result.total_gc += item.totalgc;
				result.total_acct_gc += item.acct;
				result.total_jade_gc += item.jade;
				result.totalhl_per_12h_inited += item.hardlines_per_12h;
				result.available_hl_inited += item.hardline_count;

				for(let ch of item.channels){
					 result.active_channels.add(ch);
				}
				let upobj = JSON.parse(item.upgrades);
				if(typeof upobj === "object" && Object.keys(upobj).length > 0){
					Object.assign(botnetups, upobj)
				}


				result.botnet_upgrades += item.upgrades
			}

		}

		//result.botnet_upgrades = JSON.stringify(botnetups);
		result.active_channels = [... result.active_channels];
		result.total_unloaded = result.total_holdable_up - result.total_loaded;
		result.total_tier_4 = result.tier_4.length;
		result.total_tier_3 = result.tier_3.length;
		result.total_tier_2 = result.tier_2.length;
		result.total_tier_1 = result.tier_1.length;
		result.total_uninited = result.uninited.length;

		return #db.us({_id:"botnet"},{$set:result})
	}

	/* Remove */

	function reset(){
		return #db.r({});
	}

	/* Get */

	function view(){
		return #db.f({}).array();
	}
	
	function getBotnet(){
		return #db.f({_id:"botnet"}).first();
	}

	return {
		updateUser,
		updateBotnet,
		getBotnet,
		reset,
		view
	}
}
