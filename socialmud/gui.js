function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var wid = 109;

	function giveHeader(){
			let l =
				["`A  ╔"+"═".repeat(wid)+"╗`\n",
				"  `A║                                                                                                             ║`\n ",
				" `A║ ``c                                                                ◢██◤ ``R                                 ◢██◤ ` `A║`\n",
				"  `A║``c                                                                ◢██◤``R                                  ◢██◤`   `A║`  \n",
				"  `A║``c                                                               ◢██◤``R                                  ◢██◤`    `A║` \n",
				"  `A║``c                                            ◢██◤              ◢██◤``R                                  ◢██◤`     `A║`  \n",
				"  `A║``c                                           ◢██◤              ◢██◤``R                                  ◢██◤`      `A║` \n",
				"  `A║``c                                                            ◢██◤``R                                  ◢██◤`       `A║`\n",
				"  `A║``c      ◢████████◤  ◢████████◤  ◢███████◤  ◢██◤  ◢████████◤  ◢██◤``R  ◢███◤ ◢███◤  ◢██◤  ◢██◤  ◢█████████◤`        `A║`   \n",
				"  `A║``c     ◢██◤        ◢██◤  ◢██◤  ◢██◤ ◢██◤  ◢██◤        ◢██◤  ◢██◤``R  ◢█████████◤  ◢██◤  ◢██◤  ◢██◤  ████◤`         `A║`    \n",
				"  `A║``c    ◢████████◤  ◢██◤  ◢██◤  ◢██◤       ◢██◤  ◢████████◤  ◢██◤``R  ◢██◤◢█◤◢██◤  ◢██◤  ◢██◤  ◢██◤   ███◤`          `A║`     \n",
				"  `A║``c         ◢██◤  ◢██◤  ◢██◤  ◢██◤ ◢██◤  ◢██◤  ◢██◤  ███◤  ◢██◤``R  ◢██◤   ◢██◤  ◢████████◤  ◢█████████◤`           `A║`  \n",
				"  `A║``c  ◢████████◤  ◢████████◤  ◢███████◤  ◢██◤  ◢████████◤  ◢██◤``R  ◢██◤   ◢██◤  ◢████████◤  ◢█████████◤`            `A║`  \n",
				"  `A║                                                                                                             ║`\n  ",
				"`A╚"+"═".repeat(wid)+"╝`\n"];
				return l.join("");
	}
	function giveNav(){
		let l = ["`A  ╔"+"═".repeat(wid)+"╗`\n",
		"  `A║                ``sProfile                  Search                  Post                  Friends``A               ║`\n ",
		"`A ╚"+"═".repeat(wid)+"╝`\n"];
		return l.join("");
	}

	function giveToolBar(user, req, friends){

		let l=[
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
				"`A  ║  Hello, ``C"+user+("``AYou got ``L"+friends+"``A friends and ``L"+req+"``A requests ").padStart(wid-user.length+6	)+"║`\n",
				"`A  ╚"+"═".repeat(wid)+"╝`\n"
		]
		return l.join("");
	}

	function givePosts(posts){
		let l = ["`A  ╔"+"═".repeat(wid)+"╗`\n"];
		for(let post of posts){

		}
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");
		return l.join("");
	}

	function giveCreateAccount(){
		let l=[
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║``C  Hello! You can login by using your ``Nusername``C and``N password` `A                                                  ║`\n",
				"`A  ║``C  If you aren't registered yet, you can include register:true and your ``Nusername``C and``N password` `A                ║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ╚"+"═".repeat(wid)+"╝`\n"
		]

		return l.join("");
	}
	return giveHeader() + giveCreateAccount();

}
