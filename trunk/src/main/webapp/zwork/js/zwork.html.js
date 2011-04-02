/* !
 * file : zwork.html
 * author : 赵振华
 * 	各个组件的html结构。
 */

(function($ui) {

	/**
	 * html对象
	 * */
	var html = {
		
		//窗口对象的html结构
		window : "<div class='zwork-window' zobj>" 
				+ "<div class='top'>" + "	<div class='border'>"
				+ "		<div class='left'></div>" + "		<div class='center'></div>"
				+ "		<div class='right'></div>" + "	</div>"
				+ "	<div class='titlebar'>" + "		<div class='ico'></div>"
				+ "		<div class='title'></div>" + "		<div class='buttons'>"
				+ "			<div class='min'></div>" + "			<div class='maxre'></div>"
				+ "			<div class='close'></div>" + "		</div>" + "	</div>"
				+ "</div>" + "<div class='center'>"
				+ "<div class='loading'></div>"
				+ "	<div class='leftborder'></div>"
				+ "	<div class='content'></div>"
				+ "	<div class='scroll'></div>"
				+ "	<div class='rightborder'></div>" + "</div>"
				+ "<div class='bottom'>" + "	<div class='border'>"
				+ "		<div class='left'></div>" + "		<div class='center'></div>"
				+ "		<div class='right'></div>" + "	</div>"
				+ "	<div class='statebar'>" + "	</div>" + "</div>" + "</div>",
				
		//按钮对象的html结构
		button : "",
		
		//模态窗口是的背景
		mask : "<div class='zwork-mask'></div>",
		
		//消息弹出框
		messager:"<div class='zwork-messager'><div class='msg'></div>" +
				"<div class='bar'>" +
				"<div class='ok'>确定</div><div class='cancel'>取消</div>" +
				"</div></div>"
	};
	
	//注册给zwork
	$ui.html = html;

})(zwork);