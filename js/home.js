window.onload = function() {

}


window.onmousewheel = document.onmousewheel = window.onscroll = function () {

	// var id_upbar = document.getElementById('upbar');
	// var dance =  document.body.scrollTop || document.documentElement.scrollTop;;	//	获取滚动条据顶部位置
	// var heightMax = document.body.scrollHeight;
	// var scHeight = window.screen.availHeight;
	// var id_eye = document.getElementById('eye');
	// id_eye.style.left = (dance / (heightMax)) * 50 - 50 + 'px';
	// console.log(dance / (heightMax));
	// var e = e || window.event; 
	// if (e.wheelDelta) {	//先判断浏览器IE，谷歌滑轮事件       
	// 	if (e.wheelDelta > 0) {
	// 		id_upbar.style.height = "auto";	//	上
	// 		// id_upbar.style.opacity = "1";  //	下
	// 	}
	// 	if (e.wheelDelta < 0) { 
	// 		id_upbar.style.height = "0px";  //	下
	// 		// id_upbar.style.opacity = "0";  //	下
	// 	}
	// } else if (e.detail) { //Firefox滑轮事件
	// 	if (e.detail> 0) { 
	// 		id_upbar.style.height = "auto";	//	上
	// 		// id_upbar.style.opacity = "1";  //	下
	// 	}
	// 	if (e.detail< 0) {
	// 		id_upbar.style.height = "0px";  //	下
	// 		// id_upbar.style.opacity = "0";  //	下
	// 	}
	// }
	// if(dance == 0) {
	// 	id_upbar.style.height = "0px";  //	下
	// 	// id_upbar.style.opacity = "0";  //	下
	// }
}; 

// var id_main = document.getElementById('main');
// function heightToTop(ele){
//     //ele为指定跳转到该位置的DOM节点
//     let root = id_main;
//     let height = 0;
//     do{
//         height += ele.offsetTop;
//         ele = ele.offsetParent;
//     }while( ele !== root )
//     return height;
// }
//某按钮点击时
// someBtn.addEventListener('click',function(e){
//     window.scrollTo({
//         top:heightToTop(id_main),
//         behavior:'smooth'
//     })
// })



function showCont(eve, ele) {

	if(ele.style.height == '0px') {
		eve.style.background = "#333";
		// ele.style.height = 'auto';
		// ele.heightValue = ele.clientHeight;
		ele.style.height = ele.heightValue + 'px';
		setTimeout(function(){ele.style.height = 'auto'}, 1000);
	} else {
		eve.style.background = "#428";
		ele.style.height = 'auto';
		ele.heightValue = ele.clientHeight;
		ele.style.height = ele.clientHeight + 'px';
		setTimeout(function(){ele.style.height = '0px'}, 1);
	}
	console.log(ele.clientHeight);
}