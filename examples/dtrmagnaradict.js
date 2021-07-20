function() {
    var did=0;
    while(Date.now() - _START < 4000) { // While it's not "near to timeout"
        var dat=#db.f({_id:"master_list"},{words:{$slice:25}}).first();  // Finds the first 25 elements of the "big-wordlist"
        if(dat.words.length==0){//If there's nothing else in big-wordlist
            #db.r({_id:"master_list"}) // removes the big list
            return {ok:true,msg:"DONE!"}
        }
        did+=dat.words.length // if there's still stuff in big-wordlist sets did to did + length of 
        var to_remove=dat.words.slice(); // Believe it's mean to hold words to remove from master_list
        while(dat.words.length) {
            var word=dat.words.shift(); // keeps the first element from dat.words in word var and removes it from dat.words
            var letters=word.split('').sort().join(''); // split every letter into an array, then sorts alphabetically, then join them together again
            #db.us({_id:"mag_"+letters},{$setOnInsert:{type:"magnara"},$addToSet:{words:word}}); //#db.us checks if exists. If true, update. If not, inserts a new document. $setOnInsert only runs if inserting.
        }
        #db.u1({_id:"master_list"},{$pullAll:{words:to_remove}})
    }
    return {ok:false,msg:did}
    /*
      This wasn't made by me, actually. It was made by DTR then sent in helpdesk channel
    */
}
