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
		}
	
	};

})(zwork, jQuery);