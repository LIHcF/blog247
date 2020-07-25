var toDance;

function moveToElement(ele) {
	var dance =  document.body.scrollTop || document.documentElement.scrollTop;;	//	获取滚动条据顶部位置
	var eleDance = ele.scrollTop ;
	var dDance = eleDance - dance;
	if(Math.abs(dDance) <= 1)
		return;
	dDance =  dDance / 20;
	dDance = Math.abs(dDance) < 1 ? dDance / Math.abs(dDance) : dDance;
	window.scrollTo(0, dance + dDance);
	console.log(eleDance +'\t'+ dance + '\t' + dDance);
	setTimeout(function(){moveToElement(ele)}, 10);
}

function moveToDance(dan) {
	toDance = dan;
	var dance =  document.body.scrollTop || document.documentElement.scrollTop;;	//	获取滚动条据顶部位置
	var dDance = toDance - dance;
	if(Math.abs(dDance) <= 1) {
		isMoving = false;
		return;
	}
	dDance = dDance / 20;
	dDance = Math.abs(dDance) < 1 ? dDance / Math.abs(dDance) : dDance;
	window.scrollTo(0, dance + dDance);
	console.log(Math.abs(dDance));
	setTimeout(function(){moveToDance(toDance)}, 10);
}