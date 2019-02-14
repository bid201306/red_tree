function setResponseCodeContent(){
	if(!$("#responseCodeForm").isValid()){
		return;
	}
	//${!(decode(response.returnObj,"200","NORMAL","300","NORMAL","400","NORMAL","ERROR"))}
	var selectOutParam =  $('#selectOutParam').val();
	var ori = $('#selectOutParam').attr('ori');
	var isString = false;
	if(ori.indexOf('string') > -1){
		isString = true;
	}
	selectOutParam = selectOutParam.replace(/\${/g,"").replace(/!}/g,"");
	
	//输出处理结果字符串
	var resultCode = "${!(decode(" + selectOutParam;
	var stateCode = $('#stateCode').val();
	
	var stateCodeList = stateCode.split(',');
	for(var i=0;i<stateCodeList.length;i++){
		var code = stateCodeList[i];
		if(code != ""){
			if(isString){
				resultCode += ",\"" + code + "\",\"NORMAL\"";	
			}else{
				resultCode += "," + code + ",\"NORMAL\"";
			}
		}
	}
	resultCode += ",\"ERROR\"))}";	
	$('#responseCode').val(resultCode);
	$('#responseCodeWin').hide();
}

function stateCodeLimit(obj){
	 obj.value=obj.value.replace(/[^\dA-Za-z,]/g,"");
}