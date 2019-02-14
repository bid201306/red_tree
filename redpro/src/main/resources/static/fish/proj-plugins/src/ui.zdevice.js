/**
 * zdevice<br>
 * @class fish.desktop.widget.zdevice
 * @extends fish.desktop.widget
 * @require d3.js jquery.stringwidth.js
 * 用法:<br/>
 *      <pre></pre>
 */
!function() {
    $.widget('ui.zdevice', {
        options: {
            data:[],
            key:"id",
            value:"name",
            blockWidth:160,//设备最小宽度
            subBlockWidth:160,//设备最小宽度
            blockHeight:25,//设备高度
            blockGrapX1:60,
            blockGrapY1:12,
            blockFontSizeH1:16,
            blockFontSizeH2:12,
            lineGrapX1:30,
            minRecords:4
        },
        _create: function() {
            var $el = this.element;

            this._createUI();
            this._bindEvent();
        },
        _init: function() {},
        _destroy: function() {},
        _createUI: function () {
        	this._render();        	
        },
        _render:function(){
        	var me =this;
        	var data = me.options.data,
        	blockHeight = me.options.blockHeight,
        	subBlockWidth = me.options.subBlockWidth,
        	blockWidth = me.options.blockWidth,
        	blockGrapY1 = me.options.blockGrapY1,
        	blockGrapX1 = me.options.blockGrapX1,
        	blockFontSizeH1 = me.options.blockFontSizeH1,
        	blockFontSizeH2 = me.options.blockFontSizeH2,
            lineGrapX1 = me.options.lineGrapX1,
            minRecords = me.options.minRecords;
        	
        	var p = $.extend({},me.options);
        	me.p=p;
        	var totalHeight = 0;

            for(var index=0;index<data.length;index++){
                totalHeight+= (_.max([data[index].children.length,minRecords]))*(blockHeight+blockGrapY1)
            }
            
            var top1DataNames = _.pluck(data,"name");
            if(top1DataNames&&top1DataNames.length>0){
            	var maxblockWidthTmp = $.getMaxStringWidth(top1DataNames,blockFontSizeH1)
            	if(maxblockWidthTmp>blockWidth){
            		blockWidth = maxblockWidthTmp;
            	}
            }
            
            var tmpSubBlockWidth =$.getMaxStringWidth(_.chain(data).pluck("children").flatten().pluck("name").value(),blockFontSizeH2);
            if(tmpSubBlockWidth>subBlockWidth){
    			subBlockWidth = tmpSubBlockWidth;
    		}
            
            p.subBlockWidth=subBlockWidth;
            
            p.blockWidth=blockWidth;
        	
        	var $el = this.element;
        	this.svg = d3.select($el.get(0))
            .append("svg")
            .attr("width", (blockWidth+subBlockWidth+blockGrapX1*3))
            .attr("height", totalHeight)
        	//.style({width: (blockWidth*3+blockGrapX1*2), "height": totalHeight})
        	//.attr("viewBox","0,0,"+(blockWidth*3+blockGrapX1*2)+","+totalHeight);

        	this.topDevices = this.svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform",function(d,i){
                var h = 0;
                for(var index=0;index<i;index++){
                    h+= (_.max([data[index].children.length,minRecords]))*(blockHeight+blockGrapY1) ;
                }

                return "translate(0,"+ h+")"
            });
        	
        	this.subDevices = this.topDevices.selectAll("g")
            .data(function(d) { return d.children; }).enter().append("g")
            .classed('subdevice', true)
        	.style({"cursor": "pointer"}).on('click',function(d,index,parentIndex){
	        		if($.isFunction(me.options.subDeviceClick)){
	        			me.options.subDeviceClick(me,this,d,index,parentIndex);
	        		}
        		
        		})
            .attr("transform",
            function(d,i,parentIndex){
            	var h = i*blockHeight+i*blockGrapY1;
            	if(data[parentIndex].children.length<minRecords){
            		var difference = minRecords-data[parentIndex].children.length+1;
            		h += (difference*(blockHeight+blockGrapY1) - (difference==0?0: (blockGrapY1*2+blockHeight/2)) )/2;
            		
            	}
            	            	
                return "translate("+(blockWidth+blockGrapX1)+","+ h +")"
            });
        	
        	var subDeviceRects = this.subDevices.append("rect").attr("width",subBlockWidth+40)
            .attr("height",25).attr("fill","#EEEEEE");
        	
        	this.subDevices.append("text").classed('subdevice-text', true)
	        .attr("text-anchor", "left").attr("fill", "#0096FF").attr("x",function(d,i){
	            return 20;//blockWidth/2- (d.name.length*16)/2
	        })
	        .attr("y",(blockFontSizeH2/2+blockHeight/2-2)).text(function(d){
	        	return d.name
	        	}).attr( "font-size",blockFontSizeH2);

        	
        	
        	this.topDeviceNodes = this.topDevices.append("g")
        	
            .attr("transform",function(d,i){
                var h = ((_.max([d.children.length,minRecords]))*(blockHeight+blockGrapY1) - ((_.max([d.children.length,minRecords]))==0?0: (blockGrapY1*2+blockHeight/2)) )/2;

                return "translate(0,"+ h+")"
            });
        	
        	this.topDeviceNodes.append("rect")
            .attr("width",blockWidth)
            .attr("height",blockHeight).attr("fill","#EEEEEE");

        	this.topDeviceNodes.append("text")
            .attr("text-anchor", "left")
            .attr("x",function(d,i){
                return blockWidth/2- (d.name.length*16)/2
            })
            .attr("y",(blockFontSizeH1/2+blockHeight/2-2))
            .text(function(d){return d.name}).attr( "font-size",blockFontSizeH1);

        	this.topDeviceLineNodes = this.topDevices.selectAll("path")
            .data(function(d) { return d.children; }).enter().append("path")
            .attr("stroke-dasharray","5,5")
            .attr("fill","none")
            .attr("stroke","#D0D0D0")
            .attr("stroke-width","1")
            .attr("d",function(d,i,parentIndex){
                //console.log("uck===",d,"sssss",i,"arguments",arguments);
                var startedX = blockWidth,
                        startedY = ((_.max([data[parentIndex].children.length,minRecords]))*(blockHeight+blockGrapY1) - ((_.max([data[parentIndex].children.length,minRecords]))==0?0: (blockGrapY1*2+blockHeight/2)) )/2 +blockHeight/ 2,
                        midX1= (startedX+lineGrapX1),midY1= startedY,
                        midX2= (startedX+lineGrapX1),midY2= i*(blockGrapY1+blockHeight)+blockHeight/2,
                        endX= (blockWidth+blockGrapX1),endY=i*(blockGrapY1+blockHeight)+blockHeight/2;
                
                if(data[parentIndex].children.length<minRecords){
            		var difference = minRecords-data[parentIndex].children.length+1;
            		var offsetY = (difference*(blockHeight+blockGrapY1) - (difference==0?0: (blockGrapY1*2+blockHeight/2)) )/2;
            		
            		midY2+=offsetY;
            		endY+=offsetY;
            		
            	}
                
                
                return "M"+ startedX +" "+startedY
                        +" L"+ midX1 +" " + midY1
                        +" L"+ midX2 +" " + midY2
                        +" L"+ endX +" " + endY
                        +" ";

            });
        },
        _bindEvent: function () {
        },
        destroy: function() {
        	if(this.svg&&$.isFunction(this.svg.remove)){
        		this.svg.remove();
        	}
        }
    });
}();
