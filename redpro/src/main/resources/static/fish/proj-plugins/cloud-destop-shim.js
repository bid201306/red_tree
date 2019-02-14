/**
         * cloud v1.6.0
         *
         * Copyright 2013-2015, ZTESoft, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the LGPLV3-style license found in the
         * LICENSE file in the root directory of this source tree. 
         *
         *//*
 * jQuery Web Sockets Plugin v0.0.1
 * http://code.google.com/p/jquery-websocket/
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (c) 2010 by shootaroo (Shotaro Tsubouchi).
 * Modified by Ted guo.
 * Usage
 *
 * Connection
 * 
 * var ws = $.websocket("ws://127.0.0.1:8080/");
 * 
 * Sending Message
 * 
 * ws.send('hello'); // sending message is '{type:'hello'}'. ws.send('say', {name:'foo', text:'baa'}); // sending message is '{type:'say', data:{name:'foo', text:'baa'}}'
 * 
 * Event Handling
 * 
 * var ws = $.websocket("ws://127.0.0.1:8080/", { open: function() { ... }, close: function() { ... }, events: { say: function(e) { alert(e.data.name); // 'foo' alert(e.data.text); // 'baa' } } });
 */
(function($){

var WebSocket=window.MozWebSocket||window.WebSocket;
	
var WebSocketDelegate=(function(globel,undefined){
	
	var webSocketDelegate=function(url,protocols, options){
		this.init(url,protocols, options)
		return this;
	};
	webSocketDelegate.fn = webSocketDelegate.prototype = {
			init:function(url,protocols, options){
				this.close();
				var me =this;
				if(options){//处理reconnect丢失参数问题
					this.options = options;
				}
				if(protocols){
					this.protocols = protocols;
				}
				if(url){
					this.url = url;
				}
				
				if(this.protocols){
					this.ws = WebSocket ? new WebSocket( this.url ,this.protocols) : {
						send: function(m){ return false },
						close: function(){}
					};
				}else{
					this.ws = WebSocket ? new WebSocket( this.url ) : {
						send: function(m){ return false },
						close: function(){}
					};
				}
				
				var onOpen = $.proxy(function(e){
					 $(me).trigger(e);
					},this);
				var onClose = $.proxy(function(e){
					$(me).trigger(e);	
				},this);
				var onMessage = $.proxy(function(e){
					$(me).trigger(e);
				},this);
				var onError = $.proxy(function(e){
					$(me).trigger(e);	
				},this);
				
				
				$(this.ws)
				.bind('open',onOpen)
				.bind('close', onClose)
				.bind('message', onMessage)
				.bind('error', onError);
				
			},
			_send:function(){
				if(this.ws){
					this.ws.send.apply(this.ws,arguments);
				}
			},
			send: function(type, data) {
				
				$(this).trigger("beforeSend");
				var m = {type: type};
				m = $.extend(true, m, $.extend(true, {}, this.options, m));
				if (data) m['data'] = data;
				//return this._send($.toJSON(m));
				try{
					return this._send(JSON.stringify(m));
				}
				catch(ex){
					$(this).trigger("error");
				}
				return null;
			},
			reconnect:function(){
				this.init();
			},
			_close:function(){
				if(this.ws){
					var me =this;
					$(this.ws).bind("close",function(){
						$(me.ws).unbind();
						me.ws = null;
						//delete me.ws;
					});
					this.ws.close.apply(this.ws,arguments);
				}
			},
			close:function(){
				this._close();
			}
	};
	
	//委托WebSocket类
	return webSocketDelegate;
	
})(window);

$.extend({
	websocketSettings: {
		open: $.noop,
		close: $.noop,
		message: $.noop,
		error:$.noop,
		options: {},
		events: {},
		protocols:null
	},
	websocket: function(url, protocols ,opt) {
		opt=$.extend(opt,{});

		if(typeof url === "string"){
			opt.url = url;
			
			if(typeof protocols === "string"){
				opt.protocols = protocols;
			}else{
				opt=$.extend(protocols,opt);
			}
			
		}else{
			opt=$.extend(url,opt);
			
		}
		
		var ws = new WebSocketDelegate(opt.url,opt.protocols,opt);
		
		
		ws._settings = $.extend({},$.websocketSettings, opt);
		
		var heartbeat =  $.proxy(function(){
			ws.send("heartbeat")
		},ws);
		
		var onOpen = $.proxy(function(){
			 ws.tid = setInterval(heartbeat,1000);
			 console.log("websoket heartbeat thread starting, pid:",ws.tid);
		},this);
		
		var onClose = $.proxy(function(){
			if(ws.tid!=null)
			clearInterval(ws.tid);
			console.log("websoket heartbeat thread stopped, pid:",ws.tid);
			
		},this);
		
		var onError = $.proxy(function(){
			if(ws.tid!=null)
			clearInterval(ws.tid);
			console.log("websoket heartbeat thread stopped, pid:",ws.tid);
			ws.reconnect();
		},this);
		
		opt&&$.isFunction(opt.error)&&$(ws).bind('error',opt.error);
		$(ws)
			.bind('open', $.websocketSettings.open)
			.bind('open', onOpen)
			.bind('close', onClose)
			.bind('close', $.websocketSettings.close)
			.bind('error', onError)
			.bind('message', $.websocketSettings.message)
			.bind('message', function(e){
				//var m = $.evalJSON(e.originalEvent.data);
				var m = eval("(" + (e.originalEvent.data) + ")");
				var h = ws._settings.events[m.type];
				if (h) h.call(this, m);
				return m.type&&m.type!=""&&m.type!="message"&&m.type!="close"&&m.type!="open"&&m.type!="error"&&(
						$(ws).trigger(m.type,m)		
				);
			});
		$(window).unload(function(){ 
			ws.close(); 
			ws = null; 
			});
		return ws;
	}
});
})(jQuery);
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
/*
 * jQuery downloadfile Plugin 
 * by Ted guo.
 * Usage
 * 
 * $.ajaxFile("http://localhost:8080/Cloud-web/excel/export",{});
 * 
 * options里面所有的数据都会post到url
 */
(function($){
	$.extend({
		ajaxFile:function(url,options){
			
			var tmpform = $('<form name="downloadform" action="' + encodeURI(url) + '" method="post" accept-charset="utf-8" style="display:none"></form>');
			$('body').append(tmpform);//不在 文档流内的form，ie无法提交，但是chrome可以
			
			
			if(options){
				for(var key in options){
					if(options[key]!=null){
						
						var input = $('<input type="text" name="'+key+'" id="'+key+'">');
						
						var val = JSON.stringify(options[key]);
						
						input.val(val);
						tmpform.append(input);
					}
				}
			}
			tmpform.submit();
			tmpform.remove();
			return true;
		}
	});
})(jQuery);
/**
 * 弹出一个view，options中可以使用fish.popup中options参数如modal，height等等
 * options
 * {String} options.url 视图url，必选
 * {Function} options.close 对应popup.close方法
 * {Function} options.dismiss 对应popup.dismiss方法
 * {Function} options.callback(popup, view) 回调函数,popup：当前弹出窗；view当前视图;callback在afterRender事件之后触发
 * {Object} options.viewOption 子视图参数，如model，'collection', 'attributes', 'className'等，可选
 */
