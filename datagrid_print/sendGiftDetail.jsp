<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/meta.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctxStatic}/css/print.css" media="print"/>

<script src="${ctxStatic}/js/setTable.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/modules/basicForms/sendGiftDetail${yuicompressor}.js?_=${sysInitTime}" charset="utf-8"></script> 
<script src="${ctxStatic}/js/jquery.PrintArea.js"></script>



<%-- 添加一个div,在ie8编译显示 --%>
<div id="" style="display: none;">查看</div>
<input id="display" value="${display }" type="hidden">
<div class="easyui-layout" fit="true" style="margin: 0px;border: 0px;overflow: hidden;width:100%;height:100%;">
    <div class="hidden-section" data-options="region:'north',split:false,border:false" style="padding: 0px; height: 100%;width:100%; overflow-y: hidden;height:150px;">
        <form id="card_search_form" class="form-List table-padding no-print">
        <table>
        	<tr>
        	   <td><label class="label label-important">商业项目:</label></td>
        	   <td><input id="projid" name="projid" data-options="required:'true'" class="easyui-combobox"/></td>
        	<c:forEach items="${list}" var="item">
        	   <c:if test="${item.columnName == 'cardtype' }">
        	   <td><label class="label">礼品类型:</label></td>
        	   <td><input id="cardtype" name="cardtype" class="easyui-combobox"/></td>
        	</c:if>
        	<c:if test="${item.columnName == 'giftName' }">
	        	   <td><label class="label">礼品名称:</label></td>
	        	   <td><input id="giftName" name="giftName" class="easyui-textbox"/></td>
	        	   
	        	</c:if>
        	</c:forEach>
        	</tr>
        	<tr>
        	<c:forEach items="${list}" var="item">
	        	
	        	<c:if test="${item.columnName == 'sendType' }">
	        	   <td><label class="label">发送形式:</label></td>
	        	   <td><input id="sendType"name="sendType" class="easyui-combobox" data-options="
						valueField: 'label',
						textField: 'value',
						data: [{
							label: '1',
							value: '预约发放'
						},{
							label: '2',
							value: '服务台发放'
						}]" /></td>
					</c:if>
					 <c:if test="${item.columnName == 'servicePointid' }">
               <td><label class="label">服务点:</label></td>
               <td><input id="service" name="servicePointid"  class="easyui-combobox"  placeholder="请选择服务点"/></td>
               </c:if>
               <c:if test="${item.columnName == 'userName' }">
               <td><label class="label">操作人:</label></td>
               <td><input id="userName" name="userName" maxLength="25"  class="textbox eu-input" placeholder='输入姓名'/></td>
               </c:if>
			</c:forEach>
        	</tr>
               <tr>
               <c:forEach items="${list}" var="item">
               <c:if test="${item.columnName == 'memberName' }">
               <td><label class="label">会员信息:</label></td>
               <td><input id="memberName" name="memberName" maxLength="25"  class="textbox eu-input" placeholder='输入手机号或姓名'  onkeydown="if(event.keyCode==13)search()"/></td>
               </c:if>
               <c:if test="${item.columnName == 'sendTime' }">
               <td><label class="label">发送期间:</label></td>
               <td colspan="5">       	
            	   <input class="easyui-datetimebox" id="fromTime" name="fromTime" />
	        	   <span>-</span>
	        	   <input class="easyui-datetimebox"  id="toTime" name="toTime" />
	        	   
	           </td>
	           </c:if>
               </c:forEach>
	           <td colspan="4">
	           &nbsp;&nbsp;
	        	   	<a class="easyui-linkbutton" href="#" data-options="onClick:search,selected:true">查询</a>
                   &nbsp;<a class="easyui-linkbutton" href="#" data-options="onClick:cls">重置</a>
                   &nbsp;<a class="easyui-linkbutton print-link" href="#" data-options="">打印</a>
                   &nbsp;<a class="easyui-linkbutton" href="#" data-options="onClick:exportXls">导出</a>
               </td>
	        </tr>
        </table>
        </form>     
     </div>
    <div data-options="region:'center',split:false,border:false" style="padding: 0px; height: 100%;width:100%; overflow-y: hidden;">
		  <table id="sendCardDetail_datagrid"></table>
	</div>
	
	<!-- 打印 -->
	 <div data-options="region:'center',split:false,border:false" id="printDiv" style="padding: 0px; height: 100%;width:100%; overflow-y: hidden;display: none;">
	</div>
</div>