// 充值中心
window.onload = function() {
	amountAwitch();
	recharge();
	rechargeTerms()
}

// 充值选项切换
function amountAwitch() {
	var li = document.getElementById("recharge-cont-price").getElementsByTagName("li");
	for (var i=0; i<li.length; i++) {
		li[i].onclick = function() {
			for (var j=0; j<li.length; j++) {
				delClass(li[j], "selected");
			}
			addClass(this, "selected");
		}
	}
}

// 确认充值
function recharge() {
	var btn = document.getElementById("recharge-cont-submit");
	var input = document.getElementById("price-statement");
	btn.onclick = function() {
		if (input.checked) {
			var li = document.getElementById("recharge-cont-price").getElementsByTagName("li");
			var data;
			for (var i=0; i<li.length; i++) {
				if (li[i].className === "selected") {
					data = li[i].getAttribute("data-m");
				}
			}
			alert(data);  // 取到数据
		} else {
			alert("请勾选“充值条款声明”");
		}
	}
}

// 充值条款弹层打开关闭
function rechargeTerms() {
	var open = document.getElementById("recharge-terms");
	var close = document.getElementById("recharge-cont-terms-btn");
	var layer = document.getElementById("recharge-cont-terms-wrap");
	open.onclick = function() {
		layer.style.display = "block";
		document.body.style.overflow = "hidden";
	}
	close.onclick = function() {
		layer.style.display = "";
		document.body.style.overflow = "";
	}
}
