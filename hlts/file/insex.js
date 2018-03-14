window.onload = function() {
	whenGetClick();
	whenSubmitClick();
}

// 当获取验证码按钮被点击时
function whenGetClick() {
	var code_btn = document.getElementById("enter-get");
	code_btn.onclick = function() {
		if (telVerification()) {
			settime(this);
		}
	}
}
// 当提交按钮被点击时
function whenSubmitClick() {
	var smt_btn = document.getElementById("enter-submit");
	smt_btn.onclick = function() {
		if (!telVerification() || !codeVerification()) {
			return false;
		}
	}
}
// 验证手机号
function telVerification() {
	var tel = document.getElementById("tel-input").value;
	var reg = /^1[34578]\d{9}$/;
	if (!reg.test(tel)) {
		alert("请正确输入手机号");
		return false;
	}
	return true;
}
// 验证验证码
function codeVerification() {
	var code = document.getElementById("code-input").value;
	if (isNaN(code) || code.length !== 4) {
		alert("请正确输入验证码");
		return false;
	}
	return true;
}
// 倒计时
var countdown = 30;
function settime(obj) {
	if (countdown === 0) {
		obj.style.backgroundColor = "#f8f400";
		obj.innerHTML = "再次获取验证码";
		obj.removeAttribute("disabled");
		countdown = 30;
		return;
	} else {
		obj.style.backgroundColor = "#a7a7a7";
		obj.innerHTML="重新发送(" + countdown + ")";
		obj.setAttribute("disabled", true);
		countdown--;
	}
	setTimeout(function(){settime(obj)}, 1000);
}
