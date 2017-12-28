function readCoupons(title,content,btncancle,btnSure,leftCallback,rightCallback){
var _body=$('body');
	var _html='<div class="coupons_maskWrap"><div class="coupons_mask"></div><div class="coupons_maskContent"><img class="close" src="../../img/close_login.png" alt="">';

	_html+='<p class="title">'+title+'</p><p class="status">'+content+'</p><div class="btnsGroup"><a class="cancle btn" href="#">'+btncancle+'</a><a class="sure btn" href="#">'+btnSure+'</a></div></div>';


	function sign(){
		_body.append(_html);
	}
	sign()

	function btnsleft(){
		var btntext= $('.cancle').html();
		console.log(btntext);
		$(document).on('click', '.cancle' , function(){
			if(btntext=='取消'){
				 $(this).parents('.coupons_maskWrap').remove()

			}else{
				if(typeof leftCallback ==='function'){
                   leftCallback()
            	}
            	$(this).parents('.coupons_maskWrap').remove()
			}
	   })
	}

	btnsleft()

	function btnsright(){
		var btntext= $('.sure').html();
		console.log(btntext);
		if(btntext=='确定'){
			$('.cancle').remove()
		}
		$(document).on('click', '.sure' , function(){
			if(btntext=='确定'){
				 $(this).parents('.coupons_maskWrap').remove()
			}else{
				if(typeof rightCallback ==='function'){
                   rightCallback()
            	}
            	$(this).parents('.coupons_maskWrap').remove()
			}
	   })
	}
	btnsright()

	function signHide(){
		$(document).on('click', '.close' ,function(){
			$(this).parent().parent().remove()
		})
	}
	signHide()
}





// 获取验证码

function verify(callback){
	$('#verify').one('click',function(){
		if(typeof callback==='function'){
            callback()
        }
		var mefun=arguments.callee;
		minTimeDown.call(this,function(){
			$('#verify').one('click',mefun);
		})
	})
}
// verify()

// 分钟倒计时
function  minTimeDown(callbacks) {
    var obj=$(this);
    $(this).css('color','#ff5c4d')
    var oldHtml=obj.html();
    var countdown = 60;
    obj.html(countdown+'s');
    var timer;
    timer = window.setInterval(function () {
        	 countdown--;
        	  if (countdown == 0) {
        	  	 window.clearTimeout(timer);
        	  	 countdown = 60;
        	  	 obj.html(oldHtml);
        	  	 obj.css('color','')
        	  	 callbacks&&callbacks();
        	  	 return;
        	  }
        	  obj.html(countdown+'s');
        }, 1000);
}












