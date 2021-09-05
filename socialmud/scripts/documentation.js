function(context, args)
{
	var caller = context.caller;
	var sys = #fs.socialmud.sysutils();
	var db = #fs.socialmud.dbutils();
	var gui = a => #fs.socialmud.gui(a);
	var header = gui({request:["h","hp"], hpTitle:"! Documentation !"});
	var account;
	var wid = 109;
	var doc;

	a=JSON.parse(JSON.stringify(a||{}));

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

		if(topic.toLowerCase() == ""){
			l.push("`A  ║``M  SELECT A TOPIC WITH topic:\"topic\" ` `A                                                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Topic List:                                                                                                ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║ * ``VaboutGUI``A                                                                                                  ║`\n");
			l.push("`A  ║ * ``Vregister``A                                                                                                  ║`\n");
			l.push("`A  ║ * ``Vlogin``A                                                                                                     ║`\n");
			l.push("`A  ║ * ``Vprofile``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vfriends``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vfeed``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vglobal``A                                                                                                    ║`\n");
			l.push("`A  ║ * ``Vdetails``A                                                                                                   ║`\n");
			l.push("`A  ║ * ``Vsearch``A                                                                                                    ║`\n");
			l.push("`A  ║ * ``Vpost``A                                                                                                      ║`\n");
			l.push("`A  ║ * ``Vsocialmud.com``A                                                                                             ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  ``LWant to know who has a hand into` `csocial``Rmud``L? Check socialmud.credits``A                                        ║`\n");
		}else if(topic.toLowerCase()=="register"){
			l.push("`A  ║``H REGISTER ` `A                                                                                                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can register at socialmud.register by providing an ``Nusername``A and``N password``A that doesn't exist yet.       ║`\n");
			l.push("`A  ║  Choose your username and password wisely, they are unchangeable and will stay this way for a while.        ║`\n");
		}else if(topic.toLowerCase()=="aboutgui"){
			l.push("`A  ║``H ABOUT GUI ` `A                                                                                                 ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  ``csocial``Rmud``A GUI is made of 113 chars, so there's a minimum col's you need in order to get it to work         ║`\n");
		}else if(topic.toLowerCase() =="login"){
			l.push("`A  ║``H LOGIN ` `A                                                                                                     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can login at socialmud.login by providing an valid ``Nusername``A and``N password``A combination.                  ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Once you have logged in, the script sets your hackmud username as auth for that profile so you are able    ║`\n");
			l.push("`A  ║  to navigate to other pages without providing ``Nusername``A and``N password``A again. This will stay this way until    ║`\n");
			l.push("`A  ║  you logout at socialmud.logout                                                                             ║`\n");
		}else if(topic.toLowerCase() == "profile"){
			l.push("`A  ║``H PROFILE ` `A                                                                                                   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can access your profile at socialmud.profile. You can also access other's profile using the argument   ║`\n");
			l.push("`A  ║  profile:\"username\".                                                                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can also add friends from this page by using addFriend:\"username\" to send a request                    ║`\n");
		}else if(topic.toLowerCase() == "feed"){
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
			l.push("`A  ║  *To filter posts by date, you can use startDate:\"mm/dd/yyyy\" and endDate:\"mm/dd/yyyy\".                     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can also use removePost:\"postId\" to remove a post you created.                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can show that you agree or disagree with posts using postAgree:\"postId\" or postDisagree:\"postId\"``A.     ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *You can see datails of any post on socialmud.details with postID:\"postID\".                                ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *The global feed shows everyone's post and is accessible from socialmud.global                             ║`\n");
		}else if(topic.toLowerCase() == "post"){
			l.push("`A  ║``H POSTING ` `A                                                                                                   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can post from socialmud.post by using postContent:\"text\" argument. If you don't want to post into your ║`\n");
			l.push("`A  ║  own feed, you can specify a friend's feed with postLocation:\"username\". Posts have a cap of 400 chars. Pay ║`\n");
			l.push("`A  ║  attention to the fact that coloring ``Lis supported` `Abut is considered in character cap.                       ║`\n");
		}else if(topic.toLowerCase() == "friends"){
			l.push("`A  ║``H FRIENDS ` `A                                                                                                   ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can manage your friends from socialmud.friends.                                                        ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  *To add a friend: addFriend:\"username\"                                                                     ║`\n");
			l.push("`A  ║  *To accept a request you received: acceptRequest:\"username\"                                                ║`\n");
			l.push("`A  ║  *To reject a request you received: rejectRequest:\"username\"                                                ║`\n");
			l.push("`A  ║  *To remove a request you sent: removeRequest:\"username\"                                                    ║`\n");
			l.push("`A  ║  *To remove a friend: removeFriend:\"username\"                                                               ║`\n");
		}else if(topic.toLowerCase() == "details"){
			l.push("`A  ║``H POST DETAILS ` `A                                                                                              ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  Run socialmud.details with post:\"postID\" to see post details                                               ║`\n");
		}else if(topic.toLowerCase() == "socialmud.com"){
			l.push("`A  ║``H  socialmud.com ` `A                                                                                            ║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║"+" ".repeat(wid)+"║`\n");
			l.push("`A  ║  You can easily navigate through ``Rsocial``Cmud``A using socialmud.com. For navigation, first provide page:\"page\"   ║`\n");
			l.push("`A  ║  to navigate to that page, then providing all arguments to be passed to that page. You can also navigate    ║`\n");
			l.push("`A  ║  each page individually by providing the page name as script socialmud.[page].                              ║`\n");
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
