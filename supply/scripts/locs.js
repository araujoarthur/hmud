function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var header = ["`F _      _____  ___   _   __`\n",
"`F| |    |  ___|/ _ \\ | | / /`\n",
"`F| |    | |__ / /_\\ \\| |/ / `\n",
"`F| |    |  __||  _  ||    \\ `\n",
"`F| |____| |___| | | || |\\  \\`\n",
"`F\\_____/\\____/\\_| |_/\\_| \\_/`\n"];
	var subreader = ["`Y __         ______     ______     ______    `\n",
"`Y/\\ \\       /\\  __ \\   /\\  ___\\   /\\  ___\\   `\n",
"`Y\\ \\ \\____  \\ \\ \\/\\ \\  \\ \\ \\____  \\ \\___  \\  `\n",
"`Y \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\/\\_____\\ `\n",
"`Y  \\/_____/   \\/_____/   \\/_____/   \\/_____/ `\n",
"                                            \n"];

	var headerstring = header.join("") + "\n"+subreader.join("");
	const navinfo = "For `Nnavigation` use `Vlocs` or `Vinfo`";

	
	if(args == null || (args.navigation == null)){
		return headerstring+"\n"+navinfo;
	}
	else if(args.navigation == "info"){
		let text = ["`AInformation for` `FLeak``YLocs` `Ausage`\n\n\n\n",
			"`HSEARCHING`\n\n",
			"`AYou can search by passing the` `Nsearch``V\"Username\"` `Apair`",
			"\n\n\n\n",
			"`HLISTING`\n\n",
			"`AYou can list recent locs by using ``Nlist`:`Vtrue` `Awithout search parameters`",
			"\n\n\n\n",
			"`HADDING`\n\n",
			"`AYou can add by using` `Nadd`:`Vloc`",
			"\n\n\n\n",
			"`HREMOVING`\n\n",
			"`AYou can remove a loc by using` `Nremove`:`V\"loc\"``A. You will be asked to pay a` `Ltax`."
		];

		return headerstring + text.join("");
	}
}
