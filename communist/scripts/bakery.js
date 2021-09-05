function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var cake = ["`X                                                   █                                                `\n",
"`X                                               ███████                                              `\n",
"`X                                             ██████                                                 `\n",
"`X                                           █████                                                    `\n",
"`X                                          █████                                                     `\n",
"`X                                          ████                                                      `\n",
"`X                                         ████                                                       `\n",
"`X                                         ████                                                       `\n",
"`X                                         ████                                                       `\n",
"`X                                    ████████████████████                                            `\n",
"`X                          ██████████████      ████████████████                                      `\n",
"`X                    ██████████████████           ████     ██████                                    `\n",
"`X               ██████████        ████            ████        ██████                                 `\n",
"`X            ████████             █████           ████           ██████                              `\n",
"`X         ███████                  ██████       █████              ██████                            `\n",
"`X       ██████                       ███████████████                  ██████                         `\n",
"`X     █████                              ███████                        ███████                      `\n",
"`X   ███████                                                                ██████                    `\n",
"`X   █████████████████████                                                     ██████                 `\n",
"`X   ████       ████████████████████████                                         ███████              `\n",
"`X   ████                    █████████████████████████                              ██████            `\n",
"`X   ████                                  ███████████████████████                     ██████         `\n",
"`X   ███████                                             ███████████████████████         ██████       `\n",
"`X   █████████████████████                                            ████████████████████████████    `\n",
"`X   ████       ████████████████████████                                            ████████████████  `\n",
"`X   ████                    █████████████████████████                                          ████  `\n",
"`X   ████                                   ███████████████████████                             ████  `\n",
"`X   ██████████████████                                   ███████████████████████               ████  `\n",
"`X   ████    ████████████████████████                                   ███████████████████████ ████  `\n",
"`X   ████                 █████████████████████████                                  ███████████████  `\n",
"`X   ████                               █████████████████████████                               ████  `\n",
"`X   ████                                              ███████████████████████                  ████  `\n",
"`X   ████████                                                        ███████████████████████    ████  `\n",
"`X    █████████████████████                                                        █████████████████  `\n",
"`X              ████████████████████████                                                        ████  `\n",
"`X                            ████████████████████████                                          ████  `\n",
"`X                                         ████████████████████████                             ████  `\n",
"`X                                                       ████████████████████████               ████ `\n",
"`X                                                                     ███████████████████████  ████ `\n",
"`X                                                                                  ████████████████ `\n"];

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

	function invite(){
		#fs.chats.send({channel:"0000", msg:"`A Comrades, meet us at ``Dcommunist``A.``Hparty``A!` \n\n`ANot sure you should join us? Learn more at ``Dcommunist``A.``Hmanifesto`"});
		#fs.chats.send({channel:"0000", msg:"`A Comrades, meet us at ``Dcommunist``A.``Hparty``A!` \n\n`ANot sure you should join us? Learn more at ``Dcommunist``A.``Hmanifesto`"});
	}

	var body = "\n\n" + cake.join("") + "\n\n\n`DJust kidding! We have no food around here`\n\n`AWelcome to the``D party!`\n\n";

	//invite();
 	return body + #ls.communist.party();

}
