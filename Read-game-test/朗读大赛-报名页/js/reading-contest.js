
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


addLoadEvent(closeHolsers);
function closeHolsers() {  // 点击closeholder关闭弹窗
	var holder = document.getElementsByClassName("pop-ups-holder");
	if (!holder) return;

	for (var i=0; i<holder.length; i++) {
		holder[i].onclick = function() {
			this.parentNode.removeAttribute("style");
			document.body.removeAttribute("style");
		}
	}
}

addLoadEvent(nameAndTelOnblur);
function nameAndTelOnblur() {  // 姓名和电话栏onblur时
	var name_input = document.getElementById("name_input");
	var tel_input = document.getElementById("tel_input");
	if (!name_input || !tel_input) return;

	name_input.onblur = function() {
		if (nameCheck(name_input)) {
			name_input.style.backgroundColor = "#FFF";
		} else {
			name_input.removeAttribute("style");
		}
	}
	tel_input.onblur = function() {
		if (telCheck(tel_input)) {
			tel_input.style.backgroundColor = "#FFF";
		} else {
			tel_input.removeAttribute("style");
		}
	}
}

addLoadEvent(ageShow);
function ageShow() {  // 年龄最终展示
	var age_input = document.getElementById("age_input");
	var age_show = document.getElementById("age_show");
	if (!age_input || !age_show) return;
	age_input.onblur = function() {
		if (ageCheck(age_input)) {
			var age = age_input.value;
			age_show.getElementsByTagName("span")[0].innerHTML = age;
			age_show.style.display = "block";
		}
	}
	age_show.onclick = function() {
		age_show.removeAttribute("style");
		age_input.focus();
	}
}

addLoadEvent(selectArea);
function selectArea() {  // 选择地区弹窗-打开关闭弹窗
	var button = document.getElementById("select_area_input");
	var cont = document.getElementById("select_area");
	var close = document.getElementById("select_area_cancel");
	if (!button || !cont) return;

	button.onclick = function() {
		cont.style.display = "block";
		document.body.style.overflow = "hidden";
	}
	close.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
}
addLoadEvent(selectAreaChoose);
function selectAreaChoose() {  // 选择地区-弹窗内地区切换
	var city = document.getElementById("select_area_city");
	if (!city) return;
	var city_item = city.getElementsByClassName("select-area-city-item");
	var city_span = city.getElementsByTagName("span");

	for (var i=0; i<city_span.length; i++) {
		city_span[i].onclick = function() {
			for (var i=0; i<city_item.length; i++) {
				delClass(city_item[i], "selected");
			}
			addClass(this.parentNode, "selected");
		}
	}
}
addLoadEvent(selectAreaSelected);
function selectAreaSelected() {  // 选择地区-选择结果、以及展示
	var couty = document.getElementsByClassName("county-item");
	var input = document.getElementById("select_area_input");
	if (!couty || !input) return;
	var box = document.getElementById("select_area");
	var area_show = document.getElementById("area_show");

	for (var i=0; i<couty.length; i++) {
		couty[i].onclick = function() {
			var choose = this.innerHTML;
			var city = this.parentNode.parentNode.getElementsByTagName("span")[0].innerHTML;
			input.value = city + " " + choose;
			area_show.getElementsByTagName("span")[0].innerHTML = city + " " + choose;
			area_show.style.display = "block";
			box.removeAttribute("style");
			document.body.removeAttribute("style");
		}
	}
	area_show.onclick = function() {
		input.click();
	}
}

