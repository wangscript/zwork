/* !
 * file : zwork.dialog
 * extend : zwork.window
 * author : 赵振华
 * 	对话框对象，继承自window。
 */

(function($ui,$){
	
	/**
	 * dialog实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var dialog = function(_config,_parent){
		var obj = new dialog.dialog(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * dialog对象
	 * */
	dialog.dialog = function(_config){
		
		$ui.extend(this,$ui.window(_config));	//继承zwork.window
		
		var config = {
			id : undefined,
			title : "无标题对话框",
			minable : false,
			
			className : new Array(),	//用户自定义的样式名
			type : "dialog"
		};
		this.config = config;
		$.extend(this.config, _config);
		
	};
	
	//注册到zwork
	$ui.dialog = dialog;
	
})(zwork,jQuery);