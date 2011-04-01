/* !
 * file : zwork.listener
 * author : 赵振华
 * 	监听器，对html的监听，从而实现了html扩展。
 */

(function($ui,$){
	
	/**
	 * 监听器
	 * */
	var listener = (function(){
		
		/**
		 * 监听器拷贝
		 * 参数	被处理对象
		 * */
		var listener = function(_container,_parent){
			if(_parent == undefined){
				_parent == $ui.memory.tree.root;
			}
			
			listener.map.call(function(fn,key){
				if(listener.disabled.length > 0){
					var has = false;
					for(i in listener.disabled){
						if(listener.disabled[i] == key){
							has = true;
						}
					}
					if(!has){
						fn(_container,_parent);
					}
				}else{
					fn(_container,_parent);
				}
				
			});
		};
		
		/**
		 * 添加一个监听器，如果name重复，那么覆盖原有值。
		 * 参数	监听器名称（字符串）
		 * 		监听方法（方法）
		 * 返回	无
		 * */
		listener.add = function(_name,_fn){
			listener.map.put(_name,_fn);
		};
		
		/**
		 * 设置监听器状态
		 * 参数	监听器名称或者名称列表（字符串或Array）
		 * 		状态（字符串）	可选值：disable|able，默认值：disable
		 * 返回	无
		 * */
		listener.state = function(_name,_action){
			if(_action == undefined || _action == "disable"){
				var has = false;
				for(i in listener.disabled){
					if(_name == listener.disabled[i]){
						has = true;
					}
				}
				if(!has){
					listener.disabled.push(_name);
				}
			}else if(_action == "able"){
				for(i in listener.disabled){
					if(_name == listener.disabled[i]){
						listener.disabled[i] == undefined;
						delete listener.disabled[i];
					}
				}
			}
		};
		
		//禁用的监听器列表
		listener.disabled = new Array();
		//监听器列表
		listener.map = new $ui.hashmap();
		
		//添加默认监听
		listener.add("div_type_window",function(_c,_p){

			var list = _c.flc("window");
			for(i in list){
				var window = list[i];
				var config = {};
				config.container = window.parent();
				config.height = window.attr("height") || 400;
				config.width = window.attr("width") || 500;
				var zobj = $ui.window(config);
				if(window.attr("show") || window.attr("show") == "true"){
					zobj.show();
				}
			}
			
		});
		
		//注册给zwork
		$ui.listener = listener;
		
	})();
	
})(zwork,jQuery);