fish.popupView = function (options) {
    if ($.type(options) === 'string' || (options instanceof fish.View)) {
        options = {url: options};
    }

    if (!options.url) {
        console.error("popupView方法至少提供一个url参数");
        return;
    }
    if (!window.require) {
        console.error('popupView method depends on RequierJS, please check!');
        return;
    }
    if (!fish.popup) {
        console.error('popupView method depends on fish.popup component');
        return;
    }

    if (fish.isString(options.url)) {
        window.require([options.url], function (View) {
            var viewInstance = new View($.extend({}, options.viewOption));
            // event order, beforeRender --> render --> afterRender  --> callback
            renderPopupView(viewInstance);
            viewInstance.render();
        });
    } else {
        //view 在页面中高度定制
        var viewInstance;
        if (options.url instanceof fish.View) { //fish.view 实例
            viewInstance = options.url;
        } else { //fish.view type
            var View = options.url;
            viewInstance = new View($.extend({}, options.viewOption));
        }
        // event order, beforeRender --> render --> afterRender  --> callback
        renderPopupView(viewInstance);
        viewInstance.render();
        return viewInstance;
    }

    function renderPopupView(viewInstance) {
        viewInstance.on('render', function () {
            var $popupView, $el = viewInstance.$el, cloneOpts = $.extend({}, options);
            delete cloneOpts.url;
            delete cloneOpts.content;
            
            $popupView = $el.hasClass('ui-dialog') ? $el : $el.addClass('ui-dialog');

            var popOpts = $.extend({}, {content: $popupView}, cloneOpts); // 这里可以加入初始参数
            var popup = fish.popup(popOpts);
            viewInstance.popup = popup; //注入popup property，如果视图想自己关闭自己

            var promise = popup.result;
            options.close && fish.isFunction(options.close) && promise.then(options.close);
            options.dismiss && fish.isFunction(options.dismiss) && promise.then(null, options.dismiss);

            promise.always(function () {
                console.log('always remove popup View instance');
                viewInstance.remove(); //移除body下的view
            });

        });
        
        //TODO对于grid需要调整位置（style="height:300px"会出现重叠现象）
        viewInstance.on('afterRender', function (view) {
            view.$el.position(view.$el.data('position'));
            view.$el.focus();
            if (fish.isFunction(options.callback)) {
                options.callback.call(window, view.popup, viewInstance);
            }
           
        });
    }
};
/**
 * 1.window.resize会触发fish的各个View里面的resize方法，不能在resize方法里面调用window.resize()
 * 会导致js嵌入堆栈死循环
 * 
 * 2.remove的时候清理线程和websocket
 * 
 * @deprecated
 * @method resize
 * @extends fish.View
 * 
 * <pre>
 * fish.View.extend({resize:function(){}});
 * </pre>
 */

fish.View=fish.View.extend({
	constructor: function (options) {
        options = options || {};
        if (options.manage || this.manage) {
            fish.View.setupView(this, options);
        }

        Backbone.View.apply(this, arguments);
        this.on("afterRender",this.calculatePrivs.bind(this));
    }

});

$.extend(fish.View.prototype, {
	screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    },
    /**
     * 通过RequireJS动态加载子视图(如果原先已有View，则替换)
     *
     * @param {String | Object} options 为String时相当于options.url；Object时可以包含以下属性：
     * @param {String} options.selector 子视图选择器
     * @param {String} options.url 子视图路径
     * @param {String} options.insert 是否是插入子视图，默认false,替换原先的视图节点
     * @param {Function} options.callback 回调函数，可选
     * @param {Object} options.viewOption 子视图参数，如model，'collection', 'attributes', 'className'等，可选
     * @returns {Promise}
     */
    requireView: function (options) {
        if ($.type(options) === 'string') {
            options = {url: options};
        }

        if (!options.url) {
            console.error("requireView方法至少提供一个url参数");
            return;
        }

        if (!window.require) {
            console.error('requireView method depends on RequierJS, please check!');
            return;
        }
        var me = this, deferred = $.Deferred();
        window.require([options.url], function (View) {
            var viewInstance = new View(options.viewOption);
            //必须在模板渲染之后
            viewInstance.once('afterRender', function () {
                fish.isFunction(options.callback) && options.callback.call(me, viewInstance);
                deferred.resolve(viewInstance);
            });

            if (options.selector) {
                me.setView(options.selector, viewInstance, options.insert);
            } else {
                me.setView(viewInstance, options.insert);//replace all
            }

            me.renderViews([viewInstance]);
        }, function (err) {
        	deferred.reject(err);
        });

        return deferred.promise();
    },
	resize : function() {
		
	},
	tabActived: function() {
		
	},
	tabHid: function() {
		
	},
	watchMainMessage:function(namespace,callback){
		if(MainView&&MainView.mainWebSocket){
			if(!this.__MainWebSocketEvents__){
				this.__MainWebSocketEvents__=[];
			}
			this.__MainWebSocketEvents__.push({
				namespace:namespace,
				callback:callback
			});
			
			$(MainView.mainWebSocket).bind(namespace,callback);
			
			return true;
		}
		return false;
	},
	unwatchMainMessage:function(namespace,callback){
		if(this.__MainWebSocketEvents__){
			var fis = _.filter(this.__MainWebSocketEvents__, function(ev){ return ev.namespace  == namespace && ev.callback==callback; });
			this.__MainWebSocketEvents__=_.difference(this.__MainWebSocketEvents__,fis);
		}
		$(MainView.mainWebSocket).unbind(namespace,callback);
	},	
	watchViewMessage:function(namespace,callback){
		if(MainView){
			if(!this.__viewEvents__){
				this.__viewEvents__=[];
			}
			this.__viewEvents__.push({
				namespace:namespace,
				callback:callback
			});
			MainView.bind(namespace,callback);
			return true;
		}
		return false;
	},
	unwatchViewMessage:function(namespace,callback){
		if(this.__viewEvents__){
			var fis = _.filter(this.__viewEvents__, function(ev){ 
				return ev.namespace  == namespace && ev.callback==callback; 
		    });
			this.__viewEvents__=_.difference(this.__viewEvents__,fis);
		}
		MainView.unbind(namespace,callback);
	},
	websocket: function(url, s) {
		if(this.__websockets__==null){this.__websockets__=[];}//不能用原型链定义，会被subview继承
		var ws=$.websocket(url,s)
			,me=this;
		this.__websockets__.push(ws);
		$(ws).bind('close', function(){
			me.__websockets__ =_.reject(me.__websockets__, function(o){ return o == ws; });
		});
				
		return ws;
	},
	registerWebSocket:function(ws){
		if(this.__websockets__==null){this.__websockets__=[];}
		var me=this;
		$(ws).bind('close', function(){
			
			me.__websockets__ =_.reject(me.__websockets__, function(o){ return o == ws; });
		});
		this.__websockets__.push(ws);
	},
	registerThread:function(int){
		if(this.__threads__==null){this.__threads__=[];}
		this.__threads__.push(int);
	},
	unRegisterThread:function(int){
		if(this.__threads__==null){this.__threads__=[];}
		this.__threads__ =_.reject(this.__threads__, function(num){ return num == int; });
	},
	thread:function(code,millisec){
		if(this.__threads__==null){this.__threads__=[];}
		var i = setInterval(code,millisec);
		this.__threads__.push(i);
	},
	calculatePrivs:function(el){
	   if(window.session&&window.session.currentPrivs){
			if(el instanceof jQuery){
				$(el).find('*[privcode]').each(function(i,ele){
					if($(ele).attr("privcode")&&$(ele).attr("privcode")!=''&&!_.find(window.session.currentPrivs, function(priv){ return priv == $(ele).attr("privcode"); })){
						$(ele).hide();
					}
				});
				
			}else{
				this.$('*[privcode]').each(function(i,ele){
					if($(ele).attr("privcode")&&$(ele).attr("privcode")!=''&&!_.find(window.session.currentPrivs, function(priv){ return priv == $(ele).attr("privcode"); })){
						$(ele).hide();
					}
				});
			}
			
		}
	},
	hideHead:function(){
		MainView.fullPage = true;
		$("#navbar").animate({"opacity":0},0, function(){
			$(".main-wrapper").animate({
				"top":0
			}, 300);
		});
	}
});

