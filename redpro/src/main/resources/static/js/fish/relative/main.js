// 视图配置统一设置，避免视图定义都要书写 `manage: true`，才可以使用扩展视图功能
fish.View.configure({manage: true});
fish.setLanguage('en');
// 加载主视图，进行页面渲染初始化   el: 'body'必不可少
//el是指元素
require(['/redpro/js/fish/relative/views/relativeView.js'], function(IndexView) {
    new IndexView({
        el: '#content'
    }).render();
});

//这里可以写一些js
$('.split_line').html("-----------------------------------------------");
/*require(['/redpro/js/fish/relative/views/relativeView.js'], function(IndexView) {
    new IndexView({
        el: '#content2'
    }).render();
});*/

$('#content2').hide();