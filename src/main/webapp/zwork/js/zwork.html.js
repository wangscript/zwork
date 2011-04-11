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
				+ "<div class='window_top'>" + "	<div class='window_border'>"
				+ "		<div class='window_left'></div>" + "		<div class='window_center'></div>"
				+ "		<div class='window_right'></div>" + "	</div>"
				+ "	<div class='window_titlebar'>" + "		<div class='window_ico'></div>"
				+ "		<div class='window_title'></div>" + "		<div class='window_buttons'>"
				+ "			<div class='window_min'></div>" + "			<div class='window_maxre'></div>"
				+ "			<div class='window_close'></div>" + "		</div>" + "	</div>"
				+ "</div>" + "<div class='window_center'>"
				+ "<div class='window_loading'></div>"
				+ "	<div class='window_leftborder'></div>"
				+ "	<div class='window_content'></div>"
				+ "	<div class='window_scroll'></div>"
				+ "	<div class='window_rightborder'></div>" + "</div>"
				+ "<div class='window_bottom'>" + "	<div class='window_border'>"
				+ "		<div class='window_left'></div>" + "		<div class='window_center'></div>"
				+ "		<div class='window_right'></div>" + "	</div>"
				+ "	<div class='window_statebar'>" + "	</div>" + "</div>" + "</div>",
				
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
				"<div class='layout_west'><div class='layout_title'></div><div class='layout_content'></div></div>" +
				"<div class='layout_center'><div class='layout_title'></div><div class='layout_content'></div></div>" +
				"<div class='layout_east'><div class='layout_title'></div><div class='layout_content'></div></div>" +
				"<div class='layout_south'>" +
				"<div class='layout_title'></div><div class='layout_content'></div></div>" +
				
				"<div class='layout_border_north'><div class='layout_button'></div></div>" +
				"<div class='layout_border_west'><div class='layout_button'></div></div>" +
				"<div class='layout_border_east'><div class='layout_button'></div></div>" +
				"<div class='layout_border_south'><div class='layout_button'></div></div>" +
				"</div>",
		
		accordion : "<div class='zwork-accordion'></div>",
		
		progressbar : "<div class='zwork-progressbar'>" +
				"<div class='progressbar_value'></div>" +
				"</div>",
				
		ajaxanimate :"<div class='zwork-ajaxanimate'>" +
					"	<table cellspacing='0' cellpadding='0' border='0' width='100%' height='100%'>" +
					"		<tr>" +
					"			<td valign='middle' align='center'>" +
					"				<table width='150px' height='150px'>" +
					"					<tr><td valign='middle' align='center'>" +
					"						<img alt='zwork' src='image/logo.gif' height='46px;'/>" +
					"					</td></tr>" +
					"					<tr><td height='40px' valign='middle' align='center'>请求数据</td></tr>" +
					"					<tr><td height='20px' valign='middle' align='center'><div type='progressbar' height='10' width='150' id='ajaxanimate_progressbar'></div></td></tr>" +
					"				</table>" +
					"			</td>" +
					"		</tr>" +
					"	</table>" +
					"</div>",
					
		tab:"<div class='zwork-tab'> "+
			"	<div class='tab_top'>"+
			"		<div class='tab_border'>"+
			"			<div class='tab_left'></div>"+
			"			<div class='tab_center'></div>"+
			"			<div class='tab_right'></div>"+
			"		</div>"+
			"		<div class='tab_navi'>"+
			"			<div class='tab_prev'></div>"+
			"			<div class='tab_titles'>"+
			"			</div>"+
			"			<div class='tab_next'></div>"+
			"			<div class='tab_list'></div>"+
			"		</div>"+
			"	</div>"+
			"	<div class='tab_center'>"+
			"		<div class='tab_left'></div>"+
			"		<div class='tab_content'></div>"+
			"		<div class='tab_right'></div>"+
			"	</div>"+
			"	<div class='tab_bottom'>"+
			"		<div class='tab_left'></div>"+
			"		<div class='tab_center'></div>"+
			"		<div class='tab_right'></div>"+
			"	</div>"+
			"</div>",
		
		contextmenu:"<div class='zwork-contextmenu'>"+
					"	<div class='contextmenu_top'>"+
					"		<div class='contextmenu_left'></div>"+
					"		<div class='contextmenu_center'></div>"+
					"		<div class='contextmenu_right'></div>"+
					"	</div>"+
					"	<div class='contextmenu_center'>"+
					"		<div class='contextmenu_left'></div>"+
					"		<div class='contextmenu_center'>"+
					"		</div>"+
					"		<div class='contextmenu_right'></div>"+
					"	</div>"+
					"	<div class='contextmenu_bottom'>"+
					"		<div class='contextmenu_left'></div>"+
					"		<div class='contextmenu_center'></div>"+
					"		<div class='contextmenu_right'></div>"+
					"	</div>"+
					"</div>"
		
	};
	
	//注册给zwork
	$ui.html = html;

})(zwork);