addLoadEvent(submitCheck);
function submitCheck() {  // 点击提交时统一校验
	var button = document.getElementById("enter_form_submit");
	if (!button) return;
	var name_input = document.getElementById("name_input");
	var tel_input = document.getElementById("tel_input");
	var age_input = document.getElementById("age_input");
	var area_input = document.getElementById("select_area_input");
	var error = document.getElementById("enter_form_error");

	button.onclick = function() {
		if (!nameCheck(name_input)) {
			error.style.display = "block";
			return false;
		}
		if (!telCheck(tel_input)) {
			error.style.display = "block";
			return false;
		}
		if (!ageCheck(age_input)) {
			error.style.display = "block";
			return false;
		}
		if (!areaCheck(area_input)) {
			error.style.display = "block";
			return false;
		}
		return true;
	}
}
function nameCheck(element) {  // 姓名校验规则
	var name = element.value;
	var china_org = /^[\u4e00-\u9fa5]{1,10}$/;
	var english_org = /^[a-zA-Z ]{1,20}$/;

	if (!china_org.test(name) && !english_org.test(name)) {
		var error = document.getElementById("enter_form_error");
		error.innerHTML = "请正确填写姓名！";
		return false;
	}
	return true;
}
function telCheck(element) {  // 手机号校验规则
	var tel = element.value;
	var tel_org = /^1[34578]\d{9}$/;

	if (!tel_org.test(tel)) {
		var error = document.getElementById("enter_form_error");
		error.innerHTML = "请正确填写手机号！";
		return false;
	}
	return true;
}
function ageCheck(element) {  // 年龄校验规则
	var age = element.value;
	var age_org = /^\d{1,2}$/;

	if (!age_org.test(age)) {
		var error = document.getElementById("enter_form_error");
		error.innerHTML = "请正确填写年龄！";
		return false;
	}
	return true;
}
function areaCheck(element) {  // 地区校验规则
	var area = element.value;

	if (!area) {
		var error = document.getElementById("enter_form_error");
		error.innerHTML = "请选择地区！";
		return false;
	}
	return true;
}

addLoadEvent(selectAvatar);
function selectAvatar() {  // 选择头像弹窗-打开关闭
	var button = document.getElementById("enter_form_avatar");
	var cont = document.getElementById("select_avatar");
	if (!button || !cont) return;
	var close = document.getElementById("select_avatar_cancel");

	button.onclick = function() {
		cont.style.display = "block";
		document.body.style.overflow = "hidden";
	}
	close.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
}

addLoadEvent(replaceChoose);
function replaceChoose() {  // 替换录音选择弹窗-关闭
	var cont = document.getElementById("works_replace");
	var no = document.getElementById("no_replace");
	var yes = document.getElementById("yes_replace");
	if (!cont || !no) return;

	no.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
	yes.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
		document.getElementById("enter_form_button").click();
	}
}

addLoadEvent(recordFailure);
function recordFailure() {  // 录音发布失败-关闭
	var cont = document.getElementById("record_failure");
	var btn = document.getElementById("record_failure_button");
	if (!cont || !btn) return;

	btn.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
}

addLoadEvent(enterSuccess);
function enterSuccess() {  // 报名成功-关闭
	var cont = document.getElementById("enter_success");
	var btn = document.getElementById("enter_success_button");
	if (!cont || !btn) return;

	btn.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
}


