function(c, a){ // target:#s.user.loc
try {


	var caller = c.caller;
	var l = #fs.scripts.lib();
	var target = a.target;

	/*Cracker Vars*/
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
			if(I("magnara") && !I(lu + " magnara")){// magnara cracker block
				mylog.push("\n`A| [``Nmagnara``A]` `HCRACKER STARTED` `A|`\n");
				if(a.magnara){

					mylog.push("| [`Nmagnara`] Using `LUSER PROVIDED ANSWER` Method|\n");
					ia.magnara = a.magnara;
					resp = C(ia);

					if (I(lu+" magnara")){
						mylog.push("| [`Nmagnara`] unlocked by: `V"+ia.magnara+"` |\n");
						mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
					}
					else if(I(lu) && I(ct)){
						mylog.push("| [`Nmagnara`] unlocked by: `V"+ia.magnara+"` |\n");
						mylog.push("`L| [ACCESS GRANTED] |`\n");
					}
					else{
							mylog.push("| [`Nmagnara`] User provided word (`A" +ia.magnara +"`) is `Dwrong` Method|\n");
							return mylog.join("");
					}

				} else{
					mylog.push("| [`Nmagnara`] Using `LDICTIONARY` Method|\n");
					ia.magnara = "";
					resp = C(ia);

					let possibilities = #hs.dictionary.lookup({letters:resp.split(": ")[1]}).msg;

					mylog.push("| [`Nmagnara`] Anagram for: "+resp.split(": ")[1]+"|\n");

					for(let possibility of possibilities){ // Trying to unlock magnara with dictionary
						ia.magnara = possibility;

						mylog.push("| [`Nmagnara`] Trying Solution: "+possibility+" |\n");
						resp = C(ia);
						if(I(lu+" magnara")){
							mylog.push("| [`Nmagnara`] unlocked by: `V"+possibility+"` |\n");
							mylog.push(" `5 | [STARTING NEXT LOCK] |`\n");
							break;
						}
						else if(I(lu) && I(ct)){
							mylog.push("| [`Nmagnara`] unlocked by: `V"+possibility+"` |\n");
							mylog.push("`L| [ACCESS GRANTED] |`\n");
							break;
						}else{ // assumes magnara hasn't been unlocked
							mylog.push("| [`Nmagnara`] Dictionary failed solving for: "+resp.split(": ")[1]+"|\n");
							ia.mangara = "";
						}
					}

					if (ia.magnara == ""){ // Trying to unlock magnara by brute force
						mylog.push("| [`Nmagnara`] Starting brute-force solver for: "+resp.split(": ")[1]+" |\n");
						/*Brute force shit that I'm feeling lazy to do but should be bla bla bla try try try if not unlocked return log messsage asking for user input magnara.*/
					}
				}
			}
	}
	if(seelog){
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

} catch (e) {
	return e.stack;
}
}
