function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var target = a.target;

	var ez_21p = ["unlock","open","release"];
	var prime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
	var clr = ["red","orange","yellow","lime","green","cyan","blue","purple"];
	var l0cket = #db.f({lockName:"l0cket_k3y_v1"}).first().lockData;
	var dc1 = #db.f({lockName:"DATA_CHECK_V1"}).first().lockData;

	/*Check Consts*/
	const ct = "Connection terminated."
	const dn = "Denied access";
	const ru = "Required unlock";
	const nhl = ":::TRUST COMMUNICATION::: hardline required - activate with kernel.hardline"

	/* Input Vars */
	var ia = {};

	/*Log Vars*/
	var mylog = [];
	var seelog = a.seelog;
	var research = {};
	research.ok = true;
	research.class = "research"
	research.researchType = "T1 Behavior"
	research.target = a.target.name;
	research.tier = 1;
	research.locks = [];
	


	/*Response Var*/
	var resp = "";
	var partialBreach;

	/*Anti Non-Existent Script*/

	if(typeof target.call()=='object' && target.call().ok===false) return "\n `DERROR!` `AScript `"+target.name+"`A doesn't exist.`";

	/*Golf Arrow Functions*/
	var LE = x => x.length;
	var TC = x => target.call(x);
	var SC = x => x.split("\n").slice(-2);
	var IC = (x,y) => x.includes(y);
	var RIC = (x,y,z) => x[z].includes(y);
	var NL = _ => resp[1].match(/^[^ ]+ [^ ]+/)[0];
	var LO = m => mylog.push(m);

	resp = SC(TC(ia));
	if (resp[0] == nhl) return {ok:false, msg:nhl};


	while (!IC(resp,ct)){ // Start of cracker block. Searches for Connection Terminated!
		if(RIC(resp,"EZ_21`",1)){
			// EZ_21 CRACKER BLOCK //
			LO("`A[``FEZ_21``A]``l Cracker Started!`\n");

			research.locks.push("ez_21");

			for(let pass of ez_21p){
					LO("`A[``FEZ_21``A]``B For Loop - Trying: ``V"+pass+"`\n");

					ia.EZ_21 = pass;
					resp = SC(TC(ia));

					if(RIC(resp,ct,1)){
						LO("`A[``FEZ_21``A]``T Breached by: ``V"+pass+"`\n");
						LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
						break;
					}else if(NL() == dn){
						LO("`A[``FEZ_21``A]``T Breached by: ``V"+pass+"`\n");
						LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
						break;
					}
			}
		}else if(RIC(resp,"EZ_35`",1)){
			// EZ_35 CRACKER BLOCK //
			LO("`A[``FEZ_35``A]``l Cracker Started!`\n");
			
			research.locks.push("ez_35");

			for(let pass of ez_21p){
				LO("`A[``FEZ_35``A]``B Keyword For Loop - Trying: ``V"+pass+"`\n");

				ia.EZ_35 = pass;
				resp = SC(TC(ia));
				if(resp[1].startsWith(ru)){
					LO("`A[``FEZ_35``A]``T Accepted: ``V"+pass+"`\n");
					LO("`A[``FEZ_35``A]``B Starting with digits`\n");
					for(let i = 0; i<10; i++){
						LO("`A[``FEZ_35``A]``B Digit For Loop - Trying: ``V"+i+"`\n");
						ia.digit = i;
						resp = SC(TC(ia));

						if(RIC(resp,ct,1)){
							LO("`A[``FEZ_35``A]``T Breached by: ``V"+pass+"``T and digit: ``V"+i+"`\n");
							LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
							break;
						}else if(NL() == dn){
							LO("`A[``FEZ_35``A]``T Breached by: ``V"+pass+"``T and digit: ``V"+i+"`\n");
							LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
							break;
						}
					}
					break;
				}
			}
		}else if(RIC(resp,"EZ_40`",1)){
			// EZ_40 CRACKER BLOCK //
			LO("`A[``FEZ_40``A]``l Cracker Started!`\n");

			research.locks.push("ez_40");

			for(let pass of ez_21p){
				LO("`A[``FEZ_40``A]``B Keyword For Loop - Trying: ``V"+pass+"`\n");

				ia.EZ_40 = pass;
				resp = SC(TC(ia));
					if(resp[1].startsWith(ru)){
						LO("`A[``FEZ_40``A]``B Starting with primes`\n");
						for(let number of prime){
							ia.ez_prime = number;
							resp = SC(TC(ia));

							LO("`A[``FEZ_40``A]``B Prime For Loop - Trying: ``V"+number+"`\n");
							if(RIC(resp,ct,1)){
								LO("`A[``FEZ_40``A]``T Breached by: ``V"+pass+"``T and digit: ``V"+number+"`\n");
								LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
								break;
							}else if(NL() == dn){
								LO("`A[``FEZ_40``A]``T Breached by: ``V"+pass+"``T and digit: ``V"+number+"`\n");
								LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
								break;
							}
						}
						break;
					}
			}
		}else if(RIC(resp,"c001`",1)){
			// c001 CRACKER BLOCK //
			LO("`A[``Fc001``A]``l Cracker Started!`\n");

			research.locks.push("c001");

			for(let i = 0; i < LE(clr); i++){
				LO("`A[``Fc001``A]``B Color For Loop - Trying: ``V"+clr[i]+"`\n");
				ia.c001 = clr[i];
				resp = SC(TC(ia));

				if(resp[1].startsWith(ru)){
						LO("`A[``Fc001``A]``B Asked for color digit: ``V"+LE(clr[i])+"`\n");
						ia.color_digit = LE(clr[i]);
						resp = SC(TC(ia));
				}

				if(RIC(resp,ct,1)){
					LO("`A[``Fc001``A]``T Breached by: ``V"+clr[i]+"`\n");
					LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
					break;
				}else if(NL() == dn){
					LO("`A[``Fc001``A]``T Breached by: ``V"+clr[i]+"`\n");
					LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
					break;
				}
			}

		}else if(RIC(resp,"c002`",1)){
			// c002 CRACKER BLOCK //

			research.locks.push("c002");

			LO("`A[``Fc002``A]``l Cracker Started!`\n");
			for(let i = 0; i < LE(clr); i++){
				let compl = (i >= 4 ? i-4 : i+4);
				LO("`A[``Fc002``A]``B Color For Loop - Trying: ``V"+clr[i]+"``B and its complement ``V"+clr[compl]+"`\n");

				ia.c002 = clr[i];
				ia.c002_complement = clr[compl];

				resp = SC(TC(ia));

				if(RIC(resp,ct,1)){
					LO("`A[``Fc002``A]``T Breached by: ``V"+clr[i]+"``T and its complement: ``V"+clr[compl]+"`\n");
					LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
					break;
				}else if(NL() == dn){
					LO("`A[``Fc002``A]``T Breached by: ``V"+clr[i]+"``T and its complement: ``V"+clr[compl]+"`\n");
					LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
					break;
				}
			}

		}else if(RIC(resp,"c003`",1)){
			// c003 CRACKER BLOCK //
			LO("`A[``Fc003``A]``l Cracker Started!`\n");

			research.locks.push("c003");

			for(let i = 0; i<LE(clr); i++){
				let compl = (i >= 4 ? i-4 : i+4)
				let triad = [];

				if((compl != 7) && compl!=0){
					triad.push(clr[compl+1]);
					triad.push(clr[compl-1]);
				}
				else if(compl==0){
					triad.push(clr[7])
					triad.push(clr[compl+1])
				}
				else if(compl==7){
					triad.push(clr[0])
					triad.push(clr[compl-1])
				}
				ia.c003 = clr[i];


				ia.c003_triad_1 = triad[0];
				ia.c003_triad_2 = triad[1];

				LO("`A[``Fc003``A]``B Color For Loop - Trying:` `V"+clr[i]+"``B and its triads: ``V"+triad[0]+"``B and ``V"+triad[1]+"` \n");

				resp = SC(TC(ia));

				if(IC(resp[1],"first triad")){
					LO("`A[``Fc003``A]``B First triad guess ``DWRONG``B. Switching triads to: ``V"+triad[1]+"``B and: ``V"+triad[0]+"` \n");
					ia.c003_triad_1 = triad[1];
					ia.c003_triad_2 = triad[0];
					resp = SC(TC(ia));
				}

				if(RIC(resp,ct,1)){
					LO("`A[``Fc003``A]``T Breached by: ``V"+clr[i]+"``T and its triad_1: ``V"+ia.c003_triad_1+"``T and its triad_2:``V "+ia.c003_triad_2+"`\n");
					LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
					break;
				}else if(NL() == dn){
					LO("`A[``Fc003``A]``T Breached by: ``V"+clr[i]+"``T and its triad_1: ``V"+ia.c003_triad_1+"``T and its triad_2:``V "+ia.c003_triad_2+"`\n");
					LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
					break;
				}
			}

		}else if(RIC(resp,"l0cket`",1)){
			// c003 CRACKER BLOCK //
			LO("`A[``Fl0cket``A]``l Cracker Started!`\n");

			research.locks.push("l0cket");

			for (let key of l0cket){
				ia.l0cket = key;
				resp = SC(TC(ia));

				if(RIC(resp,ct,1)){
					LO("`A[``Fl0cket``A]``T Breached by: ``V"+key+"`\n");
					LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
					break;
				}else if(NL() == dn){
					LO("`A[``Fl0cket``A]``T Breached by: ``V"+key+"`\n");
					LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
					break;
				}
			}
		}else if(RIC(resp,"DATA_CHECK`",1)){
			// c003 CRACKER BLOCK //
			LO("`A[``FDATA_CHECK``A]``l Cracker Started!`\n");

			research.locks.push("DATA_CHECK");

			let answer = [];

			ia.DATA_CHECK = "";
			resp = TC(ia).split("\n");

			for (let phrase of resp){
				LO("`A[``FDATA_CHECK``A]``B Checking for answer for phrase: ``V"+phrase+"`\n");
				for(let object of dc1){
					if (object.phrase == phrase){
						answer.push(object.answer);
						LO("`A[``FDATA_CHECK``A]``G Answer: ``V"+object.answer+"`\n");
					}
				}
			}
			let aj = answer.join("");
			ia.DATA_CHECK = aj;

			resp = SC(TC(ia));

			if(RIC(resp,ct,1)){
				LO("`A[``FDATA_CHECK``A]``T Breached by: ``V"+aj+"`\n");
				LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
			}else if(NL() == dn){
				LO("`A[``FDATA_CHECK``A]``T Breached by: ``V"+aj+"`\n");
				LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
			}
		}else{
			partialBreach = true;
			break;
		}
	}
	research.response = resp.join("\n");
	if(a && a.research){
		#fs.chats.tell({to:"watcher", msg:JSON.stringify(research)});
	}
	// AFTER WHILE
	if (RIC(resp,ct,1)){
		let rObj = {ok:true, msg:"`LSystem Breached`"};
		let rStr = "";
		if(a){
			if(a.seelog){
				rStr += "\n" + mylog.join("");
			}
			if(a.parameters){
				rStr += "\n\n\n`YBREACH PARAMETERS:`"+JSON.stringify(ia);
			}
		}
		if(rStr != ""){
			return rStr;
		}else{
			return rObj;
		}
	}else if(partialBreach){
		return {ok:true, partial:true, t1_obj:ia, research:research}
	}else{
		return "\n" + mylog.join("")+ "\n\n `DSOMETHING WENT WRONG!`"
	}
}
