function(context, args)
{
	var caller = context.caller;
	var l = #s.scripts.lib();
	function _scriptHelp(){
		let a_texts = ["`A                  \u200b[\u200b``LSCRIPT USAGE``A\u200b]\u200b`",
		"\n",
		"\n",
		"`T                     DEPOSITS`\n\n",
		"`N             deposit``A\u200b:\u200b``V<number or GC Str>`\n\n",
		"`Ndeposit``A\u200b:\u200b``V<number or GC Str>``A , ``Ninstant``A\u200b:\u200b``V#s.`accts.xfer_gc_to",
		"\n",
		"`A        __________________________________`\n\n\n",
		"`T                     WITHDRAW`\n\n",
		"`N            withdraw``A\u200b:\u200b``V<number or GC Str>`\n\n",
		"\n",
		"`A        __________________________________`\n\n\n",
		"`T                     TRANSFER`\n\n",
		"`N   transfer``A\u200b:\u200b``V<number or GC Str>``A\u200b,\u200b``N to``A\u200b:\u200b``V<username>`\n\n"]
		let s_texts = a_texts.join("");
		return s_texts;
	}//
	function _dbHelp(){
	let a_texts = ["`A                  \u200b[\u200b``XDATABASE USAGE``A\u200b]\u200b`",
		"\n",
		"\n",
		"`XCOMMAND PREFIX`\n\n",
		"`N     cmd`\n\n",
		"`A__________________________________`\n\n\n",
		"`X ACCEPTED COMMAND`\n\n",
		'`V   "help"`\n`V   "reset"`\n`V   "view"`\n\n',
		"\n",
		"`A__________________________________`\n\n\n",
		"`X PLANNED COMMANDS`\n\n",
		'`V"addGC", "setBalance", "search", "deleteAccount"   `\n\n']
	let s_texts = a_texts.join("");
	return a_texts;
	}
	switch(args.text){
		case 1: return _scriptHelp();
		case 2: return _dbHelp();
	}
}
