function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	//return #fs.socialmud.testing()
	return args.t.call();
}
