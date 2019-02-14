/**
 * 弹出一个view，options中可以使用fish.popup中options参数如modal，height等等
 * options
 * {String} options.url 视图url，必选
 * {Function} options.close 对应popup.close方法
 * {Function} options.dismiss 对应popup.dismiss方法
 * {Function} options.callback(popup, view) 回调函数,popup：当前弹出窗；view当前视图;callback在afterRender事件之后触发
 * {Object} options.viewOption 子视图参数，如model，'collection', 'attributes', 'className'等，可选
 */
fish.popupView = function (options) {
    if ($.type(options) === 'string' || (options instanceof fish.View)) {
        options = {url: options};
    }

    if (!options.url) {
        console.error("popupView方法至少提供一个url参数");
        return;
    }
    if (!window.require) {
        console.error('popupView method depends on RequierJS, please check!');
        return;
    }
    if (!fish.popup) {
        console.error('popupView method depends on fish.popup component');
        return;
    }

    if (fish.isString(options.url)) {
        window.require([options.url], function (View) {
            var viewInstance = new View($.extend({}, options.viewOption));
            // event order, beforeRender --> render --> afterRender  --> callback
            renderPopupView(viewInstance);
            viewInstance.render();
        });
    } else {
        //view 在页面中高度定制
        var viewInstance;
        if (options.url instanceof fish.View) { //fish.view 实例
            viewInstance = options.url;
        } else { //fish.view type
            var View = options.url;
            viewInstance = new View($.extend({}, options.viewOption));
        }
        // event order, beforeRender --> render --> afterRender  --> callback
        renderPopupView(viewInstance);
        viewInstance.render();
        return viewInstance;
    }

    function renderPopupView(viewInstance) {
        viewInstance.on('render', function () {
            var $popupView, $el = viewInstance.$el, cloneOpts = $.extend({}, options);
            delete cloneOpts.url;
            delete cloneOpts.content;
            
            $popupView = $el.hasClass('ui-dialog') ? $el : $el.addClass('ui-dialog');

            var popOpts = $.extend({}, {content: $popupView}, cloneOpts); // 这里可以加入初始参数
            var popup = fish.popup(popOpts);
            viewInstance.popup = popup; //注入popup property，如果视图想自己关闭自己

            var promise = popup.result;
            options.close && fish.isFunction(options.close) && promise.then(options.close);
            options.dismiss && fish.isFunction(options.dismiss) && promise.then(null, options.dismiss);

            promise.always(function () {
                console.log('always remove popup View instance');
                viewInstance.remove(); //移除body下的view
            });

        });
        
        //TODO对于grid需要调整位置（style="height:300px"会出现重叠现象）
        viewInstance.on('afterRender', function (view) {
            view.$el.position(view.$el.data('position'));
            view.$el.focus();
            if (fish.isFunction(options.callback)) {
                options.callback.call(window, view.popup, viewInstance);
            }
           
        });
    }
};