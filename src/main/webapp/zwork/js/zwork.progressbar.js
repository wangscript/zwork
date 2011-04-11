/* !
 * file : zwork.progressbar
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
	var progressbar = function(_config,_parent){
		var obj = new progressbar.progressbar(_config);
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
	progressbar.progressbar = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			height : 15,	//按钮显示的文字
			width : 200,	//宽度
			value: 0,
			maxValue : 100,
			
			original : undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			value : undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			if(config.original == undefined){
				jqobj.obj = $($ui.html.progressbar);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($ui.html.progressbar).html());
			}
			jqobj.obj.addClass("zwork-progressbar");
			
			jqobj.value = jqobj.obj.children(".progressbar_value");
			return this;
		};
		this.initjqobj = initjqobj;
		
		/**
		 * 清除jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var clearjqobj = function(){
			jqobj.obj = undefined;
			jqobj.value = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		var setWidth = function(_width){
			jqobj.obj.width(_width);
			this.value(config.value);
		};
		this.setWidth = setWidth;
		
		var setHeight = function(_height){
			jqobj.obj.height(_height);
			jqobj.value.height(_height);
			this.value(config.value);
		};
		this.setHeight = setHeight;
		
		var value = function(_value){
			if(_value == undefined){
				return config.value;
			}else{
				if(_value > config.maxValue){_value = config.maxValue;};
				if(_value < 0){_value = 0;}
				config.value = _value;
				if(jqobj.obj!=undefined)
					jqobj.value.width(jqobj.obj.width()*(_value/config.maxValue));
				return this;
			}
		};
		this.value = value;
		
		var maxValue = function(_maxValue){
			if(_maxValue == undefined){
				return config.maxValue;
			}else{
				config.maxValue = _maxValue;
				this.value(config.value);
				return this;
			}
		};
		this.maxValue = maxValue;
		
	};
	
	//注册到zwork
	$ui.progressbar = progressbar;
	
})(zwork,jQuery);