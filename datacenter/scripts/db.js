function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to datacenter.db";
	var db = #ns.native.db();

	if(db == "Connected to native.db") return gtfo;

	var allowedScripts = db.getScripts();

	if(!allowedScripts.includes(script)) return gtfo;

	/* Insert */

	function insertOnQueue(iclass, type, subtype, user, src, data){
		let insertion = {};
		insertion.settype = "queue";
		insertion.class = iclass;
		insertion.type = type;
		insertion.subtype = subtype;
		insertion.user = user,
		insertion.script = src;
		insertion.t = Date.now();
		insertion.data = data;

		return #db.i(insertion);
	}


	function addType(type){
		return #db.us({_id:"management"},{$addToSet:{types:type}});
	}

	function addSubType(subtype){
		return #db.us({_id:"management"},{$addToSet:{subtypes:subtype}});
	}

	function addClass(cls){
		return #db.us({_id:"management"},{$addToSet:{classes:cls}});
	}

	function addSet(s){
		return #db.us({_id:"management"},{$addToSet:{sets:s}});
	}

	function createChunkstream(name,size,chunks){
		let chunkstream = {};
		chunkstream._id = "chunkstream_" + name;
		chunkstream.settype = "chunkstream";
		chunkstream.identifier = name+"_"+Date.now();
		chunkstream.t = Date.now();
		chunkstream.size = size,
		chunkstream.size_left = size;
		chunkstream.chunks = chunks; // [chunkNumber,chunkData]
		chunkstream.sent = [];
		chunkstream.complete = false;
		chunkstream.integrityCheck = false;
		return #db.i(chunkstream);
	}


	/* Set */

	function setSentChunks(id, chunks){
		return #db.us({_id:id}, {$inc:{size_left:(-1)*chunks.length}, $addToSet:{sent:{$each:chunks}},$pullAll:{chunks:chunks}})
	}

	function setComplete(id){
		return #db.us({_id:{$ne:"management"}, settype:"chunkstream"},{$set:{complete:true}});
	}

	function setIntegrityChecked(id){
		return #db.us({_id:{$ne:"management"}, settype:"chunkstream"},{$set:{integrityCheck:true}});
	}

	function setInternalChat(chat){
		return #db.us({_id:"management"},{$set:{internalChat:chat}})
	}

	/* Remove */

	function removeChunkstream(id){
		if(!id.startsWith("chunkstream_")) return false;
		return #db.r({_id:id});
	}

	function removeFromQueue(id){
		return #db.r({_id:{$oid:id}});
	}

	function removeType(type){
		return #db.us({_id:"management"},{$pull:{types:type}});
	}

	function removeSubType(subtype){
		return #db.us({_id:"management"},{$pull:{subtypes:subtype}});
	}

	function removeClass(cls){
		return #db.us({_id:"management"},{$pull:{classes:cls}});
	}

	function removeSet(s){
		return #db.us({_id:"management"},{$pull:{sets:s}});
	}

	/* Checks */

	function isValidType(type){
		return !!#db.f({_id:"management", types:type}).first();
	}

	function isValidSubType(subtype){
		return !!#db.f({_id:"management", subtypes:subtype}).first();
	}

	function isValidClass(cls){
		return !!#db.f({_id:"management", classes:cls}).first();
	}

	function isOnQueue(id){
		return !!#db.f({_id:{$oid:id}, settype:"queue"}).first();
	}

	/* Get */

	function view(){
		return #db.f({}).array();
	}

	function getSettings(){
		return #db.f({_id:"management"}).first();
	}

	function getOldestItem(){
		return #db.f({_id:{$ne:"management"}, settype:"queue"}).sort({t:1}).array()[0];
	}

	function getQueued(id){
		return #db.f({_id:{$oid:id}, settype:"queue"}).first();
	}

	function getChunkstream(id){
		return #db.f({_id:id, settype:"chunkstream"}).first();
	}

	function getChunkstreams(){
		let oldest = #db.f({_id:{$ne:"management"}, settype:"chunkstream"}).sort({t:1}).array();	
	}

	function getOldestChunkstream(){
		let oldest = #db.f({_id:{$ne:"management"}, settype:"chunkstream", complete:false}).sort({t:1}).first();
		return oldest || false;
	}

	return {
		insertOnQueue,
		addType,
		addSubType,
		addClass,
		addSet,
		createChunkstream,
		setSentChunks,
		setComplete,
		setIntegrityChecked,
		setInternalChat,
		removeChunkstream,
		removeFromQueue,
		removeType,
		removeSubType,
		removeClass,
		removeSet,
		isValidType,
		isValidSubType,
		isValidClass,
		isOnQueue,
		view,
		getSettings,
		getOldestItem,
		getQueued,
		getChunkstream,
		getChunkstreams,
		getOldestChunkstream,
	}

}
