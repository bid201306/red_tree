(function($){
	$.extend({
		getStringWidth :function(str,fontSize)  
		{  
		    var span = $("#__getstringwidth");  
		    if (span.length==0) {  
		        span = $("<span id='__getstringwidth'></span>");  
		        span.css({
		        	"visibility":"hidden",
		        	"white-space":"nowrap",
		        		"position":"absolute"
		        });
		        $('body').append(span); 
		    }  
		    span.text(str);  
		    span.css("font-size",fontSize + "px");  
		  
		    return span.width();  
		},  
		getMaxStringWidth:function(arr,fontSize){
			var div = $("#__getmaxstringwidth");  
			if (div.length==0) {
				div = $("<div id='__getstringwidth'></div>");  
		        div.css({
		        	"visibility":"hidden",
		        	"position":"absolute",
		        	"display":"inline-block",
		        	"width":"auto"
		        });
		        $('body').append(div); 
			}
			div.empty();
			div.css("font-size",fontSize + "px");  
			
			var divContent ='';
			$.each(arr,function(i,str){
				if(str.length>0){
					str = str.replace("&","&amp;").replace("\"", "&quot;").replace("<","&lt;").replace(">","&gt;").replace(" ","&nbsp;");
				}
				divContent+='<p style="white-space:nowrap">'+str+'</p>'
				
			});
			if(divContent!=''){
				div.append(divContent);
			}
			var ret = div.width();
			div.empty();
			 return ret;  
		}
	});
	
	
})(jQuery);