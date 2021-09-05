function(c, a)
{
	try {
	var caller = c.caller;
	var l = #fs.scripts.lib();
	var target = a.target;

	/*DB REQUESTS*/
	var dc2 = #db.f({lockName:"DATA_CHECK_V1"}).first().lockData;

	/* Input Vars */
	var ia = {};

	/*Log Vars*/
	var mylog = [];
	var seelog = a.seelog;


	/*Response Var*/
	var resp = "";

	/*Anti Non-Existent Script*/

	if(typeof target.call()=='object' && target.call().ok===false) return "\n `DERROR!` `AScript `"+target.name+"`A doesn't exist.`";

	/*Check Consts*/
	const ct = "Connection terminated."
	const dn = "Denied access";
	const ru = "Required unlock";

	/*Golf Arrow Functions*/
	var LE = x => x.length;
	var TC = x => target.call(x);
	var SC = x => x.split("\n").slice(-2);
	var IC = (x,y) => x.includes(y);
	var RIC = (x,y,z) => x[z].includes(y);
	var NL = _ => resp[1].match(/^[^ ]+ [^ ]+/)[0];
	var LO = m => mylog.push(#D(m));

	resp = SC(TC(ia));

	function _isLockbox(response){
		if(LE(response) == 1){
			if(IC(response[0],"To continue,")){
				return true
			}else{
				return false;
			}
		}else{
			return false;
		}
	}


	while (!IC(resp,ct)){ // Start of cracker block. Searches for Connection Terminated!

		if(_isLockbox(resp)){
			LO("`A[``Fl0ckbox``A]``l Cracker Started!`\n");
			//Handles LockBox

		}else if(RIC(resp, "magnara`", 1)){
			//MAGNARA CRACKER BLOCK
			LO("`A[``Fmagnara``A]``l Cracker Started!`\n");
			if(a.magnara){
				LO("`A[``Fmagnara``A]``C Using user provided solution`\n");
				// Handle user provided
				ia.magnara = a.magnara;
				resp=SC(TC(ia));

				if(LE(resp) == 1){
					if(resp[0].split(" ")[0] ==  "recinroct"){// Change do regex
						LO("`A[``Fmagnara``A]``d Using user provided solution failed`\n");
						a.magnara = "";
					}
				}
			}
			if(!a.magnara || a.magnara == ""){
				LO("`A[``Fmagnara``A]``C Using DICTIONARY method`\n");

				ia.magnara = ""
				resp = SC(TC(ia));
				var word = resp[0].split(": ")[1];

				LO("`A[``Fmagnara``A]``B Looking for anagrams of: ``V"+word+"`\n");

				let possibilities = #fs.webserver.dict({anagram:word}).msg;

				if (possibilities[0] == ""){
					LO("`A[``Fmagnara``A]``d No Solutions In Dictionary`\n");
					ia.magnara = "";
				}else{
					for (let possibility of possibilities){

						LO("`A[``Fmagnara``A]``B Trying answer: ``V"+possibility+"`\n");

						ia.magnara = possibility;
						resp = SC(TC(ia));
						if(LE(resp) == 1){//CHecks if lenght of resp = 1 (means that it isn't unlocked.)
							if(resp[0].split(" ")[0] ==  "recinroct"){// Change do regex
								ia.magnara = "";
							}
						}else{
							break;
						}
					}
				}
			}
			if(LE(resp) > 1 && RIC(resp,ct,1)){
				LO("`A[``Fmagnara``A]``T Breached by: ``V"+ia.magnara+"` \n");
				LO("\n`A[``MSYSTEM``A]``L ACCESS GRANTED`\n");
			}else if(LE(resp) && NL() == dn){
				LO("`A[``Fmagnara``A]``T Breached by: ``V"+ia.magnara+"` \n");
				LO("\n`A[``MSYSTEM``A]``K STARTING NEXT LOCK`\n");
			}
		}else if(RIC(resp, "acct_nt`", 1)){
			LO("`A[``Facct_nt``A]``l Cracker Started!`\n");
			//Handles ACCT_NT
			return 0;
		}else if(RIC(resp, "CON_SPEC`", 1)){
			LO("`A[``FCON_SPEC``A]``l Cracker Started!`\n");
			//Handles CON_SPEC
		}else if(RIC(resp, "sn_w_glock`", 1)){
			LO("`A[``Fsn_w_glock``A]``l Cracker Started!`\n");
			//Handles SN_W_GLOCK
		}else if(RIC(resp, "DATA_CHECK`", 1)){
			LO("`A[``FDATA_CHECK``A]``l Cracker Started!`\n");
			//Handles DATA_CHECK
		}
	}

} catch (e) {
	return e.stack;
}
}
