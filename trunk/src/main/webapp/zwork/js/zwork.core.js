/* !
 * file : zwork.core
 * author : 赵振华
 * 	核心对象，只提供入口，包括初始化用户滴定仪配置。
 */

(function($){
	
	/**
	 * zwork顶层对象
	 * */
	var zwork = (function(){
		
		/**
		 * copy一个zwork，然后把被拷贝对象的属性给当前copy对象
		 * 参数：无
		 * 返回：无
		 */
		var zwork = function(){
			
		};
		
		//注册给window，提供俩个调用变量。
		window.$ui = window.zwork = zwork;
		
		/**
		 * 初始化方法
		 * 参数：配置内容（json对象）
		 * 返回：无
		 * */
		$ui.init = function(_config){
			
			//定义默认的config样例
			var config = {
				debug : false
			};
			
			//设置用户自定义config
			$.extend(config,_config);
			
			//处理config
			$ui.config.init(config);
			$ui.debug("zwork.init() 初始化zwork config对象完毕");
			
			$ui.debug("zwork.init() 结束");
			$ui.debug("当前版本 " + $ui.version);
			
		};

		//版本
		$ui.version = "1.1.6";
		
	})();
	
})(jQuery);