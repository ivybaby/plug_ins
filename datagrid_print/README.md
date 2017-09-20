# Easyui-datagrid-print

在项目中用到 easyui框架，只能说对很多效果展示也是很无奈，即使对于后台挺友好。此文就展示如何打印表格
因为项目中用到的是jsp文件，我就单独把内容放在sendGiftDetail文件，按需拿。

用过easyui框架的都懂布局，重要的是 设置为display:none;

    
	<!-- 打印 -->
	 <div data-options="region:'center',split:false,border:false" id="printDiv" style="padding: 0px; height: 100%;width:100%; overflow-y: hidden;display: none;">
	</div>
  
 表格初始化，因为我们项目的需求，我有区分冻结列和非冻结列：
 
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
 
 用 **$.getTable(print,data,"#printDiv",isnum,listdata,"礼品发放明细",fromTime,toTime);** 

 //给表格添加父级div的id,数据，隐藏层，是否显示行数，列表头的json
 来调用打印表格操作
 
     	for(var j in data.rows){ //获取列明对应的内容
		for(var i in listData){
		   var valtext=listData[i].field;
		   var showtext=data.rows[j][valtext];
		   if(showtext){
			   obtd[j]=obtd[j]+"<td>"+showtext+"</td>"; 
		   }else if(showtext=="0"){
			   obtd[j]=obtd[j]+"<td>0</td>"; 
		   }else{
			   obtd[j]=obtd[j]+"<td> </td>"; 
		   }
		}
		if(isNum){//如果要显示行数
			var num=0;
			num=parseInt(j)+1;

		   count="<td>"+num+"</td>"; 
		}
		 obtr[j]="<tr>"+count+obtd[j]+"</tr>";
		
	}
	
	$("#toTable .tbody").html(obtr.join(""));
	
	var headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';//添加head内容
	var options = {
			mode: "popup",
			popClose: false,
			retainAttr: ['id','class','style'],
			extraHead: headElements
		};
	$("#"+idName+"").printArea(options);//打印
  
  
  具体参照  https://github.com/ivybaby/plug_ins/tree/master/datagrid_print
  转载请注明出处 https://github.com/ivybaby/plug_ins/tree/master/datagrid_print
