function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var wid = 109;
	
	function drawHeader(){
		let l =
			["\n  `L BETA TESTING - Resets are expected!`\n",
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"  `A║                                                                                                             ║`\n ",
			" `A║ Need help? Check socialmud.documentation                                                                    ║`\n ",
			" `A║                                                                                                             ║`\n ",
			" `A║                                                                                                             ║`\n ",
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

	function drawHello(){
		let l=[
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║``D  ERROR!` `A                                                                                                    ║`\n",
				"`A  ║  You're trying to call ``Rsocial``Cmud` `Afrom an unauthorized script!                                               ║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ║"+" ".repeat(wid)+"║`\n",
				"`A  ╚"+"═".repeat(wid)+"╝`\n"
		]

		return l.join("");
	}

	return drawHeader() + drawHello(); 
}
