/* !
 * file : zwork.extend
 * author : 赵振华
 * 	基于属性copy的js继承。
 */
(function($z){
	
	/**
	 * 继承方法
	 * 参数	子对象（对象）
	 * 		被继承对象（对象）
	 * 返回	子对象（对象）
	 * */
	$z.extend = function(_this,_super){
		for(var p in _super){
			_this[p] = _super[p];
		}
		for(var p in _super.prototype){
			_this.prototype[p]=_super.prototype[p];
		} 
		return _this;
	};
	
})(zwork);