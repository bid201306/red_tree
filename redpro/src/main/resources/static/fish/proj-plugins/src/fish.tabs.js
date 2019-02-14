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