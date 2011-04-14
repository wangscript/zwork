/* !
 * file : zwork.link
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($ui,$){
	
	/**
	 * link实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var link = function(_config,_parent){
		var obj = new link.link(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * link对象
	 * */
	link.link = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			label : "快捷方式",	//按钮显示的文字
			ico:undefined,
			
			original : undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.label(config.label);
			_this.ico(config.ico);
			_this.position();
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			ico:undefined,
			label:undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			var _this = this;
			if(config.original == undefined){
				jqobj.obj = $($ui.html.link);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($ui.html.link).html());
			}
			
			jqobj.obj.addClass("zwork-link");
			
			//设置它在容器内的索引值
			var index = _this.container().data("index");
			if(index == undefined)index=0;
			jqobj.obj.data("index",index);
			index++;
			_this.container().data("index",index);
			
			//鼠标动画
			jqobj.obj.mouseoverout("zwork-link_hover")
			.draggable({
				containment: _this.container()
			}).dblclick(function(){
				alert("----");
			});
			
			jqobj.ico = jqobj.obj.children(".link_ico");
			jqobj.label = jqobj.obj.children(".link_label");

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
			jqobj.ico = undefined;
			jqobj.label = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		/**
		 * 设置或返回按钮上显示的文字
		 * 参数	无或文字（字符串）
		 * 返回	当前对象（对象）或按钮文字（字符串）
		 * */
		var label = function(_label){
			if(_label == undefined){
				return config.label;
			}else{
				config.label = _label;
				if(jqobj.obj != undefined){
					jqobj.label.html(_label);
				}
				return this;
			}
		};
		this.label = label;
		
		this.ico = function(_ico){
			if(_ico== undefined){
				return config.ico;
			}else{
				config.ico = _ico;
				if(jqobj.obj!=undefined){
					jqobj.ico.children("img").attr("src",_ico);
				}
				return this;
			}
		};
		
		this.position = function(){
			var _this = this;
			
			if(jqobj.obj!=undefined){
				var i = jqobj.obj.data("index");
				
				var ctn = _this.container();
				var ch = ctn.height();
				var cw = ctn.width();
				var h = jqobj.obj.height();
				var w = jqobj.obj.width();
				
				var ynum = Math.floor(ch/h);
				y = i%ynum;
				x = Math.floor(i/ynum);
				_this.top(h*y);
				_this.left(w*x);
				
			}
		};
		
		var resizEvent = function(){
			this.position();
		};
		this.resizEvent = resizEvent;
		
		
	};
	
	//注册到zwork
	$ui.link = link;
	
})(zwork,jQuery);