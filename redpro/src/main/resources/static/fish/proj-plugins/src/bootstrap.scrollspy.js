/**
 * 改变scrollspy的配对方式
 *      <pre></pre>
 */
$.extend($.ui.scrollspy.prototype, {
	_create: function() {
        this.$body = $('body');
        var element = this.element;
        this.$scrollElement = $(element).is('body') ? $(window) : $(element);
        this.selector = (this.options.target || '') + ' .nav li > a';
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on('scroll', $.proxy(this._process, this));
        this.refresh();
        this._bindSelectorEvent();
        this._process();
    },
    _process: function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this._getScrollHeight()
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this._activate(i)
        }

        if (activeTarget && scrollTop <= offsets[0]) {
            return activeTarget != (i = targets[0]) && this._activate(i)
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop < offsets[i + 1]) && this._activate(targets[i])
        }//scrollTop <= offsets[i + 1]是不对的
    },
    _bindSelectorEvent:function(){
    	var self = this;
        
        this.$body.find(this.selector)
            .each(function(i,a) {
                var $el = $(a)
                var href = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href);
                $el.css("cursor","pointer");
                $el.on("click",function(e){
                	self.$scrollElement.animate({      
                		scrollTop: $href.offset().top- self.$scrollElement.offset().top + self.$scrollElement.scrollTop()
                		});
                	});
                
            })

    }
});