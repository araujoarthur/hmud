function(c, a)
{
	var caller = c.caller;
	const gtfo = "Connected to dataset.terminal"

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedUsers = ndb.getAllowedUsers();
	if(!allowedUsers.includes(caller)) return gtfo;

	var db = #ns.datacenter.db();
	var dlib = #ns.datacenter.lib();
	var utils = #ns.native.utils();

	if(a){
		if(a.insertOnQueue){
			return db.insertOnQueue("manual", "manual", "insertion", caller, "datacenter.terminal", a.insertOnQueue)
		}else if(a.view){
			return db.view();
		}else if(a.addType){
			return db.addType(a.addType);
		}else if(a.addSubType){
			return db.addSubType(a.addSubType);
		}else if(a.removeFromQueue){
			return db.removeFromQueue(a.removeFromQueue);
		}else if(a.addClass){
			return db.addClass(a.addClass);
		}else if(a.removeType){
			return db.removeType(a.removeType);
		}else if(a.removeSubType){
			return db.removeSubType(a.removeSubType);
		}else if(a.removeClass){
			return db.removeClass(a.removeClass);
		}else if(a.isValidType){
			return db.isValidType(a.isValidType);
		}else if(a.isValidSubType){
			return db.isValidSubType(a.isValidSubType);
		}else if(a.isValidClass){
			return db.isValidClass(a.isValidClass);
		}else if(a.getOldestItem){
			return db.getOldestItem();
		}else if(a.compressObj){
			return dlib.compressObj(a.compressObj);
		}else if(a.decompressObj){
			return dlib.decompressObj(a.decompressObj);		
		}else if(a.generateChunks){
			return dlib.generateChunks(a.generateChunks);
		}else if(a.convertQueue){
			return dlib.convertQueue();
		}else if(a.remove){
			return #db.r({_id:a.remove});
		}else if(a.removeoid){
			return #db.r({_id:{$oid:a.removeoid}})
		}else if(a.addSet){
			return db.addSet(a.addSet);
		}else if(a.removeSet){
			return db.removeSet(a.removeSet);
		}else if(a.isOnQueue){
			return db.isOnQueue(a.isOnQueue);
		}else if(a.getOldestChunkstream){
			return db.getOldestChunkstream();
		}else if(a.sendChunks){
			return dlib.sendChunks(a.sendChunks);
		}else if(a.reset){
			return #db.r({_id:{$ne:"management"}});
		}else if(a.setInternalChat){
			return db.setInternalChat(a.setInternalChat);
		}else if(a.sendOldestChunks){
			return dlib.sendOldestChunks();
		}
	}
}
