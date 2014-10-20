var URL = "http://analyze.formcept.com/awsem/services/factordb";

function CreateDB(param,db) {
        
        console.log("inside create db");
        var param1= 'db=' + db + '&schema=' + JSON.stringify(param) ;
        var myURL =URL+'?uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	console.log("param1",param1);
	console.log("url",myURL);
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
			console.log("success data is ",data);
		}).error(function(data) {   
			console.log("error",data);	
		}).done(function(data) {
                       
		});
}

function Refresh(db) {
        
        console.log("inside refresh");
        var param1='refresh=true' ;
        var myURL =URL+'/sync?db=' + db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	console.log("param1",param1);
	console.log("url",myURL);
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
			console.log("success data is ",data);
		}).error(function(data) {   
			console.log("error",data);	
		}).done(function(data) {
                       
		});
}


function addDataToDB(param,db) {

        var param1='records='+JSON.stringify(param);
        myURL =URL+'/facts?db='+db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	console.log("param1",param1);
	console.log("url",myURL);
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
			console.log("success data is ",data);
			Refresh(db);
		}).error(function(data) {   
			console.log("error",data);	
		}).done(function(data) {
                       
		});
}


function ViewDB(db,cb) { 

        var param='q={"query":{"match_all":{}}, "from":0, "size":30}';
        myURL =URL+'/query?db='+db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	console.log("param",param);
	console.log("url",myURL);
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param,
		success: cb
		}).error(function(data) {   
			console.log("error",data);	
		}).done(function(data) {
                       
		});
}

