function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	
	return #hs.sys.specs() +'\n\n\n'+ (#hs.sys.status().breach == false ? "`2SYSTEM NOT BREACHED`" : "`DSYSTEM BREACHED`") + "\n\n`5ACCOUNT BALANCE: `" + l.to_gc_str(#hs.accts.balance());
}
