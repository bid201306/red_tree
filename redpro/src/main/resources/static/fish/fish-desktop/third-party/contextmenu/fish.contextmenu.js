/**
 * 右键菜单插件
 * @class fish.desktop.widget.ContextMenu
 * @extends fish.desktop.widget
 * <pre>
 *  $(element).contextmenu(option);
 * </pre>
 */
!function(){
	'use strict';

	var defaults = {
		/**
         * 设置菜单淡出的速度，默认是100ms
         * @cfg {Number} fadeSpeed=100
         */
		fadeSpeed: 100,
		/**
         * 放置菜单的容器
         * @cfg {String} container=body
         */
		container:'body',
		/**
         * 如果设置成auto，当菜单下方弹出空间不够的时候，菜单会自动改成向上弹出。如果设置成true，则不会计算空间，弹出效果类似popup
         * @cfg {String|Boolean} above=auto
         */
		above: 'auto',
		/**
		 * @since V2.5.0
		 * 触发右键菜单的元素
		 * @cfg {String} selector=body
		 */
		selector: 'body',
		/**
		 * @since V2.5.0
		 * 菜单选项
		 * @cfg {Object} items={'key': {'name': 'item1', callback: $.noop}}
		 * @cfg {Object} items.key={'name': 'item1'} 菜单项属性值
		 * @cfg {String} items.key.name='item1' 菜单项name
		 * @cfg {Function} [items.key.callback=$.noop] 菜单项点击后回调函数
		 * <pre>
		 * 	items: {
	            "item1": {
	                "name": "Action", 
	                "items": {
	                    "item1-1": {"name": "sub1"},
	                    "item1-2": {"name": "sub2"},
	                    "item1-3": {"name": "sub3"}
	                }
	            },
	            "item2": {
	                "name": "Another action",
	                //e click菜单项事件
	                //item 选中菜单项的name
	                callback: function(e, item) {
	                    var m = item + " was clicked";
	                    console.log(m); 
	                }
	            },
	            "item3": {"name": "Something else here"},
	            "item4": {"name": "Separated link"}
        	}
		 * </pre>
		 */
		items: {},
		/**
		 * 右键菜单展示事件
		 * @cfg {Function} show=$.noop
		 * <pre>
		 * 		show: function(e) {
		 * 			//e 右键菜单展开事件
		 * 		}
		 * </pre>
		 */
		show: $.noop,
		/**
		 * 右键菜单隐藏事件
		 * @cfg {Function} hide=$.noop
		 * <pre>
		 * 		hide: function(element) {
		 * 			//element 触发右键菜单元素 
		 * 		}
		 * </pre>
		 */
		hide: $.noop
	};

	function _create(o) {
		$(o.container).append(_createMenu(o, true));
	};

	function _createMenu(opt, root, cfg) {
		var $li, $a;

		if (cfg === undefined) {
            cfg = opt;
        }
		opt.$menu = root ? $('<ul class="dropdown-menu dropdown-context"></ul>')
			 			 : $('<ul class="dropdown-menu dropdown-context dropdown-context-sub"></ul>');
		opt.$menu.data({
			'contextMenu': opt,
            'contextMenuRoot': cfg
		});
		opt.callbacks = {};
		if (!cfg.callbacks) {
            cfg.callbacks = {};
        }

		$.each(opt.items, function(key, item) {
			$li = $('<li></li>');
			$a = $('<a></a>');
			item.$node = $li.data({
                'contextMenu': opt,
                'contextMenuRoot': cfg,
                'contextMenuKey': key
            });
			if (item.items) {
				item.appendTo = item.$node;
				$a.append(item.name || '');
				$li.append($a)
				   .append(_createMenu(item, false, cfg))
				   .addClass('dropdown-submenu')
				   .data('contextMenu', item);
				item.callback = null;
			} else {
				$.each([opt, cfg], function (i, k) {
                    if ($.isFunction(item.callback)) {
                        k.callbacks[key] = item.callback;
                    }
            	});
				$a.append(item.name || '');
				$li.append($a);
			}
			opt.$menu.append($li);
		});
		return opt.$menu;
	};

	function _buildMenu(e) {
		var $this = $(this), $contextmenu = e.data.$menu;
		e.data.$trigger = $this;
		e.data.contextmenuEl = e.target;
		e.preventDefault();
		e.stopPropagation();
		$('.dropdown-context:not(.dropdown-context-sub)').hide();

		if (typeof e.data.above == 'boolean' && e.data.above) {
			$contextmenu.addClass('dropdown-context-up').css({
				top: e.pageY - $contextmenu.height(),
				left: e.pageX - 13
			}).fadeIn(e.data.fadeSpeed);
		} else if (typeof e.data.above == 'string' && e.data.above == 'auto') {
			var autoH = $contextmenu.height() + 12;
			var autoW = $contextmenu.width();
			var htmlH = $('html').height();
			var htmlW = $('html').width();
			var left,top,right;
			if ((e.pageY + autoH) > htmlH) {
				top = e.pageY - autoH;
			} else {
				top = e.pageY;
			}
			if((e.pageX + autoW) > htmlW){//距离右边没有空间了
				left = 'auto';
				right = 0;
			}else{
				left = e.pageX - 13;
				right = 'auto';
			}
			$contextmenu.css({
				top: top,
				left: left,
				right:right
			}).fadeIn(e.data.fadeSpeed);
		}
		e.data.show.call(this, e);
	};

	function _itemClick(e) {
        var $this = $(this),
            data = $this.data(),
            opt = data.contextMenu,
            root = data.contextMenuRoot,
            key = data.contextMenuKey,
            callback;

        if (!opt.items[key] || $this.is('.dropdown-submenu')) {
            return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if ($.isFunction(root.callbacks[key]) && Object.prototype.hasOwnProperty.call(root.callbacks, key)) {
            callback = root.callbacks[key];
        } else if ($.isFunction(root.callback)) {
            callback = root.callback;
        } else {
            return;
        }

        callback.call(root.$trigger, e, opt.items[key].name);
    };

	function _hide(e) {
		if ($('.dropdown-context').is(":visible")) {
			$('.dropdown-context').fadeOut(e.data.fadeSpeed, function(){
				$('.dropdown-context').css({display:''});
			});
			e.data.hide.call(this, e.data.contextmenuEl);
		};
	};

	function _delegateEvents(o) {
		$(document).on({'click': _hide, 'contextmenu': _hide}, o)
				   .on('mouseup', '.dropdown-context li', o, _itemClick)
				   .on('contextmenu', o.selector, o, _buildMenu)
				   .on('contextmenu', '.dropdown-context', function(e){
						e.preventDefault();
					});		
	};

	$.contextmenu = function (options) {
		var o = $.extend(true, {}, defaults, options || {});
		_delegateEvents(o);
		_create(o);
	};

}();
