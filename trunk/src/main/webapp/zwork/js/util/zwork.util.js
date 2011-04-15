/* !
 * file : zwork.util
 * author : 赵振华
 * 	工具箱，提供一些工具函数。
 */

(function($z, $) {

	/**
	 * util对象
	 * */
	$z.util = {
			
		/**
		 * 获取全球唯一码
		 * 参数	无
		 * 返回	全球唯一码（字符串）
		 * */
		guid : function() {
			var guid = "";
			for ( var i = 1; i <= 32; i++) {
				var n = Math.floor(Math.random() * 16.0).toString(16);
				guid += n;
				if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
					guid += "-";
			}
			return guid;
		},
		
		/**
		 * 使body标签的大小与浏览器同步
		 * 参数	无
		 * 返回	无
		 * */
		fitbody : function(){
			
			$("body").height($(window).height());
			$("body").width($(window).width());
			
			$(window).resize(function(){
				$("body").height($(window).height());
				$("body").width($(window).width());
				$("body").resizEvent();
			});
			
		},
		
		/**
		 * 当前文档检测到按钮按下时触发
		 * 参数	无
		 * 返回	无
		 * */
		document_keypress : function(){
			$(document).keypress(function(){
			});
		},
		
		close_default_contextmenu:function(){
			$(document).bind("contextmenu",function(e){
				return false;
			});
		},
		
		system_click_event:function(){
			$(document).bind("click",function(){
				$(".zwork-contextmenu").each(function(){
					$z.find($(this)).hide();
				});
			});
		},
		
		/**
		 * 获取当前区域
		 * 参数	当前对象
		 * 返回	当前对象所在的容器
		 */
		findCurrent:function(_this){
			var current = $(_this);
			
		}
	
	};

})(zwork, jQuery);