jQuery.extend({
  //tableName:报表名称,startTime:统计开始时间,entTime:统计结束时间
  getTable:function(idName,data,appendId,isNum,listData,tableName,startTime,endTime){
	var start =  "<tr><th colspan="+listData.length+1+">"+tableName+"-"+new Date().format('yyyy-MM-dd')+"</th></tr>"
				+"<tr><th colspan="+listData.length+1+">开始时间:"+startTime+"&nbsp;&nbsp;结束时间:"+endTime+"</th></tr>";
	otable=$("<div id='"+idName+"'><table id='toTable' class='table'><thead class='thead'>"+start+"<tr id='body'></tr></thead><tbody class='tbody'></toby></table></div>");
	$(appendId).append(otable);
	var ohth="";//thead中每一行的tr
	var obtd=[];//tbody中每一行的td
	
	var obtr=[];//tbody中每一行的tr
	var count='';
	
	if(isNum){//如果当前的需要编号
		ohth+="<th>编号</th>";
    }
	for(var i in listData){
		ohth+="<th>"+listData[i].title+"</th>";
	}
	$("#toTable .thead").children("tr[id='body']").html(ohth);
	
	for(var j in data.rows){
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

	
   },
   //src:图片链接
   getCharts:function(idName,data,appendId){
 
 	ocharts=$("<div id='"+idName+"'></div>");
 	$(appendId).append(ocharts);
 	var osrc=[];
 	
 	
 	for(var j in data.rows){
 		osrc[j]="<div class='charts charts-"+j+"' style='text-align:center'><img src='"+data.rows[j]+"' width='80%' height='80%' /></div>"; 
 	}
 	//alert(data.rows);
 	$("#"+idName+"").html(osrc.join(""));
 	
 	var headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';//添加head内容
 	var options = {
 			mode: "popup",
 			popClose: false,
 			retainAttr: ['id','class','style'],
 			extraHead: headElements
 		};
 	$("#"+idName+"").printArea(options);//打印

 	
    }
   
});