define([
	'text!/redpro/js/fish/relative/templates/moreView2.html',
	'/redpro/js/test/data.js'
	], function(indexViewTpl, css) {

	var atomicMap = {};

	return fish.View.extend({
		template: fish.compile(indexViewTpl),
		events:{
			"click #activityReturnParamBtn":"saveActivityReturnParam"
		},

		//渲染前的事件
		initialize:function(){
			console.log("initialize")
			self = this;
		},
		//这里用来进行dom操作
		_render: function() {
			console.log("render")
			this.$el.css({"height":"100%"});
			this.$el.html(this.template(this.i18nData));
			return this;
		},

		//这里用来初始化页面上要用到的fish组件
		_afterRender: function() {
			var options = {
				    fNodes: fNodes,
				    view: {
				        formatter: function (node) {
				            var len = node.name.split(''),
				                str = node.name;
				            if (len.length > 15) {
				                str =  node.name.slice(0, 14) + '...';
				            }
				            return str;
				        }
				    },
				    callback: {
				        beforeClick: function (e, treeNode, clickFlag) {
				            console.log("[beforeClick ] " + treeNode.name);
				        },
				        onClick: function (e, treeNode, clickFlag) {
				            console.log(treeNode);
				            console.log("[onClick ] clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
				        },
				        onNodeCreated: function (e, treeNode) {
				            var id = this.id;
				            console.log("[onNodeCreated] " + id + " " + treeNode.name);
				        },
				        beforeDblClick: function (e, treeNode) {
				            console.log("[beforeDblClick] " + treeNode.name);
				        },
				        onDblClick: function (e, treeNode) {
				            console.log("[onDblClick] " + treeNode.name);
				        },
				        beforeMouseDown: function (e, treeNode) {
				            console.log("[beforeMouseDown] " + treeNode.name);
				        },
				        onMouseDown: function (e, treeNode) {
				            console.log("[onMouseDown] " + treeNode.name);
				        },
				        beforeMouseUp: function (e, treeNode) {
				            console.log("[beforeMouseUp] " + treeNode.name);
				        },
				        onMouseUp: function (e, treeNode) {
				            console.log("[onMouseUp] " + treeNode.name);
				        },
				        beforeRightClick: function (e, treeNode) {
				            console.log("[beforeRightClick] " + treeNode.name);
				        },
				        onRightClick: function (e, treeNode) {
				            console.log("[onRightClick] " + treeNode.name);
				        },
				        beforeCollapse: function (e, treeNode) {
				            console.log("[beforeCollapse] " + treeNode.name);
				        },
				        beforeExpand: function (e, treeNode) {
				            console.log("[beforeExpand] " + treeNode.name);
				        },
				        beforeSelect: function (e, treeNode, addFlag) {
				            console.log("[beforeSelect] " + treeNode.name + ' addFlag: ' + addFlag);
				        },
				        onSelect: function (e, treeNode, addFlag) {
				            console.log("[onSelect] " + treeNode.name + ' addFlag: ' + addFlag);
				        },
				    },

				};

				$("#treeDemo").on("tree:onnodecreated", function (e, treeNode) {
				    var id = this.id;
				    console.log(id + " tree:onnodecreated " + treeNode.name);
				});

				$("#treeDemo").tree(options);

		},

		resize:function(){
			console.log("resize")
			this.atomicServiceObjListGrid.grid("resize",true);
			this.atomicServiceObjCatalogTree.grid("resize",true);

		},

		initPopedit : function(){
			console.log("initPopedit");
		}



	});
});


