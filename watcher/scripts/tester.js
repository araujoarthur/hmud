function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	for(let i = 0; i<10; i++){
		#D(#fs.chats.send({channel:"randomdata", msg:"well hello there"}))
	}
}