addLoadEvent(recordWindow);
function recordWindow() {  // 录音层-打开关闭
	var button = document.getElementById("enter_form_button");
	var cont = document.getElementById("record");
	var close = document.getElementById("record_cont_cancel");
	var finish = document.getElementById("record_yep_carry");
	if (!button || !cont || !close ||!finish) return;

	button.onclick = function() {
		cont.style.display = "block";
		document.body.style.overflow = "hidden";
	}
	close.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
	finish.onclick = function() {
		cont.removeAttribute("style");
		document.body.removeAttribute("style");
	}
}
addLoadEvent(startRecord);
function startRecord() {  // 录音层-开始录音
	var record = document.getElementById("record");
	var start_btn = document.getElementById("record_start");
	var time = document.getElementById("record_cont_time").getElementsByTagName("span")[0];
	if (!record || !start_btn || !time) return;

	start_btn.onclick = function() {
		delClass(record, "no-record");
		delClass(record, "already-record");
		delClass(record, "play-record");
		delClass(record, "goon-record");
		delClass(record, "end-record");
		addClass(record, "now-record");
		settime(time);
	}
}
addLoadEvent(newRecord);
function newRecord() {  // 录音层-重新录音
	var record = document.getElementById("record");
	var re_btn = document.getElementById("record_yep_re");
	var time = document.getElementById("record_cont_time").getElementsByTagName("span")[0];
	if (!record || !re_btn) return;

	re_btn.onclick = function() {
		delClass(record, "now-record");
		delClass(record, "already-record");
		delClass(record, "play-record");
		delClass(record, "goon-record");
		delClass(record, "end-record");
		addClass(record, "no-record");
		time_a = 0;
		time_b = 0;
		clearTimeout(t);
		time.innerHTML = 0;
	}
}
addLoadEvent(finishdRecord);
function finishdRecord() {  // 录音层-结束录音
	var record = document.getElementById("record");
	var stop_btn = document.getElementById("record_stop");
	if (!record || !stop_btn) return;

	stop_btn.onclick = function() {
		delClass(record, "no-record");
		delClass(record, "now-record");
		delClass(record, "play-record");
		delClass(record, "goon-record");
		delClass(record, "end-record");
		addClass(record, "already-record");
		time_b = time_a-1;
		time_c = time_b;
		time_a = 0;
		clearTimeout(t);
	}
}
addLoadEvent(playRecord);
function playRecord() {  // 录音层-播放录音
	var record = document.getElementById("record");
	var play_btn = document.getElementById("record_yep_try");
	var goon_btn = document.getElementById("record_goon");
	var time = document.getElementById("record_cont_time").getElementsByTagName("span")[0];
	if (!record || !play_btn) return;

	play_btn.onclick = function() {
		delClass(record, "no-record");
		delClass(record, "now-record");
		delClass(record, "already-record");
		delClass(record, "goon-record");
		delClass(record, "end-record");
		addClass(record, "play-record");
		if (time_a !== 0) {
			time_b = time_a-1;
		}
		time_a = 0;
		clearTimeout(t);
		trytime(time);
	}
	goon_btn.onclick = function() {
		delClass(record, "no-record");
		delClass(record, "now-record");
		delClass(record, "already-record");
		delClass(record, "goon-record");
		delClass(record, "end-record");
		addClass(record, "play-record");
		trytime(time);
	}
}
addLoadEvent(stopPlay);
function stopPlay() {  // 录音层-暂停播放录音
	var record = document.getElementById("record");
	var stop_but = document.getElementById("record_stop_play");
	if (!record || !stop_but) return;

	stop_but.onclick = function() {
		if (time_b > 0) {
			delClass(record, "no-record");
			delClass(record, "now-record");
			delClass(record, "already-record");
			delClass(record, "play-record");
			delClass(record, "end-record");
			addClass(record, "goon-record");
			clearTimeout(u);
		}
	}
}

var time_a = 0;  // 60秒计时
var time_b;  // 试听倒计时
var time_c;  // 录音总时长
function settime(obj) {
	var schedule = document.getElementById("record_schedule_sixty");
	if (time_a === 60) {
		var record = document.getElementById("record");
		obj.innerHTML = time_a;
		delClass(record, "no-record");
		delClass(record, "now-record");
		delClass(record, "play-record");
		delClass(record, "goon-record");
		addClass(record, "already-record");
		time_b = time_a;
		time_a = 0;
		return;
	} else {
		obj.innerHTML = time_a;
		schedule.style.clip = "rect(" + (1-(time_a/60))*2.44 + "rem 2.44rem 2.44rem 0)";
		time_a++;
	}
t = setTimeout(function() {
	settime(obj) }
	,1000)
}
function trytime(obj) {
	var schedule = document.getElementById("record_schedule_file");
	var schedule2 = document.getElementById("record_schedule_file2");
	if (time_b === 0) {
		obj.innerHTML = time_b;
		delClass(record, "no-record");
		delClass(record, "now-record");
		delClass(record, "already-record");
		delClass(record, "goon-record");
		delClass(record, "play-record");
		addClass(record, "end-record");
		return;
	} else {
		obj.innerHTML = time_b;
		schedule.style.clip = "rect(" + (1-(time_b/time_c))*2.44 + "rem 2.44rem 2.44rem 0)";
		schedule2.style.clip = "rect(" + (1-(time_b/time_c))*2.44 + "rem 2.44rem 2.44rem 0)";
		time_b--;
	}
u = setTimeout(function() {
	trytime(obj) }
	,1000)
}
