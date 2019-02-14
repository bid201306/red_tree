define([
	'text!/redpro/js/fish/views/templates/activityReturnParamView.html',
	'css!/redpro/js/fish/views/style/activityReturnParamView.css',
	'/redpro/js/fish/views/js/initParam.js',
	'/redpro/fish/cloud-utils.js'
	], function(indexViewTpl, i18n,utils) {

	var currentObj;
	var popup;
	var needAtomicServiceInfo = "请选择原子对象";
	var outParamEmptyInfo = "原子服务对象出参为空";
	//原子编码
	var atomicServiceId = "";
	//原子服务名
	var serviceName = "";
	//fisrtId
	var activityId = "1";

	var hasOutParams = false;
	//原子服务activityCode
	atomicValue = "A";

	//出参参数
	var beforeAtomicServices = [];
	
	//当前出参窗体传递对象
	var valueObject;
	
	
	var atomicMap = {};
	

	return fish.View.extend({
		template: fish.compile(indexViewTpl),
		i18nData: fish.extend({}, i18n),
		events:{
			"click #activityReturnParamBtn":"saveActivityReturnParam"
		},

		//这里用来进行dom操作
		_render: function() {
			this.$el.css({"height":"100%"});
			this.$el.html(this.template(this.i18nData));
			return this;
		},

		//这里用来初始化页面上要用到的fish组件
		_afterRender: function() {
			console.log(this.$el);
			currentObj = this;
			this.atomicServiceObjCatalogTree = this.$('#atomic_service_obj_catalog');
			this.atomicServiceObjListGrid = this.$('#atomic_service_obj_list_grid');
			this.activityRetrunParam = this.$('#activity_return_param_grid');
			this.outParamTree = $('#returnReasonCodeTree');		
			this.outParamTreeWin = $('#returnReasonCodeWin');
			currentObj.initCatalogTree();
			currentObj.initListGrid();
			currentObj.loadCatalogTree();
			currentObj.initPopedit();
		},

		resize:function(){
			this.atomicServiceObjListGrid.grid("resize",true);
			this.atomicServiceObjCatalogTree.grid("resize",true);
			
		},

		initCatalogTree : function(){
			this.orgTree=this.$("#atomic_service_obj_catalog").jqGrid({
				height:$(window).height()*0.698,
				colModel: [{
					name: 'id',
					key: true,
					hidden: true
				}, {
					name: 'name',
					label: '名称',
					sortable: false,
					search: true,
					width: "65%",
				}, {
					name: "code",
					label: '编码',
					sortable: false,
					search: true,
					width: "35%",
				}],
				treeGrid: true,
				autowidth:true,
				width:"100%",
				fixWidth:true,
				treeIcons: {
					plus: 'glyphicon glyphicon-folder-close',
					minus: 'glyphicon glyphicon-folder-open',
					leaf: 'glyphicon glyphicon-file'
				},
				expandColumn: "name",
				onRowExpand:$.proxy(this.expandOrgRow,this),
				treeReader:{parentid :"parentId"},
				pagebar: false,
				onSelectRow:$.proxy(this.treeSelected,this)

			});
			this.$("#com-staffmgr-org-grid-search").searchbar({
				target: this.orgTree
			});
		},

		expandOrgRow:function(e, rowData){
			var me =this;
			var children = me.orgTree.grid("getNodeChildren", rowData);
			if(children.length==0) {
				rowData.isLeaf = true;
				me.orgTree.grid("modTreeNode", rowData);
			}
		},

		initListGrid : function (){
			this.serObjgrid=this.$("#atomic_service_obj_list_grid").grid({
				height:$(window).height()*0.325,
				colModel: [{
					name: 'serviceId',
					label: "ID",
					width: "5%",
					key: true
				},
				{
					name: 'serviceName',
					label: "原子服务",
					width: "10%",
					search: true
				}, {
					name: "serviceCode",
					label: "原子服务编码",
					width: "10%",
					search: true
				}],
				rowNum:5,
				rowList : [5,10,20],
				pager: true,
				server: true,
				multiselect:false,
				onSelectRow:function(e,rowid){
					//重设form
					$('#activityReturnParam')[0].reset();
					atomicServiceId = "";
					//选中原子服务
					var selItem =  this.serObjgrid.grid("getSelection");
					atomicServiceId = selItem["serviceCode"];
					serviceName = selItem["serviceName"];
					atomicMap["label"] = serviceName;
					atomicMap["value"] = atomicValue;
					atomicMap["exTacheId"] = activityId;
					atomicMap["exAtomicServiceCode"] = atomicServiceId;
					beforeAtomicServices[0] = atomicMap;
					currentObj.initOutParamTree();
					currentObj.qryActivityReturnParam(atomicServiceId);
				}.bind(this)
			});
		},

		loadCatalogTree : function(){
			currentObj.orgTree.blockUI({message: '加载中'}).data('blockui-content', true);
			$.post('/redpro/iom-orchestration-service/atomObjController/getAtomSevCata.do').done(function (datas) {
				var orgs = $.parseJSON(datas).serviceCatalogList;
				if(orgs.length>0){
					orgs[0].name="原子服务目录";
					orgs[0].hasParent=false;
					orgs[0].isLeaf = false;
				}

				$.each(orgs,function(i,org){

					if(org.children.length>1){
						org.hasParent=false;
						org.isLeaf = false;
					}else{
						org.isLeaf = true;
						org.hasParent= true;
					}

				});

				currentObj.orgTree.jqGrid("reloadData", orgs);

			}).always(function(){
				currentObj.orgTree.unblockUI().data('blockui-content', false);
				var data = currentObj.orgTree.grid("getRowData");
				if(data&&data.length>0){
					currentObj.orgTree.grid("setSelection", data[0]);
				}
				/* var node=currentObj.$tree.tree("getNodes");
                if(node.length>0){
                	currentObj.$tree.tree("selectNode",node[0]);//默认选中第一个节点
                	currentObj.treeClick(node[0]);
                	currentObj.$("#design-addAtomBtn").removeAttr("disabled","");
              }*/
			}).error(function(xhr,errorText,errorType){
				//fish.error({title:'异常',message:xhr.responseText});
			});
		},

		treeSelected:function(e, rowData){

			var type="";
			var seltem = currentObj.orgTree.grid("getSelection");

			if(seltem.type!='原子服务目录'){
				var children = currentObj.orgTree.grid("getNodeChildren", seltem);
				if(children.length >0 ){
					type="root"
				}

				currentObj.atomicServiceObjListGrid.blockUI({message: '加载中'}).data('blockui-content', true);
				$.post('/redpro/iom-orchestration-service/atomObjController/getAtomSev.do',{isRoot:type,atomSevCataCode:seltem.code},function(result) {
					currentObj.atomicServiceObjListGrid.grid("reloadData",$.parseJSON(result).serviceConfigList);

					currentObj.atomicServiceObjListGrid.unblockUI().data('blockui-content', false);
				}).fail(function (obj, type, msg) {
					fish.error({title:'异常',message:obj.responseJSON.message});
				});
			}else{
				currentObj.atomicServiceObjListGrid.grid("clearGridData");
			}


		},
		initOutParamTree : function(){
			currentObj.outParamTree.tree('destroy');
			
			var options = {
					view: {showLine: true},
					data:{
						key: {name: "text", title: "", icon:""}
					},
					callback: {
						onClick:function(e,treeData){
							//currentObj.outParamTreeClick(treeData);	
						}.bind(this),
						onDblClick :function(e,treeData ){
							currentObj.outParamTreeClick(treeData);	
						}.bind(this)
					}
			};
			currentObj.outParamTree.tree(options);
			currentObj.loadOutParamTree();
			
		},
		loadOutParamTree : function(){
			currentObj.outParamTree.blockUI({message: '加载中'}).data('blockui-content', true);
			var params = {
					beforeAtomicServices: JSON.stringify(beforeAtomicServices)
			};
			$.post("/redpro/iom-orchestration-service/flowDubboService/qryBeforeAtomicServiceOutParamsTree", params).done(function (datas) {
				if(datas == ''){
					fish.info(outParamEmptyInfo);
					return;
				}
				datas = datas.replace(/\"iconCls\":\"[^\"]*\",\"type\"/g,"\"iconSkin\":\"cs-tree\",\"type\"");			
				var datas = $.parseJSON(datas);
				if(datas[0] == undefined){
					return;
				}
				var hasOutParams = datas[0].children.length > 0;
				if(hasOutParams){
					 datas[0]['open'] = true;
					 console.log(currentObj.outParamTree);
					currentObj.outParamTree.tree("reloadData", datas);
					$("#returnReasonCode").popedit('enable');
					$("#returnReasonDesc").popedit('enable');
					$("#workOrderId").popedit('enable');
					$("#responseCode").popedit('enable');
				}else{
					fish.info(outParamEmptyInfo);
					$("#returnReasonCode").popedit('disable');
					$("#returnReasonDesc").popedit('disable');
					$("#workOrderId").popedit('disable');
					$("#responseCode").popedit('disable');
				}	
				

			}).always(function(){
				currentObj.outParamTree.unblockUI().data('blockui-content', false);
			}).error(function(xhr,errorText,errorType){
				fish.error({title:'异常',message:xhr.responseText});
			});
		},
		outParamTreeClick : function(node){
			//这里设值 树双击事件  dbclick
			var isRoot = node.isParent;			
			if(!isRoot){
				var textPath = currentObj.getTreeTextPath(node);
				var prefix = "${response.";
				var sufffix = "!}";
				valueObject.popedit('setValue', prefix + textPath + sufffix);
				currentObj.outParamTreeWin.hide();
			}
		},
		//获取树的text连接
		getTreeTextPath : function(node){
			var textPath = '';
			var isRoot = node.isParent;
			while(node.level != 0){
				var text = node.text;
				textPath = text + "." + textPath;
				var parentId = node.parentTId;
				var parentNode = currentObj.outParamTree.tree('getNodeByTId',node.parentTId);
				node = parentNode;				
			}
			//保存完整类型
			valueObject.attr('ori',textPath);
			textPath = textPath.substr(0,textPath.indexOf(":"));
			return textPath;
		},
		initPopedit : function(){			
			$("#returnReasonCode").popedit({
				dialogOption:{
				},
				showClearIcon:false,
				open:function(e){
					var options = {
							modal: false,
							draggable: false,
							content: $("#returnReasonCodeWin"),
							autoResizable: true
					};
					popup = fish.popup(options);
					valueObject = $("#returnReasonCode");
				}
			});

			$('#returnReasonDesc').popedit({
				dialogOption:{
				},
				showClearIcon:false,
				open:function(e){
					var options = {
							modal: false,
							draggable: false,
							content: $("#returnReasonCodeWin"),
							autoResizable: true
					};
					popup = fish.popup(options);
					valueObject = $("#returnReasonDesc");

				}
			});

			$('#workOrderId').popedit({
				dialogOption:{
				},			
				showClearIcon:false,
				open:function(e){
					var options = {
							modal: false,
							draggable: false,
							content: $("#returnReasonCodeWin"),
							autoResizable: true
					};
					popup = fish.popup(options);
					valueObject = $("#workOrderId");

				}
			});
			$('#responseCode').popedit({
				dialogOption:{
				},			
				showClearIcon:false,
				open:function(e){
					var options = {
							modal: false,
							draggable: false,
							content: $("#responseCodeWin"),
							autoResizable: true
					};
					popup = fish.popup(options);
					var outParampopup = fish.popup(options);
		            $("#cancelBtn").click(function() {
		            	$("#responseCodeWin").hide();
		            });
		            $('#selectOutParam').popedit({
						dialogOption:{
						},			
						open:function(e){
							var options = {
									modal: false,
									draggable: false,
									content: $("#returnReasonCodeWin"),
									autoResizable: true
							};
							popup = fish.popup(options);
							valueObject = $("#selectOutParam");
							$('#returnReasonCodeWin .close').click(function(){
								$('#returnReasonCodeWin').hide();
							})
						}
					});
				}
			});
			
		},
		//保存配置
		saveActivityReturnParam : function(){
			//获取atomicServiceId
			atomicServiceId = $('#atomic_service_obj_list_grid').grid("getSelection")["serviceCode"];;
			if(atomicServiceId == undefined || atomicServiceId == ''){
				fish.info(needAtomicServiceInfo);
				return;
			}
			if(!$("#activityReturnParam").isValid()){
				return;
			}
			//退单编码
			var returnReasonCode = $('#returnReasonCode').val();
			//退单描述
			var returnReasonDesc = $('#returnReasonDesc').val();
			//工单ID
			var workOrderId = $('#workOrderId').val();	
			//处理结果
			var responseCode = $('#responseCode').val()

			//创建ANALYSIS_TEMPLATE模版
			var analysisTemplate = {};
			if(returnReasonCode != ''){
				analysisTemplate["returnReasonCode"] = returnReasonCode;
			}
			if(returnReasonDesc != ''){
				analysisTemplate["returnReasonDesc"] = returnReasonDesc;
			}
			if(workOrderId != ''){
				analysisTemplate["workOrderId"] = workOrderId;
			}
			if(responseCode != ''){
				analysisTemplate["responseCode"] = responseCode;
			}
			analysisTemplate = JSON.stringify(analysisTemplate);
			var params = {atomicServiceId:atomicServiceId, analysisTemplate:analysisTemplate};
			$.post('/redpro/iom-orchestration-service/flowDubboService/setCurrentAtomicServOutParams',params).done(function(ret){
				fish.info("回单参数保存成功");
			}).error(function(xhr,errorText,errorType){
				fish.error({title:'异常',message:xhr.responseText});
			});
		},
		//选中原子对象时 form设值
		qryActivityReturnParam : function(atomicServiceId){
			var params = {atomicServiceId:atomicServiceId};
			$.post('/redpro/iom-orchestration-service/flowDubboService/qryCurrentAtomicServOutParams',params).done(function(ret){
				if(ret != ''){
					ret = eval('(' + ret + ')');
					var mode = ret.mode;
					var analysisTemplate = ret.analysisTemplate;
					if(analysisTemplate){
						analysisTemplate = eval('(' + analysisTemplate + ')');
						var returnReasonCode = analysisTemplate.returnReasonCode;
						var returnReasonDesc = analysisTemplate.returnReasonDesc;
						var workOrderId = analysisTemplate.workOrderId;
						var responseCode = analysisTemplate.responseCode;
						$('#returnReasonCode').val(returnReasonCode);
						$('#returnReasonDesc').val(returnReasonDesc);
						$('#workOrderId').val(workOrderId);
						$('#responseCode').val(responseCode);
					}

				}
			}).error(function(xhr,errorText,errorType){
				fish.error({title:'异常',message:xhr.responseText});
			});
		}


	});
});