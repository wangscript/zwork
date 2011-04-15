/* !
 * file : zwork.jquery
 * author : 赵振华
 * 	zwork提供的一些jq扩充方法。
 */

(function($){
	
	/**
	 * 继承jQuery.fn
	 * */
	$.extend($.fn,{
		
		/**
		 * 简单的鼠标经过和移除
		 * 参数	样式名（字符串）
		 * 返回	jQuery对象（对象）
		 * */
		mouseoverout : function(_class){	//鼠标经过和移出的效果
			var $this = $(this);
			
			var first = true;
			var time = 0;
			
			var ie6 = $.browser.msie && $.browser.version == 6.0;

			$this.mouseover(function() {
				$(this).addClass(_class);
				if(ie6){
					$(this).prev("shape").show();
					time++;
				}
			}).mouseout(function() {
				$(this).removeClass(_class);
				if(ie6){
					if (time == 2 || !first) {
						$(this).prev("shape").hide();
						time = 0;
					}
					first = false;
				}
			});
			
			return $this;
		},
		
		/**
		 * zwork监听的DOM改变大小事件
		 * 参数	事件（方法）	如果有参数则添加事件，如果没有，则执行事件。
		 * 返回	jQuery对象（对象）
		 * */
		resizEvent : function(_event){
			
			var current = $(this);
			
			if(_event == undefined){
				//执行操作
				var eventList = current.data("resizEvent_list");
				var width = current.data("resizEvent_oldWidth");
				var height = current.data("resizEvent_oldHeight");
				if(eventList != undefined && (width != current.width() || height != current.height())){
					current.data("resizEvent_oldWidth",current.width());
					current.data("resizEvent_oldHeight",current.height());
					for(var i = 0;i<eventList.length;i++){
						eventList[i]();	//执行
					}
				}
				current.children().each(function(){
					$(this).resizEvent();
				});
			}else{
				//添加事件
				var eventList = current.data("resizEvent_list");
				if(eventList == undefined){
					eventList = new Array();
				}
				eventList.push(_event);
				current.data("resizEvent_list",eventList);
			}
			
			return current;
			
		},
		
		/**
		 * 根据type的值查找第一级子元素
		 * firstLevelChildren简称olc，第一级子元素。
		 * */
		flc : function(_value , _tag){
			var container = ["window","layout","dialog","accordion","tab","grid"];
			
			if(_tag == undefined){
				_tag = "type";
			}
			var $this = $(this);
			var childrenList = new Array();
			var find = function(obj,_value){
				obj.children("*").each(function(){
					var cur = $(this);
					var value = cur.attr(_tag);
					if(value && value == _value && cur.is("div")){
						childrenList.push(cur);
					}else {
						var has = false;
						for(i in container){
							if(value == container[i]){
								has = true;
							}
						}
						if(!has)
							find(cur,_value);
					}
				});
			};
			find($this,_value);
			return childrenList;
			
		},
		
		box : function(){
			var current = $(this);
			
			var box = {
				borderTop : 0,
				borderBottom : 0,
				borderLeft : 0,
				borderRight : 0,
				
				marginTop:0,
				marginBottom:0,
				marginLeft:0,
				marginRight:0,
				
				paddingTop:0,
				paddingBottom:0,
				paddingLeft:0,
				paddingRight:0,
				
				paddingX:0,
				paddingY:0,
				
				borderX:0,
				borderY:0,
				
				marginX:0,
				marginY:0,
				
				height:0,
				width:0,
				
				x:0,
				y:0
			};
			
			var getWidth = function(_target){
				var str = current.css(_target);
				return Number(str.substring(0, str.indexOf("px")));
			};
			
			box.marginTop = getWidth("margin-top");
			box.marginLeft = getWidth("margin-left");
			box.marginRight = getWidth("margin-right");
			if($.browser.safari)box.marginRight = getWidth("margin-left");	//safari浏览器margin-right有bug
			box.marginBottom = getWidth("margin-bottom");
			
			box.paddingTop = getWidth("padding-top");
			box.paddingLeft = getWidth("padding-left");
			box.paddingRight = getWidth("padding-right");
			box.paddingBottom = getWidth("padding-bottom");
			
			box.borderTop = getWidth("border-top-width");
			box.borderLeft = getWidth("border-left-width");
			box.borderRight = getWidth("border-right-width");
			box.borderBottom = getWidth("border-bottom-width");
			
			box.marginX = box.marginLeft + box.marginRight;
			box.marginY = box.marginTop + box.marginBottom;
			
			box.borderX = box.borderLeft + box.borderRight;
			box.borderY = box.borderBottom + box.borderTop;
			
			box.paddingX = box.paddingLeft + box.paddingRight;
			box.paddingY = box.paddingBottom + box.paddingTop;
			
			box.height = box.marginY + box.paddingY + box.borderY + current.height();
			box.width = box.marginX + box.paddingX + box.borderX + current.width();
			
			box.y = box.marginY + box.paddingY + box.borderY;
			box.x = box.marginX + box.paddingX + box.borderX;
			
			return box;
		},
		
		/**
		 * 查找父级别容器，tab页或window
		 * @param _type
		 * @returns
		 */
		findParentContainer : function(){
			var current = $(this);
			var container = undefined;
			var find = function(_obj){
				if(_obj.get(0) != undefined){
					var parent = _obj.parent();
					if(parent.hasClass("zwork-window") 
					|| parent.hasClass("tab_page") 
					|| parent.hasClass("zwork-tab")){
						container = parent;
					}else if(parent.get(0) != undefined){
						find(parent);
					}
				}
			};
			find(current);
			return container;
		}
		
	});
	
})(jQuery);