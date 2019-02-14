/**
 * 轮播插件
 * 
 * @deprecated
 * @class fish.desktop.widget.Slick
 * @extends fish.desktop.widget
 * 
 * <pre>
 * $(element).slick(option);
 * </pre>
 */
$.extend($.ui.slick.prototype,{
	_cleanUpEvents:function(){
        var _ = this;
        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', this._changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(this._setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(this._setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', this._changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', this._changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', this._swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', this._swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', this._swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', this._swipeHandler);

        _.$list.off('click.slick', this._clickHandler);

        if(_.visibilityChange){
        	$(document).off(_.visibilityChange, _.visibility);
        }
        _.$list.off('mouseenter.slick', $.proxy(this._setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(this._setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', this._keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', this._selectHandler);
        }

        $(window).off('resize.slick', _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    }
});