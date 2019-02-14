/*
*Cloud\Cloud-web\src\main\webapp\resources\fish\fish-desktop\third-party\contextmenu\fish.contextmenu.js
*/
/*
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
			$a = $('<a></a>');//<modified-comments>把href='/#'去掉了</modified-comments>
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
*/