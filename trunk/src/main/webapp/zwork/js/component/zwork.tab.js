/* !
 * file : zwork.tab
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($z,$){
	
	/**
	 * button实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var tab = function(_config,_parent){
		var obj = new tab.tab(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$z.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * button对象
	 * */
	tab.tab = function(_config){
		$z.extend(this,new $z.view());	//继承zwork.view
		this.loadTimeId = undefined;
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			width:"100%",	//宽度
			height:"100%",	//高度
			items : new $z.hashmap(),	//项目
			/**
			 * 一个map对象存储当前tab中的所有标签页信息，key是当前标签页的id，id不能为空，为空默认以_blank命名。
			 * value的结构
			 * {
			 * 	id:undefined,//id编号
			 *  iframe:false,//是否启用iframe
			 *  title:"无标题标签页",//当前标签页的标题
			 *  content:undefined,//内容
			 *  src:undefined,//需要加载的地址
			 * }
			 * */
			
			contextmenu_changtab : undefined,
			contextmenu_title:undefined,
			original : undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.items(config.items);
			
			if(config.contextmenu_title == undefined){
				config.contextmenu_title = $z.contextmenu();
				config.contextmenu_title.add({
					id:"closeCurrent",
					label:"关闭当前",
					fn:function(trigger){
						var id = trigger.attr("id");
						_this.close(id);
					}
				}).add({
					id:"closeOther",
					label:"关闭其他",
					fn:function(trigger){
						var id = trigger.attr("id");
						$(".tab_title",jqobj.top_navi_titles).each(function(){
							if($(this).attr("id") != id)
								_this.close($(this).attr("id"));
						});
					}
				}).add({
					id:"mark",
					mark:true
				}).add({
					id:"closeAll",
					label:"关闭所有",
					fn:function(trigger){
						var idList = new Array();
						$(".tab_title",jqobj.top_navi_titles).each(function(){
							idList.push($(this).attr("id"));
						});
						for(i in idList){
							_this.close(idList[i]);
						}
					}
				});
			}
			
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			top:undefined,
			top_border:undefined,
			top_border_left:undefined,
			top_border_center:undefined,
			top_border_right:undefined,
			top_navi:undefined,
			top_navi_prev:undefined,
			top_navi_titles:undefined,
			top_navi_next:undefined,
			top_navi_list:undefined,
			center:undefined,
			center_left:undefined,
			center_content:undefined,
			center_right:undefined,
			bottom:undefined,
			bottom_left:undefined,
			bottom_center:undefined,
			bottom_right:undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			if(config.original == undefined){
				jqobj.obj = $($z.html.tab);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($z.html.tab).html());
			}
			jqobj.obj.addClass("zwork-tab");
			
			jqobj.top = jqobj.obj.children(".tab_top");
			jqobj.top_border = jqobj.top.children(".tab_border");
			jqobj.top_border_left = jqobj.top_border.children(".tab_left");
			jqobj.top_border_center = jqobj.top_border.children(".tab_center");
			jqobj.top_border_right = jqobj.top_border.children(".tab_right");
			
			jqobj.top_navi = jqobj.top.children(".tab_navi");
			jqobj.top_navi_prev = jqobj.top_navi.children(".tab_prev");
			jqobj.top_navi_titles = jqobj.top_navi.children(".tab_titles");
			jqobj.top_navi_next = jqobj.top_navi.children(".tab_next");
			jqobj.top_navi_list = jqobj.top_navi.children(".tab_list");
			jqobj.top_navi_list.click(function(e){
				var menu = config.contextmenu_changtab;
				if(menu.size() != 0)menu.show().top(e.pageY).left(e.pageX);
				return false;
			});
			
			jqobj.center = jqobj.obj.children(".tab_center");
			jqobj.center_left = jqobj.center.children(".tab_left");
			jqobj.center_content = jqobj.center.children(".tab_content");
			jqobj.center_right = jqobj.center.children(".tab_right");
			
			jqobj.bottom = jqobj.obj.children(".tab_bottom");
			jqobj.bottom_left = jqobj.bottom.children(".tab_left");
			jqobj.bottom_center = jqobj.bottom.children(".tab_center");
			jqobj.bottom_right = jqobj.bottom.children(".tab_right");
			
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
			jqobj.top_border = undefined;
			jqobj.top_border_left = undefined;
			jqobj.top_border_center = undefined;
			jqobj.top_border_right = undefined;
			
			jqobj.top_navi = undefined;
			jqobj.top_navi_prev = undefined;
			jqobj.top_navi_titles = undefined;
			jqobj.top_navi_next = undefined;
			jqobj.top_navi_list = undefined;
			
			jqobj.center = undefined;
			jqobj.center_left = undefined;
			jqobj.center_content = undefined;
			jqobj.center_right = undefined;
			
			jqobj.bottom = undefined;
			jqobj.bottom_left = undefined;
			jqobj.bottom_center = undefined;
			jqobj.bottom_right = undefined;
			
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		var items = function(_items){
			var _this = this;
			var map = _items;
			map.call(function(_obj,_key){
				_this.add(_obj);
			});
		};
		this.items = items;
		
		var add = function(_item){
			var _this = this;
			if(_item != undefined){
				
				if(_item.id==undefined){	//如果id不存在，那么赋予默认的id
					_item.id = "_blank";
				}
				config.items.put(_item.id , _item);	//添加到列表中
				
				var title = $("#"+_item.id , jqobj.top_navi_titles);	//获取标题
				var content = $("#"+_item.id , jqobj.center_content);	//获取内容区域
				
				if(title.get(0) == undefined){	//如果没有当前id的标签页
					
					var titleHtml = "<div class='tab_title'>" +
							"<div class='tab_left'></div>" +
							"<div class='tab_content'></div>" +
							"<div class='tab_button'><div class='tab_close'></div></div>" +
							"<div class='tab_right'></div>" +
							"</div>";
					title = $(titleHtml);
					title.appendTo(jqobj.top_navi_titles);
					
					var contentHtml = "<div style='overflow:auto;' class='tab_page'></div>";
					
					content = $(contentHtml);
					content.appendTo(jqobj.center_content);
					
				}
				
				title.attr("id",_item.id);
				title.attr("title",_item.title);
				title.attr("src",_item.src);
				title.data("loaded",false);	//没有加载过
				
				var left = $(".tab_left",title);
				var title_content = $(".tab_content",title);
				var button = $(".tab_button",title);
				var close = $(".tab_close",button);
				var right = $(".tab_right",title);
				title_content.width(10).css("overflow","auto").html(_item.title);
				title_content.width(title_content[0].scrollWidth).css("overflow","hidden");
				title.width(left.width() + right.width() + title_content.width() + button.width());
				
				close.mouseoverout("tab_close_hover")
				.click(function(){
					_this.close(_item.id);
				});
				
				content.height(jqobj.center_content.height());
				content.attr("id",_item.id);
				if(_item.content!=undefined){
					content.html(_item.content);
					$z(content,_this);
				}
				
				title.click(function(){
					_this.open(_item.id);
				}).mouseoverout("tab_title_hover").bind("contextmenu",function(e){
					config.contextmenu_title.show(title).top(e.pageY).left(e.pageX);
					return false;
				});
				
				_this.open(_item.id);
				
				if(config.contextmenu_changtab == undefined){
					config.contextmenu_changtab = $z.contextmenu();
				}
				config.contextmenu_changtab.add({
					id:_item.id,
					label:_item.title,
					fn:function(){
						_this.open(_item.id);
					}
				});
				
			}
		};
		this.add = add;
		
		var open = function(_id){
			var _this = this;
			
			var title = $("#"+_id , jqobj.top_navi_titles);
			var content = $("#"+_id , jqobj.center_content);
			
			if(title.get(0) != undefined){
				
				var titles = jqobj.top_navi_titles.find(".tab_title");
				var contents = jqobj.center_content.children("div");
				
				var loaded = title.data("loaded");	//没有加载过
				
				titles.removeClass("tab_title_selected");
				title.addClass("tab_title_selected");
				
				contents.hide();
				content.show();
				
				if(!loaded && title.attr("src")!=undefined){
					var iframe = config.items.get(_id).iframe;
					if(iframe){
						content.html("<iframe width='100%' height='100%' frameborder='0'></iframe>");
						content.children("iframe").attr("src",title.attr("src"));
					}else{
						clearTimeout(_this.loadTimeId);
						_this.loadTimeId = setTimeout(function(){
							title.data("loaded",true);	//没有加载过
							content.load(title.attr("src"),function(){
								$z(content,_this);
							});
						},200);
					}
				}
				
				content.resizEvent();
				
			}
			
		};
		this.open = open;
		
		var close = function(_id){
			var _this = this;
			var title = $("#"+_id , jqobj.top_navi_titles);
			var content = $("#"+_id , jqobj.center_content);
			if(title.get(0)!=undefined){
				if(!content.is(":hidden")){
					var prev = title.prev();
					var next = title.next();
					if(prev.get(0) != undefined){
						_this.open(prev.attr("id"));
					}else if(next.get(0) != undefined){
						_this.open(next.attr("id"));
					}
				}
				
				title.remove();
				content.remove();
				config.items.remove(_id);
				
				config.contextmenu_changtab.remove(_id);
			}
			return this;
		};
		this.close = close;
		
		var reload = function(_id){
			var _this = this;
			var content = $("#"+_id , jqobj.center_content);
			var title = $("#"+_id , jqobj.top_navi_titles);
			
			if(title.get(0)!=undefined){
				content.load(title.attr("src"),function(){
					$z(content,_this);
				});
			}
		};
		this.reload = reload;
		
		var setWidth = function(_width){
			var box = jqobj.obj.box();
			_width = _width - box.paddingX - box.borderX;
			
			jqobj.obj.width(_width);
			
			jqobj.top_border_center.width(_width - jqobj.top_border_left.width() - jqobj.top_border_right.width());
			jqobj.top_navi_titles.width(_width - jqobj.top_navi_list.width() - jqobj.top_navi_next.width() - jqobj.top_navi_prev.width());
			
			jqobj.center.width(_width);
			$(".tab_page",jqobj.center_content).width(_width - jqobj.center_left.width() - jqobj.center_right.width());
			jqobj.center_content.width(_width - jqobj.center_left.width() - jqobj.center_right.width());
			
			jqobj.bottom.width(_width);
			jqobj.bottom_center.width(_width - jqobj.bottom_left.width() - jqobj.bottom_right.width());
			
		};
		this.setWidth = setWidth;
		
		var setHeight = function(_height){
			var box = jqobj.obj.box();
			_height = _height - box.paddingY - box.borderY;
			
			jqobj.obj.height(_height);
			
			var centerHeight = _height - jqobj.top.height() - jqobj.bottom.height();
			jqobj.center.height(centerHeight);
			
			$(".tab_page",jqobj.center_content).height(centerHeight);
			
			jqobj.center_left.height(centerHeight);
			jqobj.center_right.height(centerHeight);
			jqobj.center_content.height(centerHeight);

		};
		this.setHeight = setHeight;
		
		var resizEvent = function(){
			this.height(config.height);
			this.width(config.width);
			var contents = jqobj.center_content.children("div");
			contents.height(jqobj.center_content.height());
		};
		this.resizEvent = resizEvent;
		
	};
	
	//注册到zwork
	$z.tab = tab;
	
})(zwork,jQuery);