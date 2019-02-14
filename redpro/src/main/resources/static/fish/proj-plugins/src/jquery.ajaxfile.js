/*
 * jQuery downloadfile Plugin 
 * by Ted guo.
 * Usage
 * 
 * $.ajaxFile("http://localhost:8080/Cloud-web/excel/export",{});
 * 
 * options里面所有的数据都会post到url
 */
(function($){
	$.extend({
		ajaxFile:function(url,options){
			
			var tmpform = $('<form name="downloadform" action="' + encodeURI(url) + '" method="post" accept-charset="utf-8" style="display:none"></form>');
			$('body').append(tmpform);//不在 文档流内的form，ie无法提交，但是chrome可以
			
			
			if(options){
				for(var key in options){
					if(options[key]!=null){
						
						var input = $('<input type="text" name="'+key+'" id="'+key+'">');
						
						var val = JSON.stringify(options[key]);
						
						input.val(val);
						tmpform.append(input);
					}
				}
			}
			tmpform.submit();
			tmpform.remove();
			return true;
		}
	});
})(jQuery);