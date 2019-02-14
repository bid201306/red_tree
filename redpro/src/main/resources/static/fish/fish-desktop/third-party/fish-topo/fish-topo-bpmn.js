(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fishTopoBpmn"] = factory();
	else
		root["fishTopoBpmn"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Export fishTopo as CommonJS module
	 */
	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	    var graphic = __webpack_require__(3);
	    var ExtensionAPI = __webpack_require__(56);
	    var Point = __webpack_require__(57);
	    var Eventful = __webpack_require__(12);
	    var zrender = __webpack_require__(58);
	    var zrUtil = __webpack_require__(4);
	    var BpmnUtil = __webpack_require__(68);
	    var util = __webpack_require__(69);
	    var BPMNModel = __webpack_require__(74);
	    var BPMNNode = __webpack_require__(71);
	    var OperationNode = __webpack_require__(97);
	    var BpmnConnectionManager = __webpack_require__(99);
	    var Connector = __webpack_require__(92);
	    var LineOperationManager = __webpack_require__(102);
	    var Guidelines = __webpack_require__(103);
	    var Bpmn = __webpack_require__(96);
	
	    function FishTopoBpmn(dom, opts) {
	        /**
	         * @type {string}
	         */
	        this.id;
	        /**
	         * Group id
	         * @type {string}
	         */
	        this.group;
	        /**
	         * @type {HTMLDomElement}
	         * @private
	         */
	        this._dom = dom;
	        /**
	         * @type {module:zrender/ZRender}
	         * @private
	         */
	        this._zr = zrender.init(dom, {
	            renderer: opts.renderer || 'canvas',
	            devicePixelRatio: opts.devicePixelRatio
	        });
	        /**
	         * 键盘值
	         * @type number
	         */
	
	        this.deleteKeycode = 46;
	        /**
	         * 存放所有节点
	         * @type {Array}
	         */
	        this.allNodes = [];
	        /**
	         * 存放子节点
	         * @type {Array}
	         */
	        this.subProcessNode = [];
	
	        /**
	         * 存放节点的位置信息，拖动的时候用到
	         * @type {Array}
	         */
	        this.domArray = [];
	        /**
	         * 存放节点的位置信息，判断重叠用到，除去了子流程里面的节点
	         * @type {Array}
	         */
	        this.overlapArray = [];
	        /**
	         * 选中的节点
	         * @type {Boolean}
	         */
	        this.selectedNode = null;
	        this.isNode = false;
	        /**
	         * 对齐线和移动框节点
	         * @type {object}
	         */
	        this.rect;
	        this.operationNode;
	        this.opts = opts;
	        this._api = new ExtensionAPI(this);
	        this.forbidEdit = false;
	
	        this.model = new BPMNModel({});
	        this.model.set(Bpmn.RESOURCE_ID, util.getUUID());
	        this.model.set(Bpmn.BPMN_TYPE, Bpmn.TEMPLATE);
	        Eventful.call(this);
	        BpmnUtil.registerBPMNNode();
	    }
	
	    var fishTopoProto = FishTopoBpmn.prototype;
	
	    /**
	     * @return {HTMLDomElement}
	     */
	    fishTopoProto.getDom = function() {
	        return this._dom;
	    };
	
	    /**
	     * @return {module:zrender~ZRender}
	     */
	    fishTopoProto.getZr = function() {
	        return this._zr;
	    };
	    /**
	     * @return {number}
	     */
	    fishTopoProto.getWidth = function() {
	        return this._zr.getWidth();
	    };
	
	    /**
	     * @return {number}
	     */
	    fishTopoProto.getHeight = function() {
	        return this._zr.getHeight();
	    };
	
	
	    /**
	     * @return {boolean}
	     */
	    fishTopoProto.isDisposed = function() {
	        return this._disposed;
	    };
	
	    /**
	     * Dispose instance
	     */
	    fishTopoProto.dispose = function() {
	        this._disposed = true;
	
	        this._zr.dispose();
	
	        instances[this.id] = null;
	    };
	
	
	
	    /**
	     * 调整尺寸  在窗口大小发生改变时需要手工调用
	     */
	    fishTopoProto.resize = function(width, height) {
	        $(this.getDom()).css("width",width);
	        $(this.getDom()).css("height",height);
	        this._zr.resize();
	        this._zr.remove(this.group);
	        this.group = new graphic.Group();
	        this.gridLine(0.2);
	        this._zr.add(this.group);
	    };
	
	    /** 初始化 */
	    fishTopoProto.init = function() {
	        var that = this;
	        this.group = new graphic.Group();
	        if (this.opts.showGridLine == true || opts.showGridLine == "true") {
	            this.gridLine(0.2);
	            this._zr.add(this.group);
	        };
	
	        //mouseup 会在各个node或线的点击事件之前执行  在选中节点或线前 先清空选中效果
	        this._zr.on("mouseup", function(e) {
	            if (that.operationNode) {
	                that._zr.remove(that.operationNode);
	                that.operationNode = null;
	            }
	            var shape = e.target;
	            if (shape && shape.connector instanceof Connector) {
	                return;
	            }
	            BpmnConnectionManager.clearSelectCon();
	            if (shape && shape.operation && shape.operation == true) {
	                return;
	            }
	            LineOperationManager.hideAllLineOperation();
	        });
	        //派发不是节点或线 的画布点击事件
	        this._zr.on("click", function(e) {
	
	            var shape = e.target;
	            //点击的线
	            if (shape && shape.parent && shape.parent.resourceId) {
	                return;
	            } else {
	                var params = {};
	                params.event = e;
	                params.type = "click";
	                params.target = that;
	                that._api.trigger(params.type, params);
	            };
	        });
	        this.on('conPointsGroup:click', function(argument) {
	            LineOperationManager.bindOperation(argument.lineNode);
	        })
	    };
	
	    /**
	     * 根据传过来的值  设置模型
	     * @param {[type]} shape  [description]
	     * @param {[type]} option [description]
	     */
	    fishTopoProto.setShapeModel = function(shape, option,width ,height) {
	        if (Bpmn.isTemplate(shape.model)) {
	            this.model.mergeOption(option);
	            if (width > 0 && height > 0) {
	                this.resize(width,height);
	            };            
	        } else if (Bpmn.isFlow(shape.model)) {
	            BpmnConnectionManager.setModel(shape, option);
	            LineOperationManager.hideAllLineOperation();
	        } else {
	            shape.setModel(option);
	        }
	    }
	
	    /**
	     * 清空画布
	     * @return {[type]} [description]
	     */
	    fishTopoProto.clear = function() {
	        this.allNodes = [];
	
	        this.subProcessNode = [];
	
	        this.domArray = [];
	
	        this.overlapArray = [];
	
	        this.selectedNode = null;
	        this.rect = null;
	        BpmnConnectionManager.connectors = [];
	        this._zr.clear();
	        this._zr.add(this.group); // 画网格线  代码放这比较恶心 后面改
	
	    };
	
	    fishTopoProto.forbidGridLine = function(isForbidden) {
	        if (isForbidden == true) {
	            this._zr.remove(this.group);
	        } else {
	            this._zr.remove(this.group);
	            this.group = new graphic.Group();
	            this.gridLine(0.2);
	            this._zr.add(this.group);
	        }
	    };
	
	    /**
	     * 导出json
	     * @return {[type]} [description]
	     */
	    fishTopoProto.exportJson = function() {
	        return BpmnUtil.exportJson(this.model, this.allNodes, BpmnConnectionManager.connectors);
	    };
	
	    /**
	     * 导入json
	     * @param  {[type]} json [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.drawFromJson = function(json) {
	        return BpmnUtil.fromJson(this, json);
	    };
	
	    //背景网格线
	    fishTopoProto.gridLine = function(opacity) {
	        var pixel = this.opts.gridLineSpacing;
	        var widthLen = parseInt(this.getWidth() / pixel);
	        for (var x = 0; x <= widthLen; x++) {
	            var line = new graphic.Line({
	                shape: {
	                    x1: x * pixel,
	                    y1: 0,
	                    x2: x * pixel,
	                    y2: this.getHeight(),
	                },
	                style: {
	                    lineDash: [1],
	                    opacity: opacity,
	                },
	                z: -1,
	                draggable: false,
	                cursor: 'default'
	            });
	            this.group.add(line);
	        };
	
	        var heightLen = parseInt(this.getHeight() / pixel, pixel);
	        for (var y = 0; y <= heightLen; y++) {
	            var line = new graphic.Line({
	                shape: {
	                    x1: 0,
	                    y1: y * pixel,
	                    x2: this.getWidth(),
	                    y2: y * pixel,
	                },
	                style: {
	                    lineDash: [1],
	                    opacity: opacity,
	                },
	                z: -1,
	                draggable: false,
	                cursor: 'default'
	            });
	            this.group.add(line);
	        }
	    };
	
	
	    /**
	     * 通过界面拖动 增加节点
	     * @param {[type]} itemType [description]
	     * @param {[type]} x        [description]
	     * @param {[type]} y        [description]
	     */
	    fishTopoProto.addNode = function(itemType, x, y) {
	
	        //判断是否在范围内
	        if (x >= 0 && y >= 0) {
	            var model = new BPMNModel({});
	            model.set(Bpmn.BPMN_TYPE, itemType);
	            model.set("bounds.upperLeft", { x: x, y: y });
	            this.addNodeByModel(model,true);
	        }
	    };
	
	    /**
	     * 根据模型增加节点
	     * @param {[type]} model [description]
	     * @return {Object} 创建完成的节点
	     */
	    fishTopoProto.addNodeByModel = function(model, isFromDrag) {
	        var that = this;
	        var Shape = BPMNNode.getClass(Bpmn.getType(model));
	        var mesArray;
	        if (Shape) {
	            node = new Shape(model, this._api);
	            if (this.subProcessNode.length == 0) {
	                this._zr.add(node);
	                mesArray = { id: node.id, position: [node.getRect().x, node.getRect().y], width: node.getRect().width, height: node.getRect().height };
	                if (!Bpmn.isSlotEvent(node.model)) {
	                    this.overlapArray.push(mesArray);
	                }
	
	            } else {
	                this._zr.add(node);
	                mesArray = { id: node.id, position: [node.getRect().x, node.getRect().y], width: node.getRect().width, height: node.getRect().height };
	                if (!Bpmn.isSlotEvent(node.model)) {
	                    this.overlapArray.push(mesArray);
	                }
	                if(isFromDrag){
	                    //1.判断所有的子节点
	                    for (var i = 0; i < this.subProcessNode.length; i++) {
	                        //2.如果节点拖放在 子节点中
	                        if (this.subProcessNode[i].rectContain(node.getRect().x, node.getRect().y)) {
	                            //2.1重新计算节点在 子节点中的位置  并加入到子节点
	                            var groupNodePositionX = this.subProcessNode[i].getRect().width / 2 + (node.getRect().x - this.subProcessNode[i].getRect().x);
	                            var groupNodePositionY = this.subProcessNode[i].getRect().height / 2 + (node.getRect().y - this.subProcessNode[i].getRect().y);
	                            node.reDraw(groupNodePositionX, groupNodePositionY);
	                            this.subProcessNode[i].add(node);
	                            //2.2从zr中删除
	                            this._zr.remove(node);
	                            //2.3从 节点位置 信息数组中删除此节点
	                            for (var i = 0; i < that.overlapArray.length; i++) {
	                                if (node.id == that.overlapArray[i].id) {
	                                    that.overlapArray.splice(i, 1);
	                                }
	                            }
	                            break;
	                        }
	                    }
	                }
	
	            }
	            //2.如果是子节点 则加入到子节点数组中
	            if (Bpmn.isSubProcess(node.model)) {
	                this.subProcessNode.push(node);
	            }
	            this.allNodes.push(node);
	            //放入节点位置信息 用于拖拽
	            this.domArray.push(mesArray);
	
	            //侦听节点的事件 并把事件给取消掉 防止 如果父是子节点侦听到
	            node.on('mousedown', function(e) {
	                if (that.forbidEdit == true) {
	                    return;
	                }
	                that.newDrag(this, e.event.clientX, e.event.clientY);
	                //如果选择的是事件节点，则为其他task绑定插槽
	                if (Bpmn.isSlotEvent(this.model)) {
	                    that.bindEventNode(this);
	                }
	                e.cancelBubble = true;
	            });
	            node.on('click', function(e) {
	                if (that.forbidEdit == true) {
	                    return;
	                }
	                that.nodeMouseDown(this, e.event.clientX, e.event.clientY);
	                e.cancelBubble = true;
	            });
	
	            //添加tip
	            that.creatTip(node);
	            node.on("mouseover", function() {
	                if (this.alarm.isShow == true) {
	                    this.alarm.show();
	                }
	            });
	            node.on("mouseout", function() {
	                this.alarm.hide();
	            });
	
	            return node;
	        }
	    };
	
	    /**
	     * 根据模型增加线
	     * @param {[type]} model [description]
	     */
	    fishTopoProto.addConnectorByModel = function(model, parentZr) {
	        //找出 startNode 与 endNode
	        var startNode = null,
	            endNode = null;
	        zrUtil.each(this.allNodes, function(node) {
	            //startNode: 从allNode中找出outgoing为 线的id的起始节点
	            var nodeOutgoing = node.model.get("outgoing");
	            if (nodeOutgoing.indexOf(model.get("resourceId")) !== -1) {
	                startNode = node;
	            };
	            //endNode : 从allNode中找出 id 为线的outgoing的结束节点
	            var connectorOutgoing = model.get("outgoing");
	            if (connectorOutgoing.indexOf(node.resourceId) !== -1) {
	                endNode = node;
	            }
	        })
	        if (startNode && endNode) {
	            var connector = BpmnConnectionManager.connectorCreateByOptions(startNode, endNode, { model: model }, this._api);
	            if (parentZr) {
	                parentZr.add(connector);
	            } else {
	
	              this._zr.add(connector);
	            }
	        };
	
	    };
	
	    /**
	     * 创建连线的小图标操作
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.addIcon = function(key, obj) {
	        LineOperationManager.addIcon(key, obj, this._zr);
	    };
	    /**
	     * 创建连线的默认删除操作
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.bindLineDelete = function(lineNode) {
	        var that = this;
	        var parentZr;
	        if (lineNode.parent) {
	            parentZr = lineNode.parent;
	        } else {
	            parentZr = that._zr;
	        }
	        //创建删除
	        LineOperationManager.addIcon("delete", LineOperationManager.deleteIconObj(parentZr,lineNode), parentZr);
	    };
	    /**
	     * 查询节点所连线的其他节点的数组
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.checkLineNode = function(node) {
	        var startArray = [],
	            endArray = [];
	        var lineArray = BpmnConnectionManager.connectors;
	        for (var i = 0, len = lineArray.length; i < len; i++) {
	            if (lineArray[i].startNode == node) {
	                endArray.push(lineArray[i].endNode);
	            }
	        }
	        for (var j = 0, len = lineArray.length; j < len; j++) {
	            if (lineArray[j].endNode == node) {
	                startArray.push(lineArray[j].startNode);
	            }
	        }
	        var lineNodeArray = [startArray, endArray]
	        return lineNodeArray;
	    };
	    /**
	     * 初始化 操作的虚线框
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.initOperationNode = function(node) {
	        var that = this;
	        this.operationNode = new OperationNode(node, that._zr);
	        // 侦听 箭头 拖拽开始事件
	        this.operationNode.on(OperationNode.ARROW_DRAGSTART, function(e) {
	            var x = e.event.offsetX;
	            var y = e.event.offsetY;
	            //拖拽开始先把 箭头图标 给隐藏
	            e.event.target.hide();
	            var rEndPoint = new Point(x, y);
	            if (that.selectedNode.parent && Bpmn.isSubProcess(that.selectedNode.parent.model)) {
	                var subProcessNode = that.selectedNode.parent;
	                rEndPoint = new Point(x - subProcessNode.position[0], y - subProcessNode.position[1]);
	            }
	
	            var connector = BpmnConnectionManager.manageTempConnector(that.selectedNode, rEndPoint, Connector.TYPE_STRAIGHT);
	            if (that.selectedNode.parent && Bpmn.isSubProcess(that.selectedNode.parent.model)) {
	                that.selectedNode.parent.add(connector);
	            } else {
	                that._zr.add(connector);
	            }
	        });
	
	        // 侦听 箭头 拖拽事件
	        this.operationNode.on(OperationNode.ARROW_DRAG, function(e) {
	            var x = e.event.offsetX;
	            var y = e.event.offsetY;
	            var rEndPoint = new Point(x, y);
	            if (that.selectedNode.parent && Bpmn.isSubProcess(that.selectedNode.parent.model)) {
	                var subProcessNode = that.selectedNode.parent;
	                rEndPoint = new Point(x - subProcessNode.position[0], y - subProcessNode.position[1]);
	            }
	            BpmnConnectionManager.manageTempConnector(that.selectedNode, rEndPoint, Connector.TYPE_STRAIGHT);
	        });
	
	        //侦听 箭头 拖拽结束事件 画线
	        this.operationNode.on(OperationNode.ARROW_DRAGEND, function(e) {
	                var x = e.event.offsetX;
	                var y = e.event.offsetY;
	                var targetNode = null;
	                //拖拽结束先把 箭头图标 给显示
	                e.event.target.show();
	
	
	
	                //1.如果是子节点 内 节点拖拽 则 增加排除子节点的参数
	                if (node.parent) {
	                    if (Bpmn.isSubProcess(node.parent.model)) {
	                        //删除临时线
	                        BpmnConnectionManager.removeTempConnector(node.parent);
	                        targetNode = BpmnUtil.findHover(that.allNodes, x, y, that.subProcessNode);
	                    }
	                } else {
	                    targetNode = BpmnUtil.findHover(that.allNodes, x, y);
	                    //删除临时线
	                    BpmnConnectionManager.removeTempConnector(that._zr);
	                }
	                //2.如果找到目标结点 则画线
	                if (targetNode && (that.selectedNode != targetNode)) {
	                    var connector = BpmnConnectionManager.connectorCreate(that.selectedNode, targetNode, Connector.TYPE_JAGGED, that._api);
	                    if (targetNode.parent && that.selectedNode.parent) {
	                        targetNode.parent.add(connector);
	                    }
	                    if (!targetNode.parent && !that.selectedNode.parent) {
	                        that._zr.add(connector);
	                    }
	                    connector.on("mousedown", function(e) {
	                        BpmnConnectionManager.connectorForbidEdit(that.forbidEdit);
	                        LineOperationManager.isEdit = !that.forbidEdit;
	                        that.isNode = false;
	                    });
	                }
	                var shapeRect = that.selectedNode.getRect();
	                that.operationNode.render(node, that._zr, shapeRect);
	            })
	            //删除按钮点击事件
	        this.operationNode.on("OperationNode:deleteClick", function(e) {
	                //1.如果是子节点 内 节点  则 调用子节点的删除
	                var parentZr;
	                if(that.selectedNode.parent){
	                    parentZr = that.selectedNode.parent;
	                }else{
	                    parentZr = that._zr;
	                }
	                // if (that.selectedNode.parent) {
	                //     if (Bpmn.isSubProcess(that.selectedNode.parent.model)) {
	                //         that.selectedNode.parent.remove(that.selectedNode);
	                //     }
	                // } else {
	                //     that._zr.remove(that.selectedNode);
	                // }
	                parentZr.remove(that.selectedNode);
	                //2.从allNodes数组中删除
	                for (var i = 0; i < that.allNodes.length; i++) {
	                    if (that.selectedNode.id == that.allNodes[i].id) {
	                        that.allNodes.splice(i, 1);
	                    }
	                }
	                for (var j = 0; j < that.domArray.length; j++) {
	                    if (that.selectedNode.id == that.domArray[j].id) {
	                        that.domArray.splice(j, 1);
	                    }
	                }
	                for (var i = 0; i < that.overlapArray.length; i++) {
	                    if (that.selectedNode.id == that.overlapArray[i].id) {
	                        that.overlapArray.splice(i, 1);
	                    }
	                }
	                //3.将此节点交联的线也删除
	                BpmnConnectionManager.deleteSelectCon(that.selectedNode, parentZr);
	                //如果删除节点是task节点，需要将依附它的事件节点删除
	                if (Bpmn.isActivity(that.selectedNode.model) || Bpmn.isSubProcess(that.selectedNode.model)) {
	                    if (that.selectedNode.slotEvent && that.selectedNode.slotEvent.length > 0) {
	                        for (var m = 0; m < that.selectedNode.slotEvent.length; m++) {
	                            if (that.selectedNode.slotEvent[m].parent) {
	                                if (Bpmn.isSubProcess(that.selectedNode.slotEvent[m].parent.model)) {
	                                    that.selectedNode.slotEvent[m].parent.remove(that.selectedNode.slotEvent[m]);
	                                }
	                            } else {
	                                that._zr.remove(that.selectedNode.slotEvent[m]);
	                            }
	                            for (var i = 0; i < that.allNodes.length; i++) {
	                                if (that.selectedNode.slotEvent[m].id == that.allNodes[i].id) {
	                                    that.allNodes.splice(i, 1);
	                                }
	                            }
	                            for (var j = 0; j < that.domArray.length; j++) {
	                                if (that.selectedNode.slotEvent[m].id == that.domArray[j].id) {
	                                    that.domArray.splice(j, 1);
	                                }
	                            }
	                        }
	                    }
	                }
	                //4.如果删除的是事件节点，需要将绑定它的task节点的标识删除
	                if (Bpmn.isSlotEvent(node.model)) {
	                    for (var i = 0; i < that.allNodes.length; i++) {
	                        if (Bpmn.isActivity(that.allNodes[i].model)|| Bpmn.isSubProcess(that.allNodes[i].model)) {
	                            if (that.allNodes[i].slotEvent && that.allNodes[i].slotEvent.length > 0) {
	                                for (var m = 0; m < that.allNodes[i].slotEvent.length; m++) {
	                                    if (that.selectedNode.id == that.allNodes[i].slotEvent[m].id) {
	                                        that.allNodes[i].slotEvent.splice(m, 1);
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	            })
	            //放大缩小拖动过程
	        this.operationNode.on("OperationNode:scaleDragLeft", function(e) {
	            this.virtualRect.setShape({ points: e.points });
	        })
	        this.operationNode.on("OperationNode:scaleDragRight", function(e) {
	                this.virtualRect.setShape({ points: e.points });
	            })
	            //放大缩小拖动结束
	        this.operationNode.on("OperationNode:scaleDragEnd", function(e) {
	            //1.进行节点大小的设置，并维护位置信息数组
	            if (this.virtualRect.shape.points || this.virtualRect.shape.points != null) {
	                var width = this.virtualRect.shape.points[1][0] - this.virtualRect.shape.points[0][0] - 1;
	                var height = this.virtualRect.shape.points[2][1] - this.virtualRect.shape.points[1][1] - 1;
	                if (e.arrowName == "left") {
	                    var position = [that.selectedNode.position[0] - (width + 1 - that.selectedNode.getRect().width), that.selectedNode.position[1] - (height + 1 - that.selectedNode.getRect().height)];
	                }
	                if (e.arrowName == "right") {
	                    var position = [that.selectedNode.position[0], that.selectedNode.position[1]];
	                }
	                that.selectedNode.refresh({ shape: { width: width, height: height } });
	                var isChange = true;
	                if (height + 1 < that.selectedNode.getBoundingRect().height) {
	                    that.selectedNode.refresh({ shape: { height: that.selectedNode.getBoundingRect().height } });
	                    isChange = false;
	                }
	                if (width + 1 < that.selectedNode.getBoundingRect().width) {
	                    that.selectedNode.refresh({ shape: { width: that.selectedNode.getBoundingRect().width } });
	                    isChange = false;
	                }
	                if (isChange == true) {
	                    that.selectedNode.refresh({ position: position });
	                }
	                for (var i = 0; i < that.domArray.length; i++) {
	                    if (that.selectedNode.id == that.domArray[i].id) {
	                        that.domArray[i].position = [position[0] + (width + 1) / 2, position[1] + (height + 1) / 2];
	                    }
	                }
	                that.nodeMouseDown(that.selectedNode);
	                for (var i = 0; i < that.overlapArray.length; i++) {
	                    if (that.selectedNode.id == that.overlapArray[i].id) {
	                        that.overlapArray[i] = { id: that.selectedNode.id, position: [that.selectedNode.getRect().x, that.selectedNode.getRect().y], width: that.selectedNode.getRect().width, height: that.selectedNode.getRect().height };
	                    }
	                }
	            }
	            //2.刷新线
	            BpmnConnectionManager.refreshLineByNode(that.selectedNode);
	            var endSlotPoints = util.getSoltPoints(that.selectedNode);
	            if(that.selectedNode.slotEvent&&that.selectedNode.slotEvent.length>0){
	                for(var i = 0; i < that.selectedNode.slotEvent.length; i++){
	                    var slotNode = that.selectedNode.slotEvent[i];
	                    for(var j = 0; j < e.startSlotPoints.length;j++){
	                        if(that.selectedNode.slotEvent[i].position[0]-e.startPosition[0] == e.startSlotPoints[j][0]&&that.selectedNode.slotEvent[i].position[1]-e.startPosition[1] == e.startSlotPoints[j][1]){
	                            that.selectedNode.slotEvent[i].attr("position",[endSlotPoints[j][0]+that.selectedNode.position[0],endSlotPoints[j][1]+that.selectedNode.position[1]]);
	                            BpmnConnectionManager.refreshLineByNode(that.selectedNode.slotEvent[i]);
	                        }
	                    }
	                }
	            }
	        })
	        this._zr.add(this.operationNode);
	
	
	    };
	
	    /**
	     * 鼠标点下 将操作框 移到对应的节点上
	     * @param  {[type]} node [description]
	     * @param  {[type]} sX   [description]
	     * @param  {[type]} sY   [description]
	     * @return {[type]}      [description]
	     */
	    fishTopoProto.nodeMouseDown = function(node, sX, sY) {
	        var that = this;
	        this.selectedNode = node;
	        var shapeRect = node.getRect();
	        if (!this.operationNode) {
	            this.initOperationNode(node);
	        }
	        that.rect.attr("style", {
	            stroke: "rgba(0, 0, 0, 1)"
	        });
	        this.operationNode.render(node, that._zr, shapeRect);
	    };
	
	    /**
	     * 初始化虚框对齐线
	     * @param  {[type]} shapeList [description]
	     * @return {[type]}           [description]
	     */
	    fishTopoProto.initVirtualLine = function(shapeList) {
	        Guidelines.createGuidelines(this._zr);
	        this.rect = new graphic.Polyline({
	            position: [shapeList.x, shapeList.y],
	            shape: {
	                points: shapeList.points,
	            },
	            style: {
	                lineDash: [2]
	            },
	            z: 3,
	        });
	        this._zr.add(this.rect);
	    };
	    //绑定事件节点
	    fishTopoProto.bindEventNode = function(eventNode) {
	        var that = this;
	        //mousedown的时候为每个task创建插槽
	        for (var i = 0; i < that.allNodes.length; i++) {
	            if (Bpmn.isActivity(that.allNodes[i].model)|| Bpmn.isSubProcess(that.allNodes[i].model)) {
	                that.creatSlot(that.allNodes[i]);
	            }
	        }
	        //mouseup的时候删除插槽
	        that._zr.on("mouseup", function() {
	            for (var i = 0; i < that.allNodes.length; i++) {
	                if (Bpmn.isActivity(that.allNodes[i].model)|| Bpmn.isSubProcess(that.allNodes[i].model)) {
	                    if (that.allNodes[i].slot && that.allNodes[i].slot.length > 0) {
	                        for (var m = 0; m < that.allNodes[i].slot.length; m++) {
	                            that.allNodes[i].remove(that.allNodes[i].slot[m]);
	                        }
	                    }
	                }
	            }
	        })
	
	    }
	    fishTopoProto.creatSlot = function(node) {
	            //给task创建8个插槽
	            node.slot = [];
	            var position = util.getSoltPoints(node);
	            for (var j = 0; j < 8; j++) {
	                var Circle = new graphic.Circle({
	                    position: position[j],
	                    shape: {
	                        cx: 0,
	                        cy: 0,
	                        r: 10
	                    },
	                    style: {
	                        lineWidth: 1,
	                        stroke: 'rgba(0,0,0,0.6)',
	                        fill: 'transparent'
	                    },
	                });
	                node.slot.push(Circle);
	                node.add(Circle);
	            }
	
	
	        }
	        /**
	         * mousedown后 开始拖动
	         * @param  {[type]} dom [description]
	         * @param  {[type]} sX  [description]
	         * @param  {[type]} sY  [description]
	         * @return {[type]}     [description]
	         */
	    fishTopoProto.newDrag = function(dom, sX, sY) {
	        var that = this;
	        that.selectedNode = dom;
	        that.isNode = true;
	        var pixel = this.opts.gridLineSpacing;
	        var shapeList = dom.getRect();
	        var domArray = that.domArray;
	        //zrender不支持键盘事件，只能侦听body元素上的了
	        $('body').one('keydown', function(e) {
	            var e = e || window.event;
	            //判断 delete按键
	            if (e.keycode == that.deleteKeycode || e.charCode == that.deleteKeycode || e.which == that.deleteKeycode) {
	                //1.如果是节点,移除事件,进行删除  如果是子节点 通过parent删除
	                if (that.isNode == true) {
	                    that.selectedNode.off();
	                    if (that.selectedNode.parent) {
	                        if (Bpmn.isSubProcess(that.selectedNode.parent.model)) {
	                            that.selectedNode.parent.remove(that.selectedNode);
	                        }
	                    } else {
	                        that._zr.remove(that.selectedNode);
	                    }
	                    //2.删除维护的节点数组
	                    for (var i = 0; i < that.allNodes.length; i++) {
	                        if (that.selectedNode.id == that.allNodes[i].id) {
	                            that.allNodes.splice(i, 1);
	                        }
	                    }
	                    for (var j = 0; j < domArray.length; j++) {
	                        if (that.selectedNode.id == domArray[j].id) {
	                            domArray.splice(j, 1);
	                        }
	                    }
	                    for (var i = 0; i < that.overlapArray.length; i++) {
	                        if (that.selectedNode.id == that.overlapArray[i].id) {
	                            that.overlapArray.splice(i, 1);
	                        }
	                    }
	                    //3.移去操作框
	                    if (that.operationNode) {
	                        that._zr.remove(that.operationNode);
	                        that.operationNode = null;
	                    }
	                    //3.删除对应的线
	                    BpmnConnectionManager.deleteSelectCon(that.selectedNode, that._zr);
	                } else { //否则直接删除线
	                    BpmnConnectionManager.deleteLine(that._zr);
	                }
	
	            }
	        });
	
	        //初始化 对齐线
	        var startX, startY;
	        startX = sX;
	        startY = sY;
	        if (dom.parent) {
	            if (Bpmn.isSubProcess(dom.parent.model)) {
	                var rectPositionX = shapeList.x + dom.parent.position[0];
	                var rectPositionY = shapeList.y + dom.parent.position[1];
	            }
	        } else {
	            var rectPositionX = shapeList.x;
	            var rectPositionY = shapeList.y;
	        }
	        if (!that.rect) {
	            that.initVirtualLine(shapeList);
	            that.rect.attr("position", [rectPositionX, rectPositionY]);
	        } else {
	            that.rect.attr("position", [rectPositionX, rectPositionY]);
	            that.rect.setShape({ points: shapeList.points });
	            that.rect.show();
	        }
	
	        var nowRectPosition = [rectPositionX, rectPositionY];
	        var isLap = 0;
	        var isMove = 0;
	        var moveFunction = function(e) {
	            moveDrag(e);
	        };
	        var upFunction = function(e) {
	            endDrag(e);
	        };
	        this._zr.on('mousemove', moveFunction);
	
	        //开始移动
	        function moveDrag(e) {
	            //以10个像素为单位进行移动
	            var nowXLinePosition, nowYLinePosition;
	            var maxRectPosition = [that.getWidth() - (that.rect.shape.points[1][0] - that.rect.shape.points[0][0]) / 2, that.getHeight() - (that.rect.shape.points[2][1] - that.rect.shape.points[1][1]) / 2];
	            var minRectPosition = [(that.rect.shape.points[1][0] - that.rect.shape.points[0][0]) / 2, (that.rect.shape.points[2][1] - that.rect.shape.points[1][1]) / 2];
	            for (var n = 0; n < Math.abs(parseInt((e.event.clientX - startX) / pixel)); n++) {
	                isMove = 1;
	                if (e.event.clientX - startX < 0) {
	                    nowRectPosition[0] = rectPositionX - pixel * (n);
	                } else {
	                    nowRectPosition[0] = rectPositionX + pixel * (n);
	                }
	                if (nowRectPosition[0] < minRectPosition[0]) {
	                    nowRectPosition[0] = minRectPosition[0];
	                }
	                if (nowRectPosition[0] > maxRectPosition[0]) {
	                    nowRectPosition[0] = maxRectPosition[0];
	                }
	            }
	            for (var m = 0; m < Math.abs(parseInt((e.event.clientY - startY) / pixel)); m++) {
	                isMove = 1;
	                if (e.event.clientY - startY < 0) {
	                    nowRectPosition[1] = rectPositionY - pixel * (m);
	                } else {
	                    nowRectPosition[1] = rectPositionY + pixel * (m);
	                }
	                if (nowRectPosition[1] < minRectPosition[1]) {
	                    nowRectPosition[1] = minRectPosition[1];
	                }
	                if (nowRectPosition[1] > maxRectPosition[1]) {
	                    nowRectPosition[1] = maxRectPosition[1];
	                }
	            }
	            that.rect.attr('position', nowRectPosition);
	
	            Guidelines.judgeAlignment(nowRectPosition,domArray,that.getWidth(),that.getHeight());
	            // 如果处于子节点内部  则不允许拖到外面 虚框标红
	            if (dom.parent) {
	                var centerX = Math.abs(nowRectPosition[0] - dom.parent.getRect().x);
	                var widthX = Math.abs(dom.getRect().width / 2 - dom.parent.getRect().width / 2);
	                var centerY = Math.abs(nowRectPosition[1] - dom.parent.getRect().y);
	                var heightY = Math.abs(dom.getRect().height / 2 - dom.parent.getRect().height / 2);
	                if (centerX > (widthX - pixel) || centerY > (heightY - pixel)) {
	                    resultFalse();
	                } else {
	                    resultSuccess();
	                }
	            }
	
	            function resultSuccess() {
	                isLap = 0;
	                that.rect.attr("style", {
	                    stroke: "rgba(0, 0, 0, 1)"
	                });
	            }
	
	            function resultFalse() {
	                isLap = 1;
	                that.rect.attr("style", {
	                    stroke: "rgba(255, 0, 0, 1)"
	                });
	            }
	            //判断是否有重叠  排除去了子流程里面的节点
	            if (!dom.parent) {
	                for (var l = 0, len = that.overlapArray.length; l < len; l++) {
	                    var rectDom = that.overlapArray[l];
	                    resultSuccess();
	                    //与拖拽节点不相等
	                    if (rectDom.id != that.rect.id && rectDom.id != dom.id) {
	                        if (shapeList.width > rectDom.width) {
	                            ////移动的位置 减去当前节点的位置 小于拖拽节点高度及宽度一半， 则有重叠 标红
	                            if (shapeList.height > rectDom.height) {
	                                if (Math.abs(nowRectPosition[0] - (rectDom.position[0])) < shapeList.width / 2 && Math.abs(nowRectPosition[1] - (rectDom.position[1])) < shapeList.height / 2) {
	                                    resultFalse();
	                                    break;
	                                } else {
	                                    resultSuccess();
	                                }
	                            } else {
	                                if (Math.abs(nowRectPosition[0] - (rectDom.position[0])) < shapeList.width / 2 && Math.abs(nowRectPosition[1] - (rectDom.position[1])) < rectDom.height / 2) {
	                                    resultFalse();
	                                    break;
	                                } else {
	                                    resultSuccess();
	                                }
	                            }
	
	                        } else {
	                            if (shapeList.height > rectDom.height) {
	                                if (Math.abs(nowRectPosition[0] - (rectDom.position[0])) < rectDom.width / 2 && Math.abs(nowRectPosition[1] - (rectDom.position[1])) < shapeList.height / 2) {
	                                    resultFalse();
	                                    break;
	                                } else {
	                                    resultSuccess();
	                                }
	                            } else {
	                                if (Math.abs(nowRectPosition[0] - (rectDom.position[0])) < (rectDom.width / 2) && Math.abs(nowRectPosition[1] - (rectDom.position[1])) < (rectDom.height / 2)) {
	                                    resultFalse();
	                                    break;
	                                } else {
	                                    resultSuccess();
	                                }
	                            }
	
	                        }
	
	                    }
	                }
	            }
	            //判断事件节点是否可以依附，可以依附显示绿框
	            if (Bpmn.isSlotEvent(dom.model)) {
	                for (var i = 0; i < that.allNodes.length; i++) {
	                    if (Bpmn.isActivity(that.allNodes[i].model)|| Bpmn.isSubProcess(that.allNodes[i].model)) {
	                        if (that.allNodes[i].slot && that.allNodes[i].slot.length > 0) {
	                            for (var m = 0; m < that.allNodes[i].slot.length; m++) {
	                                var slotPosition = [that.allNodes[i].slot[m].position[0] + that.allNodes[i].position[0], that.allNodes[i].slot[m].position[1] + that.allNodes[i].position[1]];
	                                if (nowRectPosition[0] == slotPosition[0] && nowRectPosition[1] == slotPosition[1]) {
	                                    that.rect.attr("style", {
	                                        stroke: "rgba(0, 255, 0, 1)"
	                                    });
	                                    break;
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	
	        }
	
	        function endDrag(e) {
	            that._zr.off('mousemove', moveFunction);
	            that._zr.off('mouseup', upFunction);
	            that._zr.off('globalout', upFunction);
	            if (dom.parent) {
	                dom.parent.off("globalout", upFunction);
	            }
	            that.rect.hide();
	            Guidelines.virtualXLine.attr("shape", {
	                x2: 0
	            });
	            Guidelines.virtualYLine.attr("shape", {
	                y2: 0
	            });
	            firstMove = 0;
	            isBreak = 0;
	            if (isLap == 0) {
	                if (dom.parent) {
	                    if (Bpmn.isSubProcess(dom.parent.model)) {
	                        var groupNodePositionX = dom.parent.getRect().width / 2 + (nowRectPosition[0] - dom.parent.getRect().x);
	                        var groupNodePositionY = dom.parent.getRect().height / 2 + (nowRectPosition[1] - dom.parent.getRect().y);
	                        if (dom.slotEvent && dom.slotEvent.length > 0) {
	                            for (var m = 0; m < dom.slotEvent.length; m++) {
	                                var slotEventPosition = [dom.slotEvent[m].position[0] + groupNodePositionX - zrUtil.clone(dom.position[0]) - dom.getBoundingRect().width / 2, dom.slotEvent[m].position[1] + groupNodePositionY - zrUtil.clone(dom.position[1]) - dom.getBoundingRect().height / 2];
	                                dom.slotEvent[m].attr("position", slotEventPosition);
	                                BpmnConnectionManager.refreshLineByNode(dom.slotEvent[m]);
	                            }
	                        }
	                        dom.reDraw(groupNodePositionX, groupNodePositionY);
	                    }
	                } else {
	                    if (dom.slotEvent && dom.slotEvent.length > 0) {
	                        for (var m = 0; m < dom.slotEvent.length; m++) {
	                            var slotEventPosition = [dom.slotEvent[m].position[0] + nowRectPosition[0] - zrUtil.clone(dom.position[0]) - dom.getBoundingRect().width / 2, dom.slotEvent[m].position[1] + nowRectPosition[1] - zrUtil.clone(dom.position[1]) - dom.getBoundingRect().height / 2];
	                            dom.slotEvent[m].attr("position", slotEventPosition);
	                            BpmnConnectionManager.refreshLineByNode(dom.slotEvent[m]);
	                        }
	                    }
	                    dom.reDraw(nowRectPosition[0], nowRectPosition[1]);
	                }
	                if (dom.alarm) {
	                    var newAlarmPosition = [nowRectPosition[0] + dom.getBoundingRect().width / 2 - (dom.alarm.getBoundingRect().width - 6), nowRectPosition[1] - dom.getBoundingRect().height / 2 - dom.alarm.getBoundingRect().height - 3];
	                    dom.alarm.attr("position", newAlarmPosition);
	                };
	                for (var i = 0; i < that.domArray.length; i++) {
	                    if (dom.id == that.domArray[i].id) {
	                        that.domArray[i].position = [nowRectPosition[0], nowRectPosition[1]];
	                    }
	                }
	            }
	            that.nodeMouseDown(dom, e.event.clientX, e.event.clientY);
	            if(isMove == 1){
	                BpmnConnectionManager.refreshLineByNode(dom);
	            }
	            
	            //将事件节点与task节点绑定或解绑
	            if (Bpmn.isSlotEvent(dom.model)) {
	                for (var i = 0; i < that.allNodes.length; i++) {
	                    if (Bpmn.isActivity(that.allNodes[i].model)|| Bpmn.isSubProcess(that.allNodes[i].model)) {
	                        if (that.allNodes[i].slot && that.allNodes[i].slot.length > 0) {
	                            for (var m = 0; m < that.allNodes[i].slot.length; m++) {
	                                var slotPosition = [that.allNodes[i].slot[m].position[0] + that.allNodes[i].position[0], that.allNodes[i].slot[m].position[1] + that.allNodes[i].position[1]];
	                                var newRectPosition = [];
	                                if (dom.parent) {
	                                    if (Bpmn.isSubProcess(dom.parent.model)) {
	                                        newRectPosition[0] = dom.parent.getRect().width / 2 + (nowRectPosition[0] - dom.parent.getRect().x);
	                                        newRectPosition[1] = dom.parent.getRect().height / 2 + (nowRectPosition[1] - dom.parent.getRect().y);
	                                    }
	                                } else {
	                                    newRectPosition = nowRectPosition;
	                                }
	                                if (newRectPosition[0] == slotPosition[0] && newRectPosition[1] == slotPosition[1]) {
	                                    that.allNodes[i].slotEvent.push(dom);
	                                    break;
	                                } else {
	                                    for (var k = 0; k < that.allNodes[i].slotEvent.length; k++) {
	                                        if (dom.id == that.allNodes[i].slotEvent[k].id) {
	                                            that.allNodes[i].slotEvent.splice(k, 1);
	                                        }
	                                    }
	                                }
	
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        this._zr.on("mouseup", upFunction);
	        this._zr.on("globalout", upFunction);
	    };
	
	    fishTopoProto.creatTip = function(node) {
	            //创建task内容的提示
	            var that = this;
	            var group = new graphic.Group();
	            group.isShow = false;
	            var name = node.model.get("properties.name") || "";
	            var showName;
	            if (name.length > 64) {
	                showName = name.substr(0, 64) + '..';
	            } else {
	                showName = name;
	            }
	            var text = new graphic.Text({
	                style: {
	                    text: showName,
	                    textFont: '16px Microsoft YaHei',
	                    fill: "#000000",
	                    textBaseline: "top" //垂直对齐
	                },
	                position: [2, 0],
	                z: 2
	            });
	            text.name = "Text";
	            group.add(text);
	            //根据字内容更改tip外框的大小
	            var groupWidth = group.getBoundingRect().width + 4;
	            var groupHeight = group.getBoundingRect().height + 8;
	            var points = [
	                [0, 0],
	                [groupWidth, 0],
	                [groupWidth, groupHeight],
	                [groupWidth - 3, groupHeight],
	                [groupWidth - 6, groupHeight + 3],
	                [groupWidth - 9, groupHeight],
	                [0, groupHeight],
	                [0, 0]
	            ]
	            var Polyline = new graphic.Polyline({
	                shape: {
	                    points: points
	                },
	                style: {
	                    fill: '#f9f9f9',
	                    stroke: '#bbbbbb',
	                },
	                z: 1
	            });
	            Polyline.name = "Polyline";
	            group.add(Polyline);
	            var groupPosition = [node.position[0] + node.getBoundingRect().width - (group.getBoundingRect().width - 6), node.position[1] - group.getBoundingRect().height - 3];
	            group.attr("position", groupPosition);
	            that._zr.add(group);
	            node.alarm = group;
	            group.hide();
	        },
	
	        zrUtil.mixin(FishTopoBpmn, Eventful);
	
	    // ---------对外暴露fishTopoBpmn------------------
	    var idBase = new Date() - 0;
	    var instances = {};
	    var DOM_ATTRIBUTE_KEY = '_fishTopoBpmn_instance_';
	    var fishTopoBpmn = {
	        /**
	         * @type {number}
	         */
	        version: '1.0.0',
	        dependencies: {
	            zrender: '3.0.4'
	        }
	    };
	
	    /**
	     * @param {HTMLDomElement} dom
	     * @param {Object} opts
	     */
	    fishTopoBpmn.init = function(dom, opts) {
	        if (!dom) {
	            throw new Error('Initialize failed: invalid dom.');
	        }
	
	        opts = opts || {};
	        // Default value
	        zrUtil.defaults(opts, {
	            type: "bpmn",
	            showGridLine: true,
	            devicePixelRatio: 1,
	            gridLineSpacing: 10
	        });
	
	        var fishTopoBpmn = new FishTopoBpmn(dom, opts);
	        fishTopoBpmn.init();
	
	        fishTopoBpmn.id = 'ft_' + idBase++;
	        instances[fishTopoBpmn.id] = fishTopoBpmn;
	
	        dom.setAttribute && dom.setAttribute(DOM_ATTRIBUTE_KEY, fishTopoBpmn.id);
	
	        return fishTopoBpmn;
	    };
	
	
	    /**
	     * @param  {HTMLDomElement} dom
	     * @return {fishTopo}
	     */
	    fishTopoBpmn.getInstanceByDom = function(dom) {
	        var key = dom.getAttribute(DOM_ATTRIBUTE_KEY);
	        return instances[key];
	    };
	
	    /**
	     * Dispose a fishTopo instance
	     * @param  {module:fishTopo|HTMLDomElement|string} fishTopo
	     */
	    fishTopoBpmn.dispose = function(chart) {
	        var topo;
	        if (zrUtil.isDom(chart)) {
	            topo = fishTopoBpmn.getInstanceByDom(chart);
	        } else if (typeof chart === 'string') {
	            topo = instances[chart];
	        }
	        if ((topo instanceof fishTopoBpmn) && !topo.isDisposed()) {
	            topo.dispose();
	        }
	    };
	
	    fishTopoBpmn.Bpmn = Bpmn;
	    module.exports = fishTopoBpmn;
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	    var zrUtil = __webpack_require__(4);
	
	    var pathTool = __webpack_require__(6);
	    var round = Math.round;
	    var Path = __webpack_require__(7);
	    var colorTool = __webpack_require__(20);
	    var matrix = __webpack_require__(14);
	    var vector = __webpack_require__(15);
	    var Gradient = __webpack_require__(5);
	
	    var graphic = {};
	    graphic.Util = zrUtil;
	    graphic.Group = __webpack_require__(37);
	
	    graphic.Image = __webpack_require__(38);
	
	    graphic.Text = __webpack_require__(41);
	
	    graphic.textContain = __webpack_require__(24);
	
	    graphic.Circle = __webpack_require__(42);
	
	    graphic.Sector = __webpack_require__(43);
	
	    graphic.Ring = __webpack_require__(44);
	
	    graphic.Polygon = __webpack_require__(45);
	
	    graphic.Polyline = __webpack_require__(49);
	
	    graphic.Rect = __webpack_require__(50);
	
	    graphic.Line = __webpack_require__(51);
	
	    graphic.BezierCurve = __webpack_require__(52);
	
	    graphic.Arc = __webpack_require__(53);
	
	    graphic.LinearGradient = __webpack_require__(54);
	
	    graphic.RadialGradient = __webpack_require__(55);
	
	    graphic.BoundingRect = __webpack_require__(25);
	
	    /**
	     * Extend shape with parameters
	     */
	    graphic.extendShape = function (opts) {
	        return Path.extend(opts);
	    };
	
	    /**
	     * Extend path
	     */
	    graphic.extendPath = function (pathData, opts) {
	        return pathTool.extendFromString(pathData, opts);
	    };
	
	    /**
	     * Create a path element from path data string
	     * @param {string} pathData
	     * @param {Object} opts
	     * @param {module:zrender/core/BoundingRect} rect
	     * @param {string} [layout=cover] 'center' or 'cover'
	     */
	    graphic.makePath = function (pathData, opts, rect, layout) {
	        var path = pathTool.createFromString(pathData, opts);
	        var boundingRect = path.getBoundingRect();
	        if (rect) {
	            var aspect = boundingRect.width / boundingRect.height;
	
	            if (layout === 'center') {
	                // Set rect to center, keep width / height ratio.
	                var width = rect.height * aspect;
	                var height;
	                if (width <= rect.width) {
	                    height = rect.height;
	                }
	                else {
	                    width = rect.width;
	                    height = width / aspect;
	                }
	                var cx = rect.x + rect.width / 2;
	                var cy = rect.y + rect.height / 2;
	
	                rect.x = cx - width / 2;
	                rect.y = cy - height / 2;
	                rect.width = width;
	                rect.height = height;
	            }
	
	            this.resizePath(path, rect);
	        }
	        return path;
	    };
	
	    graphic.mergePath = pathTool.mergePath,
	
	    /**
	     * Resize a path to fit the rect
	     * @param {module:zrender/graphic/Path} path
	     * @param {Object} rect
	     */
	    graphic.resizePath = function (path, rect) {
	        if (!path.applyTransform) {
	            return;
	        }
	
	        var pathRect = path.getBoundingRect();
	
	        var m = pathRect.calculateTransform(rect);
	
	        path.applyTransform(m);
	    };
	
	    /**
	     * Sub pixel optimize line for canvas
	     *
	     * @param {Object} param
	     * @param {Object} [param.shape]
	     * @param {number} [param.shape.x1]
	     * @param {number} [param.shape.y1]
	     * @param {number} [param.shape.x2]
	     * @param {number} [param.shape.y2]
	     * @param {Object} [param.style]
	     * @param {number} [param.style.lineWidth]
	     * @return {Object} Modified param
	     */
	    graphic.subPixelOptimizeLine = function (param) {
	        var subPixelOptimize = graphic.subPixelOptimize;
	        var shape = param.shape;
	        var lineWidth = param.style.lineWidth;
	
	        if (round(shape.x1 * 2) === round(shape.x2 * 2)) {
	            shape.x1 = shape.x2 = subPixelOptimize(shape.x1, lineWidth, true);
	        }
	        if (round(shape.y1 * 2) === round(shape.y2 * 2)) {
	            shape.y1 = shape.y2 = subPixelOptimize(shape.y1, lineWidth, true);
	        }
	        return param;
	    };
	
	    /**
	     * Sub pixel optimize rect for canvas
	     *
	     * @param {Object} param
	     * @param {Object} [param.shape]
	     * @param {number} [param.shape.x]
	     * @param {number} [param.shape.y]
	     * @param {number} [param.shape.width]
	     * @param {number} [param.shape.height]
	     * @param {Object} [param.style]
	     * @param {number} [param.style.lineWidth]
	     * @return {Object} Modified param
	     */
	    graphic.subPixelOptimizeRect = function (param) {
	        var subPixelOptimize = graphic.subPixelOptimize;
	        var shape = param.shape;
	        var lineWidth = param.style.lineWidth;
	        var originX = shape.x;
	        var originY = shape.y;
	        var originWidth = shape.width;
	        var originHeight = shape.height;
	        shape.x = subPixelOptimize(shape.x, lineWidth, true);
	        shape.y = subPixelOptimize(shape.y, lineWidth, true);
	        shape.width = Math.max(
	            subPixelOptimize(originX + originWidth, lineWidth, false) - shape.x,
	            originWidth === 0 ? 0 : 1
	        );
	        shape.height = Math.max(
	            subPixelOptimize(originY + originHeight, lineWidth, false) - shape.y,
	            originHeight === 0 ? 0 : 1
	        );
	        return param;
	    };
	
	    /**
	     * Sub pixel optimize for canvas
	     *
	     * @param {number} position Coordinate, such as x, y
	     * @param {number} lineWidth Should be nonnegative integer.
	     * @param {boolean=} positiveOrNegative Default false (negative).
	     * @return {number} Optimized position.
	     */
	    graphic.subPixelOptimize = function (position, lineWidth, positiveOrNegative) {
	        // Assure that (position + lineWidth / 2) is near integer edge,
	        // otherwise line will be fuzzy in canvas.
	        var doubledPosition = round(position * 2);
	        return (doubledPosition + round(lineWidth)) % 2 === 0
	            ? doubledPosition / 2
	            : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
	    };
	
	    /**
	     * @private
	     */
	    function doSingleEnterHover(el) {
	        if (el.__isHover) {
	            return;
	        }
	        if (el.__hoverStlDirty) {
	            var stroke = el.style.stroke;
	            var fill = el.style.fill;
	
	            // Create hoverStyle on mouseover
	            var hoverStyle = el.__hoverStl;
	            var lift = colorTool.lift;
	            hoverStyle.fill = hoverStyle.fill
	                || (fill && (fill instanceof Gradient ? fill : lift(fill, -0.1)));
	            hoverStyle.stroke = hoverStyle.stroke
	                || (stroke && (stroke instanceof Gradient ? stroke : lift(stroke, -0.1)));
	
	            var normalStyle = {};
	            for (var name in hoverStyle) {
	                if (hoverStyle.hasOwnProperty(name)) {
	                    normalStyle[name] = el.style[name];
	                }
	            }
	
	            el.__normalStl = normalStyle;
	
	            el.__hoverStlDirty = false;
	        }
	        el.setStyle(el.__hoverStl);
	        el.z2 += 1;
	
	        el.__isHover = true;
	    }
	
	    /**
	     * @inner
	     */
	    function doSingleLeaveHover(el) {
	        if (!el.__isHover) {
	            return;
	        }
	
	        var normalStl = el.__normalStl;
	        normalStl && el.setStyle(normalStl);
	        el.z2 -= 1;
	
	        el.__isHover = false;
	    }
	
	    /**
	     * @inner
	     */
	    function doEnterHover(el) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    doSingleEnterHover(child);
	                }
	            })
	            : doSingleEnterHover(el);
	    }
	    graphic.doEnterHover = doEnterHover;
	    function doLeaveHover(el) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    doSingleLeaveHover(child);
	                }
	            })
	            : doSingleLeaveHover(el);
	    }
	    graphic.doLeaveHover = doLeaveHover;
	    /**
	     * @inner
	     */
	    function setElementHoverStl(el, hoverStl) {
	        // If element has sepcified hoverStyle, then use it instead of given hoverStyle
	        // Often used when item group has a label element and it's hoverStyle is different
	        el.__hoverStl = el.hoverStyle || hoverStl || {};
	        el.__hoverStlDirty = true;
	    }
	    graphic.setElementHoverStl = setElementHoverStl;
	    /**
	     * @inner
	     */
	    function onElementMouseOver() {
	        // Only if element is not in emphasis status
	        !this.__isEmphasis && doEnterHover(this);
	    }
	
	    /**
	     * @inner
	     */
	    function onElementMouseOut() {
	        // Only if element is not in emphasis status
	        !this.__isEmphasis && doLeaveHover(this);
	    }
	
	    /**
	     * @inner
	     */
	    function enterEmphasis() {
	        this.__isEmphasis = true;
	        doEnterHover(this);
	    }
	
	    /**
	     * @inner
	     */
	    function leaveEmphasis() {
	        this.__isEmphasis = false;
	        doLeaveHover(this);
	    }
	
	    /**
	     * Set hover style of element
	     * @param {module:zrender/Element} el
	     * @param {Object} [hoverStyle]
	     */
	    graphic.setHoverStyle = function (el, hoverStyle) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    setElementHoverStl(child, hoverStyle);
	                }
	            })
	            : setElementHoverStl(el, hoverStyle);
	        // Remove previous bound handlers
	        el.on('mouseover', onElementMouseOver)
	          .on('mouseout', onElementMouseOut);
	
	        // Emphasis, normal can be triggered manually
	        el.on('emphasis', enterEmphasis)
	          .on('normal', leaveEmphasis);
	    };
	
	    /**
	     * Set text option in the style
	     * @param {Object} textStyle
	     * @param {module:echarts/model/Model} labelModel
	     * @param {string} color
	     */
	    graphic.setText = function (textStyle, labelModel, color) {
	        var labelPosition = labelModel.getShallow('position') || 'inside';
	        var labelColor = labelPosition.indexOf('inside') >= 0 ? 'white' : color;
	        var textStyleModel = labelModel.getModel('textStyle');
	        zrUtil.extend(textStyle, {
	            textDistance: labelModel.getShallow('distance') || 5,
	            textFont: textStyleModel.getFont(),
	            textPosition: labelPosition,
	            textFill: textStyleModel.getTextColor() || labelColor
	        });
	    };
	
	    function animateOrSetProps(isUpdate, el, props, animatableModel, cb) {
	        var postfix = isUpdate ? 'Update' : '';
	        var duration = animatableModel
	            && animatableModel.getShallow('animationDuration' + postfix);
	        var animationEasing = animatableModel
	            && animatableModel.getShallow('animationEasing' + postfix);
	
	        animatableModel && animatableModel.getShallow('animation')
	            ? el.animateTo(props, duration, animationEasing, cb)
	            : (el.attr(props), cb && cb());
	    }
	    /**
	     * Update graphic element properties with or without animation according to the configuration in series
	     * @param {module:zrender/Element} el
	     * @param {Object} props
	     * @param {module:echarts/model/Model} [animatableModel]
	     * @param {Function} cb
	     */
	    graphic.updateProps = zrUtil.curry(animateOrSetProps, true);
	
	    /**
	     * Init graphic element properties with or without animation according to the configuration in series
	     * @param {module:zrender/Element} el
	     * @param {Object} props
	     * @param {module:echarts/model/Model} [animatableModel]
	     * @param {Function} cb
	     */
	    graphic.initProps = zrUtil.curry(animateOrSetProps, false);
	
	    /**
	     * Get transform matrix of target (param target),
	     * in coordinate of its ancestor (param ancestor)
	     *
	     * @param {module:zrender/mixin/Transformable} target
	     * @param {module:zrender/mixin/Transformable} ancestor
	     */
	    graphic.getTransform = function (target, ancestor) {
	        var mat = matrix.identity([]);
	
	        while (target && target !== ancestor) {
	            matrix.mul(mat, target.getLocalTransform(), mat);
	            target = target.parent;
	        }
	
	        return mat;
	    };
	
	    /**
	     * Apply transform to an vertex.
	     * @param {Array.<number>} vertex [x, y]
	     * @param {Array.<number>} transform Transform matrix: like [1, 0, 0, 1, 0, 0]
	     * @param {boolean=} invert Whether use invert matrix.
	     * @return {Array.<number>} [x, y]
	     */
	    graphic.applyTransform = function (vertex, transform, invert) {
	        if (invert) {
	            transform = matrix.invert([], transform);
	        }
	        return vector.applyTransform([], vertex, transform);
	    };
	
	    /**
	     * @param {string} direction 'left' 'right' 'top' 'bottom'
	     * @param {Array.<number>} transform Transform matrix: like [1, 0, 0, 1, 0, 0]
	     * @param {boolean=} invert Whether use invert matrix.
	     * @return {string} Transformed direction. 'left' 'right' 'top' 'bottom'
	     */
	    graphic.transformDirection = function (direction, transform, invert) {
	
	        // Pick a base, ensure that transform result will not be (0, 0).
	        var hBase = (transform[4] === 0 || transform[5] === 0 || transform[0] === 0)
	            ? 1 : Math.abs(2 * transform[4] / transform[0]);
	        var vBase = (transform[4] === 0 || transform[5] === 0 || transform[2] === 0)
	            ? 1 : Math.abs(2 * transform[4] / transform[2]);
	
	        var vertex = [
	            direction === 'left' ? -hBase : direction === 'right' ? hBase : 0,
	            direction === 'top' ? -vBase : direction === 'bottom' ? vBase : 0
	        ];
	
	        vertex = graphic.applyTransform(vertex, transform, invert);
	
	        return Math.abs(vertex[0]) > Math.abs(vertex[1])
	            ? (vertex[0] > 0 ? 'right' : 'left')
	            : (vertex[1] > 0 ? 'bottom' : 'top');
	    };
	
	    module.exports = graphic;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 */
	
	    var Gradient = __webpack_require__(5);
	    // 用于处理merge时无法遍历Date等对象的问题
	    var BUILTIN_OBJECT = {
	        '[object Function]': 1,
	        '[object RegExp]': 1,
	        '[object Date]': 1,
	        '[object Error]': 1,
	        '[object CanvasGradient]': 1
	    };
	
	    var objToString = Object.prototype.toString;
	
	    var arrayProto = Array.prototype;
	    var nativeForEach = arrayProto.forEach;
	    var nativeFilter = arrayProto.filter;
	    var nativeSlice = arrayProto.slice;
	    var nativeMap = arrayProto.map;
	    var nativeReduce = arrayProto.reduce;
	
	    /**
	     * @param {*} source
	     * @return {*} 拷贝后的新对象
	     */
	    function clone(source) {
	        if (typeof source == 'object' && source !== null) {
	            var result = source;
	            if (source instanceof Array) {
	                result = [];
	                for (var i = 0, len = source.length; i < len; i++) {
	                    result[i] = clone(source[i]);
	                }
	            }
	            else if (
	                !isBuildInObject(source)
	                // 是否为 dom 对象
	                && !isDom(source)
	            ) {
	                result = {};
	                for (var key in source) {
	                    if (source.hasOwnProperty(key)) {
	                        result[key] = clone(source[key]);
	                    }
	                }
	            }
	
	            return result;
	        }
	
	        return source;
	    }
	
	    /**
	     * @param {*} target
	     * @param {*} source
	     * @param {boolean} [overwrite=false]
	     */
	    function merge(target, source, overwrite) {
	        // We should escapse that source is string
	        // and enter for ... in ...
	        if (!isObject(source) || !isObject(target)) {
	            return overwrite ? clone(source) : target;
	        }
	
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                var targetProp = target[key];
	                var sourceProp = source[key];
	
	                if (isObject(sourceProp)
	                    && isObject(targetProp)
	                    && !isArray(sourceProp)
	                    && !isArray(targetProp)
	                    && !isDom(sourceProp)
	                    && !isDom(targetProp)
	                    && !isBuildInObject(sourceProp)
	                    && !isBuildInObject(targetProp)
	                ) {
	                    // 如果需要递归覆盖，就递归调用merge
	                    merge(targetProp, sourceProp, overwrite);
	                }
	                else if (overwrite || !(key in target)) {
	                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
	                    // NOTE，在 target[key] 不存在的时候也是直接覆盖
	                    target[key] = clone(source[key], true);
	                }
	            }
	        }
	
	        return target;
	    }
	
	    /**
	     * @param {Array} targetAndSources The first item is target, and the rests are source.
	     * @param {boolean} [overwrite=false]
	     * @return {*} target
	     */
	    function mergeAll(targetAndSources, overwrite) {
	        var result = targetAndSources[0];
	        for (var i = 1, len = targetAndSources.length; i < len; i++) {
	            result = merge(result, targetAndSources[i], overwrite);
	        }
	        return result;
	    }
	
	    /**
	     * @param {*} target
	     * @param {*} source
	     */
	    function extend(target, source) {
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key];
	            }
	        }
	        return target;
	    }
	
	    /**
	     * @param {*} target
	     * @param {*} source
	     * @param {boolen} [overlay=false]
	     */
	    function defaults(target, source, overlay) {
	        for (var key in source) {
	            if (source.hasOwnProperty(key)
	                && (overlay ? source[key] != null : target[key] == null)
	            ) {
	                target[key] = source[key];
	            }
	        }
	        return target;
	    }
	
	    function createCanvas() {
	        return document.createElement('canvas');
	    }
	    // FIXME
	    var _ctx;
	    function getContext() {
	        if (!_ctx) {
	            // Use util.createCanvas instead of createCanvas
	            // because createCanvas may be overwritten in different environment
	            _ctx = util.createCanvas().getContext('2d');
	        }
	        return _ctx;
	    }
	
	    /**
	     * 查询数组中元素的index
	     */
	    function indexOf(array, value) {
	        if (array) {
	            if (array.indexOf) {
	                return array.indexOf(value);
	            }
	            for (var i = 0, len = array.length; i < len; i++) {
	                if (array[i] === value) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    }
	
	    /**
	     * 构造类继承关系
	     *
	     * @param {Function} clazz 源类
	     * @param {Function} baseClazz 基类
	     */
	    function inherits(clazz, baseClazz) {
	        var clazzPrototype = clazz.prototype;
	        function F() {}
	        F.prototype = baseClazz.prototype;
	        clazz.prototype = new F();
	
	        for (var prop in clazzPrototype) {
	            clazz.prototype[prop] = clazzPrototype[prop];
	        }
	        clazz.prototype.constructor = clazz;
	        clazz.superClass = baseClazz;
	    }
	
	    /**
	     * @param {Object|Function} target
	     * @param {Object|Function} sorce
	     * @param {boolean} overlay
	     */
	    function mixin(target, source, overlay) {
	        target = 'prototype' in target ? target.prototype : target;
	        source = 'prototype' in source ? source.prototype : source;
	
	        defaults(target, source, overlay);
	    }
	
	    /**
	     * @param {Array|TypedArray} data
	     */
	    function isArrayLike(data) {
	        if (! data) {
	            return;
	        }
	        if (typeof data == 'string') {
	            return false;
	        }
	        return typeof data.length == 'number';
	    }
	
	    /**
	     * 数组或对象遍历
	     * @memberOf module:zrender/tool/util
	     * @param {Object|Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     */
	    function each(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.forEach && obj.forEach === nativeForEach) {
	            obj.forEach(cb, context);
	        }
	        else if (obj.length === +obj.length) {
	            for (var i = 0, len = obj.length; i < len; i++) {
	                cb.call(context, obj[i], i, obj);
	            }
	        }
	        else {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    cb.call(context, obj[key], key, obj);
	                }
	            }
	        }
	    }
	
	    /**
	     * 数组映射
	     * @memberOf module:zrender/tool/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function map(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.map && obj.map === nativeMap) {
	            return obj.map(cb, context);
	        }
	        else {
	            var result = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                result.push(cb.call(context, obj[i], i, obj));
	            }
	            return result;
	        }
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {Object} [memo]
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function reduce(obj, cb, memo, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.reduce && obj.reduce === nativeReduce) {
	            return obj.reduce(cb, memo, context);
	        }
	        else {
	            for (var i = 0, len = obj.length; i < len; i++) {
	                memo = cb.call(context, memo, obj[i], i, obj);
	            }
	            return memo;
	        }
	    }
	
	    /**
	     * 数组过滤
	     * @memberOf module:zrender/tool/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function filter(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        if (obj.filter && obj.filter === nativeFilter) {
	            return obj.filter(cb, context);
	        }
	        else {
	            var result = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                if (cb.call(context, obj[i], i, obj)) {
	                    result.push(obj[i]);
	                }
	            }
	            return result;
	        }
	    }
	
	    /**
	     * 数组项查找
	     * @memberOf module:zrender/tool/util
	     * @param {Array} obj
	     * @param {Function} cb
	     * @param {*} [context]
	     * @return {Array}
	     */
	    function find(obj, cb, context) {
	        if (!(obj && cb)) {
	            return;
	        }
	        for (var i = 0, len = obj.length; i < len; i++) {
	            if (cb.call(context, obj[i], i, obj)) {
	                return obj[i];
	            }
	        }
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {Function} func
	     * @param {*} context
	     * @return {Function}
	     */
	    function bind(func, context) {
	        var args = nativeSlice.call(arguments, 2);
	        return function () {
	            return func.apply(context, args.concat(nativeSlice.call(arguments)));
	        };
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {Function} func
	     * @param {...}
	     * @return {Function}
	     */
	    function curry(func) {
	        var args = nativeSlice.call(arguments, 1);
	        return function () {
	            return func.apply(this, args.concat(nativeSlice.call(arguments)));
	        };
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isArray(value) {
	        return objToString.call(value) === '[object Array]';
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isFunction(value) {
	        return typeof value === 'function';
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isString(value) {
	        return objToString.call(value) === '[object String]';
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isObject(value) {
	        // Avoid a V8 JIT bug in Chrome 19-20.
	        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	        var type = typeof value;
	        return type === 'function' || (!!value && type == 'object');
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isBuildInObject(value) {
	        return !!BUILTIN_OBJECT[objToString.call(value)]
	            || (value instanceof Gradient);
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {*} value
	     * @return {boolean}
	     */
	    function isDom(value) {
	        return value && value.nodeType === 1
	               && typeof(value.nodeName) == 'string';
	    }
	
	    /**
	     * If value1 is not null, then return value1, otherwise judget rest of values.
	     * @param  {*...} values
	     * @return {*} Final value
	     */
	    function retrieve(values) {
	        for (var i = 0, len = arguments.length; i < len; i++) {
	            if (arguments[i] != null) {
	                return arguments[i];
	            }
	        }
	    }
	
	    /**
	     * @memberOf module:zrender/tool/util
	     * @param {Array} arr
	     * @param {number} startIndex
	     * @param {number} endIndex
	     * @return {Array}
	     */
	    function slice() {
	        return Function.call.apply(nativeSlice, arguments);
	    }
	
	    /**
	     * @param {boolean} condition
	     * @param {string} message
	     */
	    function assert(condition, message) {
	        if (!condition) {
	            throw new Error(message);
	        }
	    }
	
	    var util = {
	        inherits: inherits,
	        mixin: mixin,
	        clone: clone,
	        merge: merge,
	        mergeAll: mergeAll,
	        extend: extend,
	        defaults: defaults,
	        getContext: getContext,
	        createCanvas: createCanvas,
	        indexOf: indexOf,
	        slice: slice,
	        find: find,
	        isArrayLike: isArrayLike,
	        each: each,
	        map: map,
	        reduce: reduce,
	        filter: filter,
	        bind: bind,
	        curry: curry,
	        isArray: isArray,
	        isString: isString,
	        isObject: isObject,
	        isFunction: isFunction,
	        isBuildInObject: isBuildInObject,
	        isDom: isDom,
	        retrieve: retrieve,
	        assert: assert,
	        noop: function () {}
	    };
	    module.exports = util;
	


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	
	    /**
	     * @param {Array.<Object>} colorStops
	     */
	    var Gradient = function (colorStops) {
	
	        this.colorStops = colorStops || [];
	    };
	
	    Gradient.prototype = {
	
	        constructor: Gradient,
	
	        addColorStop: function (offset, color) {
	            this.colorStops.push({
	
	                offset: offset,
	
	                color: color
	            });
	        }
	    };
	
	    module.exports = Gradient;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var Path = __webpack_require__(7);
	    var PathProxy = __webpack_require__(26);
	    var transformPath = __webpack_require__(36);
	    var matrix = __webpack_require__(14);
	
	    // command chars
	    var cc = [
	        'm', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z',
	        'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'
	    ];
	
	    var mathSqrt = Math.sqrt;
	    var mathSin = Math.sin;
	    var mathCos = Math.cos;
	    var PI = Math.PI;
	
	    var vMag = function(v) {
	        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	    };
	    var vRatio = function(u, v) {
	        return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	    };
	    var vAngle = function(u, v) {
	        return (u[0] * v[1] < u[1] * v[0] ? -1 : 1)
	                * Math.acos(vRatio(u, v));
	    };
	
	    function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
	        var psi = psiDeg * (PI / 180.0);
	        var xp = mathCos(psi) * (x1 - x2) / 2.0
	                 + mathSin(psi) * (y1 - y2) / 2.0;
	        var yp = -1 * mathSin(psi) * (x1 - x2) / 2.0
	                 + mathCos(psi) * (y1 - y2) / 2.0;
	
	        var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
	
	        if (lambda > 1) {
	            rx *= mathSqrt(lambda);
	            ry *= mathSqrt(lambda);
	        }
	
	        var f = (fa === fs ? -1 : 1)
	            * mathSqrt((((rx * rx) * (ry * ry))
	                    - ((rx * rx) * (yp * yp))
	                    - ((ry * ry) * (xp * xp))) / ((rx * rx) * (yp * yp)
	                    + (ry * ry) * (xp * xp))
	                ) || 0;
	
	        var cxp = f * rx * yp / ry;
	        var cyp = f * -ry * xp / rx;
	
	        var cx = (x1 + x2) / 2.0
	                 + mathCos(psi) * cxp
	                 - mathSin(psi) * cyp;
	        var cy = (y1 + y2) / 2.0
	                + mathSin(psi) * cxp
	                + mathCos(psi) * cyp;
	
	        var theta = vAngle([ 1, 0 ], [ (xp - cxp) / rx, (yp - cyp) / ry ]);
	        var u = [ (xp - cxp) / rx, (yp - cyp) / ry ];
	        var v = [ (-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry ];
	        var dTheta = vAngle(u, v);
	
	        if (vRatio(u, v) <= -1) {
	            dTheta = PI;
	        }
	        if (vRatio(u, v) >= 1) {
	            dTheta = 0;
	        }
	        if (fs === 0 && dTheta > 0) {
	            dTheta = dTheta - 2 * PI;
	        }
	        if (fs === 1 && dTheta < 0) {
	            dTheta = dTheta + 2 * PI;
	        }
	
	        path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
	    }
	
	    function createPathProxyFromString(data) {
	        if (!data) {
	            return [];
	        }
	
	        // command string
	        var cs = data.replace(/-/g, ' -')
	            .replace(/  /g, ' ')
	            .replace(/ /g, ',')
	            .replace(/,,/g, ',');
	
	        var n;
	        // create pipes so that we can split the data
	        for (n = 0; n < cc.length; n++) {
	            cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	        }
	
	        // create array
	        var arr = cs.split('|');
	        // init context point
	        var cpx = 0;
	        var cpy = 0;
	
	        var path = new PathProxy();
	        var CMD = PathProxy.CMD;
	
	        var prevCmd;
	        for (n = 1; n < arr.length; n++) {
	            var str = arr[n];
	            var c = str.charAt(0);
	            var off = 0;
	            var p = str.slice(1).replace(/e,-/g, 'e-').split(',');
	            var cmd;
	
	            if (p.length > 0 && p[0] === '') {
	                p.shift();
	            }
	
	            for (var i = 0; i < p.length; i++) {
	                p[i] = parseFloat(p[i]);
	            }
	            while (off < p.length && !isNaN(p[off])) {
	                if (isNaN(p[0])) {
	                    break;
	                }
	                var ctlPtx;
	                var ctlPty;
	
	                var rx;
	                var ry;
	                var psi;
	                var fa;
	                var fs;
	
	                var x1 = cpx;
	                var y1 = cpy;
	
	                // convert l, H, h, V, and v to L
	                switch (c) {
	                    case 'l':
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'L':
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'm':
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        cmd = CMD.M;
	                        path.addData(cmd, cpx, cpy);
	                        c = 'l';
	                        break;
	                    case 'M':
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        cmd = CMD.M;
	                        path.addData(cmd, cpx, cpy);
	                        c = 'L';
	                        break;
	                    case 'h':
	                        cpx += p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'H':
	                        cpx = p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'v':
	                        cpy += p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'V':
	                        cpy = p[off++];
	                        cmd = CMD.L;
	                        path.addData(cmd, cpx, cpy);
	                        break;
	                    case 'C':
	                        cmd = CMD.C;
	                        path.addData(
	                            cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]
	                        );
	                        cpx = p[off - 2];
	                        cpy = p[off - 1];
	                        break;
	                    case 'c':
	                        cmd = CMD.C;
	                        path.addData(
	                            cmd,
	                            p[off++] + cpx, p[off++] + cpy,
	                            p[off++] + cpx, p[off++] + cpy,
	                            p[off++] + cpx, p[off++] + cpy
	                        );
	                        cpx += p[off - 2];
	                        cpy += p[off - 1];
	                        break;
	                    case 'S':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        var len = path.len();
	                        var pathData = path.data;
	                        if (prevCmd === CMD.C) {
	                            ctlPtx += cpx - pathData[len - 4];
	                            ctlPty += cpy - pathData[len - 3];
	                        }
	                        cmd = CMD.C;
	                        x1 = p[off++];
	                        y1 = p[off++];
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
	                        break;
	                    case 's':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        var len = path.len();
	                        var pathData = path.data;
	                        if (prevCmd === CMD.C) {
	                            ctlPtx += cpx - pathData[len - 4];
	                            ctlPty += cpy - pathData[len - 3];
	                        }
	                        cmd = CMD.C;
	                        x1 = cpx + p[off++];
	                        y1 = cpy + p[off++];
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
	                        break;
	                    case 'Q':
	                        x1 = p[off++];
	                        y1 = p[off++];
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        cmd = CMD.Q;
	                        path.addData(cmd, x1, y1, cpx, cpy);
	                        break;
	                    case 'q':
	                        x1 = p[off++] + cpx;
	                        y1 = p[off++] + cpy;
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        cmd = CMD.Q;
	                        path.addData(cmd, x1, y1, cpx, cpy);
	                        break;
	                    case 'T':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        var len = path.len();
	                        var pathData = path.data;
	                        if (prevCmd === CMD.Q) {
	                            ctlPtx += cpx - pathData[len - 4];
	                            ctlPty += cpy - pathData[len - 3];
	                        }
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        cmd = CMD.Q;
	                        path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 't':
	                        ctlPtx = cpx;
	                        ctlPty = cpy;
	                        var len = path.len();
	                        var pathData = path.data;
	                        if (prevCmd === CMD.Q) {
	                            ctlPtx += cpx - pathData[len - 4];
	                            ctlPty += cpy - pathData[len - 3];
	                        }
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        cmd = CMD.Q;
	                        path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
	                        break;
	                    case 'A':
	                        rx = p[off++];
	                        ry = p[off++];
	                        psi = p[off++];
	                        fa = p[off++];
	                        fs = p[off++];
	
	                        x1 = cpx, y1 = cpy;
	                        cpx = p[off++];
	                        cpy = p[off++];
	                        cmd = CMD.A;
	                        processArc(
	                            x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path
	                        );
	                        break;
	                    case 'a':
	                        rx = p[off++];
	                        ry = p[off++];
	                        psi = p[off++];
	                        fa = p[off++];
	                        fs = p[off++];
	
	                        x1 = cpx, y1 = cpy;
	                        cpx += p[off++];
	                        cpy += p[off++];
	                        cmd = CMD.A;
	                        processArc(
	                            x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path
	                        );
	                        break;
	                }
	            }
	
	            if (c === 'z' || c === 'Z') {
	                cmd = CMD.Z;
	                path.addData(cmd);
	            }
	
	            prevCmd = cmd;
	        }
	
	        path.toStatic();
	
	        return path;
	    }
	
	    // TODO Optimize double memory cost problem
	    function createPathOptions(str, opts) {
	        var pathProxy = createPathProxyFromString(str);
	        var transform;
	        opts = opts || {};
	        opts.buildPath = function (path) {
	            path.setData(pathProxy.data);
	            transform && transformPath(path, transform);
	            // Svg and vml renderer don't have context
	            var ctx = path.getContext();
	            if (ctx) {
	                path.rebuildPath(ctx);
	            }
	        };
	
	        opts.applyTransform = function (m) {
	            if (!transform) {
	                transform = matrix.create();
	            }
	            matrix.mul(transform, m, transform);
	        };
	
	        return opts;
	    }
	
	    module.exports = {
	        /**
	         * Create a Path object from path string data
	         * http://www.w3.org/TR/SVG/paths.html#PathData
	         * @param  {Object} opts Other options
	         */
	        createFromString: function (str, opts) {
	            return new Path(createPathOptions(str, opts));
	        },
	
	        /**
	         * Create a Path class from path string data
	         * @param  {string} str
	         * @param  {Object} opts Other options
	         */
	        extendFromString: function (str, opts) {
	            return Path.extend(createPathOptions(str, opts));
	        },
	
	        /**
	         * Merge multiple paths
	         */
	        // TODO Apply transform
	        // TODO stroke dash
	        // TODO Optimize double memory cost problem
	        mergePath: function (pathEls, opts) {
	            var pathList = [];
	            var len = pathEls.length;
	            var pathEl;
	            var i;
	            for (i = 0; i < len; i++) {
	                pathEl = pathEls[i];
	                if (pathEl.__dirty) {
	                    pathEl.buildPath(pathEl.path, pathEl.shape);
	                }
	                pathList.push(pathEl.path);
	            }
	
	            var pathBundle = new Path(opts);
	            pathBundle.buildPath = function (path) {
	                path.appendPath(pathList);
	                // Svg and vml renderer don't have context
	                var ctx = path.getContext();
	                if (ctx) {
	                    path.rebuildPath(ctx);
	                }
	            };
	
	            return pathBundle;
	        }
	    };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Path element
	 * @module zrender/graphic/Path
	 */
	
	
	
	    var Displayable = __webpack_require__(8);
	    var zrUtil = __webpack_require__(4);
	    var PathProxy = __webpack_require__(26);
	    var pathContain = __webpack_require__(29);
	
	    var Gradient = __webpack_require__(5);
	
	    function pathHasFill(style) {
	        var fill = style.fill;
	        return fill != null && fill !== 'none';
	    }
	
	    function pathHasStroke(style) {
	        var stroke = style.stroke;
	        return stroke != null && stroke !== 'none' && style.lineWidth > 0;
	    }
	
	    var abs = Math.abs;
	
	    /**
	     * @alias module:zrender/graphic/Path
	     * @extends module:zrender/graphic/Displayable
	     * @constructor
	     * @param {Object} opts
	     */
	    function Path(opts) {
	        Displayable.call(this, opts);
	
	        /**
	         * @type {module:zrender/core/PathProxy}
	         * @readOnly
	         */
	        this.path = new PathProxy();
	    }
	
	    Path.prototype = {
	
	        constructor: Path,
	
	        type: 'path',
	
	        __dirtyPath: true,
	
	        strokeContainThreshold: 5,
	
	        brush: function (ctx) {
	            ctx.save();
	
	            var style = this.style;
	            var path = this.path;
	            var hasStroke = pathHasStroke(style);
	            var hasFill = pathHasFill(style);
	
	            if (this.__dirtyPath) {
	                // Update gradient because bounding rect may changed
	                if (hasFill && (style.fill instanceof Gradient)) {
	                    style.fill.updateCanvasGradient(this, ctx);
	                }
	                if (hasStroke && (style.stroke instanceof Gradient)) {
	                    style.stroke.updateCanvasGradient(this, ctx);
	                }
	            }
	
	            style.bind(ctx, this);
	            this.setTransform(ctx);
	
	            var lineDash = style.lineDash;
	            var lineDashOffset = style.lineDashOffset;
	
	            var ctxLineDash = !!ctx.setLineDash;
	
	            // Proxy context
	            // Rebuild path in following 2 cases
	            // 1. Path is dirty
	            // 2. Path needs javascript implemented lineDash stroking.
	            //    In this case, lineDash information will not be saved in PathProxy
	            if (this.__dirtyPath || (
	                lineDash && !ctxLineDash && hasStroke
	            )) {
	                path = this.path.beginPath(ctx);
	
	                // Setting line dash before build path
	                if (lineDash && !ctxLineDash) {
	                    path.setLineDash(lineDash);
	                    path.setLineDashOffset(lineDashOffset);
	                }
	
	                this.buildPath(path, this.shape);
	
	                // Clear path dirty flag
	                this.__dirtyPath = false;
	            }
	            else {
	                // Replay path building
	                ctx.beginPath();
	                this.path.rebuildPath(ctx);
	            }
	
	            hasFill && path.fill(ctx);
	
	            if (lineDash && ctxLineDash) {
	                ctx.setLineDash(lineDash);
	                ctx.lineDashOffset = lineDashOffset;
	            }
	
	            hasStroke && path.stroke(ctx);
	
	            // Draw rect text
	            if (style.text != null) {
	                // var rect = this.getBoundingRect();
	                this.drawRectText(ctx, this.getBoundingRect());
	            }
	
	            ctx.restore();
	        },
	
	        buildPath: function (ctx, shapeCfg) {},
	
	        getBoundingRect: function () {
	            var rect = this._rect;
	            var style = this.style;
	            if (!rect) {
	                var path = this.path;
	                if (this.__dirtyPath) {
	                    path.beginPath();
	                    this.buildPath(path, this.shape);
	                }
	                rect = path.getBoundingRect();
	            }
	            /**
	             * Needs update rect with stroke lineWidth when
	             * 1. Element changes scale or lineWidth
	             * 2. First create rect
	             */
	            if (pathHasStroke(style) && (this.__dirty || !this._rect)) {
	                var rectWithStroke = this._rectWithStroke
	                    || (this._rectWithStroke = rect.clone());
	                rectWithStroke.copy(rect);
	                // FIXME Must after updateTransform
	                var w = style.lineWidth;
	                // PENDING, Min line width is needed when line is horizontal or vertical
	                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
	
	                // Only add extra hover lineWidth when there are no fill
	                if (!pathHasFill(style)) {
	                    w = Math.max(w, this.strokeContainThreshold);
	                }
	                // Consider line width
	                // Line scale can't be 0;
	                if (lineScale > 1e-10) {
	                    rectWithStroke.width += w / lineScale;
	                    rectWithStroke.height += w / lineScale;
	                    rectWithStroke.x -= w / lineScale / 2;
	                    rectWithStroke.y -= w / lineScale / 2;
	                }
	                return rectWithStroke;
	            }
	            this._rect = rect;
	            return rect;
	        },
	
	        contain: function (x, y) {
	            var localPos = this.transformCoordToLocal(x, y);
	            var rect = this.getBoundingRect();
	            var style = this.style;
	            x = localPos[0];
	            y = localPos[1];
	
	            if (rect.contain(x, y)) {
	                var pathData = this.path.data;
	                if (pathHasStroke(style)) {
	                    var lineWidth = style.lineWidth;
	                    var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
	                    // Line scale can't be 0;
	                    if (lineScale > 1e-10) {
	                        // Only add extra hover lineWidth when there are no fill
	                        if (!pathHasFill(style)) {
	                            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
	                        }
	                        if (pathContain.containStroke(
	                            pathData, lineWidth / lineScale, x, y
	                        )) {
	                            return true;
	                        }
	                    }
	                }
	                if (pathHasFill(style)) {
	                    return pathContain.contain(pathData, x, y);
	                }
	            }
	            return false;
	        },
	
	        /**
	         * @param  {boolean} dirtyPath
	         */
	        dirty: function (dirtyPath) {
	            if (arguments.length ===0) {
	                dirtyPath = true;
	            }
	            // Only mark dirty, not mark clean
	            if (dirtyPath) {
	                this.__dirtyPath = dirtyPath;
	                this._rect = null;
	            }
	
	            this.__dirty = true;
	
	            this.__zr && this.__zr.refresh();
	
	            // Used as a clipping path
	            if (this.__clipTarget) {
	                this.__clipTarget.dirty();
	            }
	        },
	
	        /**
	         * Alias for animate('shape')
	         * @param {boolean} loop
	         */
	        animateShape: function (loop) {
	            return this.animate('shape', loop);
	        },
	
	        // Overwrite attrKV
	        attrKV: function (key, value) {
	            // FIXME
	            if (key === 'shape') {
	                this.setShape(value);
	            }
	            else {
	                Displayable.prototype.attrKV.call(this, key, value);
	            }
	        },
	        /**
	         * @param {Object|string} key
	         * @param {*} value
	         */
	        setShape: function (key, value) {
	            var shape = this.shape;
	            // Path from string may not have shape
	            if (shape) {
	                if (zrUtil.isObject(key)) {
	                    for (var name in key) {
	                        shape[name] = key[name];
	                    }
	                }
	                else {
	                    shape[key] = value;
	                }
	                this.dirty(true);
	            }
	            return this;
	        },
	
	        getLineScale: function () {
	            var m = this.transform;
	            // Get the line scale.
	            // Determinant of `m` means how much the area is enlarged by the
	            // transformation. So its square root can be used as a scale factor
	            // for width.
	            return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10
	                ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1]))
	                : 1;
	        }
	    };
	
	    /**
	     * 扩展一个 Path element, 比如星形，圆等。
	     * Extend a path element
	     * @param {Object} props
	     * @param {string} props.type Path type
	     * @param {Function} props.init Initialize
	     * @param {Function} props.buildPath Overwrite buildPath method
	     * @param {Object} [props.style] Extended default style config
	     * @param {Object} [props.shape] Extended default shape config
	     */
	    Path.extend = function (defaults) {
	        var Sub = function (opts) {
	            Path.call(this, opts);
	
	            if (defaults.style) {
	                // Extend default style
	                this.style.extendFrom(defaults.style, false);
	            }
	
	            // Extend default shape
	            var defaultShape = defaults.shape;
	            if (defaultShape) {
	                this.shape = this.shape || {};
	                var thisShape = this.shape;
	                for (var name in defaultShape) {
	                    if (
	                        ! thisShape.hasOwnProperty(name)
	                        && defaultShape.hasOwnProperty(name)
	                    ) {
	                        thisShape[name] = defaultShape[name];
	                    }
	                }
	            }
	
	            defaults.init && defaults.init.call(this, opts);
	        };
	
	        zrUtil.inherits(Sub, Path);
	
	        // FIXME 不能 extend position, rotation 等引用对象
	        for (var name in defaults) {
	            // Extending prototype values and methods
	            if (name !== 'style' && name !== 'shape') {
	                Sub.prototype[name] = defaults[name];
	            }
	        }
	
	        return Sub;
	    };
	
	    zrUtil.inherits(Path, Displayable);
	
	    module.exports = Path;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 可绘制的图形基类
	 * Base class of all displayable graphic objects
	 * @module zrender/graphic/Displayable
	 */
	
	
	
	    var zrUtil = __webpack_require__(4);
	
	    var Style = __webpack_require__(9);
	
	    var Element = __webpack_require__(10);
	    var RectText = __webpack_require__(23);
	    // var Stateful = require('./mixin/Stateful');
	
	    /**
	     * @alias module:zrender/graphic/Displayable
	     * @extends module:zrender/Element
	     * @extends module:zrender/graphic/mixin/RectText
	     */
	    function Displayable(opts) {
	
	        opts = opts || {};
	
	        Element.call(this, opts);
	
	        // Extend properties
	        for (var name in opts) {
	            if (
	                opts.hasOwnProperty(name) &&
	                name !== 'style'
	            ) {
	                this[name] = opts[name];
	            }
	        }
	
	        /**
	         * @type {module:zrender/graphic/Style}
	         */
	        this.style = new Style(opts.style);
	
	        this._rect = null;
	        // Shapes for cascade clipping.
	        this.__clipPaths = [];
	
	        // FIXME Stateful must be mixined after style is setted
	        // Stateful.call(this, opts);
	    }
	
	    Displayable.prototype = {
	
	        constructor: Displayable,
	
	        type: 'displayable',
	
	        /**
	         * Displayable 是否为脏，Painter 中会根据该标记判断是否需要是否需要重新绘制
	         * Dirty flag. From which painter will determine if this displayable object needs brush
	         * @name module:zrender/graphic/Displayable#__dirty
	         * @type {boolean}
	         */
	        __dirty: true,
	
	        /**
	         * 图形是否可见，为true时不绘制图形，但是仍能触发鼠标事件
	         * If ignore drawing of the displayable object. Mouse event will still be triggered
	         * @name module:/zrender/graphic/Displayable#invisible
	         * @type {boolean}
	         * @default false
	         */
	        invisible: false,
	
	        /**
	         * @name module:/zrender/graphic/Displayable#z
	         * @type {number}
	         * @default 0
	         */
	        z: 0,
	
	        /**
	         * @name module:/zrender/graphic/Displayable#z
	         * @type {number}
	         * @default 0
	         */
	        z2: 0,
	
	        /**
	         * z层level，决定绘画在哪层canvas中
	         * @name module:/zrender/graphic/Displayable#zlevel
	         * @type {number}
	         * @default 0
	         */
	        zlevel: 0,
	
	        /**
	         * 是否可拖拽
	         * @name module:/zrender/graphic/Displayable#draggable
	         * @type {boolean}
	         * @default false
	         */
	        draggable: false,
	
	        /**
	         * 是否正在拖拽
	         * @name module:/zrender/graphic/Displayable#draggable
	         * @type {boolean}
	         * @default false
	         */
	        dragging: false,
	
	        /**
	         * 是否相应鼠标事件
	         * @name module:/zrender/graphic/Displayable#silent
	         * @type {boolean}
	         * @default false
	         */
	        silent: false,
	
	        /**
	         * If enable culling
	         * @type {boolean}
	         * @default false
	         */
	        culling: false,
	
	        /**
	         * Mouse cursor when hovered
	         * @name module:/zrender/graphic/Displayable#cursor
	         * @type {string}
	         */
	        cursor: 'pointer',
	
	        /**
	         * If hover area is bounding rect
	         * @name module:/zrender/graphic/Displayable#rectHover
	         * @type {string}
	         */
	        rectHover: false,
	
	        beforeBrush: function (ctx) {},
	
	        afterBrush: function (ctx) {},
	
	        /**
	         * 图形绘制方法
	         * @param {Canvas2DRenderingContext} ctx
	         */
	        // Interface
	        brush: function (ctx) {},
	
	        /**
	         * 获取最小包围盒
	         * @return {module:zrender/core/BoundingRect}
	         */
	        // Interface
	        getBoundingRect: function () {},
	
	        /**
	         * 判断坐标 x, y 是否在图形上
	         * If displayable element contain coord x, y
	         * @param  {number} x
	         * @param  {number} y
	         * @return {boolean}
	         */
	        contain: function (x, y) {
	            return this.rectContain(x, y);
	        },
	
	        /**
	         * @param  {Function} cb
	         * @param  {}   context
	         */
	        traverse: function (cb, context) {
	            cb.call(context, this);
	        },
	
	        /**
	         * 判断坐标 x, y 是否在图形的包围盒上
	         * If bounding rect of element contain coord x, y
	         * @param  {number} x
	         * @param  {number} y
	         * @return {boolean}
	         */
	        rectContain: function (x, y) {
	            var coord = this.transformCoordToLocal(x, y);
	            var rect = this.getBoundingRect();
	            return rect.contain(coord[0], coord[1]);
	        },
	
	        /**
	         * 标记图形元素为脏，并且在下一帧重绘
	         * Mark displayable element dirty and refresh next frame
	         */
	        dirty: function () {
	            this.__dirty = true;
	
	            this._rect = null;
	
	            this.__zr && this.__zr.refresh();
	        },
	
	        /**
	         * 图形是否会触发事件
	         * If displayable object binded any event
	         * @return {boolean}
	         */
	        // TODO, 通过 bind 绑定的事件
	        // isSilent: function () {
	        //     return !(
	        //         this.hoverable || this.draggable
	        //         || this.onmousemove || this.onmouseover || this.onmouseout
	        //         || this.onmousedown || this.onmouseup || this.onclick
	        //         || this.ondragenter || this.ondragover || this.ondragleave
	        //         || this.ondrop
	        //     );
	        // },
	        /**
	         * Alias for animate('style')
	         * @param {boolean} loop
	         */
	        animateStyle: function (loop) {
	            return this.animate('style', loop);
	        },
	
	        attrKV: function (key, value) {
	            if (key !== 'style') {
	                Element.prototype.attrKV.call(this, key, value);
	            }
	            else {
	                this.style.set(value);
	            }
	        },
	
	        /**
	         * @param {Object|string} key
	         * @param {*} value
	         */
	        setStyle: function (key, value) {
	            this.style.set(key, value);
	            this.dirty();
	            return this;
	        }
	    };
	
	    zrUtil.inherits(Displayable, Element);
	
	    zrUtil.mixin(Displayable, RectText);
	    // zrUtil.mixin(Displayable, Stateful);
	
	    module.exports = Displayable;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * @module zrender/graphic/Style
	 */
	
	
	
	    var STYLE_LIST_COMMON = [
	        'lineCap', 'lineJoin', 'miterLimit',
	        'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowColor'
	    ];
	
	    var Style = function (opts) {
	        this.extendFrom(opts);
	    };
	
	    Style.prototype = {
	
	        constructor: Style,
	
	        /**
	         * @type {string}
	         */
	        fill: '#000000',
	
	        /**
	         * @type {string}
	         */
	        stroke: null,
	
	        /**
	         * @type {number}
	         */
	        opacity: 1,
	
	        /**
	         * @type {Array.<number>}
	         */
	        lineDash: null,
	
	        /**
	         * @type {number}
	         */
	        lineDashOffset: 0,
	
	        /**
	         * @type {number}
	         */
	        shadowBlur: 0,
	
	        /**
	         * @type {number}
	         */
	        shadowOffsetX: 0,
	
	        /**
	         * @type {number}
	         */
	        shadowOffsetY: 0,
	
	        /**
	         * @type {number}
	         */
	        lineWidth: 1,
	
	        /**
	         * If stroke ignore scale
	         * @type {Boolean}
	         */
	        strokeNoScale: false,
	
	        // Bounding rect text configuration
	        // Not affected by element transform
	        /**
	         * @type {string}
	         */
	        text: null,
	
	        /**
	         * @type {string}
	         */
	        textFill: '#000',
	
	        /**
	         * @type {string}
	         */
	        textStroke: null,
	
	        /**
	         * 'inside', 'left', 'right', 'top', 'bottom'
	         * [x, y]
	         * @type {string|Array.<number>}
	         * @default 'inside'
	         */
	        textPosition: 'inside',
	
	        /**
	         * @type {string}
	         */
	        textBaseline: null,
	
	        /**
	         * @type {string}
	         */
	        textAlign: null,
	
	        /**
	         * @type {string}
	         */
	        textVerticalAlign: null,
	
	        /**
	         * @type {number}
	         */
	        textDistance: 5,
	
	        /**
	         * @type {number}
	         */
	        textShadowBlur: 0,
	
	        /**
	         * @type {number}
	         */
	        textShadowOffsetX: 0,
	
	        /**
	         * @type {number}
	         */
	        textShadowOffsetY: 0,
	
	        /**
	         * @param {CanvasRenderingContext2D} ctx
	         */
	        bind: function (ctx, el) {
	            var fill = this.fill;
	            var stroke = this.stroke;
	            for (var i = 0; i < STYLE_LIST_COMMON.length; i++) {
	                var styleName = STYLE_LIST_COMMON[i];
	
	                if (this[styleName] != null) {
	                    ctx[styleName] = this[styleName];
	                }
	            }
	            if (stroke != null) {
	                var lineWidth = this.lineWidth;
	                ctx.lineWidth = lineWidth / (
	                    (this.strokeNoScale && el && el.getLineScale) ? el.getLineScale() : 1
	                );
	            }
	            if (fill != null) {
	                 // Use canvas gradient if has
	                ctx.fillStyle = fill.canvasGradient ? fill.canvasGradient : fill;
	            }
	            if (stroke != null) {
	                 // Use canvas gradient if has
	                ctx.strokeStyle = stroke.canvasGradient ? stroke.canvasGradient : stroke;
	            }
	            this.opacity != null && (ctx.globalAlpha = this.opacity);
	        },
	
	        /**
	         * Extend from other style
	         * @param {zrender/graphic/Style} otherStyle
	         * @param {boolean} overwrite
	         */
	        extendFrom: function (otherStyle, overwrite) {
	            if (otherStyle) {
	                var target = this;
	                for (var name in otherStyle) {
	                    if (otherStyle.hasOwnProperty(name)
	                        && (overwrite || ! target.hasOwnProperty(name))
	                    ) {
	                        target[name] = otherStyle[name];
	                    }
	                }
	            }
	        },
	
	        /**
	         * Batch setting style with a given object
	         * @param {Object|string} obj
	         * @param {*} [obj]
	         */
	        set: function (obj, value) {
	            if (typeof obj === 'string') {
	                this[obj] = value;
	            }
	            else {
	                this.extendFrom(obj, true);
	            }
	        },
	
	        /**
	         * Clone
	         * @return {zrender/graphic/Style} [description]
	         */
	        clone: function () {
	            var newStyle = new this.constructor();
	            newStyle.extendFrom(this, true);
	            return newStyle;
	        }
	    };
	
	    var styleProto = Style.prototype;
	    var name;
	    var i;
	    for (i = 0; i < STYLE_LIST_COMMON.length; i++) {
	        name = STYLE_LIST_COMMON[i];
	        if (!(name in styleProto)) {
	            styleProto[name] = null;
	        }
	    }
	
	    module.exports = Style;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module zrender/Element
	 */
	
	
	    var guid = __webpack_require__(11);
	    var Eventful = __webpack_require__(12);
	    var Transformable = __webpack_require__(13);
	    var Animatable = __webpack_require__(16);
	    var zrUtil = __webpack_require__(4);
	
	    /**
	     * @alias module:zrender/Element
	     * @constructor
	     * @extends {module:zrender/mixin/Animatable}
	     * @extends {module:zrender/mixin/Transformable}
	     * @extends {module:zrender/mixin/Eventful}
	     */
	    var Element = function (opts) {
	
	        Transformable.call(this, opts);
	        Eventful.call(this, opts);
	        Animatable.call(this, opts);
	
	        /**
	         * 画布元素ID
	         * @type {string}
	         */
	        this.id = opts.id || guid();
	    };
	
	    Element.prototype = {
	
	        /**
	         * 元素类型
	         * Element type
	         * @type {string}
	         */
	        type: 'element',
	
	        /**
	         * 元素名字
	         * Element name
	         * @type {string}
	         */
	        name: '',
	
	        /**
	         * ZRender 实例对象，会在 element 添加到 zrender 实例中后自动赋值
	         * ZRender instance will be assigned when element is associated with zrender
	         * @name module:/zrender/Element#__zr
	         * @type {module:zrender/ZRender}
	         */
	        __zr: null,
	
	        /**
	         * 图形是否忽略，为true时忽略图形的绘制以及事件触发
	         * If ignore drawing and events of the element object
	         * @name module:/zrender/Element#ignore
	         * @type {boolean}
	         * @default false
	         */
	        ignore: false,
	
	        /**
	         * 用于裁剪的路径(shape)，所有 Group 内的路径在绘制时都会被这个路径裁剪
	         * 该路径会继承被裁减对象的变换
	         * @type {module:zrender/graphic/Path}
	         * @see http://www.w3.org/TR/2dcontext/#clipping-region
	         * @readOnly
	         */
	        clipPath: null,
	
	        /**
	         * Drift element
	         * @param  {number} dx dx on the global space
	         * @param  {number} dy dy on the global space
	         */
	        drift: function (dx, dy) {
	            switch (this.draggable) {
	                case 'horizontal':
	                    dy = 0;
	                    break;
	                case 'vertical':
	                    dx = 0;
	                    break;
	            }
	
	            var m = this.transform;
	            if (!m) {
	                m = this.transform = [1, 0, 0, 1, 0, 0];
	            }
	            m[4] += dx;
	            m[5] += dy;
	
	            this.decomposeTransform();
	            this.dirty();
	        },
	
	        /**
	         * Hook before update
	         */
	        beforeUpdate: function () {},
	        /**
	         * Hook after update
	         */
	        afterUpdate: function () {},
	        /**
	         * Update each frame
	         */
	        update: function () {
	            this.updateTransform();
	        },
	
	        /**
	         * @param  {Function} cb
	         * @param  {}   context
	         */
	        traverse: function (cb, context) {},
	
	        /**
	         * @protected
	         */
	        attrKV: function (key, value) {
	            if (key === 'position' || key === 'scale' || key === 'origin') {
	                // Copy the array
	                if (value) {
	                    var target = this[key];
	                    if (!target) {
	                        target = this[key] = [];
	                    }
	                    target[0] = value[0];
	                    target[1] = value[1];
	                }
	            }
	            else {
	                this[key] = value;
	            }
	        },
	
	        /**
	         * Hide the element
	         */
	        hide: function () {
	            this.ignore = true;
	            this.__zr && this.__zr.refresh();
	        },
	
	        /**
	         * Show the element
	         */
	        show: function () {
	            this.ignore = false;
	            this.__zr && this.__zr.refresh();
	        },
	
	        /**
	         * @param {string|Object} key
	         * @param {*} value
	         */
	        attr: function (key, value) {
	            if (typeof key === 'string') {
	                this.attrKV(key, value);
	            }
	            else if (zrUtil.isObject(key)) {
	                for (var name in key) {
	                    if (key.hasOwnProperty(name)) {
	                        this.attrKV(name, key[name]);
	                    }
	                }
	            }
	            this.dirty();
	
	            return this;
	        },
	
	        /**
	         * @param {module:zrender/graphic/Path} clipPath
	         */
	        setClipPath: function (clipPath) {
	            var zr = this.__zr;
	            if (zr) {
	                clipPath.addSelfToZr(zr);
	            }
	
	            // Remove previous clip path
	            if (this.clipPath && this.clipPath !== clipPath) {
	                this.removeClipPath();
	            }
	
	            this.clipPath = clipPath;
	            clipPath.__zr = zr;
	            clipPath.__clipTarget = this;
	
	            this.dirty();
	        },
	
	        /**
	         */
	        removeClipPath: function () {
	            var clipPath = this.clipPath;
	            if (clipPath) {
	                if (clipPath.__zr) {
	                    clipPath.removeSelfFromZr(clipPath.__zr);
	                }
	
	                clipPath.__zr = null;
	                clipPath.__clipTarget = null;
	                this.clipPath = null;
	
	                this.dirty();
	            }
	        },
	
	        /**
	         * Add self from zrender instance.
	         * Not recursively because it will be invoked when element added to storage.
	         * @param {module:zrender/ZRender} zr
	         */
	        addSelfToZr: function (zr) {
	            this.__zr = zr;
	            // 添加动画
	            var animators = this.animators;
	            if (animators) {
	                for (var i = 0; i < animators.length; i++) {
	                    zr.animation.addAnimator(animators[i]);
	                }
	            }
	
	            if (this.clipPath) {
	                this.clipPath.addSelfToZr(zr);
	            }
	        },
	
	        /**
	         * Remove self from zrender instance.
	         * Not recursively because it will be invoked when element added to storage.
	         * @param {module:zrender/ZRender} zr
	         */
	        removeSelfFromZr: function (zr) {
	            this.__zr = null;
	            // 移除动画
	            var animators = this.animators;
	            if (animators) {
	                for (var i = 0; i < animators.length; i++) {
	                    zr.animation.removeAnimator(animators[i]);
	                }
	            }
	
	            if (this.clipPath) {
	                this.clipPath.removeSelfFromZr(zr);
	            }
	        }
	    };
	
	    zrUtil.mixin(Element, Animatable);
	    zrUtil.mixin(Element, Transformable);
	    zrUtil.mixin(Element, Eventful);
	
	    module.exports = Element;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * zrender: 生成唯一id
	 *
	 * @author errorrik (errorrik@gmail.com)
	 */
	
	
	        var idStart = 0x0907;
	
	        module.exports = function () {
	            return 'zr_' + (idStart++);
	        };
	    


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 事件扩展
	 * @module zrender/mixin/Eventful
	 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 *         pissang (https://www.github.com/pissang)
	 */
	
	
	    var arrySlice = Array.prototype.slice;
	    var zrUtil = __webpack_require__(4);
	    var indexOf = zrUtil.indexOf;
	
	    /**
	     * 事件分发器
	     * @alias module:zrender/mixin/Eventful
	     * @constructor
	     */
	    var Eventful = function () {
	        this._$handlers = {};
	    };
	
	    Eventful.prototype = {
	
	        constructor: Eventful,
	
	        /**
	         * 单次触发绑定，trigger后销毁
	         *
	         * @param {string} event 事件名
	         * @param {Function} handler 响应函数
	         * @param {Object} context
	         */
	        one: function (event, handler, context) {
	            var _h = this._$handlers;
	
	            if (!handler || !event) {
	                return this;
	            }
	
	            if (!_h[event]) {
	                _h[event] = [];
	            }
	
	            if (indexOf(_h[event], event) >= 0) {
	                return this;
	            }
	
	            _h[event].push({
	                h: handler,
	                one: true,
	                ctx: context || this
	            });
	
	            return this;
	        },
	
	        /**
	         * 绑定事件
	         * @param {string} event 事件名
	         * @param {Function} handler 事件处理函数
	         * @param {Object} [context]
	         */
	        on: function (event, handler, context) {
	            var _h = this._$handlers;
	
	            if (!handler || !event) {
	                return this;
	            }
	
	            if (!_h[event]) {
	                _h[event] = [];
	            }
	
	            _h[event].push({
	                h: handler,
	                one: false,
	                ctx: context || this
	            });
	
	            return this;
	        },
	
	        /**
	         * 是否绑定了事件
	         * @param  {string}  event
	         * @return {boolean}
	         */
	        isSilent: function (event) {
	            var _h = this._$handlers;
	            return _h[event] && _h[event].length;
	        },
	
	        /**
	         * 解绑事件
	         * @param {string} event 事件名
	         * @param {Function} [handler] 事件处理函数
	         */
	        off: function (event, handler) {
	            var _h = this._$handlers;
	
	            if (!event) {
	                this._$handlers = {};
	                return this;
	            }
	
	            if (handler) {
	                if (_h[event]) {
	                    var newList = [];
	                    for (var i = 0, l = _h[event].length; i < l; i++) {
	                        if (_h[event][i]['h'] != handler) {
	                            newList.push(_h[event][i]);
	                        }
	                    }
	                    _h[event] = newList;
	                }
	
	                if (_h[event] && _h[event].length === 0) {
	                    delete _h[event];
	                }
	            }
	            else {
	                delete _h[event];
	            }
	
	            return this;
	        },
	
	        /**
	         * 事件分发
	         *
	         * @param {string} type 事件类型
	         */
	        trigger: function (type) {
	            if (this._$handlers[type]) {
	                var args = arguments;
	                var argLen = args.length;
	
	                if (argLen > 3) {
	                    args = arrySlice.call(args, 1);
	                }
	
	                var _h = this._$handlers[type];
	                var len = _h.length;
	                for (var i = 0; i < len;) {
	                    // Optimize advise from backbone
	                    switch (argLen) {
	                        case 1:
	                            _h[i]['h'].call(_h[i]['ctx']);
	                            break;
	                        case 2:
	                            _h[i]['h'].call(_h[i]['ctx'], args[1]);
	                            break;
	                        case 3:
	                            _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
	                            break;
	                        default:
	                            // have more than 2 given arguments
	                            _h[i]['h'].apply(_h[i]['ctx'], args);
	                            break;
	                    }
	
	                    if (_h[i]['one']) {
	                        _h.splice(i, 1);
	                        len--;
	                    }
	                    else {
	                        i++;
	                    }
	                }
	            }
	
	            return this;
	        },
	
	        /**
	         * 带有context的事件分发, 最后一个参数是事件回调的context
	         * @param {string} type 事件类型
	         */
	        triggerWithContext: function (type) {
	            if (this._$handlers[type]) {
	                var args = arguments;
	                var argLen = args.length;
	
	                if (argLen > 4) {
	                    args = arrySlice.call(args, 1, args.length - 1);
	                }
	                var ctx = args[args.length - 1];
	
	                var _h = this._$handlers[type];
	                var len = _h.length;
	                for (var i = 0; i < len;) {
	                    // Optimize advise from backbone
	                    switch (argLen) {
	                        case 1:
	                            _h[i]['h'].call(ctx);
	                            break;
	                        case 2:
	                            _h[i]['h'].call(ctx, args[1]);
	                            break;
	                        case 3:
	                            _h[i]['h'].call(ctx, args[1], args[2]);
	                            break;
	                        default:
	                            // have more than 2 given arguments
	                            _h[i]['h'].apply(ctx, args);
	                            break;
	                    }
	
	                    if (_h[i]['one']) {
	                        _h.splice(i, 1);
	                        len--;
	                    }
	                    else {
	                        i++;
	                    }
	                }
	            }
	
	            return this;
	        }
	    };
	
	    // 对象可以通过 onxxxx 绑定事件
	    /**
	     * @event module:zrender/mixin/Eventful#onclick
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmouseover
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmouseout
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmousemove
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmousewheel
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmousedown
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#onmouseup
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondragstart
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondragend
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondragenter
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondragleave
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondragover
	     * @type {Function}
	     * @default null
	     */
	    /**
	     * @event module:zrender/mixin/Eventful#ondrop
	     * @type {Function}
	     * @default null
	     */
	
	    module.exports = Eventful;
	


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 提供变换扩展
	 * @module zrender/mixin/Transformable
	 * @author pissang (https://www.github.com/pissang)
	 */
	
	
	    var matrix = __webpack_require__(14);
	    var vector = __webpack_require__(15);
	    var mIdentity = matrix.identity;
	
	    var EPSILON = 5e-5;
	
	    function isNotAroundZero(val) {
	        return val > EPSILON || val < -EPSILON;
	    }
	
	    /**
	     * @alias module:zrender/mixin/Transformable
	     * @constructor
	     */
	    var Transformable = function (opts) {
	        opts = opts || {};
	        // If there are no given position, rotation, scale
	        if (!opts.position) {
	            /**
	             * 平移
	             * @type {Array.<number>}
	             * @default [0, 0]
	             */
	            this.position = [0, 0];
	        }
	        if (opts.rotation == null) {
	            /**
	             * 旋转
	             * @type {Array.<number>}
	             * @default 0
	             */
	            this.rotation = 0;
	        }
	        if (!opts.scale) {
	            /**
	             * 缩放
	             * @type {Array.<number>}
	             * @default [1, 1]
	             */
	            this.scale = [1, 1];
	        }
	        /**
	         * 旋转和缩放的原点
	         * @type {Array.<number>}
	         * @default null
	         */
	        this.origin = this.origin || null;
	    };
	
	    var transformableProto = Transformable.prototype;
	    transformableProto.transform = null;
	
	    /**
	     * 判断是否需要有坐标变换
	     * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
	     */
	    transformableProto.needLocalTransform = function () {
	        return isNotAroundZero(this.rotation)
	            || isNotAroundZero(this.position[0])
	            || isNotAroundZero(this.position[1])
	            || isNotAroundZero(this.scale[0] - 1)
	            || isNotAroundZero(this.scale[1] - 1);
	    };
	
	    transformableProto.updateTransform = function () {
	        var parent = this.parent;
	        var parentHasTransform = parent && parent.transform;
	        var needLocalTransform = this.needLocalTransform();
	
	        var m = this.transform;
	        if (!(needLocalTransform || parentHasTransform)) {
	            m && mIdentity(m);
	            return;
	        }
	
	        m = m || matrix.create();
	
	        if (needLocalTransform) {
	            this.getLocalTransform(m);
	        }
	        else {
	            mIdentity(m);
	        }
	
	        // 应用父节点变换
	        if (parentHasTransform) {
	            if (needLocalTransform) {
	                matrix.mul(m, parent.transform, m);
	            }
	            else {
	                matrix.copy(m, parent.transform);
	            }
	        }
	        // 保存这个变换矩阵
	        this.transform = m;
	
	        this.invTransform = this.invTransform || matrix.create();
	        matrix.invert(this.invTransform, m);
	    };
	
	    transformableProto.getLocalTransform = function (m) {
	        m = m || [];
	        mIdentity(m);
	
	        var origin = this.origin;
	
	        var scale = this.scale;
	        var rotation = this.rotation;
	        var position = this.position;
	        if (origin) {
	            // Translate to origin
	            m[4] -= origin[0];
	            m[5] -= origin[1];
	        }
	        matrix.scale(m, m, scale);
	        if (rotation) {
	            matrix.rotate(m, m, rotation);
	        }
	        if (origin) {
	            // Translate back from origin
	            m[4] += origin[0];
	            m[5] += origin[1];
	        }
	
	        m[4] += position[0];
	        m[5] += position[1];
	
	        return m;
	    };
	    /**
	     * 将自己的transform应用到context上
	     * @param {Context2D} ctx
	     */
	    transformableProto.setTransform = function (ctx) {
	        var m = this.transform;
	        if (m) {
	            ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	        }
	    };
	
	    var tmpTransform = [];
	
	    /**
	     * 分解`transform`矩阵到`position`, `rotation`, `scale`
	     */
	    transformableProto.decomposeTransform = function () {
	        if (!this.transform) {
	            return;
	        }
	        var parent = this.parent;
	        var m = this.transform;
	        if (parent && parent.transform) {
	            // Get local transform and decompose them to position, scale, rotation
	            matrix.mul(tmpTransform, parent.invTransform, m);
	            m = tmpTransform;
	        }
	        var sx = m[0] * m[0] + m[1] * m[1];
	        var sy = m[2] * m[2] + m[3] * m[3];
	        var position = this.position;
	        var scale = this.scale;
	        if (isNotAroundZero(sx - 1)) {
	            sx = Math.sqrt(sx);
	        }
	        if (isNotAroundZero(sy - 1)) {
	            sy = Math.sqrt(sy);
	        }
	        if (m[0] < 0) {
	            sx = -sx;
	        }
	        if (m[3] < 0) {
	            sy = -sy;
	        }
	        position[0] = m[4];
	        position[1] = m[5];
	        scale[0] = sx;
	        scale[1] = sy;
	        this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
	    };
	
	    /**
	     * 变换坐标位置到 shape 的局部坐标空间
	     * @method
	     * @param {number} x
	     * @param {number} y
	     * @return {Array.<number>}
	     */
	    transformableProto.transformCoordToLocal = function (x, y) {
	        var v2 = [x, y];
	        var invTransform = this.invTransform;
	        if (invTransform) {
	            vector.applyTransform(v2, v2, invTransform);
	        }
	        return v2;
	    };
	
	    /**
	     * 变换局部坐标位置到全局坐标空间
	     * @method
	     * @param {number} x
	     * @param {number} y
	     * @return {Array.<number>}
	     */
	    transformableProto.transformCoordToGlobal = function (x, y) {
	        var v2 = [x, y];
	        var transform = this.transform;
	        if (transform) {
	            vector.applyTransform(v2, v2, transform);
	        }
	        return v2;
	    };
	
	    module.exports = Transformable;
	


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	    var ArrayCtor = typeof Float32Array === 'undefined'
	        ? Array
	        : Float32Array;
	    /**
	     * 3x2矩阵操作类
	     * @exports zrender/tool/matrix
	     */
	    var matrix = {
	        /**
	         * 创建一个单位矩阵
	         * @return {Float32Array|Array.<number>}
	         */
	        create : function() {
	            var out = new ArrayCtor(6);
	            matrix.identity(out);
	
	            return out;
	        },
	        /**
	         * 设置矩阵为单位矩阵
	         * @param {Float32Array|Array.<number>} out
	         */
	        identity : function(out) {
	            out[0] = 1;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            out[4] = 0;
	            out[5] = 0;
	            return out;
	        },
	        /**
	         * 复制矩阵
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} m
	         */
	        copy: function(out, m) {
	            out[0] = m[0];
	            out[1] = m[1];
	            out[2] = m[2];
	            out[3] = m[3];
	            out[4] = m[4];
	            out[5] = m[5];
	            return out;
	        },
	        /**
	         * 矩阵相乘
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} m1
	         * @param {Float32Array|Array.<number>} m2
	         */
	        mul : function (out, m1, m2) {
	            // Consider matrix.mul(m, m2, m);
	            // where out is the same as m2.
	            // So use temp variable to escape error.
	            var out0 = m1[0] * m2[0] + m1[2] * m2[1];
	            var out1 = m1[1] * m2[0] + m1[3] * m2[1];
	            var out2 = m1[0] * m2[2] + m1[2] * m2[3];
	            var out3 = m1[1] * m2[2] + m1[3] * m2[3];
	            var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
	            var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
	            out[0] = out0;
	            out[1] = out1;
	            out[2] = out2;
	            out[3] = out3;
	            out[4] = out4;
	            out[5] = out5;
	            return out;
	        },
	        /**
	         * 平移变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {Float32Array|Array.<number>} v
	         */
	        translate : function(out, a, v) {
	            out[0] = a[0];
	            out[1] = a[1];
	            out[2] = a[2];
	            out[3] = a[3];
	            out[4] = a[4] + v[0];
	            out[5] = a[5] + v[1];
	            return out;
	        },
	        /**
	         * 旋转变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {number} rad
	         */
	        rotate : function(out, a, rad) {
	            var aa = a[0];
	            var ac = a[2];
	            var atx = a[4];
	            var ab = a[1];
	            var ad = a[3];
	            var aty = a[5];
	            var st = Math.sin(rad);
	            var ct = Math.cos(rad);
	
	            out[0] = aa * ct + ab * st;
	            out[1] = -aa * st + ab * ct;
	            out[2] = ac * ct + ad * st;
	            out[3] = -ac * st + ct * ad;
	            out[4] = ct * atx + st * aty;
	            out[5] = ct * aty - st * atx;
	            return out;
	        },
	        /**
	         * 缩放变换
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         * @param {Float32Array|Array.<number>} v
	         */
	        scale : function(out, a, v) {
	            var vx = v[0];
	            var vy = v[1];
	            out[0] = a[0] * vx;
	            out[1] = a[1] * vy;
	            out[2] = a[2] * vx;
	            out[3] = a[3] * vy;
	            out[4] = a[4] * vx;
	            out[5] = a[5] * vy;
	            return out;
	        },
	        /**
	         * 求逆矩阵
	         * @param {Float32Array|Array.<number>} out
	         * @param {Float32Array|Array.<number>} a
	         */
	        invert : function(out, a) {
	
	            var aa = a[0];
	            var ac = a[2];
	            var atx = a[4];
	            var ab = a[1];
	            var ad = a[3];
	            var aty = a[5];
	
	            var det = aa * ad - ab * ac;
	            if (!det) {
	                return null;
	            }
	            det = 1.0 / det;
	
	            out[0] = ad * det;
	            out[1] = -ab * det;
	            out[2] = -ac * det;
	            out[3] = aa * det;
	            out[4] = (ac * aty - ad * atx) * det;
	            out[5] = (ab * atx - aa * aty) * det;
	            return out;
	        }
	    };
	
	    module.exports = matrix;
	


/***/ },
/* 15 */
/***/ function(module, exports) {

	
	    var ArrayCtor = typeof Float32Array === 'undefined'
	        ? Array
	        : Float32Array;
	
	    /**
	     * @typedef {Float32Array|Array.<number>} Vector2
	     */
	    /**
	     * 二维向量类
	     * @exports zrender/tool/vector
	     */
	    var vector = {
	        /**
	         * 创建一个向量
	         * @param {number} [x=0]
	         * @param {number} [y=0]
	         * @return {Vector2}
	         */
	        create: function (x, y) {
	            var out = new ArrayCtor(2);
	            out[0] = x || 0;
	            out[1] = y || 0;
	            return out;
	        },
	
	        /**
	         * 复制向量数据
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @return {Vector2}
	         */
	        copy: function (out, v) {
	            out[0] = v[0];
	            out[1] = v[1];
	            return out;
	        },
	
	        /**
	         * 克隆一个向量
	         * @param {Vector2} v
	         * @return {Vector2}
	         */
	        clone: function (v) {
	            var out = new ArrayCtor(2);
	            out[0] = v[0];
	            out[1] = v[1];
	            return out;
	        },
	
	        /**
	         * 设置向量的两个项
	         * @param {Vector2} out
	         * @param {number} a
	         * @param {number} b
	         * @return {Vector2} 结果
	         */
	        set: function (out, a, b) {
	            out[0] = a;
	            out[1] = b;
	            return out;
	        },
	
	        /**
	         * 向量相加
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        add: function (out, v1, v2) {
	            out[0] = v1[0] + v2[0];
	            out[1] = v1[1] + v2[1];
	            return out;
	        },
	
	        /**
	         * 向量缩放后相加
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @param {number} a
	         */
	        scaleAndAdd: function (out, v1, v2, a) {
	            out[0] = v1[0] + v2[0] * a;
	            out[1] = v1[1] + v2[1] * a;
	            return out;
	        },
	
	        /**
	         * 向量相减
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        sub: function (out, v1, v2) {
	            out[0] = v1[0] - v2[0];
	            out[1] = v1[1] - v2[1];
	            return out;
	        },
	
	        /**
	         * 向量长度
	         * @param {Vector2} v
	         * @return {number}
	         */
	        len: function (v) {
	            return Math.sqrt(this.lenSquare(v));
	        },
	
	        /**
	         * 向量长度平方
	         * @param {Vector2} v
	         * @return {number}
	         */
	        lenSquare: function (v) {
	            return v[0] * v[0] + v[1] * v[1];
	        },
	
	        /**
	         * 向量乘法
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        mul: function (out, v1, v2) {
	            out[0] = v1[0] * v2[0];
	            out[1] = v1[1] * v2[1];
	            return out;
	        },
	
	        /**
	         * 向量除法
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         */
	        div: function (out, v1, v2) {
	            out[0] = v1[0] / v2[0];
	            out[1] = v1[1] / v2[1];
	            return out;
	        },
	
	        /**
	         * 向量点乘
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        dot: function (v1, v2) {
	            return v1[0] * v2[0] + v1[1] * v2[1];
	        },
	
	        /**
	         * 向量缩放
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @param {number} s
	         */
	        scale: function (out, v, s) {
	            out[0] = v[0] * s;
	            out[1] = v[1] * s;
	            return out;
	        },
	
	        /**
	         * 向量归一化
	         * @param {Vector2} out
	         * @param {Vector2} v
	         */
	        normalize: function (out, v) {
	            var d = vector.len(v);
	            if (d === 0) {
	                out[0] = 0;
	                out[1] = 0;
	            }
	            else {
	                out[0] = v[0] / d;
	                out[1] = v[1] / d;
	            }
	            return out;
	        },
	
	        /**
	         * 计算向量间距离
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        distance: function (v1, v2) {
	            return Math.sqrt(
	                (v1[0] - v2[0]) * (v1[0] - v2[0])
	                + (v1[1] - v2[1]) * (v1[1] - v2[1])
	            );
	        },
	
	        /**
	         * 向量距离平方
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @return {number}
	         */
	        distanceSquare: function (v1, v2) {
	            return (v1[0] - v2[0]) * (v1[0] - v2[0])
	                + (v1[1] - v2[1]) * (v1[1] - v2[1]);
	        },
	
	        /**
	         * 求负向量
	         * @param {Vector2} out
	         * @param {Vector2} v
	         */
	        negate: function (out, v) {
	            out[0] = -v[0];
	            out[1] = -v[1];
	            return out;
	        },
	
	        /**
	         * 插值两个点
	         * @param {Vector2} out
	         * @param {Vector2} v1
	         * @param {Vector2} v2
	         * @param {number} t
	         */
	        lerp: function (out, v1, v2, t) {
	            out[0] = v1[0] + t * (v2[0] - v1[0]);
	            out[1] = v1[1] + t * (v2[1] - v1[1]);
	            return out;
	        },
	
	        /**
	         * 矩阵左乘向量
	         * @param {Vector2} out
	         * @param {Vector2} v
	         * @param {Vector2} m
	         */
	        applyTransform: function (out, v, m) {
	            var x = v[0];
	            var y = v[1];
	            out[0] = m[0] * x + m[2] * y + m[4];
	            out[1] = m[1] * x + m[3] * y + m[5];
	            return out;
	        },
	        /**
	         * 求两个向量最小值
	         * @param  {Vector2} out
	         * @param  {Vector2} v1
	         * @param  {Vector2} v2
	         */
	        min: function (out, v1, v2) {
	            out[0] = Math.min(v1[0], v2[0]);
	            out[1] = Math.min(v1[1], v2[1]);
	            return out;
	        },
	        /**
	         * 求两个向量最大值
	         * @param  {Vector2} out
	         * @param  {Vector2} v1
	         * @param  {Vector2} v2
	         */
	        max: function (out, v1, v2) {
	            out[0] = Math.max(v1[0], v2[0]);
	            out[1] = Math.max(v1[1], v2[1]);
	            return out;
	        }
	    };
	
	    vector.length = vector.len;
	    vector.lengthSquare = vector.lenSquare;
	    vector.dist = vector.distance;
	    vector.distSquare = vector.distanceSquare;
	
	    module.exports = vector;
	


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module zrender/mixin/Animatable
	 */
	
	
	    var Animator = __webpack_require__(17);
	    var util = __webpack_require__(4);
	    var isString = util.isString;
	    var isFunction = util.isFunction;
	    var isObject = util.isObject;
	    var log = __webpack_require__(21);
	
	    /**
	     * @alias modue:zrender/mixin/Animatable
	     * @constructor
	     */
	    var Animatable = function () {
	
	        /**
	         * @type {Array.<module:zrender/animation/Animator>}
	         * @readOnly
	         */
	        this.animators = [];
	    };
	
	    Animatable.prototype = {
	
	        constructor: Animatable,
	
	        /**
	         * 动画
	         *
	         * @param {string} path 需要添加动画的属性获取路径，可以通过a.b.c来获取深层的属性
	         * @param {boolean} [loop] 动画是否循环
	         * @return {module:zrender/animation/Animator}
	         * @example:
	         *     el.animate('style', false)
	         *         .when(1000, {x: 10} )
	         *         .done(function(){ // Animation done })
	         *         .start()
	         */
	        animate: function (path, loop) {
	            var target;
	            var animatingShape = false;
	            var el = this;
	            var zr = this.__zr;
	            if (path) {
	                var pathSplitted = path.split('.');
	                var prop = el;
	                // If animating shape
	                animatingShape = pathSplitted[0] === 'shape';
	                for (var i = 0, l = pathSplitted.length; i < l; i++) {
	                    if (!prop) {
	                        continue;
	                    }
	                    prop = prop[pathSplitted[i]];
	                }
	                if (prop) {
	                    target = prop;
	                }
	            }
	            else {
	                target = el;
	            }
	
	            if (!target) {
	                log(
	                    'Property "'
	                    + path
	                    + '" is not existed in element '
	                    + el.id
	                );
	                return;
	            }
	
	            var animators = el.animators;
	
	            var animator = new Animator(target, loop);
	
	            animator.during(function (target) {
	                el.dirty(animatingShape);
	            })
	            .done(function () {
	                // FIXME Animator will not be removed if use `Animator#stop` to stop animation
	                animators.splice(util.indexOf(animators, animator), 1);
	            });
	
	            animators.push(animator);
	
	            // If animate after added to the zrender
	            if (zr) {
	                zr.animation.addAnimator(animator);
	            }
	
	            return animator;
	        },
	
	        /**
	         * 停止动画
	         * @param {boolean} forwardToLast If move to last frame before stop
	         */
	        stopAnimation: function (forwardToLast) {
	            var animators = this.animators;
	            var len = animators.length;
	            for (var i = 0; i < len; i++) {
	                animators[i].stop(forwardToLast);
	            }
	            animators.length = 0;
	
	            return this;
	        },
	
	        /**
	         * @param {Object} target
	         * @param {number} [time=500] Time in ms
	         * @param {string} [easing='linear']
	         * @param {number} [delay=0]
	         * @param {Function} [callback]
	         *
	         * @example
	         *  // Animate position
	         *  el.animateTo({
	         *      position: [10, 10]
	         *  }, function () { // done })
	         *
	         *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
	         *  el.animateTo({
	         *      shape: {
	         *          width: 500
	         *      },
	         *      style: {
	         *          fill: 'red'
	         *      }
	         *      position: [10, 10]
	         *  }, 100, 100, 'cubicOut', function () { // done })
	         */
	         // TODO Return animation key
	        animateTo: function (target, time, delay, easing, callback) {
	            // animateTo(target, time, easing, callback);
	            if (isString(delay)) {
	                callback = easing;
	                easing = delay;
	                delay = 0;
	            }
	            // animateTo(target, time, delay, callback);
	            else if (isFunction(easing)) {
	                callback = easing;
	                easing = 'linear';
	                delay = 0;
	            }
	            // animateTo(target, time, callback);
	            else if (isFunction(delay)) {
	                callback = delay;
	                delay = 0;
	            }
	            // animateTo(target, callback)
	            else if (isFunction(time)) {
	                callback = time;
	                time = 500;
	            }
	            // animateTo(target)
	            else if (!time) {
	                time = 500;
	            }
	            // Stop all previous animations
	            this.stopAnimation();
	            this._animateToShallow('', this, target, time, delay, easing, callback);
	
	            // Animators may be removed immediately after start
	            // if there is nothing to animate
	            var animators = this.animators.slice();
	            var count = animators.length;
	            function done() {
	                count--;
	                if (!count) {
	                    callback && callback();
	                }
	            }
	
	            // No animators. This should be checked before animators[i].start(),
	            // because 'done' may be executed immediately if no need to animate.
	            if (!count) {
	                callback && callback();
	            }
	            // Start after all animators created
	            // Incase any animator is done immediately when all animation properties are not changed
	            for (var i = 0; i < animators.length; i++) {
	                animators[i]
	                    .done(done)
	                    .start(easing);
	            }
	        },
	
	        /**
	         * @private
	         * @param {string} path=''
	         * @param {Object} source=this
	         * @param {Object} target
	         * @param {number} [time=500]
	         * @param {number} [delay=0]
	         *
	         * @example
	         *  // Animate position
	         *  el._animateToShallow({
	         *      position: [10, 10]
	         *  })
	         *
	         *  // Animate shape, style and position in 100ms, delayed 100ms
	         *  el._animateToShallow({
	         *      shape: {
	         *          width: 500
	         *      },
	         *      style: {
	         *          fill: 'red'
	         *      }
	         *      position: [10, 10]
	         *  }, 100, 100)
	         */
	        _animateToShallow: function (path, source, target, time, delay) {
	            var objShallow = {};
	            var propertyCount = 0;
	            for (var name in target) {
	                if (source[name] != null) {
	                    if (isObject(target[name]) && !util.isArrayLike(target[name])) {
	                        this._animateToShallow(
	                            path ? path + '.' + name : name,
	                            source[name],
	                            target[name],
	                            time,
	                            delay
	                        );
	                    }
	                    else {
	                        objShallow[name] = target[name];
	                        propertyCount++;
	                    }
	                }
	                else if (target[name] != null) {
	                    // Attr directly if not has property
	                    // FIXME, if some property not needed for element ?
	                    if (!path) {
	                        this.attr(name, target[name]);
	                    }
	                    else {  // Shape or style
	                        var props = {};
	                        props[path] = {};
	                        props[path][name] = target[name];
	                        this.attr(props);
	                    }
	                }
	            }
	
	            if (propertyCount > 0) {
	                this.animate(path, false)
	                    .when(time == null ? 500 : time, objShallow)
	                    .delay(delay || 0);
	            }
	
	            return this;
	        }
	    };
	
	    module.exports = Animatable;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module echarts/animation/Animator
	 */
	
	
	    var Clip = __webpack_require__(18);
	    var color = __webpack_require__(20);
	    var util = __webpack_require__(4);
	    var isArrayLike = util.isArrayLike;
	
	    var arraySlice = Array.prototype.slice;
	
	    function defaultGetter(target, key) {
	        return target[key];
	    }
	
	    function defaultSetter(target, key, value) {
	        target[key] = value;
	    }
	
	    /**
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} percent
	     * @return {number}
	     */
	    function interpolateNumber(p0, p1, percent) {
	        return (p1 - p0) * percent + p0;
	    }
	
	    /**
	     * @param  {string} p0
	     * @param  {string} p1
	     * @param  {number} percent
	     * @return {string}
	     */
	    function interpolateString(p0, p1, percent) {
	        return percent > 0.5 ? p1 : p0;
	    }
	
	    /**
	     * @param  {Array} p0
	     * @param  {Array} p1
	     * @param  {number} percent
	     * @param  {Array} out
	     * @param  {number} arrDim
	     */
	    function interpolateArray(p0, p1, percent, out, arrDim) {
	        var len = p0.length;
	        if (arrDim == 1) {
	            for (var i = 0; i < len; i++) {
	                out[i] = interpolateNumber(p0[i], p1[i], percent);
	            }
	        }
	        else {
	            var len2 = p0[0].length;
	            for (var i = 0; i < len; i++) {
	                for (var j = 0; j < len2; j++) {
	                    out[i][j] = interpolateNumber(
	                        p0[i][j], p1[i][j], percent
	                    );
	                }
	            }
	        }
	    }
	
	    function fillArr(arr0, arr1, arrDim) {
	        var arr0Len = arr0.length;
	        var arr1Len = arr1.length;
	        if (arr0Len === arr1Len) {
	            return;
	        }
	        // FIXME Not work for TypedArray
	        var isPreviousLarger = arr0Len > arr1Len;
	        if (isPreviousLarger) {
	            // Cut the previous
	            arr0.length = arr1Len;
	        }
	        else {
	            // Fill the previous
	            for (var i = arr0Len; i < arr1Len; i++) {
	                arr0.push(
	                    arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i])
	                );
	            }
	        }
	    }
	
	    /**
	     * @param  {Array} arr0
	     * @param  {Array} arr1
	     * @param  {number} arrDim
	     * @return {boolean}
	     */
	    function isArraySame(arr0, arr1, arrDim) {
	        if (arr0 === arr1) {
	            return true;
	        }
	        var len = arr0.length;
	        if (len !== arr1.length) {
	            return false;
	        }
	        if (arrDim === 1) {
	            for (var i = 0; i < len; i++) {
	                if (arr0[i] !== arr1[i]) {
	                    return false;
	                }
	            }
	        }
	        else {
	            var len2 = arr0[0].length;
	            for (var i = 0; i < len; i++) {
	                for (var j = 0; j < len2; j++) {
	                    if (arr0[i][j] !== arr1[i][j]) {
	                        return false;
	                    }
	                }
	            }
	        }
	        return true;
	    }
	
	    /**
	     * Catmull Rom interpolate array
	     * @param  {Array} p0
	     * @param  {Array} p1
	     * @param  {Array} p2
	     * @param  {Array} p3
	     * @param  {number} t
	     * @param  {number} t2
	     * @param  {number} t3
	     * @param  {Array} out
	     * @param  {number} arrDim
	     */
	    function catmullRomInterpolateArray(
	        p0, p1, p2, p3, t, t2, t3, out, arrDim
	    ) {
	        var len = p0.length;
	        if (arrDim == 1) {
	            for (var i = 0; i < len; i++) {
	                out[i] = catmullRomInterpolate(
	                    p0[i], p1[i], p2[i], p3[i], t, t2, t3
	                );
	            }
	        }
	        else {
	            var len2 = p0[0].length;
	            for (var i = 0; i < len; i++) {
	                for (var j = 0; j < len2; j++) {
	                    out[i][j] = catmullRomInterpolate(
	                        p0[i][j], p1[i][j], p2[i][j], p3[i][j],
	                        t, t2, t3
	                    );
	                }
	            }
	        }
	    }
	
	    /**
	     * Catmull Rom interpolate number
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {number} t
	     * @param  {number} t2
	     * @param  {number} t3
	     * @return {number}
	     */
	    function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
	        var v0 = (p2 - p0) * 0.5;
	        var v1 = (p3 - p1) * 0.5;
	        return (2 * (p1 - p2) + v0 + v1) * t3
	                + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
	                + v0 * t + p1;
	    }
	
	    function cloneValue(value) {
	        if (isArrayLike(value)) {
	            var len = value.length;
	            if (isArrayLike(value[0])) {
	                var ret = [];
	                for (var i = 0; i < len; i++) {
	                    ret.push(arraySlice.call(value[i]));
	                }
	                return ret;
	            }
	
	            return arraySlice.call(value);
	        }
	
	        return value;
	    }
	
	    function rgba2String(rgba) {
	        rgba[0] = Math.floor(rgba[0]);
	        rgba[1] = Math.floor(rgba[1]);
	        rgba[2] = Math.floor(rgba[2]);
	
	        return 'rgba(' + rgba.join(',') + ')';
	    }
	
	    function createTrackClip (animator, easing, oneTrackDone, keyframes, propName) {
	        var getter = animator._getter;
	        var setter = animator._setter;
	        var useSpline = easing === 'spline';
	
	        var trackLen = keyframes.length;
	        if (!trackLen) {
	            return;
	        }
	        // Guess data type
	        var firstVal = keyframes[0].value;
	        var isValueArray = isArrayLike(firstVal);
	        var isValueColor = false;
	        var isValueString = false;
	
	        // For vertices morphing
	        var arrDim = (
	                isValueArray
	                && isArrayLike(firstVal[0])
	            )
	            ? 2 : 1;
	        var trackMaxTime;
	        // Sort keyframe as ascending
	        keyframes.sort(function(a, b) {
	            return a.time - b.time;
	        });
	
	        trackMaxTime = keyframes[trackLen - 1].time;
	        // Percents of each keyframe
	        var kfPercents = [];
	        // Value of each keyframe
	        var kfValues = [];
	        var prevValue = keyframes[0].value;
	        var isAllValueEqual = true;
	        for (var i = 0; i < trackLen; i++) {
	            kfPercents.push(keyframes[i].time / trackMaxTime);
	            // Assume value is a color when it is a string
	            var value = keyframes[i].value;
	
	            // Check if value is equal, deep check if value is array
	            if (!((isValueArray && isArraySame(value, prevValue, arrDim))
	                || (!isValueArray && value === prevValue))) {
	                isAllValueEqual = false;
	            }
	            prevValue = value;
	
	            // Try converting a string to a color array
	            if (typeof value == 'string') {
	                var colorArray = color.parse(value);
	                if (colorArray) {
	                    value = colorArray;
	                    isValueColor = true;
	                }
	                else {
	                    isValueString = true;
	                }
	            }
	            kfValues.push(value);
	        }
	        if (isAllValueEqual) {
	            return;
	        }
	
	        if (isValueArray) {
	            var lastValue = kfValues[trackLen - 1];
	            // Polyfill array
	            for (var i = 0; i < trackLen - 1; i++) {
	                fillArr(kfValues[i], lastValue, arrDim);
	            }
	            fillArr(getter(animator._target, propName), lastValue, arrDim);
	        }
	
	        // Cache the key of last frame to speed up when
	        // animation playback is sequency
	        var lastFrame = 0;
	        var lastFramePercent = 0;
	        var start;
	        var w;
	        var p0;
	        var p1;
	        var p2;
	        var p3;
	
	        if (isValueColor) {
	            var rgba = [0, 0, 0, 0];
	        }
	
	        var onframe = function (target, percent) {
	            // Find the range keyframes
	            // kf1-----kf2---------current--------kf3
	            // find kf2 and kf3 and do interpolation
	            var frame;
	            if (percent < lastFramePercent) {
	                // Start from next key
	                start = Math.min(lastFrame + 1, trackLen - 1);
	                for (frame = start; frame >= 0; frame--) {
	                    if (kfPercents[frame] <= percent) {
	                        break;
	                    }
	                }
	                frame = Math.min(frame, trackLen - 2);
	            }
	            else {
	                for (frame = lastFrame; frame < trackLen; frame++) {
	                    if (kfPercents[frame] > percent) {
	                        break;
	                    }
	                }
	                frame = Math.min(frame - 1, trackLen - 2);
	            }
	            lastFrame = frame;
	            lastFramePercent = percent;
	
	            var range = (kfPercents[frame + 1] - kfPercents[frame]);
	            if (range === 0) {
	                return;
	            }
	            else {
	                w = (percent - kfPercents[frame]) / range;
	            }
	            if (useSpline) {
	                p1 = kfValues[frame];
	                p0 = kfValues[frame === 0 ? frame : frame - 1];
	                p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1];
	                p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2];
	                if (isValueArray) {
	                    catmullRomInterpolateArray(
	                        p0, p1, p2, p3, w, w * w, w * w * w,
	                        getter(target, propName),
	                        arrDim
	                    );
	                }
	                else {
	                    var value;
	                    if (isValueColor) {
	                        value = catmullRomInterpolateArray(
	                            p0, p1, p2, p3, w, w * w, w * w * w,
	                            rgba, 1
	                        );
	                        value = rgba2String(rgba);
	                    }
	                    else if (isValueString) {
	                        // String is step(0.5)
	                        return interpolateString(p1, p2, w);
	                    }
	                    else {
	                        value = catmullRomInterpolate(
	                            p0, p1, p2, p3, w, w * w, w * w * w
	                        );
	                    }
	                    setter(
	                        target,
	                        propName,
	                        value
	                    );
	                }
	            }
	            else {
	                if (isValueArray) {
	                    interpolateArray(
	                        kfValues[frame], kfValues[frame + 1], w,
	                        getter(target, propName),
	                        arrDim
	                    );
	                }
	                else {
	                    var value;
	                    if (isValueColor) {
	                        interpolateArray(
	                            kfValues[frame], kfValues[frame + 1], w,
	                            rgba, 1
	                        );
	                        value = rgba2String(rgba);
	                    }
	                    else if (isValueString) {
	                        // String is step(0.5)
	                        return interpolateString(kfValues[frame], kfValues[frame + 1], w);
	                    }
	                    else {
	                        value = interpolateNumber(kfValues[frame], kfValues[frame + 1], w);
	                    }
	                    setter(
	                        target,
	                        propName,
	                        value
	                    );
	                }
	            }
	        };
	
	        var clip = new Clip({
	            target: animator._target,
	            life: trackMaxTime,
	            loop: animator._loop,
	            delay: animator._delay,
	            onframe: onframe,
	            ondestroy: oneTrackDone
	        });
	
	        if (easing && easing !== 'spline') {
	            clip.easing = easing;
	        }
	
	        return clip;
	    }
	
	    /**
	     * @alias module:zrender/animation/Animator
	     * @constructor
	     * @param {Object} target
	     * @param {boolean} loop
	     * @param {Function} getter
	     * @param {Function} setter
	     */
	    var Animator = function(target, loop, getter, setter) {
	        this._tracks = {};
	        this._target = target;
	
	        this._loop = loop || false;
	
	        this._getter = getter || defaultGetter;
	        this._setter = setter || defaultSetter;
	
	        this._clipCount = 0;
	
	        this._delay = 0;
	
	        this._doneList = [];
	
	        this._onframeList = [];
	
	        this._clipList = [];
	    };
	
	    Animator.prototype = {
	        /**
	         * 设置动画关键帧
	         * @param  {number} time 关键帧时间，单位是ms
	         * @param  {Object} props 关键帧的属性值，key-value表示
	         * @return {module:zrender/animation/Animator}
	         */
	        when: function(time /* ms */, props) {
	            var tracks = this._tracks;
	            for (var propName in props) {
	                if (!tracks[propName]) {
	                    tracks[propName] = [];
	                    // Invalid value
	                    var value = this._getter(this._target, propName);
	                    if (value == null) {
	                        // zrLog('Invalid property ' + propName);
	                        continue;
	                    }
	                    // If time is 0
	                    //  Then props is given initialize value
	                    // Else
	                    //  Initialize value from current prop value
	                    if (time !== 0) {
	                        tracks[propName].push({
	                            time: 0,
	                            value: cloneValue(value)
	                        });
	                    }
	                }
	                tracks[propName].push({
	                    time: time,
	                    value: props[propName]
	                });
	            }
	            return this;
	        },
	        /**
	         * 添加动画每一帧的回调函数
	         * @param  {Function} callback
	         * @return {module:zrender/animation/Animator}
	         */
	        during: function (callback) {
	            this._onframeList.push(callback);
	            return this;
	        },
	
	        _doneCallback: function () {
	            // Clear all tracks
	            this._tracks = {};
	            // Clear all clips
	            this._clipList.length = 0;
	
	            var doneList = this._doneList;
	            var len = doneList.length;
	            for (var i = 0; i < len; i++) {
	                doneList[i].call(this);
	            }
	        },
	        /**
	         * 开始执行动画
	         * @param  {string|Function} easing
	         *         动画缓动函数，详见{@link module:zrender/animation/easing}
	         * @return {module:zrender/animation/Animator}
	         */
	        start: function (easing) {
	
	            var self = this;
	            var clipCount = 0;
	
	            var oneTrackDone = function() {
	                clipCount--;
	                if (!clipCount) {
	                    self._doneCallback();
	                }
	            };
	
	            var lastClip;
	            for (var propName in this._tracks) {
	                var clip = createTrackClip(
	                    this, easing, oneTrackDone,
	                    this._tracks[propName], propName
	                );
	                if (clip) {
	                    this._clipList.push(clip);
	                    clipCount++;
	
	                    // If start after added to animation
	                    if (this.animation) {
	                        this.animation.addClip(clip);
	                    }
	
	                    lastClip = clip;
	                }
	            }
	
	            // Add during callback on the last clip
	            if (lastClip) {
	                var oldOnFrame = lastClip.onframe;
	                lastClip.onframe = function (target, percent) {
	                    oldOnFrame(target, percent);
	
	                    for (var i = 0; i < self._onframeList.length; i++) {
	                        self._onframeList[i](target, percent);
	                    }
	                };
	            }
	
	            if (!clipCount) {
	                this._doneCallback();
	            }
	            return this;
	        },
	        /**
	         * 停止动画
	         * @param {boolean} forwardToLast If move to last frame before stop
	         */
	        stop: function (forwardToLast) {
	            var clipList = this._clipList;
	            var animation = this.animation;
	            for (var i = 0; i < clipList.length; i++) {
	                var clip = clipList[i];
	                if (forwardToLast) {
	                    // Move to last frame before stop
	                    clip.onframe(this._target, 1);
	                }
	                animation && animation.removeClip(clip);
	            }
	            clipList.length = 0;
	        },
	        /**
	         * 设置动画延迟开始的时间
	         * @param  {number} time 单位ms
	         * @return {module:zrender/animation/Animator}
	         */
	        delay: function (time) {
	            this._delay = time;
	            return this;
	        },
	        /**
	         * 添加动画结束的回调
	         * @param  {Function} cb
	         * @return {module:zrender/animation/Animator}
	         */
	        done: function(cb) {
	            if (cb) {
	                this._doneList.push(cb);
	            }
	            return this;
	        },
	
	        /**
	         * @return {Array.<module:zrender/animation/Clip>}
	         */
	        getClips: function () {
	            return this._clipList;
	        }
	    };
	
	    module.exports = Animator;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 动画主控制器
	 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
	 * @config life(1000) 动画时长
	 * @config delay(0) 动画延迟时间
	 * @config loop(true)
	 * @config gap(0) 循环的间隔时间
	 * @config onframe
	 * @config easing(optional)
	 * @config ondestroy(optional)
	 * @config onrestart(optional)
	 *
	 * TODO pause
	 */
	
	
	    var easingFuncs = __webpack_require__(19);
	
	    function Clip(options) {
	
	        this._target = options.target;
	
	        // 生命周期
	        this._life = options.life || 1000;
	        // 延时
	        this._delay = options.delay || 0;
	        // 开始时间
	        // this._startTime = new Date().getTime() + this._delay;// 单位毫秒
	        this._initialized = false;
	
	        // 是否循环
	        this.loop = options.loop == null ? false : options.loop;
	
	        this.gap = options.gap || 0;
	
	        this.easing = options.easing || 'Linear';
	
	        this.onframe = options.onframe;
	        this.ondestroy = options.ondestroy;
	        this.onrestart = options.onrestart;
	    }
	
	    Clip.prototype = {
	
	        constructor: Clip,
	
	        step: function (time) {
	            // Set startTime on first step, or _startTime may has milleseconds different between clips
	            // PENDING
	            if (!this._initialized) {
	                this._startTime = new Date().getTime() + this._delay;
	                this._initialized = true;
	            }
	
	            var percent = (time - this._startTime) / this._life;
	
	            // 还没开始
	            if (percent < 0) {
	                return;
	            }
	
	            percent = Math.min(percent, 1);
	
	            var easing = this.easing;
	            var easingFunc = typeof easing == 'string' ? easingFuncs[easing] : easing;
	            var schedule = typeof easingFunc === 'function'
	                ? easingFunc(percent)
	                : percent;
	
	            this.fire('frame', schedule);
	
	            // 结束
	            if (percent == 1) {
	                if (this.loop) {
	                    this.restart();
	                    // 重新开始周期
	                    // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
	                    return 'restart';
	                }
	
	                // 动画完成将这个控制器标识为待删除
	                // 在Animation.update中进行批量删除
	                this._needsRemove = true;
	                return 'destroy';
	            }
	
	            return null;
	        },
	
	        restart: function() {
	            var time = new Date().getTime();
	            var remainder = (time - this._startTime) % this._life;
	            this._startTime = new Date().getTime() - remainder + this.gap;
	
	            this._needsRemove = false;
	        },
	
	        fire: function(eventType, arg) {
	            eventType = 'on' + eventType;
	            if (this[eventType]) {
	                this[eventType](this._target, arg);
	            }
	        }
	    };
	
	    module.exports = Clip;
	


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
	 * @see http://sole.github.io/tween.js/examples/03_graphs.html
	 * @exports zrender/animation/easing
	 */
	
	    var easing = {
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        linear: function (k) {
	            return k;
	        },
	
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quadraticIn: function (k) {
	            return k * k;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quadraticOut: function (k) {
	            return k * (2 - k);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quadraticInOut: function (k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k;
	            }
	            return -0.5 * (--k * (k - 2) - 1);
	        },
	
	        // 三次方的缓动（t^3）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        cubicIn: function (k) {
	            return k * k * k;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        cubicOut: function (k) {
	            return --k * k * k + 1;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        cubicInOut: function (k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k;
	            }
	            return 0.5 * ((k -= 2) * k * k + 2);
	        },
	
	        // 四次方的缓动（t^4）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quarticIn: function (k) {
	            return k * k * k * k;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quarticOut: function (k) {
	            return 1 - (--k * k * k * k);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quarticInOut: function (k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k * k;
	            }
	            return -0.5 * ((k -= 2) * k * k * k - 2);
	        },
	
	        // 五次方的缓动（t^5）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quinticIn: function (k) {
	            return k * k * k * k * k;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quinticOut: function (k) {
	            return --k * k * k * k * k + 1;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        quinticInOut: function (k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k * k * k;
	            }
	            return 0.5 * ((k -= 2) * k * k * k * k + 2);
	        },
	
	        // 正弦曲线的缓动（sin(t)）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        sinusoidalIn: function (k) {
	            return 1 - Math.cos(k * Math.PI / 2);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        sinusoidalOut: function (k) {
	            return Math.sin(k * Math.PI / 2);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        sinusoidalInOut: function (k) {
	            return 0.5 * (1 - Math.cos(Math.PI * k));
	        },
	
	        // 指数曲线的缓动（2^t）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        exponentialIn: function (k) {
	            return k === 0 ? 0 : Math.pow(1024, k - 1);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        exponentialOut: function (k) {
	            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        exponentialInOut: function (k) {
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if ((k *= 2) < 1) {
	                return 0.5 * Math.pow(1024, k - 1);
	            }
	            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	        },
	
	        // 圆形曲线的缓动（sqrt(1-t^2)）
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        circularIn: function (k) {
	            return 1 - Math.sqrt(1 - k * k);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        circularOut: function (k) {
	            return Math.sqrt(1 - (--k * k));
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        circularInOut: function (k) {
	            if ((k *= 2) < 1) {
	                return -0.5 * (Math.sqrt(1 - k * k) - 1);
	            }
	            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	        },
	
	        // 创建类似于弹簧在停止前来回振荡的动画
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        elasticIn: function (k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1; s = p / 4;
	            }
	            else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            return -(a * Math.pow(2, 10 * (k -= 1)) *
	                        Math.sin((k - s) * (2 * Math.PI) / p));
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        elasticOut: function (k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1; s = p / 4;
	            }
	            else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            return (a * Math.pow(2, -10 * k) *
	                    Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        elasticInOut: function (k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1; s = p / 4;
	            }
	            else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            if ((k *= 2) < 1) {
	                return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
	                    * Math.sin((k - s) * (2 * Math.PI) / p));
	            }
	            return a * Math.pow(2, -10 * (k -= 1))
	                    * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	
	        },
	
	        // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        backIn: function (k) {
	            var s = 1.70158;
	            return k * k * ((s + 1) * k - s);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        backOut: function (k) {
	            var s = 1.70158;
	            return --k * k * ((s + 1) * k + s) + 1;
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        backInOut: function (k) {
	            var s = 1.70158 * 1.525;
	            if ((k *= 2) < 1) {
	                return 0.5 * (k * k * ((s + 1) * k - s));
	            }
	            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	        },
	
	        // 创建弹跳效果
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        bounceIn: function (k) {
	            return 1 - easing.bounceOut(1 - k);
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        bounceOut: function (k) {
	            if (k < (1 / 2.75)) {
	                return 7.5625 * k * k;
	            }
	            else if (k < (2 / 2.75)) {
	                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
	            }
	            else if (k < (2.5 / 2.75)) {
	                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
	            }
	            else {
	                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
	            }
	        },
	        /**
	        * @param {number} k
	        * @return {number}
	        */
	        bounceInOut: function (k) {
	            if (k < 0.5) {
	                return easing.bounceIn(k * 2) * 0.5;
	            }
	            return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
	        }
	    };
	
	    module.exports = easing;
	
	


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * @module zrender/tool/color
	 */
	
	
	    var kCSSColorTable = {
	        'transparent': [0,0,0,0], 'aliceblue': [240,248,255,1],
	        'antiquewhite': [250,235,215,1], 'aqua': [0,255,255,1],
	        'aquamarine': [127,255,212,1], 'azure': [240,255,255,1],
	        'beige': [245,245,220,1], 'bisque': [255,228,196,1],
	        'black': [0,0,0,1], 'blanchedalmond': [255,235,205,1],
	        'blue': [0,0,255,1], 'blueviolet': [138,43,226,1],
	        'brown': [165,42,42,1], 'burlywood': [222,184,135,1],
	        'cadetblue': [95,158,160,1], 'chartreuse': [127,255,0,1],
	        'chocolate': [210,105,30,1], 'coral': [255,127,80,1],
	        'cornflowerblue': [100,149,237,1], 'cornsilk': [255,248,220,1],
	        'crimson': [220,20,60,1], 'cyan': [0,255,255,1],
	        'darkblue': [0,0,139,1], 'darkcyan': [0,139,139,1],
	        'darkgoldenrod': [184,134,11,1], 'darkgray': [169,169,169,1],
	        'darkgreen': [0,100,0,1], 'darkgrey': [169,169,169,1],
	        'darkkhaki': [189,183,107,1], 'darkmagenta': [139,0,139,1],
	        'darkolivegreen': [85,107,47,1], 'darkorange': [255,140,0,1],
	        'darkorchid': [153,50,204,1], 'darkred': [139,0,0,1],
	        'darksalmon': [233,150,122,1], 'darkseagreen': [143,188,143,1],
	        'darkslateblue': [72,61,139,1], 'darkslategray': [47,79,79,1],
	        'darkslategrey': [47,79,79,1], 'darkturquoise': [0,206,209,1],
	        'darkviolet': [148,0,211,1], 'deeppink': [255,20,147,1],
	        'deepskyblue': [0,191,255,1], 'dimgray': [105,105,105,1],
	        'dimgrey': [105,105,105,1], 'dodgerblue': [30,144,255,1],
	        'firebrick': [178,34,34,1], 'floralwhite': [255,250,240,1],
	        'forestgreen': [34,139,34,1], 'fuchsia': [255,0,255,1],
	        'gainsboro': [220,220,220,1], 'ghostwhite': [248,248,255,1],
	        'gold': [255,215,0,1], 'goldenrod': [218,165,32,1],
	        'gray': [128,128,128,1], 'green': [0,128,0,1],
	        'greenyellow': [173,255,47,1], 'grey': [128,128,128,1],
	        'honeydew': [240,255,240,1], 'hotpink': [255,105,180,1],
	        'indianred': [205,92,92,1], 'indigo': [75,0,130,1],
	        'ivory': [255,255,240,1], 'khaki': [240,230,140,1],
	        'lavender': [230,230,250,1], 'lavenderblush': [255,240,245,1],
	        'lawngreen': [124,252,0,1], 'lemonchiffon': [255,250,205,1],
	        'lightblue': [173,216,230,1], 'lightcoral': [240,128,128,1],
	        'lightcyan': [224,255,255,1], 'lightgoldenrodyellow': [250,250,210,1],
	        'lightgray': [211,211,211,1], 'lightgreen': [144,238,144,1],
	        'lightgrey': [211,211,211,1], 'lightpink': [255,182,193,1],
	        'lightsalmon': [255,160,122,1], 'lightseagreen': [32,178,170,1],
	        'lightskyblue': [135,206,250,1], 'lightslategray': [119,136,153,1],
	        'lightslategrey': [119,136,153,1], 'lightsteelblue': [176,196,222,1],
	        'lightyellow': [255,255,224,1], 'lime': [0,255,0,1],
	        'limegreen': [50,205,50,1], 'linen': [250,240,230,1],
	        'magenta': [255,0,255,1], 'maroon': [128,0,0,1],
	        'mediumaquamarine': [102,205,170,1], 'mediumblue': [0,0,205,1],
	        'mediumorchid': [186,85,211,1], 'mediumpurple': [147,112,219,1],
	        'mediumseagreen': [60,179,113,1], 'mediumslateblue': [123,104,238,1],
	        'mediumspringgreen': [0,250,154,1], 'mediumturquoise': [72,209,204,1],
	        'mediumvioletred': [199,21,133,1], 'midnightblue': [25,25,112,1],
	        'mintcream': [245,255,250,1], 'mistyrose': [255,228,225,1],
	        'moccasin': [255,228,181,1], 'navajowhite': [255,222,173,1],
	        'navy': [0,0,128,1], 'oldlace': [253,245,230,1],
	        'olive': [128,128,0,1], 'olivedrab': [107,142,35,1],
	        'orange': [255,165,0,1], 'orangered': [255,69,0,1],
	        'orchid': [218,112,214,1], 'palegoldenrod': [238,232,170,1],
	        'palegreen': [152,251,152,1], 'paleturquoise': [175,238,238,1],
	        'palevioletred': [219,112,147,1], 'papayawhip': [255,239,213,1],
	        'peachpuff': [255,218,185,1], 'peru': [205,133,63,1],
	        'pink': [255,192,203,1], 'plum': [221,160,221,1],
	        'powderblue': [176,224,230,1], 'purple': [128,0,128,1],
	        'red': [255,0,0,1], 'rosybrown': [188,143,143,1],
	        'royalblue': [65,105,225,1], 'saddlebrown': [139,69,19,1],
	        'salmon': [250,128,114,1], 'sandybrown': [244,164,96,1],
	        'seagreen': [46,139,87,1], 'seashell': [255,245,238,1],
	        'sienna': [160,82,45,1], 'silver': [192,192,192,1],
	        'skyblue': [135,206,235,1], 'slateblue': [106,90,205,1],
	        'slategray': [112,128,144,1], 'slategrey': [112,128,144,1],
	        'snow': [255,250,250,1], 'springgreen': [0,255,127,1],
	        'steelblue': [70,130,180,1], 'tan': [210,180,140,1],
	        'teal': [0,128,128,1], 'thistle': [216,191,216,1],
	        'tomato': [255,99,71,1], 'turquoise': [64,224,208,1],
	        'violet': [238,130,238,1], 'wheat': [245,222,179,1],
	        'white': [255,255,255,1], 'whitesmoke': [245,245,245,1],
	        'yellow': [255,255,0,1], 'yellowgreen': [154,205,50,1]
	    };
	
	    function clampCssByte(i) {  // Clamp to integer 0 .. 255.
	        i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
	        return i < 0 ? 0 : i > 255 ? 255 : i;
	    }
	
	    function clampCssAngle(i) {  // Clamp to integer 0 .. 360.
	        i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
	        return i < 0 ? 0 : i > 360 ? 360 : i;
	    }
	
	    function clampCssFloat(f) {  // Clamp to float 0.0 .. 1.0.
	        return f < 0 ? 0 : f > 1 ? 1 : f;
	    }
	
	    function parseCssInt(str) {  // int or percentage.
	        if (str.length && str.charAt(str.length - 1) === '%') {
	            return clampCssByte(parseFloat(str) / 100 * 255);
	        }
	        return clampCssByte(parseInt(str, 10));
	    }
	
	    function parseCssFloat(str) {  // float or percentage.
	        if (str.length && str.charAt(str.length - 1) === '%') {
	            return clampCssFloat(parseFloat(str) / 100);
	        }
	        return clampCssFloat(parseFloat(str));
	    }
	
	    function cssHueToRgb(m1, m2, h) {
	        if (h < 0) {
	            h += 1;
	        }
	        else if (h > 1) {
	            h -= 1;
	        }
	
	        if (h * 6 < 1) {
	            return m1 + (m2 - m1) * h * 6;
	        }
	        if (h * 2 < 1) {
	            return m2;
	        }
	        if (h * 3 < 2) {
	            return m1 + (m2 - m1) * (2/3 - h) * 6;
	        }
	        return m1;
	    }
	
	    function lerp(a, b, p) {
	        return a + (b - a) * p;
	    }
	
	    /**
	     * @param {string} colorStr
	     * @return {Array.<number>}
	     * @memberOf module:zrender/util/color
	     */
	    function parse(colorStr) {
	        if (!colorStr) {
	            return;
	        }
	        // colorStr may be not string
	        colorStr = colorStr + '';
	        // Remove all whitespace, not compliant, but should just be more accepting.
	        var str = colorStr.replace(/ /g, '').toLowerCase();
	
	        // Color keywords (and transparent) lookup.
	        if (str in kCSSColorTable) {
	            return kCSSColorTable[str].slice();  // dup.
	        }
	
	        // #abc and #abc123 syntax.
	        if (str.charAt(0) === '#') {
	            if (str.length === 4) {
	                var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	                if (!(iv >= 0 && iv <= 0xfff)) {
	                    return;  // Covers NaN.
	                }
	                return [
	                    ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
	                    (iv & 0xf0) | ((iv & 0xf0) >> 4),
	                    (iv & 0xf) | ((iv & 0xf) << 4),
	                    1
	                ];
	            }
	            else if (str.length === 7) {
	                var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	                if (!(iv >= 0 && iv <= 0xffffff)) {
	                    return;  // Covers NaN.
	                }
	                return [
	                    (iv & 0xff0000) >> 16,
	                    (iv & 0xff00) >> 8,
	                    iv & 0xff,
	                    1
	                ];
	            }
	
	            return;
	        }
	        var op = str.indexOf('('), ep = str.indexOf(')');
	        if (op !== -1 && ep + 1 === str.length) {
	            var fname = str.substr(0, op);
	            var params = str.substr(op + 1, ep - (op + 1)).split(',');
	            var alpha = 1;  // To allow case fallthrough.
	            switch (fname) {
	                case 'rgba':
	                    if (params.length !== 4) {
	                        return;
	                    }
	                    alpha = parseCssFloat(params.pop()); // jshint ignore:line
	                // Fall through.
	                case 'rgb':
	                    if (params.length !== 3) {
	                        return;
	                    }
	                    return [
	                        parseCssInt(params[0]),
	                        parseCssInt(params[1]),
	                        parseCssInt(params[2]),
	                        alpha
	                    ];
	                case 'hsla':
	                    if (params.length !== 4) {
	                        return;
	                    }
	                    params[3] = parseCssFloat(params[3]);
	                    return hsla2rgba(params);
	                case 'hsl':
	                    if (params.length !== 3) {
	                        return;
	                    }
	                    return hsla2rgba(params);
	                default:
	                    return;
	            }
	        }
	
	        return;
	    }
	
	    /**
	     * @param {Array.<number>} hsla
	     * @return {Array.<number>} rgba
	     */
	    function hsla2rgba(hsla) {
	        var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
	        // NOTE(deanm): According to the CSS spec s/l should only be
	        // percentages, but we don't bother and let float or percentage.
	        var s = parseCssFloat(hsla[1]);
	        var l = parseCssFloat(hsla[2]);
	        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	        var m1 = l * 2 - m2;
	
	        var rgba = [
	            clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255),
	            clampCssByte(cssHueToRgb(m1, m2, h) * 255),
	            clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255)
	        ];
	
	        if (hsla.length === 4) {
	            rgba[3] = hsla[3];
	        }
	
	        return rgba;
	    }
	
	    /**
	     * @param {Array.<number>} rgba
	     * @return {Array.<number>} hsla
	     */
	    function rgba2hsla(rgba) {
	        if (!rgba) {
	            return;
	        }
	
	        // RGB from 0 to 255
	        var R = rgba[0] / 255;
	        var G = rgba[1] / 255;
	        var B = rgba[2] / 255;
	
	        var vMin = Math.min(R, G, B); // Min. value of RGB
	        var vMax = Math.max(R, G, B); // Max. value of RGB
	        var delta = vMax - vMin; // Delta RGB value
	
	        var L = (vMax + vMin) / 2;
	        var H;
	        var S;
	        // HSL results from 0 to 1
	        if (delta === 0) {
	            H = 0;
	            S = 0;
	        }
	        else {
	            if (L < 0.5) {
	                S = delta / (vMax + vMin);
	            }
	            else {
	                S = delta / (2 - vMax - vMin);
	            }
	
	            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
	            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
	            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;
	
	            if (R === vMax) {
	                H = deltaB - deltaG;
	            }
	            else if (G === vMax) {
	                H = (1 / 3) + deltaR - deltaB;
	            }
	            else if (B === vMax) {
	                H = (2 / 3) + deltaG - deltaR;
	            }
	
	            if (H < 0) {
	                H += 1;
	            }
	
	            if (H > 1) {
	                H -= 1;
	            }
	        }
	
	        var hsla = [H * 360, S, L];
	
	        if (rgba[3] != null) {
	            hsla.push(rgba[3]);
	        }
	
	        return hsla;
	    }
	
	    /**
	     * @param {string} color
	     * @param {number} level
	     * @return {string}
	     * @memberOf module:zrender/util/color
	     */
	    function lift(color, level) {
	        var colorArr = parse(color);
	        if (colorArr) {
	            for (var i = 0; i < 3; i++) {
	                if (level < 0) {
	                    colorArr[i] = colorArr[i] * (1 - level) | 0;
	                }
	                else {
	                    colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
	                }
	            }
	            return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
	        }
	    }
	
	    /**
	     * @param {string} color
	     * @return {string}
	     * @memberOf module:zrender/util/color
	     */
	    function toHex(color, level) {
	        var colorArr = parse(color);
	        if (colorArr) {
	            return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
	        }
	    }
	
	    /**
	     * Map value to color. Faster than mapToColor methods because color is represented by rgba array
	     * @param {number} normalizedValue A float between 0 and 1.
	     * @param {Array.<Array.<number>>} colors List of rgba color array
	     * @param {Array.<number>} [out] Mapped gba color array
	     * @return {Array.<number>}
	     */
	    function fastMapToColor(normalizedValue, colors, out) {
	        if (!(colors && colors.length)
	            || !(normalizedValue >= 0 && normalizedValue <= 1)
	        ) {
	            return;
	        }
	        out = out || [0, 0, 0, 0];
	        var value = normalizedValue * (colors.length - 1);
	        var leftIndex = Math.floor(value);
	        var rightIndex = Math.ceil(value);
	        var leftColor = colors[leftIndex];
	        var rightColor = colors[rightIndex];
	        var dv = value - leftIndex;
	        out[0] = clampCssByte(lerp(leftColor[0], rightColor[0], dv));
	        out[1] = clampCssByte(lerp(leftColor[1], rightColor[1], dv));
	        out[2] = clampCssByte(lerp(leftColor[2], rightColor[2], dv));
	        out[3] = clampCssByte(lerp(leftColor[3], rightColor[3], dv));
	        return out;
	    }
	    /**
	     * @param {number} normalizedValue A float between 0 and 1.
	     * @param {Array.<string>} colors Color list.
	     * @param {boolean=} fullOutput Default false.
	     * @return {(string|Object)} Result color. If fullOutput,
	     *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
	     * @memberOf module:zrender/util/color
	     */
	    function mapToColor(normalizedValue, colors, fullOutput) {
	        if (!(colors && colors.length)
	            || !(normalizedValue >= 0 && normalizedValue <= 1)
	        ) {
	            return;
	        }
	
	        var value = normalizedValue * (colors.length - 1);
	        var leftIndex = Math.floor(value);
	        var rightIndex = Math.ceil(value);
	        var leftColor = parse(colors[leftIndex]);
	        var rightColor = parse(colors[rightIndex]);
	        var dv = value - leftIndex;
	
	        var color = stringify(
	            [
	                clampCssByte(lerp(leftColor[0], rightColor[0], dv)),
	                clampCssByte(lerp(leftColor[1], rightColor[1], dv)),
	                clampCssByte(lerp(leftColor[2], rightColor[2], dv)),
	                clampCssFloat(lerp(leftColor[3], rightColor[3], dv))
	            ],
	            'rgba'
	        );
	
	        return fullOutput
	            ? {
	                color: color,
	                leftIndex: leftIndex,
	                rightIndex: rightIndex,
	                value: value
	            }
	            : color;
	    }
	
	    /**
	     * @param {Array<number>} interval  Array length === 2,
	     *                                  each item is normalized value ([0, 1]).
	     * @param {Array.<string>} colors Color list.
	     * @return {Array.<Object>} colors corresponding to the interval,
	     *                          each item is {color: 'xxx', offset: ...}
	     *                          where offset is between 0 and 1.
	     * @memberOf module:zrender/util/color
	     */
	    function mapIntervalToColor(interval, colors) {
	        if (interval.length !== 2 || interval[1] < interval[0]) {
	            return;
	        }
	
	        var info0 = mapToColor(interval[0], colors, true);
	        var info1 = mapToColor(interval[1], colors, true);
	
	        var result = [{color: info0.color, offset: 0}];
	
	        var during = info1.value - info0.value;
	        var start = Math.max(info0.value, info0.rightIndex);
	        var end = Math.min(info1.value, info1.leftIndex);
	
	        for (var i = start; during > 0 && i <= end; i++) {
	            result.push({
	                color: colors[i],
	                offset: (i - info0.value) / during
	            });
	        }
	        result.push({color: info1.color, offset: 1});
	
	        return result;
	    }
	
	    /**
	     * @param {string} color
	     * @param {number=} h 0 ~ 360, ignore when null.
	     * @param {number=} s 0 ~ 1, ignore when null.
	     * @param {number=} l 0 ~ 1, ignore when null.
	     * @return {string} Color string in rgba format.
	     * @memberOf module:zrender/util/color
	     */
	    function modifyHSL(color, h, s, l) {
	        color = parse(color);
	
	        if (color) {
	            color = rgba2hsla(color);
	            h != null && (color[0] = clampCssAngle(h));
	            s != null && (color[1] = parseCssFloat(s));
	            l != null && (color[2] = parseCssFloat(l));
	
	            return stringify(hsla2rgba(color), 'rgba');
	        }
	    }
	
	    /**
	     * @param {string} color
	     * @param {number=} alpha 0 ~ 1
	     * @return {string} Color string in rgba format.
	     * @memberOf module:zrender/util/color
	     */
	    function modifyAlpha(color, alpha) {
	        color = parse(color);
	
	        if (color && alpha != null) {
	            color[3] = clampCssFloat(alpha);
	            return stringify(color, 'rgba');
	        }
	    }
	
	    /**
	     * @param {Array.<string>} colors Color list.
	     * @param {string} type 'rgba', 'hsva', ...
	     * @return {string} Result color.
	     */
	    function stringify(arrColor, type) {
	        if (type === 'rgb' || type === 'hsv' || type === 'hsl') {
	            arrColor = arrColor.slice(0, 3);
	        }
	        return type + '(' + arrColor.join(',') + ')';
	    }
	
	    module.exports = {
	        parse: parse,
	        lift: lift,
	        toHex: toHex,
	        fastMapToColor: fastMapToColor,
	        mapToColor: mapToColor,
	        mapIntervalToColor: mapIntervalToColor,
	        modifyHSL: modifyHSL,
	        modifyAlpha: modifyAlpha,
	        stringify: stringify
	    };
	
	


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	        var config = __webpack_require__(22);
	
	        /**
	         * @exports zrender/tool/log
	         * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	         */
	        module.exports = function() {
	            if (config.debugMode === 0) {
	                return;
	            }
	            else if (config.debugMode == 1) {
	                for (var k in arguments) {
	                    throw new Error(arguments[k]);
	                }
	            }
	            else if (config.debugMode > 1) {
	                for (var k in arguments) {
	                    console.log(arguments[k]);
	                }
	            }
	        };
	
	        /* for debug
	        return function(mes) {
	            document.getElementById('wrong-message').innerHTML =
	                mes + ' ' + (new Date() - 0)
	                + '<br/>' 
	                + document.getElementById('wrong-message').innerHTML;
	        };
	        */
	    


/***/ },
/* 22 */
/***/ function(module, exports) {

	
	    var dpr = 1;
	    // If in browser environment
	    if (typeof window !== 'undefined') {
	        dpr = Math.max(window.devicePixelRatio || 1, 1);
	    }
	    /**
	     * config默认配置项
	     * @exports zrender/config
	     * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	     */
	    var config = {
	        /**
	         * debug日志选项：catchBrushException为true下有效
	         * 0 : 不生成debug数据，发布用
	         * 1 : 异常抛出，调试用
	         * 2 : 控制台输出，调试用
	         */
	        debugMode: 0,
	
	        // retina 屏幕优化
	        devicePixelRatio: dpr
	    };
	    module.exports = config;
	
	


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mixin for drawing text in a element bounding rect
	 * @module zrender/mixin/RectText
	 */
	
	
	
	    var textContain = __webpack_require__(24);
	    var BoundingRect = __webpack_require__(25);
	
	    var tmpRect = new BoundingRect();
	
	    var RectText = function () {};
	
	    function parsePercent(value, maxValue) {
	        if (typeof value === 'string') {
	            if (value.lastIndexOf('%') >= 0) {
	                return parseFloat(value) / 100 * maxValue;
	            }
	            return parseFloat(value);
	        }
	        return value;
	    }
	
	    function setTransform(ctx, m) {
	        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
	    }
	
	    RectText.prototype = {
	
	        constructor: RectText,
	
	        /**
	         * Draw text in a rect with specified position.
	         * @param  {CanvasRenderingContext} ctx
	         * @param  {Object} rect Displayable rect
	         * @return {Object} textRect Alternative precalculated text bounding rect
	         */
	        drawRectText: function (ctx, rect, textRect) {
	            var style = this.style;
	            var text = style.text;
	            // Convert to string
	            text != null && (text += '');
	            if (!text) {
	                return;
	            }
	            var x;
	            var y;
	            var textPosition = style.textPosition;
	            var distance = style.textDistance;
	            var align = style.textAlign;
	            var font = style.textFont || style.font;
	            var baseline = style.textBaseline;
	            var verticalAlign = style.textVerticalAlign;
	
	            textRect = textRect || textContain.getBoundingRect(text, font, align, baseline);
	
	            // Transform rect to view space
	            var transform = this.transform;
	            var invTransform = this.invTransform;
	            if (transform) {
	                tmpRect.copy(rect);
	                tmpRect.applyTransform(transform);
	                rect = tmpRect;
	                // Transform back
	                setTransform(ctx, invTransform);
	            }
	
	            // Text position represented by coord
	            if (textPosition instanceof Array) {
	                // Percent
	                x = rect.x + parsePercent(textPosition[0], rect.width);
	                y = rect.y + parsePercent(textPosition[1], rect.height);
	                align = align || 'left';
	                baseline = baseline || 'top';
	            }
	            else {
	                var res = textContain.adjustTextPositionOnRect(
	                    textPosition, rect, textRect, distance
	                );
	                x = res.x;
	                y = res.y;
	                // Default align and baseline when has textPosition
	                align = align || res.textAlign;
	                baseline = baseline || res.textBaseline;
	            }
	
	            ctx.textAlign = align;
	            if (verticalAlign) {
	                switch (verticalAlign) {
	                    case 'middle':
	                        y -= textRect.height / 2;
	                        break;
	                    case 'bottom':
	                        y -= textRect.height;
	                        break;
	                    // 'top'
	                }
	                // Ignore baseline
	                ctx.textBaseline = 'top';
	            }
	            else {
	                ctx.textBaseline = baseline;
	            }
	
	            var textFill = style.textFill;
	            var textStroke = style.textStroke;
	            textFill && (ctx.fillStyle = textFill);
	            textStroke && (ctx.strokeStyle = textStroke);
	            ctx.font = font;
	
	            // Text shadow
	            ctx.shadowColor = style.textShadowColor;
	            ctx.shadowBlur = style.textShadowBlur;
	            ctx.shadowOffsetX = style.textShadowOffsetX;
	            ctx.shadowOffsetY = style.textShadowOffsetY;
	
	            var textLines = text.split('\n');
	            for (var i = 0; i < textLines.length; i++) {
	                textFill && ctx.fillText(textLines[i], x, y);
	                textStroke && ctx.strokeText(textLines[i], x, y);
	                y += textRect.lineHeight;
	            }
	
	            // Transform again
	            transform && setTransform(ctx, transform);
	        }
	    };
	
	    module.exports = RectText;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var textWidthCache = {};
	    var textWidthCacheCounter = 0;
	    var TEXT_CACHE_MAX = 5000;
	
	    var util = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(25);
	
	    function getTextWidth(text, textFont) {
	        var key = text + ':' + textFont;
	        if (textWidthCache[key]) {
	            return textWidthCache[key];
	        }
	
	        var textLines = (text + '').split('\n');
	        var width = 0;
	
	        for (var i = 0, l = textLines.length; i < l; i++) {
	            // measureText 可以被覆盖以兼容不支持 Canvas 的环境
	            width =  Math.max(textContain.measureText(textLines[i], textFont).width, width);
	        }
	
	        if (textWidthCacheCounter > TEXT_CACHE_MAX) {
	            textWidthCacheCounter = 0;
	            textWidthCache = {};
	        }
	        textWidthCacheCounter++;
	        textWidthCache[key] = width;
	
	        return width;
	    }
	
	    function getTextRect(text, textFont, textAlign, textBaseline) {
	        var textLineLen = ((text || '') + '').split('\n').length;
	
	        var width = getTextWidth(text, textFont);
	        // FIXME 高度计算比较粗暴
	        var lineHeight = getTextWidth('国', textFont);
	        var height = textLineLen * lineHeight;
	
	        var rect = new BoundingRect(0, 0, width, height);
	        // Text has a special line height property
	        rect.lineHeight = lineHeight;
	
	        switch (textBaseline) {
	            case 'bottom':
	            case 'alphabetic':
	                rect.y -= lineHeight;
	                break;
	            case 'middle':
	                rect.y -= lineHeight / 2;
	                break;
	            // case 'hanging':
	            // case 'top':
	        }
	
	        // FIXME Right to left language
	        switch (textAlign) {
	            case 'end':
	            case 'right':
	                rect.x -= rect.width;
	                break;
	            case 'center':
	                rect.x -= rect.width / 2;
	                break;
	            // case 'start':
	            // case 'left':
	        }
	
	        return rect;
	    }
	
	    function adjustTextPositionOnRect(textPosition, rect, textRect, distance) {
	
	        var x = rect.x;
	        var y = rect.y;
	
	        var height = rect.height;
	        var width = rect.width;
	
	        var textHeight = textRect.height;
	
	        var halfHeight = height / 2 - textHeight / 2;
	
	        var textAlign = 'left';
	
	        switch (textPosition) {
	            case 'left':
	                x -= distance;
	                y += halfHeight;
	                textAlign = 'right';
	                break;
	            case 'right':
	                x += distance + width;
	                y += halfHeight;
	                textAlign = 'left';
	                break;
	            case 'top':
	                x += width / 2;
	                y -= distance + textHeight;
	                textAlign = 'center';
	                break;
	            case 'bottom':
	                x += width / 2;
	                y += height + distance;
	                textAlign = 'center';
	                break;
	            case 'inside':
	                x += width / 2;
	                y += halfHeight;
	                textAlign = 'center';
	                break;
	            case 'insideLeft':
	                x += distance;
	                y += halfHeight;
	                textAlign = 'left';
	                break;
	            case 'insideRight':
	                x += width - distance;
	                y += halfHeight;
	                textAlign = 'right';
	                break;
	            case 'insideTop':
	                x += width / 2;
	                y += distance;
	                textAlign = 'center';
	                break;
	            case 'insideBottom':
	                x += width / 2;
	                y += height - textHeight - distance;
	                textAlign = 'center';
	                break;
	            case 'insideTopLeft':
	                x += distance;
	                y += distance;
	                textAlign = 'left';
	                break;
	            case 'insideTopRight':
	                x += width - distance;
	                y += distance;
	                textAlign = 'right';
	                break;
	            case 'insideBottomLeft':
	                x += distance;
	                y += height - textHeight - distance;
	                break;
	            case 'insideBottomRight':
	                x += width - distance;
	                y += height - textHeight - distance;
	                textAlign = 'right';
	                break;
	        }
	
	        return {
	            x: x,
	            y: y,
	            textAlign: textAlign,
	            textBaseline: 'top'
	        };
	    }
	
	    /**
	     * Show ellipsis if overflow.
	     *
	     * @param  {string} text
	     * @param  {string} textFont
	     * @param  {string} containerWidth
	     * @param  {Object} [options]
	     * @param  {number} [options.ellipsis='...']
	     * @param  {number} [options.maxIterations=3]
	     * @param  {number} [options.minCharacters=3]
	     * @return {string}
	     */
	    function textEllipsis(text, textFont, containerWidth, options) {
	        if (!containerWidth) {
	            return '';
	        }
	
	        options = util.defaults({
	            ellipsis: '...',
	            minCharacters: 3,
	            maxIterations: 3,
	            cnCharWidth: getTextWidth('国', textFont),
	            // FIXME
	            // 未考虑非等宽字体
	            ascCharWidth: getTextWidth('a', textFont)
	        }, options, true);
	
	        containerWidth -= getTextWidth(options.ellipsis);
	
	        var textLines = (text + '').split('\n');
	
	        for (var i = 0, len = textLines.length; i < len; i++) {
	            textLines[i] = textLineTruncate(
	                textLines[i], textFont, containerWidth, options
	            );
	        }
	
	        return textLines.join('\n');
	    }
	
	    function textLineTruncate(text, textFont, containerWidth, options) {
	        // FIXME
	        // 粗糙得写的，尚未考虑性能和各种语言、字体的效果。
	        for (var i = 0;; i++) {
	            var lineWidth = getTextWidth(text, textFont);
	
	            if (lineWidth < containerWidth || i >= options.maxIterations) {
	                text += options.ellipsis;
	                break;
	            }
	
	            var subLength = i === 0
	                ? estimateLength(text, containerWidth, options)
	                : Math.floor(text.length * containerWidth / lineWidth);
	
	            if (subLength < options.minCharacters) {
	                text = '';
	                break;
	            }
	
	            text = text.substr(0, subLength);
	        }
	
	        return text;
	    }
	
	    function estimateLength(text, containerWidth, options) {
	        var width = 0;
	        var i = 0;
	        for (var len = text.length; i < len && width < containerWidth; i++) {
	            var charCode = text.charCodeAt(i);
	            width += (0 <= charCode && charCode <= 127)
	                ? options.ascCharWidth : options.cnCharWidth;
	        }
	        return i;
	    }
	
	    var textContain = {
	
	        getWidth: getTextWidth,
	
	        getBoundingRect: getTextRect,
	
	        adjustTextPositionOnRect: adjustTextPositionOnRect,
	
	        ellipsis: textEllipsis,
	
	        measureText: function (text, textFont) {
	            var ctx = util.getContext();
	            ctx.font = textFont;
	            return ctx.measureText(text);
	        }
	    };
	
	    module.exports = textContain;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module echarts/core/BoundingRect
	 */
	
	
	    var vec2 = __webpack_require__(15);
	    var matrix = __webpack_require__(14);
	
	    var v2ApplyTransform = vec2.applyTransform;
	    var mathMin = Math.min;
	    var mathAbs = Math.abs;
	    var mathMax = Math.max;
	    /**
	     * @alias module:echarts/core/BoundingRect
	     */
	    function BoundingRect(x, y, width, height) {
	        /**
	         * @type {number}
	         */
	        this.x = x;
	        /**
	         * @type {number}
	         */
	        this.y = y;
	        /**
	         * @type {number}
	         */
	        this.width = width;
	        /**
	         * @type {number}
	         */
	        this.height = height;
	    }
	
	    BoundingRect.prototype = {
	
	        constructor: BoundingRect,
	
	        /**
	         * @param {module:echarts/core/BoundingRect} other
	         */
	        union: function (other) {
	            var x = mathMin(other.x, this.x);
	            var y = mathMin(other.y, this.y);
	
	            this.width = mathMax(
	                    other.x + other.width,
	                    this.x + this.width
	                ) - x;
	            this.height = mathMax(
	                    other.y + other.height,
	                    this.y + this.height
	                ) - y;
	            this.x = x;
	            this.y = y;
	        },
	
	        /**
	         * @param {Array.<number>} m
	         * @methods
	         */
	        applyTransform: (function () {
	            var min = [];
	            var max = [];
	            return function (m) {
	                // In case usage like this
	                // el.getBoundingRect().applyTransform(el.transform)
	                // And element has no transform
	                if (!m) {
	                    return;
	                }
	                min[0] = this.x;
	                min[1] = this.y;
	                max[0] = this.x + this.width;
	                max[1] = this.y + this.height;
	
	                v2ApplyTransform(min, min, m);
	                v2ApplyTransform(max, max, m);
	
	                this.x = mathMin(min[0], max[0]);
	                this.y = mathMin(min[1], max[1]);
	                this.width = mathAbs(max[0] - min[0]);
	                this.height = mathAbs(max[1] - min[1]);
	            };
	        })(),
	
	        /**
	         * Calculate matrix of transforming from self to target rect
	         * @param  {module:zrender/core/BoundingRect} b
	         * @return {Array.<number>}
	         */
	        calculateTransform: function (b) {
	            var a = this;
	            var sx = b.width / a.width;
	            var sy = b.height / a.height;
	
	            var m = matrix.create();
	
	            // 矩阵右乘
	            matrix.translate(m, m, [-a.x, -a.y]);
	            matrix.scale(m, m, [sx, sy]);
	            matrix.translate(m, m, [b.x, b.y]);
	
	            return m;
	        },
	
	        /**
	         * @param {(module:echarts/core/BoundingRect|Object)} b
	         * @return {boolean}
	         */
	        intersect: function (b) {
	            var a = this;
	            var ax0 = a.x;
	            var ax1 = a.x + a.width;
	            var ay0 = a.y;
	            var ay1 = a.y + a.height;
	
	            var bx0 = b.x;
	            var bx1 = b.x + b.width;
	            var by0 = b.y;
	            var by1 = b.y + b.height;
	
	            return ! (ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
	        },
	
	        contain: function (x, y) {
	            var rect = this;
	            return x >= rect.x
	                && x <= (rect.x + rect.width)
	                && y >= rect.y
	                && y <= (rect.y + rect.height);
	        },
	
	        /**
	         * @return {module:echarts/core/BoundingRect}
	         */
	        clone: function () {
	            return new BoundingRect(this.x, this.y, this.width, this.height);
	        },
	
	        /**
	         * Copy from another rect
	         */
	        copy: function (other) {
	            this.x = other.x;
	            this.y = other.y;
	            this.width = other.width;
	            this.height = other.height;
	        }
	    };
	
	    module.exports = BoundingRect;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Path 代理，可以在`buildPath`中用于替代`ctx`, 会保存每个path操作的命令到pathCommands属性中
	 * 可以用于 isInsidePath 判断以及获取boundingRect
	 *
	 * @module zrender/core/PathProxy
	 * @author Yi Shen (http://www.github.com/pissang)
	 */
	
	 // TODO getTotalLength, getPointAtLength
	
	
	    var curve = __webpack_require__(27);
	    var vec2 = __webpack_require__(15);
	    var bbox = __webpack_require__(28);
	    var BoundingRect = __webpack_require__(25);
	
	    var CMD = {
	        M: 1,
	        L: 2,
	        C: 3,
	        Q: 4,
	        A: 5,
	        Z: 6,
	        // Rect
	        R: 7
	    };
	
	    var min = [];
	    var max = [];
	    var min2 = [];
	    var max2 = [];
	    var mathMin = Math.min;
	    var mathMax = Math.max;
	    var mathCos = Math.cos;
	    var mathSin = Math.sin;
	    var mathSqrt = Math.sqrt;
	
	    var hasTypedArray = typeof Float32Array != 'undefined';
	
	    /**
	     * @alias module:zrender/core/PathProxy
	     * @constructor
	     */
	    var PathProxy = function () {
	
	        /**
	         * Path data. Stored as flat array
	         * @type {Array.<Object>}
	         */
	        this.data = [];
	
	        this._len = 0;
	
	        this._ctx = null;
	
	        this._xi = 0;
	        this._yi = 0;
	
	        this._x0 = 0;
	        this._y0 = 0;
	    };
	
	    /**
	     * 快速计算Path包围盒（并不是最小包围盒）
	     * @return {Object}
	     */
	    PathProxy.prototype = {
	
	        constructor: PathProxy,
	
	        _lineDash: null,
	
	        _dashOffset: 0,
	
	        _dashIdx: 0,
	
	        _dashSum: 0,
	
	        getContext: function () {
	            return this._ctx;
	        },
	
	        /**
	         * @param  {CanvasRenderingContext2D} ctx
	         * @return {module:zrender/core/PathProxy}
	         */
	        beginPath: function (ctx) {
	            this._ctx = ctx;
	
	            ctx && ctx.beginPath();
	
	            // Reset
	            this._len = 0;
	
	            if (this._lineDash) {
	                this._lineDash = null;
	
	                this._dashOffset = 0;
	            }
	
	            return this;
	        },
	
	        /**
	         * @param  {number} x
	         * @param  {number} y
	         * @return {module:zrender/core/PathProxy}
	         */
	        moveTo: function (x, y) {
	            this.addData(CMD.M, x, y);
	            this._ctx && this._ctx.moveTo(x, y);
	
	            // x0, y0, xi, yi 是记录在 _dashedXXXXTo 方法中使用
	            // xi, yi 记录当前点, x0, y0 在 closePath 的时候回到起始点。
	            // 有可能在 beginPath 之后直接调用 lineTo，这时候 x0, y0 需要
	            // 在 lineTo 方法中记录，这里先不考虑这种情况，dashed line 也只在 IE10- 中不支持
	            this._x0 = x;
	            this._y0 = y;
	
	            this._xi = x;
	            this._yi = y;
	
	            return this;
	        },
	
	        /**
	         * @param  {number} x
	         * @param  {number} y
	         * @return {module:zrender/core/PathProxy}
	         */
	        lineTo: function (x, y) {
	            this.addData(CMD.L, x, y);
	            if (this._ctx) {
	                this._needsDash() ? this._dashedLineTo(x, y)
	                    : this._ctx.lineTo(x, y);
	            }
	            this._xi = x;
	            this._yi = y;
	            return this;
	        },
	
	        /**
	         * @param  {number} x1
	         * @param  {number} y1
	         * @param  {number} x2
	         * @param  {number} y2
	         * @param  {number} x3
	         * @param  {number} y3
	         * @return {module:zrender/core/PathProxy}
	         */
	        bezierCurveTo: function (x1, y1, x2, y2, x3, y3) {
	            this.addData(CMD.C, x1, y1, x2, y2, x3, y3);
	            if (this._ctx) {
	                this._needsDash() ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3)
	                    : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
	            }
	            this._xi = x3;
	            this._yi = y3;
	            return this;
	        },
	
	        /**
	         * @param  {number} x1
	         * @param  {number} y1
	         * @param  {number} x2
	         * @param  {number} y2
	         * @return {module:zrender/core/PathProxy}
	         */
	        quadraticCurveTo: function (x1, y1, x2, y2) {
	            this.addData(CMD.Q, x1, y1, x2, y2);
	            if (this._ctx) {
	                this._needsDash() ? this._dashedQuadraticTo(x1, y1, x2, y2)
	                    : this._ctx.quadraticCurveTo(x1, y1, x2, y2);
	            }
	            this._xi = x2;
	            this._yi = y2;
	            return this;
	        },
	
	        /**
	         * @param  {number} cx
	         * @param  {number} cy
	         * @param  {number} r
	         * @param  {number} startAngle
	         * @param  {number} endAngle
	         * @param  {boolean} anticlockwise
	         * @return {module:zrender/core/PathProxy}
	         */
	        arc: function (cx, cy, r, startAngle, endAngle, anticlockwise) {
	            this.addData(
	                CMD.A, cx, cy, r, r, startAngle, endAngle - startAngle, 0, anticlockwise ? 0 : 1
	            );
	            this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
	
	            this._xi = mathCos(endAngle) * r + cx;
	            this._xi = mathSin(endAngle) * r + cx;
	            return this;
	        },
	
	        // TODO
	        arcTo: function (x1, y1, x2, y2, radius) {
	            if (this._ctx) {
	                this._ctx.arcTo(x1, y1, x2, y2, radius);
	            }
	            return this;
	        },
	
	        // TODO
	        rect: function (x, y, w, h) {
	            this._ctx && this._ctx.rect(x, y, w, h);
	            this.addData(CMD.R, x, y, w, h);
	            return this;
	        },
	
	        /**
	         * @return {module:zrender/core/PathProxy}
	         */
	        closePath: function () {
	            this.addData(CMD.Z);
	
	            var ctx = this._ctx;
	            var x0 = this._x0;
	            var y0 = this._y0;
	            if (ctx) {
	                this._needsDash() && this._dashedLineTo(x0, y0);
	                ctx.closePath();
	            }
	
	            this._xi = x0;
	            this._yi = y0;
	            return this;
	        },
	
	        /**
	         * Context 从外部传入，因为有可能是 rebuildPath 完之后再 fill。
	         * stroke 同样
	         * @param {CanvasRenderingContext2D} ctx
	         * @return {module:zrender/core/PathProxy}
	         */
	        fill: function (ctx) {
	            ctx && ctx.fill();
	            this.toStatic();
	        },
	
	        /**
	         * @param {CanvasRenderingContext2D} ctx
	         * @return {module:zrender/core/PathProxy}
	         */
	        stroke: function (ctx) {
	            ctx && ctx.stroke();
	            this.toStatic();
	        },
	
	        /**
	         * 必须在其它绘制命令前调用
	         * Must be invoked before all other path drawing methods
	         * @return {module:zrender/core/PathProxy}
	         */
	        setLineDash: function (lineDash) {
	            if (lineDash instanceof Array) {
	                this._lineDash = lineDash;
	
	                this._dashIdx = 0;
	
	                var lineDashSum = 0;
	                for (var i = 0; i < lineDash.length; i++) {
	                    lineDashSum += lineDash[i];
	                }
	                this._dashSum = lineDashSum;
	            }
	            return this;
	        },
	
	        /**
	         * 必须在其它绘制命令前调用
	         * Must be invoked before all other path drawing methods
	         * @return {module:zrender/core/PathProxy}
	         */
	        setLineDashOffset: function (offset) {
	            this._dashOffset = offset;
	            return this;
	        },
	
	        /**
	         *
	         * @return {boolean}
	         */
	        len: function () {
	            return this._len;
	        },
	
	        /**
	         * 直接设置 Path 数据
	         */
	        setData: function (data) {
	
	            var len = data.length;
	
	            if (! (this.data && this.data.length == len) && hasTypedArray) {
	                this.data = new Float32Array(len);
	            }
	
	            for (var i = 0; i < len; i++) {
	                this.data[i] = data[i];
	            }
	
	            this._len = len;
	        },
	
	        /**
	         * 添加子路径
	         * @param {module:zrender/core/PathProxy|Array.<module:zrender/core/PathProxy>} path
	         */
	        appendPath: function (path) {
	            if (!(path instanceof Array)) {
	                path = [path];
	            }
	            var len = path.length;
	            var appendSize = 0;
	            var offset = this._len;
	            for (var i = 0; i < len; i++) {
	                appendSize += path[i].len();
	            }
	            if (hasTypedArray && (this.data instanceof Float32Array)) {
	                this.data = new Float32Array(offset + appendSize);
	            }
	            for (var i = 0; i < len; i++) {
	                var appendPathData = path[i].data;
	                for (var k = 0; k < appendPathData.length; k++) {
	                    this.data[offset++] = appendPathData[k];
	                }
	            }
	            this._len = offset;
	        },
	
	        /**
	         * 填充 Path 数据。
	         * 尽量复用而不申明新的数组。大部分图形重绘的指令数据长度都是不变的。
	         */
	        addData: function (cmd) {
	            var data = this.data;
	            if (this._len + arguments.length > data.length) {
	                // 因为之前的数组已经转换成静态的 Float32Array
	                // 所以不够用时需要扩展一个新的动态数组
	                this._expandData();
	                data = this.data;
	            }
	            for (var i = 0; i < arguments.length; i++) {
	                data[this._len++] = arguments[i];
	            }
	
	            this._prevCmd = cmd;
	        },
	
	        _expandData: function () {
	            // Only if data is Float32Array
	            if (!(this.data instanceof Array)) {
	                var newData = [];
	                for (var i = 0; i < this._len; i++) {
	                    newData[i] = this.data[i];
	                }
	                this.data = newData;
	            }
	        },
	
	        /**
	         * If needs js implemented dashed line
	         * @return {boolean}
	         * @private
	         */
	        _needsDash: function () {
	            return this._lineDash;
	        },
	
	        _dashedLineTo: function (x1, y1) {
	            var dashSum = this._dashSum;
	            var offset = this._dashOffset;
	            var lineDash = this._lineDash;
	            var ctx = this._ctx;
	
	            var x0 = this._xi;
	            var y0 = this._yi;
	            var dx = x1 - x0;
	            var dy = y1 - y0;
	            var dist = mathSqrt(dx * dx + dy * dy);
	            var x = x0;
	            var y = y0;
	            var dash;
	            var nDash = lineDash.length;
	            var idx;
	            dx /= dist;
	            dy /= dist;
	
	            if (offset < 0) {
	                // Convert to positive offset
	                offset = dashSum + offset;
	            }
	            offset %= dashSum;
	            x -= offset * dx;
	            y -= offset * dy;
	
	            while ((dx >= 0 && x <= x1) || (dx < 0 && x > x1)) {
	                idx = this._dashIdx;
	                dash = lineDash[idx];
	                x += dx * dash;
	                y += dy * dash;
	                this._dashIdx = (idx + 1) % nDash;
	                // Skip positive offset
	                if ((dx > 0 && x < x0) || (dx < 0 && x > x0)) {
	                    continue;
	                }
	                ctx[idx % 2 ? 'moveTo' : 'lineTo'](
	                    dx >= 0 ? mathMin(x, x1) : mathMax(x, x1),
	                    dy >= 0 ? mathMin(y, y1) : mathMax(y, y1)
	                );
	            }
	            // Offset for next lineTo
	            dx = x - x1;
	            dy = y - y1;
	            this._dashOffset = -mathSqrt(dx * dx + dy * dy);
	        },
	
	        // Not accurate dashed line to
	        _dashedBezierTo: function (x1, y1, x2, y2, x3, y3) {
	            var dashSum = this._dashSum;
	            var offset = this._dashOffset;
	            var lineDash = this._lineDash;
	            var ctx = this._ctx;
	
	            var x0 = this._xi;
	            var y0 = this._yi;
	            var t;
	            var dx;
	            var dy;
	            var cubicAt = curve.cubicAt;
	            var bezierLen = 0;
	            var idx = this._dashIdx;
	            var nDash = lineDash.length;
	
	            var x;
	            var y;
	
	            var tmpLen = 0;
	
	            if (offset < 0) {
	                // Convert to positive offset
	                offset = dashSum + offset;
	            }
	            offset %= dashSum;
	            // Bezier approx length
	            for (t = 0; t < 1; t += 0.1) {
	                dx = cubicAt(x0, x1, x2, x3, t + 0.1)
	                    - cubicAt(x0, x1, x2, x3, t);
	                dy = cubicAt(y0, y1, y2, y3, t + 0.1)
	                    - cubicAt(y0, y1, y2, y3, t);
	                bezierLen += mathSqrt(dx * dx + dy * dy);
	            }
	
	            // Find idx after add offset
	            for (; idx < nDash; idx++) {
	                tmpLen += lineDash[idx];
	                if (tmpLen > offset) {
	                    break;
	                }
	            }
	            t = (tmpLen - offset) / bezierLen;
	
	            while (t <= 1) {
	
	                x = cubicAt(x0, x1, x2, x3, t);
	                y = cubicAt(y0, y1, y2, y3, t);
	
	                // Use line to approximate dashed bezier
	                // Bad result if dash is long
	                idx % 2 ? ctx.moveTo(x, y)
	                    : ctx.lineTo(x, y);
	
	                t += lineDash[idx] / bezierLen;
	
	                idx = (idx + 1) % nDash;
	            }
	
	            // Finish the last segment and calculate the new offset
	            (idx % 2 !== 0) && ctx.lineTo(x3, y3);
	            dx = x3 - x;
	            dy = y3 - y;
	            this._dashOffset = -mathSqrt(dx * dx + dy * dy);
	        },
	
	        _dashedQuadraticTo: function (x1, y1, x2, y2) {
	            // Convert quadratic to cubic using degree elevation
	            var x3 = x2;
	            var y3 = y2;
	            x2 = (x2 + 2 * x1) / 3;
	            y2 = (y2 + 2 * y1) / 3;
	            x1 = (this._xi + 2 * x1) / 3;
	            y1 = (this._yi + 2 * y1) / 3;
	
	            this._dashedBezierTo(x1, y1, x2, y2, x3, y3);
	        },
	
	        /**
	         * 转成静态的 Float32Array 减少堆内存占用
	         * Convert dynamic array to static Float32Array
	         */
	        toStatic: function () {
	            var data = this.data;
	            if (data instanceof Array) {
	                data.length = this._len;
	                if (hasTypedArray) {
	                    this.data = new Float32Array(data);
	                }
	            }
	        },
	
	        /**
	         * @return {module:zrender/core/BoundingRect}
	         */
	        getBoundingRect: function () {
	            min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
	            max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
	
	            var data = this.data;
	            var xi = 0;
	            var yi = 0;
	            var x0 = 0;
	            var y0 = 0;
	
	            for (var i = 0; i < data.length;) {
	                var cmd = data[i++];
	
	                if (i == 1) {
	                    // 如果第一个命令是 L, C, Q
	                    // 则 previous point 同绘制命令的第一个 point
	                    //
	                    // 第一个命令为 Arc 的情况下会在后面特殊处理
	                    xi = data[i];
	                    yi = data[i + 1];
	
	                    x0 = xi;
	                    y0 = yi;
	                }
	
	                switch (cmd) {
	                    case CMD.M:
	                        // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
	                        // 在 closePath 的时候使用
	                        x0 = data[i++];
	                        y0 = data[i++];
	                        xi = x0;
	                        yi = y0;
	                        min2[0] = x0;
	                        min2[1] = y0;
	                        max2[0] = x0;
	                        max2[1] = y0;
	                        break;
	                    case CMD.L:
	                        bbox.fromLine(xi, yi, data[i], data[i + 1], min2, max2);
	                        xi = data[i++];
	                        yi = data[i++];
	                        break;
	                    case CMD.C:
	                        bbox.fromCubic(
	                            xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
	                            min2, max2
	                        );
	                        xi = data[i++];
	                        yi = data[i++];
	                        break;
	                    case CMD.Q:
	                        bbox.fromQuadratic(
	                            xi, yi, data[i++], data[i++], data[i], data[i + 1],
	                            min2, max2
	                        );
	                        xi = data[i++];
	                        yi = data[i++];
	                        break;
	                    case CMD.A:
	                        // TODO Arc 判断的开销比较大
	                        var cx = data[i++];
	                        var cy = data[i++];
	                        var rx = data[i++];
	                        var ry = data[i++];
	                        var startAngle = data[i++];
	                        var endAngle = data[i++] + startAngle;
	                        // TODO Arc 旋转
	                        var psi = data[i++];
	                        var anticlockwise = 1 - data[i++];
	
	                        if (i == 1) {
	                            // 直接使用 arc 命令
	                            // 第一个命令起点还未定义
	                            x0 = mathCos(startAngle) * rx + cx;
	                            y0 = mathSin(startAngle) * ry + cy;
	                        }
	
	                        bbox.fromArc(
	                            cx, cy, rx, ry, startAngle, endAngle,
	                            anticlockwise, min2, max2
	                        );
	
	                        xi = mathCos(endAngle) * rx + cx;
	                        yi = mathSin(endAngle) * ry + cy;
	                        break;
	                    case CMD.R:
	                        x0 = xi = data[i++];
	                        y0 = yi = data[i++];
	                        var width = data[i++];
	                        var height = data[i++];
	                        // Use fromLine
	                        bbox.fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
	                        break;
	                    case CMD.Z:
	                        xi = x0;
	                        yi = y0;
	                        break;
	                }
	
	                // Union
	                vec2.min(min, min, min2);
	                vec2.max(max, max, max2);
	            }
	
	            // No data
	            if (i === 0) {
	                min[0] = min[1] = max[0] = max[1] = 0;
	            }
	
	            return new BoundingRect(
	                min[0], min[1], max[0] - min[0], max[1] - min[1]
	            );
	        },
	
	        /**
	         * Rebuild path from current data
	         * Rebuild path will not consider javascript implemented line dash.
	         * @param {CanvasRenderingContext} ctx
	         */
	        rebuildPath: function (ctx) {
	            var d = this.data;
	            for (var i = 0; i < this._len;) {
	                var cmd = d[i++];
	                switch (cmd) {
	                    case CMD.M:
	                        ctx.moveTo(d[i++], d[i++]);
	                        break;
	                    case CMD.L:
	                        ctx.lineTo(d[i++], d[i++]);
	                        break;
	                    case CMD.C:
	                        ctx.bezierCurveTo(
	                            d[i++], d[i++], d[i++], d[i++], d[i++], d[i++]
	                        );
	                        break;
	                    case CMD.Q:
	                        ctx.quadraticCurveTo(d[i++], d[i++], d[i++], d[i++]);
	                        break;
	                    case CMD.A:
	                        var cx = d[i++];
	                        var cy = d[i++];
	                        var rx = d[i++];
	                        var ry = d[i++];
	                        var theta = d[i++];
	                        var dTheta = d[i++];
	                        var psi = d[i++];
	                        var fs = d[i++];
	                        var r = (rx > ry) ? rx : ry;
	                        var scaleX = (rx > ry) ? 1 : rx / ry;
	                        var scaleY = (rx > ry) ? ry / rx : 1;
	                        var isEllipse = Math.abs(rx - ry) > 1e-3;
	                        if (isEllipse) {
	                            ctx.translate(cx, cy);
	                            ctx.rotate(psi);
	                            ctx.scale(scaleX, scaleY);
	                            ctx.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
	                            ctx.scale(1 / scaleX, 1 / scaleY);
	                            ctx.rotate(-psi);
	                            ctx.translate(-cx, -cy);
	                        }
	                        else {
	                            ctx.arc(cx, cy, r, theta, theta + dTheta, 1 - fs);
	                        }
	                        break;
	                    case CMD.R:
	                        ctx.rect(d[i++], d[i++], d[i++], d[i++]);
	                        break;
	                    case CMD.Z:
	                        ctx.closePath();
	                }
	            }
	        }
	    };
	
	    PathProxy.CMD = CMD;
	
	    module.exports = PathProxy;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 曲线辅助模块
	 * @module zrender/core/curve
	 * @author pissang(https://www.github.com/pissang)
	 */
	
	
	    var vec2 = __webpack_require__(15);
	    var v2Create = vec2.create;
	    var v2DistSquare = vec2.distSquare;
	    var mathPow = Math.pow;
	    var mathSqrt = Math.sqrt;
	
	    var EPSILON = 1e-4;
	
	    var THREE_SQRT = mathSqrt(3);
	    var ONE_THIRD = 1 / 3;
	
	    // 临时变量
	    var _v0 = v2Create();
	    var _v1 = v2Create();
	    var _v2 = v2Create();
	    // var _v3 = vec2.create();
	
	    function isAroundZero(val) {
	        return val > -EPSILON && val < EPSILON;
	    }
	    function isNotAroundZero(val) {
	        return val > EPSILON || val < -EPSILON;
	    }
	    /**
	     * 计算三次贝塞尔值
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {number} t
	     * @return {number}
	     */
	    function cubicAt(p0, p1, p2, p3, t) {
	        var onet = 1 - t;
	        return onet * onet * (onet * p0 + 3 * t * p1)
	             + t * t * (t * p3 + 3 * onet * p2);
	    }
	
	    /**
	     * 计算三次贝塞尔导数值
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {number} t
	     * @return {number}
	     */
	    function cubicDerivativeAt(p0, p1, p2, p3, t) {
	        var onet = 1 - t;
	        return 3 * (
	            ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
	            + (p3 - p2) * t * t
	        );
	    }
	
	    /**
	     * 计算三次贝塞尔方程根，使用盛金公式
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {number} val
	     * @param  {Array.<number>} roots
	     * @return {number} 有效根数目
	     */
	    function cubicRootAt(p0, p1, p2, p3, val, roots) {
	        // Evaluate roots of cubic functions
	        var a = p3 + 3 * (p1 - p2) - p0;
	        var b = 3 * (p2 - p1 * 2 + p0);
	        var c = 3 * (p1  - p0);
	        var d = p0 - val;
	
	        var A = b * b - 3 * a * c;
	        var B = b * c - 9 * a * d;
	        var C = c * c - 3 * b * d;
	
	        var n = 0;
	
	        if (isAroundZero(A) && isAroundZero(B)) {
	            if (isAroundZero(b)) {
	                roots[0] = 0;
	            }
	            else {
	                var t1 = -c / b;  //t1, t2, t3, b is not zero
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	            }
	        }
	        else {
	            var disc = B * B - 4 * A * C;
	
	            if (isAroundZero(disc)) {
	                var K = B / A;
	                var t1 = -b / a + K;  // t1, a is not zero
	                var t2 = -K / 2;  // t2, t3
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	                if (t2 >= 0 && t2 <= 1) {
	                    roots[n++] = t2;
	                }
	            }
	            else if (disc > 0) {
	                var discSqrt = mathSqrt(disc);
	                var Y1 = A * b + 1.5 * a * (-B + discSqrt);
	                var Y2 = A * b + 1.5 * a * (-B - discSqrt);
	                if (Y1 < 0) {
	                    Y1 = -mathPow(-Y1, ONE_THIRD);
	                }
	                else {
	                    Y1 = mathPow(Y1, ONE_THIRD);
	                }
	                if (Y2 < 0) {
	                    Y2 = -mathPow(-Y2, ONE_THIRD);
	                }
	                else {
	                    Y2 = mathPow(Y2, ONE_THIRD);
	                }
	                var t1 = (-b - (Y1 + Y2)) / (3 * a);
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	            }
	            else {
	                var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A));
	                var theta = Math.acos(T) / 3;
	                var ASqrt = mathSqrt(A);
	                var tmp = Math.cos(theta);
	
	                var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
	                var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
	                var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	                if (t2 >= 0 && t2 <= 1) {
	                    roots[n++] = t2;
	                }
	                if (t3 >= 0 && t3 <= 1) {
	                    roots[n++] = t3;
	                }
	            }
	        }
	        return n;
	    }
	
	    /**
	     * 计算三次贝塞尔方程极限值的位置
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {Array.<number>} extrema
	     * @return {number} 有效数目
	     */
	    function cubicExtrema(p0, p1, p2, p3, extrema) {
	        var b = 6 * p2 - 12 * p1 + 6 * p0;
	        var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
	        var c = 3 * p1 - 3 * p0;
	
	        var n = 0;
	        if (isAroundZero(a)) {
	            if (isNotAroundZero(b)) {
	                var t1 = -c / b;
	                if (t1 >= 0 && t1 <=1) {
	                    extrema[n++] = t1;
	                }
	            }
	        }
	        else {
	            var disc = b * b - 4 * a * c;
	            if (isAroundZero(disc)) {
	                extrema[0] = -b / (2 * a);
	            }
	            else if (disc > 0) {
	                var discSqrt = mathSqrt(disc);
	                var t1 = (-b + discSqrt) / (2 * a);
	                var t2 = (-b - discSqrt) / (2 * a);
	                if (t1 >= 0 && t1 <= 1) {
	                    extrema[n++] = t1;
	                }
	                if (t2 >= 0 && t2 <= 1) {
	                    extrema[n++] = t2;
	                }
	            }
	        }
	        return n;
	    }
	
	    /**
	     * 细分三次贝塞尔曲线
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} p3
	     * @param  {number} t
	     * @param  {Array.<number>} out
	     */
	    function cubicSubdivide(p0, p1, p2, p3, t, out) {
	        var p01 = (p1 - p0) * t + p0;
	        var p12 = (p2 - p1) * t + p1;
	        var p23 = (p3 - p2) * t + p2;
	
	        var p012 = (p12 - p01) * t + p01;
	        var p123 = (p23 - p12) * t + p12;
	
	        var p0123 = (p123 - p012) * t + p012;
	        // Seg0
	        out[0] = p0;
	        out[1] = p01;
	        out[2] = p012;
	        out[3] = p0123;
	        // Seg1
	        out[4] = p0123;
	        out[5] = p123;
	        out[6] = p23;
	        out[7] = p3;
	    }
	
	    /**
	     * 投射点到三次贝塞尔曲线上，返回投射距离。
	     * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
	     * @param {number} x0
	     * @param {number} y0
	     * @param {number} x1
	     * @param {number} y1
	     * @param {number} x2
	     * @param {number} y2
	     * @param {number} x3
	     * @param {number} y3
	     * @param {number} x
	     * @param {number} y
	     * @param {Array.<number>} [out] 投射点
	     * @return {number}
	     */
	    function cubicProjectPoint(
	        x0, y0, x1, y1, x2, y2, x3, y3,
	        x, y, out
	    ) {
	        // http://pomax.github.io/bezierinfo/#projections
	        var t;
	        var interval = 0.005;
	        var d = Infinity;
	        var prev;
	        var next;
	        var d1;
	        var d2;
	
	        _v0[0] = x;
	        _v0[1] = y;
	
	        // 先粗略估计一下可能的最小距离的 t 值
	        // PENDING
	        for (var _t = 0; _t < 1; _t += 0.05) {
	            _v1[0] = cubicAt(x0, x1, x2, x3, _t);
	            _v1[1] = cubicAt(y0, y1, y2, y3, _t);
	            d1 = v2DistSquare(_v0, _v1);
	            if (d1 < d) {
	                t = _t;
	                d = d1;
	            }
	        }
	        d = Infinity;
	
	        // At most 32 iteration
	        for (var i = 0; i < 32; i++) {
	            if (interval < EPSILON) {
	                break;
	            }
	            prev = t - interval;
	            next = t + interval;
	            // t - interval
	            _v1[0] = cubicAt(x0, x1, x2, x3, prev);
	            _v1[1] = cubicAt(y0, y1, y2, y3, prev);
	
	            d1 = v2DistSquare(_v1, _v0);
	
	            if (prev >= 0 && d1 < d) {
	                t = prev;
	                d = d1;
	            }
	            else {
	                // t + interval
	                _v2[0] = cubicAt(x0, x1, x2, x3, next);
	                _v2[1] = cubicAt(y0, y1, y2, y3, next);
	                d2 = v2DistSquare(_v2, _v0);
	
	                if (next <= 1 && d2 < d) {
	                    t = next;
	                    d = d2;
	                }
	                else {
	                    interval *= 0.5;
	                }
	            }
	        }
	        // t
	        if (out) {
	            out[0] = cubicAt(x0, x1, x2, x3, t);
	            out[1] = cubicAt(y0, y1, y2, y3, t);
	        }
	        // console.log(interval, i);
	        return mathSqrt(d);
	    }
	
	    /**
	     * 计算二次方贝塞尔值
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} t
	     * @return {number}
	     */
	    function quadraticAt(p0, p1, p2, t) {
	        var onet = 1 - t;
	        return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
	    }
	
	    /**
	     * 计算二次方贝塞尔导数值
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} t
	     * @return {number}
	     */
	    function quadraticDerivativeAt(p0, p1, p2, t) {
	        return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
	    }
	
	    /**
	     * 计算二次方贝塞尔方程根
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} t
	     * @param  {Array.<number>} roots
	     * @return {number} 有效根数目
	     */
	    function quadraticRootAt(p0, p1, p2, val, roots) {
	        var a = p0 - 2 * p1 + p2;
	        var b = 2 * (p1 - p0);
	        var c = p0 - val;
	
	        var n = 0;
	        if (isAroundZero(a)) {
	            if (isNotAroundZero(b)) {
	                var t1 = -c / b;
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	            }
	        }
	        else {
	            var disc = b * b - 4 * a * c;
	            if (isAroundZero(disc)) {
	                var t1 = -b / (2 * a);
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	            }
	            else if (disc > 0) {
	                var discSqrt = mathSqrt(disc);
	                var t1 = (-b + discSqrt) / (2 * a);
	                var t2 = (-b - discSqrt) / (2 * a);
	                if (t1 >= 0 && t1 <= 1) {
	                    roots[n++] = t1;
	                }
	                if (t2 >= 0 && t2 <= 1) {
	                    roots[n++] = t2;
	                }
	            }
	        }
	        return n;
	    }
	
	    /**
	     * 计算二次贝塞尔方程极限值
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @return {number}
	     */
	    function quadraticExtremum(p0, p1, p2) {
	        var divider = p0 + p2 - 2 * p1;
	        if (divider === 0) {
	            // p1 is center of p0 and p2
	            return 0.5;
	        }
	        else {
	            return (p0 - p1) / divider;
	        }
	    }
	
	    /**
	     * 细分二次贝塞尔曲线
	     * @memberOf module:zrender/core/curve
	     * @param  {number} p0
	     * @param  {number} p1
	     * @param  {number} p2
	     * @param  {number} t
	     * @param  {Array.<number>} out
	     */
	    function quadraticSubdivide(p0, p1, p2, t, out) {
	        var p01 = (p1 - p0) * t + p0;
	        var p12 = (p2 - p1) * t + p1;
	        var p012 = (p12 - p01) * t + p01;
	
	        // Seg0
	        out[0] = p0;
	        out[1] = p01;
	        out[2] = p012;
	
	        // Seg1
	        out[3] = p012;
	        out[4] = p12;
	        out[5] = p2;
	    }
	
	    /**
	     * 投射点到二次贝塞尔曲线上，返回投射距离。
	     * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
	     * @param {number} x0
	     * @param {number} y0
	     * @param {number} x1
	     * @param {number} y1
	     * @param {number} x2
	     * @param {number} y2
	     * @param {number} x
	     * @param {number} y
	     * @param {Array.<number>} out 投射点
	     * @return {number}
	     */
	    function quadraticProjectPoint(
	        x0, y0, x1, y1, x2, y2,
	        x, y, out
	    ) {
	        // http://pomax.github.io/bezierinfo/#projections
	        var t;
	        var interval = 0.005;
	        var d = Infinity;
	
	        _v0[0] = x;
	        _v0[1] = y;
	
	        // 先粗略估计一下可能的最小距离的 t 值
	        // PENDING
	        for (var _t = 0; _t < 1; _t += 0.05) {
	            _v1[0] = quadraticAt(x0, x1, x2, _t);
	            _v1[1] = quadraticAt(y0, y1, y2, _t);
	            var d1 = v2DistSquare(_v0, _v1);
	            if (d1 < d) {
	                t = _t;
	                d = d1;
	            }
	        }
	        d = Infinity;
	
	        // At most 32 iteration
	        for (var i = 0; i < 32; i++) {
	            if (interval < EPSILON) {
	                break;
	            }
	            var prev = t - interval;
	            var next = t + interval;
	            // t - interval
	            _v1[0] = quadraticAt(x0, x1, x2, prev);
	            _v1[1] = quadraticAt(y0, y1, y2, prev);
	
	            var d1 = v2DistSquare(_v1, _v0);
	
	            if (prev >= 0 && d1 < d) {
	                t = prev;
	                d = d1;
	            }
	            else {
	                // t + interval
	                _v2[0] = quadraticAt(x0, x1, x2, next);
	                _v2[1] = quadraticAt(y0, y1, y2, next);
	                var d2 = v2DistSquare(_v2, _v0);
	                if (next <= 1 && d2 < d) {
	                    t = next;
	                    d = d2;
	                }
	                else {
	                    interval *= 0.5;
	                }
	            }
	        }
	        // t
	        if (out) {
	            out[0] = quadraticAt(x0, x1, x2, t);
	            out[1] = quadraticAt(y0, y1, y2, t);
	        }
	        // console.log(interval, i);
	        return mathSqrt(d);
	    }
	
	    module.exports = {
	
	        cubicAt: cubicAt,
	
	        cubicDerivativeAt: cubicDerivativeAt,
	
	        cubicRootAt: cubicRootAt,
	
	        cubicExtrema: cubicExtrema,
	
	        cubicSubdivide: cubicSubdivide,
	
	        cubicProjectPoint: cubicProjectPoint,
	
	        quadraticAt: quadraticAt,
	
	        quadraticDerivativeAt: quadraticDerivativeAt,
	
	        quadraticRootAt: quadraticRootAt,
	
	        quadraticExtremum: quadraticExtremum,
	
	        quadraticSubdivide: quadraticSubdivide,
	
	        quadraticProjectPoint: quadraticProjectPoint
	    };


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Yi Shen(https://github.com/pissang)
	 */
	
	
	    var vec2 = __webpack_require__(15);
	    var curve = __webpack_require__(27);
	
	    var bbox = {};
	    var mathMin = Math.min;
	    var mathMax = Math.max;
	    var mathSin = Math.sin;
	    var mathCos = Math.cos;
	
	    var start = vec2.create();
	    var end = vec2.create();
	    var extremity = vec2.create();
	
	    var PI2 = Math.PI * 2;
	    /**
	     * 从顶点数组中计算出最小包围盒，写入`min`和`max`中
	     * @module zrender/core/bbox
	     * @param {Array<Object>} points 顶点数组
	     * @param {number} min
	     * @param {number} max
	     */
	    bbox.fromPoints = function(points, min, max) {
	        if (points.length === 0) {
	            return;
	        }
	        var p = points[0];
	        var left = p[0];
	        var right = p[0];
	        var top = p[1];
	        var bottom = p[1];
	        var i;
	
	        for (i = 1; i < points.length; i++) {
	            p = points[i];
	            left = mathMin(left, p[0]);
	            right = mathMax(right, p[0]);
	            top = mathMin(top, p[1]);
	            bottom = mathMax(bottom, p[1]);
	        }
	
	        min[0] = left;
	        min[1] = top;
	        max[0] = right;
	        max[1] = bottom;
	    };
	
	    /**
	     * @memberOf module:zrender/core/bbox
	     * @param {number} x0
	     * @param {number} y0
	     * @param {number} x1
	     * @param {number} y1
	     * @param {Array.<number>} min
	     * @param {Array.<number>} max
	     */
	    bbox.fromLine = function (x0, y0, x1, y1, min, max) {
	        min[0] = mathMin(x0, x1);
	        min[1] = mathMin(y0, y1);
	        max[0] = mathMax(x0, x1);
	        max[1] = mathMax(y0, y1);
	    };
	
	    /**
	     * 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒，写入`min`和`max`中
	     * @memberOf module:zrender/core/bbox
	     * @param {number} x0
	     * @param {number} y0
	     * @param {number} x1
	     * @param {number} y1
	     * @param {number} x2
	     * @param {number} y2
	     * @param {number} x3
	     * @param {number} y3
	     * @param {Array.<number>} min
	     * @param {Array.<number>} max
	     */
	    bbox.fromCubic = function(
	        x0, y0, x1, y1, x2, y2, x3, y3, min, max
	    ) {
	        var xDim = [];
	        var yDim = [];
	        var cubicExtrema = curve.cubicExtrema;
	        var cubicAt = curve.cubicAt;
	        var left, right, top, bottom;
	        var i;
	        var n = cubicExtrema(x0, x1, x2, x3, xDim);
	
	        for (i = 0; i < n; i++) {
	            xDim[i] = cubicAt(x0, x1, x2, x3, xDim[i]);
	        }
	        n = cubicExtrema(y0, y1, y2, y3, yDim);
	        for (i = 0; i < n; i++) {
	            yDim[i] = cubicAt(y0, y1, y2, y3, yDim[i]);
	        }
	
	        xDim.push(x0, x3);
	        yDim.push(y0, y3);
	
	        left = mathMin.apply(null, xDim);
	        right = mathMax.apply(null, xDim);
	        top = mathMin.apply(null, yDim);
	        bottom = mathMax.apply(null, yDim);
	
	        min[0] = left;
	        min[1] = top;
	        max[0] = right;
	        max[1] = bottom;
	    };
	
	    /**
	     * 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒，写入`min`和`max`中
	     * @memberOf module:zrender/core/bbox
	     * @param {number} x0
	     * @param {number} y0
	     * @param {number} x1
	     * @param {number} y1
	     * @param {number} x2
	     * @param {number} y2
	     * @param {Array.<number>} min
	     * @param {Array.<number>} max
	     */
	    bbox.fromQuadratic = function(x0, y0, x1, y1, x2, y2, min, max) {
	        var quadraticExtremum = curve.quadraticExtremum;
	        var quadraticAt = curve.quadraticAt;
	        // Find extremities, where derivative in x dim or y dim is zero
	        var tx =
	            mathMax(
	                mathMin(quadraticExtremum(x0, x1, x2), 1), 0
	            );
	        var ty =
	            mathMax(
	                mathMin(quadraticExtremum(y0, y1, y2), 1), 0
	            );
	
	        var x = quadraticAt(x0, x1, x2, tx);
	        var y = quadraticAt(y0, y1, y2, ty);
	
	        min[0] = mathMin(x0, x2, x);
	        min[1] = mathMin(y0, y2, y);
	        max[0] = mathMax(x0, x2, x);
	        max[1] = mathMax(y0, y2, y);
	    };
	
	    /**
	     * 从圆弧中计算出最小包围盒，写入`min`和`max`中
	     * @method
	     * @memberOf module:zrender/core/bbox
	     * @param {number} x
	     * @param {number} y
	     * @param {number} rx
	     * @param {number} ry
	     * @param {number} startAngle
	     * @param {number} endAngle
	     * @param {number} anticlockwise
	     * @param {Array.<number>} min
	     * @param {Array.<number>} max
	     */
	    bbox.fromArc = function (
	        x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max
	    ) {
	        var vec2Min = vec2.min;
	        var vec2Max = vec2.max;
	
	        var diff = Math.abs(startAngle - endAngle);
	
	
	        if (diff % PI2 < 1e-4 && diff > 1e-4) {
	            // Is a circle
	            min[0] = x - rx;
	            min[1] = y - ry;
	            max[0] = x + rx;
	            max[1] = y + ry;
	            return;
	        }
	
	        start[0] = mathCos(startAngle) * rx + x;
	        start[1] = mathSin(startAngle) * ry + y;
	
	        end[0] = mathCos(endAngle) * rx + x;
	        end[1] = mathSin(endAngle) * ry + y;
	
	        vec2Min(min, start, end);
	        vec2Max(max, start, end);
	
	        // Thresh to [0, Math.PI * 2]
	        startAngle = startAngle % (PI2);
	        if (startAngle < 0) {
	            startAngle = startAngle + PI2;
	        }
	        endAngle = endAngle % (PI2);
	        if (endAngle < 0) {
	            endAngle = endAngle + PI2;
	        }
	
	        if (startAngle > endAngle && !anticlockwise) {
	            endAngle += PI2;
	        }
	        else if (startAngle < endAngle && anticlockwise) {
	            startAngle += PI2;
	        }
	        if (anticlockwise) {
	            var tmp = endAngle;
	            endAngle = startAngle;
	            startAngle = tmp;
	        }
	
	        // var number = 0;
	        // var step = (anticlockwise ? -Math.PI : Math.PI) / 2;
	        for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
	            if (angle > startAngle) {
	                extremity[0] = mathCos(angle) * rx + x;
	                extremity[1] = mathSin(angle) * ry + y;
	
	                vec2Min(min, extremity, min);
	                vec2Max(max, extremity, max);
	            }
	        }
	    };
	
	    module.exports = bbox;
	


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	    var CMD = __webpack_require__(26).CMD;
	    var line = __webpack_require__(30);
	    var cubic = __webpack_require__(31);
	    var quadratic = __webpack_require__(32);
	    var arc = __webpack_require__(33);
	    var normalizeRadian = __webpack_require__(34).normalizeRadian;
	    var curve = __webpack_require__(27);
	
	    var windingLine = __webpack_require__(35);
	
	    var containStroke = line.containStroke;
	
	    var PI2 = Math.PI * 2;
	
	    var EPSILON = 1e-4;
	
	    function isAroundEqual(a, b) {
	        return Math.abs(a - b) < EPSILON;
	    }
	
	    // 临时数组
	    var roots = [-1, -1, -1];
	    var extrema = [-1, -1];
	
	    function swapExtrema() {
	        var tmp = extrema[0];
	        extrema[0] = extrema[1];
	        extrema[1] = tmp;
	    }
	
	    function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
	        // Quick reject
	        if (
	            (y > y0 && y > y1 && y > y2 && y > y3)
	            || (y < y0 && y < y1 && y < y2 && y < y3)
	        ) {
	            return 0;
	        }
	        var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
	        if (nRoots === 0) {
	            return 0;
	        }
	        else {
	            var w = 0;
	            var nExtrema = -1;
	            var y0_, y1_;
	            for (var i = 0; i < nRoots; i++) {
	                var t = roots[i];
	                var x_ = curve.cubicAt(x0, x1, x2, x3, t);
	                if (x_ < x) { // Quick reject
	                    continue;
	                }
	                if (nExtrema < 0) {
	                    nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
	                    if (extrema[1] < extrema[0] && nExtrema > 1) {
	                        swapExtrema();
	                    }
	                    y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
	                    if (nExtrema > 1) {
	                        y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
	                    }
	                }
	                if (nExtrema == 2) {
	                    // 分成三段单调函数
	                    if (t < extrema[0]) {
	                        w += y0_ < y0 ? 1 : -1;
	                    }
	                    else if (t < extrema[1]) {
	                        w += y1_ < y0_ ? 1 : -1;
	                    }
	                    else {
	                        w += y3 < y1_ ? 1 : -1;
	                    }
	                }
	                else {
	                    // 分成两段单调函数
	                    if (t < extrema[0]) {
	                        w += y0_ < y0 ? 1 : -1;
	                    }
	                    else {
	                        w += y3 < y0_ ? 1 : -1;
	                    }
	                }
	            }
	            return w;
	        }
	    }
	
	    function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
	        // Quick reject
	        if (
	            (y > y0 && y > y1 && y > y2)
	            || (y < y0 && y < y1 && y < y2)
	        ) {
	            return 0;
	        }
	        var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
	        if (nRoots === 0) {
	            return 0;
	        }
	        else {
	            var t = curve.quadraticExtremum(y0, y1, y2);
	            if (t >=0 && t <= 1) {
	                var w = 0;
	                var y_ = curve.quadraticAt(y0, y1, y2, t);
	                for (var i = 0; i < nRoots; i++) {
	                    var x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
	                    if (x_ > x) {
	                        continue;
	                    }
	                    if (roots[i] < t) {
	                        w += y_ < y0 ? 1 : -1;
	                    }
	                    else {
	                        w += y2 < y_ ? 1 : -1;
	                    }
	                }
	                return w;
	            }
	            else {
	                var x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
	                if (x_ > x) {
	                    return 0;
	                }
	                return y2 < y0 ? 1 : -1;
	            }
	        }
	    }
	
	    // TODO
	    // Arc 旋转
	    function windingArc(
	        cx, cy, r, startAngle, endAngle, anticlockwise, x, y
	    ) {
	        y -= cy;
	        if (y > r || y < -r) {
	            return 0;
	        }
	        var tmp = Math.sqrt(r * r - y * y);
	        roots[0] = -tmp;
	        roots[1] = tmp;
	
	        var diff = Math.abs(startAngle - endAngle);
	        if (diff < 1e-4) {
	            return 0;
	        }
	        if (diff % PI2 < 1e-4) {
	            // Is a circle
	            startAngle = 0;
	            endAngle = PI2;
	            var dir = anticlockwise ? 1 : -1;
	            if (x >= roots[0] + cx && x <= roots[1] + cx) {
	                return dir;
	            } else {
	                return 0;
	            }
	        }
	
	        if (anticlockwise) {
	            var tmp = startAngle;
	            startAngle = normalizeRadian(endAngle);
	            endAngle = normalizeRadian(tmp);
	        }
	        else {
	            startAngle = normalizeRadian(startAngle);
	            endAngle = normalizeRadian(endAngle);
	        }
	        if (startAngle > endAngle) {
	            endAngle += PI2;
	        }
	
	        var w = 0;
	        for (var i = 0; i < 2; i++) {
	            var x_ = roots[i];
	            if (x_ + cx > x) {
	                var angle = Math.atan2(y, x_);
	                var dir = anticlockwise ? 1 : -1;
	                if (angle < 0) {
	                    angle = PI2 + angle;
	                }
	                if (
	                    (angle >= startAngle && angle <= endAngle)
	                    || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
	                ) {
	                    if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
	                        dir = -dir;
	                    }
	                    w += dir;
	                }
	            }
	        }
	        return w;
	    }
	
	    function containPath(data, lineWidth, isStroke, x, y) {
	        var w = 0;
	        var xi = 0;
	        var yi = 0;
	        var x0 = 0;
	        var y0 = 0;
	
	        for (var i = 0; i < data.length;) {
	            var cmd = data[i++];
	            // Begin a new subpath
	            if (cmd === CMD.M && i > 1) {
	                // Close previous subpath
	                if (!isStroke) {
	                    w += windingLine(xi, yi, x0, y0, x, y);
	                }
	                // 如果被任何一个 subpath 包含
	                if (w !== 0) {
	                    return true;
	                }
	            }
	
	            if (i == 1) {
	                // 如果第一个命令是 L, C, Q
	                // 则 previous point 同绘制命令的第一个 point
	                //
	                // 第一个命令为 Arc 的情况下会在后面特殊处理
	                xi = data[i];
	                yi = data[i + 1];
	
	                x0 = xi;
	                y0 = yi;
	            }
	
	            switch (cmd) {
	                case CMD.M:
	                    // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
	                    // 在 closePath 的时候使用
	                    x0 = data[i++];
	                    y0 = data[i++];
	                    xi = x0;
	                    yi = y0;
	                    break;
	                case CMD.L:
	                    if (isStroke) {
	                        if (containStroke(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
	                            return true;
	                        }
	                    }
	                    else {
	                        // NOTE 在第一个命令为 L, C, Q 的时候会计算出 NaN
	                        w += windingLine(xi, yi, data[i], data[i + 1], x, y) || 0;
	                    }
	                    xi = data[i++];
	                    yi = data[i++];
	                    break;
	                case CMD.C:
	                    if (isStroke) {
	                        if (cubic.containStroke(xi, yi,
	                            data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
	                            lineWidth, x, y
	                        )) {
	                            return true;
	                        }
	                    }
	                    else {
	                        w += windingCubic(
	                            xi, yi,
	                            data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
	                            x, y
	                        ) || 0;
	                    }
	                    xi = data[i++];
	                    yi = data[i++];
	                    break;
	                case CMD.Q:
	                    if (isStroke) {
	                        if (quadratic.containStroke(xi, yi,
	                            data[i++], data[i++], data[i], data[i + 1],
	                            lineWidth, x, y
	                        )) {
	                            return true;
	                        }
	                    }
	                    else {
	                        w += windingQuadratic(
	                            xi, yi,
	                            data[i++], data[i++], data[i], data[i + 1],
	                            x, y
	                        ) || 0;
	                    }
	                    xi = data[i++];
	                    yi = data[i++];
	                    break;
	                case CMD.A:
	                    // TODO Arc 判断的开销比较大
	                    var cx = data[i++];
	                    var cy = data[i++];
	                    var rx = data[i++];
	                    var ry = data[i++];
	                    var theta = data[i++];
	                    var dTheta = data[i++];
	                    // TODO Arc 旋转
	                    var psi = data[i++];
	                    var anticlockwise = 1 - data[i++];
	                    var x1 = Math.cos(theta) * rx + cx;
	                    var y1 = Math.sin(theta) * ry + cy;
	                    // 不是直接使用 arc 命令
	                    if (i > 1) {
	                        w += windingLine(xi, yi, x1, y1, x, y);
	                    }
	                    else {
	                        // 第一个命令起点还未定义
	                        x0 = x1;
	                        y0 = y1;
	                    }
	                    // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
	                    var _x = (x - cx) * ry / rx + cx;
	                    if (isStroke) {
	                        if (arc.containStroke(
	                            cx, cy, ry, theta, theta + dTheta, anticlockwise,
	                            lineWidth, _x, y
	                        )) {
	                            return true;
	                        }
	                    }
	                    else {
	                        w += windingArc(
	                            cx, cy, ry, theta, theta + dTheta, anticlockwise,
	                            _x, y
	                        );
	                    }
	                    xi = Math.cos(theta + dTheta) * rx + cx;
	                    yi = Math.sin(theta + dTheta) * ry + cy;
	                    break;
	                case CMD.R:
	                    x0 = xi = data[i++];
	                    y0 = yi = data[i++];
	                    var width = data[i++];
	                    var height = data[i++];
	                    var x1 = x0 + width;
	                    var y1 = y0 + height;
	                    if (isStroke) {
	                        if (containStroke(x0, y0, x1, y0, lineWidth, x, y)
	                          || containStroke(x1, y0, x1, y1, lineWidth, x, y)
	                          || containStroke(x1, y1, x0, y1, lineWidth, x, y)
	                          || containStroke(x0, y1, x1, y1, lineWidth, x, y)
	                        ) {
	                            return true;
	                        }
	                    }
	                    else {
	                        // FIXME Clockwise ?
	                        w += windingLine(x1, y0, x1, y1, x, y);
	                        w += windingLine(x0, y1, x0, y0, x, y);
	                    }
	                    break;
	                case CMD.Z:
	                    if (isStroke) {
	                        if (containStroke(
	                            xi, yi, x0, y0, lineWidth, x, y
	                        )) {
	                            return true;
	                        }
	                    }
	                    else {
	                        // Close a subpath
	                        w += windingLine(xi, yi, x0, y0, x, y);
	                        // 如果被任何一个 subpath 包含
	                        if (w !== 0) {
	                            return true;
	                        }
	                    }
	                    xi = x0;
	                    yi = y0;
	                    break;
	            }
	        }
	        if (!isStroke && !isAroundEqual(yi, y0)) {
	            w += windingLine(xi, yi, x0, y0, x, y) || 0;
	        }
	        return w !== 0;
	    }
	
	    module.exports = {
	        contain: function (pathData, x, y) {
	            return containPath(pathData, 0, false, x, y);
	        },
	
	        containStroke: function (pathData, lineWidth, x, y) {
	            return containPath(pathData, lineWidth, true, x, y);
	        }
	    };


/***/ },
/* 30 */
/***/ function(module, exports) {

	
	    module.exports = {
	        /**
	         * 线段包含判断
	         * @param  {number}  x0
	         * @param  {number}  y0
	         * @param  {number}  x1
	         * @param  {number}  y1
	         * @param  {number}  lineWidth
	         * @param  {number}  x
	         * @param  {number}  y
	         * @return {boolean}
	         */
	        containStroke: function (x0, y0, x1, y1, lineWidth, x, y) {
	            if (lineWidth === 0) {
	                return false;
	            }
	            var _l = lineWidth;
	            var _a = 0;
	            var _b = x0;
	            // Quick reject
	            if (
	                (y > y0 + _l && y > y1 + _l)
	                || (y < y0 - _l && y < y1 - _l)
	                || (x > x0 + _l && x > x1 + _l)
	                || (x < x0 - _l && x < x1 - _l)
	            ) {
	                return false;
	            }
	
	            if (x0 !== x1) {
	                _a = (y0 - y1) / (x0 - x1);
	                _b = (x0 * y1 - x1 * y0) / (x0 - x1) ;
	            }
	            else {
	                return Math.abs(x - x0) <= _l / 2;
	            }
	            var tmp = _a * x - y + _b;
	            var _s = tmp * tmp / (_a * _a + 1);
	            return _s <= _l / 2 * _l / 2;
	        }
	    };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var curve = __webpack_require__(27);
	
	    module.exports = {
	        /**
	         * 三次贝塞尔曲线描边包含判断
	         * @param  {number}  x0
	         * @param  {number}  y0
	         * @param  {number}  x1
	         * @param  {number}  y1
	         * @param  {number}  x2
	         * @param  {number}  y2
	         * @param  {number}  x3
	         * @param  {number}  y3
	         * @param  {number}  lineWidth
	         * @param  {number}  x
	         * @param  {number}  y
	         * @return {boolean}
	         */
	        containStroke: function(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
	            if (lineWidth === 0) {
	                return false;
	            }
	            var _l = lineWidth;
	            // Quick reject
	            if (
	                (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
	                || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
	                || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
	                || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
	            ) {
	                return false;
	            }
	            var d = curve.cubicProjectPoint(
	                x0, y0, x1, y1, x2, y2, x3, y3,
	                x, y, null
	            );
	            return d <= _l / 2;
	        }
	    };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var curve = __webpack_require__(27);
	
	    module.exports = {
	        /**
	         * 二次贝塞尔曲线描边包含判断
	         * @param  {number}  x0
	         * @param  {number}  y0
	         * @param  {number}  x1
	         * @param  {number}  y1
	         * @param  {number}  x2
	         * @param  {number}  y2
	         * @param  {number}  lineWidth
	         * @param  {number}  x
	         * @param  {number}  y
	         * @return {boolean}
	         */
	        containStroke: function (x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
	            if (lineWidth === 0) {
	                return false;
	            }
	            var _l = lineWidth;
	            // Quick reject
	            if (
	                (y > y0 + _l && y > y1 + _l && y > y2 + _l)
	                || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
	                || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
	                || (x < x0 - _l && x < x1 - _l && x < x2 - _l)
	            ) {
	                return false;
	            }
	            var d = curve.quadraticProjectPoint(
	                x0, y0, x1, y1, x2, y2,
	                x, y, null
	            );
	            return d <= _l / 2;
	        }
	    };


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var normalizeRadian = __webpack_require__(34).normalizeRadian;
	    var PI2 = Math.PI * 2;
	
	    module.exports = {
	        /**
	         * 圆弧描边包含判断
	         * @param  {number}  cx
	         * @param  {number}  cy
	         * @param  {number}  r
	         * @param  {number}  startAngle
	         * @param  {number}  endAngle
	         * @param  {boolean}  anticlockwise
	         * @param  {number} lineWidth
	         * @param  {number}  x
	         * @param  {number}  y
	         * @return {Boolean}
	         */
	        containStroke: function (
	            cx, cy, r, startAngle, endAngle, anticlockwise,
	            lineWidth, x, y
	        ) {
	
	            if (lineWidth === 0) {
	                return false;
	            }
	            var _l = lineWidth;
	
	            x -= cx;
	            y -= cy;
	            var d = Math.sqrt(x * x + y * y);
	
	            if ((d - _l > r) || (d + _l < r)) {
	                return false;
	            }
	            if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
	                // Is a circle
	                return true;
	            }
	            if (anticlockwise) {
	                var tmp = startAngle;
	                startAngle = normalizeRadian(endAngle);
	                endAngle = normalizeRadian(tmp);
	            } else {
	                startAngle = normalizeRadian(startAngle);
	                endAngle = normalizeRadian(endAngle);
	            }
	            if (startAngle > endAngle) {
	                endAngle += PI2;
	            }
	
	            var angle = Math.atan2(y, x);
	            if (angle < 0) {
	                angle += PI2;
	            }
	            return (angle >= startAngle && angle <= endAngle)
	                || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
	        }
	    };


/***/ },
/* 34 */
/***/ function(module, exports) {

	
	
	    var PI2 = Math.PI * 2;
	    module.exports = {
	        normalizeRadian: function(angle) {
	            angle %= PI2;
	            if (angle < 0) {
	                angle += PI2;
	            }
	            return angle;
	        }
	    };


/***/ },
/* 35 */
/***/ function(module, exports) {

	
	    module.exports = function windingLine(x0, y0, x1, y1, x, y) {
	        if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
	            return 0;
	        }
	        if (y1 === y0) {
	            return 0;
	        }
	        var dir = y1 < y0 ? 1 : -1;
	        var t = (y - y0) / (y1 - y0);
	        var x_ = t * (x1 - x0) + x0;
	
	        return x_ > x ? dir : 0;
	    };


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var CMD = __webpack_require__(26).CMD;
	    var vec2 = __webpack_require__(15);
	    var v2ApplyTransform = vec2.applyTransform;
	
	    var points = [[], [], []];
	    var mathSqrt = Math.sqrt;
	    var mathAtan2 = Math.atan2;
	    function transformPath(path, m) {
	        var data = path.data;
	        var cmd;
	        var nPoint;
	        var i;
	        var j;
	        var k;
	        var p;
	
	        var M = CMD.M;
	        var C = CMD.C;
	        var L = CMD.L;
	        var R = CMD.R;
	        var A = CMD.A;
	        var Q = CMD.Q;
	
	        for (i = 0, j = 0; i < data.length;) {
	            cmd = data[i++];
	            j = i;
	            nPoint = 0;
	
	            switch (cmd) {
	                case M:
	                    nPoint = 1;
	                    break;
	                case L:
	                    nPoint = 1;
	                    break;
	                case C:
	                    nPoint = 3;
	                    break;
	                case Q:
	                    nPoint = 2;
	                    break;
	                case A:
	                    var x = m[4];
	                    var y = m[5];
	                    var sx = mathSqrt(m[0] * m[0] + m[1] * m[1]);
	                    var sy = mathSqrt(m[2] * m[2] + m[3] * m[3]);
	                    var angle = mathAtan2(-m[1] / sy, m[0] / sx);
	                    // cx
	                    data[i++] += x;
	                    // cy
	                    data[i++] += y;
	                    // Scale rx and ry
	                    // FIXME Assume psi is 0 here
	                    data[i++] *= sx;
	                    data[i++] *= sy;
	
	                    // Start angle
	                    data[i++] += angle;
	                    // end angle
	                    data[i++] += angle;
	                    // FIXME psi
	                    i += 2;
	                    j = i;
	                    break;
	                case R:
	                    // x0, y0
	                    p[0] = data[i++];
	                    p[1] = data[i++];
	                    v2ApplyTransform(p, p, m);
	                    data[j++] = p[0];
	                    data[j++] = p[1];
	                    // x1, y1
	                    p[0] += data[i++];
	                    p[1] += data[i++];
	                    v2ApplyTransform(p, p, m);
	                    data[j++] = p[0];
	                    data[j++] = p[1];
	            }
	
	            for (k = 0; k < nPoint; k++) {
	                var p = points[k];
	                p[0] = data[i++];
	                p[1] = data[i++];
	
	                v2ApplyTransform(p, p, m);
	                // Write back
	                data[j++] = p[0];
	                data[j++] = p[1];
	            }
	        }
	    }
	
	    module.exports = transformPath;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
	 * @module zrender/graphic/Group
	 * @example
	 *     var Group = require('zrender/lib/container/Group');
	 *     var Circle = require('zrender/lib/graphic/shape/Circle');
	 *     var g = new Group();
	 *     g.position[0] = 100;
	 *     g.position[1] = 100;
	 *     g.add(new Circle({
	 *         style: {
	 *             x: 100,
	 *             y: 100,
	 *             r: 20,
	 *         }
	 *     }));
	 *     zr.add(g);
	 */
	
	
	    var zrUtil = __webpack_require__(4);
	    var Element = __webpack_require__(10);
	    var BoundingRect = __webpack_require__(25);
	
	    /**
	     * @alias module:zrender/graphic/Group
	     * @constructor
	     * @extends module:zrender/mixin/Transformable
	     * @extends module:zrender/mixin/Eventful
	     */
	    var Group = function (opts) {
	
	        opts = opts || {};
	
	        Element.call(this, opts);
	
	        for (var key in opts) {
	            this[key] = opts[key];
	        }
	
	        this._children = [];
	
	        this.__storage = null;
	
	        this.__dirty = true;
	    };
	
	    Group.prototype = {
	
	        constructor: Group,
	
	        /**
	         * @type {string}
	         */
	        type: 'group',
	
	        /**
	         * @return {Array.<module:zrender/Element>}
	         */
	        children: function () {
	            return this._children.slice();
	        },
	
	        /**
	         * 获取指定 index 的儿子节点
	         * @param  {number} idx
	         * @return {module:zrender/Element}
	         */
	        childAt: function (idx) {
	            return this._children[idx];
	        },
	
	        /**
	         * 获取指定名字的儿子节点
	         * @param  {string} name
	         * @return {module:zrender/Element}
	         */
	        childOfName: function (name) {
	            var children = this._children;
	            for (var i = 0; i < children.length; i++) {
	                if (children[i].name === name) {
	                    return children[i];
	                }
	             }
	        },
	
	        /**
	         * @return {number}
	         */
	        childCount: function () {
	            return this._children.length;
	        },
	
	        /**
	         * 添加子节点到最后
	         * @param {module:zrender/Element} child
	         */
	        add: function (child) {
	            if (child && child !== this && child.parent !== this) {
	
	                this._children.push(child);
	
	                this._doAdd(child);
	            }
	
	            return this;
	        },
	
	        /**
	         * 添加子节点在 nextSibling 之前
	         * @param {module:zrender/Element} child
	         * @param {module:zrender/Element} nextSibling
	         */
	        addBefore: function (child, nextSibling) {
	            if (child && child !== this && child.parent !== this
	                && nextSibling && nextSibling.parent === this) {
	
	                var children = this._children;
	                var idx = children.indexOf(nextSibling);
	
	                if (idx >= 0) {
	                    children.splice(idx, 0, child);
	                    this._doAdd(child);
	                }
	            }
	
	            return this;
	        },
	
	        _doAdd: function (child) {
	            if (child.parent) {
	                child.parent.remove(child);
	            }
	
	            child.parent = this;
	
	            var storage = this.__storage;
	            var zr = this.__zr;
	            if (storage && storage !== child.__storage) {
	
	                storage.addToMap(child);
	
	                if (child instanceof Group) {
	                    child.addChildrenToStorage(storage);
	                }
	            }
	
	            zr && zr.refresh();
	        },
	
	        /**
	         * 移除子节点
	         * @param {module:zrender/Element} child
	         */
	        remove: function (child) {
	            var zr = this.__zr;
	            var storage = this.__storage;
	            var children = this._children;
	
	            var idx = zrUtil.indexOf(children, child);
	            if (idx < 0) {
	                return this;
	            }
	            children.splice(idx, 1);
	
	            child.parent = null;
	
	            if (storage) {
	
	                storage.delFromMap(child.id);
	
	                if (child instanceof Group) {
	                    child.delChildrenFromStorage(storage);
	                }
	            }
	
	            zr && zr.refresh();
	
	            return this;
	        },
	
	        /**
	         * 移除所有子节点
	         */
	        removeAll: function () {
	            var children = this._children;
	            var storage = this.__storage;
	            var child;
	            var i;
	            for (i = 0; i < children.length; i++) {
	                child = children[i];
	                if (storage) {
	                    storage.delFromMap(child.id);
	                    if (child instanceof Group) {
	                        child.delChildrenFromStorage(storage);
	                    }
	                }
	                child.parent = null;
	            }
	            children.length = 0;
	
	            return this;
	        },
	
	        /**
	         * 遍历所有子节点
	         * @param  {Function} cb
	         * @param  {}   context
	         */
	        eachChild: function (cb, context) {
	            var children = this._children;
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                cb.call(context, child, i);
	            }
	            return this;
	        },
	
	        /**
	         * 深度优先遍历所有子孙节点
	         * @param  {Function} cb
	         * @param  {}   context
	         */
	        traverse: function (cb, context) {
	            for (var i = 0; i < this._children.length; i++) {
	                var child = this._children[i];
	                cb.call(context, child);
	
	                if (child.type === 'group') {
	                    child.traverse(cb, context);
	                }
	            }
	            return this;
	        },
	
	        addChildrenToStorage: function (storage) {
	            for (var i = 0; i < this._children.length; i++) {
	                var child = this._children[i];
	                storage.addToMap(child);
	                if (child instanceof Group) {
	                    child.addChildrenToStorage(storage);
	                }
	            }
	        },
	
	        delChildrenFromStorage: function (storage) {
	            for (var i = 0; i < this._children.length; i++) {
	                var child = this._children[i];
	                storage.delFromMap(child.id);
	                if (child instanceof Group) {
	                    child.delChildrenFromStorage(storage);
	                }
	            }
	        },
	
	        dirty: function () {
	            this.__dirty = true;
	            this.__zr && this.__zr.refresh();
	            return this;
	        },
	
	        /**
	         * @return {module:zrender/core/BoundingRect}
	         */
	        getBoundingRect: function (includeChildren) {
	            // TODO Caching
	            // TODO Transform
	            var rect = null;
	            var tmpRect = new BoundingRect(0, 0, 0, 0);
	            var children = includeChildren || this._children;
	            var tmpMat = [];
	
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                if (child.ignore || child.invisible) {
	                    continue;
	                }
	
	                var childRect = child.getBoundingRect();
	                var transform = child.getLocalTransform(tmpMat);
	                if (transform) {
	                    tmpRect.copy(childRect);
	                    tmpRect.applyTransform(transform);
	                    rect = rect || tmpRect.clone();
	                    rect.union(tmpRect);
	                }
	                else {
	                    rect = rect || childRect.clone();
	                    rect.union(childRect);
	                }
	            }
	            return rect || tmpRect;
	        }
	    };
	
	    zrUtil.inherits(Group, Element);
	
	    module.exports = Group;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Image element
	 * @module zrender/graphic/Image
	 */
	
	
	
	    var Displayable = __webpack_require__(8);
	    var BoundingRect = __webpack_require__(25);
	    var zrUtil = __webpack_require__(4);
	    var roundRectHelper = __webpack_require__(39);
	
	    var LRU = __webpack_require__(40);
	    var globalImageCache = new LRU(50);
	    /**
	     * @alias zrender/graphic/Image
	     * @extends module:zrender/graphic/Displayable
	     * @constructor
	     * @param {Object} opts
	     */
	    var ZImage = function (opts) {
	        Displayable.call(this, opts);
	    };
	
	    ZImage.prototype = {
	
	        constructor: ZImage,
	
	        type: 'image',
	
	        brush: function (ctx) {
	            var style = this.style;
	            var src = style.image;
	            var image;
	            // style.image is a url string
	            if (typeof src === 'string') {
	                image = this._image;
	            }
	            // style.image is an HTMLImageElement or HTMLCanvasElement or Canvas
	            else {
	                image = src;
	            }
	            // FIXME Case create many images with src
	            if (!image && src) {
	                // Try get from global image cache
	                var cachedImgObj = globalImageCache.get(src);
	                if (!cachedImgObj) {
	                    // Create a new image
	                    image = new Image();
	                    image.onload = function () {
	                        image.onload = null;
	                        for (var i = 0; i < cachedImgObj.pending.length; i++) {
	                            cachedImgObj.pending[i].dirty();
	                        }
	                    };
	                    cachedImgObj = {
	                        image: image,
	                        pending: [this]
	                    };
	                    image.src = src;
	                    globalImageCache.put(src, cachedImgObj);
	                    this._image = image;
	                    return;
	                }
	                else {
	                    image = cachedImgObj.image;
	                    this._image = image;
	                    // Image is not complete finish, add to pending list
	                    if (!image.width || !image.height) {
	                        cachedImgObj.pending.push(this);
	                        return;
	                    }
	                }
	            }
	
	            if (image) {
	                // 图片已经加载完成
	                // if (image.nodeName.toUpperCase() == 'IMG') {
	                //     if (!image.complete) {
	                //         return;
	                //     }
	                // }
	                // Else is canvas
	
	                var width = style.width || image.width;
	                var height = style.height || image.height;
	                var x = style.x || 0;
	                var y = style.y || 0;
	                // 图片加载失败
	                if (!image.width || !image.height) {
	                    return;
	                }
	
	                ctx.save();
	
	                style.bind(ctx);
	
	                // 设置transform
	                this.setTransform(ctx);
	
	                if (style.r) {
	                    // Border radius clipping
	                    // FIXME
	                    ctx.beginPath();
	                    roundRectHelper.buildPath(ctx, style);
	                    ctx.clip();
	                }
	
	                if (style.sWidth && style.sHeight) {
	                    var sx = style.sx || 0;
	                    var sy = style.sy || 0;
	                    ctx.drawImage(
	                        image,
	                        sx, sy, style.sWidth, style.sHeight,
	                        x, y, width, height
	                    );
	                }
	                else if (style.sx && style.sy) {
	                    var sx = style.sx;
	                    var sy = style.sy;
	                    var sWidth = width - sx;
	                    var sHeight = height - sy;
	                    ctx.drawImage(
	                        image,
	                        sx, sy, sWidth, sHeight,
	                        x, y, width, height
	                    );
	                }
	                else {
	                    ctx.drawImage(image, x, y, width, height);
	                }
	
	                // 如果没设置宽和高的话自动根据图片宽高设置
	                if (style.width == null) {
	                    style.width = width;
	                }
	                if (style.height == null) {
	                    style.height = height;
	                }
	
	                // Draw rect text
	                if (style.text != null) {
	                    this.drawRectText(ctx, this.getBoundingRect());
	                }
	
	                ctx.restore();
	            }
	        },
	
	        getBoundingRect: function () {
	            var style = this.style;
	            if (! this._rect) {
	                this._rect = new BoundingRect(
	                    style.x || 0, style.y || 0, style.width || 0, style.height || 0
	                );
	            }
	            return this._rect;
	        }
	    };
	
	    zrUtil.inherits(ZImage, Displayable);
	
	    module.exports = ZImage;


/***/ },
/* 39 */
/***/ function(module, exports) {

	
	
	    module.exports = {
	        buildPath: function (ctx, shape) {
	            var x = shape.x;
	            var y = shape.y;
	            var width = shape.width;
	            var height = shape.height;
	            var r = shape.r;
	            var r1;
	            var r2;
	            var r3;
	            var r4;
	
	            // Convert width and height to positive for better borderRadius
	            if (width < 0) {
	                x = x + width;
	                width = -width;
	            }
	            if (height < 0) {
	                y = y + height;
	                height = -height;
	            }
	
	            if (typeof r === 'number') {
	                r1 = r2 = r3 = r4 = r;
	            }
	            else if (r instanceof Array) {
	                if (r.length === 1) {
	                    r1 = r2 = r3 = r4 = r[0];
	                }
	                else if (r.length === 2) {
	                    r1 = r3 = r[0];
	                    r2 = r4 = r[1];
	                }
	                else if (r.length === 3) {
	                    r1 = r[0];
	                    r2 = r4 = r[1];
	                    r3 = r[2];
	                }
	                else {
	                    r1 = r[0];
	                    r2 = r[1];
	                    r3 = r[2];
	                    r4 = r[3];
	                }
	            }
	            else {
	                r1 = r2 = r3 = r4 = 0;
	            }
	
	            var total;
	            if (r1 + r2 > width) {
	                total = r1 + r2;
	                r1 *= width / total;
	                r2 *= width / total;
	            }
	            if (r3 + r4 > width) {
	                total = r3 + r4;
	                r3 *= width / total;
	                r4 *= width / total;
	            }
	            if (r2 + r3 > height) {
	                total = r2 + r3;
	                r2 *= height / total;
	                r3 *= height / total;
	            }
	            if (r1 + r4 > height) {
	                total = r1 + r4;
	                r1 *= height / total;
	                r4 *= height / total;
	            }
	            ctx.moveTo(x + r1, y);
	            ctx.lineTo(x + width - r2, y);
	            r2 !== 0 && ctx.quadraticCurveTo(
	                x + width, y, x + width, y + r2
	            );
	            ctx.lineTo(x + width, y + height - r3);
	            r3 !== 0 && ctx.quadraticCurveTo(
	                x + width, y + height, x + width - r3, y + height
	            );
	            ctx.lineTo(x + r4, y + height);
	            r4 !== 0 && ctx.quadraticCurveTo(
	                x, y + height, x, y + height - r4
	            );
	            ctx.lineTo(x, y + r1);
	            r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
	        }
	    };


/***/ },
/* 40 */
/***/ function(module, exports) {

	// Simple LRU cache use doubly linked list
	// @module zrender/core/LRU
	
	
	    /**
	     * Simple double linked list. Compared with array, it has O(1) remove operation.
	     * @constructor
	     */
	    var LinkedList = function() {
	
	        /**
	         * @type {module:zrender/core/LRU~Entry}
	         */
	        this.head = null;
	
	        /**
	         * @type {module:zrender/core/LRU~Entry}
	         */
	        this.tail = null;
	
	        this._len = 0;
	    };
	
	    var linkedListProto = LinkedList.prototype;
	    /**
	     * Insert a new value at the tail
	     * @param  {} val
	     * @return {module:zrender/core/LRU~Entry}
	     */
	    linkedListProto.insert = function(val) {
	        var entry = new Entry(val);
	        this.insertEntry(entry);
	        return entry;
	    };
	
	    /**
	     * Insert an entry at the tail
	     * @param  {module:zrender/core/LRU~Entry} entry
	     */
	    linkedListProto.insertEntry = function(entry) {
	        if (!this.head) {
	            this.head = this.tail = entry;
	        }
	        else {
	            this.tail.next = entry;
	            entry.prev = this.tail;
	            this.tail = entry;
	        }
	        this._len++;
	    };
	
	    /**
	     * Remove entry.
	     * @param  {module:zrender/core/LRU~Entry} entry
	     */
	    linkedListProto.remove = function(entry) {
	        var prev = entry.prev;
	        var next = entry.next;
	        if (prev) {
	            prev.next = next;
	        }
	        else {
	            // Is head
	            this.head = next;
	        }
	        if (next) {
	            next.prev = prev;
	        }
	        else {
	            // Is tail
	            this.tail = prev;
	        }
	        entry.next = entry.prev = null;
	        this._len--;
	    };
	
	    /**
	     * @return {number}
	     */
	    linkedListProto.len = function() {
	        return this._len;
	    };
	
	    /**
	     * @constructor
	     * @param {} val
	     */
	    var Entry = function(val) {
	        /**
	         * @type {}
	         */
	        this.value = val;
	
	        /**
	         * @type {module:zrender/core/LRU~Entry}
	         */
	        this.next;
	
	        /**
	         * @type {module:zrender/core/LRU~Entry}
	         */
	        this.prev;
	    };
	
	    /**
	     * LRU Cache
	     * @constructor
	     * @alias module:zrender/core/LRU
	     */
	    var LRU = function(maxSize) {
	
	        this._list = new LinkedList();
	
	        this._map = {};
	
	        this._maxSize = maxSize || 10;
	    };
	
	    var LRUProto = LRU.prototype;
	
	    /**
	     * @param  {string} key
	     * @param  {} value
	     */
	    LRUProto.put = function(key, value) {
	        var list = this._list;
	        var map = this._map;
	        if (map[key] == null) {
	            var len = list.len();
	            if (len >= this._maxSize && len > 0) {
	                // Remove the least recently used
	                var leastUsedEntry = list.head;
	                list.remove(leastUsedEntry);
	                delete map[leastUsedEntry.key];
	            }
	
	            var entry = list.insert(value);
	            entry.key = key;
	            map[key] = entry;
	        }
	    };
	
	    /**
	     * @param  {string} key
	     * @return {}
	     */
	    LRUProto.get = function(key) {
	        var entry = this._map[key];
	        var list = this._list;
	        if (entry != null) {
	            // Put the latest used entry in the tail
	            if (entry !== list.tail) {
	                list.remove(entry);
	                list.insertEntry(entry);
	            }
	
	            return entry.value;
	        }
	    };
	
	    /**
	     * Clear the cache
	     */
	    LRUProto.clear = function() {
	        this._list.clear();
	        this._map = {};
	    };
	
	    module.exports = LRU;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Text element
	 * @module zrender/graphic/Text
	 *
	 * TODO Wrapping
	 */
	
	
	
	    var Displayable = __webpack_require__(8);
	    var zrUtil = __webpack_require__(4);
	    var textContain = __webpack_require__(24);
	
	    /**
	     * @alias zrender/graphic/Text
	     * @extends module:zrender/graphic/Displayable
	     * @constructor
	     * @param {Object} opts
	     */
	    var Text = function (opts) {
	        Displayable.call(this, opts);
	    };
	
	    Text.prototype = {
	
	        constructor: Text,
	
	        type: 'text',
	
	        brush: function (ctx) {
	            var style = this.style;
	            var x = style.x || 0;
	            var y = style.y || 0;
	            // Convert to string
	            var text = style.text;
	            var textFill = style.fill;
	            var textStroke = style.stroke;
	
	            // Convert to string
	            text != null && (text += '');
	
	            if (text) {
	                ctx.save();
	
	                this.style.bind(ctx);
	                this.setTransform(ctx);
	
	                textFill && (ctx.fillStyle = textFill);
	                textStroke && (ctx.strokeStyle = textStroke);
	
	                ctx.font = style.textFont || style.font;
	                ctx.textAlign = style.textAlign;
	
	                if (style.textVerticalAlign) {
	                    var rect = textContain.getBoundingRect(
	                        text, ctx.font, style.textAlign, 'top'
	                    );
	                    // Ignore textBaseline
	                    ctx.textBaseline = 'top';
	                    switch (style.textVerticalAlign) {
	                        case 'middle':
	                            y -= rect.height / 2;
	                            break;
	                        case 'bottom':
	                            y -= rect.height;
	                            break;
	                        // 'top'
	                    }
	                }
	                else {
	                    ctx.textBaseline = style.textBaseline;
	                }
	                var lineHeight = textContain.measureText('国', ctx.font).width;
	
	                var textLines = text.split('\n');
	                for (var i = 0; i < textLines.length; i++) {
	                    textFill && ctx.fillText(textLines[i], x, y);
	                    textStroke && ctx.strokeText(textLines[i], x, y);
	                    y += lineHeight;
	                }
	
	                ctx.restore();
	            }
	        },
	
	        getBoundingRect: function () {
	            if (!this._rect) {
	                var style = this.style;
	                var rect = textContain.getBoundingRect(
	                    style.text + '', style.textFont || style.font, style.textAlign, style.textBaseline
	                );
	                rect.x += style.x || 0;
	                rect.y += style.y || 0;
	                this._rect = rect;
	            }
	            return this._rect;
	        }
	    };
	
	    zrUtil.inherits(Text, Displayable);
	
	    module.exports = Text;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 圆形
	 * @module zrender/shape/Circle
	 */
	
	
	
	    module.exports = __webpack_require__(7).extend({
	        
	        type: 'circle',
	
	        shape: {
	            cx: 0,
	            cy: 0,
	            r: 0
	        },
	
	        buildPath : function (ctx, shape) {
	            // Better stroking in ShapeBundle
	            ctx.moveTo(shape.cx + shape.r, shape.cy);
	            ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
	            return;
	        }
	    });
	


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 扇形
	 * @module zrender/graphic/shape/Sector
	 */
	
	// FIXME clockwise seems wrong
	
	
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'sector',
	
	        shape: {
	
	            cx: 0,
	
	            cy: 0,
	
	            r0: 0,
	
	            r: 0,
	
	            startAngle: 0,
	
	            endAngle: Math.PI * 2,
	
	            clockwise: true
	        },
	
	        buildPath: function (ctx, shape) {
	
	            var x = shape.cx;
	            var y = shape.cy;
	            var r0 = Math.max(shape.r0 || 0, 0);
	            var r = Math.max(shape.r, 0);
	            var startAngle = shape.startAngle;
	            var endAngle = shape.endAngle;
	            var clockwise = shape.clockwise;
	
	            var unitX = Math.cos(startAngle);
	            var unitY = Math.sin(startAngle);
	
	            ctx.moveTo(unitX * r0 + x, unitY * r0 + y);
	
	            ctx.lineTo(unitX * r + x, unitY * r + y);
	
	            ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
	
	            ctx.lineTo(
	                Math.cos(endAngle) * r0 + x,
	                Math.sin(endAngle) * r0 + y
	            );
	
	            if (r0 !== 0) {
	                ctx.arc(x, y, r0, endAngle, startAngle, clockwise);
	            }
	
	            ctx.closePath();
	        }
	    });
	


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 圆环
	 * @module zrender/graphic/shape/Ring
	 */
	
	
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'ring',
	
	        shape: {
	            cx: 0,
	            cy: 0,
	            r: 0,
	            r0: 0
	        },
	
	        buildPath: function (ctx, shape) {
	            var x = shape.cx;
	            var y = shape.cy;
	            var PI2 = Math.PI * 2;
	            ctx.moveTo(x + shape.r, y);
	            ctx.arc(x, y, shape.r, 0, PI2, false);
	            ctx.moveTo(x + shape.r0, y);
	            ctx.arc(x, y, shape.r0, 0, PI2, true);
	        }
	    });
	


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 多边形
	 * @module zrender/shape/Polygon
	 */
	
	
	    var polyHelper = __webpack_require__(46);
	
	    module.exports = __webpack_require__(7).extend({
	        
	        type: 'polygon',
	
	        shape: {
	            points: null,
	
	            smooth: false,
	
	            smoothConstraint: null
	        },
	
	        buildPath: function (ctx, shape) {
	            polyHelper.buildPath(ctx, shape, true);
	        }
	    });


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var smoothSpline = __webpack_require__(47);
	    var smoothBezier = __webpack_require__(48);
	
	    module.exports = {
	        buildPath: function (ctx, shape, closePath) {
	            var points = shape.points;
	            var smooth = shape.smooth;
	            if (points && points.length >= 2) {
	                if (smooth && smooth !== 'spline') {
	                    var controlPoints = smoothBezier(
	                        points, smooth, closePath, shape.smoothConstraint
	                    );
	
	                    ctx.moveTo(points[0][0], points[0][1]);
	                    var len = points.length;
	                    for (var i = 0; i < (closePath ? len : len - 1); i++) {
	                        var cp1 = controlPoints[i * 2];
	                        var cp2 = controlPoints[i * 2 + 1];
	                        var p = points[(i + 1) % len];
	                        ctx.bezierCurveTo(
	                            cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
	                        );
	                    }
	                }
	                else {
	                    if (smooth === 'spline') {
	                        points = smoothSpline(points, closePath);
	                    }
	
	                    ctx.moveTo(points[0][0], points[0][1]);
	                    for (var i = 1, l = points.length; i < l; i++) {
	                        ctx.lineTo(points[i][0], points[i][1]);
	                    }
	                }
	
	                closePath && ctx.closePath();
	            }
	        }
	    };


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Catmull-Rom spline 插值折线
	 * @module zrender/shape/util/smoothSpline
	 * @author pissang (https://www.github.com/pissang)
	 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 *         errorrik (errorrik@gmail.com)
	 */
	
	    var vec2 = __webpack_require__(15);
	
	    /**
	     * @inner
	     */
	    function interpolate(p0, p1, p2, p3, t, t2, t3) {
	        var v0 = (p2 - p0) * 0.5;
	        var v1 = (p3 - p1) * 0.5;
	        return (2 * (p1 - p2) + v0 + v1) * t3
	                + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
	                + v0 * t + p1;
	    }
	
	    /**
	     * @alias module:zrender/shape/util/smoothSpline
	     * @param {Array} points 线段顶点数组
	     * @param {boolean} isLoop
	     * @return {Array}
	     */
	    module.exports = function (points, isLoop) {
	        var len = points.length;
	        var ret = [];
	
	        var distance = 0;
	        for (var i = 1; i < len; i++) {
	            distance += vec2.distance(points[i - 1], points[i]);
	        }
	
	        var segs = distance / 2;
	        segs = segs < len ? len : segs;
	        for (var i = 0; i < segs; i++) {
	            var pos = i / (segs - 1) * (isLoop ? len : len - 1);
	            var idx = Math.floor(pos);
	
	            var w = pos - idx;
	
	            var p0;
	            var p1 = points[idx % len];
	            var p2;
	            var p3;
	            if (!isLoop) {
	                p0 = points[idx === 0 ? idx : idx - 1];
	                p2 = points[idx > len - 2 ? len - 1 : idx + 1];
	                p3 = points[idx > len - 3 ? len - 1 : idx + 2];
	            }
	            else {
	                p0 = points[(idx - 1 + len) % len];
	                p2 = points[(idx + 1) % len];
	                p3 = points[(idx + 2) % len];
	            }
	
	            var w2 = w * w;
	            var w3 = w * w2;
	
	            ret.push([
	                interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
	                interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
	            ]);
	        }
	        return ret;
	    };
	


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 贝塞尔平滑曲线
	 * @module zrender/shape/util/smoothBezier
	 * @author pissang (https://www.github.com/pissang)
	 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 *         errorrik (errorrik@gmail.com)
	 */
	
	
	    var vec2 = __webpack_require__(15);
	    var v2Min = vec2.min;
	    var v2Max = vec2.max;
	    var v2Scale = vec2.scale;
	    var v2Distance = vec2.distance;
	    var v2Add = vec2.add;
	
	    /**
	     * 贝塞尔平滑曲线
	     * @alias module:zrender/shape/util/smoothBezier
	     * @param {Array} points 线段顶点数组
	     * @param {number} smooth 平滑等级, 0-1
	     * @param {boolean} isLoop
	     * @param {Array} constraint 将计算出来的控制点约束在一个包围盒内
	     *                           比如 [[0, 0], [100, 100]], 这个包围盒会与
	     *                           整个折线的包围盒做一个并集用来约束控制点。
	     * @param {Array} 计算出来的控制点数组
	     */
	    module.exports = function (points, smooth, isLoop, constraint) {
	        var cps = [];
	
	        var v = [];
	        var v1 = [];
	        var v2 = [];
	        var prevPoint;
	        var nextPoint;
	
	        var min, max;
	        if (constraint) {
	            min = [Infinity, Infinity];
	            max = [-Infinity, -Infinity];
	            for (var i = 0, len = points.length; i < len; i++) {
	                v2Min(min, min, points[i]);
	                v2Max(max, max, points[i]);
	            }
	            // 与指定的包围盒做并集
	            v2Min(min, min, constraint[0]);
	            v2Max(max, max, constraint[1]);
	        }
	
	        for (var i = 0, len = points.length; i < len; i++) {
	            var point = points[i];
	
	            if (isLoop) {
	                prevPoint = points[i ? i - 1 : len - 1];
	                nextPoint = points[(i + 1) % len];
	            }
	            else {
	                if (i === 0 || i === len - 1) {
	                    cps.push(vec2.clone(points[i]));
	                    continue;
	                }
	                else {
	                    prevPoint = points[i - 1];
	                    nextPoint = points[i + 1];
	                }
	            }
	
	            vec2.sub(v, nextPoint, prevPoint);
	
	            // use degree to scale the handle length
	            v2Scale(v, v, smooth);
	
	            var d0 = v2Distance(point, prevPoint);
	            var d1 = v2Distance(point, nextPoint);
	            var sum = d0 + d1;
	            if (sum !== 0) {
	                d0 /= sum;
	                d1 /= sum;
	            }
	
	            v2Scale(v1, v, -d0);
	            v2Scale(v2, v, d1);
	            var cp0 = v2Add([], point, v1);
	            var cp1 = v2Add([], point, v2);
	            if (constraint) {
	                v2Max(cp0, cp0, min);
	                v2Min(cp0, cp0, max);
	                v2Max(cp1, cp1, min);
	                v2Min(cp1, cp1, max);
	            }
	            cps.push(cp0);
	            cps.push(cp1);
	        }
	
	        if (isLoop) {
	            cps.push(cps.shift());
	        }
	
	        return cps;
	    };
	


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module zrender/graphic/shape/Polyline
	 */
	
	
	    var polyHelper = __webpack_require__(46);
	
	    module.exports = __webpack_require__(7).extend({
	        
	        type: 'polyline',
	
	        shape: {
	            points: null,
	
	            smooth: false,
	
	            smoothConstraint: null
	        },
	
	        style: {
	            stroke: '#000',
	
	            fill: null
	        },
	
	        buildPath: function (ctx, shape) {
	            polyHelper.buildPath(ctx, shape, false);
	        }
	    });


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 矩形
	 * @module zrender/graphic/shape/Rect
	 */
	
	
	    var roundRectHelper = __webpack_require__(39);
	
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'rect',
	
	        shape: {
	            // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
	            // r缩写为1         相当于 [1, 1, 1, 1]
	            // r缩写为[1]       相当于 [1, 1, 1, 1]
	            // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
	            // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
	            r: 0,
	
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },
	
	        buildPath: function (ctx, shape) {
	            var x = shape.x;
	            var y = shape.y;
	            var width = shape.width;
	            var height = shape.height;
	            if (!shape.r) {
	                ctx.rect(x, y, width, height);
	            }
	            else {
	                roundRectHelper.buildPath(ctx, shape);
	            }
	            ctx.closePath();
	            return;
	        }
	    });
	


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 直线
	 * @module zrender/graphic/shape/Line
	 */
	
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'line',
	
	        shape: {
	            // Start point
	            x1: 0,
	            y1: 0,
	            // End point
	            x2: 0,
	            y2: 0,
	
	            percent: 1
	        },
	
	        style: {
	            stroke: '#000',
	            fill: null
	        },
	
	        buildPath: function (ctx, shape) {
	            var x1 = shape.x1;
	            var y1 = shape.y1;
	            var x2 = shape.x2;
	            var y2 = shape.y2;
	            var percent = shape.percent;
	
	            if (percent === 0) {
	                return;
	            }
	
	            ctx.moveTo(x1, y1);
	
	            if (percent < 1) {
	                x2 = x1 * (1 - percent) + x2 * percent;
	                y2 = y1 * (1 - percent) + y2 * percent;
	            }
	            ctx.lineTo(x2, y2);
	        },
	
	        /**
	         * Get point at percent
	         * @param  {number} percent
	         * @return {Array.<number>}
	         */
	        pointAt: function (p) {
	            var shape = this.shape;
	            return [
	                shape.x1 * (1 - p) + shape.x2 * p,
	                shape.y1 * (1 - p) + shape.y2 * p
	            ];
	        }
	    });
	


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 贝塞尔曲线
	 * @module zrender/shape/BezierCurve
	 */
	
	
	    var curveTool = __webpack_require__(27);
	    var quadraticSubdivide = curveTool.quadraticSubdivide;
	    var cubicSubdivide = curveTool.cubicSubdivide;
	    var quadraticAt = curveTool.quadraticAt;
	    var cubicAt = curveTool.cubicAt;
	
	    var out = [];
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'bezier-curve',
	
	        shape: {
	            x1: 0,
	            y1: 0,
	            x2: 0,
	            y2: 0,
	            cpx1: 0,
	            cpy1: 0,
	            // cpx2: 0,
	            // cpy2: 0
	
	            // Curve show percent, for animating
	            percent: 1
	        },
	
	        style: {
	            stroke: '#000',
	            fill: null
	        },
	
	        buildPath: function (ctx, shape) {
	            var x1 = shape.x1;
	            var y1 = shape.y1;
	            var x2 = shape.x2;
	            var y2 = shape.y2;
	            var cpx1 = shape.cpx1;
	            var cpy1 = shape.cpy1;
	            var cpx2 = shape.cpx2;
	            var cpy2 = shape.cpy2;
	            var percent = shape.percent;
	            if (percent === 0) {
	                return;
	            }
	
	            ctx.moveTo(x1, y1);
	
	            if (cpx2 == null || cpy2 == null) {
	                if (percent < 1) {
	                    quadraticSubdivide(
	                        x1, cpx1, x2, percent, out
	                    );
	                    cpx1 = out[1];
	                    x2 = out[2];
	                    quadraticSubdivide(
	                        y1, cpy1, y2, percent, out
	                    );
	                    cpy1 = out[1];
	                    y2 = out[2];
	                }
	
	                ctx.quadraticCurveTo(
	                    cpx1, cpy1,
	                    x2, y2
	                );
	            }
	            else {
	                if (percent < 1) {
	                    cubicSubdivide(
	                        x1, cpx1, cpx2, x2, percent, out
	                    );
	                    cpx1 = out[1];
	                    cpx2 = out[2];
	                    x2 = out[3];
	                    cubicSubdivide(
	                        y1, cpy1, cpy2, y2, percent, out
	                    );
	                    cpy1 = out[1];
	                    cpy2 = out[2];
	                    y2 = out[3];
	                }
	                ctx.bezierCurveTo(
	                    cpx1, cpy1,
	                    cpx2, cpy2,
	                    x2, y2
	                );
	            }
	        },
	
	        /**
	         * Get point at percent
	         * @param  {number} percent
	         * @return {Array.<number>}
	         */
	        pointAt: function (p) {
	            var shape = this.shape;
	            var cpx2 = shape.cpx2;
	            var cpy2 = shape.cpy2;
	            if (cpx2 === null || cpy2 === null) {
	                return [
	                    quadraticAt(shape.x1, shape.cpx1, shape.x2, p),
	                    quadraticAt(shape.y1, shape.cpy1, shape.y2, p)
	                ];
	            }
	            else {
	                return [
	                    cubicAt(shape.x1, shape.cpx1, shape.cpx1, shape.x2, p),
	                    cubicAt(shape.y1, shape.cpy1, shape.cpy1, shape.y2, p)
	                ];
	            }
	        }
	    });
	


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 圆弧
	 * @module zrender/graphic/shape/Arc
	 */
	 
	
	    module.exports = __webpack_require__(7).extend({
	
	        type: 'arc',
	
	        shape: {
	
	            cx: 0,
	
	            cy: 0,
	
	            r: 0,
	
	            startAngle: 0,
	
	            endAngle: Math.PI * 2,
	
	            clockwise: true
	        },
	
	        style: {
	
	            stroke: '#000',
	
	            fill: null
	        },
	
	        buildPath: function (ctx, shape) {
	
	            var x = shape.cx;
	            var y = shape.cy;
	            var r = Math.max(shape.r, 0);
	            var startAngle = shape.startAngle;
	            var endAngle = shape.endAngle;
	            var clockwise = shape.clockwise;
	
	            var unitX = Math.cos(startAngle);
	            var unitY = Math.sin(startAngle);
	
	            ctx.moveTo(unitX * r + x, unitY * r + y);
	            ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
	        }
	    });


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	    var zrUtil = __webpack_require__(4);
	
	    var Gradient = __webpack_require__(5);
	
	    /**
	     * x, y, x2, y2 are all percent from 0 to 1
	     * @param {number} [x=0]
	     * @param {number} [y=0]
	     * @param {number} [x2=1]
	     * @param {number} [y2=0]
	     * @param {Array.<Object>} colorStops
	     */
	    var LinearGradient = function (x, y, x2, y2, colorStops) {
	        this.x = x == null ? 0 : x;
	
	        this.y = y == null ? 0 : y;
	
	        this.x2 = x2 == null ? 1 : x2;
	
	        this.y2 = y2 == null ? 0 : y2;
	
	        Gradient.call(this, colorStops);
	    };
	
	    LinearGradient.prototype = {
	
	        constructor: LinearGradient,
	
	        type: 'linear',
	
	        updateCanvasGradient: function (shape, ctx) {
	            var rect = shape.getBoundingRect();
	            // var size =
	            var x = this.x * rect.width + rect.x;
	            var x2 = this.x2 * rect.width + rect.x;
	            var y = this.y * rect.height + rect.y;
	            var y2 = this.y2 * rect.height + rect.y;
	
	            var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
	
	            var colorStops = this.colorStops;
	            for (var i = 0; i < colorStops.length; i++) {
	                canvasGradient.addColorStop(
	                    colorStops[i].offset, colorStops[i].color
	                );
	            }
	
	            this.canvasGradient = canvasGradient;
	        }
	
	    };
	
	    zrUtil.inherits(LinearGradient, Gradient);
	
	    module.exports = LinearGradient;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	    var zrUtil = __webpack_require__(4);
	
	    var Gradient = __webpack_require__(5);
	
	    /**
	     * x, y, r are all percent from 0 to 1
	     * @param {number} [x=0.5]
	     * @param {number} [y=0.5]
	     * @param {number} [r=0.5]
	     * @param {Array.<Object>} [colorStops]
	     */
	    var RadialGradient = function (x, y, r, colorStops) {
	        this.x = x == null ? 0.5 : x;
	
	        this.y = y == null ? 0.5 : y;
	
	        this.r = r == null ? 0.5 : r;
	
	        Gradient.call(this, colorStops);
	    };
	
	    RadialGradient.prototype = {
	
	        constructor: RadialGradient,
	
	        type: 'radial',
	
	        updateCanvasGradient: function (shape, ctx) {
	            var rect = shape.getBoundingRect();
	
	            var width = rect.width;
	            var height = rect.height;
	            var min = Math.min(width, height);
	            // var max = Math.max(width, height);
	
	            var x = this.x * width + rect.x;
	            var y = this.y * height + rect.y;
	            var r = this.r * min;
	
	            var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
	
	            var colorStops = this.colorStops;
	            for (var i = 0; i < colorStops.length; i++) {
	                canvasGradient.addColorStop(
	                    colorStops[i].offset, colorStops[i].color
	                );
	            }
	
	            this.canvasGradient = canvasGradient;
	        }
	    };
	
	    zrUtil.inherits(RadialGradient, Gradient);
	
	    module.exports = RadialGradient;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	    var zrUtil = __webpack_require__(4);
	
	    var apiList = [
	        'getDom', 'getZr', 'getWidth', 'getHeight', 'dispatchAction',
	        'on', 'off', 'trigger', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption'
	    ];
	
	    function ExtensionAPI(instance) {
	        zrUtil.each(apiList, function (name) {
	            this[name] = zrUtil.bind(instance[name], instance);
	        }, this);
	    }
	
	    module.exports = ExtensionAPI;


/***/ },
/* 57 */
/***/ function(module, exports) {

	
	
	    /**
	      * Creates an instance of Point
	      *
	      *
	      * @constructor
	      * @this {Point}
	      * @param {Number} x The x coordinate of point.
	      * @param {Number} y The y coordinate of point.
	      * Note: Even if it is named Point this class should be named Dot as Dot is closer
	      * then Point from math perspective.
	      **/
	    function Point(x, y){
	        /**The x coordinate of point*/
	        this.x = x;
	        
	        /**The y coordinate of point*/
	        this.y = y;
	        
	
	    }
	
	    /**Creates a {Point} out of JSON parsed object
	     *@param {JSONObject} o - the JSON parsed object
	     *@return {Point} a newly constructed Point
	     **/
	    Point.load = function(o){
	        var newPoint = new Point(Number(o.x), Number(o.y));
	        return newPoint;
	    }
	
	
	    /**Creates an array of points from an array of {JSONObject}s
	     *@param {Array} v - the array of JSONObjects
	     *@return an {Array} of {Point}s
	     **/
	    Point.loadArray = function(v){
	        var newPoints = [];
	        for(var i=0; i< v.length; i++){
	            newPoints.push(Point.load(v[i]));
	        }
	        return newPoints;
	    }
	
	
	    /**Clones an array of points
	     *@param {Array} v - the array of {Point}s
	     *@return an {Array} of {Point}s
	     **/
	    Point.cloneArray = function(v){
	        var newPoints = [];
	        for(var i=0; i< v.length; i++){
	            newPoints.push(v[i].clone());
	        }
	        return newPoints;
	    }
	
	    Point.prototype = {
	        constructor : Point,
	        
	        transform:function(matrix){
	            var oldX = this.x;
	            var oldY = this.y;
	            this.x = matrix[0][0] * oldX + matrix[0][1] * oldY + matrix[0][2];
	            this.y = matrix[1][0] * oldX + matrix[1][1] * oldY + matrix[1][2];
	        },
	        
	        /**Tests if this point is similar to other point
	         *@param {Point} anotherPoint - the other point
	         **/
	        equals:function(anotherPoint){
	            if(! (anotherPoint instanceof Point) ){
	                return false;
	            }
	            return (this.x == anotherPoint.x)
	            && (this.y == anotherPoint.y)
	        },
	
	        /**Clone current Point
	         **/
	        clone: function(){
	            var newPoint = new Point(this.x, this.y);
	            return newPoint;
	        },
	
	        /**Tests to see if a point (x, y) is within a range of current Point
	         *@param {Numeric} x - the x coordinate of tested point
	         *@param {Numeric} y - the x coordinate of tested point
	         *@param {Numeric} radius - the radius of the vicinity
	         **/
	        near:function(x, y, radius){
	            var distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
	
	            return (distance <= radius);
	        },
	
	        contains: function(x,y){
	            return this.x == x && this.y == y;
	        },
	
	        toString:function(){
	            return '[' + this.x + ',' + this.y + ']';
	        },
	
	        getPoints:function(){
	            return [this];
	        }
	    };
	    module.exports = Point;
	    

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ZRender, a high performance 2d drawing library.
	 *
	 * Copyright (c) 2013, Baidu Inc.
	 * All rights reserved.
	 *
	 * LICENSE
	 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
	 */
	// Global defines
	
	    var guid = __webpack_require__(11);
	    var env = __webpack_require__(59);
	
	    var Handler = __webpack_require__(60);
	    var Storage = __webpack_require__(64);
	    var Animation = __webpack_require__(65);
	
	    var useVML = !env.canvasSupported;
	
	    var painterCtors = {
	        canvas: __webpack_require__(66)
	    };
	
	    var instances = {};    // ZRender实例map索引
	
	    var zrender = {};
	    /**
	     * @type {string}
	     */
	    zrender.version = '3.0.4';
	
	    /**
	     * @param {HTMLElement} dom
	     * @param {Object} opts
	     * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
	     * @param {number} [opts.devicePixelRatio]
	     * @return {module:zrender/ZRender}
	     */
	    zrender.init = function(dom, opts) {
	        var zr = new ZRender(guid(), dom, opts);
	        instances[zr.id] = zr;
	        return zr;
	    };
	
	    /**
	     * Dispose zrender instance
	     * @param {module:zrender/ZRender} zr
	     */
	    zrender.dispose = function (zr) {
	        if (zr) {
	            zr.dispose();
	        }
	        else {
	            for (var key in instances) {
	                instances[key].dispose();
	            }
	            instances = {};
	        }
	
	        return zrender;
	    };
	
	    /**
	     * 获取zrender实例
	     * @param {string} id ZRender对象索引
	     * @return {module:zrender/ZRender}
	     */
	    zrender.getInstance = function (id) {
	        return instances[id];
	    };
	
	    zrender.registerPainter = function (name, Ctor) {
	        painterCtors[name] = Ctor;
	    };
	
	    function delInstance(id) {
	        delete instances[id];
	    }
	
	    /**
	     * @module zrender/ZRender
	     */
	    /**
	     * @constructor
	     * @alias module:zrender/ZRender
	     * @param {string} id
	     * @param {HTMLDomElement} dom
	     * @param {Object} opts
	     * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
	     * @param {number} [opts.devicePixelRatio]
	     */
	    var ZRender = function(id, dom, opts) {
	
	        opts = opts || {};
	
	        /**
	         * @type {HTMLDomElement}
	         */
	        this.dom = dom;
	
	        /**
	         * @type {string}
	         */
	        this.id = id;
	
	        var self = this;
	        var storage = new Storage();
	
	        var rendererType = opts.renderer;
	        if (useVML) {
	            if (!painterCtors.vml) {
	                throw new Error('You need to require \'zrender/vml/vml\' to support IE8');
	            }
	            rendererType = 'vml';
	        }
	        else if (!rendererType || !painterCtors[rendererType]) {
	            rendererType = 'canvas';
	        }
	        var painter = new painterCtors[rendererType](dom, storage, opts);
	
	        this.storage = storage;
	        this.painter = painter;
	        if (!env.node) {
	            this.handler = new Handler(painter.getViewportRoot(), storage, painter);
	        }
	
	        /**
	         * @type {module:zrender/animation/Animation}
	         */
	        this.animation = new Animation({
	            stage: {
	                update: function () {
	                    if (self._needsRefresh) {
	                        self.refreshImmediately();
	                    }
	                }
	            }
	        });
	        this.animation.start();
	
	        /**
	         * @type {boolean}
	         * @private
	         */
	        this._needsRefresh;
	
	        // 修改 storage.delFromMap, 每次删除元素之前删除动画
	        // FIXME 有点ugly
	        var oldDelFromMap = storage.delFromMap;
	        var oldAddToMap = storage.addToMap;
	
	        storage.delFromMap = function (elId) {
	            var el = storage.get(elId);
	
	            oldDelFromMap.call(storage, elId);
	
	            el && el.removeSelfFromZr(self);
	        };
	
	        storage.addToMap = function (el) {
	            oldAddToMap.call(storage, el);
	
	            el.addSelfToZr(self);
	        };
	    };
	
	    ZRender.prototype = {
	
	        constructor: ZRender,
	        /**
	         * 获取实例唯一标识
	         * @return {string}
	         */
	        getId: function () {
	            return this.id;
	        },
	
	        /**
	         * 添加元素
	         * @param  {string|module:zrender/Element} el
	         */
	        add: function (el) {
	            this.storage.addRoot(el);
	            this._needsRefresh = true;
	        },
	
	        /**
	         * 删除元素
	         * @param  {string|module:zrender/Element} el
	         */
	        remove: function (el) {
	            this.storage.delRoot(el);
	            this._needsRefresh = true;
	        },
	
	        /**
	         * 修改指定zlevel的绘制配置项
	         *
	         * @param {string} zLevel
	         * @param {Object} config 配置对象
	         * @param {string} [config.clearColor=0] 每次清空画布的颜色
	         * @param {string} [config.motionBlur=false] 是否开启动态模糊
	         * @param {number} [config.lastFrameAlpha=0.7]
	         *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
	        */
	        configLayer: function (zLevel, config) {
	            this.painter.configLayer(zLevel, config);
	            this._needsRefresh = true;
	        },
	
	        /**
	         * 视图更新
	         */
	        refreshImmediately: function () {
	            // Clear needsRefresh ahead to avoid something wrong happens in refresh
	            // Or it will cause zrender refreshes again and again.
	            this._needsRefresh = false;
	            this.painter.refresh();
	            /**
	             * Avoid trigger zr.refresh in Element#beforeUpdate hook
	             */
	            this._needsRefresh = false;
	        },
	
	        /**
	         * 标记视图在浏览器下一帧需要绘制
	         */
	        refresh: function() {
	            this._needsRefresh = true;
	        },
	
	        /**
	         * 调整视图大小
	         */
	        resize: function() {
	            this.painter.resize();
	            this.handler && this.handler.resize();
	        },
	
	        /**
	         * 停止所有动画
	         */
	        clearAnimation: function () {
	            this.animation.clear();
	        },
	
	        /**
	         * 获取视图宽度
	         */
	        getWidth: function() {
	            return this.painter.getWidth();
	        },
	
	        /**
	         * 获取视图高度
	         */
	        getHeight: function() {
	            return this.painter.getHeight();
	        },
	
	        /**
	         * 图像导出
	         * @param {string} type
	         * @param {string} [backgroundColor='#fff'] 背景色
	         * @return {string} 图片的Base64 url
	         */
	        toDataURL: function(type, backgroundColor, args) {
	            return this.painter.toDataURL(type, backgroundColor, args);
	        },
	
	        /**
	         * 将常规shape转成image shape
	         * @param {module:zrender/graphic/Path} e
	         * @param {number} width
	         * @param {number} height
	         */
	        pathToImage: function(e, width, height) {
	            var id = guid();
	            return this.painter.pathToImage(id, e, width, height);
	        },
	
	        /**
	         * 设置默认的cursor style
	         * @param {string} cursorStyle 例如 crosshair
	         */
	        setDefaultCursorStyle: function (cursorStyle) {
	            this.handler.setDefaultCursorStyle(cursorStyle);
	        },
	
	        /**
	         * 事件绑定
	         *
	         * @param {string} eventName 事件名称
	         * @param {Function} eventHandler 响应函数
	         * @param {Object} [context] 响应函数
	         */
	        on: function(eventName, eventHandler, context) {
	            this.handler && this.handler.on(eventName, eventHandler, context);
	        },
	
	        /**
	         * 事件解绑定，参数为空则解绑所有自定义事件
	         *
	         * @param {string} eventName 事件名称
	         * @param {Function} eventHandler 响应函数
	         */
	        off: function(eventName, eventHandler) {
	            this.handler && this.handler.off(eventName, eventHandler);
	        },
	
	        /**
	         * 事件触发
	         *
	         * @param {string} eventName 事件名称，resize，hover，drag，etc
	         * @param {event=} event event dom事件对象
	         */
	        trigger: function (eventName, event) {
	            this.handler && this.handler.trigger(eventName, event);
	        },
	
	
	        /**
	         * 清除当前ZRender下所有类图的数据和显示，clear后MVC和已绑定事件均还存在在，ZRender可用
	         */
	        clear: function () {
	            this.storage.delRoot();
	            this.painter.clear();
	        },
	
	        /**
	         * 释放当前ZR实例（删除包括dom，数据、显示和事件绑定），dispose后ZR不可用
	         */
	        dispose: function () {
	            this.animation.stop();
	
	            this.clear();
	            this.storage.dispose();
	            this.painter.dispose();
	            this.handler && this.handler.dispose();
	
	            this.animation =
	            this.storage =
	            this.painter =
	            this.handler = null;
	
	            delInstance(this.id);
	        }
	    };
	
	    module.exports = zrender;
	


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * echarts设备环境识别
	 *
	 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
	 * @author firede[firede@firede.us]
	 * @desc thanks zepto.
	 */
	
	    var env = {};
	    if (typeof navigator === 'undefined') {
	        // In node
	        env = {
	            browser: {},
	            os: {},
	            node: true,
	            // Assume canvas is supported
	            canvasSupported: true
	        };
	    }
	    else {
	        env = detect(navigator.userAgent);
	    }
	
	    module.exports = env;
	
	    // Zepto.js
	    // (c) 2010-2013 Thomas Fuchs
	    // Zepto.js may be freely distributed under the MIT license.
	
	    function detect(ua) {
	        var os = {};
	        var browser = {};
	        var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
	        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	        var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
	        var touchpad = webos && ua.match(/TouchPad/);
	        var kindle = ua.match(/Kindle\/([\d.]+)/);
	        var silk = ua.match(/Silk\/([\d._]+)/);
	        var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
	        var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
	        var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
	        var playbook = ua.match(/PlayBook/);
	        var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
	        var firefox = ua.match(/Firefox\/([\d.]+)/);
	        var safari = webkit && ua.match(/Mobile\//) && !chrome;
	        var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
	        var ie = ua.match(/MSIE\s([\d.]+)/)
	            // IE 11 Trident/7.0; rv:11.0
	            || ua.match(/Trident\/.+?rv:(([\d.]+))/);
	        var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+
	
	        // Todo: clean this up with a better OS/browser seperation:
	        // - discern (more) between multiple browsers on android
	        // - decide if kindle fire in silk mode is android or not
	        // - Firefox on Android doesn't specify the Android version
	        // - possibly devide in os, device and browser hashes
	
	        if (browser.webkit = !!webkit) browser.version = webkit[1];
	
	        if (android) os.android = true, os.version = android[2];
	        if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
	        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
	        if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
	        if (webos) os.webos = true, os.version = webos[2];
	        if (touchpad) os.touchpad = true;
	        if (blackberry) os.blackberry = true, os.version = blackberry[2];
	        if (bb10) os.bb10 = true, os.version = bb10[2];
	        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
	        if (playbook) browser.playbook = true;
	        if (kindle) os.kindle = true, os.version = kindle[1];
	        if (silk) browser.silk = true, browser.version = silk[1];
	        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
	        if (chrome) browser.chrome = true, browser.version = chrome[1];
	        if (firefox) browser.firefox = true, browser.version = firefox[1];
	        if (ie) browser.ie = true, browser.version = ie[1];
	        if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
	        if (webview) browser.webview = true;
	        if (ie) browser.ie = true, browser.version = ie[1];
	        if (edge) browser.edge = true, browser.version = edge[1];
	
	        os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
	            (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
	        os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
	            (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
	            (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));
	
	        return {
	            browser: browser,
	            os: os,
	            node: false,
	            // 原生canvas支持，改极端点了
	            // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
	            canvasSupported : document.createElement('canvas').getContext ? true : false,
	            // @see <http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript>
	            // works on most browsers
	            // IE10/11 does not support touch event, and MS Edge supports them but not by
	            // default, so we dont check navigator.maxTouchPoints for them here.
	            touchEventsSupported: 'ontouchstart' in window && !browser.ie && !browser.edge,
	            // <http://caniuse.com/#search=pointer%20event>.
	            pointerEventsSupported: 'onpointerdown' in window
	                // Firefox supports pointer but not by default,
	                // only MS browsers are reliable on pointer events currently.
	                && (browser.edge || (browser.ie && browser.version >= 10))
	        };
	    }


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Handler控制模块
	 * @module zrender/Handler
	 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 *         errorrik (errorrik@gmail.com)
	 *         pissang (shenyi.914@gmail.com)
	 */
	
	
	    var env = __webpack_require__(59);
	    var eventTool = __webpack_require__(61);
	    var util = __webpack_require__(4);
	    var Draggable = __webpack_require__(62);
	    var GestureMgr = __webpack_require__(63);
	
	    var Eventful = __webpack_require__(12);
	
	    var mouseHandlerNames = [
	        'click', 'dblclick', 'mousewheel', 'mouseout'
	    ];
	    !usePointerEvent() && mouseHandlerNames.push(
	        'mouseup', 'mousedown', 'mousemove'
	    );
	
	    var touchHandlerNames = [
	        'touchstart', 'touchend', 'touchmove'
	    ];
	
	    var pointerHandlerNames = [
	        'pointerdown', 'pointerup', 'pointermove'
	    ];
	
	    var TOUCH_CLICK_DELAY = 300;
	
	    // touch指尖错觉的尝试偏移量配置
	    // var MOBILE_TOUCH_OFFSETS = [
	    //     { x: 10 },
	    //     { x: -20 },
	    //     { x: 10, y: 10 },
	    //     { y: -20 }
	    // ];
	
	    var addEventListener = eventTool.addEventListener;
	    var removeEventListener = eventTool.removeEventListener;
	    var normalizeEvent = eventTool.normalizeEvent;
	
	    function makeEventPacket(eveType, target, event) {
	        return {
	            type: eveType,
	            event: event,
	            target: target,
	            cancelBubble: false,
	            offsetX: event.zrX,
	            offsetY: event.zrY,
	            gestureEvent: event.gestureEvent,
	            pinchX: event.pinchX,
	            pinchY: event.pinchY,
	            pinchScale: event.pinchScale,
	            wheelDelta: event.zrDelta
	        };
	    }
	
	    var domHandlers = {
	        /**
	         * Mouse move handler
	         * @inner
	         * @param {Event} event
	         */
	        mousemove: function (event) {
	            event = normalizeEvent(this.root, event);
	
	            var x = event.zrX;
	            var y = event.zrY;
	
	            var hovered = this.findHover(x, y, null);
	            var lastHovered = this._hovered;
	
	            this._hovered = hovered;
	
	            this.root.style.cursor = hovered ? hovered.cursor : this._defaultCursorStyle;
	            // Mouse out on previous hovered element
	            if (lastHovered && hovered !== lastHovered && lastHovered.__zr) {
	                this._dispatchProxy(lastHovered, 'mouseout', event);
	            }
	
	            // Mouse moving on one element
	            this._dispatchProxy(hovered, 'mousemove', event);
	
	            // Mouse over on a new element
	            if (hovered && hovered !== lastHovered) {
	                this._dispatchProxy(hovered, 'mouseover', event);
	            }
	        },
	
	        /**
	         * Mouse out handler
	         * @inner
	         * @param {Event} event
	         */
	        mouseout: function (event) {
	            event = normalizeEvent(this.root, event);
	
	            var element = event.toElement || event.relatedTarget;
	            if (element != this.root) {
	                while (element && element.nodeType != 9) {
	                    // 忽略包含在root中的dom引起的mouseOut
	                    if (element === this.root) {
	                        return;
	                    }
	
	                    element = element.parentNode;
	                }
	            }
	
	            this._dispatchProxy(this._hovered, 'mouseout', event);
	
	            this.trigger('globalout', {
	                event: event
	            });
	        },
	
	        /**
	         * Touch开始响应函数
	         * @inner
	         * @param {Event} event
	         */
	        touchstart: function (event) {
	            // FIXME
	            // 移动端可能需要default行为，例如静态图表时。
	            // eventTool.stop(event);// 阻止浏览器默认事件，重要
	            event = normalizeEvent(this.root, event);
	
	            this._lastTouchMoment = new Date();
	
	            processGesture(this, event, 'start');
	
	            // 平板补充一次findHover
	            // this._mobileFindFixed(event);
	            // Trigger mousemove and mousedown
	            domHandlers.mousemove.call(this, event);
	
	            domHandlers.mousedown.call(this, event);
	
	            setTouchTimer(this);
	        },
	
	        /**
	         * Touch移动响应函数
	         * @inner
	         * @param {Event} event
	         */
	        touchmove: function (event) {
	            // eventTool.stop(event);// 阻止浏览器默认事件，重要
	            event = normalizeEvent(this.root, event);
	
	            processGesture(this, event, 'change');
	
	            // Mouse move should always be triggered no matter whether
	            // there is gestrue event, because mouse move and pinch may
	            // be used at the same time.
	            domHandlers.mousemove.call(this, event);
	
	            setTouchTimer(this);
	        },
	
	        /**
	         * Touch结束响应函数
	         * @inner
	         * @param {Event} event
	         */
	        touchend: function (event) {
	            // eventTool.stop(event);// 阻止浏览器默认事件，重要
	            event = normalizeEvent(this.root, event);
	
	            processGesture(this, event, 'end');
	
	            domHandlers.mouseup.call(this, event);
	
	            // click event should always be triggered no matter whether
	            // there is gestrue event. System click can not be prevented.
	            if (+new Date() - this._lastTouchMoment < TOUCH_CLICK_DELAY) {
	                // this._mobileFindFixed(event);
	                domHandlers.click.call(this, event);
	            }
	
	            setTouchTimer(this);
	        }
	    };
	
	    // Common handlers
	    util.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick'], function (name) {
	        domHandlers[name] = function (event) {
	            event = normalizeEvent(this.root, event);
	            // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
	            var hovered = this.findHover(event.zrX, event.zrY, null);
	            this._dispatchProxy(hovered, name, event);
	        };
	    });
	
	    // Pointer event handlers
	    // util.each(['pointerdown', 'pointermove', 'pointerup'], function (name) {
	    //     domHandlers[name] = function (event) {
	    //         var mouseName = name.replace('pointer', 'mouse');
	    //         domHandlers[mouseName].call(this, event);
	    //     };
	    // });
	
	    function processGesture(zrHandler, event, stage) {
	        var gestureMgr = zrHandler._gestureMgr;
	
	        stage === 'start' && gestureMgr.clear();
	
	        var gestureInfo = gestureMgr.recognize(
	            event,
	            zrHandler.findHover(event.zrX, event.zrY, null)
	        );
	
	        stage === 'end' && gestureMgr.clear();
	
	        if (gestureInfo) {
	            // eventTool.stop(event);
	            var type = gestureInfo.type;
	            event.gestureEvent = type;
	
	            zrHandler._dispatchProxy(gestureInfo.target, type, gestureInfo.event);
	        }
	    }
	
	    /**
	     * 为控制类实例初始化dom 事件处理函数
	     *
	     * @inner
	     * @param {module:zrender/Handler} instance 控制类实例
	     */
	    function initDomHandler(instance) {
	        var handlerNames = touchHandlerNames.concat(pointerHandlerNames);
	        for (var i = 0; i < handlerNames.length; i++) {
	            var name = handlerNames[i];
	            instance._handlers[name] = util.bind(domHandlers[name], instance);
	        }
	
	        for (var i = 0; i < mouseHandlerNames.length; i++) {
	            var name = mouseHandlerNames[i];
	            instance._handlers[name] = makeMouseHandler(domHandlers[name], instance);
	        }
	
	        function makeMouseHandler(fn, instance) {
	            return function () {
	                if (instance._touching) {
	                    return;
	                }
	                return fn.apply(instance, arguments);
	            };
	        }
	    }
	
	    /**
	     * @alias module:zrender/Handler
	     * @constructor
	     * @extends module:zrender/mixin/Eventful
	     * @param {HTMLElement} root Main HTML element for painting.
	     * @param {module:zrender/Storage} storage Storage instance.
	     * @param {module:zrender/Painter} painter Painter instance.
	     */
	    var Handler = function(root, storage, painter) {
	        Eventful.call(this);
	
	        this.root = root;
	        this.storage = storage;
	        this.painter = painter;
	
	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._hovered;
	
	        /**
	         * @private
	         * @type {Date}
	         */
	        this._lastTouchMoment;
	
	        /**
	         * @private
	         * @type {number}
	         */
	        this._lastX;
	
	        /**
	         * @private
	         * @type {number}
	         */
	        this._lastY;
	
	        /**
	         * @private
	         * @type {string}
	         */
	        this._defaultCursorStyle = 'default';
	
	        /**
	         * @private
	         * @type {module:zrender/core/GestureMgr}
	         */
	        this._gestureMgr = new GestureMgr();
	
	        /**
	         * @private
	         * @type {Array.<Function>}
	         */
	        this._handlers = [];
	
	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._touching = false;
	
	        /**
	         * @private
	         * @type {number}
	         */
	        this._touchTimer;
	
	        initDomHandler(this);
	
	        if (usePointerEvent()) {
	            mountHandlers(pointerHandlerNames, this);
	        }
	        else if (useTouchEvent()) {
	            mountHandlers(touchHandlerNames, this);
	
	            // Handler of 'mouseout' event is needed in touch mode, which will be mounted below.
	            // addEventListener(root, 'mouseout', this._mouseoutHandler);
	        }
	
	        // Considering some devices that both enable touch and mouse event (like MS Surface
	        // and lenovo X240, @see #2350), we make mouse event be always listened, otherwise
	        // mouse event can not be handle in those devices.
	        mountHandlers(mouseHandlerNames, this);
	
	        Draggable.call(this);
	
	        function mountHandlers(handlerNames, instance) {
	            util.each(handlerNames, function (name) {
	                addEventListener(root, eventNameFix(name), instance._handlers[name]);
	            }, instance);
	        }
	    };
	
	    Handler.prototype = {
	
	        constructor: Handler,
	
	        /**
	         * Resize
	         */
	        resize: function (event) {
	            this._hovered = null;
	        },
	
	        /**
	         * Dispatch event
	         * @param {string} eventName
	         * @param {event=} eventArgs
	         */
	        dispatch: function (eventName, eventArgs) {
	            var handler = this._handlers[eventName];
	            handler && handler.call(this, eventArgs);
	        },
	
	        /**
	         * Dispose
	         */
	        dispose: function () {
	            var root = this.root;
	
	            var handlerNames = mouseHandlerNames.concat(touchHandlerNames);
	
	            for (var i = 0; i < handlerNames.length; i++) {
	                var name = handlerNames[i];
	                removeEventListener(root, eventNameFix(name), this._handlers[name]);
	            }
	
	            this.root =
	            this.storage =
	            this.painter = null;
	        },
	
	        /**
	         * 设置默认的cursor style
	         * @param {string} cursorStyle 例如 crosshair
	         */
	        setDefaultCursorStyle: function (cursorStyle) {
	            this._defaultCursorStyle = cursorStyle;
	        },
	
	        /**
	         * 事件分发代理
	         *
	         * @private
	         * @param {Object} targetEl 目标图形元素
	         * @param {string} eventName 事件名称
	         * @param {Object} event 事件对象
	         */
	        _dispatchProxy: function (targetEl, eventName, event) {
	            var eventHandler = 'on' + eventName;
	            var eventPacket = makeEventPacket(eventName, targetEl, event);
	
	            var el = targetEl;
	
	            while (el) {
	                el[eventHandler]
	                    && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));
	
	                el.trigger(eventName, eventPacket);
	
	                el = el.parent;
	
	                if (eventPacket.cancelBubble) {
	                    break;
	                }
	            }
	
	            if (!eventPacket.cancelBubble) {
	                // 冒泡到顶级 zrender 对象
	                this.trigger(eventName, eventPacket);
	                // 分发事件到用户自定义层
	                // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在
	                this.painter && this.painter.eachOtherLayer(function (layer) {
	                    if (typeof(layer[eventHandler]) == 'function') {
	                        layer[eventHandler].call(layer, eventPacket);
	                    }
	                    if (layer.trigger) {
	                        layer.trigger(eventName, eventPacket);
	                    }
	                });
	            }
	        },
	
	        /**
	         * @private
	         * @param {number} x
	         * @param {number} y
	         * @param {module:zrender/graphic/Displayable} exclude
	         * @method
	         */
	        findHover: function(x, y, exclude) {
	            var list = this.storage.getDisplayList();
	            for (var i = list.length - 1; i >= 0 ; i--) {
	                if (!list[i].silent
	                 && list[i] !== exclude
	                 // getDisplayList may include ignored item in VML mode
	                 && !list[i].ignore
	                 && isHover(list[i], x, y)) {
	                    return list[i];
	                }
	            }
	        }
	    };
	
	    function isHover(displayable, x, y) {
	        if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
	            var p = displayable.parent;
	            while (p) {
	                if (p.clipPath && !p.clipPath.contain(x, y))  {
	                    // Clipped by parents
	                    return false;
	                }
	                p = p.parent;
	            }
	            return true;
	        }
	
	        return false;
	    }
	
	    /**
	     * Prevent mouse event from being dispatched after Touch Events action
	     * @see <https://github.com/deltakosh/handjs/blob/master/src/hand.base.js>
	     * 1. Mobile browsers dispatch mouse events 300ms after touchend.
	     * 2. Chrome for Android dispatch mousedown for long-touch about 650ms
	     * Result: Blocking Mouse Events for 700ms.
	     */
	    function setTouchTimer(instance) {
	        instance._touching = true;
	        clearTimeout(instance._touchTimer);
	        instance._touchTimer = setTimeout(function () {
	            instance._touching = false;
	        }, 700);
	    }
	
	    /**
	     * Althought MS Surface support screen touch, IE10/11 do not support
	     * touch event and MS Edge supported them but not by default (but chrome
	     * and firefox do). Thus we use Pointer event on MS browsers to handle touch.
	     */
	    function usePointerEvent() {
	        // TODO
	        // pointermove event dont trigger when using finger.
	        // We may figger it out latter.
	        return false;
	        // return env.pointerEventsSupported
	            // In no-touch device we dont use pointer evnets but just
	            // use mouse event for avoiding problems.
	            // && window.navigator.maxTouchPoints;
	    }
	
	    function useTouchEvent() {
	        return env.touchEventsSupported;
	    }
	
	    function eventNameFix(name) {
	        return (name === 'mousewheel' && env.browser.firefox) ? 'DOMMouseScroll' : name;
	    }
	
	    util.mixin(Handler, Eventful);
	    util.mixin(Handler, Draggable);
	
	    module.exports = Handler;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 事件辅助类
	 * @module zrender/core/event
	 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 */
	
	
	    var Eventful = __webpack_require__(12);
	
	    var isDomLevel2 = (typeof window !== 'undefined') && !!window.addEventListener;
	
	    function getBoundingClientRect(el) {
	        // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect
	        return el.getBoundingClientRect ? el.getBoundingClientRect() : { left: 0, top: 0};
	    }
	    /**
	     * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标
	     */
	    function normalizeEvent(el, e) {
	
	        e = e || window.event;
	
	        if (e.zrX != null) {
	            return e;
	        }
	
	        var eventType = e.type;
	        var isTouch = eventType && eventType.indexOf('touch') >= 0;
	
	        if (!isTouch) {
	            var box = getBoundingClientRect(el);
	            e.zrX = e.clientX - box.left;
	            e.zrY = e.clientY - box.top;
	            e.zrDelta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
	        }
	        else {
	            var touch = eventType != 'touchend'
	                            ? e.targetTouches[0]
	                            : e.changedTouches[0];
	            if (touch) {
	                var rBounding = getBoundingClientRect(el);
	                // touch事件坐标是全屏的~
	                e.zrX = touch.clientX - rBounding.left;
	                e.zrY = touch.clientY - rBounding.top;
	            }
	        }
	
	        return e;
	    }
	
	    function addEventListener(el, name, handler) {
	        if (isDomLevel2) {
	            el.addEventListener(name, handler);
	        }
	        else {
	            el.attachEvent('on' + name, handler);
	        }
	    }
	
	    function removeEventListener(el, name, handler) {
	        if (isDomLevel2) {
	            el.removeEventListener(name, handler);
	        }
	        else {
	            el.detachEvent('on' + name, handler);
	        }
	    }
	
	    /**
	     * 停止冒泡和阻止默认行为
	     * @memberOf module:zrender/core/event
	     * @method
	     * @param {Event} e : event对象
	     */
	    var stop = isDomLevel2
	        ? function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            e.cancelBubble = true;
	        }
	        : function (e) {
	            e.returnValue = false;
	            e.cancelBubble = true;
	        };
	
	    module.exports = {
	        normalizeEvent: normalizeEvent,
	        addEventListener: addEventListener,
	        removeEventListener: removeEventListener,
	
	        stop: stop,
	        // 做向上兼容
	        Dispatcher: Eventful
	    };
	


/***/ },
/* 62 */
/***/ function(module, exports) {

	// TODO Draggable for group
	// FIXME Draggable on element which has parent rotation or scale
	
	    function Draggable() {
	
	        this.on('mousedown', this._dragStart, this);
	        this.on('mousemove', this._drag, this);
	        this.on('mouseup', this._dragEnd, this);
	        this.on('globalout', this._dragEnd, this);
	        // this._dropTarget = null;
	        // this._draggingTarget = null;
	
	        // this._x = 0;
	        // this._y = 0;
	    }
	
	    Draggable.prototype = {
	
	        constructor: Draggable,
	
	        _dragStart: function (e) {
	            var draggingTarget = e.target;
	            if (draggingTarget && draggingTarget.draggable) {
	                this._draggingTarget = draggingTarget;
	                draggingTarget.dragging = true;
	                this._x = e.offsetX;
	                this._y = e.offsetY;
	
	                this._dispatchProxy(draggingTarget, 'dragstart', e.event);
	            }
	        },
	
	        _drag: function (e) {
	            var draggingTarget = this._draggingTarget;
	            if (draggingTarget) {
	
	                var x = e.offsetX;
	                var y = e.offsetY;
	
	                var dx = x - this._x;
	                var dy = y - this._y;
	                this._x = x;
	                this._y = y;
	
	                draggingTarget.drift(dx, dy, e);
	                this._dispatchProxy(draggingTarget, 'drag', e.event);
	
	                var dropTarget = this.findHover(x, y, draggingTarget);
	                var lastDropTarget = this._dropTarget;
	                this._dropTarget = dropTarget;
	
	                if (draggingTarget !== dropTarget) {
	                    if (lastDropTarget && dropTarget !== lastDropTarget) {
	                        this._dispatchProxy(lastDropTarget, 'dragleave', e.event);
	                    }
	                    if (dropTarget && dropTarget !== lastDropTarget) {
	                        this._dispatchProxy(dropTarget, 'dragenter', e.event);
	                    }
	                }
	            }
	        },
	
	        _dragEnd: function (e) {
	            var draggingTarget = this._draggingTarget;
	
	            if (draggingTarget) {
	                draggingTarget.dragging = false;
	            }
	
	            this._dispatchProxy(draggingTarget, 'dragend', e.event);
	
	            if (this._dropTarget) {
	                this._dispatchProxy(this._dropTarget, 'drop', e.event);
	            }
	
	            this._draggingTarget = null;
	            this._dropTarget = null;
	        }
	
	    };
	
	    module.exports = Draggable;


/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * Only implements needed gestures for mobile.
	 */
	
	
	    var GestureMgr = function () {
	
	        /**
	         * @private
	         * @type {Array.<Object>}
	         */
	        this._track = [];
	    };
	
	    GestureMgr.prototype = {
	
	        constructor: GestureMgr,
	
	        recognize: function (event, target) {
	            this._doTrack(event, target);
	            return this._recognize(event);
	        },
	
	        clear: function () {
	            this._track.length = 0;
	            return this;
	        },
	
	        _doTrack: function (event, target) {
	            var touches = event.touches;
	
	            if (!touches) {
	                return;
	            }
	
	            var trackItem = {
	                points: [],
	                touches: [],
	                target: target,
	                event: event
	            };
	
	            for (var i = 0, len = touches.length; i < len; i++) {
	                var touch = touches[i];
	                trackItem.points.push([touch.clientX, touch.clientY]);
	                trackItem.touches.push(touch);
	            }
	
	            this._track.push(trackItem);
	        },
	
	        _recognize: function (event) {
	            for (var eventName in recognizers) {
	                if (recognizers.hasOwnProperty(eventName)) {
	                    var gestureInfo = recognizers[eventName](this._track, event);
	                    if (gestureInfo) {
	                        return gestureInfo;
	                    }
	                }
	            }
	        }
	    };
	
	    function dist(pointPair) {
	        var dx = pointPair[1][0] - pointPair[0][0];
	        var dy = pointPair[1][1] - pointPair[0][1];
	
	        return Math.sqrt(dx * dx + dy * dy);
	    }
	
	    function center(pointPair) {
	        return [
	            (pointPair[0][0] + pointPair[1][0]) / 2,
	            (pointPair[0][1] + pointPair[1][1]) / 2
	        ];
	    }
	
	    var recognizers = {
	
	        pinch: function (track, event) {
	            var trackLen = track.length;
	
	            if (!trackLen) {
	                return;
	            }
	
	            var pinchEnd = (track[trackLen - 1] || {}).points;
	            var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;
	
	            if (pinchPre
	                && pinchPre.length > 1
	                && pinchEnd
	                && pinchEnd.length > 1
	            ) {
	                var pinchScale = dist(pinchEnd) / dist(pinchPre);
	                !isFinite(pinchScale) && (pinchScale = 1);
	
	                event.pinchScale = pinchScale;
	
	                var pinchCenter = center(pinchEnd);
	                event.pinchX = pinchCenter[0];
	                event.pinchY = pinchCenter[1];
	
	                return {
	                    type: 'pinch',
	                    target: track[0].target,
	                    event: event
	                };
	            }
	        }
	
	        // Only pinch currently.
	    };
	
	    module.exports = GestureMgr;
	


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Storage内容仓库模块
	 * @module zrender/Storage
	 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 * @author errorrik (errorrik@gmail.com)
	 * @author pissang (https://github.com/pissang/)
	 */
	
	
	    var util = __webpack_require__(4);
	
	    var Group = __webpack_require__(37);
	
	    function shapeCompareFunc(a, b) {
	        if (a.zlevel === b.zlevel) {
	            if (a.z === b.z) {
	                if (a.z2 === b.z2) {
	                    return a.__renderidx - b.__renderidx;
	                }
	                return a.z2 - b.z2;
	            }
	            return a.z - b.z;
	        }
	        return a.zlevel - b.zlevel;
	    }
	    /**
	     * 内容仓库 (M)
	     * @alias module:zrender/Storage
	     * @constructor
	     */
	    var Storage = function () {
	        // 所有常规形状，id索引的map
	        this._elements = {};
	
	        this._roots = [];
	
	        this._displayList = [];
	
	        this._displayListLen = 0;
	    };
	
	    Storage.prototype = {
	
	        constructor: Storage,
	
	        /**
	         * 返回所有图形的绘制队列
	         * @param {boolean} [update=false] 是否在返回前更新该数组
	         * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组, 在 update 为 true 的时候有效
	         *
	         * 详见{@link module:zrender/graphic/Displayable.prototype.updateDisplayList}
	         * @return {Array.<module:zrender/graphic/Displayable>}
	         */
	        getDisplayList: function (update, includeIgnore) {
	            includeIgnore = includeIgnore || false;
	            if (update) {
	                this.updateDisplayList(includeIgnore);
	            }
	            return this._displayList;
	        },
	
	        /**
	         * 更新图形的绘制队列。
	         * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
	         * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
	         * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组
	         */
	        updateDisplayList: function (includeIgnore) {
	            this._displayListLen = 0;
	            var roots = this._roots;
	            var displayList = this._displayList;
	            for (var i = 0, len = roots.length; i < len; i++) {
	                this._updateAndAddDisplayable(roots[i], null, includeIgnore);
	            }
	            displayList.length = this._displayListLen;
	
	            for (var i = 0, len = displayList.length; i < len; i++) {
	                displayList[i].__renderidx = i;
	            }
	
	            displayList.sort(shapeCompareFunc);
	        },
	
	        _updateAndAddDisplayable: function (el, clipPaths, includeIgnore) {
	
	            if (el.ignore && !includeIgnore) {
	                return;
	            }
	
	            el.beforeUpdate();
	
	            el.update();
	
	            el.afterUpdate();
	
	            var clipPath = el.clipPath;
	            if (clipPath) {
	                // clipPath 的变换是基于 group 的变换
	                clipPath.parent = el;
	                clipPath.updateTransform();
	
	                // FIXME 效率影响
	                if (clipPaths) {
	                    clipPaths = clipPaths.slice();
	                    clipPaths.push(clipPath);
	                }
	                else {
	                    clipPaths = [clipPath];
	                }
	            }
	
	            if (el.type == 'group') {
	                var children = el._children;
	
	                for (var i = 0; i < children.length; i++) {
	                    var child = children[i];
	
	                    // Force to mark as dirty if group is dirty
	                    // FIXME __dirtyPath ?
	                    child.__dirty = el.__dirty || child.__dirty;
	
	                    this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
	                }
	
	                // Mark group clean here
	                el.__dirty = false;
	
	            }
	            else {
	                el.__clipPaths = clipPaths;
	
	                this._displayList[this._displayListLen++] = el;
	            }
	        },
	
	        /**
	         * 添加图形(Shape)或者组(Group)到根节点
	         * @param {module:zrender/Element} el
	         */
	        addRoot: function (el) {
	            // Element has been added
	            if (this._elements[el.id]) {
	                return;
	            }
	
	            if (el instanceof Group) {
	                el.addChildrenToStorage(this);
	            }
	
	            this.addToMap(el);
	            this._roots.push(el);
	        },
	
	        /**
	         * 删除指定的图形(Shape)或者组(Group)
	         * @param {string|Array.<string>} [elId] 如果为空清空整个Storage
	         */
	        delRoot: function (elId) {
	            if (elId == null) {
	                // 不指定elId清空
	                for (var i = 0; i < this._roots.length; i++) {
	                    var root = this._roots[i];
	                    if (root instanceof Group) {
	                        root.delChildrenFromStorage(this);
	                    }
	                }
	
	                this._elements = {};
	                this._roots = [];
	                this._displayList = [];
	                this._displayListLen = 0;
	
	                return;
	            }
	
	            if (elId instanceof Array) {
	                for (var i = 0, l = elId.length; i < l; i++) {
	                    this.delRoot(elId[i]);
	                }
	                return;
	            }
	
	            var el;
	            if (typeof(elId) == 'string') {
	                el = this._elements[elId];
	            }
	            else {
	                el = elId;
	            }
	
	            var idx = util.indexOf(this._roots, el);
	            if (idx >= 0) {
	                this.delFromMap(el.id);
	                this._roots.splice(idx, 1);
	                if (el instanceof Group) {
	                    el.delChildrenFromStorage(this);
	                }
	            }
	        },
	
	        addToMap: function (el) {
	            if (el instanceof Group) {
	                el.__storage = this;
	            }
	            el.dirty();
	
	            this._elements[el.id] = el;
	
	            return this;
	        },
	
	        get: function (elId) {
	            return this._elements[elId];
	        },
	
	        delFromMap: function (elId) {
	            var elements = this._elements;
	            var el = elements[elId];
	            if (el) {
	                delete elements[elId];
	                if (el instanceof Group) {
	                    el.__storage = null;
	                }
	            }
	
	            return this;
	        },
	
	        /**
	         * 清空并且释放Storage
	         */
	        dispose: function () {
	            this._elements =
	            this._renderList =
	            this._roots = null;
	        }
	    };
	
	    module.exports = Storage;
	


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 动画主类, 调度和管理所有动画控制器
	 *
	 * @module zrender/animation/Animation
	 * @author pissang(https://github.com/pissang)
	 */
	// TODO Additive animation
	// http://iosoteric.com/additive-animations-animatewithduration-in-ios-8/
	// https://developer.apple.com/videos/wwdc2014/#236
	
	
	    var util = __webpack_require__(4);
	    var Dispatcher = __webpack_require__(61).Dispatcher;
	
	    var requestAnimationFrame = (typeof window !== 'undefined' &&
	                                    (window.requestAnimationFrame
	                                    || window.msRequestAnimationFrame
	                                    || window.mozRequestAnimationFrame
	                                    || window.webkitRequestAnimationFrame))
	                                || function (func) {
	                                    setTimeout(func, 16);
	                                };
	
	    var Animator = __webpack_require__(17);
	    /**
	     * @typedef {Object} IZRenderStage
	     * @property {Function} update
	     */
	
	    /**
	     * @alias module:zrender/animation/Animation
	     * @constructor
	     * @param {Object} [options]
	     * @param {Function} [options.onframe]
	     * @param {IZRenderStage} [options.stage]
	     * @example
	     *     var animation = new Animation();
	     *     var obj = {
	     *         x: 100,
	     *         y: 100
	     *     };
	     *     animation.animate(node.position)
	     *         .when(1000, {
	     *             x: 500,
	     *             y: 500
	     *         })
	     *         .when(2000, {
	     *             x: 100,
	     *             y: 100
	     *         })
	     *         .start('spline');
	     */
	    var Animation = function (options) {
	
	        options = options || {};
	
	        this.stage = options.stage || {};
	
	        this.onframe = options.onframe || function() {};
	
	        // private properties
	        this._clips = [];
	
	        this._running = false;
	
	        this._time = 0;
	
	        Dispatcher.call(this);
	    };
	
	    Animation.prototype = {
	
	        constructor: Animation,
	        /**
	         * 添加 clip
	         * @param {module:zrender/animation/Clip} clip
	         */
	        addClip: function (clip) {
	            this._clips.push(clip);
	        },
	        /**
	         * 添加 animator
	         * @param {module:zrender/animation/Animator} animator
	         */
	        addAnimator: function (animator) {
	            animator.animation = this;
	            var clips = animator.getClips();
	            for (var i = 0; i < clips.length; i++) {
	                this.addClip(clips[i]);
	            }
	        },
	        /**
	         * 删除动画片段
	         * @param {module:zrender/animation/Clip} clip
	         */
	        removeClip: function(clip) {
	            var idx = util.indexOf(this._clips, clip);
	            if (idx >= 0) {
	                this._clips.splice(idx, 1);
	            }
	        },
	
	        /**
	         * 删除动画片段
	         * @param {module:zrender/animation/Animator} animator
	         */
	        removeAnimator: function (animator) {
	            var clips = animator.getClips();
	            for (var i = 0; i < clips.length; i++) {
	                this.removeClip(clips[i]);
	            }
	            animator.animation = null;
	        },
	
	        _update: function() {
	
	            var time = new Date().getTime();
	            var delta = time - this._time;
	            var clips = this._clips;
	            var len = clips.length;
	
	            var deferredEvents = [];
	            var deferredClips = [];
	            for (var i = 0; i < len; i++) {
	                var clip = clips[i];
	                var e = clip.step(time);
	                // Throw out the events need to be called after
	                // stage.update, like destroy
	                if (e) {
	                    deferredEvents.push(e);
	                    deferredClips.push(clip);
	                }
	            }
	
	            // Remove the finished clip
	            for (var i = 0; i < len;) {
	                if (clips[i]._needsRemove) {
	                    clips[i] = clips[len - 1];
	                    clips.pop();
	                    len--;
	                }
	                else {
	                    i++;
	                }
	            }
	
	            len = deferredEvents.length;
	            for (var i = 0; i < len; i++) {
	                deferredClips[i].fire(deferredEvents[i]);
	            }
	
	            this._time = time;
	
	            this.onframe(delta);
	
	            this.trigger('frame', delta);
	
	            if (this.stage.update) {
	                this.stage.update();
	            }
	        },
	        /**
	         * 开始运行动画
	         */
	        start: function () {
	            var self = this;
	
	            this._running = true;
	
	            function step() {
	                if (self._running) {
	
	                    requestAnimationFrame(step);
	
	                    self._update();
	                }
	            }
	
	            this._time = new Date().getTime();
	            requestAnimationFrame(step);
	        },
	        /**
	         * 停止运行动画
	         */
	        stop: function () {
	            this._running = false;
	        },
	        /**
	         * 清除所有动画片段
	         */
	        clear: function () {
	            this._clips = [];
	        },
	        /**
	         * 对一个目标创建一个animator对象，可以指定目标中的属性使用动画
	         * @param  {Object} target
	         * @param  {Object} options
	         * @param  {boolean} [options.loop=false] 是否循环播放动画
	         * @param  {Function} [options.getter=null]
	         *         如果指定getter函数，会通过getter函数取属性值
	         * @param  {Function} [options.setter=null]
	         *         如果指定setter函数，会通过setter函数设置属性值
	         * @return {module:zrender/animation/Animation~Animator}
	         */
	        animate: function (target, options) {
	            options = options || {};
	            var animator = new Animator(
	                target,
	                options.loop,
	                options.getter,
	                options.setter
	            );
	
	            return animator;
	        }
	    };
	
	    util.mixin(Animation, Dispatcher);
	
	    module.exports = Animation;
	


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Default canvas painter
	 * @module zrender/Painter
	 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
	 *         errorrik (errorrik@gmail.com)
	 *         pissang (https://www.github.com/pissang)
	 */
	 
	
	    var config = __webpack_require__(22);
	    var util = __webpack_require__(4);
	    var log = __webpack_require__(21);
	    var BoundingRect = __webpack_require__(25);
	
	    var Layer = __webpack_require__(67);
	
	    function parseInt10(val) {
	        return parseInt(val, 10);
	    }
	
	    function isLayerValid(layer) {
	        if (!layer) {
	            return false;
	        }
	
	        if (layer.isBuildin) {
	            return true;
	        }
	
	        if (typeof(layer.resize) !== 'function'
	            || typeof(layer.refresh) !== 'function'
	        ) {
	            return false;
	        }
	
	        return true;
	    }
	
	    function preProcessLayer(layer) {
	        layer.__unusedCount++;
	    }
	
	    function postProcessLayer(layer) {
	        layer.__dirty = false;
	        if (layer.__unusedCount == 1) {
	            layer.clear();
	        }
	    }
	
	    var tmpRect = new BoundingRect(0, 0, 0, 0);
	    var viewRect = new BoundingRect(0, 0, 0, 0);
	    function isDisplayableCulled(el, width, height) {
	        tmpRect.copy(el.getBoundingRect());
	        if (el.transform) {
	            tmpRect.applyTransform(el.transform);
	        }
	        viewRect.width = width;
	        viewRect.height = height;
	        return !tmpRect.intersect(viewRect);
	    }
	
	    function isClipPathChanged(clipPaths, prevClipPaths) {
	        if (!clipPaths || !prevClipPaths || (clipPaths.length !== prevClipPaths.length)) {
	            return true;
	        }
	        for (var i = 0; i < clipPaths.length; i++) {
	            if (clipPaths[i] !== prevClipPaths[i]) {
	                return true;
	            }
	        }
	    }
	
	    function doClip(clipPaths, ctx) {
	        for (var i = 0; i < clipPaths.length; i++) {
	            var clipPath = clipPaths[i];
	            var m;
	            if (clipPath.transform) {
	                m = clipPath.transform;
	                ctx.transform(
	                    m[0], m[1],
	                    m[2], m[3],
	                    m[4], m[5]
	                );
	            }
	            var path = clipPath.path;
	            path.beginPath(ctx);
	            clipPath.buildPath(path, clipPath.shape);
	            ctx.clip();
	            // Transform back
	            if (clipPath.transform) {
	                m = clipPath.invTransform;
	                ctx.transform(
	                    m[0], m[1],
	                    m[2], m[3],
	                    m[4], m[5]
	                );
	            }
	        }
	    }
	
	    /**
	     * @alias module:zrender/Painter
	     * @constructor
	     * @param {HTMLElement} root 绘图容器
	     * @param {module:zrender/Storage} storage
	     * @param {Ojbect} opts
	     */
	    var Painter = function (root, storage, opts) {
	        var singleCanvas = !root.nodeName // In node ?
	            || root.nodeName.toUpperCase() === 'CANVAS';
	
	        opts = opts || {};
	
	        /**
	         * @type {number}
	         */
	        this.dpr = opts.devicePixelRatio || config.devicePixelRatio;
	        /**
	         * @type {boolean}
	         * @private
	         */
	        this._singleCanvas = singleCanvas;
	        /**
	         * 绘图容器
	         * @type {HTMLElement}
	         */
	        this.root = root;
	
	        var rootStyle = root.style;
	
	        // In node environment using node-canvas
	        if (rootStyle) {
	            rootStyle['-webkit-tap-highlight-color'] = 'transparent';
	            rootStyle['-webkit-user-select'] = 'none';
	            rootStyle['user-select'] = 'none';
	            rootStyle['-webkit-touch-callout'] = 'none';
	
	            root.innerHTML = '';
	        }
	
	        /**
	         * @type {module:zrender/Storage}
	         */
	        this.storage = storage;
	
	        if (!singleCanvas) {
	            var width = this._getWidth();
	            var height = this._getHeight();
	            this._width = width;
	            this._height = height;
	
	            var domRoot = document.createElement('div');
	            this._domRoot = domRoot;
	            var domRootStyle = domRoot.style;
	
	            // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
	            domRootStyle.position = 'relative';
	            domRootStyle.overflow = 'hidden';
	            domRootStyle.width = this._width + 'px';
	            domRootStyle.height = this._height + 'px';
	            root.appendChild(domRoot);
	
	            /**
	             * @type {Object.<key, module:zrender/Layer>}
	             * @private
	             */
	            this._layers = {};
	            /**
	             * @type {Array.<number>}
	             * @private
	             */
	            this._zlevelList = [];
	        }
	        else {
	            // Use canvas width and height directly
	            var width = root.width;
	            var height = root.height;
	            this._width = width;
	            this._height = height;
	
	            // Create layer if only one given canvas
	            // Device pixel ratio is fixed to 1 because given canvas has its specified width and height
	            var mainLayer = new Layer(root, this, 1);
	            mainLayer.initContext();
	            // FIXME Use canvas width and height
	            // mainLayer.resize(width, height);
	            this._layers = {
	                0: mainLayer
	            };
	            this._zlevelList = [0];
	        }
	
	        this._layerConfig = {};
	
	        this.pathToImage = this._createPathToImage();
	    };
	
	    Painter.prototype = {
	
	        constructor: Painter,
	
	        /**
	         * If painter use a single canvas
	         * @return {boolean}
	         */
	        isSingleCanvas: function () {
	            return this._singleCanvas;
	        },
	        /**
	         * @return {HTMLDivElement}
	         */
	        getViewportRoot: function () {
	            return this._singleCanvas ? this._layers[0].dom : this._domRoot;
	        },
	
	        /**
	         * 刷新
	         * @param {boolean} [paintAll=false] 强制绘制所有displayable
	         */
	        refresh: function (paintAll) {
	            var list = this.storage.getDisplayList(true);
	            var zlevelList = this._zlevelList;
	
	            this._paintList(list, paintAll);
	
	            // Paint custum layers
	            for (var i = 0; i < zlevelList.length; i++) {
	                var z = zlevelList[i];
	                var layer = this._layers[z];
	                if (!layer.isBuildin && layer.refresh) {
	                    layer.refresh();
	                }
	            }
	
	            return this;
	        },
	
	        _paintList: function (list, paintAll) {
	
	            if (paintAll == null) {
	                paintAll = false;
	            }
	
	            this._updateLayerStatus(list);
	
	            var currentLayer;
	            var currentZLevel;
	            var ctx;
	
	            var viewWidth = this._width;
	            var viewHeight = this._height;
	
	            this.eachBuildinLayer(preProcessLayer);
	
	            // var invTransform = [];
	            var prevElClipPaths = null;
	
	            for (var i = 0, l = list.length; i < l; i++) {
	                var el = list[i];
	                var elZLevel = this._singleCanvas ? 0 : el.zlevel;
	                // Change draw layer
	                if (currentZLevel !== elZLevel) {
	                    // Only 0 zlevel if only has one canvas
	                    currentZLevel = elZLevel;
	                    currentLayer = this.getLayer(currentZLevel);
	
	                    if (!currentLayer.isBuildin) {
	                        log(
	                            'ZLevel ' + currentZLevel
	                            + ' has been used by unkown layer ' + currentLayer.id
	                        );
	                    }
	
	                    ctx = currentLayer.ctx;
	
	                    // Reset the count
	                    currentLayer.__unusedCount = 0;
	
	                    if (currentLayer.__dirty || paintAll) {
	                        currentLayer.clear();
	                    }
	                }
	
	                if (
	                    (currentLayer.__dirty || paintAll)
	                    // Ignore invisible element
	                    && !el.invisible
	                    // Ignore transparent element
	                    && el.style.opacity !== 0
	                    // Ignore scale 0 element, in some environment like node-canvas
	                    // Draw a scale 0 element can cause all following draw wrong
	                    && el.scale[0] && el.scale[1]
	                    // Ignore culled element
	                    && !(el.culling && isDisplayableCulled(el, viewWidth, viewHeight))
	                ) {
	                    var clipPaths = el.__clipPaths;
	
	                    // Optimize when clipping on group with several elements
	                    if (isClipPathChanged(clipPaths, prevElClipPaths)) {
	                        // If has previous clipping state, restore from it
	                        if (prevElClipPaths) {
	                            ctx.restore();
	                        }
	                        // New clipping state
	                        if (clipPaths) {
	                            ctx.save();
	                            doClip(clipPaths, ctx);
	                        }
	                        prevElClipPaths = clipPaths;
	                    }
	                    // TODO Use events ?
	                    el.beforeBrush && el.beforeBrush(ctx);
	                    el.brush(ctx, false);
	                    el.afterBrush && el.afterBrush(ctx);
	                }
	
	                el.__dirty = false;
	            }
	
	            // If still has clipping state
	            if (prevElClipPaths) {
	                ctx.restore();
	            }
	
	            this.eachBuildinLayer(postProcessLayer);
	        },
	
	        /**
	         * 获取 zlevel 所在层，如果不存在则会创建一个新的层
	         * @param {number} zlevel
	         * @return {module:zrender/Layer}
	         */
	        getLayer: function (zlevel) {
	            if (this._singleCanvas) {
	                return this._layers[0];
	            }
	
	            var layer = this._layers[zlevel];
	            if (!layer) {
	                // Create a new layer
	                layer = new Layer('zr_' + zlevel, this, this.dpr);
	                layer.isBuildin = true;
	
	                if (this._layerConfig[zlevel]) {
	                    util.merge(layer, this._layerConfig[zlevel], true);
	                }
	
	                this.insertLayer(zlevel, layer);
	
	                // Context is created after dom inserted to document
	                // Or excanvas will get 0px clientWidth and clientHeight
	                layer.initContext();
	            }
	
	            return layer;
	        },
	
	        insertLayer: function (zlevel, layer) {
	
	            var layersMap = this._layers;
	            var zlevelList = this._zlevelList;
	            var len = zlevelList.length;
	            var prevLayer = null;
	            var i = -1;
	            var domRoot = this._domRoot;
	
	            if (layersMap[zlevel]) {
	                log('ZLevel ' + zlevel + ' has been used already');
	                return;
	            }
	            // Check if is a valid layer
	            if (!isLayerValid(layer)) {
	                log('Layer of zlevel ' + zlevel + ' is not valid');
	                return;
	            }
	
	            if (len > 0 && zlevel > zlevelList[0]) {
	                for (i = 0; i < len - 1; i++) {
	                    if (
	                        zlevelList[i] < zlevel
	                        && zlevelList[i + 1] > zlevel
	                    ) {
	                        break;
	                    }
	                }
	                prevLayer = layersMap[zlevelList[i]];
	            }
	            zlevelList.splice(i + 1, 0, zlevel);
	
	            if (prevLayer) {
	                var prevDom = prevLayer.dom;
	                if (prevDom.nextSibling) {
	                    domRoot.insertBefore(
	                        layer.dom,
	                        prevDom.nextSibling
	                    );
	                }
	                else {
	                    domRoot.appendChild(layer.dom);
	                }
	            }
	            else {
	                if (domRoot.firstChild) {
	                    domRoot.insertBefore(layer.dom, domRoot.firstChild);
	                }
	                else {
	                    domRoot.appendChild(layer.dom);
	                }
	            }
	
	            layersMap[zlevel] = layer;
	        },
	
	        // Iterate each layer
	        eachLayer: function (cb, context) {
	            var zlevelList = this._zlevelList;
	            var z;
	            var i;
	            for (i = 0; i < zlevelList.length; i++) {
	                z = zlevelList[i];
	                cb.call(context, this._layers[z], z);
	            }
	        },
	
	        // Iterate each buildin layer
	        eachBuildinLayer: function (cb, context) {
	            var zlevelList = this._zlevelList;
	            var layer;
	            var z;
	            var i;
	            for (i = 0; i < zlevelList.length; i++) {
	                z = zlevelList[i];
	                layer = this._layers[z];
	                if (layer.isBuildin) {
	                    cb.call(context, layer, z);
	                }
	            }
	        },
	
	        // Iterate each other layer except buildin layer
	        eachOtherLayer: function (cb, context) {
	            var zlevelList = this._zlevelList;
	            var layer;
	            var z;
	            var i;
	            for (i = 0; i < zlevelList.length; i++) {
	                z = zlevelList[i];
	                layer = this._layers[z];
	                if (! layer.isBuildin) {
	                    cb.call(context, layer, z);
	                }
	            }
	        },
	
	        /**
	         * 获取所有已创建的层
	         * @param {Array.<module:zrender/Layer>} [prevLayer]
	         */
	        getLayers: function () {
	            return this._layers;
	        },
	
	        _updateLayerStatus: function (list) {
	
	            var layers = this._layers;
	
	            var elCounts = {};
	
	            this.eachBuildinLayer(function (layer, z) {
	                elCounts[z] = layer.elCount;
	                layer.elCount = 0;
	            });
	
	            for (var i = 0, l = list.length; i < l; i++) {
	                var el = list[i];
	                var zlevel = this._singleCanvas ? 0 : el.zlevel;
	                var layer = layers[zlevel];
	                if (layer) {
	                    layer.elCount++;
	                    // 已经被标记为需要刷新
	                    if (layer.__dirty) {
	                        continue;
	                    }
	                    layer.__dirty = el.__dirty;
	                }
	            }
	
	            // 层中的元素数量有发生变化
	            this.eachBuildinLayer(function (layer, z) {
	                if (elCounts[z] !== layer.elCount) {
	                    layer.__dirty = true;
	                }
	            });
	        },
	
	        /**
	         * 清除hover层外所有内容
	         */
	        clear: function () {
	            this.eachBuildinLayer(this._clearLayer);
	            return this;
	        },
	
	        _clearLayer: function (layer) {
	            layer.clear();
	        },
	
	        /**
	         * 修改指定zlevel的绘制参数
	         *
	         * @param {string} zlevel
	         * @param {Object} config 配置对象
	         * @param {string} [config.clearColor=0] 每次清空画布的颜色
	         * @param {string} [config.motionBlur=false] 是否开启动态模糊
	         * @param {number} [config.lastFrameAlpha=0.7]
	         *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
	         */
	        configLayer: function (zlevel, config) {
	            if (config) {
	                var layerConfig = this._layerConfig;
	                if (!layerConfig[zlevel]) {
	                    layerConfig[zlevel] = config;
	                }
	                else {
	                    util.merge(layerConfig[zlevel], config, true);
	                }
	
	                var layer = this._layers[zlevel];
	
	                if (layer) {
	                    util.merge(layer, layerConfig[zlevel], true);
	                }
	            }
	        },
	
	        /**
	         * 删除指定层
	         * @param {number} zlevel 层所在的zlevel
	         */
	        delLayer: function (zlevel) {
	            var layers = this._layers;
	            var zlevelList = this._zlevelList;
	            var layer = layers[zlevel];
	            if (!layer) {
	                return;
	            }
	            layer.dom.parentNode.removeChild(layer.dom);
	            delete layers[zlevel];
	
	            zlevelList.splice(util.indexOf(zlevelList, zlevel), 1);
	        },
	
	        /**
	         * 区域大小变化后重绘
	         */
	        resize: function (width, height) {
	            var domRoot = this._domRoot;
	            // FIXME Why ?
	            domRoot.style.display = 'none';
	
	            width = width || this._getWidth();
	            height = height || this._getHeight();
	
	            domRoot.style.display = '';
	
	            // 优化没有实际改变的resize
	            if (this._width != width || height != this._height) {
	                domRoot.style.width = width + 'px';
	                domRoot.style.height = height + 'px';
	
	                for (var id in this._layers) {
	                    this._layers[id].resize(width, height);
	                }
	
	                this.refresh(true);
	            }
	
	            this._width = width;
	            this._height = height;
	
	            return this;
	        },
	
	        /**
	         * 清除单独的一个层
	         * @param {number} zlevel
	         */
	        clearLayer: function (zlevel) {
	            var layer = this._layers[zlevel];
	            if (layer) {
	                layer.clear();
	            }
	        },
	
	        /**
	         * 释放
	         */
	        dispose: function () {
	            this.root.innerHTML = '';
	
	            this.root =
	            this.storage =
	
	            this._domRoot =
	            this._layers = null;
	        },
	
	        /**
	         * Get canvas which has all thing rendered
	         * @param {Object} opts
	         * @param {string} [opts.backgroundColor]
	         */
	        getRenderedCanvas: function (opts) {
	            opts = opts || {};
	            if (this._singleCanvas) {
	                return this._layers[0].dom;
	            }
	
	            var imageLayer = new Layer('image', this, opts.pixelRatio || this.dpr);
	            imageLayer.initContext();
	
	            var ctx = imageLayer.ctx;
	            imageLayer.clearColor = opts.backgroundColor;
	            imageLayer.clear();
	
	            var displayList = this.storage.getDisplayList(true);
	
	            for (var i = 0; i < displayList.length; i++) {
	                var el = displayList[i];
	                if (!el.invisible) {
	                    el.beforeBrush && el.beforeBrush(ctx);
	                    // TODO Check image cross origin
	                    el.brush(ctx, false);
	                    el.afterBrush && el.afterBrush(ctx);
	                }
	            }
	
	            return imageLayer.dom;
	        },
	        /**
	         * 获取绘图区域宽度
	         */
	        getWidth: function () {
	            return this._width;
	        },
	
	        /**
	         * 获取绘图区域高度
	         */
	        getHeight: function () {
	            return this._height;
	        },
	
	        _getWidth: function () {
	            var root = this.root;
	            var stl = document.defaultView.getComputedStyle(root);
	
	            // FIXME Better way to get the width and height when element has not been append to the document
	            return ((root.clientWidth || parseInt10(stl.width) || parseInt10(root.style.width))
	                    - (parseInt10(stl.paddingLeft) || 0)
	                    - (parseInt10(stl.paddingRight) || 0)) | 0;
	        },
	
	        _getHeight: function () {
	            var root = this.root;
	            var stl = document.defaultView.getComputedStyle(root);
	
	            return ((root.clientHeight || parseInt10(stl.height) || parseInt10(root.style.height))
	                    - (parseInt10(stl.paddingTop) || 0)
	                    - (parseInt10(stl.paddingBottom) || 0)) | 0;
	        },
	
	        _pathToImage: function (id, path, width, height, dpr) {
	            var canvas = document.createElement('canvas');
	            var ctx = canvas.getContext('2d');
	
	            canvas.width = width * dpr;
	            canvas.height = height * dpr;
	
	            ctx.clearRect(0, 0, width * dpr, height * dpr);
	
	            var pathTransform = {
	                position: path.position,
	                rotation: path.rotation,
	                scale: path.scale
	            };
	            path.position = [0, 0, 0];
	            path.rotation = 0;
	            path.scale = [1, 1];
	            if (path) {
	                path.brush(ctx);
	            }
	
	            var ImageShape = __webpack_require__(38);
	            var imgShape = new ImageShape({
	                id: id,
	                style: {
	                    x: 0,
	                    y: 0,
	                    image: canvas
	                }
	            });
	
	            if (pathTransform.position != null) {
	                imgShape.position = path.position = pathTransform.position;
	            }
	
	            if (pathTransform.rotation != null) {
	                imgShape.rotation = path.rotation = pathTransform.rotation;
	            }
	
	            if (pathTransform.scale != null) {
	                imgShape.scale = path.scale = pathTransform.scale;
	            }
	
	            return imgShape;
	        },
	
	        _createPathToImage: function () {
	            var me = this;
	
	            return function (id, e, width, height) {
	                return me._pathToImage(
	                    id, e, width, height, me.dpr
	                );
	            };
	        }
	    };
	
	    module.exports = Painter;
	


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module zrender/Layer
	 * @author pissang(https://www.github.com/pissang)
	 */
	
	
	    var util = __webpack_require__(4);
	    var config = __webpack_require__(22);
	
	    function returnFalse() {
	        return false;
	    }
	
	    /**
	     * 创建dom
	     *
	     * @inner
	     * @param {string} id dom id 待用
	     * @param {string} type dom type，such as canvas, div etc.
	     * @param {Painter} painter painter instance
	     * @param {number} number
	     */
	    function createDom(id, type, painter, dpr) {
	        var newDom = document.createElement(type);
	        var width = painter.getWidth();
	        var height = painter.getHeight();
	
	        var newDomStyle = newDom.style;
	        // 没append呢，请原谅我这样写，清晰~
	        newDomStyle.position = 'absolute';
	        newDomStyle.left = 0;
	        newDomStyle.top = 0;
	        newDomStyle.width = width + 'px';
	        newDomStyle.height = height + 'px';
	        newDom.width = width * dpr;
	        newDom.height = height * dpr;
	
	        // id不作为索引用，避免可能造成的重名，定义为私有属性
	        newDom.setAttribute('data-zr-dom-id', id);
	        return newDom;
	    }
	
	    /**
	     * @alias module:zrender/Layer
	     * @constructor
	     * @extends module:zrender/mixin/Transformable
	     * @param {string} id
	     * @param {module:zrender/Painter} painter
	     * @param {number} [dpr]
	     */
	    var Layer = function(id, painter, dpr) {
	        var dom;
	        dpr = dpr || config.devicePixelRatio;
	        if (typeof id === 'string') {
	            dom = createDom(id, 'canvas', painter, dpr);
	        }
	        // Not using isDom because in node it will return false
	        else if (util.isObject(id)) {
	            dom = id;
	            id = dom.id;
	        }
	        this.id = id;
	        this.dom = dom;
	
	        var domStyle = dom.style;
	        if (domStyle) { // Not in node
	            dom.onselectstart = returnFalse; // 避免页面选中的尴尬
	            domStyle['-webkit-user-select'] = 'none';
	            domStyle['user-select'] = 'none';
	            domStyle['-webkit-touch-callout'] = 'none';
	            domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
	        }
	
	        this.domBack = null;
	        this.ctxBack = null;
	
	        this.painter = painter;
	
	        this.config = null;
	
	        // Configs
	        /**
	         * 每次清空画布的颜色
	         * @type {string}
	         * @default 0
	         */
	        this.clearColor = 0;
	        /**
	         * 是否开启动态模糊
	         * @type {boolean}
	         * @default false
	         */
	        this.motionBlur = false;
	        /**
	         * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
	         * @type {number}
	         * @default 0.7
	         */
	        this.lastFrameAlpha = 0.7;
	
	        /**
	         * Layer dpr
	         * @type {number}
	         */
	        this.dpr = dpr;
	    };
	
	    Layer.prototype = {
	
	        constructor: Layer,
	
	        elCount: 0,
	
	        __dirty: true,
	
	        initContext: function () {
	            this.ctx = this.dom.getContext('2d');
	
	            var dpr = this.dpr;
	            if (dpr != 1) {
	                this.ctx.scale(dpr, dpr);
	            }
	        },
	
	        createBackBuffer: function () {
	            var dpr = this.dpr;
	
	            this.domBack = createDom('back-' + this.id, 'canvas', this.painter, dpr);
	            this.ctxBack = this.domBack.getContext('2d');
	
	            if (dpr != 1) {
	                this.ctxBack.scale(dpr, dpr);
	            }
	        },
	
	        /**
	         * @param  {number} width
	         * @param  {number} height
	         */
	        resize: function (width, height) {
	            var dpr = this.dpr;
	
	            var dom = this.dom;
	            var domStyle = dom.style;
	            var domBack = this.domBack;
	
	            domStyle.width = width + 'px';
	            domStyle.height = height + 'px';
	
	            dom.width = width * dpr;
	            dom.height = height * dpr;
	
	            if (dpr != 1) {
	                this.ctx.scale(dpr, dpr);
	            }
	
	            if (domBack) {
	                domBack.width = width * dpr;
	                domBack.height = height * dpr;
	
	                if (dpr != 1) {
	                    this.ctxBack.scale(dpr, dpr);
	                }
	            }
	        },
	
	        /**
	         * 清空该层画布
	         * @param {boolean} clearAll Clear all with out motion blur
	         */
	        clear: function (clearAll) {
	            var dom = this.dom;
	            var ctx = this.ctx;
	            var width = dom.width;
	            var height = dom.height;
	
	            var haveClearColor = this.clearColor;
	            var haveMotionBLur = this.motionBlur && !clearAll;
	            var lastFrameAlpha = this.lastFrameAlpha;
	
	            var dpr = this.dpr;
	
	            if (haveMotionBLur) {
	                if (!this.domBack) {
	                    this.createBackBuffer();
	                }
	
	                this.ctxBack.globalCompositeOperation = 'copy';
	                this.ctxBack.drawImage(
	                    dom, 0, 0,
	                    width / dpr,
	                    height / dpr
	                );
	            }
	
	            ctx.clearRect(0, 0, width / dpr, height / dpr);
	            if (haveClearColor) {
	                ctx.save();
	                ctx.fillStyle = this.clearColor;
	                ctx.fillRect(0, 0, width / dpr, height / dpr);
	                ctx.restore();
	            }
	
	            if (haveMotionBLur) {
	                var domBack = this.domBack;
	                ctx.save();
	                ctx.globalAlpha = lastFrameAlpha;
	                ctx.drawImage(domBack, 0, 0, width / dpr, height / dpr);
	                ctx.restore();
	            }
	        }
	    };
	
	    module.exports = Layer;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 */
	
	    var zrUtil = __webpack_require__(4);
	    var util = __webpack_require__(69);
	    var BPMNNode = __webpack_require__(71);
	    var BPMNModel = __webpack_require__(74);
	    var StartEventNode = __webpack_require__(76);
	    var EndEventNode = __webpack_require__(78);
	    var UserTaskNode = __webpack_require__(79);
	    var ManualTaskNode = __webpack_require__(81);
	    var ScriptTaskNode = __webpack_require__(82);
	    var MailTaskNode = __webpack_require__(83);
	    var CatchTimerEventNode = __webpack_require__(84);
	    var CatchSignalEventNode = __webpack_require__(85);
	    var ThrowSignalEventNode = __webpack_require__(86);
	    var InclusiveGatewayNode = __webpack_require__(87);
	    var ExclusiveGatewayNode = __webpack_require__(89);
	    var ParallelGatewayNode = __webpack_require__(90);
	    var SubPrcessNode = __webpack_require__(91);
	    var Bpmn = __webpack_require__(96);
	    /**
	     * 根据结点数组 导出JSON格式的数据
	     *
	     * @param {Array} nodes 结点数组
	     * @return {JSON} JSON格式的数据
	     */
	    function exportJson(bpmnModel, nodes, connectors) {
	        var jsonArr = [];
	        for(var i = 0; i < nodes.length;i++){
	            var node = nodes[i];
	            //去掉子流程里面的节点
	            if (node.parent && Bpmn.isSubProcess(node.parent.model)) {
	                continue;
	            };
	            if( node && node.toJSON) {
	                jsonArr.push(node.toJSON());
	            }
	        }
	        //增加线
	        for(var i = 0; i < connectors.length;i++){
	            var connector = connectors[i];
	            //去掉子流程里面的线段
	            if (connector.parent && Bpmn.isSubProcess(connector.parent.model)) {
	                continue;
	            };
	            if( connector && connector.toJSON) {
	                jsonArr.push(connector.toJSON());
	            }
	        }
	        bpmnModel.set("childShapes", jsonArr)
	
	
	        return bpmnModel.option;
	    };
	
	    /**
	     * 根据 JSON 生成节点
	     * @param  {[type]} fishTopoBpmn [description]
	     * @param  {[type]} json         [description]
	     * @return {[type]}              [description]
	     */
	    function fromJson(fishTopoBpmn, json) {
	        // 1.清空画布
	        fishTopoBpmn.clear();
	
	        // 2.先创建节点  遍历形状 获取模型
	        var bpmnModel = new BPMNModel(json);
	
	        fishTopoBpmn.model = bpmnModel;
	
	        var bpmnWidth = bpmnModel.get("properties.width");
	        var bpmnHeight = bpmnModel.get("properties.height");
	        if (bpmnWidth > 0 && bpmnHeight > 0) {
	            fishTopoBpmn.resize(bpmnWidth,bpmnHeight);
	        };
	
	        var childShapes = bpmnModel.get("childShapes");
	        var connectors = [];
	        for (var i = 0; i < childShapes.length; i++) {
	            var shape = childShapes[i];
	            var type = shape.stencil.type;
	
	
	            if (type === Bpmn.SEQUENCE_FLOW) {
	                connectors.push(shape);
	            } else {
	                var model = new BPMNModel(shape);
	                var createdNode = fishTopoBpmn.addNodeByModel(model,false);
	
	                 if (type === Bpmn.SUB_PROCESS) {
	                    var subNode = model.get("childShapes");
	                    for (var j = 0; j < subNode.length; j++) {
	
	                        var subModel = new BPMNModel(subNode[j]);
	                        if(Bpmn.isFlow(subModel)) {
	                            fishTopoBpmn.addConnectorByModel(subModel, createdNode);
	                        } else {
	                            var superUpperLeft = model.get("bounds.upperLeft");
	                            var subUpperLeft = subModel.get("bounds.upperLeft");
	                            subModel.set("bounds.upperLeft", { x: subUpperLeft.x + superUpperLeft.x, y: subUpperLeft.y + superUpperLeft.y });
	                            fishTopoBpmn.addNodeByModel(subModel,true);
	                        }
	
	                    };
	                 };
	            }
	        };
	
	        // 3. 再创建线
	        for(var i = 0, len = connectors.length; i < len; i++) {
	            var model = new BPMNModel(connectors[i]); // shape
	            fishTopoBpmn.addConnectorByModel(model);
	        }
	
	        // 4.创建事件插槽
	        for (var i = 0; i < childShapes.length; i++) {
	            if (childShapes[i].properties.slotEvent) {
	                for(var j = 0;j < childShapes[i].properties.slotEvent.length; j++){
	                    findNodeById(fishTopoBpmn,childShapes[i].resourceId).slotEvent.push(findNodeById(fishTopoBpmn,childShapes[i].properties.slotEvent[j]))
	                }
	            };
	
	        };
	
	    }
	
	    /**
	     * 根据id在group中查找
	     * @param  {[type]} group  [description]
	     * @param  {[type]} nodeId [description]
	     * @return {[type]}        [description]
	     */
	    function findNodeById (fishTopoBpmn, nodeId) {
	        var node;
	        for (var i = fishTopoBpmn.allNodes.length - 1; i >= 0; i--) {
	            if (fishTopoBpmn.allNodes[i].model.get("resourceId") == nodeId) {
	                node = fishTopoBpmn.allNodes[i];
	            };
	        };
	        return node;
	    };
	
	
	
	    function registerBPMNNode () {
	        BPMNNode.registerClass(StartEventNode, "StartNoneEvent");
	        BPMNNode.registerClass(EndEventNode, "EndNoneEvent");
	        BPMNNode.registerClass(UserTaskNode, "UserTask");
	        BPMNNode.registerClass(ManualTaskNode, "ManualTask");
	        BPMNNode.registerClass(ScriptTaskNode, "ScriptTask");
	        BPMNNode.registerClass(MailTaskNode, "MailTask");
	        BPMNNode.registerClass(CatchTimerEventNode, "CatchTimerEvent");
	        BPMNNode.registerClass(CatchSignalEventNode, "CatchSignalEvent");
	        BPMNNode.registerClass(ThrowSignalEventNode, "ThrowSignalEvent");
	        BPMNNode.registerClass(InclusiveGatewayNode, "InclusiveGateway");
	        BPMNNode.registerClass(ExclusiveGatewayNode, "ExclusiveGateway");
	        BPMNNode.registerClass(ParallelGatewayNode, "ParallelGateway");
	        BPMNNode.registerClass(SubPrcessNode, "SubProcess");
	    };
	
	
	    function isHover(node, x, y) {
	        var cx , cy;
	        if(node.parent){
	            if(node.parent.model.get("stencil.type") == "SubProcess"){
	                cx = x - node.parent.getRect().boundingRect.x;
	                cy = y - node.parent.getRect().boundingRect.y;
	                return node.rectContain(cx, cy)
	            }
	        }else{
	            return node.rectContain(x, y);
	        }
	
	     };
	
	    function findHover(list, x, y, excludes) {
	        for (var i = list.length - 1; i >= 0 ; i--) {
	            if (isExclude(excludes,list[i]) //list[i] !== exclude
	             // getDisplayList may include ignored item in VML mode
	             && !list[i].ignore
	             && isHover(list[i], x, y)) {
	                return list[i];
	            }
	        }
	    };
	
	
	    function isExclude(excludes, node) {
	        return zrUtil.indexOf(excludes,node) == -1;
	     };
	
	
	
	
	    var BpmnUtil = {
	        exportJson: exportJson,
	        fromJson: fromJson,
	        registerBPMNNode: registerBPMNNode,
	        findHover: findHover
	    };
	    module.exports = BpmnUtil;
	


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 工具方法类
	 * @author wang.xiaohu
	 */
	
	    var Point = __webpack_require__(57);
	    var Line = __webpack_require__(70);
	    var graphic = __webpack_require__(3);
	    var BoundingRect = __webpack_require__(25);
	    var zrUtil = __webpack_require__(4);
	    /**
	     * 构造类继承关系
	     *
	     * @param {Function} clazz 源类
	     * @param {Function} baseClazz 基类
	     */
	    function inherits(clazz, baseClazz) {
	        var clazzPrototype = clazz.prototype;
	
	        function F() {}
	        F.prototype = baseClazz.prototype;
	        clazz.prototype = new F();
	
	        for (var prop in clazzPrototype) {
	            clazz.prototype[prop] = clazzPrototype[prop];
	        }
	        clazz.prototype.constructor = clazz;
	        clazz.superClass = baseClazz;
	    };
	
	    function getUUID() {
	        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
	            uuid = new Array(36),
	            rnd = 0,
	            r;
	        for (var i = 0; i < 36; i++) {
	            if (i == 8 || i == 13 || i == 18 || i == 23) {
	                uuid[i] = '-';
	            } else if (i == 14) {
	                uuid[i] = '4';
	            } else {
	                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
	                r = rnd & 0xf;
	                rnd = rnd >> 4;
	                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	            }
	        }
	        return "sid-" + uuid.join('');
	    };
	
	
	    /**
	     * 计算两点之间的距离
	     *@param {Point} p1 - first {Point}
	     *@param {Point} p2 - second {Point}
	     *@return {Number} - the distance between those 2 points. It is always positive.
	     **/
	    function distance(p1, p2) {
	        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	    };
	
	    /**
	     * 返回一条折线 最长的两个点
	     * @param  {[type]} points [description]
	     * @return {[type]}        [description]
	     */
	    function getMaxLineLength(points) {
	        var m = distance(points[0], points[1]);
	        var result = [points[0], points[1]];
	        for (var i = 1; i < points.length - 1; i++) {
	
	            if (m < distance(points[i], points[i + 1])) {
	                m = distance(points[i], points[i + 1])
	                result = [points[i], points[i + 1]];
	            }
	        }
	
	        return result;
	    };
	
	    /**Returns the length of a Polyline that would be created with a set of points
	     *@param {Array} v - an {Array} of {Points}
	     *@return {Number} - a positive number equal with total length*/
	    function getPolylineLength(v) {
	        var l = 0;
	        for (var i = 0; i < v.length - 1; i++) {
	            l += distance(v[i], v[i + 1]);
	        }
	
	        return l;
	    };
	
	
	    /**Returns the max of a vector
	     *@param {Array} v - vector of {Number}s
	     *@return {Number} - the maximum number from the vector or NaN if vector is empty
	     **/
	    function max(v) {
	        if (v.lenght == 0) {
	            return NaN;
	        } else {
	            var m = v[0];
	            for (var i = 0; i < v.length; i++) {
	                if (m < v[i]) {
	                    m = v[i];
	                }
	            }
	
	            return m;
	        }
	    };
	
	
	    /**Returns the min of a vector
	     *@param {Array} v - vector of {Number}s
	     *@return {Number} - the minimum number from the vector or NaN if vector is empty
	     *@author alex@scriptoid.com
	     **/
	    function min(v) {
	        if (v.lenght == 0) {
	            return NaN;
	        } else {
	            var m = v[0];
	            for (var i = 0; i < v.length; i++) {
	                if (m > v[i]) {
	                    m = v[i];
	                }
	            }
	
	            return m;
	        }
	    };
	
	    /**
	     * 判断 点数组 是否正交直线路径
	     *Tests if a vector of points is an orthogonal path (moving in multiples of 90 degrees)
	     *@param {Array} v - an {Array} of {Point}s
	     *@return {Boolean} - true if path is valid, false otherwise
	     **/
	    function orthogonalPath(v) {
	        if (v.length <= 1) {
	            return true;
	        }
	
	        for (var i = 0; i < v.length - 1; i++) {
	            if (v[i].x != v[i + 1].x && v[i].y != v[i + 1].y) {
	                return false;
	            }
	        }
	
	        return true;
	    };
	
	
	    /**
	     *Test to see if 2 {Line}s intersects. They are considered finite segments
	     *and not the infinite lines from geometry
	     *@param {Line} l1 - fist line/segment
	     *@param {Line} l2 - last line/segment
	     *@return {Boolean} true - if the lines intersect or false if not
	     **/
	    function lineIntersectsLine(l1, l2) {
	        // check for two vertical lines
	        if (l1.startPoint.x == l1.endPoint.x && l2.startPoint.x == l2.endPoint.x) {
	            return l1.startPoint.x == l2.startPoint.x ? // if 'infinite 'lines do coincide,
	                // then check segment bounds for overlapping
	                l1.contains(l2.startPoint.x, l2.startPoint.y) ||
	                l1.contains(l2.endPoint.x, l2.endPoint.y) :
	                // lines are paralel
	                false;
	        }
	        // if one line is vertical, and another line is not vertical
	        else if (l1.startPoint.x == l1.endPoint.x || l2.startPoint.x == l2.endPoint.x) {
	            // let assume l2 is vertical, otherwise exchange them
	            if (l1.startPoint.x == l1.endPoint.x) {
	                var l = l1;
	                l1 = l2;
	                l2 = l;
	            }
	            // finding intersection of 'infinite' lines
	            // equation of the first line is y = ax + b, second: x = c
	            var a = (l1.endPoint.y - l1.startPoint.y) / (l1.endPoint.x - l1.startPoint.x);
	            var b = l1.startPoint.y - a * l1.startPoint.x;
	            var x0 = l2.startPoint.x;
	            var y0 = a * x0 + b;
	            return l1.contains(x0, y0) && l2.contains(x0, y0);
	        }
	
	        // check normal case - both lines are not vertical
	        else {
	            //line equation is : y = a*x + b, b = y - a * x
	            var a1 = (l1.endPoint.y - l1.startPoint.y) / (l1.endPoint.x - l1.startPoint.x);
	            var b1 = l1.startPoint.y - a1 * l1.startPoint.x;
	
	            var a2 = (l2.endPoint.y - l2.startPoint.y) / (l2.endPoint.x - l2.startPoint.x);
	            var b2 = l2.startPoint.y - a2 * l2.startPoint.x;
	
	            if (a1 == a2) { //paralel lines
	                return b1 == b2 ?
	                    // for coincide lines, check for segment bounds overlapping
	                    l1.contains(l2.startPoint.x, l2.startPoint.y) || l1.contains(l2.endPoint.x, l2.endPoint.y) :
	                    // not coincide paralel lines have no chance to intersect
	                    false;
	            } else { //usual case - non paralel, the 'infinite' lines intersects...we only need to know if inside the segment
	
	                /*
	                 * if one of the lines are vertical, then x0 is equal to their x,
	                 * otherwise:
	                 * y1 = a1 * x + b1
	                 * y2 = a2 * x + b2
	                 * => x0 = (b2 - b1) / (a1 - a2)
	                 * => y0 = a1 * x0 + b1
	                 **/
	                x0 = (b2 - b1) / (a1 - a2);
	                y0 = a1 * x0 + b1;
	                return l1.contains(x0, y0) && l2.contains(x0, y0);
	            }
	        }
	    };
	
	    /**
	     * 
	     *Tests if a a polyline defined by a set of points intersects a rectangle
	     *@param {Array} points - and {Array} of {Point}s
	     *@param {Array} bounds - the bounds of the rectangle defined by (x1, y1, x2, y2)
	     *@param {Boolean} closedPolyline - incase polyline is closed figure then true, else false
	     * 
	     *@return true - if line intersects the rectangle, false - if not
	     **/
	    function polylineIntersectsRectangle(points, bounds, closedPolyline) {
	
	
	        //get the 4 lines/segments represented by the bounds
	        var lines = [];
	        lines.push(new Line(new Point(bounds[0], bounds[1]), new Point(bounds[2], bounds[1])));
	        lines.push(new Line(new Point(bounds[2], bounds[1]), new Point(bounds[2], bounds[3])));
	        lines.push(new Line(new Point(bounds[2], bounds[3]), new Point(bounds[0], bounds[3])));
	        lines.push(new Line(new Point(bounds[0], bounds[3]), new Point(bounds[0], bounds[1])));
	
	        for (var k = 0; k < points.length - 1; k++) {
	            //create a line out of each 2 consecutive points            
	            var tempLine = new Line(points[k], points[k + 1]);
	
	            //see if that line intersect any of the line on bounds border
	            for (var i = 0; i < lines.length; i++) {
	                if (lineIntersectsLine(tempLine, lines[i])) {
	                    return true;
	                }
	            }
	        }
	
	        //check the closed figure - that is last point connected to the first
	        if (closedPolyline) {
	            //create a line out of each 2 consecutive points            
	            var tempLine = new Line(points[points.length - 1], points[0]);
	
	            //see if that line intersect any of the line on bounds border
	            for (var i = 0; i < lines.length; i++) {
	                if (lineIntersectsLine(tempLine, lines[i])) {
	                    return true;
	                }
	            }
	        }
	
	        return false;
	    };
	
	    /**
	     * 计算路径的分数
	     * Score a ortogonal path made out of Points
	     *Iterates over a set of points (minimum 3)
	     *For each 3 points (i, i+1, i+2) :
	     *  - if the 3rd one is after the 2nd on the same line we add +1 
	     *  - if the 3rd is up or down related to the 2nd we do not do anything +0
	     *  - if the 3rd goes back we imediatelly return -1
	     *@param {Array} v - an array of {Point}s
	     *@return {Number} - -1 if the path is wrong (goes back) or something >= 0 if is fine
	     *  The bigger the number the smooth the path is
	     **/
	    function scorePath(v) {
	        if (v.length <= 2) {
	            return -1;
	        }
	
	        var score = 0;
	        for (var i = 1; i < v.length - 1; i++) {
	            if (v[i - 1].x == v[i].x && v[i].x == v[i + 1].x) { //on the same vertical
	                if (signum(v[i + 1].y - v[i].y) == signum(v[i].y - v[i - 1].y)) { //same direction
	                    score++;
	                } else { //going back - no good
	                    return -1;
	                }
	            } else if (v[i - 1].y == v[i].y && v[i].y == v[i + 1].y) { //on the same horizontal
	                if (signum(v[i + 1].x - v[i].x) == signum(v[i].x - v[i - 1].x)) { //same direction
	                    score++;
	                } else { //going back - no good
	                    return -1;
	                }
	            } else { //not on same vertical nor horizontal
	                score--;
	            }
	        }
	
	        return score;
	    };
	
	    /**
	     * 返回数字符号（+ -)
	     * Returns the sign of a number
	     *@param {Number} x - the number
	     *@returns {Number}
	     *@see <a href="http://en.wikipedia.org/wiki/Sign_function">http://en.wikipedia.org/wiki/Sign_function</a>
	     **/
	    function signum(x) {
	        if (x > 0)
	            return 1;
	        else if (x < 0)
	            return -1;
	        else
	            return 0;
	    }
	
	    /**
	     * 判断 点数组 是不是有效路径（没有回路）
	     *Tests if a vector of points is a valid path (not going back)
	     *There are a few problems here. If you have p1, p2, p3 and p4 and p2 = p3 you need to ignore that
	     *@param {Array} v - an {Array} of {Point}s
	     *@return {Boolean} - true if path is valid, false otherwise
	     **/
	    function forwardPath(v) {
	        if (v.length <= 2) {
	            return true;
	        }
	
	        for (var i = 0; i < v.length - 2; i++) {
	            if (v[i].x == v[i + 1].x && v[i + 1].x == v[i + 2].x) { //on the same vertical
	                if (signum(v[i + 1].y - v[i].y) != 0) { //test only we have a progressing path
	                    if (signum(v[i + 1].y - v[i].y) == -1 * signum(v[i + 2].y - v[i + 1].y)) { //going back (ignore zero)
	                        return false;
	                    }
	                }
	            } else if (v[i].y == v[i + 1].y && v[i + 1].y == v[i + 2].y) { //on the same horizontal
	                if (signum(v[i + 1].x - v[i].x) != 0) { //test only we have a progressing path
	                    if (signum(v[i + 1].x - v[i].x) == -1 * signum(v[i + 2].x - v[i + 1].x)) { //going back (ignore zero)
	                        return false;
	                    }
	                }
	            }
	        }
	
	        return true;
	    };
	
	    /**
	     * 将[x:0,y:0]转化为[0, 0]  给zrender使用   
	     * @param  {[type]} points [description]
	     * @return {[type]}        [description]
	     */
	    function traslatePoints(points, isRevert) {
	        var newPoints = [];
	        if (isRevert) {
	            for (var i = 0; i < points.length; i++) {
	                var point = points[i];
	                newPoints.push(new Point(point[0], point[1]));
	            }
	            return newPoints;
	        } else {
	            for (var i = 0; i < points.length; i++) {
	                var point = points[i];
	                newPoints.push([point.x, point.y]);
	            }
	            return newPoints;
	        };
	
	
	    };
	
	    function rotationMatrix(angle) {
	        var mReturn = [
	            [Math.cos(angle), -Math.sin(angle), 0],
	            [Math.sin(angle), Math.cos(angle), 0],
	            [0, 0, 1]
	        ];
	        return mReturn;
	    };
	
	    function translationMatrix(dx, dy) {
	        return [
	            [1, 0, dx],
	            [0, 1, dy],
	            [0, 0, 1]
	        ];
	    };
	
	    function scaleMatrix(sx, sy) {
	        if (sy == null) {
	            sy = sx;
	        }
	        return [
	            [sx, 0, 0],
	            [0, sy, 0],
	            [0, 0, 1]
	        ];
	    };
	
	    /** It will return the end point of a line on a given angle (clockwise).
	     * @param {Point} startPoint - the start of the line
	     * @param {Number} length - the length of the line
	     * @param {Number} angle - the angle of the line in radians
	     * @return {Point} - the endPoint of the line
	     */
	    function getEndPoint(startPoint, length, angle) {
	        var endPoint = startPoint.clone();
	        endPoint.transform(translationMatrix(-startPoint.x, -startPoint.y));
	        endPoint.y -= length;
	        endPoint.transform(rotationMatrix(angle));
	        endPoint.transform(translationMatrix(startPoint.x, startPoint.y));
	        return endPoint;
	    };
	
	    /**
	     * 获取获取两个图形的外面四个连接点
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    function getConnectorPoints(node) {
	        return {
	            left: new Point(node.x, node.y + node.height / 2), //矩形 左中的位置
	            top: new Point(node.x + node.width / 2, node.y), //矩形 上中的位置
	            right: new Point(node.x + node.width, node.y + node.height / 2), //矩形 右中的位置
	            bottom: new Point(node.x + node.width / 2, node.y + node.height), //矩形 下中的位置
	            center: new Point(node.x + node.width / 2, node.y + node.height / 2) //中间位置
	
	        };
	    };
	
	    /**
	     * 获取获取两个图形的外面四个连接点
	     * @param  {[type]} node [description]
	     * @return {[type]}      [description]
	     */
	    function getSoltPoints(node) {
	        return [
	            //top
	            [Math.round(node.getRect().width / 3 /10)*10, 0 ],
	            [Math.round(2*node.getRect().width / 3 /10)*10, 0 ],
	            //right
	            [node.getRect().width, Math.round(node.getRect().height / 3 /10)*10 ],
	            [node.getRect().width, Math.round(2*node.getRect().height / 3 /10)*10 ],
	            //bottom
	            [Math.round(node.getRect().width / 3 /10)*10, node.getRect().height ],
	            [Math.round(2*node.getRect().width / 3 /10)*10, node.getRect().height ],
	            //left
	            [0, Math.round(node.getRect().height / 3 /10)*10 ],
	            [0, Math.round(2*node.getRect().height / 3 /10)*10 ],
	
	        ]
	    };    
	
	    /**
	     * 计算 p1 p2两点所连接的直线的角度
	     * @param  {[type]} p1 [description]
	     * @param  {[type]} p2 [description]
	     * @return {[type]}    [description]
	     */
	    function tangentRotation(p1, p2) {
	        return -Math.PI / 2 - Math.atan2(
	            p2.y - p1.y, p2.x - p1.x
	        );
	    };
	
	    /**
	     * 判断3点是否在一条直线上
	     * Tests if 3 points are coliniar with matrix determinants.
	     * If the determinat of matrix 
	     * /         \
	     * | x1 y1 1 |
	     * | x2 y2 1 |
	     * | x3 y3 1 |
	     * \         /
	     * is zero it means that the points are colinear
	     *@param {Point} p1 - first point
	     *@param {Point} p2 - second point
	     *@param {Point} p3 - third point
	     *@return {Boolean} - true if coliniar and false if not
	     *@author Alex
	     *@see http://en.wikipedia.org/wiki/Determinant
	     *@see https://people.richland.edu/james/lecture/m116/matrices/applications.html
	     **/
	    function collinearity(p1, p2, p3, precission) {
	        var determinant = (p1.x * p2.y + p1.y * p3.x + p2.x * p3.y) - (p2.y * p3.x + p1.y * p2.x + p1.x * p3.y);
	
	        if (precission) {
	            return Math.abs(determinant) <= precission;
	        } else {
	            return determinant === 0;
	        }
	    };
	
	
	    /**
	     * 四舍五入 保存decimals的小数
	     **/
	    function enhancedRound(number, decimals) {
	        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	    };
	
	    /**
	     * 获取两点之间的长度
	     **/
	    function getLength(startPoint, endPoint) {
	        return Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2));
	    };
	
	    /**
	     * 获取角度 
	     * @param  {[type]} centerPoint  [description]
	     * @param  {[type]} outsidePoint [description]
	     * @param  {[type]} round        [description]
	     * @return {[type]}              [description]
	     */
	    function getAngle(centerPoint, outsidePoint, round) {
	        centerPoint.x = enhancedRound(centerPoint.x, 5);
	        centerPoint.y = enhancedRound(centerPoint.y, 5);
	        outsidePoint.x = enhancedRound(outsidePoint.x, 5);
	        outsidePoint.y = enhancedRound(outsidePoint.y, 5);
	        var angle = Math.atan((outsidePoint.x - centerPoint.x) / (outsidePoint.y - centerPoint.y));
	        angle = -angle;
	
	        //endAngle+=90;
	        if (outsidePoint.x >= centerPoint.x && outsidePoint.y >= centerPoint.y) {
	            angle += Math.PI;
	        } else if (outsidePoint.x <= centerPoint.x && outsidePoint.y >= centerPoint.y) {
	            angle += Math.PI;
	        } else if (outsidePoint.x <= centerPoint.x && outsidePoint.y <= centerPoint.y) {
	            angle += Math.PI * 2;
	        }
	        while (angle >= Math.PI * 2) {
	            angle -= Math.PI * 2;
	        }
	        if (isNaN(angle)) { //Nan
	            angle = 0; //we are at center point;
	        }
	        if (round) {
	            angle = Math.round(angle / round) * round
	        }
	        return angle;
	    };
	
	    function getRect(node) {
	        var boundingRect = node.getBoundingRect();
	        //创建最小包围盒虚线
	        var points = [];
	        points[0] = [-boundingRect.width / 2, -boundingRect.height / 2];
	        points[1] = [boundingRect.width / 2, -boundingRect.height / 2];
	        points[2] = [boundingRect.width / 2, boundingRect.height / 2];
	        points[3] = [-boundingRect.width / 2, boundingRect.height / 2];
	        points[4] = [-boundingRect.width / 2, -boundingRect.height / 2];
	
	        var boundRect, cx, cy;
	        if (node instanceof graphic.Circle) {
	            //注: 因事件为圆形  所以 x y 为圆心的位置  包围矩形要减去宽度一半 
	            boundRect = new BoundingRect(node.position[0] - boundingRect.width / 2,
	                node.position[1] - boundingRect.height / 2,
	                boundingRect.width, boundingRect.height);
	            cx = node.position[0];
	            cy = node.position[1];
	        } else {
	            boundRect = new BoundingRect(node.position[0],
	                node.position[1],
	                boundingRect.width, boundingRect.height);
	            cx = node.position[0] + boundingRect.width / 2;
	            cy = node.position[1] + boundingRect.height / 2;
	        }
	        return {
	            x: cx,
	            y: cy,
	            width: boundingRect.width,
	            height: boundingRect.height,
	            points: points,
	            boundingRect: boundRect,
	        };
	    };
	
	    var StackedMap = {
	        createNew: function() {
	            var stack = [];
	
	            return {
	                add: function(key, value) {
	                    var arrKey = this.get(key);
	                    arrKey.push(value)
	
	                },
	                get: function(key) {
	                    for (var i = 0; i < stack.length; i++) {
	                        if (key == stack[i].key) {
	                            return stack[i].value;
	                        }
	                    }
	                    //如果没有找到的话，则创建一个新的数组
	                    var value = [];
	                    stack.push({ key: key, value: value });
	                    return value;
	                },
	                keys: function() {
	                    var keys = [];
	                    for (var i = 0; i < stack.length; i++) {
	                        keys.push(stack[i].key);
	                    }
	                    return keys;
	                },
	                top: function() {
	                    return stack[stack.length - 1];
	                },
	                remove: function(key) {
	                    var idx = -1;
	                    for (var i = 0; i < stack.length; i++) {
	                        if (key == stack[i].key) {
	                            idx = i;
	                            break;
	                        }
	                    }
	                    return stack.splice(idx, 1)[0];
	                },
	                removeTop: function() {
	                    return stack.splice(stack.length - 1, 1)[0];
	                },
	                length: function() {
	                    return stack.length;
	                }
	            };
	        }
	    };
	
	    function randomColor() {
	        var arrHex = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d"],
	            strHex = "#",
	            index;
	        for (var i = 0; i < 6; i++) {
	            index = Math.round(Math.random() * 15);
	            strHex += arrHex[index];
	        }
	        return strHex;
	    };
	
	    function isUndefined(obj) {
	        return obj === void 0;
	    };
	
	    // By default, Underscore uses ERB-style template delimiters, change the
	    // following template settings to use alternative delimiters.
	    var templateSettings = {
	        evaluate: /<%([\s\S]+?)%>/g,
	        interpolate: /<%=([\s\S]+?)%>/g,
	        escape: /<%-([\s\S]+?)%>/g
	    };
	
	    // When customizing `templateSettings`, if you don't want to define an
	    // interpolation, evaluation or escaping regex, we need one that is
	    // guaranteed not to match.
	    var noMatch = /(.)^/;
	
	    // Certain characters need to be escaped so that they can be put into a
	    // string literal.
	    var escapes = {
	        "'": "'",
	        '\\': '\\',
	        '\r': 'r',
	        '\n': 'n',
	        '\u2028': 'u2028',
	        '\u2029': 'u2029'
	    };
	
	    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	    var escapeChar = function(match) {
	        return '\\' + escapes[match];
	    };
	
	    // JavaScript micro-templating, similar to John Resig's implementation.
	    // Underscore templating handles arbitrary delimiters, preserves whitespace,
	    // and correctly escapes quotes within interpolated code.
	    // NB: `oldSettings` only exists for backwards compatibility.
	    function template(text, settings, oldSettings) {
	        if (!settings && oldSettings) settings = oldSettings;
	        settings = settings || {}
	        settings = zrUtil.defaults(settings, templateSettings, true);
	
	        // Combine delimiters into one regular expression via alternation.
	        var matcher = RegExp([
	            (settings.escape || noMatch).source,
	            (settings.interpolate || noMatch).source,
	            (settings.evaluate || noMatch).source
	        ].join('|') + '|$', 'g');
	
	        // Compile the template source, escaping string literals appropriately.
	        var index = 0;
	        var source = "__p+='";
	        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	            source += text.slice(index, offset).replace(escaper, escapeChar);
	            index = offset + match.length;
	
	            if (escape) {
	                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	            } else if (interpolate) {
	                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	            } else if (evaluate) {
	                source += "';\n" + evaluate + "\n__p+='";
	            }
	
	            // Adobe VMs need the match returned to produce the correct offest.
	            return match;
	        });
	        source += "';\n";
	
	        // If a variable is not specified, place data values in local scope.
	        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	        source = "var __t,__p='',__j=Array.prototype.join," +
	            "print=function(){__p+=__j.call(arguments,'');};\n" +
	            source + 'return __p;\n';
	
	        try {
	            var render = new Function(settings.variable || 'obj', source);
	        } catch (e) {
	            e.source = source;
	            throw e;
	        }
	
	        var template = function(data) {
	            return render.call(this, data);
	        };
	
	        // Provide the compiled source as a convenience for precompilation.
	        var argument = settings.variable || 'obj';
	        template.source = 'function(' + argument + '){\n' + source + '}';
	
	        return template;
	    };
	    module.exports = {
	        inherits: inherits,
	        getUUID: getUUID,
	        distance: distance,
	        getPolylineLength: getPolylineLength,
	        max: max,
	        min: min,
	        orthogonalPath: orthogonalPath,
	        polylineIntersectsRectangle: polylineIntersectsRectangle,
	        scorePath: scorePath,
	        forwardPath: forwardPath,
	        traslatePoints: traslatePoints,
	        getEndPoint: getEndPoint,
	        getConnectorPoints: getConnectorPoints,
	        tangentRotation: tangentRotation,
	        collinearity: collinearity,
	        translationMatrix: translationMatrix,
	        scaleMatrix: scaleMatrix,
	        round: enhancedRound,
	        getLength: getLength,
	        getAngle: getAngle,
	        getRect: getRect,
	        StackedMap: StackedMap,
	        getMaxLineLength: getMaxLineLength,
	        randomColor: randomColor,
	        template: template,
	        isUndefined: isUndefined,
	        getSoltPoints:getSoltPoints
	    };
	


/***/ },
/* 70 */
/***/ function(module, exports) {

	
	
	    /**
	      * Creates an instance of a Line. A Line is actually a segment and not a pure
	      * geometrical Line
	      *
	      * @constructor
	      * @this {Line}
	      * @param {Point} startPoint - starting point of the line
	      * @param {Point} endPoint - the ending point of the line
	      **/
	    function Line(startPoint, endPoint){
	        /**Starting {@link Point} of the line*/
	        this.startPoint = startPoint;
	        
	        /**Ending {@link Point} of the line*/
	        this.endPoint = endPoint;
	        
	        /**Serialization type*/
	        this.oType = 'Line'; //object type used for JSON deserialization
	    }
	
	    /**Creates a {Line} out of JSON parsed object
	     *@param {JSONObject} o - the JSON parsed object
	     *@return {Line} a newly constructed Line
	     **/
	    Line.load = function(o){
	        var newLine = new Line(
	            Point.load(o.startPoint),
	            Point.load(o.endPoint)
	        );
	
	        return newLine;
	    }
	
	    Line.prototype = {
	        contructor: Line,
	
	
	
	        clone:function(){
	            var ret = new Line(this.startPoint.clone(), this.endPoint.clone());
	            return ret;
	        },
	
	        equals:function(anotherLine){
	            if(!anotherLine instanceof Line){
	                return false;
	            }
	            return this.startPoint.equals(anotherLine.startPoint)
	            && this.endPoint.equals(anotherLine.endPoint)
	        },
	
	        /** Tests to see if a point belongs to this line (not as infinite line but more like a segment)
	         * Algorithm: Compute line's equation and see if (x, y) verifies it.
	         * @param {Number} x - the X coordinates
	         * @param {Number} y - the Y coordinates
	         **/
	        contains: function(x, y){
	            // if the point is inside rectangle bounds of the segment
	            if (Math.min(this.startPoint.x, this.endPoint.x) <= x
	                && x <= Math.max(this.startPoint.x, this.endPoint.x)
	                && Math.min(this.startPoint.y, this.endPoint.y) <= y
	                && y <= Math.max(this.startPoint.y, this.endPoint.y)) {
	
	                // check for vertical line
	                if (this.startPoint.x == this.endPoint.x) {
	                    return x == this.startPoint.x;
	                } else { // usual (not vertical) line can be represented as y = a * x + b
	                    var a = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
	                    var b = this.startPoint.y - a * this.startPoint.x;
	                    return y == a * x + b;
	                }
	            } else {
	                return false;
	            }
	        },
	
	        /*
	         *See if we are near a {Line} by a certain radius (also includes the extremities into computation)
	         *@param {Number} x - the x coordinates
	         *@param {Number} y - the y coordinates
	         *@param {Number} radius - the radius to search for
	         *@see http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
	         *@see "Mathematics for Computer Graphics, 2nd Ed., by John Vice, page 227"
	         **/
	        near:function(x,y,radius){
	            
	            if(this.endPoint.x === this.startPoint.x){ //Vertical line, so the vicinity area is a rectangle
	                return ( (this.startPoint.y-radius<=y && this.endPoint.y+radius>=y) 
	                        || (this.endPoint.y-radius<=y && this.startPoint.y+radius>=y))
	                && x > this.startPoint.x - radius && x < this.startPoint.x + radius ;
	            }
	            
	            if(this.startPoint.y === this.endPoint.y){ //Horizontal line, so the vicinity area is a rectangle
	                return ( (this.startPoint.x - radius<=x && this.endPoint.x+radius>=x) 
	                        || (this.endPoint.x-radius<=x && this.startPoint.x+radius>=x))
	                        && y>this.startPoint.y-radius && y<this.startPoint.y+radius ;
	            }
	
	
	            var startX = Math.min(this.endPoint.x,this.startPoint.x);
	            var startY = Math.min(this.endPoint.y,this.startPoint.y);
	            var endX = Math.max(this.endPoint.x,this.startPoint.x);
	            var endY = Math.max(this.endPoint.y,this.startPoint.y);
	            
	            /*We will compute the distance from point to the line
	             * by using the algorithm from 
	             * http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
	             * */
	
	            //First we need to find a,b,c of the line equation ax + by + c = 0
	            var a = this.endPoint.y - this.startPoint.y;
	            var b = this.startPoint.x - this.endPoint.x;        
	            var c = -(this.startPoint.x * this.endPoint.y - this.endPoint.x * this.startPoint.y);
	
	            //Secondly we get the distance "Mathematics for Computer Graphics, 2nd Ed., by John Vice, page 227"
	            var d = Math.abs( (a*x + b*y + c) / Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) );
	
	            //Thirdly we get coordinates of closest line's point to target point
	            //http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Cartesian_coordinates
	            var closestX = (b * (b*x - a*y) - a*c) / ( Math.pow(a,2) + Math.pow(b,2) );
	            var closestY = (a * (-b*x + a*y) - b*c) / ( Math.pow(a,2) + Math.pow(b,2) );
	
	            var r = ( d <= radius && endX>=closestX && closestX>=startX && endY>=closestY && closestY>=startY ) //the projection of the point falls INSIDE of the segment
	                || this.startPoint.near(x,y,radius) || this.endPoint.near(x,y,radius); //the projection of the point falls OUTSIDE of the segment 
	
	            return  r;
	
	        },
	
	        /**we need to create a new array each time, or we will affect the actual shape*/
	        getPoints:function(){
	            var points = [];
	            points.push(this.startPoint);
	            points.push(this.endPoint);
	            return points;
	        },
	        
	        /**Return the {Point} corresponding the t certain t value
	         * @param {Number} t the value of parameter t, where t in [0,1], t is like a percent*/
	        getPoint: function(t){
	            var Xp = t * (this.endPoint.x - this.startPoint.x) + this.startPoint.x;
	            var Yp = t * (this.endPoint.y - this.startPoint.y) + this.startPoint.y;
	            
	            return new Point(Xp, Yp);
	        },    
	        
	        // /**
	        //  * Returns the middle of the line
	        //  * @return {Point} the middle point
	        //  * */
	        // getMiddle : function(){
	        //     return Util.getMiddle(this.startPoint, this.endPoint);
	        // },
	        
	        
	        // getLength : function(){
	        //     return Util.getLength(this.startPoint, this.endPoint);
	        // },
	
	        // /**
	        //  *Get bounds for this line
	        //  *@author Alex Gheorghiu <alex@scriptoid.com>
	        //  **/
	        // getBounds:function(){
	        //     return Util.getBounds(this.getPoints());
	        // },
	
	        /**String representation*/
	        toString:function(){
	            return 'line(' + this.startPoint + ',' + this.endPoint + ')';
	        }
	    }
	    module.exports = Line;
	


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	
		var Node = __webpack_require__(72);
		var zrUtil = __webpack_require__(4);
		var graphic = __webpack_require__(3);
		var clazzUtil = __webpack_require__(73);
		//创建Node类 所有形状都继承Node  
		function BPMNNode(model, api) {
			Node.call(this);
			this.model = model;		
			this.options =
			{
				outline: {
					enable: true, // 是否有外框
					radius: true, // 是否圆角
					initVisible: false
				},
				text: {
					color: '#000000', // 文本颜色
					lineHeight: 24 // 文本行高
				}
			};
			this.bpmnInfo = {type: -1, name:"BPMNDiagram", displayName:"Task" };    //节点信息
			var resourceId = model.get("resourceId");
			if(resourceId && resourceId != "") {
				this.resourceId = resourceId;
			}
			this.initEvent(api);
		};
	
	    BPMNNode.prototype.initEvent = function(api) {
	        var that = this;
	        var MOUSE_EVENT_NAMES = ['dblclick', 'click'];//'click', 'dblclick', 'mouseover', 'mouseout'
	
	
	        zrUtil.each(MOUSE_EVENT_NAMES, function (eveName) {
	            that.on(eveName, function (e) {
		            var params = {};
		            params.event = e;
		            params.type = eveName;
		            params.target = that;
		            api.trigger(eveName, params); 
	            }, this);
	        });
	    };	
	
	
	    BPMNNode.prototype.getRect = function(json) {
	        // body...
	    
	    };	
	
	    /**
	     * 查看当前节点是否 包括x ,y 坐标
	     * @param  {[type]} x [description]
	     * @param  {[type]} y [description]
	     * @return {[type]}   [description]
	     */
	    BPMNNode.prototype.rectContain = function(x, y) {
	    	var rect = this.getRect();
	        return rect.boundingRect.contain(x,y);
	    };	
	
			
	
	
		BPMNNode.prototype.toJSON = function() {
			this.model.set("resourceId", this.resourceId);
			this.model.set("properties.type", this.bpmnInfo.type);
			this.model.set("stencil.type", this.bpmnInfo.name);  //stencil.id
	
	        if (this.slotEvent && this.slotEvent.length > 0) {
	            var arrSlotEvent = [];
	            for (var i = this.slotEvent.length - 1; i >= 0; i--) {
	                arrSlotEvent.push(this.slotEvent[i].resourceId)
	            };
	            this.model.set("properties.slotEvent", arrSlotEvent);
	        };
	        this.model.set("properties.type", this.bpmnInfo.type);
			// var rect = this.getRect();
			// this.model.set("bounds.upperLeft.x", rect.x);
			// this.model.set("bounds.upperLeft.y", rect.y);
			// this.model.set("bounds.lowerRight.x", rect.x + rect.boundingRect.width);
			// this.model.set("bounds.lowerRight.y", rect.y + rect.boundingRect.height);
	
	        var rect = this.getRect().boundingRect;
	        this.model.set("bounds.upperLeft.x", rect.x);
	        this.model.set("bounds.upperLeft.y", rect.y);
	        this.model.set("bounds.lowerRight.x", rect.x + rect.width);
	        this.model.set("bounds.lowerRight.y", rect.y + rect.height);        
			return this.model.option;
		};
	
		/**
	     * 根据属性设置模型数据
	     * @param {[type]} option [description]
	     */
	    BPMNNode.prototype.setModel = function(option) {
	        var that = this;
	        var originText = this.model.get("properties.name");
	        this.model.mergeOption(option);
	        if(originText != option.properties.name) {
	            var title = this.childOfName("Title");
	            var nameByteLength = option.properties.name.length;
	            var showName;
	            if(nameByteLength > 64){
	                showName = option.properties.name.substr(0,64)+'..';
	                this.alarm.isShow = true;
	            }else{
	                showName = option.properties.name
	                this.alarm.isShow = false;
	            }
	            title.attr("style",{text:showName});
	            that.refreshText(that);
	            var name = option.properties.name;
	            var text = this.alarm.childOfName("Text");
	            text.attr("style",{text:name});
	            var groupWidth = text.getBoundingRect().width+4;
	            var groupHeight = text.getBoundingRect().height+8;
	            var points = [
	                [0,0],
	                [groupWidth,0],
	                [groupWidth,groupHeight],
	                [groupWidth-3,groupHeight],
	                [groupWidth-6,groupHeight+3],
	                [groupWidth-9,groupHeight],
	                [0,groupHeight],
	                [0,0]
	            ];
	            var Polyline = this.alarm.childOfName("Polyline");
	            Polyline.attr("shape",{points:points});
	            var groupPosition = [this.position[0]+this.getBoundingRect().width-(this.alarm.getBoundingRect().width-6),this.position[1]-this.alarm.getBoundingRect().height-3];
	            this.alarm.attr("position",groupPosition);
	        }
	    }; 
	
	
		zrUtil.inherits(BPMNNode,Node);
	
		clazzUtil.enableClassManagement(BPMNNode, {
	        registerWhenExtend: true
	    });
		module.exports = BPMNNode;
	


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	
	    var graphic = __webpack_require__(3);
	    var util = __webpack_require__(69)
	    //创建Node类 所有形状都继承Node  包括fromJSON toJSON
	    function Node() {
	        this.resourceId = util.getUUID(); // 生成节点ID
	        graphic.Group.call(this);
	    };
	
	    /**
	     * 由父类实现
	     * @return {[type]} [description]
	     */
	    Node.prototype.render = function() {};
	
	    /**
	     * 由父类实现
	     * @param  {[type]} json [description]
	     * @return {[type]}      [description]
	     */
	    Node.prototype.getRect = function(json) {};
	
	    /**
	     * drawText
	     * @description 画一个文本
	     * @param {string} color
	     */
	    Node.prototype.drawText = function(name,color) {
	        var textName = this.bpmnInfo.name;
	        if(name != null){
	            textName = name;
	        }
	        var text = new graphic.Text({
	            style: {
	                text: textName,
	                color: color ? color : this.options.text.color,
	                textFont: '12px Microsoft YaHei'
	            },
	            zlevel: 20,
	        });
	        //文字绘制的位置  
	        //x = 中心点.x - 起始位置.x - 文字宽度的一半
	        var x = this.getRect().x - this.position[0] - text.getBoundingRect().width / 2;
	        //y = 中心点.y - 起始位置.y + 节点高度的一半 + 偏移值（6）
	        var y = this.getRect().y - this.position[1] + this.getBoundingRect().height / 2 + text.getBoundingRect().height + 6;
	        text.attr("style", { x: x, y: y });
	        return {
	            text: text,
	            rect: text.getBoundingRect()
	        };
	    };
	    /**
	     * refreshText
	     * @description 刷新文本
	     */
	    Node.prototype.refreshText = function() {
	        var text = this.childOfName("Title");
	        var x = this.getRect().x - this.position[0] - text.getBoundingRect().width / 2;
	        var y = this.getRect().y - this.position[1] + this.getBoundingRect().height / 2 + text.getBoundingRect().height + 6;
	        text.attr("style", { x: x, y: y });
	    };
	    /**
	     * 由父类实现
	     * @return {[type]} [description]
	     */
	    Node.prototype.toJSON = function() {};
	
	    graphic.Util.inherits(Node, graphic.Group);
	    module.exports = Node;
	


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	
	
	    var zrUtil = __webpack_require__(4);
	
	    var clazz = {};
	
	    var TYPE_DELIMITER = '.';
	    var IS_CONTAINER = '___FT__COMPONENT__CONTAINER___';
	    /**
	     * @public
	     */
	    var parseClassType = clazz.parseClassType = function (componentType) {
	        var ret = {main: '', sub: ''};
	        if (componentType) {
	            componentType = componentType.split(TYPE_DELIMITER);
	            ret.main = componentType[0] || '';
	            ret.sub = componentType[1] || '';
	        }
	        return ret;
	    };
	    /**
	     * @public  相比 直接用zrUtil.inherits 好处是  可以直接调用父类的构造函数
	     */
	    clazz.enableClassExtend = function (RootClass, preConstruct) {
	        RootClass.extend = function (proto) {
	            var ExtendedClass = function () {
	                preConstruct && preConstruct.apply(this, arguments);
	                RootClass.apply(this, arguments);
	            };
	
	            zrUtil.extend(ExtendedClass.prototype, proto);
	
	            ExtendedClass.extend = this.extend;
	            ExtendedClass.superCall = superCall;
	            ExtendedClass.superApply = superApply;
	            zrUtil.inherits(ExtendedClass, this);
	            ExtendedClass.superClass = this;
	
	            return ExtendedClass;
	        };
	    };
	
	    // superCall should have class info, which can not be fetch from 'this'.
	    // Consider this case:
	    // class A has method f,
	    // class B inherits class A, overrides method f, f call superApply('f'),
	    // class C inherits class B, do not overrides method f,
	    // then when method of class C is called, dead loop occured.
	    function superCall(context, methodName) {
	        var args = zrUtil.slice(arguments, 2);
	        return this.superClass.prototype[methodName].apply(context, args);
	    }
	
	    function superApply(context, methodName, args) {
	        return this.superClass.prototype[methodName].apply(context, args);
	    }
	
	    /**
	     * @param {Object} entity
	     * @param {Object} options
	     * @param {boolean} [options.registerWhenExtend]
	     * @public
	     */
	    clazz.enableClassManagement = function (entity, options) {
	        options = options || {};
	
	        /**
	         * Component model classes
	         * key: componentType,
	         * value:
	         *     componentClass, when componentType is 'xxx'
	         *     or Object.<subKey, componentClass>, when componentType is 'xxx.yy'
	         * @type {Object}
	         */
	        var storage = {};
	
	        entity.registerClass = function (Clazz, componentType) {
	            if (componentType) {
	                componentType = parseClassType(componentType);
	
	                if (!componentType.sub) {
	                    if (storage[componentType.main]) {
	                        //已经注册过了，直接返回
	                        return; 
	                    }
	                    storage[componentType.main] = Clazz;
	                }
	                else if (componentType.sub !== IS_CONTAINER) {
	                    var container = makeContainer(componentType);
	                    container[componentType.sub] = Clazz;
	                }
	            }
	            return Clazz;
	        };
	
	        entity.getClass = function (componentTypeMain, subType, throwWhenNotFound) {
	            var Clazz = storage[componentTypeMain];
	
	            if (Clazz && Clazz[IS_CONTAINER]) {
	                Clazz = subType ? Clazz[subType] : null;
	            }
	
	            if (throwWhenNotFound && !Clazz) {
	                throw new Error(
	                    'Component ' + componentTypeMain + '.' + (subType || '') + ' not exists. Load it first.'
	                );
	            }
	
	            return Clazz;
	        };
	
	        entity.getClassesByMainType = function (componentType) {
	            componentType = parseClassType(componentType);
	
	            var result = [];
	            var obj = storage[componentType.main];
	
	            if (obj && obj[IS_CONTAINER]) {
	                zrUtil.each(obj, function (o, type) {
	                    type !== IS_CONTAINER && result.push(o);
	                });
	            }
	            else {
	                result.push(obj);
	            }
	
	            return result;
	        };
	
	        entity.hasClass = function (componentType) {
	            // Just consider componentType.main.
	            componentType = parseClassType(componentType);
	            return !!storage[componentType.main];
	        };
	
	        /**
	         * @return {Array.<string>} Like ['aa', 'bb'], but can not be ['aa.xx']
	         */
	        entity.getAllClassMainTypes = function () {
	            var types = [];
	            zrUtil.each(storage, function (obj, type) {
	                types.push(type);
	            });
	            return types;
	        };
	
	        /**
	         * If a main type is container and has sub types
	         * @param  {string}  mainType
	         * @return {boolean}
	         */
	        entity.hasSubTypes = function (componentType) {
	            componentType = parseClassType(componentType);
	            var obj = storage[componentType.main];
	            return obj && obj[IS_CONTAINER];
	        };
	
	        entity.parseClassType = parseClassType;
	
	        function makeContainer(componentType) {
	            var container = storage[componentType.main];
	            if (!container || !container[IS_CONTAINER]) {
	                container = storage[componentType.main] = {};
	                container[IS_CONTAINER] = true;
	            }
	            return container;
	        }
	
	        if (options.registerWhenExtend) {
	            var originalExtend = entity.extend;
	            if (originalExtend) {
	                entity.extend = function (proto) {
	                    var ExtendedClass = originalExtend.call(this, proto);
	                    return entity.registerClass(ExtendedClass, proto.type);
	                };
	            }
	        }
	
	        return entity;
	    };
	
	    module.exports = clazz;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BPMN model
	 *
	 */
	
	
	    var Model = __webpack_require__(75);
	    var zrUtil = __webpack_require__(4);
	    var BPMNModel = Model.extend({
	
	        type: 'BPMN',
	        /**
	         * @type {Object}
	         * @protected
	         */
	        defaultOption: {
	            resourceId: "",  //资源ID
	
	            properties: {
	                type: -1,  //类型
	                name: null, //名称                
	                notes: "",  //备注
	                //no: "" 
	                extProperties: {}  //扩展属性
	            },
	
	            stencil: {type: "BPMNDiagram"}, 
	
	            childShapes: [],    //子形状
	
	            outgoing: [],  // 下一个要连接的形状
	
	            bounds: {
	                upperLeft: {x:0, y:0},  //左上角坐标
	                lowerRight: {x:0, y:0} //右下角坐标
	            }
	        }       
	    });
	    module.exports = BPMNModel;
	
	


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module model/Model
	 */
	
	
	    var zrUtil = __webpack_require__(4);
	    var clazzUtil = __webpack_require__(73);
	
	    /**
	     * @constructor
	     * @param {Object} option
	     * @param {module:model/Model} parentModel
	     * @param {Object} extraOpt
	     */
	    function Model(option, parentModel,  extraOpt) {
	        /**
	         * @type {module:model/Model}
	         * @readOnly
	         */
	        this.parentModel = parentModel;
	
	        /**
	         * @type {Object}
	         * @protected
	         */
	        this.option = option;
	
	        // Simple optimization
	        if (this.init) {
	            if (arguments.length <= 3) {
	                this.init(option, parentModel,  extraOpt);
	            }
	            else {
	                this.init.apply(this, arguments);
	            }
	        }
	    }
	
	    Model.prototype = {
	
	        constructor: Model,
	
	        /**
	         * Model 的初始化函数
	         * @param {Object} option
	         */
	        init: function (option, parentModel, extraOpt) {
	            zrUtil.merge(option, this.getDefaultOption());
	        },
	
	        getDefaultOption: function () {
	            if (!this.hasOwnProperty('__defaultOption')) {
	                var optList = [];
	                var Class = this.constructor;
	                while (Class) {
	                    var opt = Class.prototype.defaultOption;
	                    opt && optList.push(opt);
	                    Class = Class.superClass;
	                }
	
	                var defaultOption = {};
	                for (var i = optList.length - 1; i >= 0; i--) {
	                    defaultOption = zrUtil.merge(defaultOption, optList[i], true);
	                }
	                this.__defaultOption = defaultOption;
	            }
	            return this.__defaultOption;
	        },
	
	        /**
	         * 从新的 Option merge
	         */
	        mergeOption: function (option) {
	            zrUtil.merge(this.option, option, true);
	        },
	
	        /**
	         * @param {string} path
	         * @param {boolean} [ignoreParent=false]
	         * @return {*}
	         */
	        get: function (path, ignoreParent) {
	            if (!path) {
	                return this.option;
	            }
	
	            if (typeof path === 'string') {
	                path = path.split('.');
	            }
	
	            var obj = this.option;
	            var parentModel = this.parentModel;
	            for (var i = 0; i < path.length; i++) {
	                // obj could be number/string/... (like 0)
	                obj = (obj && typeof obj === 'object') ? obj[path[i]] : null;
	                if (obj == null) {
	                    break;
	                }
	            }
	            if (obj == null && parentModel && !ignoreParent) {
	                obj = parentModel.get(path);
	            }
	            return obj;
	        },
	
	        set: function (path, value) {
	            var obj = this.option;
	
	            if (path.indexOf(".") == -1) {
	                obj[path] = value;
	            } else {
	                var fieldArray  = path.split('.');
	                var n = fieldArray.length;
	                var currentRef = obj;
	                var fieldName;
	
	                for (var i = 0; i < n - 1; i++) {
	                    fieldName = fieldArray[i];
	                    if(currentRef[fieldName] == null) {
	                        currentRef[fieldName] = {};
	                    }
	                    currentRef = currentRef[fieldName];
	                }
	                fieldName = fieldArray[n-1];
	                currentRef[fieldName] = value;
	            }         
	        },
	
	        /**
	         * @param {string} key
	         * @param {boolean} [ignoreParent=false]
	         * @return {*}
	         */
	        getShallow: function (key, ignoreParent) {
	            var option = this.option;
	            var val = option && option[key];
	            var parentModel = this.parentModel;
	            if (val == null && parentModel && !ignoreParent) {
	                val = parentModel.getShallow(key);
	            }
	            return val;
	        },
	
	        /**
	         * @param {string} path
	         * @param {module:model/Model} [parentModel]
	         * @return {module:model/Model}
	         */
	        getModel: function (path, parentModel) {
	            var obj = this.get(path, true);
	            var thisParentModel = this.parentModel;
	            var model = new Model(
	                obj, parentModel || (thisParentModel && thisParentModel.getModel(path))
	            );
	            return model;
	        },
	
	        /**
	         * If model has option
	         */
	        isEmpty: function () {
	            return this.option == null;
	        },
	
	        restoreData: function () {},
	
	        // Pending
	        clone: function () {
	            var Ctor = this.constructor;
	            return new Ctor(zrUtil.clone(this.option));
	        }
	    };
	
	    // Enable Model.extend.
	    clazzUtil.enableClassExtend(Model);
	
	    module.exports = Model;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
		var EventNode = __webpack_require__(77);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <circle id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6Dbg_frame" cx="15" cy="15" r="15" stroke="" fill="#7ED321"></circle>        
	 *    <path d="M11.25,8.25 L11.25,22.5 L22.5,15.375 L11.25,8.25 Z" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6Dpath1" fill="#FFFFFF"></path>  
	 * </g>
	 */
	
		function StartEventNode(model, api) {
			EventNode.call(this, model, api);
	        this.startIcon = 'M11.25,8.25 L11.25,22.5 L22.5,15.375 L11.25,8.25 Z';
	        this.itemSize = 20;
			this.bpmnInfo = {type: 29, name:"StartNoneEvent" };    //节点信息
	
	        this.render(model);
	       
		};
	
	    StartEventNode.prototype.render = function(model) {
	        this.removeAll();
	        this.model = model;
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize
	                },
	                style: {
	                    fill: '#7ED321',
	                },
	        });
	        circle.name = "Circle";
	        this.add(circle);
	        var itemSize = this.itemSize;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.startIcon, {style: {fill: '#FFFFFF'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+itemSize , model.get("bounds.upperLeft.y")+itemSize];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
	
		zrUtil.inherits(StartEventNode, EventNode);
		module.exports = StartEventNode;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	
	    var BPMNNode = __webpack_require__(71);
	    var zrUtil = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(25);  
	    //创建Node类 所有形状都继承Node  包括fromJSON toJSON
	    //
	    function EventNode(model,api) {
	        BPMNNode.call(this, model, api);
	        this.bpmnInfo = {type: -1, name:"EventNode" };    //节点信息
	        this.model = model;
	
	    };
	
	    EventNode.prototype.render = function() {
	
	    };
	
	
	    EventNode.prototype.getRect = function(json) {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        //创建最小包围盒虚线
	        var points = [];
	        points[0] =[-boundingRect.width/2,-boundingRect.height/2];
	        points[1] =[boundingRect.width/2,-boundingRect.height/2];
	        points[2] =[boundingRect.width/2,boundingRect.height/2];
	        points[3] =[-boundingRect.width/2,boundingRect.height/2];
	        points[4] =[-boundingRect.width/2,-boundingRect.height/2];   
	
	        //注: 因事件为圆形  所以 x y 为圆心的位置  包围矩形要减去宽度一半 
	        var boundRect = new BoundingRect(this.position[0] - boundingRect.width/2 , 
	                                         this.position[1] - boundingRect.height/2, 
	                                         boundingRect.width, boundingRect.height);
	        return {
	            x: this.position[0],
	            y: this.position[1],
	            width: boundingRect.width/2,
	            height: boundingRect.height/2,
	            points: points,
	            boundingRect: boundRect,
	        };
	
	    };    
	    EventNode.prototype.reDraw = function(pX,pY) {
	        // body...
	        this.attr('position',[pX,pY]);
	    };   
	
	    EventNode.prototype.getBoundingRect = function() {
	        var circle = this.childOfName("Circle");
	        return circle.getBoundingRect();
	    }; 
	    
	
	    zrUtil.inherits(EventNode,BPMNNode);
	    module.exports = EventNode;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	
		var EventNode = __webpack_require__(77);
		var zrUtil = __webpack_require__(4);
	    var util = __webpack_require__(69);
	    var graphic = __webpack_require__(3);
	
	/**
	<g pointer-events="fill" id="sid-39EF045E-66B5-449D-B300-5CBCE4D6698E" title="Intermediate signal catching event">  
	  <circle id="sid-39EF045E-66B5-449D-B300-5CBCE4D6698Ebg_frame" cx="15" cy="15" r="15" fill="#D0011B"></circle>  
	  <rect id="sid-39EF045E-66B5-449D-B300-5CBCE4D6698Ebg_rect" fill="#FFFFFF" x="9" y="9" width="12" height="12"></rect> 
	</g>
	 */
	
		function EndEventNode(model, api) {
			EventNode.call(this,model, api);		
	        this.bpmnType = "EndNoneEvent";
	        this.itemSize = 20;
	        this.rectSize = 12;
			this.bpmnInfo = {type: 31, name:"EndNoneEvent" };    //节点信息
	        this.render(model);
		};
	
	    EndEventNode.prototype.render = function(model) {
	        this.model = model;
	        var circle = new graphic.Circle({
	            shape: {
	                cx: 0,
	                cy: 0,
	                r: this.itemSize
	            },
	            style: {
	                fill: '#D0011B',
	            },
	        })
	        circle.name = "Circle";
	        this.add(circle);
	        var rect = new graphic.Rect({
	            shape: {
	                x: -this.rectSize/2,
	                y: -this.rectSize/2,
	                width: this.rectSize,
	                height: this.rectSize,
	            },
	                style: {
	                    fill: '#FFFFFF',
	                },            
	        });        
	        this.add(rect);
	        var itemSize = this.itemSize*2;
	        this.position = [model.get("bounds.upperLeft.x")+itemSize/2 , model.get("bounds.upperLeft.y")+itemSize/2];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(EndEventNode, EventNode);
		module.exports = EndEventNode;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	
		var TaskNode = __webpack_require__(80);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	/**
	 * 
	 * <g pointer-events="fill" minimumSize="85 55" id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6D" title="User task"> 
	 *   <rect id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6Dtext_frame" anchors="bottom top right left" x="1.000000059837755" y="1.0162024924" width="72" height="22.000000000000004" rx="7" ry="7" stroke="none" stroke-width="0" fill="none">
	 *   </rect>                
	 *   <rect id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6Dbg_frame" resize="vertical horizontal" x="5.98377549e-8" y="0.0162024924" width="85" height="55" rx="7" ry="7" stroke="#bbbbbb" stroke-width="1" fill="#f9f9f9">
	 *   </rect>                       
	 *   <rect xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6Darea_state" anchors="bottom" x="5.98377549e-8" y="45.0162024924" width="85" height="10" rx="10" ry="10" resize="horizontal" stroke="none" stroke-width="0" fill="none" style="">
	 *   </rect>        
	 *   <text xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" font-size="12" id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6Dtext_name" x="52" y="35" align="middle center" fittoelem="text_frame" stroke="#373e48" stroke-width="0pt" letter-spacing="-0.01px" transform="rotate(0 52 35)" oryx:fontSize="12" text-anchor="middle">
	 *       <tspan x="52" y="35" dy="5">Task
	 *       </tspan>
	 *   </text>                
	 *   <g id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6DuserTask" transform="translate(5.000000, 5.000000)" fill="#4990E2">            
	 *       <path anchors="top left" d=" M4.689754749837755 0.7547497214000001  C3.124908639837755 1.5094994424 2.536902989837755 2.8359404524 3.0388532998377547 5.3878194723999995  C3.540803599837755 7.9396985024 4.256854379837756 7.9729218124 4.689754749837755 8.9207625924  C5.122655119837755 9.868603372399999 4.8340548898377556 10.6706224924 3.8239538798377546 11.1080874924  C2.813852879837755 11.5455524924 1.1967550949999999e-7 12.8579473924 5.98377549e-8 13.5870556924  C0 14.3161639924 1.226551289837755 14.2432530924 2.3088023698377547 14.2432530924  C3.391053449837755 14.2432530924 9.090909149837755 14.2432530924 9.090909149837755 14.2432530924  L9.163059219837754 0.5237704804000001  C9.163059219837754 0.5237704804000001 6.254600859837756 0 4.689754749837755 0.7547497214000001  z" id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6DPath-14">
	 *       </path>            
	 *       <path anchors="top left" d=" M9.595959659837757 0.7547497214000001  C11.160805759837753 1.5094994424 11.576517859837754 2.7466546824 11.074567559837757 5.298533702399999  C10.572617259837756 7.8504127324 10.028860059837754 7.9729218124 9.595959659837757 8.9207625924  C9.163059279837753 9.868603372399999 9.451659519837754 10.6706224924 10.461760559837757 11.1080874924  C11.471861559837755 11.5455524924 14.285714259837755 12.8579473924 14.285714359837757 13.5870556924  C14.285714359837757 14.3161639924 13.059163159837755 14.2432530924 11.976912059837755 14.2432530924  C10.894660959837754 14.2432530924 6.349206409837755 14.2432530924 6.349206409837755 14.2432530924  L6.152061969837755 0.4299262694  C6.152061969837755 0.4299262694 8.031113549837755 0 9.595959659837757 0.7547497214000001  z" id="sid-8A1CDA21-9CD0-48EC-B49D-64474EEDEF6DPath-14-Copy">
	 *       </path>        
	 *   </g>    
	 * </g>
	 */
	
	    function UserTaskNode(model,api) {
	        TaskNode.call(this,model, api);
	        this.rectSize = {width:100, height:60};
	        this.iconPath = "M765.573741 718.489888c-14.999622-112.659873-119.671567-196.438974-237.776452-196.438974-118.912273 0-220.514299 85.277222-238.20317 198.770066-11.840676 76.071559 54.585199 71.326489 54.585199 71.326489l360.734878 0C704.913173 792.148491 776.608052 801.364387 765.573741 718.489888zM690.249195 365.718379c0 89.911776-72.889077 162.810063-162.79676 162.810063-89.908706 0-162.797783-72.898287-162.797783-162.810063 0-89.916892 72.889077-162.80597 162.797783-162.80597C617.360118 202.912409 690.249195 275.801487 690.249195 365.718379z";
	        this.bpmnInfo = {type: 0, name:"UserTask" };    //节点信息
	        this.render(model);
	    };
	
	    UserTaskNode.prototype.render = function(model) {
	        var rect = new graphic.Rect({
	            shape: {
	                x: 0.5,
	                y: 0.5,                
	                width: this.rectSize.width-1,
	                height: this.rectSize.height-1,
	                r: 7
	            },
	            style: {
	
	                fill: '#f9f9f9',
	                stroke: '#bbbbbb'
	            },            
	        }); 
	        rect.name = "Rect";      
	        this.add(rect);
	       
	        var rect = {x:5, y: 5, width: 15, height:15};
	        var pathIcon = graphic.makePath(this.iconPath, {style: {fill: '#4990E2'}}, rect)
	        this.add(pathIcon);
	       // this.add(graphic.makePath(this.iconPath2, {style: {fill: '#4990E2'}}, rect,"center"));
	        this.position =  [model.get("bounds.upperLeft.x"), model.get("bounds.upperLeft.y")];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
	
	
		zrUtil.inherits(UserTaskNode,TaskNode);
		module.exports = UserTaskNode;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
		var BPMNNode = __webpack_require__(71);
		var zrUtil = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(25);  
		//创建Node类 所有形状都继承Node  
		//
		function TaskNode(model, api) {
	
			BPMNNode.call(this, model, api);
			this.bpmnInfo = {type: -1, name:"TaskNode" };    //节点信息
	        this.model = model;
	        this.slot = [];
	        this.slotEvent = [];
		};
	
	    TaskNode.prototype.render = function() {
	
	    };
	
	    TaskNode.prototype.getRect = function() {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        //创建最小包围盒虚线
	        var points = [];
	        points[0] =[-boundingRect.width/2,-boundingRect.height/2];
	        points[1] =[boundingRect.width/2,-boundingRect.height/2];
	        points[2] =[boundingRect.width/2,boundingRect.height/2];
	        points[3] =[-boundingRect.width/2,boundingRect.height/2];
	        points[4] =[-boundingRect.width/2,-boundingRect.height/2];   
	
	        var boundRect = new BoundingRect(this.position[0] , 
	                                         this.position[1], 
	                                         boundingRect.width, boundingRect.height);        
	        return {
	            x: this.position[0]+boundingRect.width/2,
	            y: this.position[1]+boundingRect.height/2,
	            width: boundingRect.width,
	            height: boundingRect.height,
	            points: points,
	            boundingRect: boundRect,
	        };
	    };
	
	    TaskNode.prototype.getBoundingRect = function() {
	        var rect = this.childOfName("Rect");
	        return rect.getBoundingRect();
	    };    
	
	    TaskNode.prototype.reDraw = function(pX,pY) {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        this.attr('position',[pX-boundingRect.width/2,pY-boundingRect.height/2]);
	
	    };  
	
	
	    TaskNode.prototype.refresh = function(opt) {
	        var rect = this.childOfName("Rect");
	        rect.setShape(opt.shape);
	        this.attr('position',opt.position);
	    };  
	
		zrUtil.inherits(TaskNode,BPMNNode);
		module.exports = TaskNode;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	//ManualTask节点
	
		var TaskNode = __webpack_require__(80);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	/**
	 * 
	 *  <g pointer-events="fill" minimumSize="82 42" id="sid-A9545224-4CAE-450D-893D-12CFA7E68825" title="Manual task">              
	 *     <rect id="sid-A9545224-4CAE-450D-893D-12CFA7E68825text_frame" anchors="bottom top right left" x="1" y="1" width="74" height="39" rx="10" ry="10" stroke="none" stroke-width="0" fill="none"></rect>             
	 *     <rect id="sid-A9545224-4CAE-450D-893D-12CFA7E68825bg_frame" resize="vertical horizontal" x="0" y="0" width="80" height="40" rx="10" ry="10" stroke="#bbbbbb" stroke-width="1" fill="#f9f9f9"></rect>                
	 *     <rect xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" id="sid-A9545224-4CAE-450D-893D-12CFA7E68825area_state" anchors="bottom" x="0" y="30" width="80" height="10" rx="10" ry="10" resize="horizontal" stroke="none" stroke-width="0" fill="none" style=""></rect>        
	 *     <text xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" font-size="12" id="sid-A9545224-4CAE-450D-893D-12CFA7E68825text_name" x="43" y="24" align="middle center" fittoelem="text_frame" stroke="#373e48" stroke-width="0pt" letter-spacing="-0.01px" transform="rotate(0 43 24)" oryx:fontSize="12" text-anchor="middle"><tspan x="43" y="24" dy="5">Task</tspan></text>         
	 *     <g id="sid-A9545224-4CAE-450D-893D-12CFA7E68825manualTask" transform="translate(3,1) scale(0.8)">                       
	 *     <path anchors="top left" style="fill:#d1b575;stroke=none" d="m 17,9.3290326 c -0.0069,0.5512461 -0.455166,1.0455894 -0.940778,1.0376604 l -5.792746,0 c 0.0053,0.119381 0.0026,0.237107 0.0061,0.355965 l 5.154918,0 c 0.482032,-0.0096 0.925529,0.49051 0.919525,1.037574 -0.0078,0.537128 -0.446283,1.017531 -0.919521,1.007683 l -5.245273,0 c -0.01507,0.104484 -0.03389,0.204081 -0.05316,0.301591 l 2.630175,0 c 0.454137,-0.0096 0.872112,0.461754 0.866386,0.977186 C 13.619526,14.554106 13.206293,15.009498 12.75924,15 L 3.7753054,15 C 3.6045812,15 3.433552,14.94423 3.2916363,14.837136 c -0.00174,0 -0.00436,0 -0.00609,0 C 1.7212035,14.367801 0.99998255,11.458641 1,11.458641 L 1,7.4588393 c 0,0 0.6623144,-1.316333 1.8390583,-2.0872584 1.1767614,-0.7711868 6.8053358,-2.40497 7.2587847,-2.8052901 0.453484,-0.40032 1.660213,1.4859942 0.04775,2.4010487 C 8.5332315,5.882394 8.507351,5.7996113 8.4370292,5.7936859 l 6.3569748,-0.00871 c 0.497046,-0.00958 0.952273,0.5097676 0.94612,1.0738232 -0.0053,0.556126 -0.456176,1.0566566 -0.94612,1.0496854 l -4.72435,0 c 0.01307,0.1149374 0.0244,0.2281319 0.03721,0.3498661 l 5.952195,0 c 0.494517,-0.00871 0.947906,0.5066305 0.940795,1.0679848 z" id="sid-A9545224-4CAE-450D-893D-12CFA7E68825_sid-A9545224-4CAE-450D-893D-12CFA7E68825_17"></path>              
	 *     </g>        
	 * </g>
	 */
	    function ManualTaskNode(model,api) {
	        TaskNode.call(this,model, api);
	        this.rectSize = {width:100, height:60};
	        this.iconPath = "m 17,9.3290326 c -0.0069,0.5512461 -0.455166,1.0455894 -0.940778,1.0376604 l -5.792746,0 c 0.0053,0.119381 0.0026,0.237107 0.0061,0.355965 l 5.154918,0 c 0.482032,-0.0096 0.925529,0.49051 0.919525,1.037574 -0.0078,0.537128 -0.446283,1.017531 -0.919521,1.007683 l -5.245273,0 c -0.01507,0.104484 -0.03389,0.204081 -0.05316,0.301591 l 2.630175,0 c 0.454137,-0.0096 0.872112,0.461754 0.866386,0.977186 C 13.619526,14.554106 13.206293,15.009498 12.75924,15 L 3.7753054,15 C 3.6045812,15 3.433552,14.94423 3.2916363,14.837136 c -0.00174,0 -0.00436,0 -0.00609,0 C 1.7212035,14.367801 0.99998255,11.458641 1,11.458641 L 1,7.4588393 c 0,0 0.6623144,-1.316333 1.8390583,-2.0872584 1.1767614,-0.7711868 6.8053358,-2.40497 7.2587847,-2.8052901 0.453484,-0.40032 1.660213,1.4859942 0.04775,2.4010487 C 8.5332315,5.882394 8.507351,5.7996113 8.4370292,5.7936859 l 6.3569748,-0.00871 c 0.497046,-0.00958 0.952273,0.5097676 0.94612,1.0738232 -0.0053,0.556126 -0.456176,1.0566566 -0.94612,1.0496854 l -4.72435,0 c 0.01307,0.1149374 0.0244,0.2281319 0.03721,0.3498661 l 5.952195,0 c 0.494517,-0.00871 0.947906,0.5066305 0.940795,1.0679848 z";
	      //  this.iconPath2 = "M9.595959659837757 0.7547497214000001  C11.160805759837753 1.5094994424 11.576517859837754 2.7466546824 11.074567559837757 5.298533702399999  C10.572617259837756 7.8504127324 10.028860059837754 7.9729218124 9.595959659837757 8.9207625924  C9.163059279837753 9.868603372399999 9.451659519837754 10.6706224924 10.461760559837757 11.1080874924  C11.471861559837755 11.5455524924 14.285714259837755 12.8579473924 14.285714359837757 13.5870556924  C14.285714359837757 14.3161639924 13.059163159837755 14.2432530924 11.976912059837755 14.2432530924  C10.894660959837754 14.2432530924 6.349206409837755 14.2432530924 6.349206409837755 14.2432530924  L6.152061969837755 0.4299262694  C6.152061969837755 0.4299262694 8.031113549837755 0 9.595959659837757 0.7547497214000001  z";
	        this.bpmnInfo = {type: 4, name:"ManualTask" };    //节点信息
	        this.render(model);
	    };
	
	    ManualTaskNode.prototype.render = function(model) {
	        var rect = new graphic.Rect({
	            shape: {
	                x: 0.5,
	                y: 0.5,                
	                width: this.rectSize.width-1,
	                height: this.rectSize.height-1,
	                r: 7
	            },
	            style: {
	
	                fill: '#f9f9f9',
	                stroke: '#bbbbbb'
	            },            
	        });        
	        rect.name = "Rect"; 
	        this.add(rect);
	       
	        var rect = {x:5, y: 5, width: 15, height:15};
	        this.add(graphic.makePath(this.iconPath, {style: {fill: '#d1b575'}}, rect));
	
	       // this.add(graphic.makePath(this.iconPath2, {style: {fill: '#4990E2'}}, rect,"center"));
	        this.position =  [model.get("bounds.upperLeft.x"), model.get("bounds.upperLeft.y")];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(ManualTaskNode,TaskNode);
		module.exports = ManualTaskNode;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	//ScriptTask节点
	
		var TaskNode = __webpack_require__(80);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	/**
	 * 
	 *  <g pointer-events="fill" minimumSize="82 42" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5D" title="Script task">            
	 *     <rect id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dtext_frame" anchors="bottom top right left" x="1" y="1" width="74" height="39" rx="10" ry="10" stroke="none" stroke-width="0" fill="none"></rect>             
	 *     <rect id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dbg_frame" resize="vertical horizontal" x="0" y="0" width="80" height="40" rx="10" ry="10" stroke="#bbbbbb" stroke-width="1" fill="#f9f9f9"></rect>                
	 *     <rect xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Darea_state" anchors="bottom" x="0" y="30" width="80" height="10" rx="10" ry="10" resize="horizontal" stroke="none" stroke-width="0" fill="none" style=""></rect>        
	 *     <text xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" font-size="12" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dtext_name" x="43" y="24" align="middle center" fittoelem="text_frame" stroke="#373e48" stroke-width="0pt" letter-spacing="-0.01px" transform="rotate(0 43 24)" oryx:fontSize="12" text-anchor="middle"><tspan x="43" y="24" dy="5">Task</tspan></text>        
	 *     <g id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5DscriptTask" transform="translate(2,2) scale(0.8)">                       
	 *     <path anchors="top left" d="m 5,2 0,0.094 c 0.23706,0.064 0.53189,0.1645 0.8125,0.375 0.5582,0.4186 1.05109,1.228 1.15625,2.5312 l 8.03125,0 1,0 1,0 c 0,-3 -2,-3 -2,-3 l -10,0 z M 4,3 4,13 2,13 c 0,3 2,3 2,3 l 9,0 c 0,0 2,0 2,-3 L 15,6 6,6 6,5.5 C 6,4.1111 5.5595,3.529 5.1875,3.25 4.8155,2.971 4.5,3 4.5,3 L 4,3 z" style="fill:#72a7d0;stroke:none" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5D_sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5D_17"></path>              
	 *     </g>        
	 * </g>
	 */
	    function ScriptTaskNode(model,api) {
	        TaskNode.call(this,model, api);
	        this.rectSize = {width:100, height:60};
	        this.iconPath = "m 5,2 0,0.094 c 0.23706,0.064 0.53189,0.1645 0.8125,0.375 0.5582,0.4186 1.05109,1.228 1.15625,2.5312 l 8.03125,0 1,0 1,0 c 0,-3 -2,-3 -2,-3 l -10,0 z M 4,3 4,13 2,13 c 0,3 2,3 2,3 l 9,0 c 0,0 2,0 2,-3 L 15,6 6,6 6,5.5 C 6,4.1111 5.5595,3.529 5.1875,3.25 4.8155,2.971 4.5,3 4.5,3 L 4,3 z";
	      //  this.iconPath2 = "M9.595959659837757 0.7547497214000001  C11.160805759837753 1.5094994424 11.576517859837754 2.7466546824 11.074567559837757 5.298533702399999  C10.572617259837756 7.8504127324 10.028860059837754 7.9729218124 9.595959659837757 8.9207625924  C9.163059279837753 9.868603372399999 9.451659519837754 10.6706224924 10.461760559837757 11.1080874924  C11.471861559837755 11.5455524924 14.285714259837755 12.8579473924 14.285714359837757 13.5870556924  C14.285714359837757 14.3161639924 13.059163159837755 14.2432530924 11.976912059837755 14.2432530924  C10.894660959837754 14.2432530924 6.349206409837755 14.2432530924 6.349206409837755 14.2432530924  L6.152061969837755 0.4299262694  C6.152061969837755 0.4299262694 8.031113549837755 0 9.595959659837757 0.7547497214000001  z";
	        this.bpmnInfo = {type: 7, name:"ScriptTask" };    //节点信息
	        this.render(model);
	    };
	
	    ScriptTaskNode.prototype.render = function(model) {
	        var rect = new graphic.Rect({
	            shape: {
	                x: 0.5,
	                y: 0.5,                
	                width: this.rectSize.width-1,
	                height: this.rectSize.height-1,
	                r: 7
	            },
	            style: {
	
	                fill: '#f9f9f9',
	                stroke: '#bbbbbb'
	            },            
	        });    
	        rect.name = "Rect";     
	        this.add(rect);
	       
	        var rect = {x:5, y: 5, width: 15, height:15};
	        this.add(graphic.makePath(this.iconPath, {style: {fill: '#72a7d0'}}, rect));
	
	       // this.add(graphic.makePath(this.iconPath2, {style: {fill: '#4990E2'}}, rect,"center"));
	        this.position =  [model.get("bounds.upperLeft.x"), model.get("bounds.upperLeft.y")];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(ScriptTaskNode,TaskNode);
		module.exports = ScriptTaskNode;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//MailTask节点
	
		var TaskNode = __webpack_require__(80);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	/**
	 * 
	 *  <g pointer-events="fill" minimumSize="82 42" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5D" title="Script task">            
	 *     <rect id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dtext_frame" anchors="bottom top right left" x="1" y="1" width="74" height="39" rx="10" ry="10" stroke="none" stroke-width="0" fill="none"></rect>             
	 *     <rect id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dbg_frame" resize="vertical horizontal" x="0" y="0" width="80" height="40" rx="10" ry="10" stroke="#bbbbbb" stroke-width="1" fill="#f9f9f9"></rect>                
	 *     <rect xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Darea_state" anchors="bottom" x="0" y="30" width="80" height="10" rx="10" ry="10" resize="horizontal" stroke="none" stroke-width="0" fill="none" style=""></rect>        
	 *     <text xmlns:oryx="http://www.b3mn.org/oryx" xmlns="http://www.w3.org/2000/svg" font-size="12" id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5Dtext_name" x="43" y="24" align="middle center" fittoelem="text_frame" stroke="#373e48" stroke-width="0pt" letter-spacing="-0.01px" transform="rotate(0 43 24)" oryx:fontSize="12" text-anchor="middle"><tspan x="43" y="24" dy="5">Task</tspan></text>        
	 *     <g id="sid-B83DFA9E-0066-4032-A9E8-A7FF19C1AB5DscriptTask" transform="translate(2,2) scale(0.8)">                       
	 *        <path anchors="top left" d="M0.332638936,1.17391304 L8.98125126,6.65217391" id="sid-09B97C5E-BEA8-40A2-9F22-3064A2745DBELine" stroke="#FFFFFF" stroke-linecap="square"></path>              
	 *        <path anchors="top left" d="M17.5500302,1.17391304 L8.90141792,6.65217391" id="sid-09B97C5E-BEA8-40A2-9F22-3064A2745DBELine-Copy-4" stroke="#FFFFFF" stroke-linecap="square"></path>
	 *	   </g>        
	 * </g>
	 */
	    function MailTaskNode(model,api) {
	        TaskNode.call(this,model, api);
	        this.rectSize = {width:100, height:60};
	        this.iconPath = "M49.013,51.003c1.847,1.303,7.414,5.174,16.702,11.61S82.118,74.005,87.061,77.48c0.543,0.381,1.697,1.209,3.462,2.485c1.765,1.277,3.232,2.31,4.399,3.097c1.168,0.787,2.58,1.67,4.237,2.647c1.657,0.977,3.219,1.711,4.685,2.198c1.467,0.49,2.825,0.733,4.074,0.733H108h0.082c1.249,0,2.607-0.243,4.074-0.733c1.466-0.487,3.029-1.222,4.685-2.198c1.656-0.978,3.068-1.86,4.236-2.647s2.634-1.82,4.399-3.097s2.92-2.104,3.463-2.485c4.996-3.476,17.707-12.302,38.129-26.479c3.965-2.769,7.277-6.11,9.939-10.021C179.67,37.071,181,32.97,181,28.679c0-3.585-1.291-6.654-3.871-9.207c-2.58-2.553-5.636-3.829-9.165-3.829H48.035c-4.182,0-7.4,1.412-9.654,4.236C36.127,22.704,35,26.235,35,30.471c0,3.422,1.494,7.13,4.481,11.122S45.646,48.722,49.013,51.003z M172.852,59.72c-17.814,12.057-31.34,21.427-40.572,28.108c-3.096,2.281-5.608,4.061-7.537,5.336c-1.928,1.277-4.494,2.58-7.699,3.911c-3.204,1.331-6.191,1.996-8.961,1.996H108h-0.082c-2.77,0-5.758-0.665-8.962-1.996s-5.771-2.634-7.699-3.911c-1.928-1.275-4.44-3.055-7.536-5.336c-7.333-5.377-20.83-14.747-40.492-28.108c-3.096-2.063-5.839-4.427-8.229-7.088v64.688c0,3.586,1.276,6.654,3.829,9.207c2.553,2.554,5.622,3.83,9.207,3.83h119.929c3.584,0,6.653-1.276,9.206-3.83c2.554-2.554,3.829-5.621,3.829-9.207V52.632C178.664,55.238,175.949,57.602,172.852,59.72z";
	      //  this.iconPath2 = "M9.595959659837757 0.7547497214000001  C11.160805759837753 1.5094994424 11.576517859837754 2.7466546824 11.074567559837757 5.298533702399999  C10.572617259837756 7.8504127324 10.028860059837754 7.9729218124 9.595959659837757 8.9207625924  C9.163059279837753 9.868603372399999 9.451659519837754 10.6706224924 10.461760559837757 11.1080874924  C11.471861559837755 11.5455524924 14.285714259837755 12.8579473924 14.285714359837757 13.5870556924  C14.285714359837757 14.3161639924 13.059163159837755 14.2432530924 11.976912059837755 14.2432530924  C10.894660959837754 14.2432530924 6.349206409837755 14.2432530924 6.349206409837755 14.2432530924  L6.152061969837755 0.4299262694  C6.152061969837755 0.4299262694 8.031113549837755 0 9.595959659837757 0.7547497214000001  z";
	        this.bpmnInfo = {type: 8, name:"MailTask" };    //节点信息
	        this.render(model);
	    };
	
	    MailTaskNode.prototype.render = function(model) {
	        var rect = new graphic.Rect({
	            shape: {
	                x: 0.5,
	                y: 0.5,                
	                width: this.rectSize.width-1,
	                height: this.rectSize.height-1,
	                r: 7
	            },
	            style: {
	
	                fill: '#f9f9f9',
	                stroke: '#bbbbbb'
	            },            
	        });       
	        rect.name = "Rect";  
	        this.add(rect);
	
	        var rect = {x:5, y: 5, width: 20, height:15};
	        this.add(graphic.makePath(this.iconPath, {style: {fill: '#72a7d0'}}, rect));
	
	       // this.add(graphic.makePath(this.iconPath2, {style: {fill: '#4990E2'}}, rect,"center"));
	        this.position =  [model.get("bounds.upperLeft.x"), model.get("bounds.upperLeft.y")];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(MailTaskNode,TaskNode);
		module.exports = MailTaskNode;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	//边界事件---捕获定时器事件节点
	
		var EventNode = __webpack_require__(77);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bbg_frame" cx="16" cy="16" r="15" stroke="#585858" fill="#ffffff" stroke-width="1" style="stroke-dasharray: 5.5, 3"></circle>
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bframe2_non_interrupting" cx="16" cy="16" r="12" stroke="#585858" fill="none" stroke-width="1" style="stroke-dasharray: 4.5, 3"></circle>
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bframe" cx="16" cy="16" r="15" stroke="#585858" fill="none" stroke-width="1"></circle>
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bframe2" cx="16" cy="16" r="12" stroke="#585858" fill="none" stroke-width="1"></circle>       
	 *    <path id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bpath1" transform="translate(6,6)" d="M 10 0 C 4.4771525 0 0 4.4771525 0 10 C 0 15.522847 4.4771525 20 10 20 C 15.522847 20 20 15.522847 20 10 C 20 4.4771525 15.522847 1.1842379e-15 10 0 z M 9.09375 1.03125 C 9.2292164 1.0174926 9.362825 1.0389311 9.5 1.03125 L 9.5 3.5 L 10.5 3.5 L 10.5 1.03125 C 15.063526 1.2867831 18.713217 4.9364738 18.96875 9.5 L 16.5 9.5 L 16.5 10.5 L 18.96875 10.5 C 18.713217 15.063526 15.063526 18.713217 10.5 18.96875 L 10.5 16.5 L 9.5 16.5 L 9.5 18.96875 C 4.9364738 18.713217 1.2867831 15.063526 1.03125 10.5 L 3.5 10.5 L 3.5 9.5 L 1.03125 9.5 C 1.279102 5.0736488 4.7225326 1.4751713 9.09375 1.03125 z M 9.5 5 L 9.5 8.0625 C 8.6373007 8.2844627 8 9.0680195 8 10 C 8 11.104569 8.8954305 12 10 12 C 10.931981 12 11.715537 11.362699 11.9375 10.5 L 14 10.5 L 14 9.5 L 11.9375 9.5 C 11.756642 8.7970599 11.20294 8.2433585 10.5 8.0625 L 10.5 5 L 9.5 5 z " fill="#585858" stroke="none"></path>  
	 * </g>
	 */
	
		function CatchTimerEventNode(model, api) {
			EventNode.call(this,model, api);
	        this.startIcon = 'M 10 0 C 4.4771525 0 0 4.4771525 0 10 C 0 15.522847 4.4771525 20 10 20 C 15.522847 20 20 15.522847 20 10 C 20 4.4771525 15.522847 1.1842379e-15 10 0 z M 9.09375 1.03125 C 9.2292164 1.0174926 9.362825 1.0389311 9.5 1.03125 L 9.5 3.5 L 10.5 3.5 L 10.5 1.03125 C 15.063526 1.2867831 18.713217 4.9364738 18.96875 9.5 L 16.5 9.5 L 16.5 10.5 L 18.96875 10.5 C 18.713217 15.063526 15.063526 18.713217 10.5 18.96875 L 10.5 16.5 L 9.5 16.5 L 9.5 18.96875 C 4.9364738 18.713217 1.2867831 15.063526 1.03125 10.5 L 3.5 10.5 L 3.5 9.5 L 1.03125 9.5 C 1.279102 5.0736488 4.7225326 1.4751713 9.09375 1.03125 z M 9.5 5 L 9.5 8.0625 C 8.6373007 8.2844627 8 9.0680195 8 10 C 8 11.104569 8.8954305 12 10 12 C 10.931981 12 11.715537 11.362699 11.9375 10.5 L 14 10.5 L 14 9.5 L 11.9375 9.5 C 11.756642 8.7970599 11.20294 8.2433585 10.5 8.0625 L 10.5 5 L 9.5 5 z';
	        this.itemSize = 10;
			this.bpmnInfo = {type: 43, name:"CatchTimerEvent" };    //节点信息
	        this.render(model);
		};
	
	    CatchTimerEventNode.prototype.render = function(model) {
	
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-0.5
	                },
	                style: {
	                    fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        circle.name = "Circle";
	        this.add(circle);
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-3
	                },
	                style: {
	                	fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        this.add(circle);
	
	        var itemSize = this.itemSize+6;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.startIcon, {style: {stroke:'#585858'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+this.itemSize , model.get("bounds.upperLeft.y")+this.itemSize];
	
	    };
	
		zrUtil.inherits(CatchTimerEventNode, EventNode);
		module.exports = CatchTimerEventNode;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	//边界事件---捕获信号量事件
	
		var EventNode = __webpack_require__(77);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bbg_frame" cx="16" cy="16" r="15" stroke="#585858" fill="#ffffff" stroke-width="1" style="stroke-dasharray: 5.5, 3"></circle>
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bframe2_non_interrupting" cx="16" cy="16" r="12" stroke="#585858" fill="none" stroke-width="1" style="stroke-dasharray: 4.5, 3"></circle>
	 *    <path id="sid-3CC33924-73F3-4D13-A2A9-0242530680DEsignalCatching" stroke="#585858" d=" M7.7124971 20.247342  L22.333334 20.247342  L15.022915000000001 7.575951200000001  L7.7124971 20.247342  z" style="fill:none;stroke-width:1.4;stroke-miterlimit:4;stroke-dasharray:none"></path>
	 * </g>
	 */
	
		function CatchSignalEventNode(model, api) {
			EventNode.call(this,model, api);
	        this.startIcon = 'M7.7124971 20.247342  L22.333334 20.247342  L15.022915000000001 7.575951200000001  L7.7124971 20.247342  z';
	        this.itemSize = 10;
			this.bpmnInfo = {type: 72, name:"CatchSignalEvent" };    //节点信息
	        this.render(model);
		};
	
	    CatchSignalEventNode.prototype.render = function(model) {
	
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-0.5
	                },
	                style: {
	                    fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        circle.name = "Circle";
	        this.add(circle);
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-3
	                },
	                style: {
	                	fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        this.add(circle);
	
	        var itemSize = this.itemSize+6;
	        var rect = {x:-itemSize/2, y: -itemSize/2-3, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.startIcon, {style: {stroke:'#585858',fill:'#ffffff'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+this.itemSize , model.get("bounds.upperLeft.y")+this.itemSize];
	
	    };
	
		zrUtil.inherits(CatchSignalEventNode, EventNode);
		module.exports = CatchSignalEventNode;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//边界事件---ThrowSignalEvent节点
	
		var EventNode = __webpack_require__(77);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bbg_frame" cx="16" cy="16" r="15" stroke="#585858" fill="#ffffff" stroke-width="1" style="stroke-dasharray: 5.5, 3"></circle>
	 *    <circle id="sid-F8DFBDAD-2852-4A9A-84E9-A65943A0962Bframe2_non_interrupting" cx="16" cy="16" r="12" stroke="#585858" fill="none" stroke-width="1" style="stroke-dasharray: 4.5, 3"></circle>
	 *    <path id="sid-3CC33924-73F3-4D13-A2A9-0242530680DEsignalCatching" stroke="#585858" d=" M7.7124971 20.247342  L22.333334 20.247342  L15.022915000000001 7.575951200000001  L7.7124971 20.247342  z" style="fill:none;stroke-width:1.4;stroke-miterlimit:4;stroke-dasharray:none"></path>
	 * </g>
	 */
	
		function ThrowSignalEventNode(model, api) {
			EventNode.call(this,model, api);
	        this.startIcon = 'M7.7124971 20.247342  L22.333334 20.247342  L15.022915000000001 7.575951200000001  L7.7124971 20.247342  z';
	        this.itemSize = 10;
			this.bpmnInfo = {type: 75, name:"ThrowSignalEvent" };    //节点信息
	        this.render(model);
		};
	
	    ThrowSignalEventNode.prototype.render = function(model) {
	
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-0.5
	                },
	                style: {
	                    fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        circle.name = "Circle";
	        this.add(circle);
	        var circle = new graphic.Circle({
	                shape: {
	                    cx: 0,
	                    cy: 0,
	                    r: this.itemSize-3
	                },
	                style: {
	                	fill: '#ffffff',
	                    stroke:'#585858',
	                },
	        })
	        this.add(circle);
	
	        var itemSize = this.itemSize+6;
	        var rect = {x:-itemSize/2, y: -itemSize/2-3, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.startIcon, {style: {stroke:'#585858',fill:'#000000'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+this.itemSize , model.get("bounds.upperLeft.y")+this.itemSize];
	
	    };
	
		zrUtil.inherits(ThrowSignalEventNode, EventNode);
		module.exports = ThrowSignalEventNode;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	//InclusiveGateWay节点
	
		var GatewayNode = __webpack_require__(88);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <path d=" M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z" id="sid-6D0E93DA-0E0B-47F0-AF85-3F3230367651Rectangle-1" fill="#F6A623"></path>        
	 *    <path d=" M19.851221564 27.782256064000002  C24.231410964 27.782256064000002 27.782256064000002 24.231410964 27.782256064000002 19.851221564  C27.782256064000002 15.471032163999999 24.231410964 11.920187063999999 19.851221564 11.920187063999999  C15.471032163999999 11.920187063999999 11.920187063999999 15.471032163999999 11.920187063999999 19.851221564  C11.920187063999999 24.231410964 15.471032163999999 27.782256064000002 19.851221564 27.782256064000002  z" id="sid-6D0E93DA-0E0B-47F0-AF85-3F3230367651Oval-4" fill="#FFFFFF"></path>
	 * </g>
	 */
	
		function InclusiveGatewayNode(model, api) {
			GatewayNode.call(this, model, api);
	        this.startIcon = 'M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z';
	        this.nextIcon = 'M19.851221564 27.782256064000002  C24.231410964 27.782256064000002 27.782256064000002 24.231410964 27.782256064000002 19.851221564  C27.782256064000002 15.471032163999999 24.231410964 11.920187063999999 19.851221564 11.920187063999999  C15.471032163999999 11.920187063999999 11.920187063999999 15.471032163999999 11.920187063999999 19.851221564  C11.920187063999999 24.231410964 15.471032163999999 27.782256064000002 19.851221564 27.782256064000002  z'
	        this.itemSize = 20;
			this.bpmnInfo = {type: 20, name:"InclusiveGateway" };    //节点信息
	        this.render(model);
		};
	
	    InclusiveGatewayNode.prototype.render = function(model) {
	        var itemSize = this.itemSize*2;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        var path = graphic.makePath(this.startIcon, {style: {fill: '#F6A623'}}, rect,"center");
	        path.name = 'Path';
	        this.add(path);
	        var itemSize = this.itemSize;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.nextIcon, {style: {fill: '#FFFFFF'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+itemSize , model.get("bounds.upperLeft.y")+itemSize];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(InclusiveGatewayNode, GatewayNode);
		module.exports = InclusiveGatewayNode;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//所有GateWay节点的基类
	
	    var BPMNNode = __webpack_require__(71);
	    var zrUtil = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(25);
	    //创建Node类 所有形状都继承Node  包括fromJSON toJSON
	    //
	    function GatewayNode(model, api) {
	        BPMNNode.call(this, model, api);
	        this.bpmnInfo = {type: -1, name:"GatewayNode" };    //节点信息
	        this.model = model;
	    };
	
	    GatewayNode.prototype.render = function() {
	        
	    };
	
	    GatewayNode.prototype.fromJSON = function(json) {
	        // body...
	    
	
	    };
	    GatewayNode.prototype.getRect = function(json) {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        //创建最小包围盒虚线
	        var points = [];
	        points[0] =[-boundingRect.width/2,-boundingRect.height/2];
	        points[1] =[boundingRect.width/2,-boundingRect.height/2];
	        points[2] =[boundingRect.width/2,boundingRect.height/2];
	        points[3] =[-boundingRect.width/2,boundingRect.height/2];
	        points[4] =[-boundingRect.width/2,-boundingRect.height/2];   
	        var boundRect = new BoundingRect(this.position[0] - boundingRect.width/2 , 
	                                         this.position[1] - boundingRect.height/2, 
	                                         boundingRect.width, boundingRect.height);
	        return {
	            x: this.position[0],
	            y: this.position[1],
	            width: boundingRect.width/2,
	            height: boundingRect.height/2,
	            points: points,
	            boundingRect: boundRect,
	        };
	
	    };    
	    GatewayNode.prototype.reDraw = function(pX,pY) {
	        // body...
	        this.attr('position',[pX,pY]);
	    };   
	    GatewayNode.prototype.getBoundingRect = function() {
	        var path = this.childOfName("Path");
	        return path.getBoundingRect();
	    };    
	
	    zrUtil.inherits(GatewayNode,BPMNNode);
	    module.exports = GatewayNode;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	//ExclusiveGateWay节点
	
		var GatewayNode = __webpack_require__(88);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <path d=" M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z" id="sid-6D0E93DA-0E0B-47F0-AF85-3F3230367651Rectangle-1" fill="#F6A623"></path>        
	 *    <path d=" M8.275862069 11.965517269000001  L1.499999999 11.965517269000001  L0 11.965517269000001  L0 8.965517239  L1.499999999 8.965517239  L8.275862069 8.965517239  L8.275862069 1.499999999  L8.275862069 0  L11.275862069 0  L11.275862069 1.499999999  L11.275862069 8.965517239  L18.741379269 8.965517239  L20.241379269 8.965517239  L20.241379269 11.965517269000001  L18.741379269 11.965517269000001  L11.275862069 11.965517269000001  L11.275862069 18.741379269  L11.275862069 20.241379269  L8.275862069 20.241379269  L8.275862069 18.741379269  L8.275862069 11.965517269000001  z" id="sid-1B88D2DF-A08F-4837-91F2-91F67ACAB29ALine-Copy"></path>
	 * </g>
	 */
	
		function ExclusiveGatewayNode(model, api) {
			GatewayNode.call(this, model, api);
	        this.startIcon = 'M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z';
	        this.nextIcon = 'M19.904129064000003 17.676993964000005  L24.997457864000005 12.583664864000003  L26.058118064000006 11.523004664000002  L28.179438464 13.644324964000003  L27.118778264 14.704985164000002  L22.025449364000004 19.798314364  L27.118778264 24.891643464000005  L28.179438464 25.952303664000006  L26.058118064000006 28.073623964000003  L24.997457864000005 27.012963764000006  L19.904129064000003 21.919634764  L14.810800164000003 27.012963764000006  L13.750140064000002 28.073623964000003  L11.628819664000003 25.952303664000006  L12.689479764000003 24.891643464000005  L17.782808764000002 19.798314364  L12.689479764000003 14.704985164000002  L11.628819664000003 13.644324964000003  L13.750140064000002 11.523004664000002  L14.810800164000003 12.583664864000003  L19.904129064000003 17.676993964000005  z'
	        this.itemSize = 20;
			this.bpmnInfo = {type: 17, name:"ExclusiveGateway" };    //节点信息
	        this.render(model);
		};
	
	    ExclusiveGatewayNode.prototype.render = function(model) {
	        var itemSize = this.itemSize*2;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        var path = graphic.makePath(this.startIcon, {style: {fill: '#F6A623'}}, rect,"center");
	        path.name = 'Path';
	        this.add(path);
	        var itemSize = this.itemSize;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.nextIcon, {style: {fill: '#FFFFFF'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+itemSize , model.get("bounds.upperLeft.y")+itemSize];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(ExclusiveGatewayNode, GatewayNode);
		module.exports = ExclusiveGatewayNode;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	//ParallelGateWay节点
	
		var GatewayNode = __webpack_require__(88);
		var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	
	/**
	 * <g pointer-events="fill" id="sid-FF0ADFC0-D3EC-4237-AD16-A36273D1FE6D" title="Start event">    
	 *    <path d=" M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z" id="sid-6D0E93DA-0E0B-47F0-AF85-3F3230367651Rectangle-1" fill="#F6A623"></path>        
	 *    <path d=" M19.904129064000003 17.676993964000005  L24.997457864000005 12.583664864000003  L26.058118064000006 11.523004664000002  L28.179438464 13.644324964000003  L27.118778264 14.704985164000002  L22.025449364000004 19.798314364  L27.118778264 24.891643464000005  L28.179438464 25.952303664000006  L26.058118064000006 28.073623964000003  L24.997457864000005 27.012963764000006  L19.904129064000003 21.919634764  L14.810800164000003 27.012963764000006  L13.750140064000002 28.073623964000003  L11.628819664000003 25.952303664000006  L12.689479764000003 24.891643464000005  L17.782808764000002 19.798314364  L12.689479764000003 14.704985164000002  L11.628819664000003 13.644324964000003  L13.750140064000002 11.523004664000002  L14.810800164000003 12.583664864000003  L19.904129064000003 17.676993964000005  z" id="sid-8FCD6C01-B973-4C9C-A90B-3D2ADFC75217Line" fill="#FFFFFF"></path>
	 * </g>
	 */
	
		function ParallelGatewayNode(model, api) {
			GatewayNode.call(this, model, api);
	        this.startIcon = 'M0 19.506393964  L19.506393964 0  L39.012787964 19.506393964  L19.506393964 39.012787964  L0 19.506393964  L0 19.506393964  z';
	        this.nextIcon = 'M8.275862069 11.965517269000001  L1.499999999 11.965517269000001  L0 11.965517269000001  L0 8.965517239  L1.499999999 8.965517239  L8.275862069 8.965517239  L8.275862069 1.499999999  L8.275862069 0  L11.275862069 0  L11.275862069 1.499999999  L11.275862069 8.965517239  L18.741379269 8.965517239  L20.241379269 8.965517239  L20.241379269 11.965517269000001  L18.741379269 11.965517269000001  L11.275862069 11.965517269000001  L11.275862069 18.741379269  L11.275862069 20.241379269  L8.275862069 20.241379269  L8.275862069 18.741379269  L8.275862069 11.965517269000001  z'
	        this.itemSize = 20;
			this.bpmnInfo = {type: 20, name:"ParallelGateway" };    //节点信息
	        this.render(model);
		};
	
	    ParallelGatewayNode.prototype.render = function(model) {
	        var itemSize = this.itemSize*2;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        var path = graphic.makePath(this.startIcon, {style: {fill: '#F6A623'}}, rect,"center");
	        path.name = 'Path';
	        this.add(path);
	        var itemSize = this.itemSize;
	        var rect = {x:-itemSize/2, y: -itemSize/2, width: itemSize, height:itemSize};
	        this.add(graphic.makePath(this.nextIcon, {style: {fill: '#FFFFFF'}}, rect,"center"));
	        this.position = [model.get("bounds.upperLeft.x")+itemSize , model.get("bounds.upperLeft.y")+itemSize];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
		zrUtil.inherits(ParallelGatewayNode, GatewayNode);
		module.exports = ParallelGatewayNode;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	//子流程
	
		var BPMNNode = __webpack_require__(71);
		var zrUtil = __webpack_require__(4);
	    var BoundingRect = __webpack_require__(25);
	    var graphic = __webpack_require__(3);
	    var Connector = __webpack_require__(92);
		//创建Node类 所有形状都继承Node
		//
		function SubProcessNode(model, api) {
	
			BPMNNode.call(this, model, api);
			this.bpmnInfo = {type: -1, name:"SubProcess" };    //节点信息
	        this.model = model;
	        this.slot = [];
	        this.slotEvent = [];
	        var width,height;
	        width = model.get("bounds.lowerRight.x")-model.get("bounds.upperLeft.x");
	        height = model.get("bounds.lowerRight.y")-model.get("bounds.upperLeft.y");
	        if(!width || width <= 0){
	            width = 160;
	        }
	        if(!height || height <= 0){
	            height = 100;
	        }
	
	        this.rectSize = {width:width, height:height};
	        this.render(model);
		};
	
	
	    SubProcessNode.prototype.initEvent = function(api) {
	        var that = this;
	        var MOUSE_EVENT_NAMES = ['dblclick', 'click'];//'click', 'dblclick', 'mouseover', 'mouseout'
	
	
	        zrUtil.each(MOUSE_EVENT_NAMES, function (eveName) {
	            that.on(eveName, function (e) {
	                var params = {};
	                params.event = e;
	                var current = e.target;
	                if (current.parent &&  current.parent instanceof Connector) {
	                    return;
	                };
	                params.type = eveName;
	                params.target = that;
	                api.trigger(eveName, params); 
	            }, this);
	        });
	    };  
	
	
	    SubProcessNode.prototype.render = function(model) {
	    	var rect = new graphic.Rect({
	            shape: {
	                x: 0.5,
	                y: 0.5,
	                width: this.rectSize.width-1,
	                height: this.rectSize.height-1,
	                r: 7
	            },
	            style: {
	
	                fill: '#f9f9f9',
	                stroke: '#bbbbbb'
	            },
	        });
	        rect.name = "Rect";
	        this.add(rect);
	        this.position =  [model.get("bounds.upperLeft.x"), model.get("bounds.upperLeft.y")];
	        var title = this.drawText(model.get("properties.name"));
	        title.text.name = "Title";
	        this.add(title.text);
	    };
	
	
	    SubProcessNode.prototype.getRect = function(json) {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        //创建最小包围盒虚线
	        var points = [];
	        points[0] =[-boundingRect.width/2,-boundingRect.height/2];
	        points[1] =[boundingRect.width/2,-boundingRect.height/2];
	        points[2] =[boundingRect.width/2,boundingRect.height/2];
	        points[3] =[-boundingRect.width/2,boundingRect.height/2];
	        points[4] =[-boundingRect.width/2,-boundingRect.height/2];
	
	        var boundRect = new BoundingRect(this.position[0] ,
	                                         this.position[1],
	                                         boundingRect.width, boundingRect.height);
	        return {
	            x: this.position[0]+boundingRect.width/2,
	            y: this.position[1]+boundingRect.height/2,
	            width: boundingRect.width,
	            height: boundingRect.height,
	            points: points,
	            boundingRect: boundRect,
	        };
	    };
	
	    SubProcessNode.prototype.reDraw = function(pX,pY) {
	        // body...
	        var boundingRect = this.getBoundingRect();
	        this.attr('position',[pX-boundingRect.width/2,pY-boundingRect.height/2]);
	
	    };
	
	
	    SubProcessNode.prototype.refresh = function(opt) {
	        var rect = this.childOfName("Rect");
	        rect.setShape(opt.shape);
	        this.attr('position',opt.position);
	        this.refreshText();
	    };
	
	
	
	    SubProcessNode.prototype.getBoundingRect = function() {
	        var rect = this.childOfName("Rect");
	        return rect.getBoundingRect();
	    };
	
	    /**
	     * 根据属性设置模型数据
	     * @param {[type]} option [description]
	     */
	    SubProcessNode.prototype.setModel = function(option) {
	        var that = this;
	        var originText = this.model.get("properties.name");
	        this.model.mergeOption(option);
	        if(originText != option.properties.name) {
	            var title = this.childOfName("Title");
	            var nameByteLength = option.properties.name.length;
	            var showName;
	            if(nameByteLength > 64){
	                showName = option.properties.name.substr(0,64)+'..';
	                this.alarm.isShow = true;
	            }else{
	                showName = option.properties.name
	                this.alarm.isShow = false;
	            }
	            title.attr("style",{text:showName});
	            that.refreshText(that);
	            var name = option.properties.name;
	            var text = this.alarm.childOfName("Text");
	            text.attr("style",{text:name});
	            var groupWidth = text.getBoundingRect().width+4;
	            var groupHeight = text.getBoundingRect().height+8;
	            var points = [
	                [0,0],
	                [groupWidth,0],
	                [groupWidth,groupHeight],
	                [groupWidth-3,groupHeight],
	                [groupWidth-6,groupHeight+3],
	                [groupWidth-9,groupHeight],
	                [0,groupHeight],
	                [0,0]
	            ];
	            var Polyline = this.alarm.childOfName("Polyline");
	            Polyline.attr("shape",{points:points});
	            var groupPosition = [this.position[0]+this.getBoundingRect().width-(this.alarm.getBoundingRect().width-6),this.position[1]-this.alarm.getBoundingRect().height-3];
	            this.alarm.attr("position",groupPosition);
	        }
	    };
	
	
	    SubProcessNode.prototype.toJSON = function() {
	        this.model.set("resourceId", this.resourceId);
	        this.model.set("properties.type", this.bpmnInfo.type);
	        this.model.set("stencil.type", this.bpmnInfo.name);  //stencil.id
	        if (this.slotEvent && this.slotEvent.length > 0) {
	            var arrSlotEvent = [];
	            for (var i = this.slotEvent.length - 1; i >= 0; i--) {
	                arrSlotEvent.push(this.slotEvent[i].resourceId)
	            };
	            this.model.set("properties.slotEvent", arrSlotEvent);
	        };
	            // var rect = this.getRect();
	            // this.model.set("bounds.upperLeft.x", rect.x);
	            // this.model.set("bounds.upperLeft.y", rect.y);
	            // this.model.set("bounds.lowerRight.x", rect.x + rect.boundingRect.width);
	            // this.model.set("bounds.lowerRight.y", rect.y + rect.boundingRect.height);
	
	        var rect = this.getRect().boundingRect;
	        this.model.set("bounds.upperLeft.x", rect.x);
	        this.model.set("bounds.upperLeft.y", rect.y);
	        this.model.set("bounds.lowerRight.x", rect.x + rect.width);
	        this.model.set("bounds.lowerRight.y", rect.y + rect.height);
	
	
	
	        // 加入子流程的 节点
	        var arrChildSahpes = [];
	        this.eachChild(function(child){
	            if (child instanceof BPMNNode) {
	                arrChildSahpes.push(child.toJSON());
	            };
	
	            if (child instanceof Connector) {
	                arrChildSahpes.push(child.toJSON());
	            };
	        });
	
	
	
	        this.model.set("childShapes", arrChildSahpes);
	        return this.model.option;
	    };
	
		zrUtil.inherits(SubProcessNode,BPMNNode);
		module.exports = SubProcessNode;
	


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 连接线
	 * @author wang.xiaohu
	 */
	
	    var Util = __webpack_require__(69);
	    var zrUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(3);
	    var Node = __webpack_require__(72);
	    var symbolUtil = __webpack_require__(93);
	    var Handle = __webpack_require__(94);
	    var ConnectionPoint = __webpack_require__(95);
	    /**
	     * 构造函数
	     * @param {[type]} points [description]
	     */
	    function Connector(options) {
	        Node.call(this);
	        this.resourceId = Util.getUUID();  // 生成节点ID
	        var defaultOptions = {
	            symbol: {type:"arrow" , size: 10, color:"#000000"},  //箭头  可选值为： 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
	            style: {lineWidth:1, stroke:"#000000", lineType:Connector.TYPE_STRAIGHT},    //样式
	            hoverStyle: {lineWidth:2, stroke:"lime"}, //移上去的样式
	            arrowHoverStyle: {fill:"lime"},
	            shape: {points:null, smooth:false, smoothConstraint:null},//形状
	            position: [0,0],
	            isEdit: true,  //是否可编辑
	            text: {
	                text: "",
	                color: '#000000', // 文本颜色
	                textFont: '12px Microsoft YaHei'
	            }
	        }
	        var opt = options || {};
	        this.options = zrUtil.merge(defaultOptions, opt, true);
	        this.model = options.model;
	        this.handles = [];
	        this.connectionPoints = [];
	
	        this.conPointsGroup = null;
	        this.startNode = null;
	        this.endNode = null;
	        this.icons = [];
	        this.render();
	    };
	
	    Connector.TYPE_STRAIGHT = 'straight';
	
	    Connector.TYPE_JAGGED = 'jagged';
	
	    Connector.TYPE_ROUND = 'round';
	
	    Connector.RADIUS = 3;
	
	    Connector.START_NODE = "startNode";
	
	    Connector.END_NODE = "endNode";
	
	    Connector.LEFT = "left";
	
	    Connector.RIGHT = "right";
	
	    Connector.TOP = "top";
	
	    Connector.BOTTOM = "bottom";
	
	    Connector.BOTTOM = "bottom";
	
	    Connector.SEPERATOR = "-";
	    /**
	     * 重新画线，如果传空则根据turningPoints 重新画线
	     * @param  {[type]} points [description]
	     * @return {[type]}        [description]
	     */
	    Connector.prototype.refresh = function(points) {
	        if(points) {
	            this.turningPoints = points;
	        }
	        //将[x:0,y:0]转化为[0, 0]  给zrender使用
	        var points = Util.traslatePoints(this.turningPoints);
	        this.line.attr('shape', {points: points});
	
	        var symbolTo = this.childOfName('toSymbol');
	        if(symbolTo) {
	            symbolTo.attr('position', points[points.length -1]);
	            symbolTo.attr('rotation', Util.tangentRotation(this.turningPoints[this.turningPoints.length-2], this.turningPoints[this.turningPoints.length-1]));
	        };
	
	        var lineText = this.childOfName('lineText');
	        //开始没有创建文本，后来传进来text了，需要先创建文本
	        if (!lineText  && this.options.text.text) {
	            var text = this.drawText("lineText", this.options.text.text,0, 0);
	            this.add(text.text);
	            lineText = this.childOfName('lineText');
	        };
	        if (lineText) {
	            lineText.setStyle("text", this.options.text.text);
	            var middlePoint = this.middle(this.options.text);
	
	
	            if (this.options.style.lineType == Connector.TYPE_STRAIGHT ) {
	                //计算出极坐标的角度
	                var points  = Util.getMaxLineLength(this.turningPoints);
	                var angle = - Math.atan2(points[1].y - middlePoint[1], points[1].x - middlePoint[0]);
	                lineText.attr('rotation', angle);  //,Math.PI/2
	            }
	
	            lineText.attr("position", middlePoint);
	        };
	   };
	    /**
	     * 渲染
	     * @return {[type]} [description]
	     */
	    Connector.prototype.render = function() {
	        var that = this;
	        this.line = new graphic.Polyline({
	            position: this.options.position,
	            shape: this.options.shape,
	            style: this.options.style,
	            z:0 //
	        });
	        this.add(this.line);
	        var MOUSE_EVENT_NAMES = ['dblclick', 'click'];//'click', 'dblclick', 'mouseover', 'mouseout'
	
	        zrUtil.each(MOUSE_EVENT_NAMES, function (eveName) {
	            that.line.on(eveName, function (e) {
	                var params = {};
	                params.event = e;
	                params.type = "Connector:" + eveName;
	                params.target = that;
	                that.trigger(params.type, params);
	                if(that.options.isEdit == false){return;}
	                if(that.options.isEdit && that.connectionPoints.length < 1 && that.turningPoints.length >=2) {
	                    that.createAllconnectionPoint()
	                }
	                if(that.handles.length < 1 ) {
	                    that.shapeSetHandle();
	                }
	
	
	            });
	        });
	
	        if(this.options.isEdit) {
	            this.conPointsGroup = new graphic.Group();
	            this.add(this.conPointsGroup);
	        }
	
	        var symbolTo = this.createSymbol('toSymbol', this.options.symbol.type, this.options.symbol.size, this.options.symbol.color); //arrow,triangle
	        if (symbolTo) {
	            this.add(symbolTo);
	        }
	
	        if (this.options.hoverStyle) {
	            var el = this.line;
	            graphic.setElementHoverStl(el, this.options.hoverStyle);
	            if(symbolTo){graphic.setElementHoverStl(symbolTo, this.options.arrowHoverStyle);}
	
	            el.on('mouseover', function() {
	                graphic.doEnterHover(el);
	                if(symbolTo){graphic.doEnterHover(symbolTo);}
	
	            })
	              .on('mouseout', function() {
	                graphic.doLeaveHover(el);
	                if(symbolTo){graphic.doLeaveHover(symbolTo);}
	
	            })
	        }
	
	        //创建文本
	        if (this.options.text.text && this.options.text.text != "") {
	            var text = this.drawText("lineText", this.options.text.text,0, 0);
	            this.add(text.text);
	        };
	
	
	    };
	
	    /**
	     * 创建Node的连接点
	     * @private
	     *
	     * @return {[type]} [description]
	     */
	    Connector.prototype.createAllconnectionPoint = function() {
	        var sRect = this.startNode.getRect? this.startNode.getRect().boundingRect : Util.getRect(this.startNode).boundingRect;
	
	        var eRect = this.endNode.getRect? this.endNode.getRect().boundingRect : Util.getRect(this.endNode).boundingRect;
	
	        var sConnectorPoint = Util.getConnectorPoints(sRect);
	        var eConnectorPoint = Util.getConnectorPoints(eRect);
	
	        this.connectionPointCreate(this.startNode, sConnectorPoint.left, Connector.START_NODE + Connector.SEPERATOR + Connector.LEFT);
	        this.connectionPointCreate(this.startNode, sConnectorPoint.right, Connector.START_NODE + Connector.SEPERATOR + Connector.RIGHT);
	        this.connectionPointCreate(this.startNode, sConnectorPoint.top, Connector.START_NODE + Connector.SEPERATOR + Connector.TOP);
	        this.connectionPointCreate(this.startNode, sConnectorPoint.bottom, Connector.START_NODE + Connector.SEPERATOR + Connector.BOTTOM);
	
	        this.connectionPointCreate(this.endNode, eConnectorPoint.left, Connector.END_NODE + Connector.SEPERATOR + Connector.LEFT);
	        this.connectionPointCreate(this.endNode, eConnectorPoint.right, Connector.END_NODE + Connector.SEPERATOR + Connector.RIGHT);
	        this.connectionPointCreate(this.endNode, eConnectorPoint.top, Connector.END_NODE + Connector.SEPERATOR + Connector.TOP);
	        this.connectionPointCreate(this.endNode, eConnectorPoint.bottom, Connector.END_NODE + Connector.SEPERATOR + Connector.BOTTOM);
	
	
	        this.connectionPointCreate(this, this.turningPoints[0].clone(), ConnectionPoint.TYPE_CONNECTOR);
	
	        this.connectionPointCreate(this, this.turningPoints[this.turningPoints.length-1].clone(), ConnectionPoint.TYPE_CONNECTOR);
	    };
	
	    /**
	     * 创建连接点
	     * @private
	     * @param  {[type]} shape [description]
	     * @param  {[type]} point [description]
	     * @param  {[type]} type  [description]
	     * @return {[type]}       [description]
	     */
	    Connector.prototype.connectionPointCreate = function(shape, point, type) {
	        var conPoint = new ConnectionPoint(this, point, type);
	        this.conPointsGroup.add(conPoint.shape);
	    };
	
	    /**
	     * 清空控制点
	     * @return {[type]} [description]
	     */
	    Connector.prototype.clearHandles = function() {
	        for (var i = 0; i < this.handles.length; i++) {
	            this.remove(this.handles[i].handleShape);
	        };
	        this.handles = [];
	        if (this.conPointsGroup) {
	            this.conPointsGroup.removeAll();
	        };
	    };
	
	    /**
	     * 创建拆线 线断的控制点
	     * @return {[type]} [description]
	     */
	    Connector.prototype.shapeSetHandle = function() {
	        for(var i=1; i<this.turningPoints.length-2; i++){
	            var h;
	            var x, y;
	            //是否在一条线上
	            var isCollineaityFirst = Util.collinearity(this.turningPoints[i-1], this.turningPoints[i], this.turningPoints[i+1]);
	            var isCollineaitySecond = Util.collinearity(this.turningPoints[i], this.turningPoints[i+1], this.turningPoints[i+2]);
	            if( (!isCollineaityFirst && (!isCollineaitySecond || this.turningPoints[i+1].equals(this.turningPoints[i+2])))
	                || ( (!isCollineaityFirst || this.turningPoints[i-1].equals(this.turningPoints[i])) && !isCollineaitySecond )) {
	
	                if(this.turningPoints[i].x === this.turningPoints[i+1].x){ //same vertical
	                    x = this.turningPoints[i].x;
	                    y = (this.turningPoints[i].y + this.turningPoints[i+1].y) / 2;
	
	                    h = new Handle('h',x,y,this);
	
	
	                }
	                else if(this.turningPoints[i].y === this.turningPoints[i+1].y){ // same horizontal
	                    x = (this.turningPoints[i].x +  this.turningPoints[i+1].x) / 2;
	                    y = this.turningPoints[i].y;
	                    h =  new  Handle('v',x,y,this);
	                }
	                if (h) {
	                    this.add(h.handleShape);
	                    this.handles.push(h);
	                }
	
	            }
	        }
	    };
	
	
	    /**
	     * 创建箭头
	     * @param  {[type]} name       [description]
	     * @param  {[type]} symbolType [description]
	     * @param  {[type]} symbolSize [description]
	     * @param  {[type]} color      [description]
	     * @return {[type]}            [description]
	     */
	    Connector.prototype.createSymbol = function(name,symbolType, symbolSize, color) {
	        if (symbolType === 'none') {
	            return;
	        }
	
	        if (!zrUtil.isArray(symbolSize)) {
	            symbolSize = [symbolSize, symbolSize];
	        }
	        var symbolPath = symbolUtil.createSymbol(
	            symbolType, -symbolSize[0] / 2, -symbolSize[1] / 2,
	            symbolSize[0], symbolSize[1], color
	        );
	        symbolPath.name = name;
	
	        return symbolPath;
	    };
	
	    /**
	     * 绘制线段上的文本
	     * @param  {[type]} content [description]
	     * @param  {[type]} x       [description]
	     * @param  {[type]} y       [description]
	     * @param  {[type]} color   [description]
	     * @return {[type]}         [description]
	     */
	    Connector.prototype.drawText = function (name,content, x, y, color) {
	        var text = new graphic.Text({
	            style: {
	                text: content,
	                x: x,
	                y: y,
	                fill: color ? color : this.options.text.color,
	                textFont: this.options.text.textFont
	            },
	            zlevel: 20
	        });
	        text.name = name;
	        return {
	            text: text,
	            rect: text.getBoundingRect()
	        };
	    };
	
	    /**
	     * 获取线段的中间值
	     * @param {[options {text:xx,textFont:xx}]} [可无 文本] [description]
	     * @return {[type]} [x, y]
	     */
	    Connector.prototype.middle = function(text){
	
	        if(this.options.style.lineType == Connector.TYPE_STRAIGHT){
	            var points  = Util.getMaxLineLength(this.turningPoints);
	            //如果是求线段上的文字的中间值
	            if(text) {
	                //取出字的长度，计算角度，
	                var textWidth = graphic.textContain.getWidth(text.text, text.textFont);
	                var angle = Util.getAngle(points[0],points[1]);
	                var length =  Util.distance(points[0],points[1])/2 - textWidth/2;
	                var newPoint = Util.getEndPoint(points[0], length, angle);
	                return [newPoint.x, newPoint.y];
	            } else {
	                var middleX = (points[0].x + points[1].x)/2;
	                var middleY = (points[0].y + points[1].y) /2;
	                return [middleX, middleY];
	            }
	        }
	        else if(this.options.style.lineType == Connector.TYPE_JAGGED){
	
	            //find total distance
	            var distance = 0;
	            for(var i=0; i<this.turningPoints.length-1; i++){
	                distance += Util.getLength(this.turningPoints[i], this.turningPoints[i+1]);
	            }
	
	            //find between what turning points the half distance is
	            var index = -1;
	            var ellapsedDistance = 0;
	            for(var i=0; i<this.turningPoints.length-1; i++){
	                index = i;
	                var segment = Util.getLength(this.turningPoints[i], this.turningPoints[i+1]);
	                if(ellapsedDistance + segment < distance /2){
	                    ellapsedDistance += segment;
	                }
	                else{
	                    break;
	                }
	            }
	
	            //we have the middle distance somewhere between i(ndex) and i(ndex)+1
	            if(index != -1){
	                var missingDistance = distance / 2 - ellapsedDistance;
	                if( Util.round(this.turningPoints[index].x, 3) == Util.round(this.turningPoints[index + 1].x, 3) ){ //vertical segment (same x)
	                    return [this.turningPoints[index].x, Math.min(this.turningPoints[index].y, this.turningPoints[index + 1].y) + missingDistance];
	                } else if( Util.round(this.turningPoints[index].y, 3) == Util.round(this.turningPoints[index + 1].y, 3) ) { //horizontal segment (same y)
	                    return [Math.min(this.turningPoints[index].x, this.turningPoints[index + 1].x) + missingDistance, this.turningPoints[index].y];
	                } else{
	                    console.error("Connector:middle() - this should never happen " + this.turningPoints[index] + " " + this.turningPoints[index + 1]
	                        + " nr of points " + this.turningPoints.length
	                        );
	                }
	
	            }
	        }
	
	        return null;
	    },
	
	    /**
	     * 转JSON对象
	     * @return {[type]} [description]
	     */
	    Connector.prototype.toJSON = function() {
	
	        this.model.set("resourceId", this.resourceId);
	        this.model.set("properties.type", 14);
	
	        this.model.set("bounds.upperLeft.x", this.position[0]);
	        this.model.set("bounds.upperLeft.y", this.position[1]);
	        this.model.set("bounds.lowerRight.x", this.position[0] + this.getBoundingRect().width);
	        this.model.set("bounds.lowerRight.y", this.position[1] + this.getBoundingRect().height);
	        this.model.set("style.sPos", this.sPos);
	        this.model.set("style.ePos", this.ePos);
	        this.model.set("dockers",this.turningPoints);
	        return this.model.option;
	    };
	
	     /**
	     * refreshModel
	     * @return {[type]} [description]
	     */
	    Connector.prototype.refreshModel = function() {
	        this.model.set("options.dockers",this.turningPoints);
	    };
	
	    Util.inherits(Connector,Node);
	
	    module.exports = Connector;
	
	


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// Symbol factory
	
	
	    var graphic = __webpack_require__(3);
	    var BoundingRect = __webpack_require__(25);
	    /**
	     * Triangle shape
	     * @inner
	     */
	    var Triangle = graphic.extendShape({
	        type: 'triangle',
	        shape: {
	            cx: 0,
	            cy: 0,
	            width: 0,
	            height: 0
	        },
	        buildPath: function (path, shape) {
	            var cx = shape.cx;
	            var cy = shape.cy;
	            var width = shape.width / 2;
	            var height = shape.height / 2;
	            path.moveTo(cx, cy - height);
	            path.lineTo(cx + width, cy + height);
	            path.lineTo(cx - width, cy + height);
	            path.closePath();
	        }
	    });
	    /**
	     * Diamond shape
	     * @inner
	     */
	    var Diamond = graphic.extendShape({
	        type: 'diamond',
	        shape: {
	            cx: 0,
	            cy: 0,
	            width: 0,
	            height: 0
	        },
	        buildPath: function (path, shape) {
	            var cx = shape.cx;
	            var cy = shape.cy;
	            var width = shape.width / 2;
	            var height = shape.height / 2;
	            path.moveTo(cx, cy - height);
	            path.lineTo(cx + width, cy);
	            path.lineTo(cx, cy + height);
	            path.lineTo(cx - width, cy);
	            path.closePath();
	        }
	    });
	
	    /**
	     * Pin shape
	     * @inner
	     */
	    var Pin = graphic.extendShape({
	        type: 'pin',
	        shape: {
	            // x, y on the cusp
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },
	
	        buildPath: function (path, shape) {
	            var x = shape.x;
	            var y = shape.y;
	            var w = shape.width / 5 * 3;
	            // Height must be larger than width
	            var h = Math.max(w, shape.height);
	            var r = w / 2;
	
	            // Dist on y with tangent point and circle center
	            var dy = r * r / (h - r);
	            var cy = y - h + r + dy;
	            var angle = Math.asin(dy / r);
	            // Dist on x with tangent point and circle center
	            var dx = Math.cos(angle) * r;
	
	            var tanX = Math.sin(angle);
	            var tanY = Math.cos(angle);
	
	            path.arc(
	                x, cy, r,
	                Math.PI - angle,
	                Math.PI * 2 + angle
	            );
	
	            var cpLen = r * 0.6;
	            var cpLen2 = r * 0.7;
	            path.bezierCurveTo(
	                x + dx - tanX * cpLen, cy + dy + tanY * cpLen,
	                x, y - cpLen2,
	                x, y
	            );
	            path.bezierCurveTo(
	                x, y - cpLen2,
	                x - dx + tanX * cpLen, cy + dy + tanY * cpLen,
	                x - dx, cy + dy
	            );
	            path.closePath();
	        }
	    });
	
	    /**
	     * Arrow shape
	     * @inner
	     */
	    var Arrow = graphic.extendShape({
	
	        type: 'arrow',
	
	        shape: {
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },
	
	        buildPath: function (ctx, shape) {
	            var height = shape.height;
	            var width = shape.width;
	            var x = shape.x;
	            var y = shape.y;
	            var dx = width / 3 * 2;
	            ctx.moveTo(x, y);
	            ctx.lineTo(x + dx, y + height);
	            ctx.lineTo(x, y + height / 4 * 3);
	            ctx.lineTo(x - dx, y + height);
	            ctx.lineTo(x, y);
	            ctx.closePath();
	        }
	    });
	
	    /**
	     * Map of path contructors
	     * @type {Object.<string, module:zrender/graphic/Path>}
	     */
	    var symbolCtors = {
	        line: graphic.Line,
	
	        rect: graphic.Rect,
	
	        roundRect: graphic.Rect,
	
	        square: graphic.Rect,
	
	        circle: graphic.Circle,
	
	        diamond: Diamond,
	
	        pin: Pin,
	
	        arrow: Arrow,
	
	        triangle: Triangle
	    };
	
	    var symbolShapeMakers = {
	
	        line: function (x, y, w, h, shape) {
	            // FIXME
	            shape.x1 = x;
	            shape.y1 = y + h / 2;
	            shape.x2 = x + w;
	            shape.y2 = y + h / 2;
	        },
	
	        rect: function (x, y, w, h, shape) {
	            shape.x = x;
	            shape.y = y;
	            shape.width = w;
	            shape.height = h;
	        },
	
	        roundRect: function (x, y, w, h, shape) {
	            shape.x = x;
	            shape.y = y;
	            shape.width = w;
	            shape.height = h;
	            shape.r = Math.min(w, h) / 4;
	        },
	
	        square: function (x, y, w, h, shape) {
	            var size = Math.min(w, h);
	            shape.x = x;
	            shape.y = y;
	            shape.width = size;
	            shape.height = size;
	        },
	
	        circle: function (x, y, w, h, shape) {
	            // Put circle in the center of square
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.r = Math.min(w, h) / 2;
	        },
	
	        diamond: function (x, y, w, h, shape) {
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },
	
	        pin: function (x, y, w, h, shape) {
	            shape.x = x + w / 2;
	            shape.y = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },
	
	        arrow: function (x, y, w, h, shape) {
	            shape.x = x + w / 2;
	            shape.y = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },
	
	        triangle: function (x, y, w, h, shape) {
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        }
	    };
	
	    var symbolBuildProxies = {};
	    for (var name in symbolCtors) {
	        symbolBuildProxies[name] = new symbolCtors[name]();
	    }
	
	    var Symbol = graphic.extendShape({
	
	        type: 'symbol',
	
	        shape: {
	            symbolType: '',
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },
	
	        beforeBrush: function () {
	            var style = this.style;
	            var shape = this.shape;
	            // FIXME
	            if (shape.symbolType === 'pin' && style.textPosition === 'inside') {
	                style.textPosition = ['50%', '40%'];
	                style.textAlign = 'center';
	                style.textVerticalAlign = 'middle';
	            }
	        },
	
	        buildPath: function (ctx, shape) {
	            var symbolType = shape.symbolType;
	            var proxySymbol = symbolBuildProxies[symbolType];
	            if (shape.symbolType !== 'none') {
	                if (!proxySymbol) {
	                    // Default rect
	                    symbolType = 'rect';
	                    proxySymbol = symbolBuildProxies[symbolType];
	                }
	                symbolShapeMakers[symbolType](
	                    shape.x, shape.y, shape.width, shape.height, proxySymbol.shape
	                );
	                proxySymbol.buildPath(ctx, proxySymbol.shape);
	            }
	        }
	    });
	
	    // Provide setColor helper method to avoid determine if set the fill or stroke outside
	    var symbolPathSetColor = function (color) {
	        if (this.type !== 'image') {
	            var symbolStyle = this.style;
	            var symbolShape = this.shape;
	            if (symbolShape && symbolShape.symbolType === 'line') {
	                symbolStyle.stroke = color;
	            }
	            else if (this.__isEmptyBrush) {
	                symbolStyle.stroke = color;
	                symbolStyle.fill = '#fff';
	            }
	            else {
	                // FIXME 判断图形默认是填充还是描边，使用 onlyStroke ?
	                symbolStyle.fill && (symbolStyle.fill = color);
	                symbolStyle.stroke && (symbolStyle.stroke = color);
	            }
	            this.dirty();
	        }
	    };
	
	    var symbolUtil = {
	        /**
	         * Create a symbol element with given symbol configuration: shape, x, y, width, height, color
	         * @param {string} symbolType
	         * @param {number} x
	         * @param {number} y
	         * @param {number} w
	         * @param {number} h
	         * @param {string} color
	         */
	        createSymbol: function (symbolType, x, y, w, h, color) {
	            var isEmpty = symbolType.indexOf('empty') === 0;
	            if (isEmpty) {
	                symbolType = symbolType.substr(5, 1).toLowerCase() + symbolType.substr(6);
	            }
	            var symbolPath;
	
	            if (symbolType.indexOf('image://') === 0) {
	                symbolPath = new graphic.Image({
	                    style: {
	                        image: symbolType.slice(8),
	                        x: x,
	                        y: y,
	                        width: w,
	                        height: h
	                    }
	                });
	            }
	            else if (symbolType.indexOf('path://') === 0) {
	                symbolPath = graphic.makePath(symbolType.slice(7), {}, new BoundingRect(x, y, w, h));
	            }
	            else {
	                symbolPath = new Symbol({
	                    shape: {
	                        symbolType: symbolType,
	                        x: x,
	                        y: y,
	                        width: w,
	                        height: h
	                    }
	                });
	            }
	
	            symbolPath.__isEmptyBrush = isEmpty;
	
	            symbolPath.setColor = symbolPathSetColor;
	
	            symbolPath.setColor(color);
	
	            return symbolPath;
	        }
	    };
	
	    module.exports = symbolUtil;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 画句柄
	 * @author wang.xiaohu
	 */
	
	    var graphic = __webpack_require__(3);
	    var Util = __webpack_require__(69);
	    function Handle(type, x, y, connector){
	        this.type = type;
	
	        this.x = x;
	        
	        this.y = y;
	        
	        this.visible = true;
	
	        this.connector = connector;
	
	        this.handleShape = new graphic.Circle({
	            shape: {
	                cx: x,
	                cy: y,
	                r: Handle.RADIUS
	            },
	
	            style: {
	                fill: "rgb(0,255,0)",
	                stroke:"rgb(0,0,0)"
	            },
	            z : 2,  //节点Z为1 线段为0;
	            draggable:true
	        }); 
	
	        var that = this
	        this.handleShape.on("drag", function(e) {
	            that.actionConnector(e.offsetX,e.offsetY);
	        })
	       // return this.circle;
	    }
	
	    Handle.RADIUS = 4;
	
	    Handle.prototype = {
	        
	        constructor : Handle,
	        
	        equals : function(anotherHandle){
	            if(!anotherHandle instanceof Handle){
	                return false;
	            }
	
	            return this.type == anotherHandle.type
	            && this.x == anotherHandle.x
	            && this.y == anotherHandle.y
	            && this.visible == anotherHandle.visible;        
	        },
	
	        /**
	         * 移动句柄
	         * @param  {[type]} newX [description]
	         * @param  {[type]} newY [description]
	         * @return {[type]}      [description]
	         */
	        actionConnector: function(newX, newY){
	            switch(this.type){
	                case 'v':
	                    var index;
	                    // 找出两个转折点（可移动句柄在这两个转折点中间）
	                    for(var i = 1; i < this.connector.turningPoints.length-1; i++){
	                        if(this.connector.turningPoints[i-1].y == this.connector.turningPoints[i].y
	                            && this.connector.turningPoints[i].y == this.y
	                            && Math.min(this.connector.turningPoints[i].x, this.connector.turningPoints[i-1].x) <= this.x
	                            && Math.max(this.connector.turningPoints[i].x, this.connector.turningPoints[i-1].x) >= this.x)
	                        {
	                            index = i;
	                        }
	                    }
	                    var deltaY = newY - this.y;   
	                    var translationMatrix = Util.translationMatrix(0, deltaY);   
	                    
	                    this.connector.turningPoints[index-1].transform(translationMatrix);
	                    this.connector.turningPoints[index].transform(translationMatrix);
	                    this.connector.refresh();
	                    this.y = newY;  //将句柄新的位置赋值给y
	
	                    break;
	
	                case 'h':
	                    var index;
	                    // 找出两个转折点（可移动句柄在这两个转折点中间）
	                    for(var i = 1; i < this.connector.turningPoints.length-1; i++){
	                        if(this.connector.turningPoints[i-1].x == this.connector.turningPoints[i].x
	                            && this.connector.turningPoints[i].x == this.x
	                            && Math.min(this.connector.turningPoints[i].y, this.connector.turningPoints[i-1].y) <= this.y
	                            && Math.max(this.connector.turningPoints[i].y, this.connector.turningPoints[i-1].y) >= this.y)
	                            {
	                            index = i;
	                        }
	                    }
	                    var deltaX = newX-this.x;    
	                    var translationMatrix = Util.translationMatrix(deltaX, 0);    
	                    this.connector.turningPoints[index-1].transform(translationMatrix);
	                    this.connector.turningPoints[index].transform(translationMatrix);
	                    this.connector.refresh();
	                    this.x = newX; //将句柄新的位置赋值给x
	
	                    break;
	            }
	           //. this.shape.updateMiddleText();
	        },    
	    }
	    module.exports = Handle;
	
	
	


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 控制点
	 * @author wang.xiaohu
	 */
	
	    var graphic = __webpack_require__(3);
	    var Util = __webpack_require__(69);
	    function ConnectionPoint(connector, point, type){
	        this.connector = connector;
	
	        this.point = point.clone();
	
	        this.type = type;
	
	        this.color = ConnectionPoint.NORMAL_COLOR;
	
	        this.oType = 'ConnectionPoint'; 
	
	        this.shape = new graphic.Circle({
	            shape: {
	                cx: this.point.x,
	                cy: this.point.y,
	                r: ConnectionPoint.RADIUS
	            },
	
	            style: {
	                fill: this.color,
	                stroke:'#000000'
	            },
	            z : 2  //节点Z为1 线段为0;
	        }); 
	        this.shape.type =  this.type;
	
	        this.shape.connector = connector;
	        //return this.circle;
	    }
	
	    ConnectionPoint.NORMAL_COLOR = "#FFFF33"; //yellow.
	
	    ConnectionPoint.OVER_COLOR = "#FF9900"; //orange
	
	    ConnectionPoint.CONNECTED_COLOR = "#ff0000"; //red
	
	    ConnectionPoint.RADIUS = 4;
	
	    ConnectionPoint.TYPE_FIGURE = 'figure';
	
	    ConnectionPoint.TYPE_CONNECTOR = 'connector';
	
	    ConnectionPoint.prototype = {
	        
	        constructor : ConnectionPoint,
	        
	        equals : function(anotherConnectionPoint){
	            return this.point.equals(anotherConnectionPoint.point)
	            && this.connector == anotherConnectionPoint.connector
	            && this.type == anotherConnectionPoint.type
	            && this.color == anotherConnectionPoint.color
	            && this.radius == anotherConnectionPoint.radius;        
	        },
	
	 
	    }
	    module.exports = ConnectionPoint;
	
	
	


/***/ },
/* 96 */
/***/ function(module, exports) {

	
		var Bpmn = {
			BPMN_TYPE:"stencil.type",
			BPMN_SCRIPT_TASK: "ScriptTask",
			BPMN_EVENT_SUB_PROCESS: "SubProcessTask",
			BPMN_TASK:"Task",
			TEMPLATE: "BPMNDiagram",
			RESOURCE_ID: "resourceId",
			SEQUENCE_FLOW: "SequenceFlow",
			SUB_PROCESS: "SubProcess",
			isTemplate: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype === Bpmn.TEMPLATE;
			},
	
			isActivity: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return (bpmntype.indexOf("Task") != -1);
			},
	
			isSubProcess: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return  bpmntype == Bpmn.SUB_PROCESS
			},
	
			isGateway: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype.indexOf("Gateway") != -1;
			},
	
			isFlow: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype === Bpmn.SEQUENCE_FLOW;
			},
	
			isEvent: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype.indexOf("Event") != -1;
			},
	
			isSlotEvent: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype == "CatchTimerEvent" || bpmntype == "CatchSignalEvent" || bpmntype == "ThrowSignalEvent";
			},
	
			getType: function(model) {
				var bpmntype = model.get(Bpmn.BPMN_TYPE);
				return bpmntype;
			},
	
			getStyle: function(model) {
				return model.option.style
			},
	
			getProp: function(model) {
				return model.option.properties
			},
		}
	
		module.exports = Bpmn;
	


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 选中节点后，出现的操作框及按钮
	 */
	
		var zrUtil = __webpack_require__(4);
		var graphic = __webpack_require__(3);
		var util = __webpack_require__(69);
		var Bpmn = __webpack_require__(96);
		var OperationNode = __webpack_require__(98);
		function BpmnOperationNode(node,zr) {
			OperationNode.call(this);
		};
	
		BpmnOperationNode.prototype.renderOther = function(node,zr,nodeRect) {
			var that = this;
			var nodeRect = nodeRect;
			var startX,startY;
	        var pixel = 20;
	            //矩形最小长和宽
	        var widthMin=100;
	        var heightMin=60;
			if (!nodeRect) {	
	        	//左上角放大箭头
	        	var leftTopArrow= {x:0, y: 0, width: 10, height:10};
				var leftTopArrowPath = 'M0 100 L0 0 L100 0 L100 20 L20 20 L20 100 z';
	        	this.leftTop =graphic.makePath(leftTopArrowPath, {style: {fill: '#000000'}},leftTopArrow);
	        	this.leftTop.attr("cursor","nw-resize");
	
	        	//右下角放大箭头
	        	var rightBottomArrow= {x:0, y: 0, width: 10, height:10};
				var rightBottomArrowPath = 'M0 100 L100 100 L100 0 L80 0 L80 80 L0 80 z';
	        	this.rightBottom =graphic.makePath(rightBottomArrowPath, {style: {fill: '#000000'}},rightBottomArrow);
	        	this.rightBottom.attr("cursor","se-resize");
	
	        	this.add(this.rightBottom);
	        	this.add(this.leftTop);
			} else{
				var leftTopPosition,nowleftTopPosition=[],startSlotPoints,startPosition;
				this.leftTop.on('mousedown',function(e){
			        startSlotPoints = util.getSoltPoints(node);
	        		startPosition = zrUtil.clone(node.position);
					leftTopPosition = nodeRect.points[0];
	        		startX = e.event.clientX;
	        		startY = e.event.clientY;
	        		leftScaleDrag(e);
	        	});
				function leftScaleDrag(e){
					var leftArrow = function(e){leftArrowDrag(e);};
		        	function leftArrowDrag(e){
		        		//2个圆间距太小时,不在拖动
			            if(that.rightBottom.position[0]-that.leftTop.position[0]<(widthMin+10)){
			            	if(that.rightBottom.position[1]-that.leftTop.position[1]<(heightMin+10)){
			            		that.leftTop.position[0] = that.rightBottom.position[0] - (widthMin+10);
			            		that.leftTop.position[1] = that.rightBottom.position[1] - (heightMin+10);
			            	}else{
			            		that.leftTop.position[0] = that.rightBottom.position[0] - (widthMin+10);
			            		scaleRect(that.leftTop,e);
			            	}
			            }else{
			            	if(that.rightBottom.position[1]-that.leftTop.position[1]<(heightMin)){
			            		that.leftTop.position[1] = that.rightBottom.position[1] - (heightMin+10);
			            		scaleRect(that.leftTop,e);
			            	}else{
			            		scaleRect(that.leftTop,e);
			            	}
			            }
			            function scaleRect(dom,e){
			            	var domPosition=[];
			            	for(var n = 0;n <= Math.abs(parseInt((e.event.clientX-startX)/pixel));n++){
				                if(e.event.clientX-startX<=0){
				                    nowleftTopPosition[0] = leftTopPosition[0]-pixel*(n);
				                    domPosition[0] = nowleftTopPosition[0]-10;
				                }else{
				                	if(!nowleftTopPosition[0]){
						            	nowleftTopPosition[0] = leftTopPosition[0];
						            }
				                	if(nodeRect.points[2][0]-nowleftTopPosition[0]>widthMin){
				                		nowleftTopPosition[0] = leftTopPosition[0]+pixel*(n);
				                		domPosition[0] = nowleftTopPosition[0]-10;
				                	}else{
				                		domPosition[0] = that.rightBottom.position[0] - widthMin;
				                	}
				                }
				            }
				            for(var m = 0;m <= Math.abs(parseInt((e.event.clientY-startY)/pixel));m++){
				                if(e.event.clientY-startY<=0){
				                    nowleftTopPosition[1] = leftTopPosition[1]-pixel*(m);
				                    domPosition[1] = nowleftTopPosition[1]-10;
				                }else{
				                	if(!nowleftTopPosition[1]){
						            	nowleftTopPosition[1] = leftTopPosition[1];
						            }
				                	if(nodeRect.points[2][1]-nowleftTopPosition[1]>heightMin){
				                		nowleftTopPosition[1] = leftTopPosition[1]+pixel*(m);
				                		domPosition[1] = nowleftTopPosition[1]-10;
				                	}else{
				                		domPosition[1] = that.rightBottom.position[1] - heightMin;
	
				                	}
				                }
				            }    
				            dom.attr("position",domPosition);
				            var points = [];
				            points[0]=[nowleftTopPosition[0],nowleftTopPosition[1]];
				            points[1]=[nodeRect.points[1][0],nowleftTopPosition[1]];
				            points[2]=nodeRect.points[2];
				            points[3]=[nowleftTopPosition[0],nodeRect.points[3][1],];
				            points[4]=[nowleftTopPosition[0],nowleftTopPosition[1]];
				            var params = {};
				            params.type = "OperationNode:scaleDragLeft";
				            params.points = points;
				            that.trigger(params.type, params); 
			            }
		        	}
		        	zr.on('mousemove',leftArrow);
		        	var leftEnd = function(e){leftDragEnd(e)};
		            function leftDragEnd(e){
		            	zr.off('mousemove',leftArrow);
		            	zr.off("mouseup",leftEnd);
		        		var params = {};
			            params.event = e;
			            params.arrowName = "left";
			            params.type = "OperationNode:scaleDragEnd";
			            params.startSlotPoints = startSlotPoints;
			            params.startPosition = startPosition;
			            that.trigger(params.type, params); 
		            }
		            zr.on("mouseup",leftEnd);
				}
	        	
	        	var rightBottomPosition,nowrightBottomPosition=[];
	        	this.rightBottom.on('mousedown',function(e){
	        		startSlotPoints = util.getSoltPoints(node);
	        		startPosition = zrUtil.clone(node.position);
					rightBottomPosition = nodeRect.points[2];
	        		startX = e.event.clientX;
	        		startY = e.event.clientY;
	        		rightScaleDrag(e);
	        	});
	        	function rightScaleDrag(e){
	        		var rightArrow = function(e){rightArrowDrag(e);};
	        		function rightArrowDrag(e){
		        		//2个圆间距太小时,不在拖动
			            if(that.rightBottom.position[0]-that.leftTop.position[0]<(widthMin+10)){
			            	if(that.rightBottom.position[1]-that.leftTop.position[1]<(heightMin+10)){
			            		that.rightBottom.position[0] = that.leftTop.position[0] + (widthMin+10);
			            		that.rightBottom.position[1] = that.leftTop.position[1] + (heightMin+10);
			            	}else{
			            		that.rightBottom.position[0] = that.leftTop.position[0] + widthMin;
			            		scaleRect(that.rightBottom,e);
			            	}
			            }else{
			            	if(that.rightBottom.position[1]-that.leftTop.position[1]<(heightMin)){
			            		that.rightBottom.position[1] = that.leftTop.position[1] + heightMin;
			            		scaleRect(that.rightBottom,e);
			            	}else{
			            		scaleRect(that.rightBottom,e);
			            	}
			            }
			            function scaleRect(dom,e){
			            	var domPosition=[];
			            	for(var n = 0;n <= Math.abs(parseInt((e.event.clientX-startX)/pixel));n++){
				                if(e.event.clientX-startX>0){
				                    nowrightBottomPosition[0] = rightBottomPosition[0]+pixel*(n);
				                    domPosition[0] = nowrightBottomPosition[0];
				                }else{
				                	if(!nowrightBottomPosition[0]){
						            	nowrightBottomPosition[0] = rightBottomPosition[0];
						            }
				                	if(nowrightBottomPosition[0]-nodeRect.points[0][0]>widthMin){
				                		nowrightBottomPosition[0] = rightBottomPosition[0]-pixel*(n);
				                		domPosition[0] = nowrightBottomPosition[0];
				                	}else{
				                		domPosition[0] = that.leftTop.position[0] + widthMin;
				                	}
				                }
				            }
				            for(var m = 0;m <= Math.abs(parseInt((e.event.clientY-startY)/pixel));m++){
				                if(e.event.clientY-startY>0){
				                    nowrightBottomPosition[1] = rightBottomPosition[1]+pixel*(m);
				                    domPosition[1] = nowrightBottomPosition[1];
				                }else{
				                	if(!nowrightBottomPosition[1]){
						            	nowrightBottomPosition[1] = rightBottomPosition[1];
						            }
				                	if(nowrightBottomPosition[1]-nodeRect.points[0][1]>heightMin){
				                		nowrightBottomPosition[1] = rightBottomPosition[1]-pixel*(m);
				                		domPosition[1] = nowrightBottomPosition[1];
	
				                	}else{
				                		domPosition[1] = that.leftTop.position[1] + heightMin;
				                	}
				                }
				            }   
				            dom.attr("position",domPosition);
	
				            var points = [];
				            points[0]=nodeRect.points[0];
				            points[1]=[nowrightBottomPosition[0],nodeRect.points[1][1]];
				            points[2]=[nowrightBottomPosition[0],nowrightBottomPosition[1]];
				            points[3]=[nodeRect.points[3][0],nowrightBottomPosition[1]];
				            points[4]=nodeRect.points[0];
				            var params = {};
				            params.type = "OperationNode:scaleDragRight";
				            params.points = points;
				            that.trigger(params.type, params); 
			            }
		        	}
		        	zr.on('mousemove',rightArrow);
		        	var rightEnd = function(e){rightDragEnd(e)};
		            function rightDragEnd(e){
		            	zr.off('mousemove',rightArrow);
		            	zr.off("mouseup",rightEnd);
		        		var params = {};
			            params.event = e;
			            params.arrowName = "right";
			            params.type = "OperationNode:scaleDragEnd";
			            params.startSlotPoints = startSlotPoints;
			            params.startPosition = startPosition;
			            that.trigger(params.type, params); 
		            }
		            zr.on("mouseup",rightEnd);
	        	}
		        if (Bpmn.isSubProcess(node.model)) {     //if(node.model.get("stencil.type") == "SubProcess"){
		        	this.leftTop.attr("position", [nodeRect.points[0][0]-10,nodeRect.points[0][1]-10]);
		        	this.rightBottom.attr("position", [nodeRect.points[2][0],nodeRect.points[2][1]]);
		        }else{
		        	this.leftTop.attr("position", [-1000,-1000]);
		        	this.rightBottom.attr("position", [-1000,-1000]);
		        }	        
		        if(node.parent){
		        	if (Bpmn.isSubProcess(node.parent.model)) { //if(node.parent.model.get("stencil.type") == "SubProcess"){
		                this.attr("position", [nodeRect.x+node.parent.position[0],nodeRect.y+node.parent.position[1]])	
		            }
		        }else{
		        	this.attr("position", [nodeRect.x,nodeRect.y])	
		        }
		        		
			};
		};
		BpmnOperationNode.ARROW_DRAGEND = "OperationNode:dragendArrow";
		BpmnOperationNode.ARROW_DRAG = "OperationNode:dragArrow";
		BpmnOperationNode.ARROW_DRAGSTART = "OperationNode:dragstartArrow";
		BpmnOperationNode.DELETE_CLICK = "OperationNode:deleteClick";
	
		zrUtil.inherits(BpmnOperationNode,OperationNode);
	
	
		module.exports = BpmnOperationNode;
	


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 选中节点后，出现的操作框及按钮
	 */
	
		var Node = __webpack_require__(72);
		var zrUtil = __webpack_require__(4);
		var graphic = __webpack_require__(3);
		function OperationNode(node,zr) {
			Node.call(this);
			this.render(node,zr);
		};
	
		OperationNode.ARROW_DRAGEND = "OperationNode:dragendArrow";
		OperationNode.ARROW_DRAG = "OperationNode:dragArrow";
		OperationNode.ARROW_DRAGSTART = "OperationNode:dragstartArrow";
		OperationNode.DELETE_CLICK = "OperationNode:deleteClick";
		
		OperationNode.prototype.render = function(node,zr,nodeRect) {
			this.renderBase(node,zr,nodeRect);
			this.renderOther(node,zr,nodeRect);
		};
	
		OperationNode.prototype.renderBase = function(node,zr,nodeRect) {
			var that = this;
			var nodeRect = nodeRect;
			var startX,startY;
	        var pixel = 20;
	        //矩形最小长和宽
	        var widthMin=100;
	        var heightMin=60;
			if (!nodeRect) {
				this.virtualRect = new graphic.Polyline({ style:{lineDash:[2]}});
				
				//箭头
				var arrowImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFY3HCoAAAAIdFJOUwA9/ueGIbZtux4kfgAAADxJREFUCNdjYEAFIglgKjxJyQHMcFJSEgAzWJSUICoYldQgDGERdYiAIYMrRECAASbAgF+AFSbAEIBmPwClqQTPsA3FRgAAAABJRU5ErkJggg==';
				this.arrow = new graphic.Image({style:{image:arrowImageData,cursor:'default'},draggable: true, z:19});//{zlevel: 19}
				
	
	            var MOUSE_EVENT_NAMES = ['dragstart', 'drag', 'dragend'];//'click', 'dblclick', 'mouseover', 'mouseout'
	            zrUtil.each(MOUSE_EVENT_NAMES, function (eveName) {
	                that.arrow.on(eveName, function (e) {
	                    var params = {};
	                    params.event = e;
	                    params.type = "OperationNode:" + eveName + "Arrow";
	                    that.trigger(params.type, params);                 
	                }); 
	            });			
	
	
				//垃圾桶
				var rect = {x:0, y: 0, width: 10, height:15};
				var iconPath = 'M73.641,45.957l-0.021,0.252c0,0.032,0.021,0.06,0.021,0.088c0,0.065-0.022,0.126-0.026,0.191l-2.685,54.878H70.91c-0.231,4.304-5.166,10.81-31.748,10.81c-26.58,0-31.509-6.506-31.746-10.81H7.41L4.731,46.488c-0.009-0.06-0.028-0.126-0.028-0.191c0-0.032,0.01-0.06,0.01-0.088l-0.01-0.252h0.028c0.099-0.466,0.364-0.919,0.784-1.353c3.439,3.477,17.191,4.051,33.646,4.051s30.221-0.574,33.642-4.051c0.426,0.434,0.711,0.887,0.784,1.353H73.641z M78.335,25.102v6.407c0,1.316-1.34,2.567-3.715,3.696c-6.266,2.936-19.777,4.975-35.459,4.975c-15.666,0-29.189-2.039-35.442-4.975C1.33,34.075,0,32.825,0,31.509v-6.407c0-3.374,8.681-6.286,21.359-7.724V3.929c0-2.16,1.768-3.929,3.93-3.929h26.314c2.164,0,3.938,1.773,3.938,3.938v13.296C68.98,18.606,78.333,21.611,78.335,25.102z M48.416,11.395c0-2.348-0.321-4.27-0.715-4.27c-0.393,0-2.641,0-4.979,0h-8.545c-2.352,0-4.592,0-4.989,0c-0.388,0-0.714,1.922-0.714,4.27v5.367l1.083-0.065c3.067-0.173,6.286-0.27,9.595-0.271c3.202,0,6.292,0.098,9.264,0.252V11.395z';
	        	this.deletePath =graphic.makePath(iconPath, {style: {fill: '#000000'}},rect);
	        	this.deletePath.on("click",function(e){
	        		var params = {};
		            params.event = e;
		            params.type = "OperationNode:deleteClick";
		            that.trigger(params.type, params); 
	        	});
	
	        	this.add(this.deletePath);
				this.add(this.virtualRect);
				this.add(this.arrow);
			} else{
		        this.virtualRect.setShape({points:nodeRect.points});
		        if(node.linkShow == false){
		        	this.arrow.hide();
		        }else{
		        	this.arrow.show();
		        	this.arrow.attr("position", [nodeRect.width/2 + 10,nodeRect.height/2-10]);
		        }
		        
		        if(node.deleteShow == false){
		        	this.deletePath.hide();
		        }else{
		        	this.deletePath.show();
		        	if(node.linkShow == false){
			        	this.deletePath.attr("position", [nodeRect.width/2 + 10,nodeRect.height/2-10]);
			        }else{
			        	this.deletePath.attr("position", [nodeRect.width/2 + 30,nodeRect.height/2-10]);
			        }
		        }
	    		
			};
		};
	
		OperationNode.prototype.renderOther = function(node,zr,nodeRect) {
			if(nodeRect){
				var that = this;
				if(node.parent&&node.parent.isBg&&node.parent.isBg == true){
		        	this.attr("position", [nodeRect.x,nodeRect.y])	
		        }else{
		        	this.attr("position", [nodeRect.x+node.parent.position[0],nodeRect.y+node.parent.position[1]])
		        }
			}
			
		};
	
		zrUtil.inherits(OperationNode,Node);
		module.exports = OperationNode;
	


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * bpmn连线管理类
	 * @author wang.xiaohu
	 */
	
		var zrUtil = __webpack_require__(4);
		var ConnectionManager = __webpack_require__(100);
		var BPMNModel = __webpack_require__(74);
		var Connector = __webpack_require__(92);
	    var Point = __webpack_require__(57);
		var connectionManagerExtend = {
	        /**
	         * 创建连线
	         * @param  {[type]} startNode [开始节点]
	         * @param  {[type]} endNode   [结束节点]
	         * @param  {[type]} type      [类型]
	         * @param {[type]} [api] [description]
	         * @return {[type]}           [返回连线]
	         */
	        connectorCreate:function(startNode,endNode,type, api){
	            var model = new BPMNModel({});
	            model.set("style.lineType", type);
	            model.set("stencil.type", this.stencilType);
	
	            return this.connectorCreateByOptions(startNode,endNode,{model:model, isEdit: true}, api);
	        },
	
	
	        /**
	         * 根据opetions.model 反序列化线
	         * @param  {[type]} startNode [description]
	         * @param  {[type]} endNode   [description]
	         * @param  {[type]} options   [description]
	         * @param  {[type]} api       [description]
	         * @return {[type]}           [description]
	         */
	        connectorCreateByOptions:function(startNode,endNode,options, api){
	            var that = this;
	            var model = options.model;
	            var connector = new Connector(options);
	            connector.startNode = startNode;
	            connector.endNode = endNode;
	
	            this.connectors.push(connector);
	
	            //判断一下sPos,ePos
	            connector.sPos = model.get("style.sPos");
	            connector.ePos = model.get("style.ePos");
	
	            //判断一下 model里有没有dockers，如果有则调用构造point数组  或者调用refreshConnector计算如何画线
	            var dockers = model.get("dockers");
	            if (dockers && dockers.length >= 2) {
	                var points = Point.loadArray(dockers);
	                connector.refresh(points);
	            } else {
	                this.refreshConnector(connector,true);
	            }
	
	            connector.conPointsGroup.on("click", function(e) {
	                var arrSplit = e.target.type.split(Connector.SEPERATOR);
	                var connector = e.target.connector;
	                if (arrSplit[0] === Connector.START_NODE) {
	                    connector.sPos = arrSplit[1];
	                } else if (arrSplit[0] === Connector.END_NODE){
	                    connector.ePos = arrSplit[1];
	                };
	                that.refreshConnector(connector,true);
	
	                var params = {};
	                params.event = e;
	                params.type = "conPointsGroup:click";
	                params.lineNode = that.selConnector;
	                api.trigger(params.type, params);
	            });
	
	
	            var MOUSE_EVENT_NAMES = ['dblclick', 'click'];
	            zrUtil.each(MOUSE_EVENT_NAMES, function (eveName) {
	                connector.on("Connector:" + eveName, function(e) {
	                    var selected = e.target;
	
	                    if ( that.selConnector !== selected) {
	                        that.selConnector &&  that.refreshConnector(that.selConnector);
	                        that.selConnector = selected;
	                    };
	
	                    var params = {};
	                    params.event = e;
	                    params.type = eveName;
	                    params.target = that.selConnector;
	                    api.trigger(params.type, params);
	                });
	            });
	
	            //1.设置起始节点的outgoing数组 为线段的ID
	            var startNodeOutgoing = startNode.model.get("outgoing");
	            startNodeOutgoing.push(connector.resourceId);
	            //2.设置线段的outgoing数组 为结束节点的ID
	            var connectorOutgoing = connector.model.get("outgoing");
	            connectorOutgoing.push(endNode.resourceId);
	
	            return connector;
	        },
	
	        /**
	         * 设置线段的模型数据  (类型 文字)
	         * @param {[type]} connector [description]
	         * @param {[type]} option    [description]
	         */
	        setModel: function(connector, option) {
	            var originLineType =  connector.model.get("style.lineType");
	            var originName = connector.options.text.text;
	            connector.options.text.text =  option.properties.name;
	            connector.model.mergeOption(option);
	            //线段类型不一致时
	            if (originLineType !== option.style.lineType) {
	                this.refreshConnector(connector, true);
	            };
	            //文字不一致时
	            if (originName != option.properties.name) {
	                this.refreshConnector(connector, true);
	            }
	        },
	        /**
	         * 刷新连接线
	         * @param  {[type]} node [description]
	         * @return {[type]}      [description]
	         */
	        refreshLineByNode: function(node) {
	            for(var i = 0, len = this.connectors.length; i < len; i++){
	                if(this.connectors[i].startNode == node || this.connectors[i].endNode == node){
	                    this.refreshConnector(this.connectors[i], true);
	                }
	            }
	        },
		}
	
		var BpmnConnectionManager = zrUtil.extend(ConnectionManager, connectionManagerExtend)
		module.exports = BpmnConnectionManager;
	


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 连线管理类
	 * @author wang.xiaohu
	 */
	
		var Node = __webpack_require__(72);
		var Util = __webpack_require__(69);
		var graphic = __webpack_require__(3);
	    var Point = __webpack_require__(57);
	    var Connector = __webpack_require__(92);
	    var Log = __webpack_require__(101);
	    var zrUtil = __webpack_require__(4);
	    var FIGURE_ESCAPE_DISTANCE = 30;
	    var ConnectionManager = {
	        
	        CLOUD_RADIUS: 12,
	        CLOUD_LINEWIDTH: 3,
	        CLOUD_STROKE_STYLE: "rgba(255, 153, 0, 0.8)", //orange
	        stencilType : "SequenceFlow",
	        connectors: [],
	        selConnector: null,
	        tempConnector: null,
	
	
	
	        /**
	         * 设置线的不可编辑 
	         * @param  {[type]} forbidEdit [description]
	         * @return {[type]}            [description]
	         */
	        connectorForbidEdit:function(forbidEdit){
	            var that = this;
	            for(var i = 0;i < this.connectors.length;i++){
	                this.connectors[i].options.isEdit = !forbidEdit;
	            }
	        },
	
	
	        /**
	         * 清空连接线
	         * @return {[type]} [description]
	         */
	        clearSelectCon: function() {
	            if (ConnectionManager.selConnector != null) {
	                this.refreshConnector(this.selConnector);
	            };
	        },
	        /**
	         * 删除连接线
	         * @return {[type]} [description]
	         */
	        deleteSelectCon:function(node,_zr){
	            var deleteLine= [];
	            for(var i = 0; i < this.connectors.length; i++){
	                if(this.connectors[i].startNode == node || this.connectors[i].endNode == node){
	                    //1.将线 所联的startNode的outgoing数据删除
	                    var startNodeOutgoing = this.connectors[i].startNode.model.get("outgoing");
	                    index = zrUtil.indexOf(startNodeOutgoing, this.connectors[i].resourceId);
	                    if(index != -1) {
	                        startNodeOutgoing.splice(index,1);
	                    }
	                    //2.从_zr上删除
	                    _zr.remove(this.connectors[i]);
	                    deleteLine.push(i);
	                    
	                    this.selConnector = null;
	
	                    //break;
	                }
	            }
	            for(var j = 0;j < deleteLine.length;j++){
	                //3.从线数据中删除
	                    this.connectors.splice(deleteLine[j],1);
	            }
	        },
	        /**
	         * 删除选定的线
	         * @return {[type]} [description]
	         */
	         deleteLine:function(_zr){
	            //1.将线 所联的startNode的outgoing数据删除
	            var startNodeOutgoing = this.selConnector.startNode.model.get("outgoing");
	            index = zrUtil.indexOf(startNodeOutgoing, this.selConnector.resourceId);
	            if(index != -1) {
	                startNodeOutgoing.splice(index,1);
	            }
	
	            //2.从_zr上删除
	            _zr.remove(this.selConnector);
	            
	
	            //3.从线数据中删除
	            var index = zrUtil.indexOf(this.connectors, this.selConnector);
	            if(index != -1) {
	                this.connectors.splice(index,1);
	            }
	            this.selConnector = null;
	         },
	        /**
	         * 重新画线 
	         * @param  {[type]} connector          [description]
	         * @param  {[type]} startPointPosition [left right top bottom]
	         * @param  {[type]} endPointPosition   [left right top bottom]
	         * @return {[type]}                    [description]
	         */
	        refreshConnector: function (connector, force) {
	            // 只有需要强制刷新  或者 连线为空（<2)时 才进行重新计算重绘
	            if( force || (!connector.turningPoints) || (connector.turningPoints.length < 2))
	            {
	                var startNode = connector.startNode;
	                var endNode = connector.endNode;
	
	                var sRect = startNode.getRect? startNode.getRect().boundingRect : Util.getRect(startNode).boundingRect;
	                var sBounds = [sRect.x, sRect.y, sRect.x + sRect.width, sRect.y + sRect.height];
	
	                var eRect = startNode.getRect? endNode.getRect().boundingRect : Util.getRect(endNode).boundingRect;;
	                var eBounds = [eRect.x, eRect.y, eRect.x + eRect.width, eRect.y + eRect.height];
	
	
	                var sConnectorPoint = Util.getConnectorPoints(sRect);
	                var eConnectorPoint = Util.getConnectorPoints(eRect);
	
	                //判断如果没有指定位置的话, 判断开始节点在结束结果左边则采用 right-left 否则采用left-right
	                if (!connector.sPos || !connector.ePos) {
	                    if (sRect.x < eRect.x) {
	                        connector.sPos = "right";
	                        connector.ePos = "left";
	                    } else {
	                        connector.sPos = "left";
	                        connector.ePos = "right";
	                    }
	                }
	
	
	                if (connector.model && connector.model.get("style.lineType")) { connector.options.style.lineType = connector.model.get("style.lineType");}
	                
	                var startPoint =  this.calcPointExpression(connector.sPos, sConnectorPoint);
	                var endPoint =  this.calcPointExpression(connector.ePos, eConnectorPoint);
	                var solutions = this.connector2Points(connector.options.style.lineType, startPoint, endPoint, 
	                                sBounds, eBounds);  // TYPE_STRAIGHT TYPE_JAGGED
	
	
	                connector.refresh(solutions[0][2]);
	            }
	
	            connector.clearHandles();  //清空handle
	        },  
	
	        calcPointExpression: function(pos, point) {
	            var variable = {top:point.top.x,
	                            left: point.left.y,
	                            right:point.right.y,
	                            bottom:point.bottom.x,
	                            center:point.center.x
	                        };
	
	            var expression =  "<% print(" + pos + ") %>";
	            var val = parseInt(Util.template(expression)(variable));                        
	            if (pos.indexOf("top")!= -1) {
	                return new Point(val, point.top.y);
	            } else if (pos.indexOf("left")!= -1) {
	                return new Point(point.left.x, val);
	            } else if (pos.indexOf("right")!= -1) {
	                return new Point(point.right.x, val);
	            } else if (pos.indexOf("bottom")!= -1) {
	                return new Point(val, point.bottom.y);
	            } else if (pos.indexOf("center")!= -1) {
	                return new Point(val, point.bottom.y);
	            }else {
	                throw new Error("pos参数错误");
	            }
	        },        
	
	        /**
	         * 创建或修改临时线
	         * @param  {[type]} startNode             [description]
	         * @param  {[type]} rEndPoint             [description]
	         * @param  {[type]} Connector.TYPE_JAGGED [description]
	         * @return {[type]}                       [description]
	         */
	        manageTempConnector: function(startNode, rEndPoint, lineType) {
	
	            var sRect = startNode.getRect? startNode.getRect().boundingRect : Util.getRect(startNode).boundingRect;
	
	            var sBounds = [sRect.x, sRect.y, sRect.x + sRect.width, sRect.y + sRect.height];
	            var sConnectorPoint = Util.getConnectorPoints(sRect);
	
	            if (!ConnectionManager.tempConnector) {
	                ConnectionManager.tempConnector = new Connector({isEdit: false});
	            };
	
	            var connector =  ConnectionManager.tempConnector;
	            //判断如果没有指定位置的话, 判断开始节点在结束结果左边则采用 right-left 否则采用left-right
	            if (sRect.x < rEndPoint.x) {
	                connector.sPos = "right";
	                connector.ePos = "left";
	            } else {
	                connector.sPos = "left";
	                connector.ePos = "right";
	            }
	
	            connector.options.style.lineType = lineType;
	            var solutions = this.connector2Points(lineType, sConnectorPoint[connector.sPos], rEndPoint, 
	                            sBounds, null);  // TYPE_STRAIGHT TYPE_JAGGED
	
	            connector.refresh(solutions[0][2]);
	            return connector;
	        },
	
	        /**
	         * 删除临时线
	         * @param  {[type]} startNode             [description]
	         * @param  {[type]} rEndPoint             [description]
	         * @param  {[type]} Connector.TYPE_JAGGED [description]
	         * @return {[type]}                       [description]
	         */
	        removeTempConnector: function(zr) {
	            if (ConnectionManager.tempConnector) {
	                zr.remove(ConnectionManager.tempConnector);
	                ConnectionManager.tempConnector = null;
	            };
	        },        
	
	
	        /**
	         * 算出 两个节点 指定两个点如何联线
	         * @param  {[type]} type       [description]
	         * @param  {[type]} startPoint [description]
	         * @param  {[type]} endPoint   [description]
	         * @param  {[type]} sBounds    [description]
	         * @param  {[type]} eBounds    [description]
	         * @return {[type]}            [description]
	         */
	        connector2Points: function(type,  startPoint, endPoint, sBounds, eBounds ){
	
	            Log.group("connectionManager: connector2Points");
	            
	            
	            Log.info("ConnectionManager: connector2Points (" + type + ", " + startPoint + ", " + endPoint + ", " + sBounds + ", " + eBounds + ')');
	            var solutions = [];
	            
	            
	            
	            switch(type){
	                case Connector.TYPE_STRAIGHT:  //直线
	                    var points = [startPoint.clone(), endPoint.clone()];
	                    solutions.push( ['straight', 'straight', points] );
	                    break;
	                    
	                case Connector.TYPE_ORGANIC:  //曲线
	                    
	                case Connector.TYPE_JAGGED:    //折线
	                    var startExitPoint = null;
	                    var endExitPoint = null;
	                    
	                    //find start exit point  寻找开始出口
	                    if(sBounds != null){
	                        var potentialExits = [];
	                        
	                        potentialExits.push(new Point(startPoint.x, sBounds[1] - FIGURE_ESCAPE_DISTANCE)); //north 北
	                        potentialExits.push(new Point(sBounds[2] + FIGURE_ESCAPE_DISTANCE, startPoint.y)); //east  东
	                        potentialExits.push(new Point(startPoint.x, sBounds[3] + FIGURE_ESCAPE_DISTANCE)); //south  南
	                        potentialExits.push(new Point(sBounds[0] - FIGURE_ESCAPE_DISTANCE, startPoint.y)); //west  西
	
	                        //pick closest exit point  寻找与 startPoint 最靠近的出口点
	                        startExitPoint = potentialExits[0];
	                        for(var i=1; i < potentialExits.length; i++){
	                            if(Util.distance(startPoint, potentialExits[i]) < Util.distance(startPoint, startExitPoint)){
	                                startExitPoint = potentialExits[i];
	                            }
	                        }
	                    }
	                    
	                    
	                    //find end exit point  寻找结束出口
	                    if(eBounds != null){
	                        var potentialExits = [];
	                        
	                        potentialExits.push(new Point(endPoint.x, eBounds[1] - FIGURE_ESCAPE_DISTANCE)); //north
	                        potentialExits.push(new Point(eBounds[2] + FIGURE_ESCAPE_DISTANCE, endPoint.y)); //east
	                        potentialExits.push(new Point(endPoint.x, eBounds[3] + FIGURE_ESCAPE_DISTANCE)); //south
	                        potentialExits.push(new Point(eBounds[0] - FIGURE_ESCAPE_DISTANCE, endPoint.y)); //west
	
	                        //pick closest exit point  寻找与 endPoint 最靠近的出口点
	                        endExitPoint = potentialExits[0];
	                        for(var i=1; i < potentialExits.length; i++){
	                            if(Util.distance(endPoint, potentialExits[i]) < Util.distance(endPoint, endExitPoint)){
	                                endExitPoint = potentialExits[i];
	                            }
	                        }
	                    }
	                    
	                    //Basic solution 最基本的解决方案   为其他解决方案做准备
	                    var s = [startPoint];
	                    var gapIndex = 0; //the index of the gap (where do we need to insert new points) DO NOT CHANGE IT
	                    if(startExitPoint){
	                        s.push(startExitPoint);
	                        gapIndex = 1;
	                    }
	                    if(endExitPoint){
	                        s.push(endExitPoint);
	                    }
	                    s.push(endPoint);
	                    
	                    
	                    
	                    //SO - no additional points     S0 解决方案 不添加任何点  基本不会被采用
	                    var s0 = Point.cloneArray(s);
	                    solutions.push(['s0', 's0', s0]);
	                    
	                    
	                    
	                    //S1   S1 解决方案  只有一个折点
	                    var s1 = Point.cloneArray(s);
	                    
	                    //first variant   第一个变体 s1 s1_1方案  折线点在 startExitPoint的X 与 endExitPoint的 Y位置
	                    var s1_1 = Point.cloneArray(s1);
	                    s1_1.splice(gapIndex + 1, 0, new Point(s1_1[gapIndex].x , s1_1[gapIndex+1].y) );
	                    solutions.push(['s1', 's1_1', s1_1]);
	                    
	                    //second variant  第二变体 s1 s1-2方案  折线点在 endExitPoint的X 与  startExitPoint的Y位置
	                    var s1_2 = Point.cloneArray(s1);
	                    s1_2.splice(gapIndex + 1, 0, new Point(s1_2[gapIndex+1].x , s1_2[gapIndex].y) );
	                    solutions.push(['s1', 's1_2', s1_2]);    
	                    
	                    
	                    //S2  S2 解决方案  添加两个折点  
	                                    
	                    //Variant I   s2_1方案 
	                    var s2_1 = Point.cloneArray(s);
	                    var s2_1_1 = new Point( (s2_1[gapIndex].x + s2_1[gapIndex+1].x) / 2,  s2_1[gapIndex].y);
	                    var s2_1_2 = new Point( (s2_1[gapIndex].x + s2_1[gapIndex+1].x) / 2,  s2_1[gapIndex+1].y);                
	                    s2_1.splice(gapIndex + 1, 0, s2_1_1, s2_1_2);
	                    solutions.push(['s2', 's2_1', s2_1]);
	                    
	                    
	                    //Variant II  s2_1方案  1折线点 x: startExitPoint的X 位置 y: startExitPoint的y+endExitPoint的y/2
	                    //1折线点 x:endExitPoint的x  y:startExitPoint的y+endExitPoint的y/2
	                    var s2_2 = Point.cloneArray(s);
	                    var s2_2_1 = new Point( s2_2[gapIndex].x, (s2_2[gapIndex].y + s2_2[gapIndex+1].y)/2 );
	                    var s2_2_2 = new Point( s2_2[gapIndex+1].x, (s2_2[gapIndex].y + s2_2[gapIndex+1].y)/2);
	                    s2_2.splice(gapIndex + 1, 0, s2_2_1, s2_2_2);
	                    solutions.push(['s2', 's2_2', s2_2]);
	                    
	                    
	                    //Variant III
	                    var s2_3 = Point.cloneArray(s);
	                    //find the amount (stored in delta) of pixels we need to move right so no intersection with a figure will be present
	                    //!See:  /documents/specs/connected_figures_deltas.jpg file
	                    
	                    var eastExits = [s2_3[gapIndex].x + 20, s2_3[gapIndex+1].x + 20]; //add points X coordinates to be able to generate Variant III even in the absence of figures :p
	                    
	                    if(sBounds){
	                        eastExits.push(sBounds[2] + 20); 
	                    }
	
	                    if(eBounds){
	                        eastExits.push(eBounds[2] + 20);
	                    }
	                    
	                    var eastExit = Util.max(eastExits);
	                    var s2_3_1 = new Point( eastExit, s2_3[gapIndex].y );
	                    var s2_3_2 = new Point( eastExit, s2_3[gapIndex+1].y );
	                    s2_3.splice(gapIndex + 1, 0, s2_3_1, s2_3_2);
	                    solutions.push(['s2', 's2_3', s2_3]);
	                    
	                    
	                    //Variant IV  s2_4方案  
	                    var s2_4 = Point.cloneArray(s);
	                    //find the amount (stored in delta) of pixels we need to move up so no intersection with a figure will be present
	                    //!See:  /documents/specs/connected_figures_deltas.jpg file
	                    
	                    var northExits = [s2_4[gapIndex].y - 20, s2_4[gapIndex+1].y - 20]; //add points y coordinates to be able to generate Variant III even in the absence of figures :p
	                    
	                    if(sBounds){
	                        northExits.push(sBounds[1] - 20);  
	                    }
	
	                    if(eBounds){
	                        northExits.push(eBounds[1] - 20);
	                    }
	                    
	                    var northExit = Util.min(northExits);
	                    var s2_4_1 = new Point( s2_4[gapIndex].x, northExit);
	                    var s2_4_2 = new Point( s2_4[gapIndex+1].x, northExit);
	                    s2_4.splice(gapIndex + 1, 0, s2_4_1, s2_4_2);
	                    solutions.push(['s2', 's2_4', s2_4]);
	                    
	                    
	                    //Variant V
	                    var s2_5 = Point.cloneArray(s);
	                    //find the amount (stored in delta) of pixels we need to move left so no intersection with a figure will be present
	                    //!See:  /documents/specs/connected_figures_deltas.jpg file
	                    
	                    var westExits = [s2_5[gapIndex].x - 20, s2_5[gapIndex+1].x - 20]; //add points x coordinates to be able to generate Variant III even in the absence of figures :p
	                    
	                    if(sBounds){
	                        westExits.push(sBounds[0] - 20);  
	                    }
	
	                    if(eBounds){
	                        westExits.push(eBounds[0] - 20);
	                    }
	                    
	                    var westExit = Util.min(westExits);
	                    var s2_5_1 = new Point( westExit, s2_5[gapIndex].y);
	                    var s2_5_2 = new Point( westExit, s2_5[gapIndex+1].y);
	                    s2_5.splice(gapIndex + 1, 0, s2_5_1, s2_5_2);
	                    solutions.push(['s2', 's2_5', s2_5]);
	                    
	                    
	                    //Variant VI
	                    var s2_6 = Point.cloneArray(s);
	                    //find the amount (stored in delta) of pixels we need to move down so no intersection with a figure will be present
	                    //!See:  /documents/specs/connected_figures_deltas.jpg file
	                    
	                    var southExits = [s2_6[gapIndex].y + 20, s2_6[gapIndex+1].y + 20]; //add points y coordinates to be able to generate Variant III even in the absence of figures :p
	                    
	                    if(sBounds){
	                        southExits.push(sBounds[3] + 20);  
	                    }
	
	                    if(eBounds){
	                        southExits.push(eBounds[3] + 20);
	                    }
	                    
	                    var southExit = Util.max(southExits);
	                    var s2_6_1 = new Point( s2_6[gapIndex].x, southExit);
	                    var s2_6_2 = new Point( s2_6[gapIndex+1].x, southExit);
	                    s2_6.splice(gapIndex + 1, 0, s2_6_1, s2_6_2);
	                    solutions.push(['s2', 's2_6', s2_6]);
	                    
	                    
	                    
	                    //FILTER solutions
	                    
	                    /*Algorithm
	                     * 0. solutions are ordered from minimmun nr of points to maximum >:)
	                     * 1. remove all solutions that are not orthogonal (mainly s0 solution)
	                     * 2. remove all solutions that go backward (we will not need them ever)
	                     * 3. remove all solutions with intersections
	                     * 4. pick first class of solutions with same nr of points (ex: 2)
	                     * 5. pick the first solution with 90 degree angles (less turnarounds)
	                     * (not interesteted) sort by length :p
	                     */
	                    
	                    //1. filter non ortogonal solutions 删除不是正交直线的方案
	                    if(true){
	                        Log.info("Filter orthogonal solutions. Initial number of solutions = " + solutions.length);
	                        var orthogonalSolution = [];
	                        for(var l=0; l<solutions.length; l++){
	                            var solution = solutions[l][2];
	                            if(Util.orthogonalPath(solution)){
	                                orthogonalSolution.push(solutions[l]);
	                            }
	                        }
	                        solutions = orthogonalSolution;
	                        Log.info("\n\tOrthogonalSolutions = " + solutions.length);
	                    }
	                    
	                    //2. filter backward solutions  过滤 倒退的方案
	                    if(true){ 
	                        //do not allow start and end points to coincide - ignore them
	                        if(startPoint.equals(endPoint)){
	                            Log.info("Start and end point coincide...skip backward solution. I think we will just fall on s0 :)");
	                        }
	                        else{
	                            Log.info("Filter backward solutions. Initial number of solutions = " + solutions.length);
	                            var forwardSolutions = [];
	                            var temp = '';
	                            for(var l=0; l<solutions.length; l++){
	                                var solution = solutions[l][2];
	                                if(Util.forwardPath(solution)){
	                                    forwardSolutions.push(solutions[l]);                                
	                                }
	                                else{
	                                    temp = temp +  "\n\t" + solution;
	                                }
	                            }
	                            solutions = forwardSolutions;                    
	                            Log.info("\n\t ForwardSolutions = " + solutions.length);
	                            if(solutions.length == 0){
	                                Log.info("Discarded solutions: " + temp);
	                            }
	                        }
	                    }
	                    
	                    
	                    //3. Filter non intersecting solutions  去除没有交集()的方案
	                    if(true){
	                        Log.info("Filter non intersecting solutions. Initial number of solutions = " + solutions.length);
	                        var nonIntersectionSolutions = []
	                        for(var l=0; l<solutions.length; l++){
	                            var solution = solutions[l][2];
	                            //Log.info("Solution id= " + solutions[l][1] + ' nr points = ' + solution.length + ", points = " + solution);
	                            var intersect = false;
	
	                            var innerLines = solution.slice(); //just a shallow copy
	
	                            /*If any bounds just trim the solution. So we avoid the strange case when a connection
	                             *startes from a point on a figure and ends inside of the same figure, but not on a connection point*/
	                            if(eBounds || sBounds){
	                                //i0nnerLines = innerLines.slice(0, innerLines.length - 1);
	                                innerLines = innerLines.slice(1, innerLines.length - 1);
	                                //Log.info("\t eBounds present,innerLines nr. points = " + innerLines.length + ", points = " + innerLines);                        
	                            }
	
	
	
	                            //now test for intersection
	                            if(sBounds){
	                                intersect = intersect || Util.polylineIntersectsRectangle(innerLines, sBounds);
	                            }
	                            if(eBounds){
	                                intersect = intersect || Util.polylineIntersectsRectangle(innerLines, eBounds);
	                            }
	
	                            if(!intersect){
	                                nonIntersectionSolutions.push(solutions[l]);                    
	                            }
	                        }                
	                        
	                        //If all solutions intersect than this is destiny  :) and just ignore the intersection filter
	                        if(nonIntersectionSolutions.length != 0){
	                            //reasign to solutions
	                            solutions = nonIntersectionSolutions;   
	                        }
	                        
	                        Log.info("\n\t nonIntersectionSolutions = " + solutions.length);
	                    }
	                    
	                    
	                    //4. get first class of solutions with same nr of points 选择与第一个方案点数一样多的方案（因为第一个方案点数最少）
	                    if(true){
	                        Log.info("Get first class of solutions with same nr of points");
	                        if(solutions.length == 0){
	                            Log.info("This is not possible");
	                        }
	                        
	                        var firstSolution = solutions[0][2]; //pick first solution
	                        var nrOfPoints = firstSolution.length;
	                        var sameNrPointsSolution = [];
	                        
	                        for(var l=0; l<solutions.length; l++){
	                            var solution = solutions[l][2];
	                            if(solution.length == nrOfPoints){
	                                sameNrPointsSolution.push(solutions[l]);
	                            }
	                        }
	                        
	                        solutions = sameNrPointsSolution;
	                    }
	                    
	                    
	                    
	                    
	                    /*5.  计算路径分数 ，取最分数高的
	                    Pick the first solution with 90 degree angles (less turnarounds)
	                    *in case we have more than one solution in our class
	                    */
	                    if(true){
	                        Log.info("pick the first solution with 90 degree angles (less turnarounds)");
	                        var solIndex = 0;
	                        for(var l=0; l<solutions.length; l++){
	                            var solution = solutions[l][2];
	                            if(Util.scorePath( solutions[solIndex][2] ) < Util.scorePath( solutions[l][2] ) ){
	                                solIndex = l;
	                            }
	                        }
	                        solutions = [solutions[solIndex]];
	                    }
	                    
	                    
	                    break;
	            }
	            
	            //SMOOTHING curve        
	            // if(type === Connector.TYPE_ORGANIC){
	            //     this.smoothOrganic(solutions);
	            // }
	            //END SMOOTHING curve
	            
	            Log.groupEnd();
	            
	            return solutions;
	        }            
	    }
	
		module.exports = ConnectionManager;
	


/***/ },
/* 101 */
/***/ function(module, exports) {

	/**
	 * 日志类
	 * @author wang.xiaohu
	 */
	
	
	    var Log  = {
	        LOG_LEVEL_NONE  : 0,
	
	        LOG_LEVEL_DEBUG : 1,
	
	        LOG_LEVEL_INFO : 2,
	
	        LOG_LEVEL_ERROR : 3,
	
	        level : this.LOG_LEVEL_ERROR,
	        
	        /**
	        * The less important of all messages
	        * @param {String} message - the message to be logged
	        **/
	        debug: function (message){
	            if(typeof console !== 'undefined'){
	                if(this.level <= this.LOG_LEVEL_DEBUG){
	                    
	                    //in FF is debug
	                    if(typeof console.debug == 'function'){
	                        console.debug(message);
	                    }
	                    else{//TODO: in IE is log
	    //                    console.info(message);
	                    }
	                }
	            }
	        },
	
	
	        /**
	        * The commonly used log message
	        * @param {String} message - the message to be logged
	        **/
	        info : function (message){
	            if(typeof console !== 'undefined'){
	                if(this.level <= this.LOG_LEVEL_INFO){
	                    console.info(message);
	                }
	            }
	        },
	
	        /**
	        * The worse kind of message. Usually a crash
	        * @param {String} message - the message to be logged
	        **/
	        error : function (message){
	            if(typeof console !== 'undefined'){
	                if(this.level <= this.LOG_LEVEL_ERROR){
	                    console.error(message);
	                }
	            }
	        },
	
	        /**
	         *Start grouping the log messages
	         *@param {String} title - the title of the group
	         *@see <a href="http://getfirebug.com/logging">http://getfirebug.com/logging</a>
	         **/
	        group : function(title){
	            if(this.level <= this.LOG_LEVEL_INFO){ //ignore group if level not debug or info
	                if(typeof console !== 'undefined'){           
	                    /**If we do not test for group() function you will get an error in Opera
	                     *as Opera has it's own console...which does not have a group() function*/
	                    if(typeof console.group === 'function'){
	                        console.group(title);
	                    }
	                }
	            }
	        },
	
	        /**Ends current message grouping*/
	        groupEnd : function(){
	            if(this.level <= this.LOG_LEVEL_INFO){ //ignore group if level not debug or info
	                if(typeof console !== 'undefined'){
	                    /**If we do not test for groupEnd() function you will get an error in Opera
	                     *as Opera has it's own console...which does not have a group() function*/
	                    if(typeof console.groupEnd === 'function'){
	                        console.groupEnd();
	                    }
	                }
	            }
	        }
	
	    }
	
	    //Log.level = Log.LOG_LEVEL_DEBUG; 
	    Log.level = Log.LOG_LEVEL_ERROR; 
	    //Log.level = Log.LOG_LEVEL_ERROR;
	    //Log.level = Log.LOG_LEVEL_NONE;
	    module.exports = Log;
	    


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 连线操作类
	 * @author miao.cunzhi
	 */
	
		var Node = __webpack_require__(72);
		var Util = __webpack_require__(69);
		var graphic = __webpack_require__(3);
	    var Point = __webpack_require__(57);
	    var zrUtil = __webpack_require__(4);
	    var ConnectionManager = __webpack_require__(100);
	    var LineOperationManager = {
	        LineOperations:[],  
	        isEdit:true,    
	        creatOperation:function(key,obj){   
	            var lineOperation = new graphic.Image({
	                style: {
	                    image:obj.icon,
	                    width: obj.width||15,
	                    height: obj.height||15,
	                }
	            });
	            lineOperation.key = key;
	            lineOperation.operation = true;
	            lineOperation.hide();
	            obj.lineNode.icons.push(lineOperation);
	            LineOperationManager.LineOperations.push(lineOperation);
	            lineOperation.on("click",function(){
	                obj.callback(obj.lineNode);
	            });
	            return lineOperation;
	        },   
	
	        /**
	         * 计算小图标的位置，并显示
	         * @param  {[type]} connector [description]
	         * @return {[type]}           [description]
	         */
	        bindOperation:function(connector){
	            if(LineOperationManager.isEdit == false){return;}
	            var pointPosition = connector.middle();
	            var length = [];
	            for(var j = 0;j < connector.icons.length;j++){
	                length.push(connector.icons[j].style.width);
	            }
	            for(var i = 0; i < connector.icons.length;i++){
	                var connectorPosition = 10;
	                for(var k = 0;k < i;k++){
	                    connectorPosition += length[k]+10;
	                }
	                connector.icons[i].attr("position",[pointPosition[0]+connectorPosition,pointPosition[1]+5]);
	                connector.icons[i].show();
	                
	            }
	        },
	
	        hideAllLineOperation: function() {
	            for (var li = 0; li < LineOperationManager.LineOperations.length; li++) {
	                var icon =  LineOperationManager.LineOperations[li];
	                icon.hide();
	            }    
	        },
	
	        addIcon: function(key, obj, zr) {
	            //判断是小图标否存在 ，存在则直接返回
	            if(obj.lineNode.icons){
	                for (var i = 0; i < obj.lineNode.icons.length; i++) {
	                    if (obj.lineNode.icons[i].key == key) {
	                        LineOperationManager.bindOperation(obj.lineNode);
	                        return;
	                    }
	                }
	            }
	            
	            var lineOperation = LineOperationManager.creatOperation(key, obj);
	            zr.add(lineOperation);
	            LineOperationManager.bindOperation(obj.lineNode);            
	        },   
	
	        deleteIconObj: function(parentZr,lineNode) {
	            return {
	                icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOBAMAAADpk+DfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGgKD4AAAAPdFJOUwDH/g+agESj4Y6zUiRnh7lnwbkAAABLSURBVAjXY2BgYDZgAIEnnkCa7a5cYGwCwwklIOhhMBEEgmIGnlAgOMDAprhQUGgDA5vWdJciXJRGR0dTAgPzQ0FBSaBpzMbGBgwAIoUW3sQ2EdkAAAAASUVORK5CYII=",
	                width: 12,
	                height: 14,
	                lineNode:lineNode,
	                callback:function(e) {
	                    for(var i = 0; i<lineNode.icons.length;i++){
	                        parentZr.remove(lineNode.icons[i])
	                    }          
	                    ConnectionManager.deleteLine(parentZr);
	                    LineOperationManager.hideAllLineOperation();
	                    e.cancelBubble = true;            
	                }
	            }
	        }
	
	    }
	
		module.exports = LineOperationManager;
	


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 辅助线操作类
	 * @author miao.cunzhi
	 */
	
		var Node = __webpack_require__(72);
		var Util = __webpack_require__(69);
		var graphic = __webpack_require__(3);
	    var Point = __webpack_require__(57);
	    var zrUtil = __webpack_require__(4);
	
	    var Guidelines = {   
	        virtualXLine:null,
	        virtualYLine:null,
	        createGuidelines:function(zr){
	            //创建x轴虚线
	            this.virtualXLine = new graphic.Line({
	                style: {
	                    lineDash: [5]
	                },
	                z: 3,
	            });
	            //创建Y轴虚线
	            this.virtualYLine = new graphic.Line({
	                style: {
	                    lineDash: [5],
	                },
	                z: 3,
	            });
	            zr.add(this.virtualXLine);
	            zr.add(this.virtualYLine);
	        },
	        judgeAlignment:function(nowRectPosition,domArray,maxWidth,maxHeight){
	            var that = this;
	            //循环判断水平对齐 
	            for (var j = 0, len = domArray.length; j < len; j++) {
	                if (nowRectPosition[1] == domArray[j].position[1]) {
	                    that.virtualXLine.attr('position', [0, nowRectPosition[1]]);
	                    that.virtualXLine.attr("shape", {
	                        x2: maxWidth
	                    });
	
	                    break;
	                } else {
	                    that.virtualXLine.attr("shape", {
	                        x2: 0
	                    });
	                }
	            }
	            //循环判断垂直对齐
	            for (var m = 0, len = domArray.length; m < len; m++) {
	                if (nowRectPosition[0] == domArray[m].position[0]) {
	                    that.virtualYLine.attr('position', [nowRectPosition[0], 0]);
	                    that.virtualYLine.attr("shape", {
	                        y2: maxHeight
	                    });
	                    break;
	                } else {
	                    that.virtualYLine.attr("shape", {
	                        y2: 0
	                    });
	                }
	            }
	        },      
	    }
	
		module.exports = Guidelines;
	


/***/ }
/******/ ])
});
;