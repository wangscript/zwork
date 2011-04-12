(function($){
	
	$.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	}, "Letters, numbers or underscores only please");
	
	$.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please"); 
	
	$.validator.addMethod("phone", function(v, element) {
	    v = v.replace(/\s+/g, ""); 
		return this.optional(element) || v.match(/^[0-9 \(\)]{7,30}$/);
	}, "Please specify a valid phone number");
	
	$.validator.addMethod("postcode", function(v, element) {
	    v = v.replace(/\s+/g, ""); 
		return this.optional(element) || v.match(/^[0-9 A-Za-z]{5,20}$/);
	}, "Please specify a valid postcode");
	
	$.validator.addMethod("date", function(v, element) {
	    v = v.replace(/\s+/g, ""); 
		return this.optional(element) || v.match(/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/);
	});
	
	$.validator.addClassRules({
		date: {date: false},
		alphanumeric: { alphanumeric: true },
		lettersonly: { lettersonly: true },
		phone: { phone: true },
		postcode: {postcode: true}
	});
	$.validator.setDefaults({errorElement:"div"});
	$.validator.autoCreateRanges = true;
	
	$.extend($.validator.messages, {
		required : "必选字段",
		remote : "请修正该字段",
		email : "请输入正确格式的电子邮件",
		url : "请输入合法的网址",
		date : "请输入合法的日期",
		dateISO : "请输入合法的日期 (ISO).",
		number : "请输入合法的数字",
		digits : "只能输入整数",
		creditcard : "请输入合法的信用卡号",
		equalTo : "请再次输入相同的值",
		accept : "请输入拥有合法后缀名的字符串",
		maxlength : jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength : jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
		rangelength : jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range : jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max : jQuery.validator.format("请输入一个最大为 {0} 的值"),
		min : jQuery.validator.format("请输入一个最小为 {0} 的值")
	});
	
	if($.metadata){
		$.metadata.setType("attr", "validate");
	}
	
})(jQuery);