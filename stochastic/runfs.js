function(context, args)
{//l:#s.user.script
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var running = args.l;
	var seclev = #fs.scripts.get_level(running);

	switch(seclev){
		case 0: return {ok:false, msg:"Level: NULLSEC"};
		case 1: return {ok:false, msg:"Level: LOWSEC"};
		case 2: return {ok:false, msg:"Level: MIDSEC"};
		case 3: return {ok:false, msg:"Level: HIGHSEC"};
		case 4: return args.l.call(args);
	}
}
