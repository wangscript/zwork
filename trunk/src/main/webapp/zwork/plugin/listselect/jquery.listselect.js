(function($){
	
	$.fn.listselect = function(_config){
		var keyEvent = undefined;
		var config = {
			height : 250,
			width : 350,
			listTitle : "可选项",
			selectedTitle : "已选项"
		};
		
		var current = $(this);
		
		config.width = current.width();
		config.height = current.height();
		if(current.attr("name")!=undefined){
			current.append("<select multiple='multiple' style='display:none;' name='"+current.attr("name")+"'></select>");
		}else{
			current.append("<select multiple='multiple' style='display:none;'></select>");
		}
		var creatOption = function(){
			var select = $("select",current);
			var optionHtml = "";
			var selected = $(".selected .item",current);
			selected.each(function(){
				var item = $(this);
				optionHtml = optionHtml +"<option value='"+item.attr("value")+"'>"+item.html()+"</option>";
			});
			select.html(optionHtml);
		};
		
		var html = "<div class='title'></div>" +
				"<div class='container'></div>" +
				"<div class='bottom'><a href='javascript:void(0);'>全选</a></div>";
		
		current.height(config.height).width(config.width);
		
		var list = current.find(".list");
		list.append(html);
		var listContainer = list.find(".container");
		var listTitle = list.find(".title");
		var listBottom = list.find(".bottom");
		var listAll = listBottom.find("a");
		var listItems = list.find(".item");
		listItems.appendTo(listContainer);
		listTitle.html(config.listTitle);
		listContainer.height(config.height - listTitle.height() - listBottom.height() - 2);
		
		var selected = current.find(".selected");
		selected.append(html);
		var selectedContainer = selected.find(".container");
		var selectedTitle = selected.find(".title");
		var selectedBottom = selected.find(".bottom");
		var selectedAll = selectedBottom.find("a");
		var selectedItems = selected.find(".item");
		selectedItems.appendTo(selectedContainer);
		selectedTitle.html(config.selectedTitle);
		selectedContainer.height(config.height - selectedTitle.height() - selectedBottom.height() - 2);
		
		var center = $("<div class='center'><table width='100%' height='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center' valign='middle'>" +
				"<div class='left'></div><div class='right'></div>" +
				"</td></tr></table></div>");
		center.insertAfter(list);
		
		var toLeft = $(".left",center);
		var toRight = $(".right",center);
		toLeft.click(function(){
			$(".item_selected",selected).removeClass("item_selected").appendTo(listContainer);
			creatOption();//重新构建option
		});
		toRight.click(function(){
			$(".item_selected",list).removeClass("item_selected").appendTo(selectedContainer);
			creatOption();//重新构建option
		});
		
		listAll.click(function(){
			$(".item",list).addClass("item_selected");
			return false;
		});
		selectedAll.click(function(){
			$(".item",selected).addClass("item_selected");
			return false;
		});
		
		list.width((config.width - center.width() -2 )/2);
		selected.width((config.width - center.width() -2 )/2);
		
		$( ".list .container, .selected .container" ,current).sortable({
			connectWith: ".container",
			stop:function(){
				creatOption();
			}
		}).disableSelection();
		
		creatOption();//默认要构建option
		
		var items = $(".item",current);
		items.each(function(){
			$(this).mouseover(function(){
				$(this).addClass("item_hover");
			}).mouseout(function(){
				$(this).removeClass("item_hover");
			}).mouseup(function(){
				$(this).removeClass("item_hover");
			}).click(function(){
				if(keyEvent != undefined){
					if(keyEvent.keyCode != 17){
						items.removeClass("item_selected");
					}else{
						if($(this).hasClass("item_selected")){
							$(this).removeClass("item_selected");
						}else{
							$(this).addClass("item_selected");
						}
					}
				}else{
					items.removeClass("item_selected");
					$(this).addClass("item_selected");
				}
				return false;
			});
		});
		
		$(document).keydown(function(e){
			keyEvent = e;
		});
		$(document).keyup(function(e){
			keyEvent = undefined;
		}).click(function(){
			items.removeClass("item_selected");
		});
		
		return current;
		
	};
	
})(jQuery);