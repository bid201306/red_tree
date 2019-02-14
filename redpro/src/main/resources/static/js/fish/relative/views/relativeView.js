define([
	'text!/redpro/js/fish/relative/templates/relative.html',
	'css!/redpro/js/fish/relative/style/relative.css',
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

			this.requireView({
				selector :"#moreView1",
				url : "/redpro/js/fish/relative/views/moreView1.js",
				viewOption : {}
			});
			this.requireView({
				selector :"#moreView2",
				url : "/redpro/js/fish/relative/views/moreView2.js",
				viewOption : {}
			});
		},

		resize:function(){
			alert(1);
			this.atomicServiceObjListGrid.grid("resize",true);
			this.atomicServiceObjCatalogTree.grid("resize",true);

		},

		initPopedit : function(){
			console.log("initPopedit");
		}



	});
});


