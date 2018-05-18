// 书库
window.onload = function() {
	searchLayer();
	filterLayer();
	filterChoose();
	filterData();
	searchChoose();
}

// 打开关闭搜索/筛选弹层
function searchLayer() {
	var input = document.getElementById("library-feature-input");
	var btn = document.getElementById("library-feature-close");
	var layer = document.getElementById("library-search");
	showLayer(input, layer);
	closeLayer(btn, layer);
}
function filterLayer() {
	var btn = document.getElementById("library-feature-filter");
	var placeholder = document.getElementById("library-filter-holder");
	var layer = document.getElementById("library-filter");
	showLayer(btn, layer);
	closeLayer(placeholder, layer);
}
function showLayer(btn, layer) {
	btn.onclick = function() {
		layer.style.display = "block";
		document.body.style.overflow = "hidden";
	}
}
function closeLayer(btn, layer) {
	btn.onclick = function() {
		layer.style.display = "";
		document.body.style.overflow = "";
	}
}

// 筛选弹层选项选择
function filterChoose() {
	var channels = document.getElementById("library-filter-channels");
	var category = document.getElementById("library-filter-category");
	var count = document.getElementById("library-filter-count");
	var sorting = document.getElementById("library-filter-sorting");
	var status = document.getElementById("library-filter-status");
	chooseOptions(channels);
	chooseOptions(category);
	chooseOptions(count);
	chooseOptions(sorting);
	chooseOptions(status);
}
function chooseOptions(dl) {
	var dd = dl.getElementsByTagName("dd");
	for (var i=0; i<dd.length; i++) {
		dd[i].onclick = function() {
			for (var j=0; j<dd.length; j++) {
				delClass(dd[j], "selected");
			}
			addClass(this, "selected");
		}
	}
}

// 筛选弹层数据获取
function filterData() {
	var btn = document.getElementById("library-filter-sure");
	var layer = document.getElementById("library-filter");
	var channels = document.getElementById("library-filter-channels");
	var category = document.getElementById("library-filter-category");
	var count = document.getElementById("library-filter-count");
	var sorting = document.getElementById("library-filter-sorting");
	var status = document.getElementById("library-filter-status");
	btn.onclick = function() {
		var data = [];
		data[0] = filterDataPack(channels, "data-pd");
		data[1] = filterDataPack(category, "data-lx");
		data[2] = filterDataPack(count, "data-zs");
		data[3] = filterDataPack(sorting, "data-px");
		data[4] = filterDataPack(status, "data-zt");
		alert(data);  // 取到数据
		layer.style.display = "";
		document.body.style.overflow = "";
	}
}
function filterDataPack(dl, data) {
	var dd = dl.getElementsByTagName("dd");
	for (var i=0; i<dd.length; i++) {
		if (dd[i].className === "selected") {
			return dd[i].getAttribute(data);
		}
	}
}

// 搜索弹层关键词选择
function searchChoose() {
	var li = document.getElementById("library-search-keyword").getElementsByTagName("li");
	var input = document.getElementById("library-feature-input");
	var layer = document.getElementById("library-search");
	for (var i=0; i<li.length; i++) {
		li[i].onclick = function() {
			var keyword = this.innerHTML;
			alert(keyword);  // 取到关键词
			input.value = keyword;
			layer.style.display = "";
			document.body.style.overflow = "";
		}
	}
}
