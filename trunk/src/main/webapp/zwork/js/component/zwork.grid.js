/* !
 * file : zwork.grid
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($z,$){
	
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
		$z.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * grid对象
	 * */
	grid.grid = function(_config){
		$z.extend(this,new $z.view());	//继承zwork.view
		var _thisobj = this;
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			
			width:"100%",
			height:"100%",
			
			toolbar:undefined,
			content:undefined,
			checkbox:true,	//是否使用多选
			togglerow:true,	//是否允许隐藏显示某一列
			
			original : undefined,
			menu_togglerow:undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.toolbar(config.toolbar);
			_this.content(config.content);
			
			_this.inittable();
			_this.tablewidth();
			_this.checkbox(config.checkbox);
			_this.togglerow(config.togglerow);
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
				jqobj.obj = $($z.html.grid);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($z.html.grid).html());
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
					_content = _content + "<div class='grid_headbg'></div>" +
							"<div class='grid_menu_ico'></div>";
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
					$z(jqobj.toolbar,_this);
					_this.resizEvent();
				}
				return this;
			}
		};
		
		//初始化表格
		this.inittable = function(){
			if(jqobj.obj != undefined){
				
				//初始化样式
				var table = jqobj.content.children("table");
				var body = table.find("tbody");
				body.find("tr").each(function(i){
					if(i%2 == 0){
						$(this).addClass("odd");
					}else{
						$(this).addClass("even");
					}
					$(this).mouseoverout("hover");
				});
				
			}
		};
		
		this.tablewidth = function(){
			//计算宽度
			var table = jqobj.content.children("table");
			var head = table.find("thead");
			var all_width = 0;
			head.find("th").each(function(){
				if(!$(this).is(":hidden"))
					all_width = all_width + Number($(this).attr("width"));
			});
			table.width(all_width);
		};
		
		//隐藏显示列
		this.togglerow = function(_togglerow){
			var _this = this;
			if(_togglerow == undefined){
				return config.togglerow;
			}else{
				config.togglerow = _togglerow;
				if(jqobj.obj!=undefined){
					var table = jqobj.content.children("table");
					if(_togglerow){
						//处理头部
						var thHtml = "<th width='22' class='toggle'></th>";
						var th = $(thHtml);
						var head = table.find("thead");
						head.find("tr").append(th);
						
						//处理身体部分
						var body = table.find("tbody");
						body.find("tr").each(function(){
							$(this).append("<td></td>");
						});
						
						th.click(function(e){
							if(config.menu_togglerow == undefined){
								config.menu_togglerow = $z.contextmenu();
								head.find("tr").find("th").each(function(i){
									var cur = $(this);
									var icoobj = $(".grid_menu_ico",jqobj.content);
									var ico_image = icoobj.css("background-image");
									if(!cur.hasClass("checkbox") && !cur.hasClass("toggle")){
										config.menu_togglerow.add({
											id:cur.attr("name") || "row"+i,
											label:cur.html(),
											ico:ico_image,
											fn:function(){
												if(cur.is(":hidden")){
													cur.show();
													body.find("tr").each(function(){
														$(this).find("td").eq(i).show();
													});
													_this.tablewidth();
													
													config.menu_togglerow.update({
														id:cur.attr("name") || "row"+i,
														ico:ico_image
													});
												}else{
													cur.hide();
													body.find("tr").each(function(){
														$(this).find("td").eq(i).hide();
													});
													_this.tablewidth();
													
													config.menu_togglerow.update({
														id:cur.attr("name") || "row"+i,
														ico:"none"
													});
												}
											}
										});
									}
								});
							}
							config.menu_togglerow.top(e.pageY).left(e.pageX).show();
							return false;
						});
						
						table.width(table.width() + th.width());	//表格宽度
					}else{
						
					}
				}
				return this;
			}
		};
		
		//设置多选框
		this.checkbox = function(_checkbox){
			if(_checkbox == undefined){
				return config.checkbox;
			}else{
				config.checkbox = _checkbox;
				if(jqobj.obj!=undefined){
					var table = jqobj.content.children("table");
					if(_checkbox){
						var boxHtml = "<th width='22' class='checkbox'></th>";
						var checkbox_head = $(boxHtml);
						var head = table.find("thead");
						head.find("tr").prepend(checkbox_head);
						
						var body = table.find("tbody");
						body.find("tr").each(function(){
							var current = $(this);
							current.prepend("<td class='checkbox'></td>");
							current.find(".checkbox").click(function(){
								if(current.hasClass("selected")){
									current.removeClass("selected");
								}else{
									current.addClass("selected");
								}
								
								var selected_size = $(".selected",body).size();
								var all_size = $("tr",body).size();
								var headtr = head.find("tr");
								if(selected_size == all_size){
									headtr.removeClass("noallselected");
									headtr.addClass("selected");
								}else if(selected_size == 0){
									headtr.removeClass("noallselected");
								}else{
									headtr.addClass("noallselected");
									headtr.removeClass("selected");
								}
							});
						});
						
						checkbox_head.click(function(){
							var parent = checkbox_head.parent();
							var table = jqobj.content.children("table");
							var body = table.find("tbody");
							if(parent.hasClass("selected")){
								parent.removeClass("selected");
								parent.removeClass("noallselected");
								body.find("tr").removeClass("selected");
							}else{
								parent.removeClass("noallselected");
								parent.addClass("selected");
								body.find("tr").addClass("selected");
							}
							
						});
						table.width(table.width() + checkbox_head.width());	//表格宽度
					}else{
						var checkbox = table.find("thead").find(".checkbox");
						var width = checkbox.width();
						checkbox.remove();
						table.find("tbody").find(".checkbox").remove();
						table.width(table.width() - width);
					}
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
	$z.grid = grid;
	
})(zwork,jQuery);