
/**
 * Websocket工具模块
 */
define(function(){

	
	return{
		/**
		 * 解析日期字符串，返回响应的Date对象, 格式为 yyyy-MM-dd HH:mm:ss
		 */
		parse:function(dateStr){
			if(!dateStr) return;
			
			var regexp = /(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/;
			var result = regexp.exec(dateStr);
			if(result && result.length == 7){
				var date =	new Date();
				date.setFullYear(result[1], parseInt(result[2]) - 1, result[3]);
				date.setHours(result[4]);
				date.setMinutes(result[5]);
				date.setSeconds(result[6]);
				date.setMilliseconds(0);
				return date;
			}
		},
		
		format:function(dateObj){
			
			if(dateObj instanceof Date){
				var result = "yyyy-MM-dd HH:mm:ss";
				
				result = result.replace("yyyy", dateObj.getFullYear());
				
				var month = dateObj.getMonth()+1;
				if(month<10){
					result = result.replace("MM", "0" + month);
				}else{
					result = result.replace("MM", month);
				}
				
				var date = dateObj.getDate();
				if(date<10){
					result = result.replace("dd", "0" + date);
				}else{
					result = result.replace("dd",  date);
				}
				
				var hours = dateObj.getHours();
				if(hours<10){
					result = result.replace("HH", "0" + hours);
				}else{
					result = result.replace("HH",  hours);
				}
				
				var minutes = dateObj.getMinutes();
				if(minutes<10){
					result = result.replace("mm", "0" + minutes);
				}else{
					result = result.replace("mm",  minutes);
				}
				
				var seconds = dateObj.getSeconds();
				if(seconds<10){
					result = result.replace("ss", "0" + seconds);
				}else{
					result = result.replace("ss",  seconds);
				}
				
				return result;
			}else{
				return "";
			}
			
		}
	}
});