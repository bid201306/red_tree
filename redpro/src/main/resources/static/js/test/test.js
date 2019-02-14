

$(document).ready(function() {

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
})
//初始化input
$("#inputDemo").popedit({
    dialogOption:{
    },
    change:function(e, data){//可以绑定change事件改变初始值
        console.log("change:"+data);
    },
    open:function(e){
        var options = {
            height: 300,
            modal: false,
            draggable: false,
            content: $("#demodialog"),
            autoResizable: true
        };
        var popup = fish.popup(options);
        //dialog的处理
        $("#save-button").click(function() {
            $("#inputDemo").popedit('setValue', {name:'123', value:'234'});
            popup.close();
        });
        $("#cancel-button").click(function() {
            popup.close();
        });
    }
});
$('#inputDemo2').popedit({
    showClearIcon:false //不显示x按钮
});

$('#btnEnable').click(function() {
    $("#inputDemo").popedit('enable');
});

$('#btnDisable').click(function() {
    $("#inputDemo").popedit('disable');
});

$('#getValue').click(function() {
    console.log($("#inputDemo").popedit('getValue'));
});

$('#setValue').click(function() {
    $("#inputDemo").popedit('setValue', {name:'popedit', value:'test'});
});

$('#clearValue').click(function() {
    $("#inputDemo").popedit('clear');
});

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


$('.js-prev').on('click', function () {
    var nodes = $("#treeDemo").tree("getSelectedNodes");
    if (nodes.length == 0) {
        fish.info("请先选择一个节点");
        return;
    }
    var preNode = nodes[0].getPreNode();
    if (preNode) {
        fish.info("相邻的前一个节点：" + preNode.name);
    } else {
        fish.info("无前一个相邻节点");
    }

});

$('.js-next').on('click', function () {
    var nodes = $("#treeDemo").tree("getSelectedNodes");
    if (nodes.length == 0) {
        fish.info("请先选择一个节点");
        return;
    }
    var nextNode = nodes[0].getNextNode();
    if (nextNode) {
        fish.info("相邻的后一个节点：" + nextNode.name);
    } else {
        fish.info("无后一个相邻节点");
    }
});

$('#elem').combobox({
    value: 1,
    dataSource: [
        {name: 'Apple', value: 0},
        {name: 'Banana', value: 1}
    ]
});

var AppView1 = fish.View.extend({
    manage: true,
    el: '#app-1',
    template: fish.compile('<p>{{message}}</p>'),
    serialize: {
        message: 'Hello World'
    }
});
new AppView1().render();
var AppView2 = fish.View.extend({
    manage: true,
    el: '#app-2',
    template: fish.compile('{{#if shown}}\
        <p> Hi, i am here.</p>\
        {{/if}}'),
    serialize: {
        shown: true
    }
});
new AppView2().render();
var AppView3 = fish.View.extend({
    manage: true,
    el: '#app-3',
    template: fish.compile('<ol>\
        {{#each persons}}\
        <li>\
        {{this.name}}\
        </li>\
        {{/each}}\
    </ol>'),
    serialize: {
        persons: [
            {name: 'Li Lei'},
            {name: 'Han Meimei'},
            {name: 'Lucy'},
            {name: 'Lily'}
        ]
    }
});
new AppView3().render();
var AppView4 = fish.View.extend({
    manage: true,
    el: '#app-4',
    template: fish.compile('<form>\
        <div class="form-group">\
            <label>Username</label>\
            <input type="text" class="form-control js-username">\
        </div>\
        <div class="form-group">\
            <button type="button" class="btn btn-primary">Click</button>\
        </div>\
    </form>'),
    events: {
        'click .btn': 'onClick'
    },

    onClick: function () {
        this.$('.js-username').val('Li Lei');
    }
});
new AppView4().render();
var AppView5 = fish.View.extend({
    manage: true,
    el: '#app-5',
    template: fish.compile('<form>\
        <div class="form-group">\
            <label>Username</label>\
            <input type="text" class="form-control">\
        </div>\
        <div class="form-group">\
            <label>Gender</label>\
            <input type="text" class="form-control js-gender">\
        </div>\
        <div class="form-group">\
            <label>Birthday</label>\
            <div class="input-group">\
                <input type="text" class="form-control js-birthday">\
            </div>\
        </div>\
    </form>'),
    afterRender: function () {
        // 下拉列表控件初始化
        this.$('.js-gender').combobox({
            dataSource: [
                {name: 'Male'},
                {name: 'Female'},
                {name: 'Unknown'}
            ]
        });

        // 日期控件初始化
        this.$('.js-birthday').datetimepicker();
    }
});
new AppView5().render();