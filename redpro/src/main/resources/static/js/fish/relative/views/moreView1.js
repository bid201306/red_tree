define([
	'text!/redpro/js/fish/relative/templates/moreView1.html',
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
			console.log("_afterRender")
			console.log(this.$el);
			currentObj = this;
			currentObj.initPopedit();
			var $grid ;
			  var opt = {
			      data: mydata,
			      height:500,
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
					treeReader:{parentid :"parentId"},
					pagebar: false,
			  };

			  
			  $grid = $("#gridId").jqGrid(opt);

			  $('[data-toggle="searchbar"]').searchbar({target: $grid});
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


