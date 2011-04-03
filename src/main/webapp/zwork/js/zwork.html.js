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
		button : "<div class='zwork-button'>" +
				"<div class='left'></div>" +
				"<div class='center'></div>" +
				"<div class='right'></div>" +
				"</div>",
		
		//模态窗口是的背景
		mask : "<div class='zwork-mask'></div>",
		
		//消息弹出框
		messager:"<div class='zwork-messager'><div class='msg'></div>" +
				"<div class='bar'>" +
				"<div type='button' position='right' id='ok'>确定</div><div id='cancel' type='button' label='取消' position='right'></div>" +
				"</div></div>"
	};
	
	//注册给zwork
	$ui.html = html;

})(zwork);