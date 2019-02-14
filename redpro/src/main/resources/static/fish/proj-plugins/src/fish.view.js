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
			var fis = _.filter(this.__viewEvents__, function(ev){ return ev.namespace  == namespace && ev.callback==callback; });
			this.__viewEvents__=_.difference(this.__viewEvents__,fis);
		}
		$(MainView).unbind(namespace,callback);
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
