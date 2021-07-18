function(context, args)
{
	var caller = context.caller;
	var l = #s.scripts.lib();
	var a_logo =[ 
			"`A     ¡¡¡¡¡¡¡¡¡    ¡¡¡¡¡¡¡¡¡¡¡    ¡¡  ¡¡    ¡¡¡¡¡¡¡¡`\n",
            "`A   ¡¡             ¡¡             ¡¡ ¡¡     ¡¡     ¡¡`\n",
            "`A   ¡¡             ¡¡             ¡¡¡¡      ¡¡     ¡¡`\n",
            "`A     ¡¡¡¡¡¡¡      ¡¡¡¡¡¡         ¡¡¡       ¡¡¡¡¡¡¡¡`\n",
            "`A            ¡¡    ¡¡             ¡¡¡¡      ¡¡`\n",
            "`A            ¡¡    ¡¡             ¡¡ ¡¡     ¡¡`\n",
            "`A   ¡¡¡¡¡¡¡¡¡      ¡¡             ¡¡  ¡¡    ¡¡`\n",
			"\n",
            "`L   ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡`\n",
            "\n",
            "`P   ¡¡¡¡¡¡¡¡¡¡     ¡¡¡¡¡¡¡¡       ¡¡¡¡¡¡      ¡¡¡¡¡¡¡¡`\n",
            "`P   ¡¡       ¡¡    ¡¡     ¡¡     ¡¡    ¡¡        ¡¡`\n",
            "`P   ¡¡       ¡¡    ¡¡     ¡¡     ¡¡    ¡¡        ¡¡`\n",
            "`P   ¡¡¡¡¡¡¡¡¡¡     ¡¡¡¡¡¡¡¡      ¡¡    ¡¡        ¡¡`\n",
            "`P   ¡¡             ¡¡¡¡          ¡¡    ¡¡        ¡¡`\n",
            "`P   ¡¡             ¡¡ ¡¡         ¡¡    ¡¡    ¡¡  ¡¡`\n",
			"`P   ¡¡             ¡¡  ¡¡         ¡¡¡¡¡¡      ¡¡¡¡`\n",
            "\n",
            "`X   ------------- DATABASE ADMINISTRATION -------------`",
            "\n",
    ];
	var s_logo = a_logo.join("");
	const safekeeping = "\n" + "`A                                 SAFEKEEPING``L\u200b.\u200b``PPROJECT`\n" + "\n";
	const help =  '\n \n `AFor``L HELP ``Atype: ``Ncmd``A\u200b:\u200b``V"help"` \n';
	if(!args){
		return safekeeping + s_logo + help;
	}
	switch(args.cmd){ 
	
		case "view": var a_Db = #db.f({_id:{$exists:true}}).array(); return a_Db
		case "reset": #db.r({_id:{$exists:true}}); return {ok:true}
		case "help": return safekeeping + s_logo + #s.youruser.help({text:2})
	}
}
