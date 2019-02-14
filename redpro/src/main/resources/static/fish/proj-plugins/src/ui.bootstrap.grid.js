/**
 * bootstrap表格
 */
!function($) {
	var pluginName = "bsgrid";
	var dataKey = "ui.bootstrap.grid";
	

	// 初始化表格
	function init(target) {	
		var opts = $.data(target, dataKey).options;		
		$(target).addClass("table bsgrid");		
		var tHead = $("<thead><tr></tr></thead>");		
		$.each(opts.columns, function(index, element) {
			var width = element["width"];
			var hcell = $("<th></th>").text(element["title"])
			if(width){
				hcell.css("width", width);
			}
			hcell.appendTo(tHead.find("tr"));
		});		
		tHead.appendTo(target);
		$(target).append("<tbody></tbody>");
		
		loadData(target, opts.data);
		
		var offset = 6;//偏移量
		var tHeadHeight = $(target).find("thead").height();
		$(target).find("tbody").height(opts.height - tHeadHeight - offset);
		
		$(target).find("tbody tr:first td").each(function(index, tdElement){
			var width = $(tdElement).width();
			var exp = "thead th:eq(index)".replace("index", index);
			var hwidth = $(target).find(exp).width();
			if(hwidth != width){
				$(target).find(exp).width($(tdElement).width());
			}
		});
		
		$(target).find("tbody").niceScroll({
			cursorcolor: '#424242',
			cursorwidth:"5px",
			cursoropacitymax:"1"
		});
	}
	
	function loadData(target, data){
		var _gdata;
		if(data instanceof Array){
			_gdata = {
				rows:data,
				total:data.length
			}
		}else if(data instanceof Object){
			_gdata = data;
		}
		if(!_gdata) return;
		
		var opts = $.data(target, dataKey).options;
		
		$(target).find("tbody > tr").remove();
		$.each(_gdata.rows, function(index, rowData){
			var tRow = $("<tr></tr>").attr("data-errorId", rowData.errorId);
			$.each(opts.columns, function(index, element) {
				var width = element["width"];
				var cell = $("<td></td>").text(rowData[element["field"]]);
				if(width){
					cell.css("width", width);
				}
				cell.appendTo(tRow);
			});
			$(target).find("tbody").append(tRow);			
		});
		
		$.data(target,dataKey).runParams.total = _gdata.total;
	}

	function insertRow(target, rowData){
		if(!rowData ) return;
		
		var _rows;
		if(rowData instanceof Array){
			_rows = rowData;
		}else if(rowData instanceof Object){
			_rows = [rowData];
		}
		
		var opts = $.data(target, dataKey).options;
		
		var rowList = [];
		$.each(_rows, function(index, rowData){
			var cellList = [];
			$.each(opts.columns, function(index, element) {
				var width = element["width"];
				
				var cell = $("<td></td>");
				var text = rowData[element["field"]];
				if(element.formatter){
					cell.html(element.formatter(text, rowData));
				}else{
					cell.text(text);
				}
				if(width){
					cell.css("width", width);
				}
				cellList.push(cell);
			});
			
			var cellsHTMLStr = "";
			$.each(cellList, function(index, cellElement){
				cellsHTMLStr += cellElement[0].outerHTML;
			});
			
			var trElement = $("<tr></tr>").attr("data-errorId", rowData.errorId).html(cellsHTMLStr);
			rowList.push(trElement);
		});
		
		var rowHTMLStr = "";
		$.each(rowList, function(index, rowElement){
			rowHTMLStr += rowElement[0].outerHTML;
		});
		
		$(target).find("tbody").prepend(rowHTMLStr);	
		$.data(target,dataKey).runParams.total += rowList.length;
	}
	
	function deleteRow(target, idFieldValue){
		var result;
		if(idFieldValue){
			var exp = "tbody > tr[data-errorId=#id#]".replace("#id#", idFieldValue);
			result = $(target).find(exp);
		}else{
			result = $(target).find("tbody > tr:last");
		}
		//删除Dom元素
		if(result && result.length && result.length == 1){
			$.data(target,dataKey).runParams.total -= 1;
			
			result.remove();
			result.html(null);
			
			try{
				delete result[0];
				delete result.context;
				delete result.prevObject;
				delete result.length;
				delete result.selector
				delete result.__proto__;
				delete result;
				result=null;
			}catch(e){}
		}
	}
	
	/**
	 * 清空溢出的数据
	 */
	function clearOverflow(target){
		var opts = $.data(target, dataKey).options;		
		while(true){
			var rowCount = $.data(target,dataKey).runParams.total;
			if(rowCount <= opts.pageSize){
				break;
			}
			deleteRow(target);
		}
	}
	
	function getTotal(target){
		return $.data(target, dataKey).runParams.total;
	}

	$.fn.bsgrid = function(options, param) {
		if (typeof options == 'string') {
			switch(options){
				case 'insertRow':
					return this.each(function(){
						insertRow(this, param);
					});
				case 'loadData':
					return this.each(function(){
						loadData(this, param);
					});
				case 'deleteRow':
					return this.each(function(){
						deleteRow(this, param);
					});
				
				case 'getTotal':
					return getTotal(this[0], param);
					
				case 'clearOverflow':
					return clearOverflow(this[0], param);	
					
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, dataKey);
			if (state) {
				$.extend(state.options, options);
			} else {
				state = $.data(this, dataKey, {
					options : $.extend({}, $.fn.bsgrid.defaults, options),
					runParams:{total:0} //运行时参数
				});
			}
			init(this);
		});
	};

	$.fn.bsgrid.defaults = {
		data:[]
	}

}(jQuery);