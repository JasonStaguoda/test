// 页面加载完毕后立即执行某函数
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
// 追加类名
function addClass(element, value) {
	var old_class = element.className;
	if (!old_class) {
		element.className = value;
	} else {
		if (old_class.indexOf(value) !== -1) {
			return false;
		} else {
			element.className = old_class + " " + value;
		}
	}
}
// 删除类名
function delClass(element, value) {
	var old_class = element.className;
	if (!old_class) return false;
	if (old_class === value) {
		element.removeAttribute("class");
	} else {
		if (old_class.indexOf(value) === -1) {
			return false;
		} else {
			element.className = old_class.replace(value, "");
			var new_class = element.className;
			if (new_class.substring(0, 1) === " ") {
				element.className = new_class.substring(1);
			}
			if (new_class.substring(new_class.length-1) === " ") {
				element.className = new_class.substring(0, new_class.length-1);
			}
			if (new_class.indexOf("  ") !== -1) {
				element.className = new_class.replace("  ", " ");
			}
		}
	}
}


addLoadEvent(previousPage);
function previousPage() {  // 公共头部点击回退上一页
	var button = document.getElementById("header_back");
	if (!button) return;
	button.onclick = function() {
		history.go(-1);
	}
}

addLoadEvent(recommendPageSearchMogule);
function recommendPageSearchMogule() {  // 推荐页面搜索模块相关
	var primer = document.getElementById("recommend_search");
	if (!primer) return;
	var recommend = document.getElementById("recommend");
	var search_bg = document.getElementById("search_module_bg");
	var search = document.getElementById("search_module");
	var back = document.getElementById("search_header_back");

	primer.onclick = function() {
		if (recommend.className.indexOf("recommend_hide") === -1) {
			addClass(search_bg, "search_module_bg_show");
			addClass(search, "search_module_show");
			addClass(recommend, "recommend_hide");
		}
	}
	back.onclick = function() {
		delClass(search_bg, "search_module_bg_show");
		delClass(search, "search_module_show");
		delClass(recommend, "recommend_hide");
	}
}

addLoadEvent(controlIntroduction);
function controlIntroduction() {  // 详情页作品简介的展示和收拢
	var module = document.getElementById("book_introduction");
	if (!module) return;
	var module_cont = document.getElementById("book_int_cont");
	var module_cont_height = module_cont.clientHeight;  // 因为高度不确定，先取到真实高度
	addClass(module_cont, "int_omitted");  // 再让其省略...
	addClass(module_cont, "book_int_cont");  // 再把过渡加上，加早了，火狐下取高度不准，而且上一步加省略的时候也容易出现过渡

	module.onclick = function() {
		if (module.className.indexOf("int_show") === -1) {
			addClass(this, "int_show");  // 这个类名控制标题箭头旋转和省略部分的display
			module_cont.style.height = module_cont_height + "px";  // 再把省略部分的高度设置上
		} else {
			delClass(this, "int_show");
			module_cont.removeAttribute("style");
		}
	}
}

addLoadEvent(danmuControl);
function danmuControl() {  // 弹幕开关控制
	var dm_button = document.getElementById("danmu_button");
	var dm_cont = document.getElementById("danmu_cont");
	if (!dm_button || !dm_cont) return;

	dm_button.onclick = function() {
		if (this.className.indexOf("header_danmu_close") === -1) {
			addClass(dm_cont, "danmu_cont_close");
			addClass(this, "header_danmu_close");
		} else {
			delClass(dm_cont, "danmu_cont_close");
			delClass(this, "header_danmu_close");
		}
	}
}

addLoadEvent(onloadCDdetection);
function onloadCDdetection() {  // CD封面旋转与暂停开始按钮控制
	var cd_img = document.getElementById("play_cd_img");
	var button = document.getElementById("play_start_pause_button");
	if (!cd_img || !button) return;
	// 暂停、开始按钮连同CD图片旋转控制
	button.onclick = function() {
		if (this.className.indexOf("play_controls_operating_pause") !== -1) {
			delClass(this, "play_controls_operating_pause");
			addClass(cd_img, "play_cd_pause");
		} else {
			addClass(this, "play_controls_operating_pause");
			delClass(cd_img, "play_cd_pause");
		}
	}
}

addLoadEvent(pageMinHeight);
function pageMinHeight() {  // 播放页预防窗口过矮导致控件上移
	var danmu = document.getElementById("danmu_cont");
	if (!danmu) return;
	var window_height = document.documentElement.clientHeight;
	var danmu_height = danmu.clientHeight;
	var danmu_top = danmu.getBoundingClientRect().top;
	var controls = document.getElementById("play_controls");
	var controls_height = controls.clientHeight;
	var controls_bottom = window_height - controls.getBoundingClientRect().bottom;
	var min_height = danmu_height + danmu_top + controls_height + controls_bottom + 20;
	var body = document.body;

	if (min_height > window_height) {
		body.style.height = min_height + "px";
		body.style.position = "relative";
		controls.style.position = "absolute";
	} else {
		if (controls.style.position === "absolute") {
			body.removeAttribute("style");
			body.style.fontSize = "12px";
			controls.removeAttribute("style");
		}
	}
}

