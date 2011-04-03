/* !
 * file : zwork.messager
 * extend : zwork.window
 * author : 赵振华
 * 	对话框对象，继承自window。
 */

(function($ui,$){
	
	/**
	 * messager实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var messager = function(_config,_parent){
		var obj = new messager.messager(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * messager对象
	 * */
	messager.messager = function(_config){
		$ui.extend(this,$ui.window(_config));	//继承zwork.window
		
		//配置对象
		var config = {
			id : undefined,
			title : "弹出消息",
			msgContent :"",
			container : $("body"),
			callback:undefined,
			width:400,
			height:200,
			minable : false,
			maxable : false,
			resizable : false,
			scroll : false,
			content : undefined, //接受纯文本或者html的内容
			mask:true,
			msgType:"alert",
			
			type : "messager"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			
			_this.content($ui.html.messager);

			_this.title(config.title);
			_this.top((_this.container().height() - _this.config.height)/2);
			_this.left((_this.container().width() - _this.config.width)/2);
			
			var contentdiv = _this.jqobj.obj.find(".zwork-messager .msg");
			var bardiv = _this.jqobj.obj.find(".zwork-messager .bar");
			var ok = $("#ok",bardiv);
			ok.click(function(){
				if(config.callback != undefined){
					config.callback();
				}
				_this.close();
			});
			var cancel = $("#cancel",bardiv);
			if(_this.config.msgType == "alert"){
				cancel.hide();
			}else{
				cancel.click(function(){
					_this.close();
				});
			}
			
			var contentHeight = _this.jqobj.center_content.height() - bardiv.height();
			contentdiv.height(contentHeight);
			contentdiv.html(config.msgContent);
			
		});
		
	};
	
	/**
	 * 弹出框
	 * 参数	内容（字符串）
	 * 		标题（字符串）
	 * 		配置（json）
	 * 返回	无
	 * */
	messager.alert = function(_content,_title,_config){
		var config = {
			msgType : "alert"
		};
		config.msgContent = _content;
		if(_title != undefined)
			config.title = _title;
		$.extend(config, _config);
		$ui.messager(config).show();
	};
	
	/**
	 * 确认框
	 * 参数	内容（字符串）
	 * 		回调函数（方法）
	 * 		标题（字符串）
	 * 		配置（json）
	 * 返回	无
	 * */
	messager.confirm = function(_content,_callback,_title,_config){
		var config = {
			msgType : "confirm"
		};
		config.msgContent = _content;
		if(_title != undefined)
			config.title = _title;
		config.callback = _callback;
		$.extend(config, _config);
		$ui.messager(config).show();
	};
	
	//注册到zwork
	$ui.messager = messager;
	
})(zwork,jQuery);