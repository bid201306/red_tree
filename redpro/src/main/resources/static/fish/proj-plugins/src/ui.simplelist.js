/**
 * List<br>
 * @class fish.desktop.widget.Simplelist
 * @extends fish.desktop.widget
 *
 * 用法:<br/>
 *      <pre></pre>
 */
!function() {
    $.widget('ui.simplelist', {
        options: {
            data:[],
            key:"id",
            value:"value",
            chosen:"chosen",
            badge:"默认"
        },
        _create: function() {
            var $el = this.element;

            this.options = $.extend({}, this.options, {
            	data:[]
            });

            this._createUI();
            this._bindEvent();
        },
        _init: function() {},
        _destroy: function() {},
        _createUI: function () {
        	this._render();
        	
        },
        _render:function(){
        	var $el = this.element;
        	var template='<a class="list-group-item  {{#if '+this.options.chosen+'}} active {{/if}} <span class="badge isdefault">'+badge+'</span><span class="close">x</span>'
        	+'<h4 class="list-group-item-heading">{{'+this.options.key+'}}</h4><p class="list-group-item-text">'+this.options.value+'</p></a>';
        	var t = fish.compile(template);
        	$.each(data,function(i,o){
        		$el.append(t(o));
        	});
        	
        },
        _bindEvent: function () {
        }
    });
}();
