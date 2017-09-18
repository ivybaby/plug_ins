$.ajaxSetup({
	async: false
});
var cardtype;
var project;
var $sendCardDetail_datagrid;
var tmp;
var isnum;
var xdata;
var ydata;
var valdata;
var listdata;//所有列
var getname;
var otable,ohtd;
var list;
var $search_form;
//$.post(ctxAdmin + '/givenGift/datagird/1', function(data) {getname=data;}); 
$.post(ctxAdmin+'/project/allProjectCombobox', function(data) {project=data}); 

$(function() {
	$search_form=$('#card_search_form').form();
	
	$.ajax({
		url:ctxAdmin+'/giftReport/getQueryColumnList',
		type:'post',
		data:{
			code:106
		},
		success:function(data){
    		if(data.status){
    			list = data.obj;
    			
    		}
		}
	});
	

	 tmp=true;//底部分页是否显示
	 isnum=true;//是否显示行数
	 
	 function getNewArray(){
	    xdata=[];//存放冻结数组
	    ydata=[];//存放正常数组
	    listdata=[];//存放所有数组
	 
	    ydata=fortitle(list);
	    listdata=xdata.concat(ydata);
	
	 }
	getNewArray();
	
	
	
	$sendCardDetail_datagrid = $("#sendCardDetail_datagrid").datagrid({
		url: ctxAdmin + '/giftReport/getSendGiftDetailReportList',
		fit: true,
		//title: '',
		fitColumns: false, //自适应列宽
		pagination: tmp, //底部分页
		pageSize: 20, //每页记录数
		striped: true, //显示条纹
		rownumbers: isnum, //显示行数
		nowrap: false,
		border: false,
		singleSelect: true,
		remoteSort: false, //是否通过远程服务器对数据排序
		dragSelection: true,
		idField: 'id',
		frozenColumns:[xdata],
		columns: [ydata],
		onBeforeLoad:function (){	
		}
	
	}).datagrid('columnMoving');
	
	var print="PrintArea";
	
	/* 打印 */
	$(".print-link").on('click', function() {
	    	$("#"+print+"").remove();
	    	var datas = $.serializeObject($search_form);
	    	var objid = $("#projid").combobox('getValue');
			if(objid == ""){
				eu.showAlertMsg("商业项目必填");
				return ;
			}
			var fromTime = $("#fromTime").datetimebox('getValue');
			var toTime = $("#toTime").datetimebox('getValue');
			 if(fromTime == undefined || fromTime == null){
				  fromTime="";
			  }
			  if(toTime == undefined || toTime == null){
				  toTime="";
			  }
			$.ajax({
				url:ctxAdmin+'/giftReport/getSendGiftDetailReportList',
				type:'post',
				data:datas,
				dataType:"json", 
				success:function(data){
					$.getTable(print,data,"#printDiv",isnum,listdata,"礼品发放明细",fromTime,toTime);//给表格添加父级div的id,数据，隐藏层，是否显示行数，列表头的json
				}
			});
    });
	
	$("#service").combobox({editable:false});
	$("#projid").combobox({
			url:ctxAdmin+'/project/allProjectCombobox',
			editable:false,
			onSelect:function(record){
				if(record){
					$("#service").combobox({
						url:ctxAdmin+'/servicePoint/allServicePointCombobox?projid='+record.value,
						editable:false
					});
					$('#cardtype').combobox({
						url:ctxAdmin+'/giftType/giftTypeCombobox?projId='+record.value,
					});
				}
			}
	});
	
	    
	    $.ajax({
			url:ctxAdmin + "/codeValue/codesCombobox?typecode=couponSendMethod",
			dataType:'json',
			success:function(res){
				$("#card_search_form [name='sendMethod']").combobox({
					data:res,
					editable:false
				});
				$.each(res,function(i,d){
					//sendMethodMap[d.value]=d.text;
				})
			}
		});
	    
	    
	   
 
});
function fortitle(titleList){
	var list = new Array();
	for(var i=0;i<titleList.length;i++){
		if(titleList[i].display==1){
			if(titleList[i].lock==1){
				xdata.push(jsonObj(titleList[i].columnName, titleList[i].columnTile,titleList[i].columnWidth));
			}else{
				list.push(jsonObj(titleList[i].columnName, titleList[i].columnTile,titleList[i].columnWidth));
			}
			//listdata.push(jsonObj(titleList[i].columnName, titleList[i].columnTile));
		}
	}

	return list;
}

function jsonObj(id,name,columnWidth){
	var obj = {
			field:id,
			title:name,
			width:columnWidth
	};
	return obj;
}
function search(){
	var objid = $("#projid").combobox('getValue');
	if(objid == ""){
		eu.showAlertMsg("商业项目必填");
		return ;
	}
	var data = $.serializeObject($search_form);
	$sendCardDetail_datagrid.datagrid('load', data);
}
function exportXls(){
	var objid = $("#projid").combobox('getValue');
	if(objid == ""){
		eu.showAlertMsg("商业项目必填");
		return ;
	}
	if($("#display").val() == 1){
		var f = new Date($("#fromTime").datetimebox('getValue')).getTime();
		var t = new Date($("#toTime").datetimebox('getValue')).getTime();
		if (t<f) {
			eu.showAlertMsg("结束时间不能早于开始时间");
			return;
		}
	}
	var data = $search_form.serializeArray();
	PostForm(ctxAdmin+ '/giftReport/exportSendGiftDetailXls',data);
}

function cls(){
	$search_form.form('reset');
}
