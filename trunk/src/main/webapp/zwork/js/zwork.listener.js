/* !
 * file : zwork.listener
 * author : 赵振华
 * 	监听器，对html的监听，从而实现了html扩展。
 */

(function($ui,$){
	
	/**
	 * 监听器
	 * */
	var listener = (function(){
		
		/**
		 * 监听器拷贝
		 * 参数	被处理对象
		 * */
		var listener = function(_container,_parent){
			
			if(_parent == undefined){
				_parent = $ui.memory.tree.root.obj;
			}

			for(i in listener.map.container){
				var fn = listener.map.container[i];
				
				if(listener.disabled.length > 0){
					var has = false;
					for(i in listener.disabled){
						if(listener.disabled[i] == key){
							has = true;
						}
					}
					if(!has){
						fn(_container,_parent);
					}
				}else{
					fn(_container,_parent);
				}
			};
		};
		
		/**
		 * 添加一个监听器，如果name重复，那么覆盖原有值。
		 * 参数	监听器名称（字符串）
		 * 		监听方法（方法）
		 * 返回	无
		 * */
		listener.add = function(_name,_fn){
			listener.map.put(_name,_fn);
		};
		
		/**
		 * 设置监听器状态
		 * 参数	监听器名称或者名称列表（字符串或Array）
		 * 		状态（字符串）	可选值：disable|able，默认值：disable
		 * 返回	无
		 * */
		listener.state = function(_name,_action){
			if(_action == undefined || _action == "disable"){
				var has = false;
				for(i in listener.disabled){
					if(_name == listener.disabled[i]){
						has = true;
					}
				}
				if(!has){
					listener.disabled.push(_name);
				}
			}else if(_action == "able"){
				for(i in listener.disabled){
					if(_name == listener.disabled[i]){
						listener.disabled[i] == undefined;
						delete listener.disabled[i];
					}
				}
			}
		};
		
		//禁用的监听器列表
		listener.disabled = new Array();
		//监听器列表
		listener.map = new $ui.hashmap();
		
		/**
		 * 添加默认监听
		 * */
		listener.add("div_type_window",function(_c,_p){
			var list = _c.flc("window");
			for(i in list){
				var window = list[i];
				var config = {};
				config.container = window.parent();
				config.containerStyle = window.attr("containerStyle");
				config.height = window.attr("height") || 400;
				config.id = window.attr("id") || undefined;
				config.width = window.attr("width") || 500;
				config.left = Number(window.attr("left")) || 0;
				config.top = Number(window.attr("top")) || 0;
				config.src = window.attr("src") || undefined;
				config.title = window.attr("title") || "无标题窗口";
				config.iframe = eval(window.attr("iframe") || false);
				config.mask = eval(window.attr("mask") || false);
				config.maxable = eval(window.attr("maxable") || true);
				config.minable = eval(window.attr("minable") || true);
				config.resizable = eval(window.attr("resizable") || true);
				config.scroll = eval(window.attr("scroll") || true);
				config.minWidth = window.attr("minWidth") || 100;
				config.minHeight = window.attr("minHeight") || 100;
				config.maxWidth = window.attr("maxWidth") || undefined;
				config.maxHeight = window.attr("maxHeight") || undefined;
				config.content = window.attr("content") || undefined;
				if(config.src == undefined && window.html() != "")
					config.content = window.html();
				
				var zobj = $ui.window(config,_p);
				zobj.addClass(window.attr("class"));
				if(window.attr("show") || window.attr("show") == "true"){
					zobj.show();
				}
				window.remove();
			}
		});
		listener.add("div_type_dialog",function(_c,_p){
			var list = _c.flc("dialog");
			for(i in list){
				var dialog = list[i];
				var config = {};
				config.container = dialog.parent();
				config.containerStyle = dialog.attr("containerStyle");
				config.id = dialog.attr("id") || undefined;
				config.height = dialog.attr("height") || 400;
				config.width = dialog.attr("width") || 500;
				config.left = Number(dialog.attr("left")) || 0;
				config.top = Number(dialog.attr("top")) || 0;
				config.src = dialog.attr("src") || undefined;
				config.title = dialog.attr("title") || "无标题对话框";
				config.iframe = eval(dialog.attr("iframe") || false);
				config.maxable = eval(dialog.attr("maxable") || true);
				config.resizable = eval(dialog.attr("resizable") || true);
				config.scroll = eval(dialog.attr("scroll") || true);
				config.minWidth = dialog.attr("minWidth") || 100;
				config.minHeight = dialog.attr("minHeight") || 100;
				config.maxWidth = dialog.attr("maxWidth") || undefined;
				config.maxHeight = dialog.attr("maxHeight") || undefined;
				config.content = dialog.attr("content") || undefined;
				if(config.src == undefined && dialog.html() != "")
					config.content = dialog.html();
				
				var zobj = $ui.dialog(config,_p);
				zobj.addClass(dialog.attr("class"));
				if(dialog.attr("show") || dialog.attr("show") == "true"){
					zobj.show();
				}
				dialog.remove();
			}
		});
		listener.add("div_type_button",function(_c,_p){
			var list = _c.flc("button");
			for(i in list){
				var button = list[i];
				var config = {};
				config.container = button.parent();
				config.id = button.attr("id") || undefined;
				config.width = button.attr("width") || undefined;
				config.containerStyle = button.attr("containerStyle");
				if(button.html()!=""){config.label = button.html();}
				config.label = (button.attr("label") || config.label) || "按钮";
				config.fitWidth = eval(button.attr("fitWidth") || true);
				config.active = eval(button.attr("active") || false);
				config.click = button.attr("fn") || undefined;
				config.action = button.attr("action") || "button";
				config.position = button.attr("position") || "left";
				
				var zobj = $ui.button(config,_p);
				zobj.addClass(button.attr("class"));
				if(button.attr("show") == undefined || button.attr("show") == "true"){
					zobj.show();
				}
				button.remove();
			}
		});
		listener.add("div_type_layout",function(_c,_p){
			var list = _c.flc("layout");
			for(i in list){
				var layout = list[i];
				var config = {};
				config.container = layout.parent();
				config.id = layout.attr("id") || undefined;
				config.width = layout.attr("width") || "100%";
				config.height = layout.attr("height") || "100%";
				config.containerStyle = layout.attr("containerStyle");
				
				var north = layout.children("*[position='north']");
				if(north.get(0) != undefined){
					config.north = {};
					config.north.id = north.attr("id") || undefined;
					config.north.title = north.attr("title") || undefined;
					config.north.iframe = eval(north.attr("iframe")) || false;
					config.north.src = north.attr("src") || undefined;
					config.north.height = north.attr("height") || 0;
					config.north.border = eval(north.attr("border") || true);
					config.north.content = north.attr("content") || undefined;
					if(north.html() != ""){config.north.content = north.html();}
					config.north.className = new Array();
					config.north.className.push(north.attr("class"));
				}
				
				var south = layout.children("*[position='south']");
				if(south.get(0) != undefined){
					config.south = {};
					config.south.id = south.attr("id") || undefined;
					config.south.title = south.attr("title") || undefined;
					config.south.iframe = eval(south.attr("iframe")) || false;
					config.south.src = south.attr("src") || undefined;
					config.south.height = south.attr("height") || 0;
					config.south.border = eval(south.attr("border") || true);
					config.south.content = south.attr("content") || undefined;
					if(south.html() != ""){config.south.content = south.html();}
					config.south.className = new Array();
					config.south.className.push(south.attr("class"));
				}
				
				var west = layout.children("*[position='west']");
				if(west.get(0) != undefined){
					config.west = {};
					config.west.id = west.attr("id") || undefined;
					config.west.title = west.attr("title") || undefined;
					config.west.iframe = eval(west.attr("iframe")) || false;
					config.west.src = west.attr("src") || undefined;
					config.west.width = west.attr("width") || 0;
					config.west.border = eval(west.attr("border") || true);
					config.west.content = west.attr("content") || undefined;
					if(west.html() != ""){config.west.content = west.html();}
					config.west.className = new Array();
					config.west.className.push(west.attr("class"));
				}
				
				var east = layout.children("*[position='east']");
				if(east.get(0) != undefined){
					config.east = {};
					config.east.id = east.attr("id") || undefined;
					config.east.title = east.attr("title") || undefined;
					config.east.iframe = eval(east.attr("iframe")) || false;
					config.east.src = east.attr("src") || undefined;
					config.east.width = east.attr("width") || 0;
					config.east.border = eval(east.attr("border") || true);
					config.east.content = east.attr("content") || undefined;
					config.east.className = new Array();
					config.east.className.push(east.attr("class"));
					if(east.html() != ""){config.east.content = east.html();}
				}
				
				var center = layout.children("*[position='center']");
				if(center.get(0) != undefined){
					config.center = {};
					config.center.id = center.attr("id") || undefined;
					config.center.title = center.attr("title") || undefined;
					config.center.iframe = eval(center.attr("iframe")) || false;
					config.center.src = center.attr("src") || undefined;
					config.center.content = center.attr("content") || undefined;
					if(center.html() != ""){config.center.content = center.html();}
					config.center.className = new Array();
					config.center.className.push(center.attr("class"));
				}
				
				var zobj = $ui.layout(config,_p);
				zobj.addClass(layout.attr("class"));
				if(layout.attr("show") == undefined || layout.attr("show") == "true"){
					zobj.show();
				}
				layout.remove();
			}
		});
		listener.add("div_type_accordion",function(_c,_p){
			var list = _c.flc("accordion");
			for(i in list){
				var accordion = list[i];
				var config = {};
				config.container = accordion.parent();
				config.containerStyle = accordion.attr("containerStyle");
				config.id = accordion.attr("id") || undefined;
				config.width = accordion.attr("width") || "100%";
				config.height = accordion.attr("height") || "100%";
				
				var items = new Array();
				accordion.children("div").each(function(){
					var current = $(this);
					var item = {};
					item.id = current.attr("id") || undefined;
					item.src = current.attr("src") || undefined;
					item.title = current.attr("title") || undefined;
					item.show = eval(current.attr("show") || false);
					item.content = current.html();
					items.push(item);
				});
				
				config.items = items;
				
				var zobj = $ui.accordion(config,_p);
				zobj.addClass(accordion.attr("class"));
				
				if(accordion.attr("show") == undefined || accordion.attr("show") == "true"){
					zobj.show();
				}
				accordion.remove();
			}
		});
		listener.add("a_target_ajax",function(_c,_p){
			$("a[target='ajax']",_c).each(function(){
				var current = $(this);
				current.unbind("click");
				current.bind("click",function(){
					var href = current.attr("href");
					var rel = current.attr("rel");
					var scope = current.attr("scope");
					
					var container = _c;
					if(scope == undefined || scope == "container")
						container = _c;
					else
						container = $(document);
					
					$("#"+rel,container).load(href,function(){
						$ui($(this),_p);
					});
					return false;
				});
			});
		});
		
		//注册给zwork
		$ui.listener = listener;
		
	})();
	
})(zwork,jQuery);