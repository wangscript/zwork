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
					map.call(function(obj) {
						if (obj.uid == _uid) {
							result = obj;
						} else {
							children(obj.children);
						}
					});
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
		relate : {
			list : new Array()
		}
	};

})(jQuery, zwork);