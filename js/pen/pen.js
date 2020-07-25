// window.onmousewheel = document.onmousewheel = window.onscroll = function () {

// 	var dance =  document.body.scrollTop || document.documentElement.scrollTop;;	//	获取滚动条据顶部位置

// 	var e = e || window.event; 
// 	if (e.wheelDelta) {	//先判断浏览器IE，谷歌滑轮事件       
// 		if (e.wheelDelta > 0) { 
// 			document.getElementById('upbar').style.height = "50px";	//	上
// 			document.getElementById('upbar').style.opacity = "1";  //	下
// 		}
// 		if (e.wheelDelta < 0) { 
// 			document.getElementById('upbar').style.height = "0px";  //	下
// 			document.getElementById('upbar').style.opacity = "0";  //	下
// 		}
// 	} else if (e.detail) { //Firefox滑轮事件
// 		if (e.detail> 0) { 
// 			document.getElementById('upbar').style.position = "fixed";	//	上
// 		}
// 		if (e.detail< 0) { 
// 			document.getElementById('upbar').style.position = "absolute";  //	下
// 		}
// 	}
// 	if(dance == 0) {
// 			document.getElementById('upbar').style.height = "50px";  //	下
// 			document.getElementById('upbar').style.opacity = "1";  //	下
// 	}
// };

/*
*	lastSelect	: 上一次选择的分类,默认为第一个 未分类
*	ele 		: 点击的分类 li
*
*/// 选择一个分类并改变分类样式
var lastSelect = document.getElementById('uncategorized');
function selecteCate(ele) {
	if(lastSelect == ele)
		return;
	lastSelect.style.background = 'none';
	ele.style.background = '#132';
	lastSelect = ele;
}

/*
*	lastSelect	: 上一次选择的分类,默认为第一个 未分类
*	ele 		: 点击的分类 li
*
*/// 选择一个分类并改变分类样式
function addLable() {

}