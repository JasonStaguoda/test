// 兼容IOS点击反馈的active伪类
document.body.addEventListener('touchstart', function () { });

// 页面加载完毕后立即执行某函数
function addLoadEvent(func) {  // addLoadEvent(函数名);
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
// 添加类名
function addClass(element, value) {  // addClass(元素, 类名);
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
function delClass(element, value) {  // delClass(元素, 类名);
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

addLoadEvent(voicePlay);
function voicePlay() { // 列表页-播放和暂停录音
	var btn = document.getElementsByClassName("list-cont-voice");
	if (!btn) return;
	voicePlayStep(btn, "list-cont-voice-play");
}
addLoadEvent(publicVoicePlay);
function publicVoicePlay() { // 公共播放录音按钮的播放和暂停状态
	var btn = document.getElementsByClassName("public-voice-btn");
	if (!btn) return;
	voicePlayStep(btn, "public-voice-btn-play");
}
function voicePlayStep(elements, classname) { // 封装步骤，elements为数组
	for (var i=0; i<elements.length; i++) {
		elements[i].onclick = function() {
			if (this.className.indexOf(classname) === -1) {
				addClass(this, classname);
			} else {
				delClass(this, classname);
			}
		}
	}
}

addLoadEvent(popupsCloseByHolder);
function popupsCloseByHolder() { // 投票详情页，点击holder关闭弹窗
	var holder = document.getElementsByClassName("detailed-popups-hloder");
	if (!holder) return;

	for (var i=0; i<holder.length; i++) {
		holder[i].onclick = function() {
			this.parentNode.style.display = "none";
		}
	}
}
addLoadEvent(popupsCloseByBtn);
function popupsCloseByBtn() { // 投票详情页，点击确定按钮关闭弹窗
	var btn = document.getElementsByClassName("detailed-popups-btn");
	if (!btn) return;

	for (var i=0; i<btn.length; i++) {
		btn[i].onclick = function() {
			this.parentNode.parentNode.style.display = "none";
		}
	}
}

addLoadEvent(rankingAutoNo);
function rankingAutoNo() { // 排名页面，自动生成序号
	var box = document.getElementById("ranking_cont");
	if (!box) return;
	var items = box.getElementsByTagName("li");

	for (var i=0; i<items.length; i++) {
		items[i].getElementsByClassName("ranking-cont-rank")[0].innerHTML = i + 1;
	}
}
