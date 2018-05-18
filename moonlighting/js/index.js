// 首页
window.onload = function() {
	indexLeaderboardSwitch();
}

// 排行榜切换
function indexLeaderboardSwitch() {
	var box = document.getElementById("index-leaderboard-switch");
	var li = box.getElementsByTagName("li");
	for (var i=0; i<li.length; i++) {
		li[i].onclick = function() {
			for (var j=0; j<li.length; j++) {
				delClass(li[j], "selected")
			}
			addClass(this, "selected")
		}
	}
}
