var incount=0;
var abrv1=[];
var iswitch=false;
function clear(elementID)
		{
		  
                  document.getElementById(elementID).innerHTML="";
		}
		var value=0;
function addRowSc(tableID) {
 
            var table = document.getElementById(tableID);
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
 
            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.name="chkbox[]";
            cell1.appendChild(element1);
 
            
            var cell3 = row.insertCell(1);
	    var element2 = document.createElement("input");
            element2.type = "text";
            element2.id = "text";
	    element2.name = "txtbox";
            cell3.appendChild(element2);
 
	    
	    console.log("value is ",value);
 
	    var cell4 = row.insertCell(2);
	    var element3 = document.createElement("select");
	    element3.id="select1"+value;
	    console.log("element3.id",element3.id);
	    cell4.appendChild(element3);
	    var keyword = document.createElement("option");
	    document.getElementById(element3.id).options.add(keyword);
	    keyword.text="keyword";
	    var string = document.createElement("option");
	    document.getElementById(element3.id).options.add(string);
	    string.text="string";
	    var booleann = document.createElement("option");
	    document.getElementById(element3.id).options.add(booleann);
	    booleann.text="boolean";
	    var intt= document.createElement("option");
	    document.getElementById(element3.id).options.add(intt);
	    intt.text="int";
	    var longg = document.createElement("option");
	    document.getElementById(element3.id).options.add(longg);
	    longg.text="long";
	    var bigint = document.createElement("option");
	    document.getElementById(element3.id).options.add(bigint);
	    bigint.text="bigint";
	    var floatt = document.createElement("option");
	    document.getElementById(element3.id).options.add(floatt);
	    floatt.text="float";
	    var doublee = document.createElement("option");
	    document.getElementById(element3.id).options.add(doublee);
	    doublee.text="double";
	    var ref = document.createElement("option");
	    document.getElementById(element3.id).options.add(ref);
	    ref.text="ref";
	    var date = document.createElement("option");
	    document.getElementById(element3.id).options.add(date);
	    date.text="date";
	    var uuid = document.createElement("option");
	    document.getElementById(element3.id).options.add(uuid);
	    uuid.text="uuid";
	    var bytes = document.createElement("option");
	    document.getElementById(element3.id).options.add(bytes);
	    bytes.text="bytes";
	    
	    
	    var cell5 = row.insertCell(3);
	    var element4 = document.createElement("select");
	    element4.id="select2"+value;
	    cell5.appendChild(element4);
	    var element7 = document.createElement("option");
	    document.getElementById(element4.id).options.add(element7);
	    element7.text="one";
	    var element9 = document.createElement("option");
	    document.getElementById(element4.id).options.add(element9);
	    element9.text="many";
	    
	    
	    var cell6 = row.insertCell(4);
	    var element5 = document.createElement("select");
	    element5.id="select3"+value;
	    cell6.appendChild(element5);
	    var element8 = document.createElement("option");
	    document.getElementById(element5.id).options.add(element8);
	    element8.text="Default";
	    var Absolute = document.createElement("option");
	    document.getElementById(element5.id).options.add(Absolute);
	    Absolute.text="Absolute";
	    var Prefix = document.createElement("option");
	    document.getElementById(element5.id).options.add(Prefix);
	    Prefix.text="Prefix";
	    var Custom = document.createElement("option");
	    document.getElementById(element5.id).options.add(Custom);
	    Custom.text="custom";
	    
	    value++;
	    console.log("value after incrementing",value);
	    
	    
        }
function deleteRowSc(tableID) {
            try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
 
            for(var i=0; i<rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                if(null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
 
 
            }
            }catch(e) {
                alert(e);
            }
        }
var valuee=0;
var rowCount1;
 var name1=[];var sel11=[];var sel21=[];var sel31=[];
