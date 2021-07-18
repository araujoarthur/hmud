function(context, args)
{
	var caller = context.caller;
	var l = #s.scripts.lib();
	var muddb =  #db.f({_id:{$exists:true}}).array();
	var muduser = #db.f({Name:caller}).first();
	var a_logo=[ 
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
            "                   `LFAST` `Pand` `LTAX FREE`\n",
            "\n",
    ];
	var logostring = logo.join("");
	// consts
	const help =  '\n \n `A        For``L HELP ``Atype: ``Nhelp``A\u200b:\u200b``Vtrue` \n';
	const safekeeping = "\n" + "`A                SAFEKEEPING``L\u200b.\u200b``PPROJECT`\n" + "\n";
	//Convert Functions
		function _convertGCStrToNum(amount){
			let i_amt;
			if(!(l.is_num(amount))){
				i_amt = l.to_gc_num(amount);
			}
		else{
			i_amt = amount;
		}
		return i_amt;
	}
		function _convertGCNumToStr(amount){
			let s_amt;
			if(l.is_num(amount)){
				s_amt = l.to_gc_str(amount);
			}
			else{
				s_amt = amount;
			}
			return s_amt
		}
	//Check functions
	function _hasAccount(){
		if(!muduser){
			return false
		}
		return true
	}
	//Check args
	if(!args || Object.keys(args).length == 0){
		if (_hasAccount() == false){
			let act_createAcc = #s.youruser.sfcore({action:1});
			return act_createAcc;
		}
		return safekeeping + 
			logostring+
			"\n"+
			"`LYOUR BALANCE: `"+ #s.youruser.sfcore({action:2}) + " " + "\n" + help;
	}
	if(_hasAccount() == false)
	{
		let act_createAcc = #s.youruser.sfcore({action:1});
		return act_createAcc;
	}
	else{
		if(args.withdraw){
			var i_withdrawAmt = args.withdraw;
			var act_withdraw = #s.youruser.sfcore({action:3,amt:i_withdrawAmt});
			return act_withdraw;
		}
		if(args.instant){
			var i_depositAmt = args.deposit;
			var i_instantxfer = args.instant;
			if(context.calling_script || context.is_scriptor){
				return safekeeping + logostring + "\n `D               DEPOSIT FAILED:`\n`A            Instant deposits aren't allowed when scripted. Please use API*`" + help;
			}
			
			if(i_instantxfer.name != "accts.xfer_gc_to"){
				return safekeeping + logostring + "`D                                 DEPOSIT FAILED:`\n`A            You typed` #s." + i_instantxfer.name + "`A instead of` #s.`Aaccts.xfer_gc_to`"+help;
			}
			
			var act_InstDeposit = #s.youruser.sfcore({action:6, amt:i_depositAmt, xfer:i_instantxfer});
			
			return act_InstDeposit;
		}
		if((!args.instant) && (args.deposit)){
			var i_depositAmt = args.deposit;
			var act_depositGC = #s.youruser.sfcore({action:4, amt:i_depositAmt});
			if(!act_depositGC){
				return safekeeping + logostring + "`LDEPOSIT ACCEPTED` \n \n `ANEW BALANCE: `" + #s.youruser.sfcore({action:2})+ help;
			}
			else{
				return act_depositGC;
			}
		}
		if(args.transfer){
			var i_transferAmt = args.transfer;
			var u_gcReceiver = args.to;
			var act_transferTo = #s.youruser.sfcore({action:8, amt:i_transferAmt, to:u_gcReceiver});
			return act_transferTo;
		}
		if(caller == "youruser"){
			if(args.debug){
			#s.youruser.sfcore({action:5})	
			}
		}
		if(typeof args.help != "undefined"){
			var result = #s.youruser.sfcore({action:7});
			return result;
		}
		
	}
}
