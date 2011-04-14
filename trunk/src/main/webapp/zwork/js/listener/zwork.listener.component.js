(function($ui,$){
	
	/**
	 * 添加默认监听
	 * */
	$ui.listener.add("div_type_window",function(_c,_p){
		var list = _c.flc("window");
		for(i in list){
			var window = list[i];
			var config = {};
			config.container = window.parent();
			config.original = window;
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
			if(window.attr("show") || window.attr("show") == "true"){
				zobj.show();
			}
			window.removeAttr("type");
		}
	});
	$ui.listener.add("div_type_dialog",function(_c,_p){
		var list = _c.flc("dialog");
		for(i in list){
			var dialog = list[i];
			var config = {};
			config.container = dialog.parent();
			config.original = dialog;
			config.id = dialog.attr("id") || undefined;
			config.height = dialog.attr("height") || 400;
			config.width = dialog.attr("width") || 500;
			config.left = Number(dialog.attr("left")) || 0;
			config.top = Number(dialog.attr("top")) || 0;
			config.src = dialog.attr("src") || undefined;
			config.title = dialog.attr("title") || "无标题对话框";
			config.iframe = eval(dialog.attr("iframe") || false);
			config.mask = eval(dialog.attr("mask") || false);
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
			if(dialog.attr("show") || dialog.attr("show") == "true"){
				zobj.show();
			}
			dialog.removeAttr("type");
		}
	});
	$ui.listener.add("div_type_button",function(_c,_p){
		var list = _c.flc("button");
		for(i in list){
			var button = list[i];
			var config = {};
			config.container = button.parent();
			config.original = button;
			config.id = button.attr("id") || undefined;
			config.width = button.attr("width") || 100;
			if(button.html()!=""){config.label = button.html();}
			config.label = (button.attr("label") || config.label) || "按钮";
			config.fitWidth = eval(button.attr("fitWidth") || true);
			config.active = eval(button.attr("active") || false);
			config.click = button.attr("fn") || undefined;
			config.action = button.attr("action") || "button";
			config.position = button.attr("position") || undefined;
			
			var zobj = $ui.button(config,_p);
			if(button.attr("show") == undefined || button.attr("show") == "true"){
				zobj.show();
			}
			button.removeAttr("type");
		}
	});
	$ui.listener.add("div_type_progressbar",function(_c,_p){
		var list = _c.flc("progressbar");
		for(i in list){
			var progressbar = list[i];
			var config = {};
			config.container = progressbar.parent();
			config.original = progressbar;
			config.id = progressbar.attr("id") || undefined;
			config.width = progressbar.attr("width") || 200;
			config.height = progressbar.attr("height") || 15;
			config.value = Number(progressbar.attr("value") || 0);
			config.maxValue = Number(progressbar.attr("maxValue") || 100);
			
			var zobj = $ui.progressbar(config,_p);
			if(progressbar.attr("show") == undefined || progressbar.attr("show") == "true"){
				zobj.show();
			}
			
			progressbar.removeAttr("type"); 
		}
	});
	$ui.listener.add("div_type_layout",function(_c,_p){
		var list = _c.flc("layout");
		for(i in list){
			var layout = list[i];
			var config = {};
			config.container = layout.parent();
			config.original = layout;
			config.id = layout.attr("id") || undefined;
			config.width = layout.attr("width") || "100%";
			config.height = layout.attr("height") || "100%";
			
			var north = layout.children("*[position='north']");
			if(north.get(0) != undefined){
				config.north = {};
				config.north.original = north;
				config.north.state = true;
				config.north.id = north.attr("id") || undefined;
				config.north.title = north.attr("title") || undefined;
				config.north.iframe = eval(north.attr("iframe")) || false;
				config.north.src = north.attr("src") || undefined;
				config.north.height = north.attr("height") || 0;
				config.north.border = eval(north.attr("border") || false);
				config.north.content = north.attr("content") || undefined;
				if(north.html() != ""){config.north.content = north.html();}
			}
			
			var south = layout.children("*[position='south']");
			if(south.get(0) != undefined){
				config.south = {};
				config.south.original = south;
				config.south.state = true;
				config.south.id = south.attr("id") || undefined;
				config.south.title = south.attr("title") || undefined;
				config.south.iframe = eval(south.attr("iframe")) || false;
				config.south.src = south.attr("src") || undefined;
				config.south.height = south.attr("height") || 0;
				config.south.border = eval(south.attr("border") || false);
				config.south.content = south.attr("content") || undefined;
				if(south.html() != ""){config.south.content = south.html();}
			}
			
			var west = layout.children("*[position='west']");
			if(west.get(0) != undefined){
				config.west = {};
				config.west.original = west;
				config.west.state = true;
				config.west.id = west.attr("id") || undefined;
				config.west.title = west.attr("title") || undefined;
				config.west.iframe = eval(west.attr("iframe")) || false;
				config.west.src = west.attr("src") || undefined;
				config.west.width = west.attr("width") || 0;
				config.west.border = eval(west.attr("border") || false);
				config.west.content = west.attr("content") || undefined;
				if(west.html() != ""){config.west.content = west.html();}
			}
			
			var east = layout.children("*[position='east']");
			if(east.get(0) != undefined){
				config.east = {};
				config.east.original = east;
				config.east.state = true;
				config.east.id = east.attr("id") || undefined;
				config.east.title = east.attr("title") || undefined;
				config.east.iframe = eval(east.attr("iframe")) || false;
				config.east.src = east.attr("src") || undefined;
				config.east.width = east.attr("width") || 0;
				config.east.border = eval(east.attr("border") || false);
				config.east.content = east.attr("content") || undefined;
				if(east.html() != ""){config.east.content = east.html();}
			}
			
			var center = layout.children("*[position='center']");
			if(center.get(0) != undefined){
				config.center = {};
				config.center.original = center;
				config.center.state = true;
				config.center.id = center.attr("id") || undefined;
				config.center.title = center.attr("title") || undefined;
				config.center.iframe = eval(center.attr("iframe")) || false;
				config.center.src = center.attr("src") || undefined;
				config.center.content = center.attr("content") || undefined;
				if(center.html() != ""){config.center.content = center.html();}
			}
			
			var zobj = $ui.layout(config,_p);
			if(layout.attr("show") == undefined || layout.attr("show") == "true"){
				zobj.show();
			}
			layout.removeAttr("type");
		}
	});
	$ui.listener.add("div_type_accordion",function(_c,_p){
		var list = _c.flc("accordion");
		for(i in list){
			var accordion = list[i];
			var config = {};
			config.container = accordion.parent();
			config.original = accordion;
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
			
			if(accordion.attr("show") == undefined || accordion.attr("show") == "true"){
				zobj.show();
			}
			accordion.removeAttr("type");
		}
	});
	$ui.listener.add("div_type_tab",function(_c,_p){
		var list = _c.flc("tab");
		for(i in list){
			var tab = list[i];
			var config = {};
			config.container = tab.parent();
			config.original = tab;
			config.id = tab.attr("id") || undefined;
			config.width = tab.attr("width") || "100%";
			config.height = tab.attr("height") || "100%";
			
			config.items = new $ui.hashmap();
			var items = tab.children("div");
			items.each(function(){
				var cur = $(this);
				var item = {};
				item.id = cur.attr("id") || "_blank";
				item.title = cur.attr("title") || "无标题标签页";
				if(cur.html()!="")
					item.content = cur.html();
				item.src = cur.attr("src") || undefined;
				item.iframe = eval(cur.attr("iframe") || false);
				config.items.put(item.id,item);
			});
			
			var zobj = $ui.tab(config,_p);
			if(tab.attr("show") == undefined || tab.attr("show") == "true"){
				zobj.show();
			}
			tab.removeAttr("type");
		}
	});
	
	$ui.listener.add("div_type_grid",function(_c,_p){
		var list = _c.flc("grid");
		for(i in list){
			var grid = list[i];
			var config = {};
			config.container = grid.parent();
			config.original = grid;
			config.id = grid.attr("id") || undefined;
			config.width = grid.attr("width") || "100%";
			config.height = grid.attr("height") || "100%";
			config.toolbar = grid.children(".toolbar").html();
			grid.children(".toolbar").remove();
			config.content = grid.html();
			
			var zobj = $ui.grid(config,_p);
			if(grid.attr("show") == undefined || grid.attr("show") == "true"){
				zobj.show();
			}
			grid.removeAttr("type");
		}
	});
	
	$ui.listener.add("div_type_link",function(_c,_p){
		var list = _c.flc("link");
		for(i in list){
			var link = list[i];
			var config = {};
			config.container = link.parent();
			config.original = link;
			config.id = link.attr("id") || undefined;
			config.label = link.attr("label") || "快捷方式";
			config.ico = link.attr("ico") || undefined;
			
			var zobj = $ui.link(config,_p);
			if(link.attr("show") == undefined || link.attr("show") == "true"){
				zobj.show();
			}
			link.removeAttr("type");
		}
	});
	
	$ui.listener.add("ul_class_tree",function(_c,_p){
		$(".tree",_c).each(function(){
			var inited = $(this).data("inited");
			if(!inited){
				$(this).parent().css("position");
				$(this).treeview({
					animated: "fast"
				});
				$(this).data("inited",true);
			}
		});
	});
	
})(zwork,jQuery);