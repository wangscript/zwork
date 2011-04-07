/* !
 * file : zwork.util
 * author : 赵振华
 * 	工具箱，提供一些工具函数。
 */

(function($ui, $) {

	/**
	 * util对象
	 * */
	$ui.util = {
			
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
				alert("---");
			});
		}
	
	};

})(zwork, jQuery);