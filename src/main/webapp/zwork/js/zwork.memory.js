/* !
 * file : webui.memory
 * author : 赵振华
 * 	内存管理器。
 * 提供了俩中内存机制：
 * 	1、依赖型：对象的相互依赖，这种依赖关系可能不是父子关系，有可能是同级
 * 关系，但是彼此之间有联系。
 * 	2、层级型：一种典型的父子关系，每一个对象都属于它的父级对象，有一个root
 * 对象。它将内存中的对象用树形的结构组织起来。
 */

(function($, $ui) {

	/**
	 * 内存管理器
	 */
	$ui.memory = {

		/**
		 * 树形内存结构
		 * 	将系统中的每一个元素以tree的形式搭建在一起
		 */	
		tree : {
			// 层级型关系根节点
			root : {
				obj : {
					uid : "root",
					pid : "root",
					children : new $ui.hashmap()
				}
			},

			/**
			 * 添加一个内存对象
			 * 参数 父级对象uid（字符串）
			 * 		内存对象（对象）
			 * 返回 无
			 */
			add : function(_pid, _obj) {
				_obj.pid = _pid;
				var parentObj = this.find(_pid);
				var children = parentObj.children;
				if (children == undefined) {
					children = new $ui.hashmap();
				}
				children.put(_obj.uid, _obj);
				parentObj.children = children;
			},

			/**
			 * 查找一个内存对象
			 * 参数 uid值（字符串）
			 * 返回 内存对象（json对象）
			 */
			find : function(_uid) {
				var result = undefined;
				var children = function(_children) {
					var map = _children;
					var has = false;
					map.call(function(obj) {
						if (obj.uid == _uid) {
							result = obj;
							has = true;
						}
					});
					if(!has){
						map.call(function(obj){
							children(obj.children);
						});
					}
				};

				if ($ui.memory.tree.root.obj.uid == _uid) {
					result = $ui.memory.tree.root.obj;
				} else {
					children($ui.memory.tree.root.obj.children);
				}
				return result;
			},

			/**
			 * 移除一个内存对象
			 * 参数 uid值（字符串）
			 * 返回 无
			 */
			remove : function(_uid) {
				var obj = this.find(_uid);
				var pid = obj.pid;
				this.find(pid).children.remove(_uid);
			}
		},
		
		/**
		 * 关系型内存结构
		 * 内存对象还是存在于tree中，此处只是uid的索引。
		 * */
		relate : {
			/*!
			 * 关系列表
			 * {
			 * 	pid:""	//主动方id
			 * 	sid:""	//被动方id
			 * }
			 * */
			list : new Array(),
			
			/**
			 * 添加一对关系
			 * 参数	主动方uid（字符串）
			 * 		被动方uid（字符串）
			 * 返回	无
			 * */
			add:function(_pid,_sid){
				if(_pid == _sid){
					$ui.debug("不能自己与自己建立关系");
				}else{
					var obj = {};
					obj.pid = _pid;
					obj.sid = _sid;
					var list = this.find(_pid);
					if(list.length == 0){
						this.list.push(obj);
					}else{
						var has = false;
						for(var i=0;i<list.length;i++){
							var o = list[i];
							if(o.sid == _sid){
								has = true;
							}
						}
						if(!has){
							this.list.push(obj);
						}
					}
				}
			},
			
			/**
			 * 移除关系
			 * 参数	删除依据的uid（字符串）
			 * 		依据类型（字符串）	可选值：pid|sid，默认pid
			 * 返回	无
			 * */
			remove:function(_uid,_type){
				for(var i=0;i<this.list.length;i++){
					var obj = this.list[i];
					if(_type == undefined || _type == "pid"){
						if(obj.pid == _uid){
							this.list[i] == undefined;
							delete this.list[i];
						}
					}else if(_type == "sid"){
						if(obj.sid == _uid){
							this.list[i] == undefined;
							delete this.list[i];
						}
					}
				}
			},
			
			/**
			 * 移除关系
			 * 参数	主动方uid（字符串）
			 * 		被动方uid（字符串）
			 * 返回	无
			 * */
			removeObj : function(_pid,_sid){
				for(var i = 0;i<this.list.length;i++){
					var obj = this.list[i];
					if(obj.pid == _pid && obj.sid == _sid){
						this.list[i] = undefined;
					}
				}
			},
			
			/**
			 * 查找关系
			 * 参数	查找依据的uid（字符串）
			 * 		依据类型（字符串）	可选值：pid|sid，默认pid
			 * 返回	以关系对为元素的array集合
			 * */
			find : function(_uid,_type){
				var result = new Array();
				for(var i=0;i<this.list.length;i++){
					var obj = this.list[i];
					if(obj != undefined){
						if(_type == undefined || _type == "pid"){
							if(obj.pid == _uid){
								result.push(obj);
							}
						}else if(_type == "sid"){
							if(obj.sid == _uid){
								result.push(obj);
							}
						}
					}
				}
				return result;
			}
		}
	};

})(jQuery, zwork);