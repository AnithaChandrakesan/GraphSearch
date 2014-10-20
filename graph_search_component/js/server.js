/*
* Copyright (c) 2011-2012, FORMCEPT [http://www.formcept.com]
* All rights reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of FORMCEPT and its suppliers, if any.
* The intellectual and technical concepts contained
* herein are proprietary to FORMCEPT and its suppliers and
* may be covered by U.S. and Foreign Patents, patents in process,
* and are protected by trade secret or copyright law. Dissemination
* of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from FORMCEPT.
*/
 
var server="http://localhost/formcept/services/";
var viziUrl='http://localhost/vizi/';
server='http://192.168.0.2:8080/formcept/services/';
//viziUrl='http://192.168.0.2:8080/vizi/';

function fcDelete(u,f,p)
{
    var par="";
    
    
    if (p instanceof Object)
       {
           for (var i in p)
           {
              par+=i+"="+encodeURIComponent(p[i])+"&";
           }
           p=par.substring(0,par.length-1);
       }
    else
    {
        if(p.length>0)
            {
                p=p.split('&');
                for(var i=0;i<p.length;i++)
                {
                    var x=p[i].split('=');
                     par+= x[0]+"="+encodeURIComponent(x[1])+"&" ;
                }
                p=par.substring(0,par.length-1);
            }
    }
    
    
    
    //p=encodeURIComponent (p);
    var success=function(){};
    var failure=function(){};
    if(f["success"])
        success=f["success"];
    if(f["failure"])
        failure=f["failure"];
    var asyn=true;
    if( typeof(f.asyn)=="boolean")
    {
        asyn=f.asyn;
    }
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("DELETE",u,asyn);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(f.timeout)
    xmlhttp.timeout=f.timeout;
    xmlhttp.send(p);
    
    if(asyn)
    {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {
                    if(xmlhttp.status>=200 && xmlhttp.status<300)
                        success(xmlhttp.responseText);
                    else
                       failure(xmlhttp.responseText);
                }
             }
    }
    else if(asyn==false)
        success(xmlhttp.responseText);
    return xmlhttp;
    
}








function fcPost(u,f,p)
{
    var par="";
    if (p instanceof Object)
       {
           for (var i in p)
           {
              par+=i+"="+encodeURIComponent(p[i])+"&" 
           }
           p=par.substring(0,par.length-1);
       }
    else
    {
        if(p.length>0)
            {
                p=p.split('&');
                for(var i=0;i<p.length;i++)
                {
                    var x=p[i].split('=');
                     par+= x[0]+"="+encodeURIComponent(x[1])+"&" ;
                }
                p=par.substring(0,par.length-1);
            }
    }
    //p=encodeURIComponent (p);
    var success=function(){};
    var failure=function(){};
    if(f["success"])
        success=f["success"];
    if(f["failure"])
        failure=f["failure"];
    var asyn=true;
    if( typeof(f.asyn)=="boolean")
    {
        asyn=f.asyn;
    }
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",u,asyn);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(f.timeout)
    xmlhttp.timeout=f.timeout;
    xmlhttp.send(p);
    
    if(asyn)
    {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {
                    if(xmlhttp.status>=200 && xmlhttp.status<300)
                            success(xmlhttp.responseText);
                    else
                       failure(xmlhttp.responseText);
                }
             }
    }
    else if(asyn==false)
        success(xmlhttp.responseText);
     return xmlhttp;
    
}


function fcPostRaw(u,f,p,bin)
{

    //p=encodeURIComponent (p);
    var success=function(){};
    var failure=function(){};
    if(f["success"])
        success=f["success"];
    if(f["failure"])
        failure=f["failure"];
    var asyn=true;
    if( typeof(f.asyn)=="boolean")
    {
        asyn=f.asyn;
    }
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",u,asyn);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(f.timeout)
    xmlhttp.timeout=f.timeout;
    if(bin)
    xmlhttp.sendAsBinary(p);
    else
    xmlhttp.send(p);
    
    if(asyn)
    {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {
                    if(xmlhttp.status>=200 && xmlhttp.status<300)
                        success(xmlhttp.responseText,xmlhttp.status);
                    else
                       failure(xmlhttp.responseText,xmlhttp.status);
                }
             }
    }
    else if(asyn==false)
        success(xmlhttp.responseText);
     return xmlhttp;
    
}


function fcGet(u,f)
{
    var success=function(){};
    var failure=function(){};
    if(f["success"])
        success=f["success"];
    if(f["failure"])
        failure=f["failure"];
    var asyn=true;
    if(f.asyn)
        asyn=f.asyn;
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",u,asyn);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4)
        {
            
            if(xmlhttp.status==200)
                success(xmlhttp.responseText,xmlhttp.status);
            else
               failure(xmlhttp.responseText,xmlhttp.status);
        }
     }
    return xmlhttp;
    
}


function fcJSONP(url)
{
var script = document.createElement('script');
script.src = url;

document.getElementsByTagName('head')[0].appendChild(script);
// or document.head.appendChild(script) in modern browsers
}
