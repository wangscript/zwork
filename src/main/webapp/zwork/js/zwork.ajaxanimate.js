(function($,$ui){
	
	$ui.ajaxanimate = {
		obj : undefined,
		animate : false,
		timeId : undefined,
		closeAnimate : function(){
			var _this = this;
			_this.animate = false;
			_this.obj.fadeOut(100);
			
			var zobj = $ui.find($("#ajaxanimate_progressbar"));
			zobj.value(100).maxValue(100);
		},
		openAnimate : function(){
			var _this = this;
			
			_this.animate = true;
			_this.obj.fadeIn(100);
			
			var zobj = $ui.find($("#ajaxanimate_progressbar"));
			zobj.value(0).maxValue(100);
			
			_this.progressUpdate();
			
		},
		init : function(){
			var _this = this;
			
			_this.obj = $($ui.html.ajaxanimate);
			_this.obj.appendTo($("body"));
			_this.obj.stop().fadeIn();
			
			$ui($("body"));
			
			$("body").attr("onload","$ui.ajaxanimate.closeAnimate();");
			
			_this.obj.bind("ajaxStart",function(e){
				_this.openAnimate();
			}).bind("ajaxStop",function(){
				_this.closeAnimate();
			});
			
			_this.openAnimate();
			
		},
		progressUpdate : function(){
			
			var _this = this;
			
			var zobj = $ui.find($("#ajaxanimate_progressbar"));
			
			var update = function(){
				zobj.value(zobj.value() + 2);
				zobj.maxValue(zobj.maxValue() + 2);
				if(_this.animate){
					setTimeout(update,150);
				}
			};
			update();
			
		}
		
	};
	
})(jQuery,zwork);