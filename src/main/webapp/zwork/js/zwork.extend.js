(function($ui){
	
	$ui.extend = function(_this,_super){
		for(var p in _super){
			_this[p] = _super[p];
		}
		for(var p in _super.prototype){
			_this.prototype[p]=_super.prototype[p];
		} 
		return _this;
	};
	
})(zwork);