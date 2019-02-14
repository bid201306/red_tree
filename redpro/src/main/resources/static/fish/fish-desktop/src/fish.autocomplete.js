/**
 * Autocomplete Widget
 * @class fish.desktop.widget.Autocomplete
 * @extends fish.desktop.widget
 * <pre>
 $(element).autocomplete(option);
 * </pre>
 */
 /**
 * @event open
 * 打开下拉框选项事件
 * @param e jquery事件对象
 *
 * <pre>
 * $(element).on('autocomplete:open', function(e) {
 *   //do something
 * })
 * </pre>
 */
 /**
 * @event close
 * 关闭下拉框选项事件
 * @param e jquery事件对象
 *
 * <pre>
 * $(element).on('autocomplete:close', function(e) {
 *   //do something
 * })
 * </pre>
 */

 /**
 * @event select
 * 选中下拉框选项事件
 * @param e jquery事件对象
 * @param item 选中的项目
 *
 * <pre>
 * $(element).on('autocomplete:select', function(e, item) {
 *   //do something
 * })
 * </pre>
 */

 /**
 * @event search
 * 下拉选框搜索事件
 * @param e jquery事件对象
 *
 * <pre>
 * $(element).on('autocomplete:search', function(e) {
 *   //do something
 * })
 * </pre>
 */

/**
 * @event response
 * 下拉选框加载事件
 * @param e jquery事件对象
 * @param content 下拉选框加载的内容
 *
 * <pre>
 * $(element).on('autocomplete:response', function(e, content) {
 *   //do something
 * })
 * </pre>
 */

 /**
 * @event change
 * 下拉选框加载事件
 * @param e jquery事件对象
 * @param content 若输入的内容在source中，则返回选中的项目，否则返回输入的值
 *
 * <pre>
 * $(element).on('autocomplete:change', function(e, content) {
 *   //do something
 * })
 * </pre>
 */

