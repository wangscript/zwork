(function($ui){
	
	$ui.listener.add("a_target_ajax",function(_c,_p){
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
					$ui($(this),_p);
				});
				return false;
			});
		});
	});
	
	$ui.listener.add("a_target_tab",function(_c,_p){
		var systab = $ui.find($($ui.config.systab));
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
					systab.add(item);
					return false;
				});
				
			});
			
		}else{
			$ui.debug("默认的tab没有找到！");
		}
	});
	
})(zwork);