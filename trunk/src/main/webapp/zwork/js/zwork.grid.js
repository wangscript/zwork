/* !
 * file : zwork.grid
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($ui,$){
	
	/**
	 * grid实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var grid = function(_config,_parent){
		var obj = new grid.grid(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * grid对象
	 * */
	grid.grid = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			
			width:"100%",
			height:"100%",
			
			toolbar:undefined,
			content:undefined,
			
			original : undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.toolbar(config.toolbar);
			_this.content(config.content);
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			toolbar:undefined,
			content:undefined,
			footbar:undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			if(config.original == undefined){
				jqobj.obj = $($ui.html.grid);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($ui.html.grid).html());
			}
			jqobj.obj.addClass("zwork-grid");

			jqobj.toolbar = jqobj.obj.children(".grid_toolbar");
			jqobj.content = jqobj.obj.children(".grid_content");
			jqobj.footbar = jqobj.obj.children(".grid_footbar");
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
			
			jqobj.toolbar = undefined;
			jqobj.content = undefined;
			jqobj.footbar = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		this.content = function(_content){
			if(_content == undefined){
				return config.content;
			}else{
				config.content = _content;
				if(jqobj.obj!=undefined){
					jqobj.content.html(_content);
				}
				return this;
			}
		};
		
		this.toolbar = function(_toolbar){
			var _this = this;
			if(_toolbar == undefined){
				return config.toolbar;
			}else{
				config.toolbar = _toolbar;
				if(jqobj.obj!=undefined){
					jqobj.toolbar.html(_toolbar);
					$ui(jqobj.toolbar,_this);
				}
				return this;
			}
		};
		
		this.setWidth = function(_width){
			var x = jqobj.obj.box().x;
			_width = _width - x;
			jqobj.obj.width(_width);
		};
		
		this.setHeight = function(_height){
			_height = _height - jqobj.obj.box().y;
			jqobj.obj.height(_height);
			jqobj.content.height(_height - jqobj.toolbar.height() - jqobj.footbar.height());
		};
		
		var resizEvent = function(){
			this.height(config.height);
			this.width(config.width);
		};
		this.resizEvent = resizEvent;
		
	};
	
	//注册到zwork
	$ui.grid = grid;
	
})(zwork,jQuery);