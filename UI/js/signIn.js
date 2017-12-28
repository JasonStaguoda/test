
function showSign(num){
var _body=$('body');
	var _html='<div class="signIn"><div class="signInMask"></div><div class="signInWrap"><p class="signIntitle">签到成功</p><div class="signInContent"><p>每日首次登录，赠送';

	_html+='<span>'+num+'</span>米粒</p><p>请明日继续签到哦~</p></div><a class="signKnow" href="#">我知道啦！</a></p></div></div>';


	function sign(){
		_body.append(_html);
		
	}
	sign()

	function signHide(){
		$(document).on('click', '.signKnow' ,function(){
			$(this).parent().parent().remove()
		})
	}
	signHide()
}



// 兑换
function showExchange(title,message,callback){
var _body=$('body');
	var _html='<div class="showExchange"><div class="signInMask"></div><div class="signInWrap"><p class="signIntitle">'+title+'</p><div class="signInContent"><p>'+message;
	_html+='</div><a class="signKnow" href="#">确定</a></p></div></div>';


	function sign(){
		_body.append(_html);
		
	}
	sign()

	function signHide(){
		$(document).on('click', '.signKnow' ,function(){
			$(this).parent().parent().remove();
			 if(typeof callback ==='function'){
                callback()
            }
		})
	}
	signHide()
}



//

// 兑换

// 

function showActivity(linkurl, imgurl, callback) {
    var _body = $('body');
    var img = new Image();
    img.src = imgurl;
    img.setAttribute('style', 'width:90%')
    var _html = $('<div id="showActivity" style="position:fixed;top:0;left: 0;right: 0;bottom: 0;z-index:99999999;"><div style="position:absolute;width:100%;height:100%;top:0;left: 0;background-color:black;opacity:0.5;"></div><div style="position: relative;width:100%;height: 100%;background-color: transparent;z-index: 999999999;"><div style="width:7.0rem;height:auto;position:absolute;left:50%;top:50%;overflow: hidden; -webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%); transform: translate(-50%, -50%);"><img id="signKnow" style="position: absolute;top:0;right:0;width:0.9375rem;height: 0.9375rem;z-index: 9999999999;float: left;" src="../img/ax.png" alt=""><a href="' + linkurl + '" id="activityIcon" style="display: block;width:100%;margin: 0 auto;text-align: center;margin-top: 1.09375rem;"></a></div></div></div>');
    _html.find("#activityIcon").append($(img));
    _html.find("#signKnow").on('click', function () {
        _body.find('#showActivity').remove()
        if (typeof callback === 'function') {
            callback()
        }
    })
    _body.append(_html);
}