function(c, a)
{
	var caller = c.caller;
	var l = #fs.scripts.lib();
	let marketObj = {}
	let internalObj = {}
	let logVar = [];
	let retObj = {};
	let T1Locks = ["CON_TELL","w4rn","w4rn_er","ez_21","ez_34","ez_40","c001","c002","c003","l0cket","DATA_CHECK_V1"];
	let T2Locks = ["magnara", "l0ckbox","acct_nt","CON_SPEC","sn_w_glock","DATA_CHECK_v2"];
	let T3Locks = ["shfflr","l0ckjaw","l0g_wr1t3r","sn_w_usac","DATA_CHECK_V3"];
	let T4Locks = ["CON_A5V4H","DATA_CHECK_V4"]
	let DATACHECKS = ["DATA_CHECK_V1", "DATA_CHECK_V2", "DATA_CHECK_V3", "DATA_CHECK_V4"];

	function toGCNum(str) {
		var parts=str.match(/^(-?)(?:([0-9]{1,5})Q)?(?:([0-9]{1,3})T)?(?:([0-9]{1,3})B)?(?:([0-9]{1,3})M)?(?:([0-9]{1,3})K)?([0-9]{1,3})?GC$/)
		if(!parts)return {ok:false}
	
		var r=0;
		for(var i=2;i<parts.length;++i) {
			if(parts[i])
				r+=parts[i]/1*Math.pow(10,21-3*i)
		}
		if(parts[1]=='-')r*=-1;
		return r;
	}

	function toGCStr(num){
		var parts=[];
	  var sign=Math.sign(num);
	  num=Math.abs(num);
	  while(parts.length<5) {
		parts.unshift(num%1000);
		num=Math.floor(num/1000);
	  }
	  parts.unshift(num);
	  var k = ['Q', 'T', 'B', 'M', 'K', ''];
	  var ret='';
	  for(var i = 0; i < parts.length; ++i)
		  if(parts[i]) ret += parts[i] + k[i];
	  return (sign==-1?'-':'')+(ret||0)+'GC'
	}

	try{
		if(a && !Object.keys(a).length == 0){
			if(a.lockset){
				retObj.lockset = true;
				let totalPrice = 0;
				let unavailable = [];
				let available = [];
				let orderLocks = [];
				let bought = [];
				let notBought = [];
				let locks = [["l0g_wr1t3r",3,2],["l0ckjaw",3,2],["acct_nt",2,3],["sn_w_glock",2,3],["l0ckbox",2,3],["CON_A5V4H",4,3]]; /*["lockName",Tier, preferredRarity] */
				for(let lock of locks){
					marketObj.name = lock[0];
					marketObj.tier = lock[1];
					marketObj.rarity = lock[2];
					while(marketObj.rarity){
						let market = #fs.market.browse(marketObj);
						if(market.length>0){
							logVar.push("Found lock "+marketObj.name+", rarity:"+marketObj.rarity)
							totalPrice += market[0].cost;
							available.push([marketObj.name, marketObj.tier, marketObj.rarity]);
							orderLocks.push([marketObj.name, market[0].i]);
							break
						}else{
							marketObj.rarity -= 1;
							if(!marketObj.rarity){
								unavailable.push(marketObj.name);
							}
						}
					}
				}

				if(a.confirm){
					for(let entry of orderLocks){
						if(#ms.market.buy({i:entry[1], count:1, confirm:true})){
							bought.push(entry[0]);
						}else{
							notBought.push(entry[0]);
						}
					}
					retObj.ok = true;
					retObj.available = available;
					retObj.unavailable = unavailable;
					retObj.totalPrice = totalPrice;
					retObj.bought = bought;
					retObj.notBought = notBought;
				}else{
					retObj.ok = false;
					retObj.msg = "Total cost is "+ toGCStr(totalPrice) +". Please send confirm:true to confirm!";
					retObj.totalPrice = totalPrice;
					retObj.available = available;
					retObj.unavailable = unavailable;
				}


			}else{
				marketObj=Object.assign({},a||{})
				if(marketObj.cost){
					if(typeof(marketObj.cost) == "string"){
						marketObj.cost = toGCNum(marketObj.cost)
					}
					marketObj.cost = {"$lte":marketObj.cost}
				}



				if(a.maxCount){
					delete marketObj.maxCount;
					internalObj.maxCount = a.maxCount;
				}
		
				let market = #fs.market.browse(marketObj);

				if(market.length > 0){
					let resultTokens = [];
				

					for(let item of market){
						resultTokens.push(item.i);
					}
					
					marketObj = {};
					marketObj.i = resultTokens;
					
					market = #fs.market.browse(marketObj);
	
					let preorder = [];
					
					if(internalObj.maxCount){
						let counter = 0;
						
						for(let item of market){
							preorder.push([item.i, item.count]);
							counter += item.count;
							if(counter >= internalObj.maxCount)break;
						}
	
						let needed = internalObj.maxCount;
						let order = [];
						let TotalToBuy = 0;
	
						for(let item of preorder){
							let qtyToBuy = 0;
	
	
							
							if(item[1] > needed){
								qtyToBuy += needed;
								needed -=qtyToBuy;
								order.push([item[0],qtyToBuy])
							}else{
								qtyToBuy += item[1];
								needed -= item[1];
								order.push([item[0],qtyToBuy]);
							}
							TotalToBuy += qtyToBuy;
		
							if(needed == 0) break;	
						}
	
						if(needed>0){
							logVar.push("Market suppyl couldn't fulfill the full order - " +"[ASKED]: "+internalObj.maxCount+" [PROVIDED]: "+TotalToBuy)
							retObj.completed=true;
							retObj.partial = true;
						}else if(needed<0){
							logVar.push("Something went wrong! - Needed Value Became Negative!")
							retObj.completed=false;
						}else{
							logVar.push("Order Fulfiled!");
							retObj.completed=true;
						}
	
						for(let task of order){
							logVar.push([task[0],task[1],#ms.market.buy({i:task[0], count:task[1], confirm:true})])
						}
	
						retObj.logVar = logVar;
					}else{
						for(let item of market){
							logVar.push([item.i,item.count,#ms.market.buy({i:item.i, count:item.count, confirm:true})])
						}

						retObj.logVar = logVar;
						retObj.ok = true;
						retObj.completed = true;
					}	
				}else{
					logVar.push("Item not found under these arguments")
					retObj.ok = true;
					retObj.completed=false;
					retObj.logVar =logVar;
				}	
			}
		}else{
			retObj.ok = false;
			retObj.msg = "No args found. Use market valid args."
		}
		return retObj;
	}catch(e){
		return #D(e.stack)
	}
}
