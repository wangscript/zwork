(function($z){
	
	$z.listener.add("a_target_ajax",function(_c,_p){
		$("a[target='ajax']",_c).each(function(){
			var current = $(this);
			current.unbind("click");
			current.bind("click",function(){
				var href = current.attr("href");
				var rel = current.attr("rel");
				var scope = current.attr("scope");
				
				var container = _c;
				if(scope == undefined || scope == "container")
					container = _c;
				else
					container = $(document);
				
				$("#"+rel,container).load(href,function(){
					$z($(this),_p);
				});
				return false;
			});
		});
	});
	
	$z.listener.add("a_target_tab",function(_c,_p){
		var systab = $z.find($($z.config.systab));
		if(systab!=undefined){
			
			$("a[target='tab']",_c).each(function(){
				var current = $(this);
				
				current.unbind("click");
				current.bind("click",function(){
					var item = {};
					item.src = current.attr("href");
					item.id = current.attr("rel") || "_blank";
					if(current.html()!="")
						item.title = current.html();
					item.title = (current.attr("title")||item.title) || "无标题标签页";
					item.iframe = eval(current.attr("iframe") || false);
					var tabid = current.attr("tabid");
					if(tabid!=undefined){
						systab = $z.find($("#"+tabid,_c));
					}
					systab.add(item);
					return false;
				});
				
			});
			
		}else{
			$z.debug("默认的tab没有找到！");
		}
	});
	
	$z.listener.add("a_target_window",function(_c,_p){
		$("a[target='window']",_c).each(function(){
			var current = $(this);
			current.unbind("click");
			current.bind("click",function(){
				$z.window().show();
				return false;
			});
			
		});
	});
	
	$z.listener.add("form_submit",function(_c,_p){
		$("form" , _c).each(function(){
			var current = $(this);
			var listened = current.data("listened");
			if(!listened){
				current.get(0).submit = function(){
					if(current.hasClass("validate")){
						if (!current.valid()) {
							return false;
						}
					}
					$.ajax({
						type: current.get(0).method || 'POST',
						url:current.attr("action"),
						data:current.serializeArray(),
						cache: false,
						success: undefined,
						error: undefined
					});
					return false;
				};
				current.data("listened",true);
			}
		});
	});
	
})(zwork);