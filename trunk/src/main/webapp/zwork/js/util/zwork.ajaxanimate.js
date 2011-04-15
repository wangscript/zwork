(function($,$z){
	
	$z.ajaxanimate = {
		obj : undefined,
		animate : false,
		timeId : undefined,
		closeAnimate : function(){
			var _this = this;
			
			clearTimeout(_this.timeId);
			_this.timeId = setTimeout(function(){
				_this.animate = false;
				_this.obj.fadeOut();
				
				var zobj = $z.find($("#ajaxanimate_progressbar"));
				zobj.value(100).maxValue(100);
				
			},200);
			
		},
		openAnimate : function(){
			var _this = this;
			
			clearTimeout(_this.timeId);
			_this.timeId = setTimeout(function(){
				_this.animate = true;
				_this.obj.fadeIn();
				
				var zobj = $z.find($("#ajaxanimate_progressbar"));
				zobj.value(0).maxValue(100);
				
				_this.progressUpdate();
			},200);
			
		},
		init : function(){
			var _this = this;
			
			_this.obj = $($z.html.ajaxanimate);
			_this.obj.appendTo($("body"));
			$z($("body"));
			_this.obj.hide();
			
			_this.obj.bind("ajaxStart",function(e){
				_this.openAnimate();
			}).bind("ajaxStop",function(){
				_this.closeAnimate();
			});
			
		},
		progressUpdate : function(){
			
			var _this = this;
			
			var zobj = $z.find($("#ajaxanimate_progressbar"));
			
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