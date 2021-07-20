function(c,a) {
    #db.us({_id:"master_list"},{$push:{words:{$each:a.w.split(',')}}})
    return {ok:true}
}