(function(){
	var remove =fish.View.prototype.remove;
	
	$.extend(fish.View.prototype, {
		remove : function() {
			if(this.__threads__&&this.__threads__.length>0){
				$.each(this.__threads__,function(i,o){
					clearInterval(o);
				})
				this.__threads__=[];
			}
			if(this.__websockets__&&this.__websockets__.length>0){
				$.each(this.__websockets__,function(i,ws){
					ws.close();
				})
				this.__websockets__=[];
			}
			if(MainView&&MainView.mainWebSocket&&this.__MainWebSocketEvents__&&this.__MainWebSocketEvents__.length>0){
				$.each(this.__MainWebSocketEvents__,function(i,ev){
					$(MainView.mainWebSocket).unbind(ev.namespace,ev.callback);
				})
				this.__MainWebSocketEvents__=[];
			}
			
			fish.each(this.__manager__.views, function (view) {
				try{
					view.remove();
				}
				catch(e){
					console.log("脚本出错，视图的remove事件内部异常,[view,exception]:",view,e);
				}
			});
			
			return remove.apply(this,arguments);
		}
	});
	
})();
(function() {
	var adviceFuncs = {
			initialize: function(func) { return function() {
				func.apply(this, arguments);
				
				this.on('afterRender', function(){
					if(this.resize) {
						this.resize(this.$el.parent().height() - this.$el.outerHeight(true));
					}
				}, this);
				
				};
			},
			resize: function(func) {return function(delta) {
					func.call(this, delta);
					// this.views; //{selector: new View()} or Selector:[ new View()]
					fish.each(this.__manager__.views, function (views) {
						fish.each($.makeArray(views), function (view) {
							if (view.$el.is(':visible')) {
								if (fish.isFunction(view.resize)) {
									var delta = view.$el.parent().height() - view.$el.outerHeight(true);
									try{
										view.resize(delta);
									}
									catch(e){
										console.log("脚本出错，视图的resize事件内部异常,[view,exception]:",view,e);
									}
								}
							}
						}, this);
					}, this);
				}
			},
			tabActived: function(func) {
				return function() {
					func.apply(this, arguments);
					var params= arguments;
					
					fish.each(this.__manager__.views, function (views) {
						fish.each($.makeArray(views), function (view) {
							
								if (fish.isFunction(view.tabActived)) {
									
									view.tabActived.apply(view,params);
								}
							
						}, this);
					}, this);
				}
			},
			tabHid: function(func) {
				return function() {
					func.apply(this, arguments);
					var params= arguments;
					
					fish.each(this.__manager__.views, function (views) {
						fish.each($.makeArray(views), function (view) {
							
								if (fish.isFunction(view.tabHid)) {
									
									view.tabHid.apply(view,params);
								}
							
						}, this);
					}, this);
				}
			}
			
			
			
	};
	
	fish.View.extend=function (protoProps, staticProps) {
	    var parent = this;
	    var child;

	    fish.extend(staticProps, fish.pick.apply(fish, [protoProps].concat(fish.keys(adviceFuncs))));

		// here do advice for functions that framework interests
		$.each(adviceFuncs, function(funcName, adviceFunc) {
			var func = protoProps[funcName] || parent.prototype[funcName];
			protoProps[funcName] = adviceFunc(func);
		});
	    
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }
	    
	   
	    

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent` constructor function.
	    var Surrogate = function(){ this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) _.extend(child.prototype, protoProps);

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  }
})();

/**
 * 文本弹出框控件,可以通过url指定js程序入口
 * 
 * @deprecated
 * @class fish.desktop.widget.PopEdit
 * @extends fish.desktop.widget
 * 
 * <pre>
 * $(element).popedit({url:"js!xxxxx/xxxx/views/xxx.js"});
 * </pre>
 */
!function() {
	'use strict';

	$.widget(
					"ui.popedit",
					$.ui.formfield,
					{
						options : {
							/**
							 * @cfg {String} url
							 *      popedit弹出层的内容,可以是远程页面内容;如果以#开头,则表示的是当前dom的id,会取这个元素的内容
							 */
							url : '',
							/**
							 * @cfg {String} buttonIcon='remove new-window'
							 *      默认图标;remove表示清除按钮,弹出层可以使用任意的glyphicon图标
							 */
							buttonIcon : 'new-window',
							/**
							 * @cfg {Object} dialogInstance popedit弹出层实例
							 */
							dialogInstance : null,
							/**
							 * @cfg {Object} dialogOption
							 *      popedit弹出层的参数,popedit采用了dialog控件展示弹出层,可配置dialog的所有参数
							 */
							dialogOption : null,
							// 内部用,
							value : null,
							/**
							 * @cfg {String} dataTextField='name'
							 *      dialog返回数据对象的属性,用于文本框显示
							 */
							dataTextField : "name",
							/**
							 * @cfg {String} dataValueField='value'
							 *      dialog返回数据对象的属性,用于提交到后台
							 */
							dataValueField : "value",
							/**
							 * @cfg {Object} initialData popedit初始化参数
							 */
							initialData : null,
							/**
							 * @cfg {Boolean} showClearIcon=true 聚焦时是否显示x图标,默认显示
							 */
							showClearIcon : true
						},
						// 根据图标属性的配置创建图标
						_createIcon : function() {
							var options = this.options, $element = $(this.element);

							if (options.showClearIcon) {
								var clearInput = $element.clearinput();
								var settings = {
									'direct' : 'right',
									'iconname' : options.buttonIcon
								};
								clearInput.clearinput('setIcon', settings);
							} else {
								var icons = options.buttonIcon.split(' '), html = '';
								for (var i = 0; i < icons.length; i++) {
									html += '<span class="input-group-addon"><span class="glyphicon glyphicon-'
											+ icons[i] + '"></span></span>';
								}
								$element.after(html);
							}

							this.component = $element.nextAll(
									'.input-group-addon').filter(
									function(index) {
										return !$(this).children('.glyphicon')
												.hasClass('glyphicon-remove');
									});
							this.componentReset = $element.nextAll(
									'.input-group-addon').filter(
									function(index) {
										return $(this).children('.glyphicon')
												.hasClass('glyphicon-remove');
									});
							this.component = this.component.length ? this.component
									: false;
							this.componentReset = this.componentReset.length ? this.componentReset
									: false;
						},
						// 初始化参数
						_getCreateOptions : function() {
							var $element = $(this.element);
							return {
								url : $element.data('url')
							};
						},
						_create : function() {
							var options = this.options;
							// add readonly attr
							this.element.attr('readonly', true);
							if (options.buttonIcon) {
								this._createIcon();
							}
							this._attachEvents();
							if (options.initialData) {
								this.setValue(options.initialData);
							}

							this.dialog = null;
							if (options.dialogInstance) {
								this.dialogInstance(options.dialogInstance);
							}

							// call formfield _create method
							this._super();
						},
						// popedit提交数据的时候,界面值不是实际值,需要重写getValue方法
						_onFormReset : function() {
							this.setValue(this.options.initialData);
						},
						_onFormClear : function() {
							this.value = null;
						},
						_formSetValue : function(value) {
							var options = this.options;
							if (typeof value === 'string') {
								var _temp = value;
								value = {};
								value[options.dataTextField] = $.trim(_temp);
								value[options.dataValueField] = $.trim(_temp);
							}
							this.value = value;
							this.element
									.val(value ? value[options.dataTextField]
											: "");
						},
						_formGetValue : function() {
							var value = this.getValue();
							return value ? value[this.options.dataValueField]
									: "";
						},
						_validateHandler : function() {
							var that = this;
							this._on({
								'popedit:change' : function() {
									if (that._getValidFlag()) {
										that.element.isValid();
									}
								}
							});
						},
						_attachEvents : function() {
							this._on({
								'change' : '_clear'
							});
							this._on(this.component, {
								click : '_openDialog'
							});

							if (this.componentReset) {
								this._on(this.componentReset, {
									click : '_clear'
								});
							}
						},

						_openDialog : function(e) {
							var dialog = this.dialog;
							if (dialog) { // 已经存在就直接打开;如果改变url,则重新生成~
								dialog.dialog("open");
								this._trigger('open');
							} else {
								var that = this, url = this.options.url;

								if (!url) {
									this._trigger('open');
								} else if (url.indexOf("#") === 0) {// 以#开头
									this._initDialog($(url));
								} else if (url.indexOf("js!") == 0) {
									var me = this;
									url = url.substr(3);
									window.require(
													[ url ],
													function(View) {
														var dialoOption = {viewOptions:{}}; 
														if(me.options.dialogOption){
															dialoOption = me.options.dialogOption;
														}
														if(dialoOption.viewOptions==null){
															dialoOption.viewOptions={};
														}
														dialoOption.viewOptions.value=me.getValue();
														
														var viewInstance = new View(
																dialoOption);
														viewInstance.options = dialoOption.viewOptions;
																me.popupView=viewInstance;
																if(!$(viewInstance.el).hasClass('ui-dialog')){
																	$(viewInstance.el).addClass('ui-dialog');
																	
																}
																
																
														// 必须在模板渲染之后
														viewInstance.on('render',function() { me._initDialog($(viewInstance.el));});
														viewInstance.render();
														
														viewInstance.on('afterRender',function() {

																			if(!$(viewInstance.el).hasClass('ui-dialog')){
																				$(viewInstance.el).addClass('ui-dialog');
																				
																			}
																			
																			/*
																			 * fish.isFunction(options.callback) &&
																			 * options.callback.call(me,
																			 * viewInstance);
																			 */
																		});

														/*
														 * if (options.selector) {
														 * me.setView(options.selector,
														 * viewInstance, false); //
														 * false替换原先的view
														 * me.renderViews(options.selector); }
														 * else {
														 * me.setView(viewInstance);
														 * me.renderViews(); }
														 */
													});

								} else {
									$.ajax({
										url : url,
										type : 'get',
										dataType : 'html'
									}).done(
											function(responseText) {
												var $html = $(responseText);
												$("body").append($html);
												if (!$html.attr("id")) {
													$html.uniqueId();
												}
												that._initDialog($("#"
														+ $html.attr("id")));
											});
								}
							}
						},
						_initDialog : function($el) {
							var that = this;
							$el.dialog(this.options.dialogOption).on({
								"dialog:change" : function(e, value) {
									that.setValue(value);
								}
							});
							this._trigger('open');
							this.dialog = $el;
							var me=this;
							if(this.popupView&&this.dialog){
								this.dialog.on("dialog:beforeclose",function(event, ui) {
									if(me){
										if(me.popupView){
											me.popupView.remove();
											me.popupView=null;
										}
										if(me.dialog){
											me.dialog.remove();
											me.dialog=null;
										}
									}
								});
							}
							
						},
						_setOption : function(key, value) {

							if (key === "url") {
								if (this.dialog && this.options.url !== value) {
									this.dialog.dialog("destroy");
									this.popupView&&$.isFunction(this.popupView.remove)&&this.popupView.remove();
									this.dialog = null;
								}
							}
							this._super(key, value);

							if (key === "dialogOption") {
								if (this.dialog) {
									this.dialog.dialog("option", value);
								}
							}
							if (key === 'disabled') {
								this.element.prop("disabled", value);
							}
						},
							
						_clear : function(e) {
							this.setValue("");
						},

						/**
						 * @method dialogInstance 弹出框实例
						 */
						dialogInstance : function(value) {
							var changeHandler;

							if (arguments.length === 0) {
								return this.dialog;
							} else {
								this.dialog = value;

								if (this.dialog) {
									changeHandler = _.bind(
											this._onDialogChange, this);
									this.dialog.on('dialogchange',
											changeHandler);
								}
							}
						},

						_onDialogChange : function(e, value) {
							this.setValue(value);
						},

						/**
						 * @method setValue 给popedit赋值
						 * @param {Object}
						 *            value
						 *            如果值是字符串,则显示与实际值都是字符串本身;如果是对象,界面会显示dataTextField的属性值
						 */
						setValue : function(value) {// 通过filed等属性进行操作//form使用时要进行值覆盖
							var options = this.options, _temp;
							if (typeof value === 'string') {
								_temp = value;
								value = {};
								value[options.dataTextField] = $.trim(_temp);
								value[options.dataValueField] = $.trim(_temp);
							}
							this.value = value;
							this.element
									.val(value ? value[options.dataTextField]
											: "");// 显示label值，form中覆盖value
							this._trigger('change', null, value);
						},
						/**
						 * @method getValue 取popedit值
						 * @return {Object}
						 *         返回设置进去的值,可以是dialog回调setReturnValue设置进去的值,也可以是popedit调用setValue设置进去的值
						 */
						getValue : function() {
							var options = this.options, _temp, value = this.value;
							if (typeof value === 'string') { // 这种场景应该不存在
								_temp = value;
								value = {};
								value[options.dataTextField] = $.trim(_temp);
								value[options.dataValueField] = $.trim(_temp);
							}
							return value;
						},
					/**
					 * 当值发生改变后触发
					 * 
					 * @event change
					 * @param {Event}
					 *            event event
					 * @param {Object}
					 *            value 改变后的值
					 */
						
						destroy: function() {  
							this.popupView&&$.isFunction(this.popupView.remove)&&this.popupView.remove();
					  
					        // call the base destroy function  
					        $.Widget.prototype.destroy.call(this);  
					    }  
					});
}();

/**
 * tab控件，改变了tab的panel放的container，之前不能指定，现在可以指定
 * 
 * @deprecated
 * @class fish.desktop.widget.tabs
 * @extends fish.desktop.widget
 * 
 * <pre>
 * $(element).tabs(option);
 * </pre>
 */
$.extend(
				$.ui.tabs.prototype,
				{
					/**
					 * 添加标签页。
					 * 
					 * @param {Object}
					 *            o 配置项对象，此对象可以包含id, label, index
					 *            ,content,active属性。
					 */
					add : function(o) { // id, label, index
										// ,content,active,container
						o = o || {};

						var index = o.index, id = o.id, label = o.label, basicHash =o.basicHash, container = o.container ? ($(o.container).length ? $(o.container)
								: this.element.find(o.container))
								: o.container;
						// tabContentHtml = o.content;

						if (index === undefined) {
							index = this.anchors.length;
						}
						id = id || $({}).uniqueId()[0].id;
						label = label || id;

						if (this.options.paging)
							this._pageReset();

						var doInsertAfter, panel, options = this.options, li = $((options.canClose ? options.tabCanCloseTemplate
								: options.tabTemplate).replace(/#\{href\}/g,
								"#" + id).replace(/#\{label\}/g, label));
						// id = !url.indexOf( "#" ) ?
						// url.replace( "#", "" ) :
						// this._tabId( li );

						// li.addClass( "ui-state-default ui-corner-top" ).data(
						// "ui-tabs-destroy", true );
						// li.attr( "aria-controls", id );

						doInsertAfter = index >= this.tabs.length;

						// try to find an existing element before creating a new
						// one
						panel = this.element.find("#" + id);
						if (!panel.length) {
							panel = this._createPanel(id);
							panel.append(o.content);
							if (doInsertAfter) {
								if (index > 0) {
									panel.insertAfter(this.panels.eq(-1));
								} else {
									if (container) {

										panel.appendTo(container);
									} else {
										panel.appendTo(this.element);
									}
								}
							} else {
								panel.insertBefore(this.panels[index]);
							}
						}
						// panel.addClass( "ui-tabs-panel ui-widget-content
						// ui-corner-bottom" ).hide();
						panel.hide();

						if(basicHash){
							li.data('basicHash',basicHash);
						}
						
						if (doInsertAfter) {
							li.appendTo(this.tablist);
						} else {
							li.insertBefore(this.tabs[index]);
						}

						options.disabled = $.map(options.disabled, function(n) {
							return n >= index ? ++n : n;
						});

						this.refresh();

						if (this.tabs.length === 1 && options.active === false) {
							this._activate(0, false);
						}

						if (o.active === true) {
							this._activate(index, false);
						}

						this._trigger("add", null, this._ui(
								this.anchors[index], this.panels[index]));
						return this;
					},
					_getIndex: function (index) {
			            // meta-function to give users option to provide a href string instead of a numerical index.
			            if (typeof index === "string") {
			            	var tmpAnchor = this.anchors.filter("[href='" + index + "']");
			            	if(tmpAnchor.length==0){
			            		tmpAnchor = this.anchors.filter("[href='#" + index + "']");
			            		/*if(tmpAnchor.length==0){
			            			tmpAnchor = this.anchors.filter("[href$='" + index + "']");
			            		}*/
			            	}
			                index = this.anchors.index(tmpAnchor);
			                if (index === -1) return false;
			            }

			            return index;
			        },
					findTab : function(index){
						index = this._getIndex(index);
			            if (index === false) return null;

			            var options = this.options,
			                tab = this.tabs.eq(index),
			                panel = this._getPanelForTab(tab);
			            return this._ui(tab, panel);
					},
					_processTabs : function() {
						var that = this, prevTabs = this.tabs, prevAnchors = this.anchors, prevPanels = this.panels;

						this.tablist = this._getList().addClass("ui-tabs-nav")
								.attr("role", "tablist")

								// Prevent users from focusing disabled tabs via
								// click
								.delegate(
										"> li",
										"mousedown" + this.eventNamespace,
										function(event) {
											if ($(this)
													.is(".ui-state-disabled")) {
												event.preventDefault();
											}
										})

								// support: IE <9
								// Preventing the default action in mousedown
								// doesn't prevent IE
								// from focusing the element, so if the anchor
								// gets focused, blur.
								// We don't have to worry about focusing the
								// previously focused
								// element since clicking on a non-focusable
								// element should focus
								// the body anyway.
								.delegate(
										".ui-tabs-anchor",
										"focus" + this.eventNamespace,
										function() {
											if ($(this).closest("li").is(
													".ui-state-disabled")) {
												this.blur();
											}
										});

						this.lastTablistWidth = this.tablist.width();

						this.tabs = this.tablist.find("> li:has(a)").not(
								'.ui-tabs-paging-prev,.ui-tabs-paging-next') // :has(a[href])
						.addClass("ui-state-default").attr({
							role : "tab",
							tabIndex : -1
						});

						this.anchors = this.tabs.map(function() {
							return $("a", this)[0];
						}).addClass("ui-tabs-anchor").attr({
							role : "presentation",
							tabIndex : -1
						});

						this.panels = $();

						this.anchors
								.each(function(i, anchor) {
									var selector, panel, panelId, anchorId = $(
											anchor).uniqueId().attr("id"), tab = $(
											anchor).closest("li"), originalAriaControls = tab
											.attr("aria-controls");

									// inline tab
									if (that._isLocal(anchor)) {
										selector = anchor.hash;
										panelId = selector.substring(1);
										panel = that.element.find(that
												._sanitizeSelector(selector));
									} else { // 没有hash的时候,
										if (that.element
												.children('#main-tabs-panel').length > 0) {
											panel = that.element
													.children(
															'#main-tabs-panel')
													.childern(
															"div:eq(" + i + ")");
										} else {
											panel = that.element
													.children("div.ui-tabs-panel:eq("
															+ i + ")");
										}
										panelId = panel.attr("id");
										if (!panelId) {
											panelId = tab.attr("aria-controls")
													|| $({}).uniqueId()[0].id;
											panel.attr("id", panelId);
										}
										selector = "#" + panelId;
										$(anchor).attr("href", selector);
										panel.attr("aria-live", "polite");
									}

									if (panel.length) {
										that.panels = that.panels.add(panel);
									}
									if (originalAriaControls) {
										tab.data("ui-tabs-aria-controls",
												originalAriaControls);
									}
									tab.attr({
										"aria-controls" : panelId,
										"aria-labelledby" : anchorId
									});
									panel.attr("aria-labelledby", anchorId);
								});

						this.panels.addClass("ui-tabs-panel").attr("role",
								"tabpanel");

						// Avoid memory leaks (#10056)
						if (prevTabs) {
							this._off(prevTabs.not(this.tabs));
							this._off(prevAnchors.not(this.anchors));
							this._off(prevPanels.not(this.panels));
						}
						if (this.options.fixedHeight) {
							this.panels.addClass('ui-tabs-panel-absolute');
						}

					},
					
					 // handles show/hide for selecting tabs
			        _toggle: function (event, eventData, autoResize) {
			            var that = this,
			                toShow = eventData.newPanel,
			                toHide = eventData.oldPanel;

			            this.running = true;

			            function complete() {
			                that.running = false;
			                //activateOnce为true时,newPanel只加载一次
			                if (!that.options.activateOnce || toShow.data("loaded") !== true) {
			                    that._trigger("activate", event, eventData);
			                    toShow.data("loaded", true);
			                }

			                if (that.options.autoResizable && autoResize !== false) {
			                    $(window).trigger("debouncedresize");
			                }
			            }

			            function show() {
			                eventData.newTab.closest("li").addClass("ui-tabs-active");

			                if (toShow.length && that.options.show) {
			                    that._show(toShow, that.options.show, complete);
			                } else {
			                    toShow.show();
			                    complete();
			                }
			            }

			            var optionHide = this.options.hide;
			            var this_ui= $.proxy(this._ui,this);
			            // start out by hiding, then showing, then completing
			            if (toHide.length && this.options.hideOptions) {
			                this._hide(toHide, this.options.hideOptions, function () {
			                    eventData.oldTab.closest("li").removeClass("ui-tabs-active");
			                    show();
			                    if(optionHide){
			                    	optionHide(eventData,this_ui(eventData.oldTab,eventData.oldPanel));
			                    }
			                });
			            } else {
			                eventData.oldTab.closest("li").removeClass("ui-tabs-active");
			                toHide.hide();
			                if(optionHide){
		                    	optionHide(eventData,this_ui(eventData.oldTab,eventData.oldPanel));
		                    }
			                show();
			            }

			            toHide.attr("aria-hidden", "true");
			            eventData.oldTab.attr({
			                "aria-selected": "false",
			                "aria-expanded": "false"
			            });
			            // If we're switching tabs, remove the old tab from the tab order.
			            // If we're opening from collapsed state, remove the previous tab from the tab order.
			            // If we're collapsing, then keep the collapsing tab in the tab order.
			            if (toShow.length && toHide.length) {
			                eventData.oldTab.attr("tabIndex", -1);
			            } else if (toShow.length) {
			                this.tabs.filter(function () {
			                        return $(this).attr("tabIndex") === 0;
			                    })
			                    .attr("tabIndex", -1);
			            }

			            toShow.attr("aria-hidden", "false");
			            eventData.newTab.attr({
			                "aria-selected": "true",
			                "aria-expanded": "true",
			                tabIndex: 0
			            });
			        },
			        /**
				     * 批量删除指定的标签页。
				     * @param {array} indexArray 序号，从0开始。
				     * @param {number} activeIndex 序号，从0开始。
				     */
				    batchRemove: function (indexArray) {

				        if (this.options.paging) this._pageReset();
				        
				        var tmpTP = [],activeIndex=-1;
				        
				        
				        
				        var removeActived = false;
				        for(var i=0; i<indexArray.length ;i++ ){
				        	var index=indexArray[i];
				        	index = this._getIndex(index);
				            if (index === false) continue;
				            var options = this.options,
				                tab = this.tabs.eq(index),
				                panel = this._getPanelForTab(tab);
				            
				            tmpTP.push({ tab:tab,panel:panel });
				            
				            //if (
				            		//this._trigger("beforeRemove", null, this._ui(tab, panel)); //=== false
				            		//)
				            //    return;

				            //tab.remove();
				            //panel.remove();
				            if (tab.hasClass("ui-tabs-active")){
				            	removeActived=true;
				            }
				            // If selected tab was removed focus tab to the right or
				            // in case the last tab was removed the tab to the left.
				            // We check for more than 2 tabs, because if there are only 2,
				            // then when we remove this tab, there will only be one tab left
				            // so we don't need to detect which tab to activate.
				            /* if (tab.hasClass("ui-tabs-active") && this.anchors.length > 2) {
				                 this._activate(index + (index + 1 < this.anchors.length ? 1 : -1));
				               }*/

				           
				        }
				        
				        if(removeActived){
				        	for(var i=0; i<this.tabs.length ;i++ ){
				            	if(!_.contains(indexArray, i)){
				            		activeIndex=i;
				            	}
				            }
				        }
				        
				        if(activeIndex!=-1){
				        	activeIndex = this._getIndex(activeIndex);
				        	if(index === false){
				        		
				        	}else{
				        	 var options = this.options,
				             tab = this.tabs.eq(activeIndex),
				             panel = this._getPanelForTab(tab);
				        	 this._activate(activeIndex);
				        	}
				        }
				        
				        for(var i in tmpTP){
				        	var tab = tmpTP[i].tab,
				            panel = tmpTP[i].panel;
				        	this._trigger("beforeRemove", null, this._ui(tab, panel));
				        	tab.remove();
				        	panel.remove();
				        	this._trigger("remove", null, this._ui(tab.find("a")[0], panel[0]));
				        }
				        
				        
				        var options = this.options
				        options.disabled = $.map(
				                $.grep(options.disabled, function (n) {
				                    return !_.contains(indexArray, n);
				                }),
				                function (n) {
				                	var num = _.filter(indexArray,function(ii){return ii<n}  ).length;
				                	
				                	
				                    return n - num;
				                });
				        
				        
				        this.refresh();

				       
				        return this;
				    }
					
				});
/**
 * 改变ui.grid的默认option的值
 *      <pre></pre>
 */
$.extend($.ui.grid.prototype.options, {
	// pgtext: "Page {0} of {1}",
	pgtext : "共<span class='total-page'>{1}</span>页", // 修改属性默认值
	// recordtext: "View {0} - {1} of {2}",
	recordtext :"共{2}条记录",
	// emptyrecords: "No records to view",
	emptyrecords : "没有记录",
	//选择条数
	rowList: [10,20,50],
	//初始化页码可选数量，默认显示10个页码按钮
	displayNum:5
});

$.extend($.jgrid.defaults, {
	// pgtext: "Page {0} of {1}",
	pgtext : "共<span class='total-page'>{1}</span>页", // 修改属性默认值
	// recordtext: "View {0} - {1} of {2}",
	recordtext :"共{2}条记录",
	// emptyrecords: "No records to view",
	emptyrecords : "没有记录",
	//选择条数
	rowList: [10,20,50],
	//初始化页码可选数量，默认显示10个页码按钮
	displayNum:5
});


/**
 * @extends $.jgrid。_getCreateOptions
 * 用法:改变ui.grid的默认option的值
 * 
 * @extends $.jgrid。setSelection
 * 用法:注册onSelectChange，用于检测checkbox变化，全选checkbox不会触发这个事件
 * 
 *      <pre></pre>
 */
$.extend($.ui.grid.prototype, {
	
	//控件入口函数
    _create: function () {
        var ts = this, //控件对象
            $el = this.element, //表格整体的jquery形式
            el = $el[0], //表格整体
            p = this.options, //表格参数
            $tb; //表格核心的jquery形式
        ts.p = p; //别名p指向option
        if (!el.id) $el.uniqueId(); //没有ID,生成一个
        ts.p.id = el.id; //option 存入表格ID
        //将生成的对象保存到控件,后续要用到
        ts.grid = this._innerParam();
        //对初始化函数进行必要的处理
        ts._formatOption();
        //生成HTML
        ts._buildHTML();
        //设置高度
        this._initHeight();
        //设置宽度
        this._initWidth();

        ts.$tb = $tb = $("#btable_" + el.id, $el); //表格数据主体,用一个变量存起来,很常用
        var $hDiv = $(".ui-jqgrid-hdiv", $el);
        ts.grid.hDiv = $hDiv[0]; //保存表头容器hdiv和表格主体数据容器bdiv
        var $bDiv = $(".ui-jqgrid-bdiv", $el);
        ts.grid.bDiv = $bDiv[0];
        ts.rows = $tb[0].rows; //将表格的行存到ts.rows属性内;一定要保证元素在dom内
        ts.grid.cols = ts.rows[0].cells; //将表格的第一行的各列存到grid对象上去,jqgfisrtrow这一列吧
        //渲染每一列的状态,排序,列宽等
        this._renderCol();
        //绑定事件
        this._setupEvents();
        //分页的处理
        if (ts.p.pager) {
            ts.setPager(ts.p.pageEl);
        }
        //footerrow的处理
        if (ts.p.footerrow) {
            this._setFooterRow();
        }
        //列头的处理
        if (ts.p.caption) {
            this._setCaption();
        }

        // 展示列功能按钮
        if (ts.p.showColumnsFeature) {
            this._setupColumnsFeature();
        }
        // 展示列功能按钮
        if (ts.p.exportFeature) {
            this._setupExportFeature();
        }


        //数据加载
        ts.populate();
        //键盘数据
        ts.bindKeys();

        //更换滚动条
        $bDiv.niceScroll($tb,{
        	//enabletranslate3d: false,
            //smoothscroll: false,
            //hwacceleration: false,
            //usetransition: false,
            cursorcolor: '#1d5987',
            cursorwidth: ts.p.scrollbarWidth + "px",
            cursoropacitymax: "0.4",
            bouncescroll: false,  //不允许弹性滚动
            railoffset:true,
            zindex: 1     //因为冻结列的时候，会把滚动条给隐藏
        });
        ts.$slimScroll = $bDiv;
    },
    
	_getCreateOptions : function() {
		// $.jgrid.defaults 为国际化文件的内容
		return $.extend({},$.jgrid.defaults, {
			// pgtext: "Page {0} of {1}",
			pgtext : "共<span class='total-page'>{1}</span>页", // 修改属性默认值
			// recordtext: "View {0} - {1} of {2}",
			recordtext :"共{2}条记录",
			// emptyrecords: "No records to view",
			emptyrecords : "没有记录",
			//选择条数
			rowList: [10,20,50],
			//初始化页码可选数量，默认显示10个页码按钮
			displayNum:5
		});
	},
	
_arrangeBtn: function ($btngroup, btngroupWidth) {
    var that = this;
    var diff = $btngroup.outerWidth(true) - btngroupWidth,
        dropdown = $btngroup.children('.ui-nav-btn-group'),
        ul = $(".dropdown-menu-btn", dropdown)[0];

    if (ul) {
        var children = $(ul).children().children();
        children = children.toArray().reverse();
        $(children).each(function (index, val) {
            var $btn = $(val).clone(true);
            $btn.insertBefore(dropdown);
            $(val).parent().remove();
        });
        diff = $btngroup.outerWidth(true) - btngroupWidth;
    } else {
        if (dropdown && dropdown.length == 0) {
            dropdown = $("<div class='ui-nav-btn-group'></div>");
            var $dropdownBtn = $("<button class='ui-nav-button dropdown-toggle' data-toggle='dropdown' type='button'><span class='glyphicon glyphicon-option-horizontal'></span></button>");
            dropdown.append($dropdownBtn);
            $btngroup.append(dropdown);
        }
        ul = $("<ul class='dropdown-menu dropdown-menu-btn'></ul>");
        ul.appendTo(dropdown);
    }
    while (diff > 0) {
        var children = $btngroup.children(),
            length = children.length;
        var needtobreak=false;
        var $li = $("<li></li>"),
            $a = $(children[length - 2]).clone(true);
        $li.append($a).appendTo(ul);
        if(children[length - 2]==null)
        {
        	needtobreak=true;
        }
        $(children[length - 2]).remove();
        diff = $btngroup.outerWidth(true) - btngroupWidth;
        if(needtobreak)break;//grid被隐藏时处理死循环时问题
    }
    if ($(ul).children().length == 0) {
        $(ul).parent().remove();
    }

},_onExportClick:function() {

	var param={},
		gridWidth = this.options.width;
        param.fileType = "xlsx";
    	param.colModel = _.chain(this.options.colModel).filter(function (col) {
            return (!col.hidden || col.exportable === true) && col.name && col.name != 'cb' && col.name != 'rn' && (col.exportable !== false);
        })
        .map(function (col) {
            return {
                label: col.label,
                name: col.name,
                colWidth: (parseInt(col.width / gridWidth * 60)),
                numeric: (col.formatter == 'number')
            };
        }).value();

    if(fish.isFunction(this.options.exportFeature)){
    	$.extend(true,param,this.options.exportFeature.call(this));
    } else if(fish.isObject(this.options.exportFeature)){
    	$.extend(true,param,this.options.exportFeature);
    }
    	
    this._trigger("exportFeatureClicked", null, [param]);
    
    if(!param.stopOriginExport){
    	
    	if(!param.options){
    		var excelExportColumnOptions=[];
    		$.each(param.colModel,function(i,col){
    			excelExportColumnOptions.push({
    				key:col.name,
    				displayName:col.label/*,
    				width:col.colWidth*/
    			});
    		});
    		param.options={
    				excelExportColumnOptions:excelExportColumnOptions
    		}
    	}
    	$.ajaxFile("excel/export",param);
    }
}
});

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
/**
 * combotree控件，改变了树的zIndex
 * 
 * @deprecated
 * @class fish.desktop.widget.combotree
 * @extends fish.desktop.widget
 * 

 */
$.extend($.ui.combotree.prototype,{
        _create: function () {
            selectNodes = [];
            this.comboTree = new $.combo(this.options);
            this.element.hide().before(this.comboTree.$container);
            this.comboTree.$content.tree(this.options);
            var parentZIndex = $(this.element).zIndex();
            this.comboTree.$content.zIndex((parentZIndex==null?1:parentZIndex));
            this.comboTree.$input.attr('readonly', true);
            this.comboTree.create();
            this._delegateEvent();
        },

});
$.extend($.ui.searchbar.prototype, {
	
	_onSelect: function (e, data) {
        this._trigger('select', e, data.item);
        if(this.target){
        	if(data&& data.item){
        		this.target.grid('setSelection', data.item.rowId);
        	}else{
        		//this.target.grid('setSelection', null);
        	}
        }
    }
	
});
/**
 * 轮播插件
 * 
 * @deprecated
 * @class fish.desktop.widget.Slick
 * @extends fish.desktop.widget
 * 
 * <pre>
 * $(element).slick(option);
 * </pre>
 */
$.extend($.ui.slick.prototype,{
	_cleanUpEvents:function(){
        var _ = this;
        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', this._changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(this._setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(this._setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', this._changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', this._changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', this._swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', this._swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', this._swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', this._swipeHandler);

        _.$list.off('click.slick', this._clickHandler);

        if(_.visibilityChange){
        	$(document).off(_.visibilityChange, _.visibility);
        }
        _.$list.off('mouseenter.slick', $.proxy(this._setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(this._setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', this._keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', this._selectHandler);
        }

        $(window).off('resize.slick', _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    }
});
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
/**
 * 告警监控表格
 */
(function($) {
	
	function setSize(target) {
		var gridWrap = $(target).parent();
		if($(gridWrap).is(":hidden")){
			return;
		}		
		var opts = $.data(target, "monitorgrid").options;
		if(opts.fit == true){
			var p = gridWrap.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		gridWrap.width(opts.width);
		gridWrap.height(opts.height);
		$(target).width(opts.width);
		$(target).height(opts.height);
		$(target).find(".grid-body").height(opts.height - 28);
		gridWrap.parent().css("overflow", "hidden");
	}

	// 初始化表格
	function init(target) {
		var gridWrap = $(target).wrap('<div class="grid-wrap"></div>').parent();
		var opts = $.data(target, "monitorgrid").options;
		if(opts.fit == true){
			var p = gridWrap.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		gridWrap.width(opts.width);
		gridWrap.height(opts.height);
		$(target).width(opts.width);
		$(target).height(opts.height);		
		if(opts.border == true){
			//$(target).css("border", "1px solid #d4d4d4");
		}
		
		$(target).addClass("div-grid");
		
		var totalWidth = 0;
		var headRow = $("<div></div>").attr("class", "head-row").css("border-top", "0px solid #E6E6E6");
		
		$.each(opts.columns, function(index, element) {
			$("<div></div>").attr("class", "head-cell").text(element["title"]).width(element["width"]).appendTo(headRow);
			totalWidth += element["width"] + 5;
		})
		headRow.css("min-width", totalWidth).appendTo(target);
		$.data(target, "monitorgrid").runParams.rowWidth = totalWidth; //保存行的宽度
		$("<div></div>").attr("class", "grid-body").height(opts.height - 28).css("min-width", totalWidth).appendTo(target);
		
		(function(){
			var lock = false;
			$(window).resize(function(){
				if(!lock){
					lock = true;
					setTimeout(	function(){
						setSize(target); 
						lock = false;}, 300);
				}
			});
		})();
	}

	function insertRow(target, rows){
		if(!rows || rows.length <= 0) return;
		var opts = $.data(target, "monitorgrid").options;
		//var data = $.data(target, "monitorgrid").data;
		//data.push(rowData);
		
		var rowList = [];
		$.each(rows, function(index, rowData){
			var cellList = [];
			$.each(opts.columns, function(index, element) {
				var text = rowData[element["field"]];
				if(!text){ text = "";}
				var cellContent= text; //单元格内容
				if(element.formatter){
					cellContent = element.formatter(text, rowData);
				}
				var align = "left";
				if(element["align"]){
					align = element["align"];
				}
				var cellDiv = $("<div>" + cellContent + "</div>").attr("class", "grid-cell").width(element["width"]).attr("title",cellContent).css("text-align", align);
				
				cellList.push(cellDiv);
				//cellDiv.appendTo(row);
			})
			var cellHTMLStr = "";
			$.each(cellList, function(index, cellElement){
				cellHTMLStr += cellElement[0].outerHTML;
			});
			var row = $("<div>"+ cellHTMLStr +"</div>").attr("class", "grid-row").css("min-width", $.data(target, "monitorgrid").runParams.rowWidth).attr("row-index", -1); //索引值暂时不实现
			if(opts.idField && rowData[opts.idField]){
				row.attr("id", "data_row_" + rowData[opts.idField]);
			}			
			rowList.push(row);
		});
		
		var rowHTMLStr = "";
		$.each(rowList, function(index, rowElement){
			rowHTMLStr += rowElement[0].outerHTML;
		});
		
		$(target).find(".grid-body").prepend(rowHTMLStr);
		$.data(target,"monitorgrid").runParams.total += rowList.length;  //TODO:
		
		//增加事件
		$.each(rows, function(index, rowData){
			var row  = $(target).find("#data_row_" + rowData[opts.idField]);
			if(row && row.length == 1){
				//row.click(rowClickEvent).dblclick(rowDblclickEvent);
				
				row[0].onclick = function(){
					rowClickEvent.call(this, target, rowData);
				};
				row[0].ondblclick = function(){
					rowDblclickEvent.call(this, target, rowData);
				};
				
			/*	row.bind('click', function(){
					rowClickEvent.call(this, target, rowData);
				}).bind('dblclick', function(){
					rowDblclickEvent.call(this, target, rowData);
				});*/
			}
		});
	}
	
	function rowClickEventWrap(){
		
	}
	
	function rowDblClickEventWrap(){
		
	}
	
	
	function rowClickEvent(target, rowData){
		var opts = $.data(target, "monitorgrid").options;
		$(target).find(".grid-body > .grid-row-click").removeClass("grid-row-click");
		$(this).addClass("grid-row-click")
		if(opts.onClickRow){
			var opts = $.data(target, "monitorgrid").options;
			//var rowIndex = $(this).attr("row-index");
			var rowIndex = -1;
			opts.onClickRow.call(this, rowIndex, rowData);
		}
	}
	
	function rowDblclickEvent(target, rowData){
		var opts = $.data(target, "monitorgrid").options;
		if(opts.onDblClickRow){
			var opts = $.data(target, "monitorgrid").options;
			//var rowIndex = $(this).attr("row-index");
			var rowIndex = -1;
			opts.onDblClickRow.call(this, rowIndex, rowData);
		}
	}
	
	function deleteRow(target, idFieldValue){
		var result;
		if(idFieldValue){
			result = $(target).find(".grid-body > #data_row_%id%".replace(/%id%/, idFieldValue));
		}else{
			result = $(target).find(".grid-body > .grid-row:last");
			//var data = $.data(target, "monitorgrid").data;
			//data.shift();
		}
		//删除Dom元素
		if(result && result.length && result.length == 1){
			$.data(target,"monitorgrid").runParams.total -= 1;
			
			//result.unbind();
			result[0].onclick = null;
			result[0].ondblclick = null;
			
			result.remove();
			result.html(null);
			result.removeAttr("class").removeAttr("row-index").removeAttr("id").removeAttr("style");
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
	
	function getTotal(target){
		var total = $.data(target,"monitorgrid").runParams.total;
		return total;
	}
	
	function exist(target, id){
		if(!id) return false;
			
		var exp = ".grid-body > #data_row_%id%".replace(/%id%/, id);
		var rowDiv = $(target).find(exp);
		if(rowDiv.length == 1){
			return true;
		}else{
			return	false;
		}
	}
	
	function alarmLevelFormater(value, row) {
		var bgColor = "";
		if (row.alarmLevelId == 5) {
			bgColor = 'background-color:#FF0000;';
		} else if (row.alarmLevelId == 4) {
			bgColor = 'background-color:#FFA500;';
		} else if (row.alarmLevelId == 3) {
			bgColor = 'background-color:#FFFF00;';
		} else if (row.alarmLevelId == 2) {
			bgColor = 'background-color:#00FFFF;';
		} else if (row.alarmLevelId == 1) {
			bgColor = 'background-color:#800080;';
		} else if (row.alarmLevelId == 6) {
			bgColor = 'background-color:#00FF00;';
		}
		return '<div style="width:100%;height:23px; color:#000000; text-align:center;'
				+ bgColor
				+ '" title='
				+ value
				+ '>'
				+ value
				+ '</div>';
	}
	
	$.fn.monitorgrid = function(options, param) {
		if (typeof options == 'string') {
			switch(options){
				case 'insertRow':
					return this.each(function(){
						insertRow(this, param);
					});
				case 'deleteRow':
					return this.each(function(){
						deleteRow(this, param);
					});
				case 'setSize':
					return this.each(function(){
						setSize(this);
					});	
				case 'getTotal':
					return getTotal(this[0], param);
				case 'exist':
					return exist(this[0], param);
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, 'monitorgrid');
			if (state) {
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'monitorgrid', {
					options : $.extend({}, $.fn.monitorgrid.defaults, options),
					data:[],
					runParams:{total:0} //运行时参数
				});
			}
			init(this);
		});
	};

	$.fn.monitorgrid.defaults = {
		width: 'auto',
		height: 'auto',
		fit: false,
		idField:null,
		onClickRow: function(rowIndex, rowData){},
		onDblClickRow: function(rowIndex, rowData){},
		columns : [{
			title : '告警流水号',
			field : 'meAlarmNo',
			width : 160
		}, {
			title : '区域',
			field : 'areaName',
			width : 50
		}, {
			title : '告警ID',
			field : 'meAlarmId',
			width : 100
		}, {
			title : '告警标题',
			field : 'title',
			width : 250
		}, {
			title : '告警大类',
			field : 'alarmBigTypeValue',
			width : 80
		}, {
			title : '告警级别',
			field : 'alarmLevelName',
			formatter:alarmLevelFormater,
			width : 80
		},{
			title : '状态',
			field : 'dealWithStatusValue',
			width : 60,
			align:'center'
		}, {
			title : '故障设备类型',
			field : 'emsTypeValue',
			width : 80,
			align:'center'			
		},
		{
			title : '告警对象',
			field : 'objectName',
			width : 150
		}, {
			title : '所属EMS',
			field : 'emsName',
			formatter: function(value, row){
				return "[" + row["emsTypeValue"] + "]" + value;
			},
			width : 180
		}, {
			title : '告警时间',
			field : 'firstAlarmTimeStr',
			width : 140
		},{
			title : '描述',
			field : 'description',
			width : 250
		} ]
	}

})(jQuery);
/**
 * zdevice<br>
 * @class fish.desktop.widget.zdevice
 * @extends fish.desktop.widget
 * @require d3.js jquery.stringwidth.js
 * 用法:<br/>
 *      <pre></pre>
 */
!function() {
    $.widget('ui.zdevice', {
        options: {
            data:[],
            key:"id",
            value:"name",
            blockWidth:160,//设备最小宽度
            subBlockWidth:160,//设备最小宽度
            blockHeight:25,//设备高度
            blockGrapX1:60,
            blockGrapY1:12,
            blockFontSizeH1:16,
            blockFontSizeH2:12,
            lineGrapX1:30,
            minRecords:4
        },
        _create: function() {
            var $el = this.element;

            this._createUI();
            this._bindEvent();
        },
        _init: function() {},
        _destroy: function() {},
        _createUI: function () {
        	this._render();        	
        },
        _render:function(){
        	var me =this;
        	var data = me.options.data,
        	blockHeight = me.options.blockHeight,
        	subBlockWidth = me.options.subBlockWidth,
        	blockWidth = me.options.blockWidth,
        	blockGrapY1 = me.options.blockGrapY1,
        	blockGrapX1 = me.options.blockGrapX1,
        	blockFontSizeH1 = me.options.blockFontSizeH1,
        	blockFontSizeH2 = me.options.blockFontSizeH2,
            lineGrapX1 = me.options.lineGrapX1,
            minRecords = me.options.minRecords;
        	
        	var p = $.extend({},me.options);
        	me.p=p;
        	var totalHeight = 0;

            for(var index=0;index<data.length;index++){
                totalHeight+= (_.max([data[index].children.length,minRecords]))*(blockHeight+blockGrapY1)
            }
            
            var top1DataNames = _.pluck(data,"name");
            if(top1DataNames&&top1DataNames.length>0){
            	var maxblockWidthTmp = $.getMaxStringWidth(top1DataNames,blockFontSizeH1)
            	if(maxblockWidthTmp>blockWidth){
            		blockWidth = maxblockWidthTmp;
            	}
            }
            
            var tmpSubBlockWidth =$.getMaxStringWidth(_.chain(data).pluck("children").flatten().pluck("name").value(),blockFontSizeH2);
            if(tmpSubBlockWidth>subBlockWidth){
    			subBlockWidth = tmpSubBlockWidth;
    		}
            
            p.subBlockWidth=subBlockWidth;
            
            p.blockWidth=blockWidth;
        	
        	var $el = this.element;
        	this.svg = d3.select($el.get(0))
            .append("svg")
            .attr("width", (blockWidth+subBlockWidth+blockGrapX1*3))
            .attr("height", totalHeight)
        	//.style({width: (blockWidth*3+blockGrapX1*2), "height": totalHeight})
        	//.attr("viewBox","0,0,"+(blockWidth*3+blockGrapX1*2)+","+totalHeight);

        	this.topDevices = this.svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform",function(d,i){
                var h = 0;
                for(var index=0;index<i;index++){
                    h+= (_.max([data[index].children.length,minRecords]))*(blockHeight+blockGrapY1) ;
                }

                return "translate(0,"+ h+")"
            });
        	
        	this.subDevices = this.topDevices.selectAll("g")
            .data(function(d) { return d.children; }).enter().append("g")
            .classed('subdevice', true)
        	.style({"cursor": "pointer"}).on('click',function(d,index,parentIndex){
	        		if($.isFunction(me.options.subDeviceClick)){
	        			me.options.subDeviceClick(me,this,d,index,parentIndex);
	        		}
        		
        		})
            .attr("transform",
            function(d,i,parentIndex){
            	var h = i*blockHeight+i*blockGrapY1;
            	if(data[parentIndex].children.length<minRecords){
            		var difference = minRecords-data[parentIndex].children.length+1;
            		h += (difference*(blockHeight+blockGrapY1) - (difference==0?0: (blockGrapY1*2+blockHeight/2)) )/2;
            		
            	}
            	            	
                return "translate("+(blockWidth+blockGrapX1)+","+ h +")"
            });
        	
        	var subDeviceRects = this.subDevices.append("rect").attr("width",subBlockWidth+40)
            .attr("height",25).attr("fill","#EEEEEE");
        	
        	this.subDevices.append("text").classed('subdevice-text', true)
	        .attr("text-anchor", "left").attr("fill", "#0096FF").attr("x",function(d,i){
	            return 20;//blockWidth/2- (d.name.length*16)/2
	        })
	        .attr("y",(blockFontSizeH2/2+blockHeight/2-2)).text(function(d){
	        	return d.name
	        	}).attr( "font-size",blockFontSizeH2);

        	
        	
        	this.topDeviceNodes = this.topDevices.append("g")
        	
            .attr("transform",function(d,i){
                var h = ((_.max([d.children.length,minRecords]))*(blockHeight+blockGrapY1) - ((_.max([d.children.length,minRecords]))==0?0: (blockGrapY1*2+blockHeight/2)) )/2;

                return "translate(0,"+ h+")"
            });
        	
        	this.topDeviceNodes.append("rect")
            .attr("width",blockWidth)
            .attr("height",blockHeight).attr("fill","#EEEEEE");

        	this.topDeviceNodes.append("text")
            .attr("text-anchor", "left")
            .attr("x",function(d,i){
                return blockWidth/2- (d.name.length*16)/2
            })
            .attr("y",(blockFontSizeH1/2+blockHeight/2-2))
            .text(function(d){return d.name}).attr( "font-size",blockFontSizeH1);

        	this.topDeviceLineNodes = this.topDevices.selectAll("path")
            .data(function(d) { return d.children; }).enter().append("path")
            .attr("stroke-dasharray","5,5")
            .attr("fill","none")
            .attr("stroke","#D0D0D0")
            .attr("stroke-width","1")
            .attr("d",function(d,i,parentIndex){
                //console.log("uck===",d,"sssss",i,"arguments",arguments);
                var startedX = blockWidth,
                        startedY = ((_.max([data[parentIndex].children.length,minRecords]))*(blockHeight+blockGrapY1) - ((_.max([data[parentIndex].children.length,minRecords]))==0?0: (blockGrapY1*2+blockHeight/2)) )/2 +blockHeight/ 2,
                        midX1= (startedX+lineGrapX1),midY1= startedY,
                        midX2= (startedX+lineGrapX1),midY2= i*(blockGrapY1+blockHeight)+blockHeight/2,
                        endX= (blockWidth+blockGrapX1),endY=i*(blockGrapY1+blockHeight)+blockHeight/2;
                
                if(data[parentIndex].children.length<minRecords){
            		var difference = minRecords-data[parentIndex].children.length+1;
            		var offsetY = (difference*(blockHeight+blockGrapY1) - (difference==0?0: (blockGrapY1*2+blockHeight/2)) )/2;
            		
            		midY2+=offsetY;
            		endY+=offsetY;
            		
            	}
                
                
                return "M"+ startedX +" "+startedY
                        +" L"+ midX1 +" " + midY1
                        +" L"+ midX2 +" " + midY2
                        +" L"+ endX +" " + endY
                        +" ";

            });
        },
        _bindEvent: function () {
        },
        destroy: function() {
        	if(this.svg&&$.isFunction(this.svg.remove)){
        		this.svg.remove();
        	}
        }
    });
}();

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