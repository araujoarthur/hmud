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
 	const subtext = "\n\n `AYou can join us from:` `Dcommunist`.`Hjoin`";

	var ut = #fs.users.top();

	function sumGC(){
		let GCStrs = ["146T970B294M221K841GC", "144T301B402M176K904GC", "83T882B852M701K929GC"];
		let sum = 0;
		for (let GCStr of GCStrs){
			sum = sum + l.to_gc_num(GCStr);
		}
		return l.to_gc_str(sum);
	}

	function announce(){
		#fs.chats.send({channel:"0000", msg:"`AI'm reading the` `Dcommunist``A.``Hmanifesto``A! Come read it too!`"})
		#fs.chats.send({channel:"town", msg:"`AI'm reading the` `Dcommunist``A.``Hmanifesto``A! Come read it too!`"})
	}

	var body = "\n\n\n" + flag.join("") + title + subtext + "\n\n\n`HWhy join us?`\n\n`D R:``A Do you think it's right that only ``L" + ut[0].name + "``A hold an amount of `" + ut[0].balance + "`A? And dtr occupies all positions in the users.top`\n`A ranking?``A Or that corps like``L experiment_zero``A, ``L experiment_zezo``A and`"+
	"`L kahoots``A together hold more than `"+sumGC()+"`A?`\n\n`AOur ``DGOAL``A is to take the wealth from high ranks and distribute among the poorest players who earn their lives with T1 cracking.`\n\n\n`DDon't be afraid! Join The Fight!`\n\n\n\n\n`YAlso, if you're dtr, there might be``F cake ``Yat``D communist``A.``Hbakery`";

	announce();

 	return body;

}
