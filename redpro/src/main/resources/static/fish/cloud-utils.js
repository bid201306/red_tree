define(["/redpro/fish/dateUtil.js"], function (dateUtil) {
    return (function () {
        var utils = function () {
        };
        utils.prototype = utils.fn = {
            
            /**
             * 数字格式化,保留nth指点的位数，如果数字实际小数点<nth
             * @param numberValue: 
             */
            numberFormat:function(numberValue, nth){
        	var pattern = /\d+(\.(\d+))?/; //获取小数点位数
    		var parseResult = pattern.exec(numberValue);
		if(parseResult[2] && parseResult[2].length > nth){
		    numberValue = numberValue.toFixed(nth);
		}
		return  parseFloat(numberValue);
            },
            
            cloneObject:function(o){
    		function F() {};
    		F.prototype = o;
    		return new F();
    	    },
    	    
    	    extend:function(subType, superType){
    		var prototype = this.cloneObject(superType.__proto__); 
    		prototype.constructor = subType;
    		subType.prototype = prototype; 
    	    },
            
            getHash: function (u) {
            	/* 获取锚点和request parameters
            	 * command
            	 * page
            	 * pageRoute
            	 * params
            	 */
            	
            	if(u&&!u.startsWith('#')){
            	    u=u.substr(u.indexOf('#'));
            	    
            	}
            	
            	var baseUrl = u;
            	if(baseUrl==null){
            	    baseUrl=window.location.hash;
            	}
                var h = u;
                if(h==null){
            	    h=window.location.hash;
            	}                
                
                var result = {command: '#', page: '', params: []};
                if (baseUrl.startsWith('#!')) {
                    h = baseUrl.substr(2);
                    result.command = '#!';
                }
                else if (baseUrl.startsWith('#?')) {
                    h = baseUrl.substr(2);
                    result.command = '#?';
                }
                else if (baseUrl.startsWith('#/')) {
                    h = baseUrl.substr(2);
                    result.command = '#/';
                }
                else if (baseUrl.startsWith('#')) {
                    h = baseUrl.substr(1);
                }

                if (result.command != '#?') {
                    var indexOfQ = h.indexOf('?');
                    if (indexOfQ > 0) {
                        result.page = h.substr(0, indexOfQ);
                        h = h.substr(indexOfQ + 1, h.length);
                    }
                    else{
                        result.page = h;
                        h='';
                    }
                }
                
                if(result.page){
                    result.pageRoute=result.page.split('/');
                }

                h=decodeURI(h);
                var hashArr = h.split('&');
                $.each(hashArr, function (i, str) {
                    var tmp = str.split('=');

                    if (tmp.length >= 2) {
                    	if(tmp[0]!=''){
	                    var qarr = tmp[1].split(',');
	                    if (qarr.length == 1) {
	                        result.params.push({
	                            type: 'pair',
	                            key: tmp[0],
	                            value: tmp[1]
	                        });
	                    }
	                    else if (qarr.length > 1) {
	                        result.params.push({
	                            type: 'list',
	                            key: tmp[0],
	                            value: qarr
	                        });
	                    }
                    	}
                    }
                    else if (tmp.length == 1) {
                    	if(tmp[0]!=''){
	                    result.params.push({
	                        type: 'str',
	                        key: tmp[0]
	                    });
                    	}
                    }
                });
                return result;
            },
	    
	    ajax:function(bean,method){
            	/* 调用bean的某个方法
            	 * bean
            	 * method
            	 * p0...px
            	 */
                var param={};
                param.bean=bean;
                param.method=method;
		
                for(var i=2;i<arguments.length;i++){
                    //考虑js date对象转换
                    if(arguments[i] == null){
                	param["p" + (i-2).toString()] = "null";
                    }else if(arguments[i] instanceof Date){
                	param["p" + (i-2).toString()] = '"' + dateUtil.format(arguments[i]) + '"';
                    }else{
                	param["p" + (i-2).toString()] = JSON.stringify(arguments[i]);
                    }
                } 
                return $.post("IOM-OAAS-SERVICE/callRemoteFunction/exec",param).then(null,function(resp){
                    if(resp.status==401){
                	if(fish&&fish.info){
                	    fish.info({message:"请重新登录",title:"登录超时"}).result.always(function(){
                		if(location.hash&&location.hash!=''){
    	                	    window.location.href = basePath+location.hash;
    	        		}else{
    	        		    window.location.href = basePath;
    	        		}   
                	    });
                	    
                	    
                	}else{
	                    if(location.hash&&location.hash!=''){
	                	window.location.href = basePath+location.hash;
	        	    }else{
	        		window.location.href = basePath;
	        	    }   
                	}
                    }
                    
                    var uosException = {};
                    try{
        		uosException= JSON.parse(resp.responseText);
        	    }catch(e){
        		console.log("回调后台失败，[response对象,错误]",resp,e);
        	    }
        	    if(uosException.errorMessage){
        		uosException.responseText = uosException.errorMessage;
        	    }else{
        		uosException.responseText = resp.responseText;
        	    }
        	    uosException.status = resp.status;
        	    return uosException;
                });
		
            },
	    
            uosExceptionAlarm:function(o,defaultMsg){
            	/*
            	 * 根据uosException弹出错误提示框
            	 * 
            	 * param: 
            	 * 1.o为uosException字符串或对象,
            	 * 2.defaultMsg为参数o错误的时候弹出的默认提示
            	 * 
            	 * return: 
            	 * promise对象，参数为uosException
            	 * 
            	 */
            	var uosException = null;
    		var dmsg = ((defaultMsg==null||defaultMsg=='')?"错误。":defaultMsg);
            	if(typeof(o) === "string"){
            	    try{
        		uosException= JSON.parse(o);
        	    }catch(e){
        		
        		//console.error(e);
        	    }
            	}else{
            	    uosException = o;
            	    
            	}
            	if(uosException==null){
            	    return fish.error(dmsg).result;
            	}else{
            	    if(uosException.exception==="feign.FeignException"){
                        uosException=JSON.parse(uosException.message.substr(uosException.message.indexOf("content:")+9));
		    }
            	    return fish.error({title:"异常",message:uosException.message})
            		.result.then(function(){ return uosException; },function(){ return uosException; });
            	}
            },
	    
            getConditions: function(formId){
		/*用户查询条件要求：操作符号：【等于、不等于、包含、不包含】+输入值
                 *界面类似：
                 * <form id="demoFormId">
                 * <label>单号</label>
                 * <select class="form-control" id="demo-oper" name="condOp.orderCode">
                 *                         <option value="EQUALS">等于</option>
                 *                         <option value="NOT_EQUALS">不等于</option>
                 *                         <option value="LIKE">包含</option>
                 *                         <option value="NOT_LIKE">不包含</option>
                 * </select>
                 * <input class="form-control" type="text"  id="demo-ordercode" name="condName.orderCode"  
                 *   placeholder="请输入单号" > 
                 *</form> 
                 *  注意：condOp.orderCode和condName.orderCode组成一个查询条件，分别表示对查询条件orderCode的操作符和输入值。
                 *  假设用户选择等于，输入OC0001，调用该方法: var conditons = cloud-utils.getConditions("demoFormId");
                 *  获得结果为： [{op:"EQUALS",name:"orderCode",value:"OC0001"}]
                 */
		var conds = [];
		var oringinVals = $('#'+formId).form('value');
		for (var key in  oringinVals) {
                    if(key.match('^condName\..+') && oringinVals[key] && $.trim(oringinVals[key]) != '' ){
			var name = key.substring(9,key.length);
			var cond = {};
			cond.op = oringinVals['condOp.'+name];
			cond.name = name;
			cond.value = oringinVals[key];
			conds.push(cond);
                    }
		};
		return conds;
            },
            
            /**
             * 获取页面框架头部、Tab业的高度，用于计算子视图的可用高度
             */
            getHeadHeight:function(){
        	var navbarHeight = $(".navbar").outerHeight(true);
        	var navHeight = $(".ui-tabs-nav").outerHeight(true);
        	
        	return navbarHeight + navHeight + 23;
            },
            
  	    getRandomNum:function(min,max){   
		var range = max - min;   
		var rand = Math.random();   
		return(min + Math.round(rand * range));   
	    },
	    
            /**
             * 跳转到url或者hash
             */
            redirect:function(url,force){
        	if(url==null||url==''){
        	    window.location.href ='./main.jsp';
        	    return;
        	}
        	
    		if(url.startsWith('#')){
    		    if(force){
            		location.hash = '#/';
            		location.hash = url;
    		    }else{
    			location.hash = url;
            	    }
        	}else{
        	    window.location.href = url;
        	}
            },

	    getUrlFileName: function (url) {
		var index = url.lastIndexOf('/');
		var name = url;
		if (index >= 0) {
		    name = url.substring(index + 1);
		}
		index = name.lastIndexOf('.');
		if (index >= 0) {
		    name = name.substring(0, index);
		}
		return name;
	    }, 
	    
	    /*将Java的Page对象转换为fish datagrid 数据格式*/
	    transformToGridData:function(page){
		if(!page || !page.objects){
		    return {
			"rows": [],
			"page": 0,
			"total": 0,
			"records":0
		    };
		}else{
		    //封装fish.dagagrid 数据格式
		    return {
			"rows": page.objects,
			"page": page.currentPage,
			"total": page.totalPage,
			"records":page.totalNumber
		    };
		}
	    }
        };
	
        if(window.CLOUD_DEBUG_MODE){
            utils.prototype.ajax=utils.fn.ajax=function(bean,method){
            	/* 调用bean的某个方法
            	 * bean
            	 * method
            	 * p0...px
            	 */
        	
                var param={};
                param.bean=bean;
                param.method=method;
		
                for(var i=2;i<arguments.length;i++){
                    //考虑js date对象转换
                    if(arguments[i] == null){
                	param["p" + (i-2).toString()] = "null";
                    }else if(arguments[i] instanceof Date){
                	param["p" + (i-2).toString()] = '"' + dateUtil.format(arguments[i]) + '"';
                    }else{
                	param["p" + (i-2).toString()] = JSON.stringify(arguments[i]);
                    }
                } 
		
                try{
	            if(arguments.callee){
	        	//console.log("ajax calle:",arguments.callee);
	        	if(arguments.callee.caller){
	        	    var caller = arguments.callee.caller;
	        	    var jscallstack="";
	        	    //console.log("前后台交互：",bean,method,"调用堆栈开始----------------------------------------");
	        	    if (arguments.length!=arguments.callee.length) {//形参和实参长度不一致，调用了后台的带参方法
	        		//console.log("参数:",param);
	        	    }
	        	    var ci = 0, maxCount = 20;
	        	    while(caller && ci < maxCount){
	        		ci++;
	        		jscallstack+="\r\ncaller:"+caller.name+"("+ci+"),caller jquery guid:"+(caller.guid?caller.guid:"null")+",caller code:\r\n"+caller.toString()+"\r\ncaller code end\r\n";
	        		//console.log("caller:"+caller.name+"("+ci+")","caller jquery guid:"+(caller.guid?caller.guid:"null"),caller);
	        		caller = caller.caller;
	        		
	        	    }
	        	    if(caller){
	        		jscallstack+="\r\n堆栈未结束，但是只记录"+maxCount+"条";
	        	    }
	        	    param["JavascriptCallStack"]=jscallstack;
	        	    //console.log("前后台交互：",bean,method,"调用堆栈结束----------------------------------------");
	        	}
	            }
                }catch(lol){
                    console.error(lol);
                }
                
                return $.post("callRemoteFunction/exec",param).then(null,function(resp){
                    if(resp.status==401){
                	
                	if(fish&&fish.info){
                	    fish.info({message:"请重新登录",title:"登录超时"}).result.always(function(){
                		if(location.hash&&location.hash!=''){
    	                	    window.location.href = basePath+location.hash;
    	        		}else{
    	        		    window.location.href = basePath;
    	        		}   
                	    });
                	    
                	    
                	}else{
	                    if(location.hash&&location.hash!=''){
	                	window.location.href = basePath+location.hash;
	        	    }else{
	        		window.location.href = basePath;
	        	    }   
                	} 
                    }
                    
                    var uosException = {};
                    try{
        		uosException= JSON.parse(resp.responseText);
        	    }catch(e){
        		console.log("回调后台失败，[response对象,错误]",resp,e);
        	    }
        	    if(uosException.errorMessage){
        		uosException.responseText = uosException.errorMessage;
        	    }else{
        		uosException.responseText = resp.responseText;
        	    }
        	    uosException.status = resp.status;
        	    return uosException;
                });
		
            };
        }
        var utilsInstance = new utils();
        utilsInstance.ajax = utilsInstance.ajax.bind(window);
        return utilsInstance;


    })();
});