/* !
 * file : zwork.config
 * author : 赵振华
 * 	配置对象，定义zwork框架中一些默认配置，用户可以根据自己的需要对config进行修改。
 */

(function($ui,$){
	 
	/**
	 * zwork配置对象
	 * */
	$ui.config = {
		/**
		 * 初始化config对象
		 * 参数	配置内容（json对象）
		 * 返回	无
		 * */
		init : function(_config){
			$.extend(this,_config);
			$ui.debug("zwork.config.init() config处理完毕");
		},
		
		//是否启用debug模式	布尔值	可选值：true|false
		debug : false,
		
		ajax_animate : true,	//是否开始加载等待动画
		
		systab : "#systab",	//系统默认会寻找的tab，接受一个css选择器
			
		close_default_contextmenu : true
	};
	
})(zwork,jQuery);
