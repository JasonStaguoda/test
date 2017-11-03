
// 兼容IOS点击反馈的active伪类
document.body.addEventListener('touchstart', function () { });

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
			return;
		} else {
			element.className = old_class + " " + value;
		}
	}
}
// 删除类名
function delClass(element, value) {
	var old_class = element.className;
	if (!old_class) return;
	if (old_class === value) {
		element.removeAttribute("class");
	} else {
		if (old_class.indexOf(value) === -1) {
			return;
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

addLoadEvent(goTop);
function goTop() {  // 返回顶部按钮
	var button = document.getElementById("gotop");
	if (!button) return;
	window.onscroll = function() {
		var top_height = window.pageYOffset;
		if (top_height > 800) {
			addClass(button, "gotop_show");
		} else {
			delClass(button, "gotop_show");
		}

		button.onclick = function() {
			var timer = null;
			cancelAnimationFrame(timer);
			timer = requestAnimationFrame(function fn(){
			var oTop = document.body.scrollTop;
			if(oTop > 0){
			document.body.scrollTop = document.scrollTop = oTop - 188;
			timer = requestAnimationFrame(fn);
			} else {
			cancelAnimationFrame(timer);
			}
			})
		}
	}
}

addLoadEvent(recommendPageSearchMogule);
function recommendPageSearchMogule() {  // 推荐页面搜索模块相关
	var primer = document.getElementById("recommend_search");
	if (!primer) return;
	var recommend = document.getElementById("recommend");
	var search = document.getElementById("search_module");
	var search_input = document.getElementById("search_module_cont_input");
	var search_close = document.getElementById("search_module_closeholder");
	var back = document.getElementById("search_header_back");
	var result_close = document.getElementById("search_module_result_closeholder");

	primer.onclick = function() {
		addClass(search, "search_module_show");
		addClass(recommend, "recommend_hide");
		search_input.focus();
	}
	back.onclick = function() {
		delClass(search, "search_module_show");
		delClass(search, "search_module_result_show");
		delClass(search, "search_module_unfind_show");
		delClass(recommend, "recommend_hide");
	}
	search_close.onclick = function() {
		delClass(search, "search_module_show");
		delClass(search, "search_module_result_show");
		delClass(search, "search_module_unfind_show");
		delClass(recommend, "recommend_hide");
	}
	result_close.onclick = function() {
		delClass(search, "search_module_result_show");
	}
}

addLoadEvent(clearRecording);
function clearRecording() {  // 推荐页面搜索模块清除记录
	var button = document.getElementById("search_clear_recording_button");
	var recording = document.getElementById("search_recording");
	if (!button || !recording) return;

	button.onclick = function() {
		recording.innerHTML = "";
	}
}

addLoadEvent(controlIntroduction);
function controlIntroduction() {  // 详情页作品简介的展示和收拢
	var module = document.getElementById("book_introduction");
	if (!module) return;
	var module_cont = document.getElementById("book_int_cont");
	var module_cont_height = module_cont.clientHeight;  // 因为高度不确定，先取到真实高度
	addClass(module_cont, "int_omitted");  // 再让其省略...
	addClass(module_cont, "book_int_cont");  // 再把过渡加上，加早了有问题

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
	var popup_layer_hover = document.getElementById("play_popup_closeholder");
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
function classificationModuleFixed() {  // 分类页面 选择分类模块相关
	var box = document.getElementById("classification_module");
	var book_list = document.getElementById("classification");
	if (!box || !book_list) return;
	// 元素本来就添加了折叠的class，按折叠的状态加载
	var box_fold_height = box.clientHeight;  // 取到折叠状态下的元素高度
	delClass(box, "classification_module_fixed");  // 然后把折叠的class删掉
	var box_originally_height = box.clientHeight;  // 取到展开状态下的元素高度
	box.style.height = box_originally_height + "px";  // 并设置高度（为了过度动画）

	if (book_list.clientHeight + box_fold_height > document.documentElement.clientHeight) {  // 当元素高度不够时，不折叠，否则有BUG
		window.onscroll = function() {  // 当页面滚动时
			var box_top = box.getBoundingClientRect().top;  // 取到元素与浏览器窗口顶部的距离
			if (box_top <= 0) {  // 如果到达窗口顶部（往上拉）
				addClass(box, "classification_module_fixed");  // 固定定位、样式调整
				box.style.height = box_fold_height + "px";  // 再把height设置成先前取到的折叠状态下的高度值，这样就产生了过度动画
				book_list.style.marginTop = box_fold_height + "px";  // 同时给下面的元素一个上边距撑住，否则由于固定定位高度会塌陷
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

addLoadEvent(classificationTab);
function classificationTab() {  // 分类页面，关键词点击切换
	var all = document.getElementById("classification_module_all");
	var history = document.getElementById("classification_module_history");
	if (!all || !history) return;
	classificationTabAction(all);
	classificationTabAction(history);
}
function classificationTabAction(element) {
	var element_items = element.getElementsByTagName("li");
	for (var i=0; i<element_items.length; i++) {
		element_items[i].onclick = function() {
			for (var i=0; i<element_items.length; i++) {
				delClass(element_items[i], "checked");
			}
			addClass(this, "checked");
		}
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
	}
}

addLoadEvent(rankingSwitch);
function rankingSwitch() {  // 排行页，周月总榜切换
	var box = document.getElementById("ranking_first3_switch");
	if (!box) return;
	var item = box.getElementsByTagName("a");

	for (var i=0; i<item.length; i++) {
		item[i].onclick = function() {
			for (var i=0; i<item.length; i++) {
				delClass(item[i], "active");
			}
			addClass(this, "active");
		}
	}
}

addLoadEvent(registerSignButtonStatus);
function registerSignButtonStatus() {  // 注册页-注册按钮是否可用
	var button = document.getElementById("register_button");
	var account = document.getElementById("account_input");
	var password = document.getElementById("password_input");
	var safecode = document.getElementById("safecode_input");
	if (!button || !account || !password || !safecode) return;

	document.body.oninput = function() {
		if (accountCheck(account) && passworldCheck(password) && safecodeCheck(safecode)) {
			if (button.getAttribute("disabled")) {
				button.removeAttribute("disabled");
			}
			delClass(button, "sign_button_forbidden");
		} else {
			if (!button.getAttribute("disabled")) {
				button.setAttribute("disabled", "disabled");
			}
			addClass(button, "sign_button_forbidden");
		}
	}
}
addLoadEvent(loginSignButtonStatus);
function loginSignButtonStatus() {  // 登录页-按钮可用性控制
	var button = document.getElementById("login_button");
	var account = document.getElementById("account_input");
	var password = document.getElementById("password_input");
	if (!button || !account || !password) return;

	document.body.oninput = function() {
		if (accountCheck(account) && passworldCheck(password)) {
			if (button.getAttribute("disabled")) {
				button.removeAttribute("disabled");
			}
			delClass(button, "sign_button_forbidden");
		} else {
			if (!button.getAttribute("disabled")) {
				button.setAttribute("disabled", "disabled");
			}
			addClass(button, "sign_button_forbidden");
		}
	}
}
function accountCheck(element) {  // 账户名验证条件
	var account_cont = element.value;
	var patt = /^[a-zA-Z][0-9a-zA-Z]{5,17}$/;
	if (!patt.test(account_cont)) {
		return false;
	}
	return true;
}
function passworldCheck(element) {  // 密码验证条件
	var password_cont = element.value;
	if (password_cont.length < 6 || password_cont.length > 20) {
		return false;
	}
	return true;
}
function safecodeCheck(element) {  // 安全码验证条件
	var safecode_cont = element.value;
	var reg = /^[0-9]{6}$/;
	if (!reg.test(safecode_cont)) {
		return false;
	}
	return true;
}

addLoadEvent(rechargeMoneyTab);
function rechargeMoneyTab() {  // 充值页金额切换
	var list = document.getElementById("recharge_money");
	if (!list) return;
	var list_item = list.getElementsByTagName("li");

	for (var i=0; i<list_item.length; i++) {
		list_item[i].onclick = function() {
			for (var i=0; i<list_item.length; i++) {
				delClass(list_item[i], "selected");
			}
			addClass(this, "selected");
		}
	}
}

addLoadEvent(rechargeButtonStatus);
function rechargeButtonStatus() {  // 充值页，按钮可用性控制
	var code_but = document.getElementById("recharge_tel_button");
	var submit_but = document.getElementById("recharge_button");
	if (!code_but || !submit_but) return;
	var tel = document.getElementById("recharge_tel_input");
	var code = document.getElementById("recharge_code_input");

	tel.oninput = function() {
		if (telCheck(tel)) {
			code_but.removeAttribute("disabled");
			delClass(code_but, "sign_button_forbidden");
		} else {
			code_but.setAttribute("disabled", "disabled");
			addClass(code_but, "sign_button_forbidden");
		}
	}
	code.oninput = function() {
		if (telCheck(tel) && telCodeCheck(code)) {
			submit_but.removeAttribute("disabled");
			delClass(submit_but, "sign_button_forbidden");
		} else {
			submit_but.setAttribute("disabled", "disabled");
			addClass(submit_but, "sign_button_forbidden");
		}
	}
}
function telCheck(element) {  // 联通号码验证条件
	var tel_cont = element.value;
	var reg = /^(((13[0-2]{1})|(15[5-6]{1})|(18[5-6]{1})|(17[5-6]{1}))+\d{8})$/;
	if (!reg.test(tel_cont)) {
		return false;
	}
	return true;
}
function telCodeCheck(element) {  // 手机验证码验证条件
	var code_cont = element.value;
	var reg = /^[0-9]{4}$/;
	if (!reg.test(code_cont)) {
		return false;
	}
	return true;
}

addLoadEvent(exchangeButtonStatus);
function exchangeButtonStatus() {  // 兑换页，按钮可用性控制
	var butn = document.getElementById("exchange_button");
	if (!butn) return;
	var num = document.getElementById("exchange_num_input");
	var password = document.getElementById("exchange_password_input");

	document.body.oninput = function() {
		if (exchangeCheck(num) && exchangeCheck(password)) {
			butn.removeAttribute("disabled");
			delClass(butn, "sign_button_forbidden");
		} else {
			butn.setAttribute("disabled", "disabled");
			addClass(butn, "sign_button_forbidden");
		}
	}
}
function exchangeCheck(element) {  // 兑换页卡号密码验证条件
	var exchange_cont = element.value;
	var reg = /^[a-zA-Z0-9]{6,20}$/;
	if (!reg.test(exchange_cont)) {
		return false;
	}
	return true;
}
