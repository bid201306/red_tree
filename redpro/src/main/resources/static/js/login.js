function yz_magicPreview(){ 
	xOffset = -25;
	yOffset = -150;
	$(".yz_magic").hover(function(e){
		$("body").append("<p id='yz_magic'><img src='"+$(this).attr("go")+"' /><br><span>"+$(this).attr("tips")+"</span></p>");   
		$("#yz_magic")
		.css("top",(e.pageY - xOffset) + "px")
		.css("left",(e.pageX + yOffset) + "px")
		.fadeIn("fast");  
	},
	function(){
		this.title = this.t; 
		$("#yz_magic").remove();
	}); 
	$(".yz_magic").mousemove(function(e){
		$("#yz_magic")
		.css("top",(e.pageY-xOffset)+"px")
		.css("left",(e.pageX+yOffset)+"px");
	}); 
};

function login(){
	var user = $('#user').val();
	var password = $('#password').val();
	var rememberMe = $("#checkRememberMe").prop("checked");
	if(user == '' || password == ''){
		$.alert.send("用户名和密码不能为空", 'danger');
		return;
	}
	$.ajax({
		   type: "POST",
		   url: "/redpro/login/validate",
		   data: {"user":user, "password":password, "rememberMe": rememberMe},
		   success: function(msg){
			   var data = JSON.parse(msg);
			   $.alert.send("登录成功", 'success');
			   
		       window.location.href = '/redpro';
		   },
		   error:function(obj, textStatus, errorThrown){
			   $.alert.send(obj.responseJSON.msg, 'warning');
		   }
		});
}


$(function(){
	yz_magicPreview();
})
