function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var wid = 109;

	function padNum(n,w=2){
  	return (n+'').padStart(w,0)
	}

	function formatDate(date) {
	  if(typeof date=='number')date=new Date(date);
	  return `${date.getFullYear()}/${padNum(date.getMonth()+1)}/${padNum(date.getDate())} ${padNum(date.getHours())}:${padNum(date.getMinutes())}`

	}

	function drawHeader(){
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

	function drawNav(options){
		let oLen = options.length;
		let cLen = Math.floor(wid/oLen);
		let strNav = "";
		for(let option of options){
			if(option == options[options.length-1]){
				strNav=strNav + option.padStart((cLen+option.length)/2).padEnd(cLen);
			}
			else{
				strNav=strNav + option.padStart((cLen+option.length)/2).padEnd(cLen);
			}
		}
		strNav = strNav.padStart(wid);
		let l = ["`A  ╔"+"═".repeat(wid)+"╗`\n",
		"  `A║``s"+strNav+"``A║`\n ",
		"`A ╚"+"═".repeat(wid)+"╝`\n"];
		return l.join("");
	}

	function drawToolBar(user, req, friends){

		let l=[
				"`A  ╔"+"═".repeat(wid)+"╗`\n",
				"`A  ║  Hello, ``C"+user+("``AYou got ``L"+friends+"``A friends and ``L"+req+"``A requests ").padStart(wid-user.length+6)+"║`\n",
				"`A  ╚"+"═".repeat(wid)+"╝`\n"
		]
		return l.join("");
	}

	function drawPosts(posts){
		let l = ["`A  ╔"+"═".repeat(wid)+"╗`\n"];
		for(let post of posts){
			let author = #fs.socialmud.dbutils({func:"getaccount", u:post.author.split("_")[1]});
			post.author = post.author.split("_")[1];
			post.author = author.verified ? "`R "+ post.author + "``J [⌽]`" : "`R"+post.author+"`";
			let relativeSum =  author.verified ? 2 : - 1
			let loc = post.author == post.location ? "own feed" : post.location;
			let formatedDate = new Date(post.date);
			formatedDate = formatDate(formatedDate);

			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║   `"+post.author+"`H ↔` `Y"+loc+("` `c"+post._id.$oid).padStart(wid-loc.length-post.author.length+relativeSum)+"``A ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║   ``C"+formatedDate+" ".repeat(wid-3-formatedDate.length)+"``A║`\n");
			l.push("`A  ║  "+"━".repeat(wid-4)+"  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			post.content.match(new RegExp(".{1,"+(wid-2)+"}(?: |$)","mg")).map(o=>l.push("`A  ║ "+o.trim().padEnd(wid-2)+" ║`\n"));
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+"━".repeat(wid)+"║`\n");
		}
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");
		return l.join("");
	}

	function drawHello(){
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

	function drawHeaderPage(page){

		let l = [
			"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
			"`A  ║``P"+page.padEnd((wid+page.length-3)/2).padStart(wid)+"``A║`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
			"`A  ╚"+"═".repeat(wid)+"╝`\n"
		]
		return l.join("");
	}

	function drawProfile(account){
		let widProfileLeft = 61;
		let widProfileRight = 46;
		let postCount = #fs.socialmud.dbutils({func:"getuserpostcount", u:account.username});
		let registerDate = #fs.socialmud.dbutils({func:"getregisterdate", u:account.username});
		let friendCount = #fs.socialmud.dbutils({func:"getfriendcount", u:account.username});
		let relativeSum  = account.verified ? -7:-10
		let postsReceived = #fs.socialmud.dbutils({func:"getfeedpostcount", feed:account.username, u:account.username});
		account.username =  account.verified ? "`O" + account.username + "` `H[⌽]`" : "`O" + account.username + "`";
		let formatedDate = formatDate(account.lastactive);
		let formatSince = formatDate(account.registerdate);
		let l = [
			"`A  ╔"+"═".repeat(widProfileLeft)+"╗╔"+"═".repeat(widProfileRight)+"╗`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║`"+"`csocial``Rmud`".padStart(((widProfileRight+9)/2)+6).padEnd(widProfileRight+6)+"`A║`\n",
			"`A  ║   Username: `"+(account.username).padEnd(widProfileLeft+relativeSum)+"`A║╠"+"═".repeat(widProfileRight)+"╣`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ║   Last Active: ``O"+formatedDate.padEnd(widProfileLeft - 16)+"``A║║"+"Member Since:".padEnd((widProfileRight+13)/2).padStart(widProfileRight)+"║`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║``O"+formatSince.padStart((widProfileRight+formatSince.length)/2).padEnd(widProfileRight)+"``A║`\n",
			"`A  ║   Post Made: ``O"+postCount.toString().padEnd(widProfileLeft - 14)+"``A║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ║   Posts Received: ``O"+postsReceived.toString().padEnd(widProfileLeft - 19)+"``A║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ║   "+"Description:".padEnd(widProfileLeft-3)+"║║"+"Friend Count:".padEnd((widProfileRight+13)/2).padStart(widProfileRight)+"``A║`\n",
			"`A  ║ ``O"+ account.description.padEnd(widProfileLeft-1) +"``A║║``O"+friendCount.toString().padStart((widProfileRight+friendCount.toString().length)/2).padEnd(widProfileRight)+"``A║`\n",
			"`A  ║"+" ".repeat(widProfileLeft)+"║║"+" ".repeat(widProfileRight)+"║`\n",
			"`A  ╚"+"═".repeat(widProfileLeft)+"╝╚"+"═".repeat(widProfileRight)+"╝`\n"
		];

		return l.join("");
	}

	function drawFriendList(friends){
		let setupFriends = [];
		while(friends.length) setupFriends.push(friends.splice(0,5));

		let l = [
			"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
		];

		for(let friendset of setupFriends){

			let strFriends = "";
			for (let friend of friendset){
				if(friend == friendset[friendset.length-1]){
					strFriends = strFriends + friend
				}else {
					strFriends = strFriends + friend + " | ";
				}
			}

			l.push("`A  ║"+strFriends.padStart((wid+strFriends.length)/2).padEnd(wid)+"║`\n");
		}
		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");

		return l.join("");

	}

	function drawSentRequests(user){

		let  requestsJS = #fs.socialmud.dbutils({func:"getsentrequests", u:user});
		let requests = [];

		for(let requestOBJ of requestsJS){
			requests.push(requestOBJ.users[1].split("_")[1]);
		}

		let requestSetup = [];
		while(requests.length) requestSetup.push(requests.splice(0,5));

		let l = [
			"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
		];

		for(let requestset of requestSetup){

			let strRequests = "";
			for (let request of requestset){
				if(request == requestset[requestset.length-1]){
					strRequests = strRequests + request
				}else {
					strRequests = strRequests + request + " | ";
				}
			}

			l.push("`A  ║"+strRequests.padStart((wid+strRequests.length)/2).padEnd(wid)+"║`\n");
		}

		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");

		return l.join("");

	}

	function drawReceivedRequests(user){
		let  requestsJS = #fs.socialmud.dbutils({func:"getreceivedrequests", u:user});
		let requests = [];

		for(let requestOBJ of requestsJS){
			requests.push(requestOBJ.users[0].split("_")[1]);
		}

		let requestSetup = [];
		while(requests.length) requestSetup.push(requests.splice(0,5));

		let l = [
			"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
		];

		for(let requestset of requestSetup){

			let strRequests = "";
			for (let request of requestset){
				if(request == requestset[requestset.length-1]){
					strRequests = strRequests + request
				}else {
					strRequests = strRequests + request + " | ";
				}
			}

			l.push("`A  ║"+strRequests.padStart((wid+strRequests.length)/2).padEnd(wid)+"║`\n");
		}

		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");

		return l.join("");

	}

	function drawSearch(results){
		let l = [
			"`A  ╔"+"═".repeat(wid)+"╗`\n",
			"`A  ║"+" ".repeat(wid)+"║`\n",
		];

		for(let result of results){

				l.push("`A  ║ * ``O"+(result[0]+ "` `c("+ formatDate(result[1])+")").padEnd(wid)+"``A║`\n");

		}

		l.push("`A  ║"+" ".repeat(wid)+"║`\n");
		l.push("`A  ╚"+"═".repeat(wid)+"╝`\n");

		return l.join("");
	}

	let res = [];
	for(let request of args.request){
		if(request == "h"){
			res.push(drawHeader());
		}
		if(request == "n"){
			res.push(drawNav(a.nOptions));
		}
		if(request == "t"){
			res.push(drawToolBar(a.tUser,a.tReq, a.tFriends));
		}
		if(request == "p"){
			res.push(drawPosts(a.pPosts));
		}
		if(request == "H"){
			res.push(drawHello());
		}
		if(request == "hp"){
			res.push(drawHeaderPage(a.hpTitle));
		}
		if(request == "pp"){
			res.push(drawProfile(a.ppAcct));
		}
		if(request == "fl"){
			res.push(drawFriendList(a.flFriends));
		}
		if(request == "sr"){
			res.push(drawSentRequests(a.srReq));
		}
		if(request == "rr"){
			res.push(drawReceivedRequests(a.rrReq));
		}
		if(request == "s"){
			res.push(drawSearch(a.sResults));
		}
	}

	return res.join("");
}