!function () {
    'use strict';

    var keyboard = $.ui.keyCode,
        specialKeyCodes = [keyboard.DOWN, keyboard.UP, keyboard.LEFT, keyboard.RIGHT, keyboard.ENTER
        , keyboard.TAB, keyboard.ESCAPE];

    function withModifier(e) {
        return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    }

    $.widget("ui.autocomplete", {
        options: {
            /**
             * 如果设置为true，显示下拉菜单的时候将会自动选中第一个，默认值为false。
             * @cfg {Boolean} autoFocus=false
             */
            autoFocus: false,
            /**
             * 按键之后延迟多久触发搜索操作，单位毫秒。
             * 对于本地数据来说，无延时是有意义的（响应速度更快），但是如果要从远程加载数据，无延时将会触发大量的请求。
             * @cfg {Number} delay=300
             */
            delay: 300,
            /**
             * 如果设置为true将会禁用自动完成功能。
             * @cfg {Boolean} disabled=false
             */
            /**
             * 输入多少个字符时出现自动提示,0表示不用输入就能出现下拉菜单,1表示首字母匹配,2表示匹配前两个字符...
             * @cfg {Number} minLength=1
             */
            minLength: 1,
            /**
             * 下拉菜单的数据源，必须配置。
             * @cfg {*} source Type:Array|String|Function(request,response(Object data))
             * <pre>
             *   $(element).autocomplete({ source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ] });
             * </pre>
             */
            source: null,

            itemRenderer: $.noop,

            /**
             * 可以自定义下拉菜单的高度等样式
             * @cfg {String} customClass
             */
            /**
             * 当输入项失去焦点，并且值已经被改变的时候，触发此事件。
             * @cfg {event} change
             */
            change: null,
            /**
             * 当菜单被隐藏时触发此事件。
             * 并不是每一个close事件都会触发change事件。
             * @cfg {event} close
             */
            close: null,
            /**
             * 当焦点被移动到一个条目上（不是选中）时触发。
             * 默认行为是用获得焦点的条目的value值替换text输入项中的内容，此事件只能通过键盘操作触发。
             * @cfg {event} focus
             */
            focus: null,
            /**
             * 在创建完自动完成组件的实例之后触发此事件。
             * @cfg {event} open
             */
            open: null,
            /**
             * 当下拉菜单打开或者发生更新的时候触发此事件。
             * @cfg {event} create
             */
            /**
             * 在搜索完成之后，下拉菜单显示出来之前触发此事件。
             * 此配置项对于维护本地搜索建议数据来说非常有用，在这种情况下不需要自定义数据源回调函数选项。
             * 在搜索动作完成之后此事件总是会触发，即使没有数据下拉菜单没有显示，或者自动完成组件被禁用，此事件还是会触发。
             * @cfg {event} response
             */
            response: null,
            /**
             * 在搜索动作触发之前，达到minLength和delay配置项的值之后，触发此事件。
             * 如果取消此事件，将不会触发任何请求，也不会启动搜索建议。
             * @cfg {event} search
             */
            search: null,
            /**
             * 在下拉菜单中选中一个项目之后触发。
             * 默认动作是使用选中项目的value值替换text输入项中现有的值。
             * @cfg {event} select
             */
            select: null,
            /**
             * 下拉框数据最大条数
             * @cfg {Number} rowCount=10000
             */
            rowCount: 10000,
            /**
             * 下拉框数据最大高度
             * @cfg {Number} maxHeight=null
             */
            maxHeight: null,
            /**
             * 数据源显示字段
             * @since V2.4.0
             * @cfg {String} dataTextField='name'
             */
            dataTextField: "label",
            /**
             * 数据源取值字段
             * @since V2.4.0
             * @cfg {String} dataValueField='value'
             */
            dataValueField: "value"
        },

        requestIndex: 0,
        pending: 0,

        _create: function () {
            var nodeName = this.element[0].nodeName.toLowerCase(),
                isTextarea = nodeName === "textarea",
                isInput = nodeName === "input";

            this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];

            this._opened = false;
            this._selectedIndex = -1;

            this.$list = $('<ul class="dropdown-list"></ul>');

            this._initSource();

            this._delegateEvent();
        },


        _delegateEvent: function () {
            var events = {
                'focus': '_onFocus',
                'keydown': '_onKeydown'
            };

            if(!fish.browser.msie) {
                events['blur'] = '_onBlur';
            }
            if (!fish.browser.msie || fish.browser.version > 9) {
                events['input'] = '_onInput';
                this._on(events);
            } else {
                // ie9 Doesn't fire an input event when deleting text (via Backspace, Delete, Cut, etc.).
                // http://caniuse.com/#search=input
                events['keyup'] = events['cut'] = events['paste'] = '_onSpecialInput';
                this._on(events);

                this._on({
                    'keydown': '_onSpecialInput'
                });
            }

            this._on(this.$list, {
                'mousedown li': '_onMouseDown',
                'click li': '_onClick'
            });
        },

        _setOption: function (key, value) {
            this._super(key, value);
            if (key === "source") {
                this._initSource();
            }
            if (key === "disabled" && value && this.xhr) {
                this.xhr.abort();
            }
        },

        /**
         * 判断下拉选框是否打开
         * @method
         * @return {boolean}
         */
        isOpen: function () {
            return this._opened;
        },

        _scrollableParents: function () {
            return this.element.parentsUntil('body').filter(function(index, el){
                return el.scrollHeight > el.clientHeight;
            });
        },

        /**
         * 打开下拉选框
         * @method
         */
        open: function () {
            if (this.isOpen()) return;

            this.$list.css('width', this.element.outerWidth());

            $('body').append(this.$list);

            this._on($(document), {
                'mousedown': $.proxy(function (e) {
                    //#517 排除自己
                    if (this.$list.is(e.target) || $.contains(this.$list[0], e.target)) {
                        return;
                    }
                    this.close();
                }, this)
            });

            // add iframe click resolve
            this._on($(window), {
                blur: 'hide',
            });

            this._on(this._scrollableParents(), {
                'scroll': $.proxy(function () {
                    if (this.isOpen()) {
                        this.close();
                    }
                }, this)
            });


            this.$list.position({
                my: "left top",
                at: "left bottom",
                of: this.element,
                collision: "fit flip"
            });

            this._opened = true;
            this._trigger('open');
        },

        /**
         * 关闭下拉选框
         * @method
         */
        close: function () {
            this.cancelSearch = true;
            this._close();
        },

        _close: function () {
            if (!this.isOpen()) return;

            this.$list.detach();

            this._off($(document));
            this._off($(window));
            this._off(this._scrollableParents(), "scroll");
            
            this._opened = false;
            this._selectedIndex = -1;
            this._trigger('close');
        },

        /**
         * 选中下拉选框中的前一个选项
         * @method
         */
        previous: function () {
            this.goto(this._selectedIndex - 1);
        },

        /**
         * 选中下拉选框中的后一个选项
         * @method
         */
        next: function () {
            this.goto(this._selectedIndex + 1);
        },

        /**
         * 选中下拉选框中的指定的选项
         * @method
         * @param {Number} index 需要选中的选项的索引
         */
        goto: function (index) {
            this._selectedIndex = this._checkIndex(index);
            this._activeSelectedIndex(this._selectedIndex);

            var el = this.$list.find('li').eq(this._selectedIndex);
            this._scroll(el);
        },

        _scroll: function($li) {
            var scrollTop = this.$list.scrollTop(),
                itemOffsetTop = $li.position().top + scrollTop,
                itemHeight = $li.outerHeight(),
                itemDistance = itemOffsetTop + itemHeight,
                height = this.$list.height();

            this.$list.scrollTop(itemOffsetTop < scrollTop ? itemOffsetTop :
                itemDistance > (scrollTop + height) ? itemDistance - height : scrollTop);
        },

        _onFocus: function(e) {
            this._selectedItem = null;
            this.previousValue = this._value();
            this._search(this.element.val());
        },

        _onBlur: function(e) {
            if (this.cancelBlur) {
                delete this.cancelBlur;
                return;
            }

            this.close(e);
            this._change(e);
        },

        _onInput: function(e) {
            this._searchTimeout(e);
        },

        _onSpecialInput: function(e) {
            if (_.indexOf(specialKeyCodes, e.keyCode) > -1) {
                return;
            }

            _.defer(_.bind(this._onInput, this, e));
        },

        _onKeydown: function (e) {
            var c = e.keyCode;

            // If the dropdown `ul` is in view, then act on keydown for the following keys:
            // Enter / Esc / Up / Down
            if (this.isOpen()) {
                switch (c) {
                    case keyboard.ENTER:
                        e.stopPropagation();
                        this._onEnter();
                        break;
                    case keyboard.ESCAPE:
                        e.stopPropagation();
                        this.close();
                        break;
                    case keyboard.DOWN:
                        if (!withModifier(e)) {
                            e.preventDefault();
                            this.next();
                        }
                        break;
                    case keyboard.UP:
                        if (!withModifier(e)) {
                            e.preventDefault();
                            this.previous();
                        }
                        break;
                }
            }
        },

        _onEnter: function (e) {
            var index = this.$list.find('.active').index();
            this._select(e, index);
            this.close();
        },

        _onClick: function (e) {
            e.stopPropagation();

            var $li = $(e.target),
                index = this.$list.find('li').index($li);

            this._select(e, index);
            this.close(e);
        },

        _onMouseDown: function(e) {
            e.preventDefault();

            // ie8 下还是会派发blur事件
            this.cancelBlur = true;
            _.defer(_.bind(function() {
                delete this.cancelBlur;
            }, this));
        },

        _select: function (e, index) {
            var item = this.resultSource[index];
            this._selectedItem = item;
            var result = this._trigger("select", e, {
                item: item
            });

            if (result) this._value(item && item[this.options.dataTextField]);
        },

        _checkIndex: function (index) {
            var length = this.resultSource.length;

            if (index < 0) return length - 1;
            if (index >= length) return 0;

            return index;
        },

        _activeSelectedIndex: function (index) {
            this.$list.find('li.active').removeClass('active');
            this.$list.find('li').eq(index).addClass('active');
        },

        /*
         * 提示的数据源
         * @private
         */
        _initSource: function () {
            var array, url,
                that = this;
            if ($.isArray(this.options.source)) {

                array = this.options.source;
                /*
                 * 数组类型source
                 * @param request
                 * @param response
                 */
                this.source = function (request, response) {
                    response(this.filter(array, request.term));
                };

            } else if (typeof this.options.source === "string") {
                url = this.options.source;
                /*
                 * ajax source
                 * @param request
                 * @param response
                 */
                this.source = function (request, response) {
                    if (that.xhr) {
                        that.xhr.abort();
                    }
                    that.xhr = $.ajax({
                        url: url,
                        data: request,
                        dataType: "json",
                        success: function (data) {
                            response(data);
                        },
                        error: function () {
                            response([]);
                        }
                    });
                };

            } else {
                this.source = this.options.source;
            }
        },

        /*
         * 延迟搜索内容
         * @param event
         * @private
         */
        _searchTimeout: function (event) {
            if (!this._delaySearch)
                this._delaySearch = _.debounce(this._evaluate, this.options.delay); //#520,去掉true，在结束边界时调用
            this._delaySearch(event);
        },

        _evaluate: function (event) {
            // Search if the value has changed, or if the user retypes the same value (see #7434)
            var equalValues = this.term === this._value(),
                menuVisible = this.isOpen(),
                modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

            if (!equalValues || (equalValues && !menuVisible && !modifierKey)) {
                this._selectedItem = null;
                this.search(null, event);
            }
        },


        /**
         * 如果事件没有被取消，触发search事件并调用数据源。
         * 此方法可以用在一个类似下拉选择框的按钮上，当点击此按钮的时候可以打开搜索建议下拉框。
         * 如果调用时不传递参数，将会默认使用当前input的值作为参数。
         * 如果传递一个空字符串，或者传递｛minLength: 0｝将会显示所有条目。
         * @method search
         * @param  {String} value
         */
        search: function (value, event) {
            value = value != null ? value : this._value();

            // always save the actual value, not the one passed as an argument
            this.term = this._value();

            if (value.length < this.options.minLength) {
                return this.close(event);
            }

            if (this._trigger("search", event) === false) {
                return;
            }

            return this._search(value);
        },

        /*
         * 搜索
         * @param value
         * @private
         */
        _search: function (value) {
            this.pending++;
            this.cancelSearch = false;

            this.source({
                term: value
            }, this._response());
        },

        _response: function () {
            var index = ++this.requestIndex;

            return $.proxy(function (content) {
                if (index === this.requestIndex) {
                    this.__response(content);
                }

                this.pending--;
                if (!this.pending) {
                    this.element.removeClass("ui-autocomplete-loading");
                }
            }, this);
        },

        __response: function (content) {
            if (content) {
                content = this._normalize(content);
            }
            this._trigger("response", null, {
                content: content
            });
            if (!this.options.disabled && content && content.length && !this.cancelSearch) {
                this._suggest(content);
            } else {
                // use ._close() instead of .close() so we don't cancel future searches
                this._close();
            }
        },

        _change: function (event) {
            if (this.previousValue !== this._value()) {
                this._trigger("change", event, {
                    item: this._selectedItem || this._value()
                });
            }
        },

        /*
         * 转换成内部标准的[{label:xx,value:yy}]
         * @param items
         * @returns {*}
         * @private
         */
        _normalize: function (items) {
            var that = this;
            return $.map(items, function (item) {
                if (typeof item === "string") {
                    var obj = {};
                    obj[that.options.dataTextField] = item;
                    obj[that.options.dataValueField] = item;
                    return obj;
                }
                return item;
            });
        },

        /*
         * 显示相匹配的内容
         * @param items
         * @private
         */
        _suggest: function (items) {
            var html = '',
                that = this;

            this.resultSource = items;

            if (this.options.autoFocus && items.length > 0) {
                this._selectedIndex = 0;
                html += '<li class="active">' + that._renderItem(items[0]) + '</li>';
                items = items.slice(1);
            }

            _.each(items, function(item, index) {
                html += '<li>' + that._renderItem(item) + '</li>';
            });

            this.$list.html(html);
            this.open();
        },

        _renderItem: function(item) {
            if (this.options.itemRenderer == $.noop) {
                return item[this.options.dataTextField];
            } else {
                return this.options.itemRenderer.call(this, item);
            }
        },

        /**
         * 取值 | 设值
         * @param newVal
         * @returns {String} 控件的值
         */
        value: function () {
            if(arguments[0]){
                this._selectedItem = null;
            }
            return this.valueMethod.apply(this.element, arguments);
        },


        /**
         * 根据dataValueField取值
         * @since V3.1.0
         * @returns {String} 控件的dataValueField值
         */
        getSelectedItem: function () {
            return this._selectedItem;
        },

        /*
         * 内部使用取值
         * @returns {valueMethod|*}
         * @private
         */
        _value: function () {
            return this.valueMethod.apply(this.element, arguments);
        },

        filter: function (array, term) {
            var that = this;
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function (value) {
                return matcher.test(fish.isObject(value) ? (value[that.options.dataTextField] || value[that.options.dataValueField]) : value);
            });
        }
    });

    $.extend($.ui.autocomplete, {
        escapeRegex: function (value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }
    })
}();