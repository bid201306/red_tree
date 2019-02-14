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
