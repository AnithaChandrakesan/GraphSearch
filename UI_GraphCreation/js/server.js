var URL = "http://analyze.formcept.com/awsem/services/factordb/graph/gs";

function sendRequestCreateNode(param) {
//var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/type?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+'/type?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917';	
	http://analyze.formcept.com/awsem/services/factordb/graph/gs/type?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param
		}).success(function(data) {
			console.log("success data is ",data);
		}).error(function(data) {   
			console.log(data);	
		}).done(function(data) {
                       
		});
}
function sendRequestCreateLinks(param) {
       // var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+"/rel?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param
		}).success(function(data) {
			console.log("success data is ",data);
		}).error(function(data) {   
			console.log(data);	
		}).done(function(data) {
                      
		});
}
function sendRequestGetGraph(cb) {
      //  var URL = "http://analyze.formcept.com/awsem/services/factordb/gs?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+"?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917";	    
	$.ajax({
		type: "GET",
		url:myURL,
		success: cb
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
              
		});
	
}
function sendRequestDeleteNode(param) {
       // var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/type?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917&type=";
	var myURL = URL+"/type?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917&type="+param;	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log(url);	
		}).done(function(url) {

		});
}
function sendRequestDeleteLinks(param1,param2,param3) {
       // var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+"/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917&stype="+param1+"&ttype="+param2+"&rel="+param3;	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
                     
		});
}
function sendRequestDeleteGraph() {
        //var URL = "http://analyze.formcept.com/awsem/services/factordb/gs?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+"?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
                   
		});
}