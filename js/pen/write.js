var Write = function(node) {

	var obj = {

		'authorName' : 'L!HcF',
		'node' : node,	//	在此标签下创建模块
		'collection' : null, // 在此ul下创建模块li
		'writingElement' : null,	//	最近一次聚焦的模块 li
		'contVector' : [],	// 保存内容类型和内容标签，方便提取内容，顺序和模块顺序一致	如 {'text', 内容标签}
		'data_index' : 0,	//	作为模块编号，模块li编号和内容编号一一对应，方便对应li模块找到对应的内容

		'none' : null,	//	作为第一个模块，不显示出来，方便open时从头添加模块

		'title' : document.getElementById('title'),
		'author' : document.getElementById('author'),
		'time' : document.getElementById('time'),
		'present' : document.getElementById('present'),

		'forAddSubtitle' : document.getElementById('addSubtitle'),
		'forAddText' : document.getElementById('addText'),
		'forAddImg' : document.getElementById('addImg'),
		'forAddCode' : document.getElementById('addCode'),
		'forAddLink' : document.getElementById('addLink'),
		'forSave' : document.getElementById('save'),
		'forOpen' : document.getElementById('open'),
		'forDelete' : document.getElementById('delete'),

		/*
		*/// 初始化write模块,初始化一个text模块
		'initWrite' : function() {

			var ul = document.createElement('ul');
			ul.className = 'write';
			node.appendChild(ul);
			this.collection = ul;

			this.none = document.createElement('li');
			this.none.style.display = 'none';
			ul.appendChild(this.none);
			this.setWritingElement(this.none);

			this.addModel('text', 'Write something!')

			this.forAddSubtitle.onclick = function(){ obj.addModel('subtitle', '') };
			this.forAddText.onclick = function(){ obj.addModel('text', '') };
			this.forAddImg.onclick = function(){ obj.addModel('img', '') };
			this.forAddCode.onclick = function(){ obj.addModel('code', '') };
			this.forAddLink.onclick = function(){ obj.addModel('link', '', '') };
			this.forSave.onclick = function(){ obj.save() };
			this.title.onkeydown = function(e) {
				if (e.keyCode == 13) {
					this.blur();
				}
			}
			// <input style="display: none" id='file' type='file' onchange='open(this.files)' accept=".txt" multiple/>
			var file = document.createElement('input');
			file.style.display = 'none';
			file.setAttribute('type', 'file');
			file.setAttribute('accept', '.txt');
			file.onchange = function(){ obj.open(this.files) };
			this.forOpen.onclick = function(){ file.click() };
			this.forDelete.onclick = function(){ obj.delete() };
1
			// 设置作者
			this.setCont(this.author, this.authorName);

			// 设置write时间
			var today = new Date();
			var dayStr = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " / 星期" + (today.getDay() + 1);
			this.setCont(this.time, dayStr);
			// myDate.getYear();        //获取当前年份(2位)
			// myDate.getFullYear();    //获取完整的年份(4位,1970-????)
			// myDate.getMonth();       //获取当前月份(0-11,0代表1月)
			// myDate.getDate();        //获取当前日(1-31)
			// myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
			// myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
			// myDate.getHours();       //获取当前小时数(0-23)
			// myDate.getMinutes();     //获取当前分钟数(0-59)
			// myDate.getSeconds();     //获取当前秒数(0-59)
			// myDate.getMilliseconds();    //获取当前毫秒数(0-999)
			// myDate.toLocaleDateString();     //获取当前日期
			// var mytime=myDate.toLocaleTimeString();     //获取当前时间
			// myDate.toLocaleString( );        //获取日期与时间
		},

		/*
		*/// 在writingElement后添加Text模块
		'addModel' : function(type, cont, href) {

			var model;
			switch(type) {
				case 'subtitle':
					model = this.createSubtitle(cont);
					break;
				case 'text':
					model = this.createText(cont);
					break;
				case 'img':
					model = this.createImg(cont);
					break;
				case 'code':
					model = this.createCode(cont);
					break;
				case 'link':
					model = this.createLink(cont, href);
					model.href.onfocus = function(){ obj.setWritingElement(model.node)};
					break;
				case 'subtitle':
					model = this.createSubtitle(cont);
					break;
			}
			model.node.data_index = model.contNode.data_index = this.data_index++;
			model.contNode.onfocus = function(){ obj.setWritingElement(model.node)};
			this.insertAfter(model.node);
			if(type == 'link') {
				this.addVector(model.type, model.contNode, model.href);
			} else {
				this.addVector(model.type, model.contNode);
			}
			model.contNode.focus();
		},

		/*
		*	tCont : 内容标签起始内容
		*
		*	return {
		*		'type' : 'text',	创建的模块类型
		*		'node' : li,		模块标签li
		*		'cont' : p,			内容标签p
		*	};
		*
		*/// 创建一个Text模块
		'createSubtitle' : function(tCont) {

			var li = document.createElement('li');
			var input = document.createElement('input');
			// var span = document.createElement('span');
			// input.setAttribute('contenteditable','plaintext-only');
			input.setAttribute('class','write_subtitle');
			// span.innerHTML = subtitleSum
			if(tCont != undefined) {
				this.setCont(input, tCont);
			} else {
				this.setCont(input, 'subtitle');
			}

			li.appendChild(input);

			return {
				'type' : 'subtitle',
				'node' : li,
				'contNode' : input,
			};
		},

		/*
		*	tCont : 内容标签起始内容
		*
		*	return {
		*		'type' : 'text',	创建的模块类型
		*		'node' : li,		模块标签li
		*		'cont' : p,			内容标签p
		*	};
		*
		*/// 创建一个Text模块
		'createText' : function(tCont) {

			var li = document.createElement('li');
			var p = document.createElement('p');
			p.setAttribute('contenteditable','plaintext-only');
			p.setAttribute('class','write_text');
			if(tCont != undefined) {
				p.innerHTML = tCont;
			}

			li.appendChild(p);

			return {
				'type' : 'text',
				'node' : li,
				'contNode' : p,
			};
		},

		/*
		*	tCont : 内容标签起始内容
		*
		*	return {
		*		'type' : 'text',	创建的模块类型
		*		'node' : li,		模块标签li
		*		'cont' : p,			内容标签p
		*	};
		*
		*/// 创建一个Img模块
		'createImg' : function(tCont) {

			var li = document.createElement('li');
			var img = document.createElement('img');
			var input = document.createElement('input');
			img.src = "img/10.jpg";
			img.setAttribute('class', 'write_img');
			input.setAttribute('placeholder', 'Input img src!');
			input.setAttribute('class', 'write_img_src');
			if(tCont != undefined) {
				input.value = tCont;
				img.src = tCont;
			}
			input.onblur = function(){
				if(input.value == '') {
					img.src = "img/10.jpg";
				} else {
					img.src = input.value;
				}
			};

			li.appendChild(img);
			li.appendChild(input);

			return {
				'type' : 'img',
				'node' : li,
				'contNode' : input,
			};
		},

		/*
		*	tCont : 内容标签起始内容
		*
		*	return {
		*		'type' : 'text',	创建的模块类型
		*		'node' : li,		模块标签li
		*		'cont' : pre,			内容标签p
		*	};
		*
		*/// 创建一个code模块
		'createCode' : function(tCont) {

			var li = document.createElement('li');
			var div = document.createElement('div');
			var num = document.createElement('ul');
			var cont = document.createElement('pre');
			div.setAttribute('class', 'w_code');
			num.setAttribute('class', 'code_num');
			num.innerHTML = "<li>1";
			cont.setAttribute('class', 'code_cont');
			if(tCont != undefined) {
				cont.innerHTML = tCont;
			}
			cont.setAttribute('contenteditable', 'plaintext-only');
			cont.onkeydown = function(){
				obj.setCodeHeight(num, cont);
				// obj.setTab(cont);
			};

			li.appendChild(cont);
			li.appendChild(div);
			div.appendChild(num);
			div.appendChild(cont);

			this.setCodeHeight(num, cont);

			return {
				'type' : 'code',
				'node' : li,
				'contNode' : cont,
			};
		},


		/*
		*	tCont 	: 内容标签起始内容
		*	url 	: a标签的连接目标
		*
		*	return {
		*		'type' : 'link',	创建的模块类型
		*		'node' : li,		模块标签li
		*		'cont' : p,			内容标签p
		*		'href' : input,		href值
		*	};
		*
		*/// 创建一个连接模块
		'createLink' : function(tCont, href) {

			var li = document.createElement('li');
			var link = document.createElement('p');
			var linkHref = document.createElement('input');
			link.href = '';
			link.setAttribute('contenteditable', 'plaintext-only');
			link.setAttribute('class', 'write_link');
			linkHref.setAttribute('placeholder', 'linkHref link href!');
			linkHref.setAttribute('class', 'write_link_href');
			link.onkeydown = function(e) {
				if(e.keyCode == 13)
					this.blur();
			}
			link.onblur = function() {
				if(this.innerHTML == '') {
					link.innerHTML = 'link';
				}
			}
			if(tCont != undefined) {
				this.setCont(link, tCont);
			} else {
				this.setCont(link, 'link');
			}
			if(href != undefined) {
				this.setCont(linkHref, href);
			}
			linkHref.onblur = function(){
				link.href = linkHref.value;
			};

			li.appendChild(link);
			li.appendChild(linkHref);

			return {
				'type' : 'link',
				'node' : li,
				'contNode' : link,
				'href' : linkHref,
			}
		},

		/*
		*	element : 	赋值元素
		*
		*/// 更新code行号
		'setCodeHeight' : function(ul ,cont) {
			setTimeout(function(){
				var lineSum = parseInt(cont.clientHeight / 25 + 0.5);
				var liSum = parseInt(ul.lastElementChild.innerHTML);
				if(liSum <= lineSum) {
					for (liSum++; liSum <= lineSum; liSum++) {
						var li = document.createElement('li');
						li.innerHTML = liSum;
						ul.appendChild(li);
					}
				} else {
					for ( ; liSum > lineSum; liSum--) {
						ul.removeChild(ul.lastElementChild);
					}
				}

			}, 1);
		},


		/*
		*	ev : 系统参数，按键类
		*
		*/// 在code中tab变为输入4个空格
		// 'setTab' : function(codeE, ev) {
		// 	var oEvent = ev || event;
		// 	if (oEvent.keyCode == 9) {
		// 	/*关键部分bai 开始(重要! 去掉浏览器的默认事件du 不然会按tab之后光zhi标会跳去其他的地方,用户优dao化不好)*/
		// 		if (oEvent.preventDefault) {
		// 			oEvent.preventDefault();
		// 		}
		// 		else {
		// 			window.event.returnValue = false;
		// 		}
		// 	/*关键部分 结束*/
		// 		codeE.value += "    "; //这里放入了4个空格
		// 	}
		// },

		/*
		*	type : 添加的模块类型
		*	contNode ： 模块的内容标签
		*
		*/// 在writingElement后添加Text模块
		'addVector' : function(type, contNode, href) {

			var index;
			for(index = 1;  index < this.contVector.length && this.contVector[index].contNode.data_index != this.writingElement.data_index; index++ );
			this.contVector.splice(index + 1, 0, {
				'type' : type,
				'contNode' : contNode,
				'href' : href,
			});
		},

		/*
		*/// 删除 data_index 对应的Vector记录
		'deleteVector' : function(data_index) {

			console.log(data_index);
			var index;
			for(index = 0;  index < this.contVector.length && this.contVector[index].contNode.data_index != data_index; index++ ){
				console.log(this.contVector[index].contNode.data_index);
			}
			// console.log(this.contVector[1]);
			this.contVector.splice(index, 1);
		},

		/*
		*///把内容保存到本地文件
		'save' : function() {

			var cont = this.getCont(this.title) + '\n';
					 + this.getCont(this.author) + '\n'
					 + this.getCont(this.time) + '\n';	//	保存内容前排固定,保证前三排类容都只有一排

					 console.log(this.getCont(this.present));

			var arr = this.getCont(this.present).split('\n');
			for(var i = 0; i < arr.length - 1; i++) {
				cont += 'cont_' + arr[i] + '\n';
			}
			if(arr[arr.length - 1] != '') {	//	判断对后一个是不是因为\n分出的空
				cont += 'cont_' + arr[arr.length - 1] + '\n';
			}
			cont += 'present_0' + '\n';

			for (var i = 0; i < this.contVector.length; i++) {
				var arr = this.getCont(this.contVector[i].contNode).split('\n');	//	如果最后一个字符时\n那么最后会多分出一个空
				console.log(arr);
				for (var j = 0; j < arr.length - 1; j++) {	//	加上前面的n-1个
					cont += 'cont_' + arr[j] + '\n';
				}
				if(arr[arr.length - 1] != '') {	//	判断对后一个是不是因为\n分出的空
					cont += 'cont_' + arr[arr.length - 1] + '\n';
				}
				if(this.contVector[i].type == "link") {
					cont += 'cont_' + this.getCont(this.contVector[i].href) + '\n';
				}
				cont += this.contVector[i].type + '_0\n';
			}

		    let downLink = document.createElement('a');
		    downLink.download = this.getCont(this.title) + '.txt';
		    //字符内容转换为blod地址
		    // let blob = new Blob([editor_text.value]);
		    let blob = new Blob([cont]);
		    downLink.href = URL.createObjectURL(blob);
		    // 链接插入到页面
		    document.body.appendChild(downLink);
		    downLink.click();
		    // 移除下载链接
		    document.body.removeChild(downLink);
		    
		    console.log('save:\n' + cont);
		},

		/*
		*///读本地文件并显示
		'open' : function(files) {

			var reader = new FileReader();	
			reader.readAsText(files[0]);

			reader.onload = function() {

				console.log('open:\n' + this.result);

				var arr = this.result.split('\n');
				var cont = "";

				obj.setCont(obj.title, arr[0]);
				obj.setCont(obj.author, arr[1]);
				obj.setCont(obj.time, arr[2]);	//	设置 题目 作者 时间	共三行

				var list = obj.collection.getElementsByTagName('li');
				for (var i = list.length - 1; i > 0; i--) {
					list[i].style.display = 'none';
				}	//	隐藏原有模块

				obj.setWritingElement(obj.none);
				obj.contVector = [];
				obj.data_index = 0;	//	数据初始化

				for(var i = 1; i < arr.length; i++) {	//	从第4行开始添加模块
					switch(arr[i].substring(0, arr[i].indexOf('_'))) {
						case 'cont':
							cont += arr[i].substring(arr[i].indexOf('_') + 1) + '\n';
							break;
						case 'present':
							cont.substring(0, cont.length - 1);
							obj.setCont(obj.present, cont);
							console.log(cont);
							cont = "";
							break;
						case 'text':
							cont.substring(0, cont.length - 1);
							obj.addModel('text', cont);
							cont = "";
							break;
						case 'img':
							cont.substring(0, cont.length - 1);
							obj.addModel('img', cont);
							cont = "";
							break;
						case 'code':
							cont.substring(0, cont.length - 1);
							obj.addModel('code', cont);
							cont = "";
							break;
						case 'link':
							cont.substring(0, cont.length - 1);
							var arr0 = cont.split('\n');
							obj.addModel('link', arr0[0], arr0[1]);
							cont = "";
							break;
						case 'subtitle':
							cont.substring(0, cont.length - 1);
							obj.addModel('subtitle', cont);
							cont = "";
							break;
					}
				}
			}
		},

		/*
		*	e 	: 待删除的控件
		*
		*/// 删除当前模块(display = none)
		'delete' : function() {

			var liArr = this.collection.getElementsByTagName('li');
			for (var i = 1; i < liArr.length && liArr[i].data_index != this.writingElement.data_index; i++);
			liArr[i].style.display = 'none';

			this.deleteVector(this.writingElement.data_index);
		},

		/*
		*	e 	: 待获取内容的孔健
		*
		*/// 获得控件的innerHTNL或者value
		'getCont' : function(e) {

			if(e.tagName == "INPUT") {		// input 标签获得value
				return e.value;
			} else {
				return e.innerHTML;	//	其他获取innerHTML
			}
		},

		/*
		*	e 	: 待设置内容的孔健
		*	tCont : 待设置的内容	//	link将设置innerHTML和href
		*	
		*/// 设置控件的innerHTNL或者value
		'setCont' : function(e, tCont) {

			if(e.tagName === "INPUT") {
				e.value = tCont;
			} else if(e.tagName === "A"){
				e.innerHTML = tCont;
				e.href = href;
			} else {
				e.innerHTML = tCont;
			}
		},

		/*
		*	newElement		需要插入的元素
		*	targetElement	在此元素后插入
		*
		*/// 在writingElement后插入模块
		'insertAfter' : function(newElement){

		    if(this.collection.lastChild == this.writingElement){
		        this.collection.appendChild(newElement);
		    }else{
		        this.collection.insertBefore(newElement, this.writingElement.nextSibling);
		    }
		},

		/*
		*/// 改变writingElement
		'setWritingElement' : function(element) {
			this.writingElement = element;
		},
	}

	return obj;
}


