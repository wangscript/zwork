/**
 * 获取当前对象所在的页面（片段）
 * @param _obj
 * @returns
 */
var findCurrentPage = function(_obj){
	return $(_obj).findParentContainer();
};

/**
 * 关闭当前页面
 * @param _obj
 * @returns
 */
var closeCurrentPage = function(_obj){
	var container = findCurrentPage(_obj);
	if(container.hasClass("zwork-window")){
		$z.find(container).hide();
	}else if(container.hasClass("tab_page")){
		$z.find(container.findParentContainer()).close(container.attr("id"));
	}
};