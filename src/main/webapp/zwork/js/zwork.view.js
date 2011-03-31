(function($,$ui){
	
	$ui.view = function(){
		var type = function(){
			return this.config.type;
		};
		this.type = type;
	};
	
})(jQuery,zwork);