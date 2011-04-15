/* !
 * file : zwork.hashmap
 * author : 赵振华
 * 	基于对象的简单map
 */

(function($z, $) {

	/**
	 * hashmap对象，用function构建
	 * */
	var hashmap = function() {
		//长度
		this.length = 0;
		//容器
		this.container = {};
	};

	/**
	 * 放入一个键值对
	 * 参数	键（对象）
	 * 		值（对象）
	 * 返回	无
	 * */
	hashmap.prototype.put = function(objName, objValue) {
		try {
			if (objValue && objName && objName != "") {
				this.container[objName] = objValue;
				this.length++;
			}
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 根据键获取值
	 * 参数	键（对象）
	 * 返回	值（对象）
	 * */
	hashmap.prototype.get = function(objName) {
		try {
			if (this.container[objName])
				return this.container[objName];
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 判断对象是不是在当前map中
	 * 参数	值（对象）
	 * 返回	是否存在（布尔值）
	 * */
	hashmap.prototype.has = function(objValue) {
		try {
			for ( var p in this.container) {
				if (this.container[p] === objValue)
					return true;
			}
			return false;
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 根据键移除一对键值对
	 * 参数	键（对象）
	 * 返回	无
	 * */
	hashmap.prototype.remove = function(objName) {
		try {
			if (this.container[objName]) {
				delete this.container[objName];
				this.length--;
			}
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 根据键移除一对键值对，并且返回被移除的值
	 * 参数	键（对象）
	 * 返回	值（对象）
	 * */
	hashmap.prototype.pop = function(objName) {
		try {
			var ov = this.container[objName];
			if (ov) {
				delete this.container[objName];
				this.length--;
				return ov;
			}
			return null;
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 移除所有键值对
	 * 参数	无
	 * 返回	无
	 * */
	hashmap.prototype.removeAll = function() {
		try {
			this.clear();
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 清空对象
	 * 参数	无
	 * 返回	无
	 * */
	hashmap.prototype.clear = function() {
		try {
			delete this.container;
			this.container = {};
			this.length = 0;
		} catch (e) {
			$z.debug( e );
		}
	};

	/**
	 * 判断是否为空
	 * 参数	无
	 * 返回	是否为空（布尔值）
	 * */
	hashmap.prototype.isEmpty = function() {
		if (this.length === 0)
			return true;
		else
			return false;
	};

	/**
	 * 执行回调函数，每一个键值对都要执行，并且回调函数接受键值对的值。
	 * 参数	回调函数（function对象）
	 * 返回	无
	 * */
	hashmap.prototype.call = function(fun) {
		try {
			if (!fun)
				$z.debug("未定义处理函数");
			for ( var p in this.container) {
				var ov = this.container[p];
				fun(ov,p);
			}
		} catch (e) {
			$z.debug( e );
		}
	};

	//注册给zwork
	$z.hashmap = hashmap;

})(zwork, jQuery);