var Message = function() {

	var obj = {

		'delimiter' : '_',	// 分隔符

		/*
		*	message : 需要获取头部的string
		*	return string ： message第一个分割符之前的内容
		*
		*/// 获得Message的头部
		'getMessageHead' : function(message) {
			return message.substring(0, message.indexOf('_'));
		},
		
		/*
		*	message : 需要获取信息的string
		*	return string ： message第一个分割符之后的内容，如果第一个分隔符之后没有信息将返回空的字符串
		*
		*/// 获得Message的信息
		'getMessageBody' : function(message) {
			return message.substring(message.indexOf('_') + 1);
		},

		/*
		*	return string ： 创建的含分割符的Message
		*
		*/// 创建一个Message
		'createMessage' : function(head, body) {
			if(body == undefined || body == '') {
				body = this.delimiter;
			}
			return head + this.delimiter + body;
		},
	}

	return obj;
}


// window.onload = function () {

// 	var oTxt = document.getElementById("txt");

// 	oTxt.onkeydown = function (ev) {
// 		var oEvent = ev || event;
// 		if (oEvent.keyCode == 9) {
// 		关键部分bai 开始(重要! 去掉浏览器的默认事件du 不然会按tab之后光zhi标会跳去其他的地方,用户优dao化不好)
// 			if (oEvent.preventDefault) {
// 				oEvent.preventDefault();
// 			}
// 			else {
// 				window.event.returnValue = false;
// 			}
// 	/*关键部分 结束*/
// 			oTxt.value += " "; //这里放入了4个空格
// 		}
// 	}
// }