/*
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