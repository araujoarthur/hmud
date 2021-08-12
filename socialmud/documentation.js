function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var gui = a => #fs.socialmud.gui(a);
	var header = gui({request:["h","hp"], hpTitle:"! Documentation !"});
	var account;
	var wid = 109;
	var doc;

	if(sys.isLoggedIn(caller)){
		account = db.getAccount(db.getCallerAuthUser(caller));
		db.setLastActive(account._id, Date.now());
		db.setLastPage(account._id, "documentation");
	}

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
			l.push("`A  ║ * ``VaboutGUI``A                                                                                                  ║`\n");
			l.push("`A  ║ * ``Vregister``A                                                                                                  ║`\n");
			l.push("`A  ║ * ``Vlogin``A                                                                                                     ║`\n");
			l.push("`A  ║ * ``Vprofile``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vfeed``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vdetails``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vsearch``A                                                                                                    ║`\n");
			l.push("`A  ║ * ``Vpost``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vsocialmud.com``A                                                                                             ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  ``LWant to know who has a hand into` `csocial``Rmud``L? Check socialmud.credits``A                                        ║`\n");
		}else if(topic=="register"){
			l.push("`A  ║``H REGISTER ` `A                                                                                                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can register at socialmud.register by providing an ``Nusername``A and``N password``A that doesn't exist yet.       ║`\n");
			l.push("`A  ║  Choose your username and password wisely, they are unchangeable and will stay this way for a while.        ║`\n");
		}else if(topic=="aboutgui"){
			l.push("`A  ║``H ABOUT GUI ` `A                                                                                                 ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  ``csocial``Rmud``A GUI is made of 113 chars, so there's a minimum col's you need in order to get it to work         ║`\n");
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
			l.push("`A  ║``H PROFILE ` `A                                                                                                   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can access your profile at socialmud.profile. You can also access other's profile using the argument   ║`\n");
			l.push("`A  ║  profile:\"username\".                                                                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can also add friends from this page by using addFriend:\"username\" to send a request                    ║`\n");
		}else if(topic == "feed"){
			l.push("`A  ║``H FEED ` `A                                                                                                      ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  On socialmud's feed page you can see your main feed (your own posts and your friends') and other's feeds   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *To select a feed, provide feed:\"choice\" as argument. The ``Vvalue` `Aaccepts \"``Vmain``A\" or any username registered. ║`\n");
			l.push("`A  ║ The default feed (the one that will appear if you give no arguments) is main and is currently fixed. The de ║`\n");
			l.push("`A  ║ fault post count on feed is 10, but you are able to change it by using n:number. Number must not be higher  ║`\n");
			l.push("`A  ║ than 20.                                                                                                    ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can also use removePost:\"postId\" to remove a post you created.                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can show that you agree or disagree with posts using postAgree:\"postId\" or postDisagree:\"postId\"``A.     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can see datails of any post on socialmud.details with postID:\"postID\".                                ║`\n");
		}else if(topic == "post"){
			l.push("`A  ║``H POSTING ` `A                                                                                                   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can post from socialmud.post by using postContent:\"text\" argument. If you don't want to post into your ║`\n");
			l.push("`A  ║  own feed, you can specify a friend's feed with postLocation:\"username\". Posts have a cap of 400 chars. Pay ║`\n");
			l.push("`A  ║  attention to the fact that coloring ``Lis supported` `Abut is considered in character cap.                       ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
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
