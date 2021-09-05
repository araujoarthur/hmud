function(context, args)
{
	var caller = context.caller;
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

 	const title = "\n\n													  	`AWelcome to the ``DCommunist``H Manifesto`";
 	const subtext = "\n\n `AWelcome Comrade` `D"+caller+"`";

	var ut = #fs.users.top();

	var announces = ["rights", "bakery"];

	function sumGC(){
		let GCStrs = ["146T970B294M221K841GC", "144T301B402M176K904GC", "83T882B852M701K929GC"];
		let sum = 0;
		for (let GCStr of GCStrs){
			sum = sum + l.to_gc_num(GCStr);
		}
		return l.to_gc_str(sum);
	}



	function invite(){
		#fs.chats.send({channel:"0000", msg:"`A Comrades, meet us at ``Dcommunist``A.``Hparty``A!` \n\n`ANot sure you should join us? Learn more at ``Dcommunist``A.``Hmanifesto`"});
	}


	var body = "\n\n\n" + flag.join("") + title + subtext + "\n\n\n `D We're still too poor to have resources! Go and invite as many people as you can!`";

	if(!args || !announces.includes(args.announce)){
		invite();
	}
	else if(args.announce == announces[0]) {
		#fs.chats.send({channel:"0000", msg:"``A Do you think it's right that only ``L" + ut[0].name + "``A hold an amount of `" + ut[0].balance + "`A? And dtr occupies all positions in the users.top`\n`A ranking?``A Or that corps like``L experiment_zero``A, ``L experiment_zezo``A and`"+
		"`L kahoots``A together hold more than `"+sumGC()+"`A?`\n\n`AOur ``DGOAL``A is to take the wealth from high ranks and distribute among the poorest players who earn their lives with T1 cracking.`\n\n\n`DDon't be afraid! Join The Fight!`"});
			invite();
	}
	else if(args.announce == announces[1]){
		#fs.chats.send({channel:"0000", msg:"`Y As requested by``0 dtr``Y, now we've got` `Fcake``Y at``D communist``A.``Hbakery`"})
		#fs.chats.send({channel:"town", msg:"`Y As requested by``0 dtr``Y, now we've got` `Fcake``Y at``D communist``A.``Hbakery`"})

	}
	return body;

}
