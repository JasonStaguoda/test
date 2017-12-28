// 滑动到底部自动载
function loading(obj,callback){
	//获取滚动条当前的位置 
	function getScrollTop() {

		var scrollTop = 0;

		if (obj=='') {
			if (document.documentElement && document.documentElement.scrollTop) { 
				scrollTop = document.documentElement.scrollTop; 
			} 
			else if (document.body) { 
				scrollTop = document.body.scrollTop; 
			} 
		} else if(obj!=''){
			if (document.documentElement && document.documentElement.scrollTop) { 
				scrollTop = obj.scrollTop; 
			} 
			else if (document.body) { 
				scrollTop = obj.scrollTop; 
			}
		} 
		
		return scrollTop; 
	} 

	//获取当前可是范围的高度 
	function getClientHeight() { 
		var clientHeight = 0; 
		if (obj=='') {
			if (document.body.clientHeight && document.documentElement.clientHeight) { 
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
			} 
			else { 
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
			} 
		} else if(obj!=''){

			if (document.body.clientHeight && document.documentElement.clientHeight) { 
				clientHeight = Math.min(obj.clientHeight, obj.clientHeight); 
			} 
			else { 
				clientHeight = Math.max(obj.clientHeight, obj.clientHeight); 
			} 

		}
		
		return clientHeight; 
	}

		//获取文档完整的高度 
	function getScrollHeight() { 
		if (obj=='') {
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
		} else if(obj!=''){

			return Math.max(obj.scrollHeight-20, obj.scrollHeight-20); 
		}
		
	} 

	function scrolling(){
		if (obj=='') {
			window.onscroll = function () { 
			
				if (getScrollTop() + getClientHeight() >= getScrollHeight()) { 
					if (typeof callback === 'function' ){
						callback()
					}
				  } 
			}
		} else if(obj!=''){
			obj.onscroll = function () { 
			
				if (getScrollTop() + getClientHeight() >= getScrollHeight()) { 
					if (typeof callback === 'function' ){
						callback()
					}
				  } 
			}
		}
		
	}

	scrolling()

}


