function(c, a)
{
	var caller = c.caller;
	var script = c.calling_script;
	const gtfo = "Connected to datacenter.lib";

	var ndb = #ns.native.db();
	if(ndb == "Connected to native.db") return gtfo;

	var allowedScripts = ndb.getScripts();
	if(caller != "log" && !allowedScripts.includes(script)) return gtfo;
	
	var m = #ns.native.methods();
	var db = #ns.datacenter.db();
	
	var settings = db.getSettings();
	/* Compression & Decompression */
	function compressObj(obj){
		if (typeof obj === "object"){
			let objstr = JSON.stringify(obj);
			return m.compressToUTF16(objstr);
		}else{
			return {ok:false};
		}
	}

	function 	decompressObj(obj){
		if(typeof obj === "string"){
			return m.decompressFromUTF16(objstr);
		}else{
			return {ok:false};
		}	
	}

	/* Chunk Handling */
	function queue(iclass, type, subtype, user = caller, data, src = script){
		if(!settings.classes.includes(iclass)) return {ok:false, msg:"Invalid class."};
		if(!settings.types.includes(type)) return {ok:false, msg:"Invalid type."};
		if(!settings.subtypes.includes(subtype)) return {ok:false, msg:"Invalid subtype."};

		return db.insertOnQueue(iclass, type, subtype, user, src, data);
	}

	function generateChunks(obj){
		let compressed = compressObj(obj);
		if(typeof compressed == "string"){
			let len = compressed.length;
			let chunkcount = Math.ceil(compressed.length/900);
			let lastchunkcharc = compressed.length%900;
			let chunksstr = compressed.match(/.{1,900}/gs);
			let chunks =  chunksstr.map((o,i)=> [i,o]);
			return {ok:true, compressedLength:len, chunkcount, lastchunkcharc, chunks}
		}else{
			return {ok:false}
		}
	}

	function newChunkstream(chunks,name){
		return (typeof chunks === "object" && chunks.length > 0 ) ? db.createChunkstream(name+"_"+Date.now(), chunks.length, chunks) : false;
	}

	/* Remove */

	function unQueue(id){
		return (db.isOnQueue(id)) ? db.removeFromQueue(id) : false;	
	}

	function closeChunkstream(id){
		let chunkstream = db.getChunkstream(id);
		if(chunkstream){
			if(!chunkstream.complete && chunkstream.size_left == 0){
				if(db.removeChunkstream(id)){
					return{ok:true}
				}else{
					return{ok:false, msg:"Something went wrong."}
				}
			}else{
				return {ok:false, msg:"Chunkstream has " + chunkstream.size_left + " chunks left."}
			}
		}else{
			return {ok:false, msg:"No chunkstream found"}
		}
	}

	/* Send */

	function sendChunks(ids){/* Sends 5 chunks of the same or from different chunkstreams */
		let chatsLimit = 5, cts = [];
		for(let id of ids){
			let chunkstream = db.getChunkstream(id);
			cts.push(...chunkstream.chunks.splice(0,chatsLimit).map(o => {o.splice(0,0,...[chunkstream._id,chunkstream.size]); return o}));
			chatsLimit -= cts.length;
			if(!chatsLimit) break
		}
		
		for(let chat of cts){
			let chunk = [chat[2], chat[3]];
			try {
				let sendObj = "{\"id\":\""+chat[0]+"\", \"cc\":"+chat[2]+", \"tc\":"+chat[1]+", \"c\":\""+chat[3]+"\"}";
				db.setSentChunks(chat[0], [chunk]);
				#ns.chats.send({channel:settings.internalChat, msg:sendObj})
			} catch (error) {
				return error.stack
			}
		}
		
		let last_id;
		for(let chat of cts){
			if(chat[0]!=last_id){
				let chunkstream = db.getChunkstream(chat[0])
				if (chunkstream.size_left == 0){
					db.setComplete(chat[0])
				}
			}
			last_id =  chat[0];
		}

		return {ok:true}

	}
	/* Generic Procedure - Premade Procedures that you can override on botbrain */

	function convertQueue(){
		let item = db.getOldestItem()
		let chunkobj = generateChunks(item.data);
		unQueue(item._id.$oid);
		return newChunkstream(chunkobj.chunks, item.user);
	}

	function sendOldestChunks(){
		let chunkstream = db.getOldestChunkstream();
		try {
			return sendChunks([chunkstream._id]);	
		} catch (error) {
			return error.stack	
		}
		
	}
	return {
		compressObj,
		decompressObj,
		queue,
		generateChunks,
		newChunkstream,
		unQueue,
		closeChunkstream,
		sendChunks,
		convertQueue,
		sendOldestChunks
	}
	
}
