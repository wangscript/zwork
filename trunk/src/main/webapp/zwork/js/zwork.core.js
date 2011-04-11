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
		 * 参数	容器（对象）
		 * 		父级对象（对象）	默认值	memory的root。
		 * 返回：无
		 */
		var zwork = function(_container,_parent){
			zwork.listener(_container,_parent);
		};
		
		//注册给window，提供俩个调用变量。
		window.$ui = window.zwork = zwork;
		
		/**
		 * 初始化方法
		 * 参数：配置内容（json对象）
		 * 返回：无
		 * */
		zwork.init = function(_config){
			
			//定义默认的config样例
			var config = {
				debug : false,
				listen : undefined,
				ajax_animate:true
			};
			//设置用户自定义config
			$.extend(config,_config);
			//处理config
			$ui.config.init(config);
			
			if(config.ajax_animate)
				$ui.ajaxanimate.init();
			
			$ui.util.fitbody();
			$ui.util.close_default_contextmenu();	//关闭默认的右键菜单
			$ui.util.document_keypress();	//监听按键
			$ui.util.system_click_event();
			
			if(config.listen != undefined)
				$ui(config.listen);
			
			$ui.debug("当前版本 " + $ui.version);
			
		};
		
		/**
		 * 查找组件
		 * 参数：jQuery对象（对象）或内存uid（字符串）
		 * 返回：组件对象（对象）
		 * */
		zwork.find = function(_obj){
			if(_obj!=undefined){
				if(typeof _obj == "string"){
					return $ui.memory.tree.find(_obj);
				}else{
					var uid = _obj.data("uid");
					return $ui.memory.tree.find(uid);
				}
			}else{
				return undefined;
			}
		};

		//版本
		zwork.version = "1.1.6";
		
	})();
	
})(jQuery);