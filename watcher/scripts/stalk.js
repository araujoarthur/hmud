function(c, a)
{
	try {
		var caller = c.caller;
		var watch = #ns.watcher.lib();
		var log = #ns.log.write();
		var handler = #ns.watcher.handling();
	
		/* Updating Channel List */
		watch.writeChannels();
	
		let channelList = watch.readChannels();
	
		/* Feeding Database With Users */
	
		for(let channel of channelList){
			watch.feedDatabase(channel);
		}
	
		/* Checks for update */
	
		let update = watch.checkUpdate();
	
		let chatObj = {};
		chatObj.ok = false;
		chatObj.class = "activity";
		if(update){
			if(update.ok){
				if(update.removed.length > 0){
					chatObj.died = [];
					let loopObj = {};
					for(let uRem of update.removed){
						loopObj = {};
						loopObj[uRem.n] = uRem[0].t;
						chatObj.died.push(loopObj);
					}
				}
				if(update.updated.length > 0){
					chatObj.updated = []
					let loopObj = {};
					for(let uChg of update.changed){
						loopObj = {}
						let uChgInfo = Object.values(uChg)[0];
						let uChgName = Object.keys(uChg)[0];
						loopObj[uChgName] = uChgInfo.newLastAction;
						chatObj.updated.push(loopObj);
					}	
				}
				chatObj.ok = true;
			}else{
				chatObj.ok = false;
				chatObj.msg = "Update from lib failed!";
			}
			chatObj.runtime = (Date.now()-_START).toString();
			return {msg:#fs.chats.send({channel:"randomdata", msg:JSON.stringify(chatObj)}), objReceived:update, objSent:chatObj};
		}	

	} catch (error) {
		#fs.chats.send({channel:"randomdata", msg:"ERROR"+error.stack});
		return error.stack;
	}
	
	

}	
