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
				var timeoutID = current.data("resizEvent_timeoutID");
				clearTimeout(timeoutID);
				timeoutID = setTimeout(function(){
					var width = current.data("resizEvent_oldWidth");
					var height = current.data("resizEvent_oldHeight");
					if(width != current.width() || height != current.height()){	//如果有一项改变了，那么代码大小被改变了。
						current.data("resizEvent_oldWidth",current.width());
						current.data("resizEvent_oldHeight",current.height());
							var eventList = current.data("resizEvent_list");
							if(eventList != undefined){
								for(var i = 0;i<eventList.length;i++){
									eventList[i]();	//执行
								}
							}
					}
					current.children().each(function(){
						$(this).resizEvent();
					});
				},10);
				current.data("resizEvent_timeoutID",timeoutID);
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
			if(_tag == undefined){
				_tag = "type";
			}
			var $this = $(this);
			var childrenList = new Array();
			var find = function(obj,_value){
				obj.children("*").each(function(){
					var cur = $(this);
					var value = $(this).attr(_tag);
					if(value != undefined && value == _value){
						childrenList.push(cur);
					}else{
						find(cur,_tag);
					}
				});
			};
			find($this,_value);
			return childrenList;
			
		}
		
	});
	
})(jQuery);