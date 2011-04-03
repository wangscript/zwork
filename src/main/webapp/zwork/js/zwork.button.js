/* !
 * file : zwork.button
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($ui,$){
	
	/**
	 * button实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var button = function(_config,_parent){
		var obj = new button.button(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * button对象
	 * */
	button.button = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			label : "按钮",	//按钮显示的文字
			width : 100,	//宽度
			fitWidth : true,	//是否根据文字的宽度自适应宽度	可选值：true|false
			click : undefined,	//点击时出发的事件
			action : "button",	//按钮的类型	可选值：button|submit|reset
			position : "right",	//位置	可选值：right|left
			active : false,	//是否是活动的
			
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.label(config.label);
			_this.fitWidth(config.fitWidth);
			_this.width(config.width);
			_this.click(config.click);
			_this.action(config.action);
			_this.position(config.position);
			_this.active(config.active);
			
			var current = _this;
			jqobj.obj.click(function(){
				if(config.action == "button"){
					if(config.click != undefined){
						eval(config.click);
					}
				}else if(config.action == "submit"){
					jqobj.obj.parents("form").get(0).submit();
				}else if(config.action == "reset"){
					jqobj.obj.parents("form").get(0).reset();
				}
			}).mouseoverout("zwork-button_hover");
		});
		
		var jqobj ={
			obj : undefined,
			left : undefined,
			center:undefined,
			right:undefined
		};
		this.jqobj = jqobj;
		
		var initjqobj = function(){
			jqobj.obj = $($ui.html.button);
			jqobj.left = jqobj.obj.children(".left");
			jqobj.center = jqobj.obj.children(".center");
			jqobj.right = jqobj.obj.children(".right");
			return this;
		};
		this.initjqobj = initjqobj;
		
		var clearjqobj = function(){
			jqobj.obj = undefined;
			jqobj.left = undefined;
			jqobj.center = undefined;
			jqobj.right = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		var label = function(_label){
			if(_label == undefined){
				return config.label;
			}else{
				config.label = _label;
				if(jqobj.obj != undefined){
					jqobj.center.html(_label);
					this.width(config.width);
				}
				return this;
			}
		};
		this.label = label;
		
		var setWidth = function(_width){
			if(config.fitWidth){
				jqobj.obj.width(10000);
				var center_width = jqobj.center.width();
				var width = center_width + jqobj.left.width() + jqobj.right.width();
				jqobj.obj.width(width);
			}else{
				var temp = _width;
				if((config.width+"").indexOf("%") > 0){
					var w = Number((config.width+"").replace("%",""));
					temp = this.container().width()*(w/100);
				}
				jqobj.obj.width(temp);
				jqobj.center.width(temp - jqobj.left.width() - jqobj.right.width());
			}
		};
		this.setWidth = setWidth;
		
		var fitWidth = function(_fitWidth){
			if(_fitWidth == undefined){
				return config.fitWidth;
			}else{
				config.fitWidth = _fitWidth;
				this.width(config.width);
				return this;
			}
		};
		this.fitWidth = fitWidth;
		
		var click = function(_click){
			if(_click == undefined){
				return config.click;
			}else{
				config.click = _click;
				return this;
			}
		};
		this.click = click;
		
		var action = function(_action){
			if(_action == undefined){
				return config.action;
			}else{
				config.action = _action;
				return this;
			}
		};
		this.action = action;
		
		var position = function(_position){
			if(_position == undefined){
				return config.position;
			}else{
				config.position = _position;
				if(jqobj.obj != undefined){
					jqobj.obj.css("float",_position);
				}
				return this;
			}
		};
		this.position = position;
		
		var active = function(_active){
			if(_active == undefined){
				return config.active;
			}else{
				config.active = _active;
				if(jqobj.obj != undefined){
					if(config.active){
						jqobj.obj.addClass("zwork-button_active");
					}else{
						jqobj.obj.removeClass("zwork-button_active");
					}
				}
				return this;
			}
		};
		this.active = active;
		
	};
	
	//注册到zwork
	$ui.button = button;
	
})(zwork,jQuery);