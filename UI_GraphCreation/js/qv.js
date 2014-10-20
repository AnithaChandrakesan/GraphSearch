var currentPageEnd = 0;
var totalRecords = 0;

var qvApp = angular.module("fc-qv",[]);

//============================ VIEW TO USE IN REQUEST ====================
var VIEW_TO_USE = 'qad';
//=========================END VIEW TO USE IN REQUEST ====================

qvApp.controller('fcQvController', ['$scope', '$compile', function($scope, $compile) {
}]);

setFcApp(qvApp);


function nextPageClicked() {
	var provider = fcDataProviderFactory.getProviderByName("FcQVDataProvider");
	provider.gotoPage(currentPageEnd);
}

function prevPageClicked() {
	var provider = fcDataProviderFactory.getProviderByName("FcQVDataProvider");
	currentPageEnd = currentPageEnd -20;
	if(currentPageEnd < 0) {
		currentPageEnd = 0;
	}
	provider.gotoPage(currentPageEnd);
}

function showProgress() {
	var div = document.getElementById('progress_div');
	if(div == null) {
		return;
	}
	div.style.visibility = 'visible';
}

function hideProgress() {
	var div = document.getElementById('progress_div');
	div.style.visibility = 'hidden';
}

function updatePageCounter(start, end, total) {

	//Update button status as well.
	if(end == total) {
		document.getElementById("nextButton").disabled = true;
	}
	else  {
		document.getElementById("nextButton").disabled = false;
	}

	if(start == 1) {
		document.getElementById("prevButton").disabled = true;
	}
	else  {
		document.getElementById("prevButton").disabled = false;
	}


	var span = document.getElementById('page_start');
	while(span.firstChild != null) {
		span.removeChild(span.firstChild);
	}
	span.appendChild(document.createTextNode(start+""));

	span = document.getElementById('page_end');
	while(span.firstChild != null) {
		span.removeChild(span.firstChild);
	}
	span.appendChild(document.createTextNode(end+""));

	span = document.getElementById('all_records');
	while(span.firstChild != null) {
		span.removeChild(span.firstChild);
	}
	span.appendChild(document.createTextNode(total+""));
}

//fcDataProviderFactory.dispatchDataChangeEvent(dummyDataProvider.providerName,streamData);

queryDataProvider = function(pname, attr, factory) {
	return {
		initialDataAvailable : false,
		initialData : [],
		initialDataConsumers : [],
		request : null,
		providerName : null,

		gotoPage :  function(pageStart) {
			request['from'] = pageStart;
			request['size'] = 10;

			//DataSet change 
			var callback = function(data, thisInstance) {
				fcDataProviderFactory.dispatchDatasetChangeEvent(thisInstance.providerName,data);
				totalRecords = data[':total'];
				updatePageCounter(currentPageEnd+1, data[':hits'].length + currentPageEnd, data[':total']);
				currentPageEnd += data[':hits'].length;
			};

			var getCallBack = function(thisInstance) {
				return function(data) {
					hideProgress();
					callback(data, thisInstance);
				}
			};

			var errorCallback = function(data) {
				hideProgress();
				alert("There was an error retrieving the records.\n"+JSON.stringify(data));
			};
			sendRequest(request, getCallBack(this), VIEW_TO_USE, errorCallback);
			showProgress();
		},
		initialize : function(p_provider) {
			this.providerName = p_provider;

			//Provider your request object here.

			//============== SAMPLE REQUEST OBJECT =========================
			request = {"query" : {"match_all" : {}}};
			//============== END SAMPLE REQUEST OBJECT =========================

			var callback = function(data, thisInstance) {

				thisInstance.initialDataAvailable =  true;
				var len = thisInstance.initialDataConsumers.length;
				for(var i=0;i<len;i++) {
					thisInstance.initialDataConsumers[i](data);
				}

				//Update the currentpage details.
				totalRecords = data[':total'];
				updatePageCounter(currentPageEnd+1, data[':hits'].length + currentPageEnd, data[':total']);
				currentPageEnd += data[':hits'].length;
				
				thisInstance.initialDataConsumers = [];

			}
			var getCallBack = function(thisInstance) {
				return function(data) {
					hideProgress();
					callback(data, thisInstance)
				window.setTimeout(function() {
					document.getElementById('page_info').style.visibility = 'visible';
				});
				};
			};

			var errorCallback = function(data) {
					hideProgress();
				alert("There was an error retrieving the records.\n"+JSON.stringify(data));
			};
			sendRequest(request, getCallBack(this), VIEW_TO_USE,errorCallback);
			showProgress();
		},

		requestInitialData : function(callback) {
			//Send request and make the data available.
			if(this.initialDataAvailable) {
				callback(this.initialData);
			}
			else {
				this.initialDataConsumers[this.initialDataConsumers.length] = callback;
			}
		},
	}
	
};

