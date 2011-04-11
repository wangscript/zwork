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
			});
		},
		
		close_default_contextmenu:function(){
			
			var items = new $ui.hashmap();
			items.put("1",{
				id:"1",
				label:"排列方式"
			});
			items.put("2",{
				id:"2",
				label:"刷新"
			});
			items.put("3",{
				id:"3",
				mark:true
			});
			
			var subitem = new $ui.hashmap();
			subitem.put("1",{
				id:"1",
				label:"桌面"
			});
			subitem.put("2",{
				id:"2",
				label:"可移动硬盘"
			});
			
			items.put("4",{
				id:"4",
				label:"复制到...",
				children:subitem
			});
			items.put("5",{
				id:"5",
				label:"粘贴"
			});
			items.put("6",{
				id:"6",
				label:"显示属性",
				fn:function(){
					$ui.window().show();
				}
			});
			
			var menu = $ui.contextmenu({
				items:items
			});
			
			$(document).bind("contextmenu",function(e){
				menu.top(e.pageY).left(e.pageX).show();
				return false;
			});
		},
		
		system_click_event:function(){
			$(document).bind("click",function(){
				$(".zwork-contextmenu").each(function(){
					$ui.find($(this)).hide();
				});
			});
		}
	
	};

})(zwork, jQuery);