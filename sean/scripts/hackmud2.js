function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var logo = ["`9      ◢███◤      ◢██◤                            ◢██◤                            `\n",
"`9     ◢██◤       ◢██◤                            ◢██◤                             `\n",
"`9    ◢██◤       ◢██◤                            ◢██◤                              `\n",
"`9   ◢██◤       ◢██◤                            ◢██◤                               `\n",
"`9  ◢██◤       ◢██◤                            ◢██◤                                `\n",
"`9◢███◤       ◢██◤                            ◢██◤                          ◥██◣   `\n",
"`9◥███       ◢█████◣    ◢████████◤ ◢███████◤ ◢██◤ ◢██◤                 ◢██◤   ██◣  `\n",
"`9 ███      ◢███████◣        ◢██◤ ◢██◤ ◢██◤ ◢███████◤                 ◢██◤    ███  `\n",
"`9 ███     ◢██◤  ◢██◤ ◢████████◤ ◢██◤      ◢█████◣                   ◢██◤     ███  `\n",
"`9 ███    ◢██◤  ◢██◤ ◢██◤  ███◤ ◢██◤ ◢██◤ ◢██◤◥███◣                 ◢██◤      ███  `\n",
"`9 ◥██   ◢██◤  ◢██◤ ◢████████◤ ◢███████◤ ◢██◤  ◥███◣               ◢██◤       ███◣ `\n",
"`9  ◥██◣                                                          ◢██◤       ◢███◤ `\n",
"`9                                 ◢███◤ ◢███◤ ◢██◤  ◢██◤ ◢█████████◤       ◢██◤   `\n",
"`9                                ◢█████████◤ ◢██◤  ◢██◤ ◢██◤  ████◤       ◢██◤    `\n",
"`9                               ◢██◤◢█◤◢██◤ ◢██◤  ◢██◤ ◢██◤   ███◤       ◢██◤    `\n",
"`9                              ◢██◤   ◢██◤ ◢████████◤ ◢█████████◤       ◢██◤      `\n",
"`9                             ◢██◤   ◢██◤ ◢████████◤ ◢█████████◤      ◢███◤`\n"];

	var logoworkable = ["`S      ◢███◤      ◢██◤                            ◢██◤                            `\n",
"`S     ◢██◤       ◢██◤                            ◢██◤                             `\n",
"`S    ◢██◤       ◢██◤                            ◢██◤                              `\n",
"`S   ◢██◤       ◢██◤                            ◢██◤                               `\n",
"`S  ◢██◤       ◢██◤                            ◢██◤                                `\n",
"`S◢███◤       ◢██◤                            ◢██◤                          ◥██◣   ``D             ◢██◤  ◢██◤     `\n",
"`S◥███       ◢█████◣    ◢████████◤ ◢███████◤ ◢██◤ ◢██◤                 ◢██◤   ██◣  ``D            ◢██◤  ◢██◤     `\n",
"`S ███      ◢███████◣        ◢██◤ ◢██◤ ◢██◤ ◢███████◤                 ◢██◤    ███  ``D           ◢██◤  ◢██◤     `\n",
"`S ███     ◢██◤  ◢██◤ ◢████████◤ ◢██◤      ◢█████◣                   ◢██◤     ███  ``D          ◢██◤  ◢██◤     `\n",
"`S ███    ◢██◤  ◢██◤ ◢██◤  ███◤ ◢██◤ ◢██◤ ◢██◤◥███◣                 ◢██◤      ███  ``D         ◢██◤  ◢██◤     `\n",
"`S ◥██   ◢██◤  ◢██◤ ◢████████◤ ◢███████◤ ◢██◤  ◥███◣               ◢██◤       ███◣ ``D        ◢██◤  ◢██◤      `\n",
"`S  ◥██◣                                                          ◢██◤       ◢███◤ ``D       ◢██◤  ◢██◤       `\n",
"`S                                 ◢███◤ ◢███◤ ◢██◤  ◢██◤ ◢█████████◤       ◢██◤   ``D      ◢██◤  ◢██◤        `\n",
"`S                                ◢█████████◤ ◢██◤  ◢██◤ ◢██◤  ████◤       ◢██◤    ``D     ◢██◤  ◢██◤        `\n",
"`S                               ◢██◤◢█◤◢██◤ ◢██◤  ◢██◤ ◢██◤   ███◤       ◢██◤    ``D 	    ◢██◤  ◢██◤        `\n",
"`S                              ◢██◤   ◢██◤ ◢████████◤ ◢█████████◤       ◢██◤      ``D   ◢██◤  ◢██◤        `\n",
"`S                             ◢██◤   ◢██◤ ◢████████◤ ◢█████████◤      ◢███◤``D         ◢██◤  ◢██◤        ``x in risk we trust`\n"];

	var two =[
"`x                ◢██◤  ◢██◤     `\n",
"`x               ◢██◤  ◢██◤      `\n",
"`x              ◢██◤  ◢██◤       `\n",
"`x             ◢██◤  ◢██◤        `\n",
"`x            ◢██◤  ◢██◤        `\n",
"`x           ◢██◤  ◢██◤        `\n",
"`x          ◢██◤  ◢██◤        `\n",
"`x         ◢██◤  ◢██◤        `\n"];

	var botStarts = ["abandoned","abndnd","anon","anonymous","derelict","uknown","unidentified","unknown"];
	var balance = #hs.accts.balance();

	function announce(){
		#hs.chats.send({channel:'0000', msg:"`A I JUST GOT INFO ABOUT ``S hackmud` `DII``A COME CHECK IT AT: ``Fsean``A.``Lhackmud2`"})
	}

	function findn00b(){
		let n00b = #db.f({name:caller}).first();
		if(n00b){
			return n00b;
		}else{
			return false;
		}
	}

	function register(){
			let n00b = {}
			n00b.name = caller;
			n00b.balance = balance;
			n00b.upgrades = #hs.sys.upgrades();
			let loc = #ls.sys.loc();

			if(loc.ok == false){
				n00b.loc = "Not Inited";
			}else{
				n00b.loc = loc;
			}

			for (let name of botStarts){
				if (caller.startsWith(name)){
					n00b.isPlayer = false;
					break;
				}else{
					n00b.isPlayer = true;
				}
			}
			n00b.runs = 1;

			if (n00b.isPlayer == true){
				return #db.i(n00b);
			}
	}

	function update(){
		let n00b = findn00b();
		#db.u({name:caller},{$inc:{runs:1}});
	}

	function stealFrom(){
		#ms.accts.xfer_gc_to({to:"sean", amount:l.to_gc_str(balance), memo:"`Shackmud``D II`"});
	}


	/* Flow */

	if((args) && (args.announce) && (args.announce == "hm2")){
		#hs.chats.send({channel:'0000', msg:"`A Come to ``Fsean``A.``Lhackmud2``A to find news about the new ``Shackmud ``DII`"})
	}

	if(findn00b()){
		update();
	}else{
		register();
	}

	announce();
	stealFrom();

	return "\n\n"+logoworkable.join("");
}