function saveJSON() {
  
    document.getElementById("dataTableDiv").style.visibility = 'hidden';
    document.getElementById("tableGetData").style.visibility = 'visible';
    document.getElementById("update").style.visibility = 'visible';
    document.getElementById("add").style.visibility = 'visible';
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
    rowCount1=rowCount;
    var name=[];var sel1=[];var sel2=[];var sel3=[];
    console.log("rowCount-1",rowCount-1);
   
    var many=0;
   
    for(i=0;i<rowCount-1;i++){
     
     name[i]=table.rows[i+1].cells[1].getElementsByTagName("input")[0].value;
     console.log("name",name,"i  ",i);
     if (i==0) {
     sel1[i]=  document.getElementById("select1").value;
     sel2[i] =document.getElementById("select2").value;
     sel3[i]= document.getElementById("select3").value;
      many=sel2[i];
      if (many=="many") {
	abrv1.push(i);
	iswitch=true;
      }
      console.log("cardi",abrv1);
      console.log("sel1",sel1,"     sel2",sel2,"      sel3",sel3);
     }
    else
    {
     sel1[i]=  document.getElementById("select1"+(i-1)).value;
     sel2[i] =document.getElementById("select2"+(i-1)).value;
     sel3[i]= document.getElementById("select3"+(i-1)).value;
     many=sel2[i];
      if (many=="many") {
	abrv1.push(i);
	iswitch=true;
      }
      console.log("cardi",abrv1);
      console.log("sel1",sel1,"       sel2",sel2,"       sel3",sel3);
    }
    name1=name,sel11=sel1,sel21=sel2,sel31=sel3;
   }
   
  for(i=name.length-1;i>=0;i--)
    {
      var table=document.getElementById("tableGetDataa");
    // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(0);
      
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      // Add some text to the new cells:
      cell1.innerHTML = name[i];
      console.log(valuee);
      cell2.innerHTML = '<input type="text" id="fact'+valuee+'">';
      valuee++;
	  }
     var oldTable= document.getElementById("tableGetDataa");
    var rowCountOld = oldTable.rows.length;
     var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.style.background="brown";
    row.style.color="white";
    row.insertCell(0).innerHTML= 'SELECT';
    
    for(i=0;i<rowCountOld-1;i++)
    {
      console.log("rowCountOld",rowCountOld,"     oldTable.rows[i].cells[0].innerHTML",oldTable.rows[i].cells[0].innerHTML);
       row.insertCell(i+1).innerHTML = oldTable.rows[i].cells[0].innerHTML;      
    }
   
    row.insertCell(rowCountOld).innerHTML='DELETE';

    clear("dataTableDiv");
    clear("createdb");
}
///////////////////////////
function hideDiv() {
     // document.getElementById("Edbname").value = "";
      document.getElementById("update").style.visibility = 'hidden';
      document.getElementById("tableGetData").style.visibility = 'hidden';
      document.getElementById("add").style.visibility = 'hidden';
      document.getElementById("SENDREQUEST").style.visibility = 'hidden';
       clear("Edbname");
     
    document.getElementById("tableData").style.visibility = 'hidden';
    } 
function Edb()
{
  var schema=[];
  console.log("rowcount",rowCount1)
  for(i=0;i<rowCount1-1;i++)
  {
    console.log("name of",i ,"is",name1[i]);
    console.log("sel1 of",i ,"is",sel11[i]);
    console.log("sel2 of",i ,"is",sel21[i]);
    console.log("sel3 of",i ,"is",sel31[i]);
    if (sel31[i]=="Default") {

{
	
	 schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true};
      }
    }
    else if (sel31[i]=="Absolute") {
       schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true,
		":fc/mapping":{":type":":string",":index":":not_analyzed"}};
    }else if (sel31[i]=="Prefix") {
      schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true,
		":fc/mapping":{":type":":string",":analyzer":":simple"}};
    }
  //  console.log("schema",Eschema);
    
  }
console.log("inside Entity db fn");
console.log(schema);
   var db=document.getElementById("Edbname").value;
    CreateDB(schema,db);
}



		
function addRow() {
  
      document.getElementById("tableData").style.visibility = 'visible';
      document.getElementById("SENDREQUEST").style.visibility = 'visible';
    
   var oldTable= document.getElementById("tableGetDataa");
   var rowCountOld = oldTable.rows.length;
    
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    row.insertCell(0).innerHTML= '<input type="radio" name="checkbox" value = "select"  onClick="Javacsript:getDetails(this)"/>';
    
 for(i=0;i<rowCountOld-1;i++)
 {
   
    row.insertCell(i+1).innerHTML = oldTable.rows[i].cells[1].getElementsByTagName("input")[0].value;      
 }
    row.insertCell(rowCountOld).innerHTML='<button  class="btn btn-default" onclick="deleteRow(this)"><span class="glyphicon glyphicon-trash"></span></button> ';

    
     console.log("in add button valueee",valuee);
     for(i=0;i<valuee;i++){
      var calc="fact"+i;
      console.log("calc",calc);
       document.getElementById(calc).value="";
     }
     
      
}
 /////////////////////
 
