function(c, a)
{
	var caller = c.caller;

	function getUsersFromChannel(channel){
		return #ms.chats.users({channel:channel}).map(i => i.startsWith("*") ? i.substring(1) : i.trim());
	}

	function getActiveUsersOnChannel(channel){
		return #ms.chats.users({channel:channel}).filter(i => !i.startsWith("*"));
	}

	function getRecentlyActiveOnChannel(channel){
		return #ms.chats.users({channel:channel}).filter(i => i.startsWith("*")).map(i => i.substring(1));
	}

	function getUserLastAction(user){
		let data = #fs.users.last_action({name:user})[0]
		return [{n:data.n, t:Date.parse(data.t)}]
	}

	function getUsersLastAction(users) {
		users = users.slice();
		var ret = [];
		while(users.length) ret.push(...#fs.users.last_action({name:users.splice(0,50)}));
		ret.forEach(u=>(u && u.t)?u.t/=1:0);
		return ret;
	}

	/*DB STUFF*/

	function chk(dbLastActions){
		if(dbLastActions.length == 0){
			return {ok:false, msg:"Empty DB!"}
		}else{
			return {ok:true}
		}
	}

	function writeChannels(){
		let channels = #ms.chats.channels();
		return #db.us({_id:"channelList"},{$set:{channels}});
	}

	function writeLastActions(list){
		let upd = {};
		for(let item of list){
			upd["data."+item.n] = item.t;
		}
		#db.us({_id:"chatActivityLog"},{$set:upd});
	}

	function readChannels(){
		let channels =  #db.f({_id:"channelList"}).first();
		return channels ? channels.channels : null;
	}

	function readLastActions(users){
		var proj = {};
		var dat;
		if(!users){
			dat = #db.f({_id:"chatActivityLog"}).first();
		}else{
			for(var i=0; i < users.length; ++i){
				proj["data."+users[i]]=1;/*Only returns users in list, same as data.users = true*/
			}
			dat = #db.f({_id:"chatActivityLog"},proj).first();
		}
		
		var ret = [];
		if(dat && dat.data){
			for(var i in dat.data){
				ret.push({n:i, t:dat.data[i]})
			}	
		}
		return ret;
	}

	function feedDatabase(channel){
		let users = getUsersFromChannel(channel);
		let dbUsers =  readLastActions();
		let userList = [];
		let existent = [];
		let ret = {}
		ret.added = 0;

		var users_ob={}
		users.forEach(u=>users_ob[u]=u)
		var db_users_ob={}
		dbUsers.forEach(u=>db_users_ob[u.n]=u);

		for(var i in db_users_ob) {	
			if(users_ob[i]) {
				existent.push(users_ob[i]);
				delete users_ob[i];
			}
		}

		userList = Object.values(users_ob);
		if (userList.length > 0){
			let la = getUsersLastAction(userList);
			writeLastActions(la);
			ret.added = la;
		}
		
		ret.existent = existent;
		return ret;
	}


	function checkUpdate(){
		let dbLastActions = readLastActions().slice();
		let dbUsers = [];
		let deadIndex = [];
		let changedIndex = []
		let removeProjection = {};
		let updateList;
		let returnObj = {};

		returnObj.ok = false;
		returnObj.updated = [];
		returnObj.removed = [];
		returnObj.dead = [];
		returnObj.changed = [];
		returnObj.errors = [];
		
		let x = chk(dbLastActions);
		if(!x.ok) return x;

		dbUsers = dbLastActions.map(o=>o.n);

		let usersLastActions = getUsersLastAction(dbUsers);
		
		for(var i = 0; i<usersLastActions.length; i++){ /* If it stops working or acts weird the order changed*/
			if(usersLastActions[i] == null){
				deadIndex.push(i)
				returnObj.dead.push(dbLastActions[i]);
			}
		}

		if(deadIndex.length > 0){
			for(let idx of deadIndex.sort((x,y) => y - x)){
				removeProjection["data."+dbLastActions[idx].n] = 1;
				usersLastActions.splice(idx,1)
			}
			#db.us({_id:"chatActivityLog"},{$unset:removeProjection})
			for(let idx of deadIndex.sort((x,y) => y - x)){
				returnObj.removed.push(...dbLastActions.splice(idx,1))
				returnObj.ok = true;
			}

			for(var i = 0; i<usersLastActions.length; i++){ /* If it stops working or acts weird the order changed*/
				if(usersLastActions[i] == null){
					returnObj.ok = false;
					returnObj.errors.push("Inconsistency found on user list after exclusion - null found on IDX: "+idx);
					return returnObj;
				}else if(usersLastActions[i].n != dbLastActions[i].n){
					returnObj.ok = false;
					returnObj.errors.push("Inconsistency found on user list after exclusion - Different users on IDX: "+idx+" | dbLastActions has: " + dbLastActions[i].n + " and usersLastActions has: "+usersLastActions[i].n);
					return returnObj;
				}
			}
		}
		

		let changedObj;
		for(var i = 0; i<usersLastActions.length; i++){
			if(dbLastActions[i].t != usersLastActions[i].t){
				changedObj = {};
				changedObj[dbLastActions[i].n]= {}
				changedObj[dbLastActions[i].n].newLastAction = usersLastActions[i].t;
				changedObj[dbLastActions[i].n].oldLastAction = dbLastActions[i].t;
				changedObj[dbLastActions[i].n].Variation = (usersLastActions[i].t - dbLastActions[i].t)/1000;
				returnObj.changed.push(changedObj);
				changedIndex.push(i);
			}
		}

		if(changedIndex.length > 0){
			updateList = [];
			for(let idx of changedIndex){
				updateList.push(usersLastActions[idx])
				returnObj.ok = true;
				
			}
			returnObj.updated = updateList;
			writeLastActions(updateList);
		}

		returnObj.runtime = Date.now()- _START;
		return returnObj;


	}

	// MIXED STUFF
	return {getUsersFromChannel,
		getActiveUsersOnChannel,
		getRecentlyActiveOnChannel,
		getUserLastAction,
		getUsersLastAction,
		writeLastActions,
		readLastActions,
		writeChannels,
		readChannels,
		checkUpdate,
		feedDatabase,
		};
}
