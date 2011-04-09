/* !
 * file : zwork.accordion
 * extend : zwork.view
 * author : 赵振华
 * 	滑动菜单，类似手风琴性质，只能有一个显示。
 */

(function($ui,$){
	
	/**
	 * accordion实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var accordion = function(_config,_parent){
		var obj = new accordion.accordion(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$ui.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * accordion对象
	 * */
	accordion.accordion = function(_config){
		$ui.extend(this,new $ui.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			className : new Array(),	//用户自定义的样式
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			width:"100%",
			height:"100%",
			items : undefined,	//子元素
			
			type : "accordion"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.items(config.items);
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			jqobj.obj = $($ui.html.accordion);
		};
		this.initjqobj = initjqobj;
		
		/**
		 * 清除jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var clearjqobj = function(){
			jqobj.obj = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		var display = function(_id){
			var _this = this;
			if(_id != undefined){
				var all_height = 0;
				var all = $(".accordion_title",jqobj.obj);
				all.each(function(){
					all_height = all_height + $(this).height();
					$(this).next().animate({
						height:0
					});
				});
				var content = $("#"+_id,jqobj.obj).next();
				content.stop().animate({
					height : jqobj.obj.height() - all_height
				});
			}
		};
		this.display = display;
		
		var items = function(_items){
			var _this = this;
			if(_items == undefined){
				return config.items;
			}else{
				config.items = _items;
				if(jqobj.obj!=undefined){
					jqobj.obj.html("");
					
					for(i in _items){	//构建html
						var item = _items[i];
						var itemobj = {
							id : $ui.util.guid(),
							src : undefined,
							content:undefined,
							title:undefined,
							show:false
						};
						$.extend(itemobj,item);
						
						var title = "";
						if(itemobj.title != undefined){title = itemobj.title;}
						var id = "";
						if(itemobj.id!=undefined){id = "id='"+itemobj.id+"'";}
						var content = "";
						if(itemobj.content != undefined){
							content = itemobj.content;
						}
						var src = "";
						if(itemobj.src!=undefined){src = "src='"+itemobj.src+"'";}
						var itemhtml = "<div class='accordion_title' "+id+" "+src+">"+title+"</div>" +
								"<div class='accordion_content'>"+content+"</div>";
						jqobj.obj.append(itemhtml);
					}
					
					//注册事件
					var title = $(".accordion_title",jqobj.obj);
					title.click(function(){
						_this.display($(this).attr("id"));
					});
					_this.display(title.eq(0).attr("id"));
				}
				return this;
			}
		};
		this.items = items;
		
		var setWidth = function(_width){
			var box = jqobj.obj.box();
			jqobj.obj.width(_width - box.paddingX - box.borderX);
		};
		this.setWidth = setWidth;
		
		var setHeight = function(_height){
			var box = jqobj.obj.box();
			
			jqobj.obj.height(_height - box.paddingY - box.borderY);
			
			var all_height = 0;
			var all = $(".accordion_title",jqobj.obj);
			all.each(function(){
				all_height = all_height + $(this).height();
			});
			var content = jqobj.obj.find(".accordion_content");
			content.each(function(){
				if($(this).height()!=0){
					$(this).stop().height(_height - 2 - all_height);
				}
			});
			
		};
		this.setHeight = setHeight;
		
		var resizEvent = function(){
			this.height(config.height);
			this.width(config.width);
		};
		this.resizEvent = resizEvent;
		
	};
	
	//注册到zwork
	$ui.accordion = accordion;
	
})(zwork,jQuery);