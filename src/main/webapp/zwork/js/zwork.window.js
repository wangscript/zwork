/* !
 * file : zwork.window
 * extend : zwork.view
 * author : 赵振华
 * 	窗口容器
 */

(function($,$ui){
	
	/**
	 * window实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var window = function(_config,_parent){
		var obj = new window.window(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * window对象
	 * */
	window.window = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			title:"无标题窗口",
			container : $("body"),	//窗口所在的容器
			containerStyle:undefined,	//容器的样式
			src : undefined,	//请求的页面地址
			content : undefined, //接受纯文本或者html的内容
			
			top:0,	//顶位移
			left:0,	//左位移
			width:400,	//高度
			height:300,	//宽度
			
			maxable:true,	//可否被最大化
			minable:true,	//是否可以最小化
			resizable:true,	//是否可以重置大小
			scroll:true,	//是否出现滚动条
			
			minHeight: 150,	//最小的宽度
			minWidth: 150,	//最小的高度
			maxHeight: undefined,	//最大的宽度
			maxWidth: undefined,	//最大的高度
			
			mask : false,	//是否启用模态窗口
			iframe:false,	//是否启用iframe框架
			
			zindex:0,
			
			animate : true,	//是否开启动画
			animateType:"spread",	//动画方式
			taskbarid: undefined,	//它所属的task的id
			
			topTemp:0,	//顶位移-临时的
			leftTemp:0,	//左位移-临时的
			widthTemp:0,	//高度-临时的
			heightTemp:0,	//宽度-临时的
			
			maxed:false,	//当前是不是最大化
			mined:false,	//当前是不是最小化
			closed:true,	//当前是不是被关闭了
			
			type : "window"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//jqobj对象
		var jqobj = {
			obj:undefined,
			top:undefined,
			top_border:undefined,
			top_border_left:undefined,
			top_border_center:undefined,
			top_border_right:undefined,
			top_titlebar:undefined,
			top_titlebar_ico:undefined,
			top_titlebar_title:undefined,
			top_titlebar_buttons:undefined,
			top_titlebar_buttons_close:undefined,
			top_titlebar_buttons_maxre:undefined,
			top_titlebar_buttons_min:undefined,
			center:undefined,
			center_loading:undefined,
			center_leftborder:undefined,
			center_content:undefined,
			center_scroll:undefined,
			center_rightborder:undefined,
			bottom:undefined,
			bottom_border:undefined,
			bottom_border_left:undefined,
			bottom_border_center:undefined,
			bottom_border_right:undefined,
			bottom_statebar:undefined,
			ui_resizable_e:undefined,
			ui_resizable_s:undefined,
			ui_resizable_se:undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	无
		 * */
		var initjqobj = function(){
			jqobj.obj = $($ui.html.window);
			jqobj.obj.data("uid",this.uid);
			jqobj.top = jqobj.obj.children(".top");
			jqobj.top_border = jqobj.top.children(".border");
			jqobj.top_border_left = jqobj.top_border.children(".left");
			jqobj.top_border_center = jqobj.top_border.children(".center");
			jqobj.top_border_right = jqobj.top_border.children(".right");
			jqobj.top_titlebar = jqobj.top.children(".titlebar");
			jqobj.top_titlebar_ico = jqobj.top_titlebar.children(".ico");
			jqobj.top_titlebar_title = jqobj.top_titlebar.children(".title");
			jqobj.top_titlebar_buttons = jqobj.top_titlebar.children(".buttons");
			jqobj.top_titlebar_buttons_close = jqobj.top_titlebar_buttons.children(".close");
			jqobj.top_titlebar_buttons_close.mouseoverout("close_hover");
			jqobj.top_titlebar_buttons_maxre = jqobj.top_titlebar_buttons.children(".maxre");
			jqobj.top_titlebar_buttons_maxre.mouseoverout("maxre_hover");
			jqobj.top_titlebar_buttons_min = jqobj.top_titlebar_buttons.children(".min");
			jqobj.top_titlebar_buttons_min.mouseoverout("min_hover");
			jqobj.center = jqobj.obj.children(".center");
			jqobj.center_leftborder = jqobj.center.children(".leftborder");
			jqobj.center_loading = jqobj.center.children(".loading");
			jqobj.center_content = jqobj.center.children(".content");
			jqobj.center_scroll = jqobj.center.children(".scroll");
			jqobj.center_rightborder = jqobj.center.children(".rightborder");
			jqobj.bottom = jqobj.obj.children(".bottom");
			jqobj.bottom_border = jqobj.bottom.children(".border");
			jqobj.bottom_border_left = jqobj.bottom_border.children(".left");
			jqobj.bottom_border_center = jqobj.bottom_border.children(".center");
			jqobj.bottom_border_right = jqobj.bottom_border.children(".right");
			jqobj.bottom_statebar = jqobj.bottom.children(".statebar");
		};
		this.initjqobj = initjqobj;
		
		/**
		 * 在init执行时回调函数
		 * 参数	init回调时传参，参数为当前对象
		 * 返回	无
		 * */
		this.initQueue.push(function(_this){
			
			//拖动事件
			jqobj.obj.draggable({
				start: function() {	//拖动开始
					if(!config.maxed){
						totop(_this);
						jqobj.center_loading.show();
					}
				},
				drag: function() {	//拖动中
					if(!config.maxed){
						_this.top(jqobj.obj[0].offsetTop);
						_this.left(jqobj.obj[0].offsetLeft);
					}else{return false;}
				},
				stop: function() {	//拖动停止
					if(!config.maxed){
						_this.top(jqobj.obj[0].offsetTop);
						_this.left(jqobj.obj[0].offsetLeft);
						jqobj.center_loading.hide();
					}
				},
				handle: jqobj.top,	//生效区域
				//containment: container(),
				//scroll:false,	//滚动条
				//snap:true,	//是否吸附
				opacity:0.8,
				cursor:"move"	//移动时鼠标样式
				
			})
			//点击窗口时，窗口置顶。
			.mousedown(function(){
				totop(_this);
			});
			
			//重置大小事件
			jqobj.obj.resizable({
				start: function() {	//开始
					if(config.resizable){
						totop(_this);
						jqobj.center_loading.show();
					}else{
						return false;
					}
				},
				resize: function() {	//设置大小中
					if(config.resizable){
						_this.width(jqobj.obj.width());
						_this.height(jqobj.obj.height());
					}else{
						return false;
					}
				},
				stop:function(){	//重置停止
					if(config.resizable){
						jqobj.center_loading.hide();
					}
				},
				minHeight: minHeight(),	//最小高度
				minWidth: minWidth(),	//最小宽度
				maxWidth : maxWidth(),	//最大宽度
				maxHeight : maxHeight()	//最大高度
			});
			
			//重置大小时感应区。
			jqobj.ui_resizable_e = jqobj.obj.find(".ui-resizable-e");
			jqobj.ui_resizable_s = jqobj.obj.find(".ui-resizable-s");
			jqobj.ui_resizable_se = jqobj.obj.find(".ui-resizable-se");
			
			//关闭按钮事件
			jqobj.top_titlebar_buttons_close.click(function(){close(_this);});
			
			//最大化按钮点击事件
			jqobj.top_titlebar_buttons_maxre.click(function(){
				if(config.maxed){
					re(_this);
				}else{
					max(_this);
				}
			});
			
			//标题栏双击事件
			jqobj.top_titlebar.dblclick(function(){
				if(config.maxed){
					re(_this);
				}else{
					max(_this);
				}
			});
			
			//最小化按钮点击事件
			jqobj.top_titlebar_buttons_min.click(function(){min(_this);});
			
			//默认置顶
			totop(_this);
			
			//调整状态不是为已经关闭
			config.closed = false;
			_this.zindex(_this.config.zindex);	//设置z轴
			_this.title(_this.config.title);	//设置标题
			_this.iframe(_this.config.iframe);	//设置iframe
			_this.src(_this.config.src);	//加载url
			_this.mask(_this.config.mask);	//模态
			_this.content(_this.config.content);	//静态内容
			
			_this.maxable(_this.config.maxable);
			_this.minable(_this.config.minable);
			_this.resizable(_this.config.resizable);
			_this.scroll(_this.config.scroll);
			
		});
		
		/**
		 * 设置或返回静态内容
		 * 参数	内容（字符串）
		 * 返回	内容（字符串）或当前对象（对象）
		 * */
		var content = function(_content){
			if(_content == undefined){
				return jqobj.center_content.html();
			}else{
				this.config.content = _content;
				if(jqobj.obj != undefined){
					jqobj.center_content.html(_content);
				}
				return this;
			}
		};
		this.content = content;
		
		/**
		 * 设置或返回是否模态
		 * 参数	是否模态（布尔值）
		 * 返回	是否模态（布尔值）或当前对象（对象）
		 * */
		var mask = function(_mask){
			if(_mask == undefined){
				return config.mask;
			}else{
				config.mask = _mask;
				if(config.mask && jqobj.obj != undefined){
					var maskObj = $($ui.html.mask);
					maskObj.attr("uid",this.uid).appendTo($("body"));
					
					var ctn = this.container();
					ctn.resizEvent("mask_resiz",function(_c){
						maskObj.width(ctn.width());
						maskObj.height(ctn.height());
					});
					
					var mask_index = this.container().data("mask_index");
					if(mask_index == undefined){
						mask_index = 1000000;
					}
					mask_index ++;
					this.container().data("mask_index",mask_index);
					maskObj.css("z-index",mask_index - 1);
					jqobj.obj.appendTo($("body")).css("z-index",mask_index);;
					minable(false);
				}
				return this;
			}
		};
		this.mask = mask;
		
		/**
		 * 设置或返回是否启用iframe
		 * 参数	是否启用iframe（布尔值）
		 * 返回	是否启用iframe（布尔值）或当前对象（对象）
		 * */
		var iframe = function(_iframe){
			if(_iframe != undefined){
				config.iframe = _iframe;
				if(jqobj.obj != undefined){
					jqobj.center_content.children("iframe").remove();
					if(config.iframe){
						jqobj.center_content.append("<iframe width='100%' height='100%' frameborder='0'></iframe>");
					}
				}
				return this;
			}else{
				return config.iframe;
			}
		};
		this.iframe = iframe;
		
		/**
		 * 设置或返回页面地址
		 * 参数	页面地址（字符串）
		 * 返回	页面地址（字符串）或当前对象（对象）
		 * */
		var src = function(_src){
			if(_src == undefined){
				return config.src;
			}else{
				config.src = _src;
				if(jqobj.obj != undefined){
					if(config.iframe){
						jqobj.center_content.children("iframe").attr("src",config.src);
					}else{
						jqobj.center_content.load(config.src);
					}
				}
				return this;
			}
		};
		this.src = src;
		
		/**
		 * 设置或返回标题
		 * 参数	标题（字符串）
		 * 返回	标题（字符串）或当前对象（对象）
		 * */
		var title = function(_title){
			if(_title != undefined){
				config.title = _title;
				if(jqobj.obj!=undefined){
					jqobj.top_titlebar_title.html(config.title);
				}
				return this;
			}else{
				return config.title;
			}
		};
		this.title = title;
		
		/**
		 * 设置高度，被height()回调
		 * 参数	高度（字符串或数字）
		 * 返回	无
		 * */
		var setHeight = function(_height){
			var temp = _height;
			if((config.height+"").indexOf("%") > 0){
				var h = Number((config.height+"").replace("%",""));
				temp = this.container().height()*(h/100);
			}
			jqobj.obj.height(temp);
			var centerHeight = jqobj.obj.height() - jqobj.top.height() - jqobj.bottom.height();
			jqobj.center.height(centerHeight);
			jqobj.center_content.height(centerHeight);
			jqobj.center_leftborder.height(centerHeight);
			jqobj.center_rightborder.height(centerHeight);
			jqobj.center_scroll.height(centerHeight);
			
			jqobj.center_loading.height(jqobj.center_content.height());
		};
		this.setHeight = setHeight;
		
		/**
		 * 设置宽度，被width()回调
		 * 参数	宽度（字符串或数字）
		 * 返回	无
		 * */
		var setWidth = function(_width){
			var temp = _width;
			if((config.width+"").indexOf("%") > 0){
				var w = Number((config.width+"").replace("%",""));
				temp = this.container().width()*(w/100);
			}
			jqobj.obj.width(temp);
			var tempWidth = jqobj.obj.width();
			jqobj.top_border_center.width(tempWidth - jqobj.top_border_left.width() - jqobj.top_border_right.width());
			jqobj.bottom_border_center.width(tempWidth - jqobj.bottom_border_left.width() - jqobj.bottom_border_right.width());
			jqobj.center_content.width(tempWidth - jqobj.center_leftborder.width()
					- jqobj.center_rightborder.width() - jqobj.center_scroll.width());
			jqobj.top_titlebar_title.width(tempWidth - jqobj.top_titlebar_buttons.width() - jqobj.top_titlebar_ico.width());
			
			
			jqobj.center_loading.width(jqobj.center_content.width())
			.css("left",jqobj.center_leftborder.width()).css("top",0);
		};
		this.setWidth = setWidth;
		
		/**
		 * 设置或者返回最小高度
		 * 参数	最小高度（字符串或数字）或无
		 * 返回	最小高度或当前对象
		 * */
		var minHeight = function(_minHeight){
			if(_minHeight == undefined){
				return config.minHeight;
			}else{
				config.minHeight = _minHeight;
				return this;
			}
		};
		this.minHeight = minHeight;
		
		/**
		 * 设置或者返回最小宽度
		 * 参数	最小宽度（字符串或数字）或无
		 * 返回	最小宽度或当前对象
		 * */
		var minWidth = function(_minWidth){
			if(_minWidth == undefined){
				return config.minWidth;
			}else{
				config.minWidth = _minWidth;
				return this;
			}
		};
		this.minWidth = minWidth;
		
		/**
		 * 设置或者返回最大高度
		 * 参数	最大高度（字符串或数字）或无
		 * 返回	最大高度或当前对象
		 * */
		var maxHeight = function(_maxHeight){
			if(_maxHeight == undefined){
				return config.maxHeight;
			}else{
				config.maxHeight = _maxHeight;
				return this;
			}
		};
		this.maxHeight = maxHeight;
		
		/**
		 * 设置或者返回最大宽度
		 * 参数	最大宽度（字符串或数字）或无
		 * 返回	最大宽度或当前对象
		 * */
		var maxWidth = function(_maxWidth){
			if(_maxWidth == undefined){
				return config.maxWidth;
			}else{
				config.maxWidth = _maxWidth;
				return this;
			}
		};
		this.maxWidth = maxWidth;
		
		/**
		 * 设置到顶层
		 * 参数	当前对象（对象）或无
		 * 返回	当前对象
		 * */
		var totop = function(_this){
			var obj = _this || this;
			if(obj.type() != "messager"){
				var windows = obj.container().children(".zwork-window");
				windows.each(function(){
					$(this).find(".loading").show();
				});
				jqobj.center_loading.hide();
				
				var containerHigh = obj.container().data("containerHigh");
				if(containerHigh == undefined){
					containerHigh = 0;
					obj.zindex(containerHigh + 1);
				}
				if(!istop(obj)){
					containerHigh ++;
					obj.zindex(containerHigh);
					obj.container().data("containerHigh",containerHigh);
				}
			}
			return obj;
			
		};
		this.totop = totop;
		
		/**
		 * 当前对象是否是最高
		 * 参数	当前对象（对象）或无
		 * 返回	是否是最高（布尔值）
		 * */
		var istop = function(_this){
			var obj = _this || this;
			var containerHigh = obj.container().data("containerHigh");
			if(containerHigh == undefined){
				containerHigh = 0;
			}
			var currentHigh = obj.zindex();
			if(currentHigh == containerHigh){
				return true;
			}else{
				return false;
			}
		};
		this.istop = istop;
		
		/**
		 * 查找最高的窗口
		 * 参数	无
		 * 返回	窗口对象（对象）
		 * */
		var findtop = function(){
			
			var t = 0;
			var topWindow = undefined;
			var ctn = this.container;
			var windows = $(".zwork-window",ctn);
			windows.each(function(){
				var index = $(this).css("z-index");
				if(index > t){
					t = index;
					topWindow = $(this);
				}
			});
			return $ui.find(topWindow);
		};
		this.findtop = findtop;
		
		/**
		 * 关闭窗口
		 * 参数	当前对象（对象）或无
		 * 返回	当前对象
		 * */
		var close = function(_this){
			var obj = _this ||this;
			
			if(config.mask){
				$("div[uid='"+obj.uid+"']",$("body")).remove();
			}
			
			obj.hide();
			var targetObj = findtop();
			if(targetObj != undefined){
				obj.container().data("containerHigh",targetObj.zindex());
				targetObj.totop();
			}
			
			config.closed = true;
			return obj;
		};
		this.close = close;
		
		/**
		 * 窗口最大化
		 * 参数	当前对象（对象）或无
		 * 返回	当前对象
		 * */
		var max = function(_this){
			var obj = _this || this;
			if(jqobj.obj != undefined && config.maxable){
				config.widthTemp = obj.width();
				config.heightTemp = obj.height();
				config.topTemp = obj.top();
				config.leftTemp = obj.left();
				
				obj.left(0);
				obj.top(0);
				obj.width(obj.container().width());
				obj.height(obj.container().height());
				
				jqobj.ui_resizable_e.hide();
				jqobj.ui_resizable_s.hide();
				jqobj.ui_resizable_se.hide();
				
				config.maxed = true;
			}
			return obj;
		};
		this.max = max;
		
		/**
		 * 窗口最小化
		 * 参数	当前对象（对象）或无
		 * 返回	当前对象
		 * */
		var min = function(_this){
			var obj = _this || this;
			if(jqobj.obj != undefined && config.minable){
				jqobj.obj.hide();
				config.mined = true;
			}
			return obj;
		};
		this.min = min;
		
		/**
		 * 还原窗口
		 * 参数	当前对象（对象）或无
		 * 返回	当前对象
		 * */
		var re = function(_this){
			var obj = _this || this;
			if(jqobj.obj != undefined){
				if(config.mined){
					jqobj.obj.hide();
					config.mined = false;
				}else if (config.maxed){
					obj.top(config.topTemp);
					obj.left(config.leftTemp);
					obj.width(config.widthTemp);
					obj.height(config.heightTemp);

					if(config.resizable){
						jqobj.ui_resizable_e.show();
						jqobj.ui_resizable_s.show();
						jqobj.ui_resizable_se.show();
					}
					
					config.maxed = false;
				}
			}
			return obj;
		};
		this.re = re;
		
		/**
		 * 是否允许最小化
		 * 参数	是否允许（布尔值）
		 * 返回	当前对象（对象）或是否允许（布尔值）
		 * */
		var minable = function(_minable){
			if(_minable!=undefined){
				config.minable = _minable;
				if(jqobj.obj !=undefined){
					if(_minable){
						jqobj.top_titlebar_buttons_min.removeClass("disabled");	//添加不可最小化样式
					}else{
						jqobj.top_titlebar_buttons_min.addClass("disabled");	//添加不可最小化样式
					}
				}
				return this;
			}else{
				return config.minable;
			}
		};
		this.minable = minable;
		
		/**
		 * 是否允许最大化
		 * 参数	是否允许（布尔值）
		 * 返回	当前对象（对象）或是否允许（布尔值）
		 * */
		var maxable = function(_maxable){	//是否最大化
			if(_maxable!=undefined){
				config.maxable = _maxable;
				if(jqobj.obj != undefined){
					if(config.maxable){
						jqobj.top_titlebar_buttons_maxre.removeClass("disabled");	//添加不可最大化样式
					}else{
						jqobj.top_titlebar_buttons_maxre.addClass("disabled");	//添加不可最大化样式
					}
				}
				return this;
			}else{
				return config.maxable;
			}
		};
		this.maxable = maxable;
		
		/**
		 * 是否允许重置大小
		 * 参数	是否允许（布尔值）
		 * 返回	当前对象（对象）或是否允许（布尔值）
		 * */
		var resizable = function(_resizable){
			if(_resizable == undefined){
				return config.resizable;
			}else{
				config.resizable = _resizable;
				if(jqobj.obj != undefined){
					if(config.resizable){
						jqobj.ui_resizable_e.show();
						jqobj.ui_resizable_s.show();
						jqobj.ui_resizable_se.show();
						maxable(true);
					}else{
						jqobj.ui_resizable_e.hide();
						jqobj.ui_resizable_s.hide();
						jqobj.ui_resizable_se.hide();
						maxable(false);
					}
				}
				return this;
			}
		};
		this.resizable = resizable;
		
		/**
		 * 是否允许出现滚动条
		 * 参数	是否允许（布尔值）
		 * 返回	当前对象（对象）或是否允许（布尔值）
		 * */
		var scroll = function(_scroll){
			if(_scroll == undefined){
				return config.scroll;
			}else{
				config.scroll = _scroll;
				if(jqobj.obj != undefined){
					if(config.scroll){
						if(config.iframe){
							jqobj.center_content.children("iframe").css("overflow","auto");
						}else{
							jqobj.center_content.css("overflow","auto");
						}
						
					}else{
						if(config.iframe){
							jqobj.center_content.children("iframe").css("overflow","hidden");
						}else{
							jqobj.center_content.css("overflow","hidden");
						}
					}
				}
				return this;
			}
		};
		this.scroll = scroll;
		
	};
	
	$ui.window = window;
	
})(jQuery,zwork);