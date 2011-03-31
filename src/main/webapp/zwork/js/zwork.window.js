(function($,$ui){
	
	var window = function(_config){
		return new window.window();
	};
	
	window.window = function(_config){
		$ui.extend(this,new $ui.view());
		
		var config = {
			type : "window"
		};
		this.config = config;
		
	};
	
	$ui.window = window;
	
})(jQuery,zwork);