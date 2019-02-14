/**
 * combotree控件，改变了树的zIndex
 * 
 * @deprecated
 * @class fish.desktop.widget.combotree
 * @extends fish.desktop.widget
 * 

 */
$.extend($.ui.combotree.prototype,{
        _create: function () {
            selectNodes = [];
            this.comboTree = new $.combo(this.options);
            this.element.hide().before(this.comboTree.$container);
            this.comboTree.$content.tree(this.options);
            var parentZIndex = $(this.element).zIndex();
            this.comboTree.$content.zIndex((parentZIndex==null?1:parentZIndex));
            this.comboTree.$input.attr('readonly', true);
            this.comboTree.create();
            this._delegateEvent();
        },

});