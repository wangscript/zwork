/* !
 * file : zwork.layout
 * extend : zwork.view
 * author : 赵振华
 * 	布局对象，布局对象吧一个容器或区域分为五个不同的区域，分别是，东西南北和中，继承自view。
 */

(function($ui,$){
	
	/**
	 * button实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var layout = function(_config,_parent){
		var obj = new layout.layout(_config);
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
	layout.layout = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			width:"100%",
			height:"100%",
			north :{
				id:undefined,
				title:undefined,	//标题
				iframe:false,	//其实启用iframe
				src:undefined,	//加载的地址
				content:undefined,	//内容
				height:0,
				border:false,
				
				className : new Array()	//用户自定义的样式名
			},
			west :{
				id:undefined,
				title:undefined,	//标题
				iframe:false,	//其实启用iframe
				src:undefined,	//加载的地址
				content:undefined,	//内容
				width:0,
				border:false,
				
				className : new Array()	//用户自定义的样式名
			},
			east :{
				id:undefined,
				title:undefined,	//标题
				iframe:false,	//其实启用iframe
				src:undefined,	//加载的地址
				content:undefined,	//内容
				width:0,
				border:false,
				
				className : new Array()	//用户自定义的样式名
			},
			south :{
				id:undefined,
				title:undefined,	//标题
				iframe:false,	//其实启用iframe
				src:undefined,	//加载的地址
				content:undefined,	//内容
				height:0,
				border:false,
				
				className : new Array()	//用户自定义的样式名
			},
			center :{
				id:undefined,
				title:undefined,	//标题
				iframe:false,	//其实启用iframe
				src:undefined,	//加载的地址
				content:undefined,	//内容
				
				className : new Array()	//用户自定义的样式名
			},
			
			className : new Array(),	//用户自定义的样式名
			type : "layout"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			north : {
				obj:undefined,
				title : undefined,
				content: undefined,
				border: undefined
			},
			south :{
				obj:undefined,
				title : undefined,
				content: undefined,
				border: undefined

			},
			west :{
				obj:undefined,
				title:undefined,
				content: undefined,
				border: undefined

			},
			east :{
				obj:undefined,
				title:undefined,
				content: undefined,
				border: undefined
			},
			center:{
				obj:undefined,
				title:undefined,
				content: undefined
			}
		};
		this.jqobj = jqobj;
		
		var initjqobj = function(){
			var _this = this;
			jqobj.obj = $($ui.html.layout);
			
			jqobj.north.obj = jqobj.obj.children(".layout_north");
			jqobj.north.title = jqobj.north.obj.children(".layout_title");
			jqobj.north.content = jqobj.north.obj.children(".layout_content");
			
			jqobj.south.obj = jqobj.obj.children(".layout_south");
			jqobj.south.title = jqobj.south.obj.children(".layout_title");
			jqobj.south.content = jqobj.south.obj.children(".layout_content");
			
			jqobj.west.obj = jqobj.obj.children(".layout_west");
			jqobj.west.title = jqobj.west.obj.children(".layout_title");
			jqobj.west.content = jqobj.west.obj.children(".layout_content");
			
			jqobj.east.obj = jqobj.obj.children(".layout_east");
			jqobj.east.title = jqobj.east.obj.children(".layout_title");
			jqobj.east.content = jqobj.east.obj.children(".layout_content");
			
			jqobj.center.obj = jqobj.obj.children(".layout_center");
			jqobj.center.title = jqobj.center.obj.children(".layout_title");
			jqobj.center.content = jqobj.center.obj.children(".layout_content");
			
			jqobj.north.border = jqobj.obj.children(".layout_border_north");
			jqobj.south.border = jqobj.obj.children(".layout_border_south");
			jqobj.west.border = jqobj.obj.children(".layout_border_west");
			jqobj.east.border = jqobj.obj.children(".layout_border_east");
			
			var current = jqobj.obj;
			var south = jqobj.south.obj;
			var north = jqobj.north.obj;
			var center = jqobj.center.obj;
			var west = jqobj.west.obj;
			var east = jqobj.east.obj;
			
			var northBorder = jqobj.north.border;
			var northButton = $(".layout_button",jqobj.north.border);
			var southBorder = jqobj.south.border;
			var southButton = $(".layout_button",jqobj.south.border);
			var westBorder = jqobj.west.border;
			var westButton = $(".layout_button",jqobj.west.border);
			var eastBorder = jqobj.east.border;
			var eastButton = $(".layout_button",jqobj.east.border);
			
			var repaintMiddle = function(){
				_this.width(config.width);
				_this.height(config.height);
				_this.container().resizEvent();
				center.show();
			};
			
			northButton.click(function(){
				var hidden = north.data("hidden");
				if(hidden){
					var tempHeight = north.attr("height");
					center.hide();
					northBorder.animate({
						top : tempHeight - northBorder.height()
					},200);
					north.animate({
						height : tempHeight
					},200,repaintMiddle);
					north.data("hidden",false);
					northButton.removeClass("layout_button_hidden");
				}else{
					north.attr("height",north.height());
					center.hide();
					northBorder.animate({
						top : 0
					},200);
					north.animate({
						height : northBorder.height()
					},200,repaintMiddle);
					north.data("hidden",true);
					northButton.addClass("layout_button_hidden");
				}
			}).mouseover(function(){
				var hidden = north.data("hidden");
				if(hidden){
					northButton.addClass("layout_button_hidden_mo");
				}else{
					northButton.addClass("layout_button_mo");
				}
			}).mouseout(function(){
				northButton.removeClass("layout_button_mo");
				northButton.removeClass("layout_button_hidden_mo");
			});
			
			northBorder.draggable({
				axis : "y",
				drag : function(){
					var hidden = north.data("hidden");
					if(hidden){
						return false;
					}
				},
				stop : function(){
					var hidden = north.data("hidden");
					if(!hidden){
						var top = northBorder[0].offsetTop;
						if(top <= config.northMinHeight){
							top = config.northMinHeight + northBorder.height();
						}
						if(config.northMaxHeight == undefined){
							var northMaxHeight = current.height() - south.height();
							if(top >= northMaxHeight){
								top = northMaxHeight;
							}
						}else{
							if(top >= config.northMaxHeight){
								top = config.northMaxHeight;
							}
						}
						northBorder.css("top",top - northBorder.height());
						north.height(top);
						north.attr("height",top);
						
						repaintMiddle();
					}
				}
			});
			
			southButton.click(function(){
				var hidden = south.data("hidden");
				if(hidden){
					var tempHeight = south.attr("height");
					center.hide();
					southBorder.animate({
						top : current.height() - tempHeight
					},200);
					south.animate({
						height : tempHeight
					},200,repaintMiddle);
					south.data("hidden",false);
					southButton.removeClass("button_hidden");
				}else{
					south.attr("height",south.height());
					center.hide();
					southBorder.animate({
						top : current.height() - southBorder.height()
					},200);
					south.animate({
						height : southBorder.height()
					},200,repaintMiddle);
					south.data("hidden",true);
					southButton.addClass("layout_button_hidden");
				}
			}).mouseover(function(){
				var hidden = south.data("hidden");
				if(hidden){
					southButton.addClass("layout_button_hidden_mo");
				}else{
					southButton.addClass("layout_button_mo");
				}
			}).mouseout(function(){
				southButton.removeClass("layout_button_mo");
				southButton.removeClass("layout_button_hidden_mo");
			});
			
			southBorder.draggable({
				axis : "y",
				drag : function(){
					var hidden = south.data("hidden");
					if(hidden){
						return false;
					}
				},
				stop : function(){
					var hidden = south.data("hidden");
					if(!hidden){
						var top = southBorder[0].offsetTop;
						if(top >= current.height() - config.southMinHeight){
							top = current.height() - config.southMinHeight - southBorder.height();
						}
						if(config.southMaxHeight == undefined){
							var southMaxHeight = current.height() - north.height();
							if(top <= current.height() - southMaxHeight){
								top = current.height() - southMaxHeight;
							}
						}else{
							if(top <= current.height() - config.southMaxHeight){
								top = current.height() - config.southMaxHeight;
							}
						}
						southBorder.css("top",top);
						south.height(current.height() - top);
						south.attr("height",current.height() - top);
						
						repaintMiddle();
					}
				}
			});
			
			westButton.click(function(){
				var hidden = west.data("hidden");
				if(hidden){
					var tempWidth = west.attr("width");
					center.hide();
					westBorder.animate({
						left : tempWidth - westBorder.width()
					},200);
					west.animate({
						width : tempWidth
					},200,repaintMiddle);
					west.data("hidden",false);
					westButton.removeClass("button_hidden");
				}else{
					west.attr("width",west.width());
					center.hide();
					westBorder.animate({
						left : 0
					},200);
					west.animate({
						width : westBorder.width()
					},200,repaintMiddle);
					west.data("hidden",true);
					westButton.addClass("layout_button_hidden");
				}
			}).mouseover(function(){
				var hidden = west.data("hidden");
				if(hidden){
					westButton.addClass("layout_button_hidden_mo");
				}else{
					westButton.addClass("layout_button_mo");
				}
			}).mouseout(function(){
				westButton.removeClass("layout_button_mo");
				westButton.removeClass("layout_button_hidden_mo");
			});
			
			westBorder.draggable({
				axis:"x",
				drag:function(){
					var hidden = west.data("hidden");
					if(hidden){
						return false;
					}
				},
				stop:function(){
					var hidden = west.data("hidden");
					if(!hidden){
						var left = westBorder.get(0).offsetLeft;
						westBorder.css("left",left - westBorder.width());
						if(left <= config.westMinWidth){
							left = westBorder.width();
							westBorder.css("left",0);
						}
						if(config.westMaxWidth == undefined){
							var westMaxWidth = current.width() - east.width();
							if(left >= westMaxWidth){
								left = westMaxWidth;
								westBorder.css("left",left - westBorder.width());
							}
						}else{
							if(left >= config.westMaxWidth){
								left = config.westMaxWidth;
								westBorder.css("left",left - westBorder.width());
							}
						}
						west.width(left);
						west.attr("width",left);
						
						repaintMiddle();
					}
				}
			});
			
			eastButton.click(function(){
				var hidden = east.data("hidden");
				if(hidden){
					var tempWidth = east.attr("width");
					center.hide();
					eastBorder.animate({
						left : current.width() - tempWidth
					},200);
					east.animate({
						width : tempWidth
					},200,repaintMiddle);
					east.data("hidden",false);
					eastButton.removeClass("button_hidden");
				}else{
					east.attr("width",east.width());
					center.hide();
					eastBorder.animate({
						left : current.width() - eastBorder.width()
					},200);
					east.animate({
						width : eastBorder.width()
					},200,repaintMiddle);
					east.data("hidden",true);
					eastButton.addClass("layout_button_hidden");
				}
			}).mouseover(function(){
				var hidden = east.data("hidden");
				if(hidden){
					eastButton.addClass("layout_button_hidden_mo");
				}else{
					eastButton.addClass("layout_button_mo");
				}
			}).mouseout(function(){
				eastButton.removeClass("layout_button_mo");
				eastButton.removeClass("layout_button_hidden_mo");
			});
			
			eastBorder.draggable({
				axis:"x",
				drag:function(){
					var hidden = east.data("hidden");
					if(hidden){
						return false;
					}
				},
				stop:function(){
					var hidden = east.data("hidden");
					if(!hidden){
						var left = eastBorder.get(0).offsetLeft;
						eastBorder.css("left",left);
						if(config.eastMaxWidth == undefined){
							var eastMaxWidth = current.width() - west.width();
							if(left <= current.width() - eastMaxWidth){
								left = current.width() - eastMaxWidth;
								eastBorder.css("left",left);
							}
						}else{
							if(left <= current.width() - config.eastMaxWidth){
								left = current.width() - config.eastMaxWidth;
								eastBorder.css("left",left);
							}
						}
						
						if(left >= current.width() - config.eastMinWidth){
							left = current.width() - config.eastMinWidth - eastBorder.width();
							eastBorder.css("left",left);
						}
						east.width(current.width() - left);
						east.attr("width",current.width() - left);
						
						repaintMiddle();
					}
				}
			});
		};
		this.initjqobj = initjqobj;
		
		var clearjqobj = function(){
			jqobj.obj = undefined;
			
			jqobj.north.obj = undefined;
			jqobj.north.title = undefined;
			jqobj.north.content = undefined;
			
			jqobj.south.obj = undefined;
			jqobj.south.title = undefined;
			jqobj.south.content = undefined;
			
			jqobj.west.obj = undefined;
			jqobj.west.title = undefined;
			jqobj.west.content = undefined;
			
			jqobj.east.obj = undefined;
			jqobj.east.title = undefined;
			jqobj.east.content = undefined;
			
			jqobj.center.obj = undefined;
			jqobj.center.title = undefined;
			jqobj.center.content =undefined;
			
			jqobj.north.border = undefined;
			jqobj.south.border = undefined;
			jqobj.west.border = undefined;
			jqobj.east.border = undefined;
			
		};
		this.clearjqobj = clearjqobj;
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.title("north",config.north.title,_this);
			_this.title("south",config.south.title,_this);
			_this.title("center",config.center.title,_this);
			_this.title("west",config.west.title,_this);
			_this.title("east",config.east.title,_this);
			
			_this.iframe("north",config.north.iframe,_this);
			_this.iframe("south",config.south.iframe,_this);
			_this.iframe("center",config.center.iframe,_this);
			_this.iframe("west",config.west.iframe,_this);
			_this.iframe("east",config.east.iframe,_this);
			
			_this.content("north",config.north.content,_this);
			_this.content("south",config.south.content,_this);
			_this.content("center",config.center.content,_this);
			_this.content("west",config.west.content,_this);
			_this.content("east",config.east.content,_this);
			
			_this.src("north",config.north.src,_this);
			_this.src("south",config.south.src,_this);
			_this.src("center",config.center.src,_this);
			_this.src("west",config.west.src,_this);
			_this.src("east",config.east.src,_this);
			
			_this.border("north",config.north.border,_this);
			_this.border("south",config.south.border,_this);
			_this.border("center",config.center.border,_this);
			_this.border("west",config.west.border,_this);
			_this.border("east",config.east.border,_this);
			
			_this.blockClass("north",config.north.className,_this);
			_this.blockClass("south",config.south.className,_this);
			_this.blockClass("center",config.center.className,_this);
			_this.blockClass("west",config.west.className,_this);
			_this.blockClass("east",config.east.className,_this);
			
			_this.blockId("north",config.north.id,_this);
			_this.blockId("south",config.south.id,_this);
			_this.blockId("center",config.center.id,_this);
			_this.blockId("west",config.west.id,_this);
			_this.blockId("east",config.east.id,_this);
			
			_this.blockWidth("west",config.west.width,_this);
			_this.blockWidth("east",config.east.width,_this);
			
			_this.blockHeight("north",config.north.height,_this);
			_this.blockHeight("south",config.south.height,_this);
			
			_this.width(config.width);
			_this.height(config.height);
			
			_this.container().resizEvent();
		});
		
		var title = function(_position,_title,_this){
			var obj = _this || this;
			if(_title == undefined || typeof _title == "object"){
				obj = _title || this;
				return eval("config."+_position+".title;");
			}else if(typeof _title == "string"){
				eval("config."+_position+".title = _title;" +
						"if(jqobj.obj != undefined){"+
					"jqobj."+_position+".title.show().html(_title);"+
				"}");
				return this;
			}
			
		};
		this.title = title;
		
		var iframe = function(_position,_iframe,_this){
			var obj = _this || this;
			if(_iframe == undefined || typeof _iframe == "object"){
				obj = _iframe || this;
				return eval("config."+_position+".iframe;");
			}else if(typeof _iframe == "boolean"){
				eval("config."+_position+".iframe = _iframe;");
				return this;
			}
			
		};
		this.iframe = iframe;
		
		var src = function(_position,_src,_this){
			var obj = _this || this;
			if(_src == undefined || typeof _src == "object"){
				obj = _src || this;
				return eval("config."+_position+".src;");
			}else if(typeof _src == "string"){
				var iframeHtml = "<iframe width='100%' height='100%' frameborder='0'></iframe>";
				eval("config."+_position+".src = _src;"+
				"if(config."+_position+".iframe){"+
				"	jqobj."+_position+".content.html("+iframeHtml+");"+
				"	var iframe = $('iframe',jqobj."+_position+".content);"+
				"	iframe.attr('src',_src);"+
				"}else{"+
				"	jqobj."+_position+".content.load(_src,function(){"+
				"		$ui(jqobj."+_position+".content,obj);"+
				"	});"+
				"}");
				return this;
			}
			
		};
		this.src = src;
		
		var content = function(_position,_content,_this){
			var obj = _this || this;
			if(_content == undefined || typeof _content == "object"){
				obj = _content || this;
				return eval("config."+_position+".content;");
			}else if(typeof _content == "string"){
				eval("config."+_position+".content = _content;"+
				"if(jqobj.obj!=undefined){"+
				"	jqobj."+_position+".content.html(_content);"+
				"}");
				return this;
			}
			
		};
		this.content = content;
		
		var border = function(_position,_border,_this){
			var obj = _this || this;
			if(_border == undefined || typeof _border == "object"){
				obj = _border || this;
				return eval("config."+_position+".border;");
			}else if(typeof _border == "boolean"){
				eval("config."+_position+".border = _border;"+
				"if(jqobj.obj!=undefined){if(config."+_position+".border){jqobj."+_position+".border.show();}else{jqobj."+_position+".border.hide();}}");
				return this;
			}
			
		};
		this.border = border;
		
		var blockClass = function(_position,_class,_this){
			var obj = _this || this;
			
			if(_class == undefined || _class.type != undefined){
				obj = _class || this;
				return eval("config."+_position+".className;");
			}else{
				eval("config."+_position+".className = _class;"+
				"for(i in config."+_position+".className){"+
				"	jqobj."+_position+".obj.addClass(config."+_position+".className[i]);" +
				"}");
				return obj;
			}
		};
		this.blockClass = blockClass;
		
		var blockId = function(_p,_id,_this){
			var obj = _this || this;
			
			if(_id == undefined || _id.type != undefined){
				obj = _id || this;
				return eval("config."+_p+".id;");
			}else{
				eval("config."+_p+".id = _id;"+
				"	jqobj."+_p+".obj.attr('id',_id);");
				return obj;
			}
		};
		this.blockId = blockId;
		
		var blockWidth = function(_position,_width,_this){
			var obj = _this || this;
			if(_width == undefined || typeof _width == "object"){
				obj = _width || this;
				return eval("config."+_position+".width;");
			}else if(typeof _width == "string" || typeof _width == "number"){
				eval("config."+_position+".width = _width;"+
				"if(jqobj.obj!=undefined){" +
				"	jqobj."+_position+".obj.width(_width);" +
				"}");
				obj.width(config.width);
				return obj;
			}
		};
		this.blockWidth = blockWidth;
		
		var blockHeight = function(_position,_height,_this){
			var obj = _this || this;
			if(_height == undefined || typeof _height == "object"){
				obj = _height || this;
				return eval("config."+_position+".height;");
			}else if(typeof _height == "string" || typeof _height == "number"){
				eval("config."+_position+".height = _height;"+
				"if(jqobj.obj!=undefined){" +
				"	jqobj."+_position+".obj.height(_height);" +
				"}");
				obj.height(config.height);
				return obj;
			}
		};
		this.blockHeight = blockHeight;
		
		var setWidth = function(_width){
			jqobj.obj.width(_width);
			jqobj.center.obj.width(_width - jqobj.west.obj.width() - jqobj.east.obj.width());
			
			jqobj.west.border.css("top",jqobj.north.obj.height())
			.css("left",jqobj.west.obj.width() - jqobj.west.border.width());
			
			jqobj.east.border.css("top",jqobj.north.obj.height())
			.css("left",_width - jqobj.east.obj.width());
			
			jqobj.north.border.width(_width);
			var button_north = $(".layout_button",jqobj.north.border);
			button_north.css("left",(_width - button_north.width())/2);
			
			jqobj.south.border.width(_width);
			var button_south = $(".layout_button",jqobj.south.border);
			button_south.css("left",(_width - button_south.width())/2);
		};
		this.setWidth = setWidth;
		
		var setHeight = function(_height){
			jqobj.obj.height(_height);

			jqobj.center.obj.height(_height - jqobj.north.obj.height() - jqobj.south.obj.height());
			var centerHeight = jqobj.center.obj.height();
			
			jqobj.west.obj.height(centerHeight);
			jqobj.east.obj.height(centerHeight);
			jqobj.north.border.css("top",jqobj.north.obj.height() - jqobj.north.border.height())
			.css("left",0);
			jqobj.south.border.css("top",_height - jqobj.south.obj.height())
			.css("left",0);
			
			
			jqobj.west.border.height(centerHeight);
			var button_west = $(".layout_button",jqobj.west.border);
			button_west.css("top",(centerHeight - button_west.height())/2);
			
			jqobj.east.border.height(centerHeight);
			var button_east = $(".layout_button",jqobj.east.border);
			button_east.css("top",(centerHeight - button_east.height())/2);
		};
		this.setHeight = setHeight;
		
		var resizEvent = function(){
			this.width(config.width);
			this.height(config.height);
		};
		this.resizEvent = resizEvent;
	};
	
	//注册到zwork
	$ui.layout = layout;
	
})(zwork,jQuery);