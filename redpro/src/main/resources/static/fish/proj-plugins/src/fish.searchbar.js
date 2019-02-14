$.extend($.ui.searchbar.prototype, {
	
	_onSelect: function (e, data) {
        this._trigger('select', e, data.item);
        if(this.target){
        	if(data&& data.item){
        		this.target.grid('setSelection', data.item.rowId);
        	}else{
        		//this.target.grid('setSelection', null);
        	}
        }
    }
	
});