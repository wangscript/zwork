/* !
 * file : zwork.debug
 * author : 赵振华
 * 	调试模式管理器。
 */

(function($z,$){
	
	/**
	 * debug对象
	 * */
	var debug = (function(){
		
		/**
		 * 这个debug对象copy于debug，默认可以接受调试消息，并输出。
		 * 参数	调试信息（字符串）
		 * 		信息类型（字符串）	可选值：info|warn|error|exception
		 * 返回	无
		 * */
		var debug = function(_msg,_type){
			if($z.config.debug)
				alert(_msg);
		};
		
		//注册到zwork
		$z.debug = debug;
		
		/**
		 * 调试：提示信息
		 * 参数	调试信息（字符串）
		 * 返回	无
		 * */
		debug.info = function(_msg){
			if($z.config.debug)
				alert(_msg);
		};
		
		/**
		 * 调试：警告信息
		 * 参数	调试信息（字符串）
		 * 返回	无
		 * */
		debug.warn = function(_msg){
			if($z.config.debug)
				alert(_msg);
		};
		
		/**
		 * 调试：错误信息
		 * 参数	调试信息（字符串）
		 * 返回	无
		 * */
		debug.error = function(_msg){
			if($z.config.debug)
				alert(_msg);
		};
		
		/**
		 * 调试：异常信息
		 * 参数	调试信息（字符串）
		 * 返回	无
		 * */
		debug.exception = function(_msg){
			if($z.config.debug)
				alert(_msg);
		};
		
	})();
	
})(zwork,jQuery);