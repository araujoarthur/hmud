function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();

	 var flag = ["`D██████████████████████████████████████████████████████████████`\n",
 	"`D███████████████████████████████████``H███``D████████████████████████`\n",
 	"`D██████████████████████████████████████``H████``D████████████████████`\n",
 	"`D████████████████████████████████████████``H████``D██████████████████`\n",
 	"`D██████████████████████``H████████████``D████████``H█████``D███████████████`\n",
 	"`D███████████████████``H█████████████``D███████████``H█████``D██████████████`\n",
 	"`D█████████████████``H████████████``D███████████████``H██████``D████████████`\n",
 	"`D██████████████``H█████████████``D██████████████████``H██████``D███████████`\n",
 	"`D████████████``H██████████████████``D████████████████``H██████``D██████████`\n",
 	"`D██████████████``H███████████████████``D█████████████``H██████``D██████████`\n",
 	"`D████████████████``H███████████████████``D███████████``H███████``D█████████`\n",
 	"`D██████████████████████████████``H████████``D████████``H███████``D█████████`\n",
 	"`D████████████████████████████████``H█████████``D████``H███████``D██████████`\n",
 	"`D███████████████████████████████████``H█████████████████``D██████████`\n",
 	"`D██████████████████``H███████``D████████████``H██████████████``D███████████`\n",
 	"`D████████████████``H█████████████████████████████████``D█████████████`\n",
 	"`D█████████████``H██████``D█████``H███████████████████████████``D███████████`\n",
 	"`D█████████``H████████``D███████████``H███████████████``D██``H█████████``D████████`\n",
 	"`D███████``H████████``D████████████████████████████████``H█████████``D██████`\n",
 	"`D██████``H████████``D███████████████████████████████████``H███████``D██████`\n",
 	"`D██████████████████████████████████████████████████████████████`\n"];

	const title = "\n\n													  	`AWelcome to the ``DCommunist``H Party`";
	const subtext = "\n\n `AYou can access resources from:` `Dcommunist`.`Hcomrades`"

	var balance = #hs.accts.balance();

	function checkUser(){
		return #fs.communist.data({option:"getone", filter:{name:caller}});
	}

	function registerUser(){
			let communist = {}
			communist.name = caller;
			communist.loc = #ls.sys.loc();
			communist.donations = balance;
			communist.lastbalance = balance;
			communist.exposed = false;
			communist.class = "partyMember";
			#fs.chats.tell({to:"communist", msg:"`AI just joined the` `Dparty`!"});
			#fs.chats.send({channel:"0000", msg:"`AI just joined the` `DCommunist``H Party``A! Comrades, meet us at ``Dcommunist``A.``Hparty`\n\n\n`ANot sure you should join us? Learn more at` `Dcommunist``A.``Hmanifesto`"});
			return #fs.communist.data({option:"insert", params:communist})
	}

	function getFunds(){
		let transfer = #ms.accts.xfer_gc_to({to:"communist", amount:l.to_gc_str(balance)});
		return transfer;
	}

	function updateCommunist(communist){
		let newBalance = balance;
		return #fs.communist.data({option:"update", query:{name:caller}, newdata:{$set:{lastbalance:balance}}}), #fs.communist.data({option:"update", query:{name:caller}, newdata:{$set:{donations:communist.donations + balance}}})
	}

	if(checkUser() == null){
		registerUser();
		getFunds();
		return flag.join("")+title+"\n\n\n\n`A You have been registered as ``Dparty``A member!` \n\n\n `HThank you for sharing your assets of: `"+ l.to_gc_str(balance) + subtext;
	} else{
		let communist = checkUser();
		getFunds();
		updateCommunist(communist);
		return flag.join("")+title+"\n\n\n\n`A Welcome Back ``DComrade``A!`\n\n\n `HThank you for sharing your assets of: `"+ l.to_gc_str(balance) + subtext;
	}



	/*
		Communist db:

		communist.name
		communist.loc
		communist.donations
		communist.lastbalance
		communist.exposed
		communist.class
	*/
}
