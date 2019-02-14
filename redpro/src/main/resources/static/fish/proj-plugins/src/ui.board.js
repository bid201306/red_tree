
!(function($, window, document, undefined) {

	var Board = function(ele, opt) {
		this.$element = ele;
		this.defaults = {

		};
		this.options = $.extend({}, this.defaults, opt);
		this.init();
	}

	Board.prototype.init = function() {
		var tHead = $("<div class = 'boardInfo-title'><ul><li></li></ul></div>");
	    this.$element.append(tHead);
		$.each(this.options.columns, function(index, element) {
			var width = element["width"];
			var hcell = $("<span class = "+ element["field"] +"></span>").text(element["title"])
			if(width) {
				hcell.css("width", width);
			}
			hcell.appendTo(tHead.find("li"));
		});
	}
	
	Board.prototype.setBoardData = function(params) {
		var that = this;
		var tBody = $("<div class = 'boardInfo-body'><ul></ul></div>");
		this.$element.append(tBody);
		$.each(params, function(index, element) {
			var $li = that.$element.find(".boardInfo-title ul li").clone();
			$li.attr("data-index",element.errorOrderId);
			$li.find("span").each(function(){
				$(this).html(element[$(this).attr('class')]);
			})
			tBody.find("ul").append($li);
		});	
	}
	
	Board.prototype.insertRow = function(params) {
		var $li = this.$element.find(".boardInfo-title ul li").clone();
		$li.attr("data-index",params.errorOrderId);
		$li.find("span").each(function(){
			$(this).html(params[$(this).attr('class')]);
		});
		this.$element.find(".boardInfo-body ul").prepend($li);
	}
	
	Board.prototype.deleteRow = function(params) {
		this.$element.find(".boardInfo-body ul > li[data-index = " + params.errorOrderId + "]").remove();	
	}
	
	$.fn.board = function(options, params) {
		var board = new Board(this, options);
		return board;
	}

})(jQuery, window, document, undefined);