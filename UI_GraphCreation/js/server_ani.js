
function getGraph(cb,param1,param2) {
       var URL = "http://analyze.formcept.com/awsem/services/factordb/graph?gdb=fbgr&from=";
       URL=URL+param1+"&size="+param2+"&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	console.log("inside getgraph");
	
	$.ajax({
		type: "GET",
		url:URL,
		success: cb
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
              
		});
	
}
function getadjacent(cb,param1) {
       var URL =  "http://analyze.formcept.com/awsem/services/factordb/graph/adj?gdb=fbgr&id=";
       URL=URL+param1+"&uid=test&from=0&size=20&pp=06d81d798ab441dd964a61ff3945a917";
	console.log("inside getgraph");
	$('#loader').show();
	$.ajax({
		type: "GET",
		url:URL,
		success: cb
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
              
		});
	
}