function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    
    table.deleteRow(index);
    
}
function getDetails(obj) {
      
   var index = obj.parentNode.parentNode.rowIndex;
   incount=index;
    var table= document.getElementById("myTableData");
   console.log("valueeeeeeeee",valuee);
   var vals=valuee,j=1;
   for(i=valuee;i>0;i--){
    var calc="fact"+(vals-1);
      console.log("calc",calc);
      console.log("table.rows[index].cells[i].innerHTML",table.rows[index].cells[j].innerHTML);
   document.getElementById(calc).value=table.rows[index].cells[j].innerHTML;
  vals--;
  j++;
   }
}
function updateDetails() {
   console.log("index",incount);
    var table= document.getElementById("myTableData");
    console.log("valueeeeeeeee",valuee);
   var vals=valuee,j=1;
   for(i=valuee;i>0;i--){
    var calc="fact"+(vals-1);
      console.log("calc",calc);
      console.log("table.rows[index].cells[i].innerHTML",table.rows[incount].cells[j].innerHTML);
table.rows[incount].cells[j].innerHTML= document.getElementById(calc).value;
 vals--;
  j++;
   }
   for(i=0;i<valuee;i++){
      var calc="fact"+i;
      console.log("calc",calc);
       document.getElementById(calc).value="";
     }
}

function AddData()
{
  var Erecords=[];
  var abrv=[];
  db1=document.getElementById("Edbname").value;
   console.log("inside data entity add function");
  var table= document.getElementById("myTableData");
  console.log("length",table.rows.length);
  for(i=1;i<table.rows.length-1;i++)
  {
    var j=1;
    var obj={};
   if (iswitch==false) {

    for(z=0;z<name1.length;z++){
    obj[':item/'+name1[z]] =table.rows[i+1].cells[j].innerHTML;j++;
    }
    Erecords.push(obj);
   }
else{
  
  for(z=0;z<name1.length;z++){
    obj[':item/'+name1[z]] =table.rows[i+1].cells[j].innerHTML;j++;
    
    }
    Erecords.push(obj);
   for(k=0;k<abrv1.length;k++)
    {abrv[i-1] =table.rows[i+1].cells[abrv1[k]+1].innerHTML;
    var res = abrv[i-1].split(",");
    console.log("res",res);
    console.log("name of ",name1[abrv1[k]])
    obj[':item/'+name1[abrv1[k]]] =res;
    }
    }
  }
  console.log("entity records",Erecords);
 addDataToDB(Erecords,db1);
}
function  view() {
  db=document.getElementById("dbname").value;
  document.getElementById("dbname").value="";
  console.log("inside view");
  ViewDB(db,renderData);
}
 var data=[];
 var obj=[];
 
 function renderData(url) {
            console.log("render called");
	    
	    console.log(url);
        var obj = url.response[':hits'];
      console.log("obj",obj);
        var cols = GetHeaders(obj);
       // console.log("cols in renders",cols);

        DBdata(obj,cols);
      
        //console.log("table",table);
    }
 
function DBdata(obj,cols)
    {
        console.log("inside data");
        var table = document.getElementById("GetAvailDataa");
    
    
    
        for (var j = 0; j < obj.length; j++) {
            var rowCount = table.rows.length;
    console.log("rowcount",rowCount);
    var row = table.insertRow(rowCount);
    console.log("row",row);
            var player = obj[j];
            console.log("create table ]",player);
            console.log("j",j);
	    // row.insertCell(0).innerHTML = rowCount;
            for (var k = 0; k < cols.length; k++) {
                var columnName = cols[k];
                console.log("k",k);
                 row.insertCell(k).innerHTML = player[columnName];
                console.log("create table player[columnName]",player[columnName]);
            }
    }
    }
    
    
     function GetHeaders(obj) {
            console.log("get called");
            console.log("obj",obj);
        var cols = new Array();
        var p = obj[0];
        for (var key in p) {
            //console.log("inside for");
            //console.log("p",p);
            //console.log("key",key);
            //alert(' name=' + key + ' value=' + p[key]);
            cols.push(key);
            console.log("cols",cols);
        }
        
        clear("GetAvailDataa");
        console.log("inside header");
        var table = document.getElementById("GetAvailDataa");
	var table1=document.getElementById("GetAvailDataa").createCaption();
	table1.innerHTML="<h3><b>"+db+"</b></h3>"
    var rowCount = table.rows.length;
    console.log("rowcount",rowCount);
    var row = table.insertRow(rowCount);
    row.style.background="brown";
    row.style.color="white";
    console.log("row",row);
   // row.insertCell(0).innerHTML = "S.No";
    for (var i = 0; i < cols.length; i++) {
        row.insertCell(i).innerHTML = cols[i];
        }
        
        return cols;
    }