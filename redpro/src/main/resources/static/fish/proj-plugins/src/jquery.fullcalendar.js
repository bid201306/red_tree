//fullCalendar
/*(function(){
	
	
	if($.fullCalendar){
		$.extend($.fullCalendar.Scroller.prototype,{
			
			applyOverflow: function() {
				this.scrollEl.css({
					'overflow': 'hidden !important'
				});
				this.scrollEl.css({
					'overflow-x': 'hidden !important',
					'overflow-y': 'hidden !important'
				});
				
				var style=this.scrollEl.attr('style');
				
				if(style!=null&&style!=''){
					style = style.replace("overflow-y: scroll","overflow-y: hidden");
					style = style.replace("overflow-x: scroll","overflow-x: hidden");
				}
				this.scrollEl.attr('style',style);
				
				
				$(this.scrollEl).niceScroll({
			        cursorcolor: '#1d5987',
			        cursorwidth: "10px",
			        cursoropacitymax:"0.4"//,autohidemode:false
			    });
			},// Positions the popover optimally, using the top/left/right options
			// Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
			// Useful for preserving scrollbar widths regardless of future resizes.
			// Can pass in scrollbarWidths for optimization.
			lockOverflow: function(scrollbarWidths) {
				var overflowX = this.overflowX;
				var overflowY = this.overflowY;

				scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();

				if (overflowX === 'auto') {
					overflowX = (
							scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
							// OR scrolling pane with massless scrollbars?
							this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth
								// subtract 1 because of IE off-by-one issue
						) ? 'scroll' : 'hidden';
				}

				if (overflowY === 'auto') {
					overflowY = (
							scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
							// OR scrolling pane with massless scrollbars?
							this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight
								// subtract 1 because of IE off-by-one issue
						) ? 'scroll' : 'hidden';
				}

				this.scrollEl.css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
			}
			
		});
	}
		
		
})()*/