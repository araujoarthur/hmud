function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var gui = a => #fs.socialmud.gui(a);
	var header = gui({request:["h","hp"], hpTitle:"! Documentation !"});
	var wid = 109;
	var doc;
	function drawDocumentation(topic){

		let l=[
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
		]

		if(topic == ""){
			l.push("`A  ║``M  SELECT A TOPIC WITH topic:\"topic\" ` `A                                                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Topic List:                                                                                                ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║ * ``Vregister``A                                                                                                  ║`\n");
			l.push("`A  ║ * ``Vlogin``A                                                                                                     ║`\n");
			l.push("`A  ║ * ``Vprofile``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vfeed``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vsearch``A                                                                                                    ║`\n");
			l.push("`A  ║ * ``Vpost``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vsocialmud.com``A                                                                                             ║`\n");
		}else if(topic=="register"){
			l.push("`A  ║``H REGISTER ` `A                                                                                                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can register at socialmud.register by providing an ``Nusername``A and``N password``A that doesn't exist yet.       ║`\n");
			l.push("`A  ║  Choose your username and password wisely, they are unchangeable and will stay this way for a while.        ║`\n");
		}else if(topic=="login"){
			l.push("`A  ║``H LOGIN ` `A                                                                                                     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can login at socialmud.login by providing an valid ``Nusername``A and``N password``A combination.                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Once you have logged in, the script sets your hackmud username as auth for that profile so you are able    ║`\n");
			l.push("`A  ║  to navigate to other pages without providing ``Nusername``A and``N password``A again. This will stay this way until    ║`\n");
			l.push("`A  ║  you logout at socialmud.logout                                                                             ║`\n");
		}else if(topic == "profile"){
			l.push("`A  ║``H PROFILE ` `A                                                                                                     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can login at socialmud.login by providing an valid ``Nusername``A and``N password``A combination.                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Once you have logged in, the script sets your hackmud username as auth for that profile so you are able    ║`\n");
			l.push("`A  ║  to navigate to other pages without providing ``Nusername``A and``N password``A again. This will stay this way until    ║`\n");
			l.push("`A  ║  you logout at socialmud.logout                                                                             ║`\n");
		}
		
		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");

		return l.join("");
	}

	if(!args || !args.topic){
		doc = "";
	}else{
		doc = args.topic;
	}
	return header + drawDocumentation(doc)
}
