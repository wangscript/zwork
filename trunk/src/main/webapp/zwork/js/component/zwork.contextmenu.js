/* !
 * file : zwork.contextmenu
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($z,$){
	
	/**
	 * contextmenu实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var contextmenu = function(_config,_parent){
		var obj = new contextmenu.contextmenu(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$z.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * contextmenu对象
	 * */
	contextmenu.contextmenu = function(_config){
		$z.extend(this,new $z.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			items:new $z.hashmap(),
			/**
			 * item结构
			 * {
			 * 	mask:true	//如果为true，则这个item是一条线
			 * 	id:"_blank"	//id编号
			 * 	label:"菜单项"	//菜单标签
			 * 	fn:function(){}	//需要执行的方法
			 * 	children:map	//子菜单
			 * }
			 * */
			top:0,
			left:0,
			
			trigger:undefined,	//触发对象
			original : undefined,
			type : "contextmenu"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.items(config.items);
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			top : undefined,
			top_left : undefined,
			top_center : undefined,
			top_right : undefined,
			center:undefined,
			center_left : undefined,
			center_center : undefined,
			center_right : undefined,
			bottom:undefined,
			bottom_left : undefined,
			bottom_center : undefined,
			bottom_right : undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			jqobj.obj = $($z.html.contextmenu);
			jqobj.top = jqobj.obj.children(".contextmenu_top");
			jqobj.top_left = jqobj.top.children(".contextmenu_left");
			jqobj.top_center = jqobj.top.children(".contextmenu_center");
			jqobj.top_right = jqobj.top.children(".contextmenu_right");
			
			jqobj.center = jqobj.obj.children(".contextmenu_center");
			jqobj.center_left = jqobj.center.children(".contextmenu_left");
			jqobj.center_center = jqobj.center.children(".contextmenu_center");
			jqobj.center_right = jqobj.center.children(".contextmenu_right");
			
			jqobj.bottom = jqobj.obj.children(".contextmenu_bottom");
			jqobj.bottom_left = jqobj.bottom.children(".contextmenu_left");
			jqobj.bottom_center = jqobj.bottom.children(".contextmenu_center");
			jqobj.bottom_right = jqobj.bottom.children(".contextmenu_right");
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
			jqobj.top = undefined;
			jqobj.top_left = undefined;
			jqobj.top_center = undefined;
			jqobj.top_right = undefined;
			
			jqobj.center = undefined;
			jqobj.center_left = undefined;
			jqobj.center_center = undefined;
			jqobj.center_right =undefined;
			
			jqobj.bottom = undefined;
			jqobj.bottom_left = undefined;
			jqobj.bottom_center = undefined;
			jqobj.bottom_right = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		var items = function(_items){
			var _this = this;
			if(_items == undefined){
				return config.items;
			}else{
				config.items = _items;
				if(jqobj.obj != undefined){
					_items.call(function(_value,_key){
						_this.add(_value);
					});
				}
				return this;
			}
		};
		this.items = items;
		
		/**
		 * 添加一个菜单项
		 * 参数	菜单项（json）
		 * 返回	当前对象（对象）
		 * */
		var add = function(_item){
			var _this = this;
			if(_item != undefined){
				if(_item.id == undefined){
					_item.id = "_blank";
				}
				var id = _item.id;
				config.items.put(id,_item);
				
				if(jqobj.obj != undefined){
					
					if(_item.mark){	//如果只是一个分隔符
						var itemHtml = "<div class='contextmenu_mark'>" +
										"<div class='contextmenu_ico'></div>" +
										"<div class='contextmenu_label'></div>" +
										"<div class='contextmenu_more'></div>" +
									"</div>";
						var item = $(itemHtml);
						item.attr("id",id);
						jqobj.center_center.append(item);
					}else{	//如果是菜单项
						var itemHtml = "<div class='contextmenu_item'>" +
								"<div class='contextmenu_ico'></div>" +
								"<div class='contextmenu_label'></div>" +
								"<div class='contextmenu_more'></div>" +
								"</div>";
						var item = $(itemHtml);
						jqobj.center_center.append(item);
						item.attr("id",id);
						var label = item.children(".contextmenu_label");
						item.width(1000);
						label.width(10);
						var ico = item.children(".contextmenu_ico");
						var more = item.children(".contextmenu_more");
						
						//设置ico
						if(_item.ico!=undefined)
							ico.css("background-image",_item.ico);
						else{
							ico.css("background-image","");
						}
						
						//设置label
						if(_item.children == undefined)more.hide();
						label.html(_item.label);
						var rw = label[0].scrollWidth;
						label.width(rw);
						item.width(ico.box().width + label.width() + more.width());
						
						//子菜单
						var childrenMenu = undefined;
						if(_item.children != undefined){
							childrenMenu = $z.contextmenu({
								items:_item.children
							},_this);
						}

						//鼠标进过的事件
						item.mouseoverout("contextmenu_item_hover").bind("click",function(e){
							if(_item.fn!=undefined && _item.children == undefined){
								_item.fn(config.trigger);
								_this.hide();
							}
							return false;
						}).mouseover(function(e){
							var child = $z.find(_this.uid).children;
							if(child != undefined){
								child.call(function(obj){
									obj.hide();
								});
							}
							
							if(childrenMenu){
								var allitem = jqobj.center_center.children("div");
								var top = 0;
								for(var i=0; allitem.size();i++){
									var cur = allitem.eq(i);
									if(cur.attr("id") == id){
										break;
									}else{
										top = top + cur.box().height;
									}
								}
								childrenMenu.top(top + _this.top()).left(_this.left()+_this.width() - 6).show();
							}
							
						});
						
						
					}
					this.fitWidth();
				}
			}
			return _this;
		};
		this.add = add;
		
		var fitWidth = function(){
			//设置高度
			var allitem = jqobj.center_center.children(".contextmenu_item");
			var allmark = jqobj.center_center.children(".contextmenu_mark");
			
			var widthList = new Array();
			var allHeight = 0;
			allitem.each(function(){
				widthList.push($(this).width());
				var box = $(this).box();
				var height = $(this).height();
				allHeight = allHeight + box.marginY + box.paddingY + box.borderY + height;
			});
			allmark.each(function(){
				widthList.push($(this).width());
				var box = $(this).box();
				var height = $(this).height();
				allHeight = allHeight + box.marginY + box.paddingY + box.borderY + height;
			});
			this.height(allHeight);
			
			var maxWidth = 0;
			for(i in widthList){
				if(widthList[i] > maxWidth){
					maxWidth = widthList[i];
				}
			}
			this.width(maxWidth + jqobj.center_left.width() + jqobj.center_right.width());
		};
		this.fitWidth = fitWidth;
		
		var update = function(_item){
			var _this = this;
			if(_item!=undefined){
				var id = _item.id;
				var item = config.items.get(id);
				if(item!=undefined){
					$.extend(item,_item);
				};
			}
		};
		this.update = update;
		
		var remove = function(_id){
			this.config.items.remove(_id);
			if(jqobj.obj != undefined)
				jqobj.center_center.find("#"+_id).remove();
		};
		this.remove = remove;
		
		var size = function(){
			var size = 0;
			this.config.items.call(function(_value,_key){
				size++;
			});
			return size;
		};
		this.size = size;
		
		/**
		 * 设置或返回top偏移
		 * 参数	top值（数字）
		 * 返回	当前对象或top值（对象或数字）
		 * */
		var top = function(_top){
			if(_top != undefined){
				this.config.top = _top;
				if(this.jqobj.obj!=undefined){
					if(_top + jqobj.obj.height() > this.container().height()){
						_top = _top - jqobj.obj.height();
					}
					
					this.jqobj.obj.css("top",_top);
				}
				return this;
			}else{
				return this.config.top;
			}
		};
		this.top = top;
		
		/**
		 * 设置或返回left偏移
		 * 参数	left值（数字）
		 * 返回	当前对象或left值（对象或数字）
		 * */
		var left = function(_left){
			if(_left != undefined){
				this.config.left = _left;
				if(this.jqobj.obj!=undefined){
					if(_left + jqobj.obj.width() > this.container().width()){
						_left = _left - jqobj.obj.width();
					}
					
					this.jqobj.obj.css("left",_left);
				}
				return this;
			}else{
				return this.config.left;
			}
		};
		this.left = left;
		
		var setHeight = function(_height){
			jqobj.obj.height(_height);
			var centerHeight = _height - jqobj.top.height() - jqobj.bottom.height();
			jqobj.center.height(centerHeight);
			jqobj.center_center.height(centerHeight);
			jqobj.center_left.height(centerHeight);
			jqobj.center_right.height(centerHeight);
		};
		this.setHeight = setHeight;
		
		var setWidth = function(_width){
			jqobj.obj.width(_width);
			jqobj.top_center.width(_width - jqobj.top_left.width() - jqobj.top_right.width());
			jqobj.center_center.width(_width - jqobj.center_left.width() - jqobj.center_right.width());
			jqobj.bottom_center.width(_width - jqobj.bottom_left.width() - jqobj.bottom_right.width());
			
			var allitem = jqobj.center_center.children(".contextmenu_item");
			var allmark = jqobj.center_center.children(".contextmenu_mark");
			allitem.each(function(){
				var width = jqobj.center_center.width();
				$(this).width(width);
				var ico = $(this).children(".contextmenu_ico");
				var label = $(this).children(".contextmenu_label");
				var more = $(this).children(".contextmenu_more");
				label.width(width - ico.box().width - more.box().width);
			});
			allmark.each(function(){
				var width = jqobj.center_center.width();
				$(this).width(width);
				var ico = $(this).children(".contextmenu_ico");
				var label = $(this).children(".contextmenu_label");
				var more = $(this).children(".contextmenu_more");
				label.width(width - ico.box().width - more.box().width);
			});
		};
		this.setWidth = setWidth;
		
		this.show = function(_trigger){
			config.trigger = _trigger;
			if(this.jqobj.obj == undefined){
				this.init();
			}
			return this;
		};
		
	};
	
	//注册到zwork
	$z.contextmenu = contextmenu;
	
})(zwork,jQuery);