addLoadEvent(playPopupLayer);
function playPopupLayer() {  // 播放页面，目录和发送弹幕弹出层控制
	var popup_layer = document.getElementById("play_popup");
	if(!popup_layer) return;
	var popup_layer_hover = document.getElementById("play_popup_closeholver");
	var list_button = document.getElementById("book_content");
	var list_close = document.getElementById("play_popup_list_close");
	var danmu_button = document.getElementById("send_danmu");
	var danmu_close = document.getElementById("play_popup_send_close");
	var danmu_submit = document.getElementById("play_popup_submit");

	list_button.onclick = function() {
		playPopupListShow();
	}
	list_close.onclick = function() {
		playPopupListHide();
	}
	danmu_button.onclick = function() {
		playPopupSendShow();
	}
	danmu_close.onclick = function() {
		playPopupSendHide();
	}
	danmu_submit.onclick = function() {
		playPopupSendHide();
	}
	popup_layer_hover.onclick = function() {
		playPopupListHide();
		playPopupSendHide();
	}
}
function playPopupListShow() {
	var popup_layer = document.getElementById("play_popup");
	var list_cont = document.getElementById("play_popup_list");
	addClass(popup_layer, "play_popup_show");
	addClass(list_cont, "play_popup_list_show");
}
function playPopupListHide() {
	var popup_layer = document.getElementById("play_popup");
	var list_cont = document.getElementById("play_popup_list");
	delClass(popup_layer, "play_popup_show");
	delClass(list_cont, "play_popup_list_show");
}
function playPopupSendShow() {
	var popup_layer = document.getElementById("play_popup");
	var send_cont = document.getElementById("play_popup_send");
	addClass(popup_layer, "play_popup_show");
	addClass(send_cont, "play_popup_send_show");
}
function playPopupSendHide() {
	var popup_layer = document.getElementById("play_popup");
	var send_cont = document.getElementById("play_popup_send");
	delClass(popup_layer, "play_popup_show");
	delClass(send_cont, "play_popup_send_show");
}

addLoadEvent(classificationModuleFixed);
function classificationModuleFixed() {  // 分类页面 选择分类的模块自动贴合顶部以及还原 折叠状态下点击箭头下拉
	var box = document.getElementById("classification_module");
	var book_list = document.getElementById("classification");
	if (!box || !book_list) return;
	// 元素本来就添加了折叠的class，按折叠的状态加载
	var box_fold_height = box.clientHeight;  // 取到折叠状态下的元素高度
	delClass(box, "classification_module_fixed");  // 然后把折叠的class删掉
	var box_originally_height = box.clientHeight;  // 取到展开状态下的元素高度
	box.style.height = box_originally_height + "px";  // 并设置高度（为了过度动画）

	if (book_list.clientHeight + box_fold_height > document.documentElement.clientHeight) {  // 当元素高度不够时，不使用折叠效果，否则会有BUG
		window.onscroll = function() {  // 当页面滚动时
			var box_top = box.getBoundingClientRect().top;  // 取到元素与浏览器窗口顶部的距离
			if (box_top <= 0) {  // 如果到达窗口顶部（往上拉）
				addClass(box, "classification_module_fixed");  // 固定定位、样式调整
				box.style.height = box_fold_height + "px";  // 再把height设置成先前取到的折叠状态下的高度值，这样就产生了过度动画
				book_list.style.marginTop = box_fold_height + "px";  // 同时给下面的书籍列表一个上边距撑住，否则由于固定定位，整个列表会往上窜
				delClass(box, "classification_module_fixed_arrow");  // 只要页面出现滚动，立即收回到折叠状态
			}
			var book_list_top = book_list.getBoundingClientRect().top;  // 取到书籍列表与浏览器窗口顶部的距离
			if (book_list_top >= box_fold_height) {  // 如果列表距顶部高度大于元素折叠状态下的高度（往下拉）
				delClass(box, "classification_module_fixed");  // 还原元素定位
				box.style.height = box_originally_height + "px";  //  设置元素展开状态下的高度
				book_list.removeAttribute("style");  // 删除书籍列表上边距
			}
		}
	}
	var arrow = document.getElementById("classification_module_icon");
	arrow.onclick = function() {  // 折叠后 当点击展开按钮时
		addClass(box, "classification_module_fixed_arrow");  // 使元素内部还原 但仍然是固定定位
		box.style.height = box_originally_height + "px";  // 设置展开状态下的高度
	}
}

addLoadEvent(autoRanking);
function autoRanking() {  // 排行页，第4名开始自动生成序号
	var list = document.getElementById("ranking_book_exhibition");
	if (!list) return;
	var list_item = list.getElementsByTagName("li");

	for (var i=0; i<list_item.length; i++) {
		var list_em = list_item[i].getElementsByTagName("em")[0];
		var list_qty = list_em.innerHTML = i + 1 + 3;
		if (list_qty > 9) {
			list_em.style.marginLeft = "-6.1rem";
		}
	}
}