qvApp.directive('fcQv',function() {
	return {
		scope : true,
		restrict : 'E',
		replace:true,
		template : '<div class="qv_container"></div>',
		link : function(scope, ele, attrs) {

			//======================== FIELDS TO SKIP ==========================
			var skipFields = ["fc/id"];
			//===================== END FIELDS TO SKIP ==========================

			//Function renderThe blankTable
			var div = ele[0];

			var initialDataCallback = function(data) {
				createTableAndRowsFor(data, div, skipFields);
			};

			var datasetChangeCallback = function(data) {
				var table = $(div).children("table")[0];
				clearTableRecords(table);
				addRecordsToTable(data[':hits'], table);
			};
			fcDataProviderFactory.registerConsumer("FcQVDataProvider", {
							consumerId : "FcQVDataProviderConsumer",
							datasetChangeCallback : datasetChangeCallback,
							initialDataCallback : initialDataCallback});
		},
		controller :  function($scope) {
		}
	};
});

function createTableAndRowsFor(data, container, skipFields) {
	var data = data[':hits'];
	var len = data.length;

	//Get the header
	var headers = [];
	var d = data[0];
	for(var key in d) {
		var skip= false;
		for(var i=0;i<skipFields.length;i++) {
			if(skipFields[i] == key) {
				skip = true;
			}
		}
		if(skip) {	
			continue;
		}
		headers[headers.length] = key;
	}

	var table = document.createElement('table');
	table.setAttribute('align','center');
	container.appendChild(table);


	//Render the header.
	var tr = document.createElement('tr');
	table.appendChild(tr);
	tr.setAttribute('class','qvRow header');
	var hlen = headers.length;
	for(var j=0;j<hlen;j++) {
		var span = document.createElement('td');
		span.setAttribute('class','qvCell');
		tr.appendChild(span);
		span.appendChild(document.createTextNode(headers[j]));
	}

	table.setAttribute('style','width:'+(hlen * 100 )+'px');
	table.setAttribute('headers', JSON.stringify(headers));
	addRecordsToTable(data, table);
}

function clearTableRecords(table) {
	$('.records').remove();
}

function addRecordsToTable(data, table) {

	//Clear any existing records.


	var headers = JSON.parse(table.getAttribute('headers'));
	var len = data.length;
	for(var i=0;i<len;i++) {
		var d = data[i];
		var div = document.createElement('tr');
		table.appendChild(div);
		div.setAttribute('class','qvRow records');

		var hlen = headers.length;
		for(var j=0;j<hlen;j++) {
			var span = document.createElement('td');
			span.setAttribute('class','qvCell');
			div.appendChild(span);
			var val = d[headers[j]]
			if(typeof val === "undefined") {
				val = "";
			}
			span.setAttribute("nowrap", true);
			span.appendChild(document.createTextNode(val));
			//div.setAttribute('style','width:'+(hlen * 100 )+'px');
		}

	}
}


//Register the data provider
fcDataProviderFactory.registerProviderInstanceByName("queryDataProvider","FcQVDataProvider" , {});
