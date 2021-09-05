function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var resp = #fs.fast.t1({t:a.t});
	var locs = resp.locs;

	var mylog = [];

	for(let loc of locs){
		let _loc = {};
		_loc.address = loc;
		_loc.used = false;
		_loc.font = "fast.t1";
		_loc.project = "cashgiver";

		#db.i(_loc);
	}

	return #db.f({_id:{$exists:true}}).array();
}
