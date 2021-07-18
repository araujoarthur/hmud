function(context, args)
{
	var caller = context.caller;
	var l = #s.scripts.lib();
	var c_Caller = #db.f({Name:caller}).first();
	var dt_RunDate = l.get_date();
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
	var logostring = a_logo.join("");
	//consts
	const help =  '\n \n `A        For``L HELP ``Atype: ``Nhelp``A\u200b:\u200b``Vtrue` \n';
	const safekeeping = "\n" + "`A                                 SAFEKEEPING``L\u200b.\u200b``PPROJECT`\n" + "\n";
	const withdFailed = "`DWITHDRAW FAILED`";
	const withdAccp = "`LWITHDRAW ACCEPTED`";
	const depoFailed = "`DDEPOSIT FAILED:`";
	const antifoo = "\n\n\`DYou must type a valid value`";
	// Here starts check and convert functions;
	function _convertGCStr(amount){
		let i_amt;
		if((!(l.is_num(amount))) && l.is_str(i_amt)){
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
	
	function _checkInteger(amount){
		let i_amt = amount;
		return (l.is_int(i_amt));
	}
	// Here starts sf functions
	function _createAccount(){ 
		var o_User = {}
		o_User.Name = caller;
		o_User.Balance = 0;
		o_User.JoinDate = l.get_date();
		#db.i(o_User);
		return safekeeping + logostring + "           `LAccount Created!`\n" + help;
	}
	function _showBalance(){
		var s_GC = l.to_gc_str(c_Caller.Balance);
		return s_GC;
	}
	function _withdrawGC(amount){
		let i_Balance = c_Caller.Balance;
		let i_amt = _convertGCStr(amount);
		if(typeof i_amt == "number"){
			if(_checkInteger(i_amt) == false){
				return safekeeping + logostring + "\n \n" + withdFailed + " \n \n `AThe value you're trying to withdraw isn't an integer`" + "\n \n" + help;
			}
			if((i_Balance < amount) || (amount <= 0)){
				return safekeeping + logostring + "\n" + withdFailed + "\n\n`A      You can't withdraw more than you have.` \n \n `LIf you think It's a mistake please contact``A safekeeping` \n `L              with a screenshot`"+
					"\n \n"+
					"`AYou have: `" + _showBalance() + "\n" + "\n" +
					"`AYou're trying to withdraw: `" + _convertGCNumToStr(i_amt) + " " + help;
			}
			else{
				let gc_NewAmt = i_Balance - i_amt;
				#s.accts.xfer_gc_to_caller({amount:i_amt, memo:"`FMud``JPay` `Awithdrawal`"});
				#db.u({Name:caller}, {$set:{Balance:gc_NewAmt}});
				return safekeeping + logostring + "\n " + withdAccp + " \n \n `ANEW BALANCE: `" + _convertGCNumToStr(gc_NewAmt) + " " + help;
			}
		} 
		else return antifoo;
	}
	function _depositGC(amount){
        let i_Balance = c_Caller.Balance; 
        let i_amt = _convertGCStr(amount);
		if(typeof i_amt == "number"){
			let gc_NewAmt = i_Balance + i_amt;
			if(_checkInteger(i_amt) == false){
				return safekeeping + logostring + "\n \n" + "`DDEPOSIT FAILED` \n \n `AThe value you're trying to deposit isn't an integer`" + "\n \n" + help;
			}
			var result = #s.escrow.charge({cost:i_amt, is_unlim:false});
			if(result){ 
				result.msg = safekeeping + logostring + "\n`DDEPOSIT FAILED` \n \n" + result.msg + '\n \n `A                             For``L HELP ``Atype: ``Nhelp``A\u200b:\u200b``Vtrue` \n';
				return result;
			}
			else{
				#db.u({Name:caller}, {$set:{Balance:gc_NewAmt}});
			}
		}
		else return antifoo;
	}
	function _instDepositGC(amount, xfer){
		let i_Balance = c_Caller.Balance;
		let i_amt = _convertGCStr(amount);
		if(typeof i_amt == "number"){
			let gc_NewAmt = i_Balance + i_amt;
			if(_checkInteger(i_amt) == false){
				return safekeeping + logostring + "\n \n" + depoFailed + " \n \n `AThe value you're trying to deposit isn't an integer`" + "\n \n" + help;
			}
			if(amount <= 0){
				return safekeeping + logostring + depoFailed + "\n \n `AYou can't deposit zero or lower than zero values`"+ help;
			}
			else{
				var act_Transfer = xfer.call({to:"youruser", amount:i_amt});
				if(act_Transfer.ok){
					#db.u({Name:caller}, {$set:{Balance:gc_NewAmt}});
					return safekeeping + logostring + "\n `LDEPOSIT ACCEPTED` \n \n `ANEW BALANCE: `" + _convertGCNumToStr(i_amt) + " " + help;
				}
				else{
					return safekeeping + logostring + depoFailed +"\n \n" + act_Transfer.msg + help;
				}
			}
		}
		else return antifoo;
	}
	function _transferGC(amount, receiver){
		let u_toUser = #db.f({Name:userto}).first();
		// special check func
		function _hasAccountTO(){
			if(!u_toUser){
				return false
			}
			return true
		}
		//
		if(_hasAccountTO() == false){
			return safekeeping + logostring + "\n \n" + "`DTRANSFER FAILED` \n \n `AUSER DIDN'T RUN youruser.sf YET`" + "\n \n" + help;
		}
		let i_senderBalance = c_Caller.Balance;
		let i_amt = _convertGCStr(amount);
		if(typeof i_amt == "number"){
			let gc_senderNewAmt = c_Caller.Balance - i_amt;
			let gc_toNewAmt = u_toUser.Balance + i_amt;
			if(u_toUser.Name == c_Caller.Name){
				return safekeeping + logostring + "\n \n" + "`DTRANSFER FAILED` \n \n `AYou can't transfer to yourself`" + "\n \n" + help;
			}
			if(_checkInteger(i_amt) == false){
				return safekeeping + logostring + "\n \n" + "`DTRANSFER FAILED` \n \n `AThe value you're trying to transfer isn't an integer`" + "\n \n" + help;
			}
			if(i_amt > i_senderBalance){
				return safekeeping + logostring + "\n \n" + "`DTRANSFER FAILED` \n \n `AYour balance is too low to transfer`" + "\n \n" + help;
			}
			if(i_amt < 0){
				return safekeeping + logostring + "\n \n" + "`DTRANSFER FAILED` \n \n `AYou can't transfer negative values`" + "\n \n" + help;
			}
			else {
				#db.u({Name:caller}, {$set:{Balance:gc_senderNewAmt}});
				#db.u({Name:u_toUser.Name}, {$set:{Balance:gc_toNewAmt}});
				return safekeeping + logostring + "\n \n" + "`LTRANSFER SUCCESS` \n \n " + l.to_gc_str(i_amt) + "`A TRANSFERED TO `"+ u_toUser.Name + "\n \n" + "`A NEW BALANCE: `" + _convertGCNumToStr(gc_senderNewAmt) + "\n \n" +help;
			}
		}
		else return antifoo;
		
	}
	function _showHelp(){
		var s_Help = safekeeping + "\n" + logostring + "\n"+#s.youruser.help({text:1});
		return s_Help;
	}
		// here you check args
	if(args){
		var action = args.action;
	}
	if(args.action == 3 || args.action == 4 || args.action == 6 || args.action == 8){
		var gc_Amount = _convertGCStr(args.amt);
		if(args.action == 6){
			var userxfer = args.xfer;
		}
		if(args.action == 8){
			var userto = args.to;
		}
	}
	switch(args.action){
		case 1: return _createAccount();
		case 2: return _showBalance();
		case 3: return _withdrawGC(gc_Amount);
		case 4: return _depositGC(gc_Amount);
		case 5: return {a:c_Caller, b:c_Caller.Balance};
		case 6: return _instDepositGC(gc_Amount, userxfer);
		case 7: return _showHelp();
		case 8: return _transferGC(gc_Amount, userto);
	}
	/*
	Actions:
	#1 Create Account
	#2 Show caller's balance
	#3 Withdraw GC
	#4 Deposit GC ESCROW
	#5 Debug
	#6 Deposit GC Instant
	
	Provided Functions And Explanations:
	_convertGCStr: Check's if the input isn't a number then convert it to. (It'll make sum and subtract operations easier)
	
	Read-Friendly names explain:
	_ prefix: function
	i_ prefix: integer
	s_ prefix: string
	gc_ prefix: GC amounts (I might have used i_ for some)
	o_ prefix: object
	a_ prefix: array
	dt_ prefix: date
	act_ prefix: Action
	u_ prefix: user
	
	You can contact me on discord for some help
	
	TO-DO: 
	1)Finish withdraw GC (might need some botting for a better result) [C]
	2) API
	3) Change how errors appear (Especify what happened) on withdraw and deposit [C]
	//Thanks to:
	@dtr -> Pentested it a lot and helped with solutions.
	@jade -> Helped on understanding how some things works.
	@Soron -> Helped a lot with code questions.
	@Leming -> Almost everything I know about JavaScript he taught me.
	@Ats -> Pentested it and helped with code.
	@n00bish -> Helped a lot with code questions.
	@Bladewolf ->Helped a lot with code questions.
	
	
	-> I deleted my debug returns and functions (expect for case 5) because of characters count <3
	*/
}
