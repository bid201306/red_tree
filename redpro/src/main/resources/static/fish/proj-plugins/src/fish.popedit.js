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
