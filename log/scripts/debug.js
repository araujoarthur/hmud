function(context, args)
{
	var caller = context.caller;
	var ldb =  #ns.log.db();
	return ldb.createLogList(Date.now());
}
