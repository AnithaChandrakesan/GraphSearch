function sendRequestCreateNode(param) {
	var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/type?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL;	
	console.log("MY URL IS ",myURL);     
        console.log("param is ",param);
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
                        console.log("done ",data);
		});
}
function sendRequestCreateLinks(param) {
        var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	//var URL = "http://lab.formcept.com:8080/formcept/services/factordb/gs/rel?gdb=crgr&uid=demo&pp=604b8a4dca814ee4b71acfea58ad0da9";
	var myURL = URL;	
	console.log("MY URL IS ",myURL);     
        console.log("param is ",param);
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
                        console.log("done ",data);
		});
}
function sendRequestGetGraph(cb) {
        var URL = "http://analyze.formcept.com/awsem/services/factordb/gs?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL;	
	console.log("MY URL IS ",myURL);     

	$.ajax({
		type: "GET",
		url:myURL,
		success: cb
		}).success(function(url) {
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
                        console.log("done ");
		});
	
}
function sendRequestDeleteNode(param) {
        var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/type?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917&type=";
	var myURL = URL+param;	
	console.log("MY URL IS ",myURL);     
        console.log("param is ",param);
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log(url);	
		}).done(function(url) {
                        console.log("done ",url);
		});
}
function sendRequestDeleteLinks(param1,param2,param3) {
        var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	var myURL = URL+"&stype="+param1+"&ttype="+param2+"&rel="+param3;	
	console.log("MY URL IS ",myURL);     
        //http://analyze.formcept.com/awsem/services/factordb/gs/rel?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917&stype=two&ttype=three&rel=haiiii
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
                        console.log("done ",url);
		});
}
function sendRequestDeleteGraph() {
        var URL = "http://analyze.formcept.com/awsem/services/factordb/gs?gdb=crgr&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	
	var myURL = URL;	
	console.log("MY URL IS ",myURL);     
        
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
			console.log("success data is ",url);
		}).error(function(url) {   
			console.log("error url sent is",url);	
		}).done(function(url) {
                        console.log("done ",url);
		});
}