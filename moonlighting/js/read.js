// 阅读页面
window.onload = function() {
	themeSwitching();
	cutFontSize();
	intFontSize();
	openCloseCatalogLayer();
	catalogRiseDropSort();
	chooseChapter();
	onloadCheck();
	previousPage();
	nextPage();
	goPage();
}

// 颜色主题皮肤切换
c_em = document.getElementById("read-control-color").getElementsByTagName("em");
body = document.body;
function themeSwitching() {
	for (var i=0; i<c_em.length; i++) {
		c_em[i].onclick = function() {
			var color = this.getAttribute("data-color");
			delClass(body, "yellow");
			delClass(body, "green");
			delClass(body, "white");
			delClass(body, "black");
			addClass(body, color);
			for (var j=0; j<c_em.length; j++) {
				delClass(c_em[j], "selected");
			}
			addClass(this, "selected");
		}
	}
}

// 内容文字大小控制
f_cut = document.getElementById("font-cut");
f_inc = document.getElementById("font-inc");
f_box = document.getElementById("read-cont");
function cutFontSize() {
	f_cut.onclick = function() {
		var box_class = f_box.className.split(" ");
		var old_fz;
		for (var i=0; i<box_class.length; i++) {
			if (box_class[i].indexOf("fz") !== -1) {
				old_fz = box_class[i];
				break;
			}
		}
		var num = Number(old_fz.split("-")[1]);
		if (num >= 14) {
			var new_fz = "fz-" + (num-2);
			delClass(f_box, old_fz);
			addClass(f_box, new_fz);
		}
	}
}
function intFontSize() {
	f_inc.onclick = function() {
		var box_class = f_box.className.split(" ");
		var old_fz;
		for (var i=0; i<box_class.length; i++) {
			if (box_class[i].indexOf("fz") !== -1) {
				old_fz = box_class[i];
				break;
			}
		}
		var num = Number(old_fz.split("-")[1]);
		if (num <= 28) {
			var new_fz = "fz-" + (num+2);
			delClass(f_box, old_fz);
			addClass(f_box, new_fz);
		}
	}
}

// 目录层
r_open = document.getElementById("read-catalog-open");
r_layer = document.getElementById("read-catalog");
r_holder = document.getElementById("read-catalog-holder");
r_rise = document.getElementById("read-catalog-rise");
r_drop = document.getElementById("read-catalog-drop");
r_cont = document.getElementById("read-catalog-cont");
r_pre = document.getElementById("read-catalog-pre");
r_nxt = document.getElementById("read-catalog-nxt");
r_input = document.getElementById("read-catalog-input");
r_go = document.getElementById("read-catalog-go");
r_now = document.getElementById("read-catalog-now");
r_all = document.getElementById("read-catalog-all");
function openCloseCatalogLayer() {
	r_open.onclick = function() {
		r_layer.style.display = "block";
		document.body.style.overflow = "hidden";
	}
	r_holder.onclick = function() {
		r_layer.style.display = "";
		document.body.style.overflow = "";
	}
}
function catalogRiseDropSort() {
	r_rise.onclick = function() {
		addClass(r_cont, "desc-order");
	}
	r_drop.onclick = function() {
		delClass(r_cont, "desc-order");
	}
}
function chooseChapter() {
	var li = r_cont.getElementsByTagName("li");
	for (var i=0; i<li.length; i++) {
		li[i].onclick = function() {
			for (var j=0; j<li.length; j++) {
				delClass(li[j], "now");
			}
			addClass(this, "now");
		}
	}
}
function onloadCheck() {
	var now = Number(r_now.innerHTML);
	var all = Number(r_all.innerHTML);
	if (now === 1) {
		addClass(r_pre, "read-pre-grey");
	}
	if (now === all) {
		addClass(r_nxt, "read-next-grey");
	}
}
function previousPage() {
	r_pre.onclick = function() {
		var now = Number(r_now.innerHTML);
		if (now > 1) {
			r_now.innerHTML = now - 1;
			r_input.value = now - 1;
			delClass(r_nxt, "read-next-grey");
		}
		if (now === 2) {
			addClass(r_pre, "read-pre-grey");
		}
	}
}
function nextPage() {
	r_nxt.onclick = function() {
		var now = Number(r_now.innerHTML);
		var all = Number(r_all.innerHTML);
		if (now < all) {
			r_now.innerHTML = now + 1;
			r_input.value = now + 1;
			delClass(r_pre, "read-pre-grey");
		}
		if (now === all-1) {
			addClass(r_nxt, "read-next-grey");
		}
	}
}
function goPage() {
	r_go.onclick = function() {
		r_go.blur();
		var num = Number(r_input.value);
		var now = Number(r_now.innerHTML);
		var all = Number(r_all.innerHTML);
		if (num === now) return;
		if (num>=1 && num<=all) {
			r_now.innerHTML = num;
			delClass(r_pre, "read-pre-grey");
			delClass(r_nxt, "read-next-grey");
		}
		if (num === 1) {
			addClass(r_pre, "read-pre-grey");
			delClass(r_nxt, "read-next-grey");
		}
		if (num === all) {
			delClass(r_pre, "read-pre-grey");
			addClass(r_nxt, "read-next-grey");
		}
	}
}
