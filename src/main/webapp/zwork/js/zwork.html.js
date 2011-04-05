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
				"<div class='button_left'></div>" +
				"<div class='button_center'></div>" +
				"<div class='button_right'></div>" +
				"</div>",
		
		//模态窗口是的背景
		mask : "<div class='zwork-mask'></div>",
		
		//消息弹出框
		messager:"<div class='zwork-messager'><div class='messager_content'></div>" +
				"<div class='messager_bar'>" +
				"<div type='button' position='right' id='ok'>确定</div><div id='cancel' type='button' label='取消' position='right'></div>" +
				"</div></div>",
		
		layout:"<div class='zwork-layout'>" +
				"<div class='layout_north'><div class='layout_title'></div><div class='layout_content'></div></div>" +
				"<div class='layout_west'><div class='layout_title'></div><div class='layout_content'><iframe width='100%' height='100%' frameborder='0'></iframe></div></div>" +
				"<div class='layout_center'><div class='layout_title'></div><div class='layout_content'><iframe width='100%' height='100%' frameborder='0'></iframe></div></div>" +
				"<div class='layout_east'><div class='layout_title'></div><div class='layout_content'><iframe width='100%' height='100%' frameborder='0'></iframe></div></div>" +
				"<div class='layout_south'><div class='layout_title'></div><div class='layout_content'><iframe width='100%' height='100%' frameborder='0'></iframe></div></div>" +
				"<div class='layout_border_north'><div class='layout_button'></div></div>" +
				"<div class='layout_border_west'><div class='layout_button'></div></div>" +
				"<div class='layout_border_east'><div class='layout_button'></div></div>" +
				"<div class='layout_border_south'><div class='layout_button'></div></div>" +
				"</div>"
	};
	
	//注册给zwork
	$ui.html = html;

})(zwork);