function(c, a){ // target:#s.user.loc
	try{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var target = a.target;

	/*Cracker Vars*/
	var ez_21p = ["unlock","open","release"];
	var prime = [1,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
	var clr = ["red","orange","yellow","lime","green","cyan","blue","purple"];
	var ia = {};


 /*Log Vars*/
	var mylog = [];
	var seelog = a.seelog;

	/*Golf Arrow Functions*/

	var L = x => x.length;
	var C = x => target.call(x);
	var I = x => resp.includes(x);

	/*Response Var*/
	var resp = C(ia);

	if(typeof resp=='object' && resp.ok===false) return "\n `DERROR!` `AScript `"+target.name+"`A doesn't exist.`";



	//Golf Consts
	const ct = "Connection terminated.";
	const lu = "LOCK_UNLOCKED`";

	while(I("LOCK_ERROR`")){
		if(I("EZ_21") && !I(lu + " EZ_21")){ //EZ_21 Cracker Block
			mylog.push("\n`A| [``NEZ_21``A]` `HCRACKER STARTED` `A|`\n");
			for (let i = 0; i < L(ez_21p) ; i++){

				mylog.push("| [`NEZ_21`] For Loop - Trying: "+ez_21p[i]+"|\n");

				ia.EZ_21 = ez_21p[i];
				resp = C(ia);

				if (I(lu+" EZ_21")){
					mylog.push("| [`NEZ_21`] unlocked by: `V"+ez_21p[i]+"` |\n");
					mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
					break;
				}
				else if(I(lu) && I(ct)) {
					mylog.push("| [`NEZ_21`] unlocked by: `V"+ez_21p[i]+"` |\n");
					mylog.push("`L| [ACCESS GRANTED] |`\n");
					break;
				}
			}
		}

		else if(I("EZ_35") && !I(lu+" EZ_35")){ //EZ_35 Cracker Block
			mylog.push("\n`A| [``NEZ-35``A]` `HCRACKER STARTED` `A|`\n")
			for(let i = 0; i < L(ez_21p); i++ ){

				mylog.push("| [`NEZ_35`] Word For Loop - Trying: "+ez_21p[i]+"|\n");

				ia.EZ_35 = ez_21p[i];
				resp = C(ia);

				if(I("digit` is missing")){
					mylog.push("| [`NEZ_35`] For Loop - `NWord`:`V"+ez_21p[i]+"`|\n");
					for(let c = 0; c < 10; c++){
						mylog.push("| [`NEZ_35`] Digit For Loop - Trying: "+c+"|\n");
						ia.digit = c;
						resp = C(ia);
						if(I(lu+" EZ_35")){
							mylog.push("| [`NEZ_35`] unlocked by: `V"+ez_21p[i]+"` and `V"+c+"` |\n");
							mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
							break;
						}
						else if(I(lu) && I(ct)){
							mylog.push("| [`NEZ_35`] unlocked by: `V"+ez_21p[i]+"` and `V"+c+"` |\n");
							mylog.push("`L| [ACCESS GRANTED] |`\n");
							break;
						}
					}
					break;
				}
			}
		}
		else if(I("EZ_40") && !I(lu+" EZ_40")){ //EZ_40 Cracker Block
			mylog.push("\n`A| [``NEZ-40``A]` `HCRACKER STARTED` `A|`\n");

			for(let i = 0; i<L(ez_21p); i++){

				mylog.push("| [`NEZ_40`] Word For Loop - Trying: "+ez_21p[i]+"|\n");

				ia.EZ_40 = ez_21p[i];
				resp = C(ia);

				if(I("ez_prime`")){
						mylog.push("| [`NEZ_40`] For Loop - `NWord`:`V"+ez_21p[i]+"`|\n");
						for(let c = 0; c < L(prime); c++){

							mylog.push("| [`NEZ_40`] Prime For Loop - Trying: "+prime[c]+"|\n");

							ia.ez_prime = prime[c];
							resp = C(ia);

							if(I(lu + " EZ_40")){
								mylog.push("| [`NEZ_40`] unlocked by: `V"+ez_21p[i]+"` and `V"+prime[c]+"` |\n");
								mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
								break;
							}
							else if(I(lu) && I(ct)){
								mylog.push("| [`NEZ_40`] unlocked by: `V"+ez_21p[i]+"` and `V"+prime[c]+"` |\n");
								mylog.push("`L| [ACCESS GRANTED] |`\n");
								break;
							}
						}
						break;
				}
			}
		}
		else if(I("c001") && !I(lu+" c001")){ //c001 Cracker Block
			mylog.push("\n`A| [``Nc001``A]` `HCRACKER STARTED` `A|`\n");

			for(let i = 0; i < L(clr); i++){

					mylog.push("| [`Nc001`] Color For Loop - Trying: "+clr[i]+"|\n");

					ia.c001 = clr[i];
					resp = C(ia);

					if(I("color_digit` is missing")){
							mylog.push("| [`Nc001`] Color For Loop - ASKED FOR `Ncolor_digit ("+L(clr[i])+")`|\n");
							ia.color_digit = L(clr[i]);
							resp = C(ia);
					}

					if(I(lu+" c001")){
						mylog.push("| [`Nc001`] unlocked by: `V"+clr[i]+"` |\n");
						mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
						break;
					}
					else if(I(lu) && I(ct)){
						mylog.push("| [`Nc001`] unlocked by: `V"+clr[i]+"` |\n");
						mylog.push("`L| [ACCESS GRANTED] |`\n");
						break;
					}
			}
		}
		else if(I("c002") && !I(lu+" c002")){ //c002 Cracker Block
				mylog.push("\n`A| [``Nc002``A]` `HCRACKER STARTED` `A|`\n");

				for(let i = 0; i < L(clr); i++){
					let compl = (i >= 4 ? i-4 : i+4)
					mylog.push("| [`Nc002`] Color For Loop - Trying: "+clr[i]+"and its complement: "+clr[compl]+"|\n");

					ia.c002 = clr[i];
					ia.c002_complement = clr[compl];

					resp = C(ia)

					if(I(lu+" c002")){
						mylog.push("| [`Nc002`] unlocked by: `V"+clr[i]+"` and its complement:`V"+clr[compl]+"`|\n");
						mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
						break;
					}else if(I(lu) && I(ct)){
						mylog.push("| [`Nc002`] unlocked by: `V"+clr[i]+"` and its complement:`V"+clr[compl]+"`|\n");
						mylog.push("`L| [ACCESS GRANTED] |`\n");
						break;
					}
				}
		}
		else if(I("c003") && !I(lu+" c003")){  //c003 Cracker Block
			mylog.push("\n`A| [``Nc003``A]` `HCRACKER STARTED` `A|`\n");

			for(let i = 0; i<L(clr); i++){
				let compl = (i >= 4 ? i-4 : i+4)
				let triad = []

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

				mylog.push("| [`Nc003`] Color For Loop - Trying: "+clr[i]+" and its triads: "+triad[0]+" and "+triad[1]+"|\n");

				ia.c003 = clr[i];
				resp = C(ia);

				if(I("c003_triad_1` is missing")){
					mylog.push("| [`Nc003`] Color For Loop - ASKED FOR `Nc003_triad_1` |\n");

					ia.c003_triad_1 = triad[0];
					resp = C(ia)

					if(I("LOCK_ERROR`") && !I("c003_triad_2`")){
						mylog.push("| [`Nc003`] Color For Loop - FIRST GUESS `Nc003_triad_1` `DWRONG` |\n");
						mylog.push(resp);
						ia.c003_triad_1 = triad[1];
						ia.c003_triad_2 = triad[0];
					}
					else if(I("c003_triad_2` is missing")){
						ia.c003_triad_2 = triad[1];
						mylog.push("| [`Nc003`] Color For Loop - FIRST GUESS `Nc003_triad_1` `LCORRECT` |\n");
					}

					resp = C(ia)

					if(I(lu+" c003")){
						mylog.push("| [`Nc002`] unlocked by: `V"+clr[i]+"` and its triads: `V"+triad[0]+"` and `V"+triad[1]+"` |\n");
						mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
						break;
					}
					else if(I(lu) && I(ct)){
						mylog.push("| [`Nc002`] unlocked by: `V"+clr[i]+"` and its triads: `V"+triad[0]+"` and `V"+triad[1]+"` |\n");
						mylog.push("`L| [ACCESS GRANTED] |`\n");
						break;
					}
				}
			}
		}
	}
	if(a.seelog){
			return mylog.join("");
	}
	else{
		if(I(lu)&&I(ct)){
			return {ok:true, msg:"Access Granted!"};
		}
		else{
			return {ok:false, msg:"Something went wrong!"};
		}

	}

}catch(e){
	return e.stack;
}
}
