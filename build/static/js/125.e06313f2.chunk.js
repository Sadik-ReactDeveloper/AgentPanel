(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[125],{1233:function(e,t){},1981:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a(14),r=a(16),l=a(15),c=a(0),s=a.n(c),o=a(1079),u=a(1080),m=a(1081),d=a(172),g=a(1084),p=a(786),f=a(789),h=a(787),E=a(785),v=a(799),S=a(169),w=a(171),P=a(1050),b=a(301),z=a(437),N=a(259),D=(a(1051),a(567),a(56)),C=a(919),y=a.n(C),k=a(1231),x=a.n(k),A=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,r=new Array(i),l=0;l<i;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={rowData:[],paginationPageSize:20,currenPageSize:"",getPageSize:"",defaultColDef:{sortable:!0,editable:!0,resizable:!0,suppressMenu:!0},columnDefs:[{headerName:"S.No",valueGetter:"node.rowIndex + 1",field:"node.rowIndex + 1",width:100,filter:!0},{headerName:"Plan Name",field:"planname",width:150,cellRendererFramework:function(e){return s.a.createElement("div",{className:"d-flex align-items-center cursor-pointer"},s.a.createElement("span",null,e.data.planName))}},{headerName:"Description",field:"description",width:150,cellRendererFramework:function(e){return s.a.createElement("div",{className:"d-flex align-items-center cursor-pointer"},s.a.createElement("span",null,x()(e.data.desc)))}},{headerName:"Actions",field:"sortorder",width:250,cellRendererFramework:function(t){return s.a.createElement("div",{className:"actions cursor-pointer"},s.a.createElement(D.b,{render:function(e){var a=e.history;return s.a.createElement(b.a,{className:"mr-50",size:"25px",color:"blue",onClick:function(){return a.push("/app/plans/editCreatedPlan/".concat(t.data._id))}})}}),s.a.createElement(z.a,{size:20,color:"red",onClick:function(){e.runthisfunction(t.data._id)}}))}}]},e.getOptionDataList=function(){S.a.get("/user/infPlanList").then((function(t){var a=t.data;e.setState({rowData:a})}))},e.onGridReady=function(t){e.gridApi=t.api,e.gridColumnApi=t.columnApi,e.setState({currenPageSize:e.gridApi.paginationGetCurrentPage()+1,getPageSize:e.gridApi.paginationGetPageSize(),totalPages:e.gridApi.paginationGetTotalPages()})},e.updateSearchQuery=function(t){e.gridApi.setQuickFilter(t)},e.filterSize=function(t){e.gridApi&&(e.gridApi.paginationSetPageSize(Number(t)),e.setState({currenPageSize:t,getPageSize:t}))},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.getOptionDataList()}},{key:"runthisfunction",value:function(e){var t=this;y()("Do You Want To Delete Permanently","This item will be deleted immediately",{buttons:{cancel:"Cancel",catch:{text:"Delete ",value:"catch"}}}).then((function(a){switch(a){case"cancel":break;case"catch":S.a.delete("/admin/dlt_infPlan/".concat(e)).then((function(e){t.getOptionDataList()}))}}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.rowData,n=t.columnDefs,i=t.defaultColDef;return s.a.createElement(o.a,{className:"app-user-list"},s.a.createElement(u.a,{sm:"12"}),s.a.createElement(u.a,{sm:"12"},s.a.createElement(m.a,null,s.a.createElement(u.a,{sm:"12"}),s.a.createElement(o.a,{className:"m-2"},s.a.createElement(u.a,null,s.a.createElement("h1",{sm:"6",className:"float-left"},"Create Plan List")),s.a.createElement(u.a,{className:""},s.a.createElement(D.b,{render:function(e){var t=e.history;return s.a.createElement(d.a,{className:" btn btn-success float-right",onClick:function(){return t.push("/app/plan/CreatePlan")}},"Create Plan")}}))),s.a.createElement(g.a,null,null===this.state.rowData?null:s.a.createElement("div",{className:"ag-theme-material w-100 my-2 ag-grid-table"},s.a.createElement("div",{className:"d-flex flex-wrap justify-content-between align-items-center"},s.a.createElement("div",{className:"mb-1"},s.a.createElement(p.a,{className:"p-1 ag-dropdown"},s.a.createElement(f.a,{tag:"div"},this.gridApi?this.state.currenPageSize:""*this.state.getPageSize-(this.state.getPageSize-1),"-",this.state.rowData.length-this.state.currenPageSize*this.state.getPageSize>0?this.state.currenPageSize*this.state.getPageSize:this.state.rowData.length," ","of ",this.state.rowData.length,s.a.createElement(N.a,{className:"ml-50",size:15})),s.a.createElement(h.a,{right:!0},s.a.createElement(E.a,{tag:"div",onClick:function(){return e.filterSize(20)}},"20"),s.a.createElement(E.a,{tag:"div",onClick:function(){return e.filterSize(50)}},"50"),s.a.createElement(E.a,{tag:"div",onClick:function(){return e.filterSize(100)}},"100"),s.a.createElement(E.a,{tag:"div",onClick:function(){return e.filterSize(134)}},"134")))),s.a.createElement("div",{className:"d-flex flex-wrap justify-content-between mb-1"},s.a.createElement("div",{className:"table-input mr-1"},s.a.createElement(v.a,{placeholder:"search...",onChange:function(t){return e.updateSearchQuery(t.target.value)},value:this.state.value})),s.a.createElement("div",{className:"export-btn"},s.a.createElement(d.a.Ripple,{color:"primary",onClick:function(){return e.gridApi.exportDataAsCsv()}},"Export as CSV")))),s.a.createElement(w.a.Consumer,null,(function(t){return s.a.createElement(P.AgGridReact,{gridOptions:{},rowSelection:"multiple",defaultColDef:i,columnDefs:n,rowData:a,onGridReady:e.onGridReady,colResizeDefault:"shift",animateRows:!0,floatingFilter:!1,pagination:!0,paginationPageSize:e.state.paginationPageSize,pivotPanelShow:"always",enableRtl:"rtl"===t.state.direction})})))))))}}]),a}(s.a.Component);t.default=A}}]);
//# sourceMappingURL=125.e06313f2.chunk.js.map