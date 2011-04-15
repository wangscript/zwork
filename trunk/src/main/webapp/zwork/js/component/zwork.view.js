/* !
 * file : zwork.view
 * author : 赵振华
 * 	基类对象，所有的对象都集成自这个类，它包含了zwork组件的一些公共的基础属性和方法。
 */

(function($,$z){
	
	/**
	 * view对象
	 * */
	$z.view = function(){
		
		//当前对象的uid
		var uid = $z.util.guid();
		this.uid = uid;
		
		this.initQueue = new Array();
		
		/**
		 * 初始化
		 * 参数	无
		 * 返回	无
		 * */
		var init = function(){
			this.original(this.config.original);
			this.initjqobj();
			this.jqobj.obj.data("uid",this.uid);
			this.id(this.config.id);
			this.container(this.config.container);
			this.containerStyle(this.config.containerStyle);
			this.top(this.config.top);
			this.left(this.config.left);
			this.height(this.config.height);
			this.width(this.config.width);
			var _this = this;
			for(i in this.initQueue){
				this.initQueue[i](_this);
			}
		};
		this.init = init;
		
		var id = function(_id){
			
			if(_id == undefined){
				return this.config.id;
			}else{
				this.config.id = _id;
				if(this.jqobj.obj != undefined){
					this.jqobj.obj.attr("id" , _id);
				}
				return this;
			}
			
		};
		this.id = id;
		
		var original = function(_original){
			if(_original == undefined){
				return this.config.original;
			}else{
				if(_original == null)
					this.config.original = undefined;
				else
					this.config.original = _original;
				return this;
			}
		};
		this.original = original;
		
		/**
		 * 设置或返回对象所在的容器
		 * 参数	容器（对象）
		 * 返回	当前对象或容器（对象）
		 * */
		var container = function(_container){
			if(_container != undefined){
				this.config.container = _container;
				var _this = this;
				if(this.jqobj.obj != undefined){
					this.jqobj.obj.appendTo(this.config.container);
					this.config.container.resizEvent(function(){
						if(_this.jqobj.obj != undefined && _this.resizEvent != undefined){
							_this.resizEvent();
						}
					});
				}
				return this;
			}else{
				return this.config.container;
			}
		};
		this.container = container;
		
		/**
		 * 设置或返回容器的样式
		 * 参数	容器样式（字符串）
		 * 返回	当前对象或容器样式（对象或字符串）
		 * */
		var containerStyle = function(_containerStyle){
			if(_containerStyle!=undefined){
				this.config.containerStyle = _containerStyle;
				if(this.jqobj.obj != undefined){
					var ctn = this.container();
					var oldStyle = ctn.data("oldStyle");
					if(oldStyle == undefined){
						var style = ctn.attr("style");
						if(style == undefined){
							oldStyle = "";
						}else{
							oldStyle = style;
						}
					}
					var newStyle = oldStyle + ";" + this.config.containerStyle;
					ctn.attr("style",newStyle);
					
					ctn.data("oldStyle",oldStyle);
				};
				return this;
			}else{
				return this.config.containerStyle;
			}
		};
		this.containerStyle = containerStyle;
		
		/**
		 * 设置或返回top偏移
		 * 参数	top值（数字）
		 * 返回	当前对象或top值（对象或数字）
		 * */
		var top = function(_top){
			if(_top != undefined){
				this.config.top = _top;
				if(this.jqobj.obj!=undefined){
					this.jqobj.obj.css("top",this.config.top);
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
					this.jqobj.obj.css("left",this.config.left);
				}
				return this;
			}else{
				return this.config.left;
			}
		};
		this.left = left;
		
		/**
		 * 设置或者返回高度
		 * 参数	高度（字符串或数字）	//如果有参数，则设置高度，如果没有参数，则返回高度。
		 * 返回	高度或当前对象（字符串，数字或对象）
		 * */
		var height = function(_height){
			if(_height == undefined){
				return this.config.height;	//返回子类高度
			}else{
				this.config.height = _height;
				if(this.jqobj.obj !=undefined && this.setHeight != undefined){
					
					var temp = _height;
					if((this.config.height+"").indexOf("%") > 0){
						var h = Number((this.config.height+"").replace("%",""));
						temp = this.container().height()*(h/100);
						this.container().css("overflow","hidden");
					}
					
					this.setHeight(temp);
				}
				return this;
			}
		};
		this.height = height;
		
		/**
		 * 设置或者返回宽度
		 * 参数	宽度（字符串或数字）	//如果有参数，则设置宽度，如果没有参数，则返回宽度。
		 * 返回	宽度或当前对象（字符串，数字或对象）
		 * */
		var width = function(_width){
			if(_width == undefined){
				return this.config.width;	//返回子类高度
			}else{
				this.config.width = _width;
				if(this.jqobj.obj !=undefined && this.setWidth != undefined){
					
					var temp = _width;
					if((this.config.width+"").indexOf("%") > 0){
						var w = Number((this.config.width+"").replace("%",""));
						temp = this.container().width()*(w/100);
						this.container().css("overflow","hidden");
					}
					
					this.setWidth(temp);
				}
				return this;
			}
		};
		this.width = width;
		
		/**
		 * 清空当前对象中包含的jqobj
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var clearjqobj = function(){
			for(i in this.jqobj){
				this.jqobj[i] = undefined;
			}
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		/**
		 * 设置或返回zindex
		 * 参数	zindex值（数字）
		 * 返回	当前对象或zindex值（对象或数字）
		 * */
		var zindex = function(_zindex){
			if(_zindex == undefined){
				return this.config.zindex;
			}else{
				this.config.zindex = _zindex;
				if(this.jqobj.obj != undefined){
					this.jqobj.obj.css("z-index",this.config.zindex);
				}
				return this;
			}
		};
		this.zindex = zindex;
		
		/**
		 * 显示当前对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var show = function(){
			if(this.jqobj.obj == undefined){
				this.init();
			}
			return this;
		};
		this.show = show;
		
		/**
		 * 隐藏当前对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var hide = function(){
			var children = $z.find(this.uid).children;	//关闭子对象
			if(children != undefined){
				children.call(function(obj){
					obj.hide();
				});
			}
			if(this.jqobj.obj != undefined){
				this.jqobj.obj.remove();
				this.clearjqobj();
			}
			return this;
		};
		this.hide = hide;
		
		/**
		 * 返回当前对象的类型
		 * 参数	无
		 * 返回	对象类型（字符串）
		 * */
		var type = function(){
			return this.config.type;
		};
		this.type = type;
		
	};
	
})(jQuery,zwork);