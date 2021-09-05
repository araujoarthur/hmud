function(context, args)
{
	var caller = context.caller;

	function parseDate(str) {
        var res=str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if(!res)return {ok:false};
        return +new Date(+res[3],res[1]-1,+res[2]);
    }


	return {
		parseDate
	}
	return { ok:false };
}
