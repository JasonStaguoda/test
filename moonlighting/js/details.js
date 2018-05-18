// 书本详情
window.onload = function() {
	openCloseRewardLayer();
	rewardThingsSwitching();
	rewardQuantityControl();
	rewardBalancePrompt();
	rewardSubmit();
	collectionAndCancel();
	openCloseShareLayer();
	unfoldFoldIntParagraph();
	openCloseCommentLayer();
	commentSubmit();
}

// 打赏
r_btn = document.getElementById("details-info-feat-reward");
r_placeholder = document.getElementById("details-reward-placeholder");
r_layer = document.getElementById("details-reward");
r_li = document.getElementById("details-reward-thing").getElementsByTagName("li");
r_del = document.getElementById("reward-quantity-del");
r_add = document.getElementById("reward-quantity-add");
r_quantity = document.getElementById("reward-quantity-now");
r_show = document.getElementById("details-reward-price");
r_submit = document.getElementById("details-reward-submit");
r_balance = document.getElementById("details-reward-balance");
r_prompt = document.getElementById("reward-balance-prompt");
function openCloseRewardLayer() {
	openLayer(r_btn, r_layer);
	closeLayer(r_placeholder, r_layer);
}
function rewardThingsSwitching() {
	for (var i=0; i<r_li.length; i++) {
		r_li[i].onclick = function() {
			for (var j=0; j<r_li.length; j++) {
				delClass(r_li[j], "selected");
			}
			addClass(this, "selected");
			var unit_price = this.getElementsByTagName("span")[0].innerHTML;
			var total_price = Number(unit_price) * Number(r_quantity.innerHTML);
			r_show.innerHTML = total_price;
			if (total_price > Number(r_balance.innerHTML)) {
				addClass(r_prompt, "show");
			} else {
				delClass(r_prompt, "show");
			}
		}
	}
}
function rewardQuantityControl() {
	r_del.onclick = function() {
		var num = Number(r_quantity.innerHTML);
		if (num > 1) {
			r_quantity.innerHTML = num - 1;
			var unit_price;
			for (var i=0; i<r_li.length; i++) {
				if (r_li[i].className.indexOf("selected") !== -1) {
					unit_price = r_li[i].getElementsByTagName("span")[0].innerHTML;
					break;
				}
			}
			var total_price = Number(unit_price) * (num-1);
			r_show.innerHTML = total_price;
			if (total_price > Number(r_balance.innerHTML)) {
				addClass(r_prompt, "show");
			} else {
				delClass(r_prompt, "show");
			}
		}
	}
	r_add.onclick = function() {
		var num = Number(r_quantity.innerHTML);
		if (num < 99) {
			r_quantity.innerHTML = num + 1;
			var unit_price;
			for (var i=0; i<r_li.length; i++) {
				if (r_li[i].className.indexOf("selected") !== -1) {
					unit_price = r_li[i].getElementsByTagName("span")[0].innerHTML;
					break;
				}
			}
			var total_price = Number(unit_price) * (num+1);
			r_show.innerHTML = total_price;
			if (total_price > Number(r_balance.innerHTML)) {
				addClass(r_prompt, "show");
			} else {
				delClass(r_prompt, "show");
			}
		}
	}
}
function rewardBalancePrompt() {
	var num = r_quantity.innerHTML;
	var unit_price;
	for (var i=0; i<r_li.length; i++) {
		if (r_li[i].className.indexOf("selected") !== -1) {
			unit_price = r_li[i].getElementsByTagName("span")[0].innerHTML;
			break;
		}
	}
	if (Number(num)*Number(unit_price) > Number(r_balance.innerHTML)) {
		addClass(r_prompt, "show");
	}
}
function rewardSubmit() {
	r_submit.onclick = function() {
		var name;
		for (var i=0; i<r_li.length; i++) {
			if (r_li[i].className.indexOf("selected") !== -1) {
				name = r_li[i].getAttribute("data");
				break;
			}
		}
		var num = r_quantity.innerHTML;
		var data = name + "*" + num;
		alert(data);  // 取到数据
		r_layer.style.display = "";
		document.body.style.overflow = "";
	}
}

// 收藏
c_btn = document.getElementById("details-info-feat-collection");
function collectionAndCancel() {
	c_btn.onclick = function() {
		if (this.className.indexOf("already") === -1) {
			addClass(this, "already");
		} else {
			delClass(this, "already");
		}
	}
}

// 分享
s_btn = document.getElementById("details-info-feat-share");
s_layer = document.getElementById("details-share");
function openCloseShareLayer() {
	openLayer(s_btn, s_layer);
	closeLayer(s_layer, s_layer);
}

// 作品简介
i_box = document.getElementById("details-int");
i_p = document.getElementById("details-int-cont");
i_em = document.getElementById("details-int-arr");
function unfoldFoldIntParagraph() {
	i_p.onclick = function() {
		controlIntParagraph();
	}
	i_em.onclick = function() {
		controlIntParagraph();
	}
}
function controlIntParagraph() {
	var cn = i_box.className.split(" ");
	for (var i=0; i<cn.length; i++) {
		if (cn[i] === "unfold") {
			delClass(i_box, "unfold");
			return;
		} else {
			continue;
		}
	}
	addClass(i_box, "unfold");
}

// 发表评论弹层
d_open = document.getElementById("details-write-comment");
d_layer = document.getElementById("details-public-publish");
d_holder = document.getElementById("details-public-publish-holder");
d_input = d_layer.getElementsByTagName("textarea")[0];
d_submit = d_layer.getElementsByTagName("button")[0];
d_tips = d_layer.getElementsByTagName("p")[0];
function openCloseCommentLayer() {
	openLayer(d_open, d_layer);
	closeLayer(d_holder, d_layer);
}
function commentSubmit() {
	d_submit.onclick = function() {
		var value = d_input.value;
		if (value.replace(/\s+/g, "") === "") {
			d_tips.style.display = "block";
			return;
		}
		alert(value);  // 取到数据
		d_tips.style.display = "";
		d_input.value = "";
		d_layer.style.display = "";
		document.body.style.overflow = "";
	}
}

// 打开关闭封装
function openLayer(open, layer) {
	open.onclick = function() {
		layer.style.display = "block";
		document.body.style.overflow = "hidden";
	}
}
function closeLayer(close, layer) {
	close.onclick = function() {
		layer.style.display = "";
		document.body.style.overflow = "";
	}
}
