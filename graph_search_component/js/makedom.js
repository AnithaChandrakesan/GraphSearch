// Development Mode
function eText(t)//parses html to text
{
    t+="";
    t=t.trim();
    t=t.replace(/</g,"&lt;");
    t=t.replace(/>/g,"&gt;");
    return t;
}
function eCreate( type,att,parent,inn )
{
    var e=document.createElement( type );
	
    if( inn==undefined )
	{
		
        inn="";
	}
	if(inn!='')
    e.innerHTML=inn;
    for( var i=0;i<att.length;i++ )
    e.setAttribute( att[i][0],att[i][1] );
    parent.appendChild( e );
    return e;
}
function eMake( type,att,inn )
{
    var e=document.createElement( type );
    if( inn==undefined )
        inn="";
    e.innerHTML=inn;
    for( var i=0;i<att.length;i++ )
    e.setAttribute( att[i][0],att[i][1] );
    return e;
}
function eGet( id )
{
    if( id==undefined )
        return document.body;
    else
        return document.getElementById( id );
}

function eSel( q , e )
{
	if(e==undefined)
		e=document;
	return e.querySelector(q);
}

function eSelAll( q , e )
{
	if( e==undefined )
		e=document;
	return e.querySelectorAll(q);
}

function eGetAtt( e,att )
{
    return e.getAttribute( att );    
}
function eUpdateAtts( e,att )
{
    for( var i=0;i<att.length;i++ )
    e.setAttribute( att[i][0],att[i][1] );
}
function eClearId( id )
{
    var i= document.getElementById( id );
    if ( i.hasChildNodes() )
        while ( i.childNodes.length >= 1 )
            i.removeChild( i.firstChild );
    return i;
}
function eClear( i )
{
    if ( i.hasChildNodes() )
        while ( i.childNodes.length >= 1 )
            i.removeChild( i.firstChild );
    return i;
}
function eDelete( i )
{
    i.parentNode.removeChild( i );
}
function eCreatefromOBJ( obj,par )
{
    var e=document.createElement( obj.type );
    if(obj.innerHTML)
        e.innerHTML=obj.innerHTML;
    for( var i in obj.attrib )
        e.setAttribute( i,obj.attrib[i] );
    if(obj.child)
        for( var i=0;i<obj.child.length;i++ )
            eCreatefromOBJ( obj.child[i],e );
    if( par=="" )
        par=document.body;
    par.appendChild( e );
}
function eChangeClass(matchClass,targetClass)
    {
   var elems = document.getElementsByClassName(matchClass);
    for (var i=elems.length-1;i>=0;i--)
    {
   
        elems[i].className=targetClass;
        
    }
    }
function addclass(e,c)
{
    var i=e.getAttribute('class');
    if(i.indexOf(c) == -1)
    {
        i=i+" "+c;
    e.setAttribute('class',i);
    }
}
function removeclass(e,c)
{
    var i=e.getAttribute('class');
    var j=i.indexOf(c);
    if(j != -1)
       {
        i=i.substring(0,j)+i.substring(j+c.length);
       }
    e.setAttribute('class',i);
}
function eAddClass(e,c)
{
    var i;
    if(e.getAttribute('class'))
    {
	i=e.getAttribute('class');
	
	if(i.indexOf(c) == -1)
	{
	i=i+" "+c;
	e.setAttribute('class',i);
	}
    }
    else
    {
	e.setAttribute('class',c);
    }
}
function eRemoveClass(e,c)
{
    var i=e.getAttribute('class');
    if(i==null)
    return;
    var j=i.indexOf(c);
    if(j != -1)
       {
        i=i.substring(0,j)+i.substring(j+c.length);
       }
    e.setAttribute('class',i);
}
function eGetChild(p,c)
{
    var pc = p.childNodes;
    for(var i = 0; i < pc.length; i++)
    {
        if(pc[i].getAttribute('name') == c)
        {
            return pc[i];
            break;
        }
    }
}
function eGetStyleID(el,styleProp)
{
	var x = document.getElementById(el);
	if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	else if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	return y;
}
function eGetStyle(el,styleProp)
{
	var x = el;
	if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	else if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	return y;
}
function mergeJson( obj1 , obj2 )
{
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function eInsertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function eInsertBefore( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function eMoveToLast(e)
{
	var p=e.parentNode;
	var l=p.childNodes;
	if(l[l.length-1]==e)
	{
	   
		return;
	}
	for(var i=0;i<l.length;i++)
	{
		if(l[i]==e)
			p.appendChild(e);
	}
}
function eMoveToFirst(e)
{
	var p=e.parentNode;
	var l=p.childNodes;
	if(l[0]==e)
	{
	   
		return;
	}
	for(var i=0;i<l.length;i++)
	{
		if(l[i]==e)
		{
			eInsertBefore(p.firstChild,e);
		}
	}
}
function eInpsSelectAll(e)
{
    e.addEventListener('focus',function(){
	
	    this.focus();
	    this.select();
	});


}
function eGetFullHeight(e,mar)
{
    var h=0;
    h+=parseInt(eGetStyle(e,'height'));
    h+=parseInt(eGetStyle(e,'padding-top'));
    h+=parseInt(eGetStyle(e,'padding-bottom'));
    if(mar)
    {
	h+=parseInt(eGetStyle(e,'margin-top'));
	h+=parseInt(eGetStyle(e,'margin-bottom'));
    }
    h+=parseInt(eGetStyle(e,'border-bottom-width'));
    h+=parseInt(eGetStyle(e,'border-top-width'));
    return h;

}

function eGetFullWidth(e,mar)
{
    var w=0;
    w+=parseInt(eGetStyle(e,'width'));
    w+=parseInt(eGetStyle(e,'padding-left'));
    w+=parseInt(eGetStyle(e,'padding-right'));
    if(mar)
    {
	w+=parseInt(eGetStyle(e,'margin-left'));
	w+=parseInt(eGetStyle(e,'margin-right'));
    }
    w+=parseInt(eGetStyle(e,'border-left-width'));
    w+=parseInt(eGetStyle(e,'border-right-width'));
    return w;

}


function eGetExtraHeight(e)
{
    var h=0;
    h+=parseInt(eGetStyle(e,'padding-top'));
    h+=parseInt(eGetStyle(e,'padding-bottom'));
    h+=parseInt(eGetStyle(e,'margin-top'));
    h+=parseInt(eGetStyle(e,'margin-bottom'));
    h+=parseInt(eGetStyle(e,'border-bottom-width'));
    h+=parseInt(eGetStyle(e,'border-top-width'));
    return h;
}

function eGetOffsets(element,s)
{
    var top = 0, left = 0;
    var el=element;
    do {
        top += el.offsetTop  || 0;
        left += el.offsetLeft || 0;
		
		//if(el!=null && el.scrollTop==0)
		////console.log(el.scrollTop)
		
        el = el.offsetParent;
		
    } while(el);
    if(s!=undefined)
    {
	do {
	    if(element==eGet())
	    {
	   // alert('body');
	    //alert(element.scrollTop+" "+top+" "+element.innerHTML)
	    }
	    else if(element.scrollTop)
	    {
		//alert(element.scrollTop+" "+top+" "+element.innerHTML)
		////console.log(element.scrollTop)
	    top -=element.scrollTop;
	    left -=element.scrollLeft;
	    }
	    element = element.parentNode;
	}while(element) ;
	
    }
    

    return [left,top];
};


//function eGetOffsets2(e)
//{
//    function getX(e)
//    {
//	var x=0;
//	if(e.offsetLeft)
//		x=e.offsetLeft;
//	if(e.parentNode)
//	    {
//			
//			
//			var p=e.parentNode;
//			if(p.scrollLeft)
//				x-=p.scrollLeft;
//			var s=eGetStyle(p,'position')
//			if(p==eGet())	
//				x+=getX(p)
//			else 
//			{
//				if(p.parentNode)
//					x+=getX(p.parentNode);
//			}
//			
//		}
//	return x;
//    }
//	
//    function getY(e)
//    {
//	var x=0;
//	if(e.offsetTop)	
//		x=e.offsetTop;
//	if(e.parentNode)
//		{
//			
//			
//			var p=e.parentNode;
//			if(p.scrollTop)
//				x-=p.scrollTop;
//			
//			var s=eGetStyle(p,'position');
//			if(p==eGet())
//				x+=getY(p);
//			else
//			{
//				if(p.parentNode)
//					x+=getY(p.parentNode);
//			}
//			
//		}
//
//	return x;
//    }
//
//
//    return [getX(e),getY(e)];
//    
//    
//    
//}

function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function eStripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function eAnimate(e,o)
{
	var r=o.range;
	var t=o.time*1000;
	var p=o.property;
	var fr=o.frames;
	var pType="";
	var rp=false;
        var addPX=true;
	if(o.removeProp && o.removeProp==1)
		rp=true;
	
	if(p.match(/color/gi) && p.match(/color/gi).length>0)
		pType='color';
        else if(p=='opacity')
            addPX=false;
	else 
	    pType=p;
	var rangeArray=[];
	if(pType=='color')
	{
		var i=rgbToArray(r[0]); //initial
		var f=rgbToArray(r[1]); //final
		
		var s=[(f[0]-i[0])/fr,(f[1]-i[1])/fr,(f[2]-i[2])/fr]; //steps
		for(var a=0;a<=fr;a++)
		{
			rangeArray.push('rgb('
			+parseInt(a*s[0]+i[0])+","
			+parseInt(a*s[1]+i[1])+","
			+parseInt(a*s[2]+i[2])+")");
		}
		
	}
	else
	{
	    var l=(r[1]-r[0])/fr;
	    for(var a=0;a<=fr;a++)
		{
                    if(addPX)
		    rangeArray.push((r[0]+a*l)+"px");
                    else
                    rangeArray.push((r[0]+a*l));
		}
	    //alert(rangeArray);
	    //return;
	}
	var c=0;
	var inter=setInterval(function()
						  {
							e.style[p]=rangeArray[c];
							////console.log(rangeArray[c]);
							c++;
							if(c>=rangeArray.length)
							{
								window.clearInterval(inter);
								if(rp)
								{
									e.style.removeProperty(eToCss(p));
									
								}
							}
						  },t/fr)
	
}

function rgbToArray(c)
{
	c=c.substring(4,c.length-1);
	c=c.split(',');
	for(var i in c)
	c[i]=parseFloat(c[i]);
	return c;
}

function eToCss(p)
{
	var uc=[];
	for(var i=0;i<p.length;i++)
	{
		if(p[i].toUpperCase()==p[i])
			uc.push(i);
	}
	for(var i=uc.length-1;i>=0;i--)
	{

		p=p.substring(0,uc[i])+"-"+p[uc[i]].toLowerCase()+p.substring(uc[i]+1);
	}
	//alert(p);
	return p;
}
function eGetScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};

function eShowHide(e)
{
  if(eGetStyle(e,'display')!="none")
      e.style.display="none";
  else
      e.style.display="block";
}




eContinous=function(e,f,i)//element function interval
{
    //this.timer;
    var t=this.timer;
    e.addEventListener('mousedown',f);
    e.addEventListener('mousedown',function(){
        
        window.clearInterval(t);
        t=setInterval(f,i);
        
        
        });
    
    e.addEventListener('mouseup',function(){
        
        window.clearInterval(t);
        
        
        });
    
    e.addEventListener('mouseout',function(){
        
        window.clearInterval(t);
        
        
        });
    
}
function eWatermark(e,t){
    if (e.value.length > 0){
      if (e.value == t)
        e.value = '';
    }
    else
      e.value = t;
}

function eListDo(obj,fun){
	
	var t=Object.prototype.toString.call(obj);
	var c=0;
	if(t=='[object Array]')
	{
		for(var i=0;i<obj.length;i++)
		{
			fun(obj[i],i);
		}
	}
	else{
		for(var i in obj)
		{
			fun(obj[i],i,c);
			c++;
		}
	}
	
}
function eLength(obj){
	var t=Object.prototype.toString.call(obj);
	if(t=='[object Array]')
	return obj.length;
	else
	{
		var c=0;
		for(var i in obj)
		c++;
		return c;
	}
}

//eListDo(['s']);


function eCategorize(a,id,ar){
  var uniq={};
  var arr=[];
  eListDo(a,function(d,i){
	
	var u=d[id];
	if(uniq[u]==undefined)
	uniq[u]=[];
	uniq[u].push(d);
	});
  if(ar!=undefined && ar==true)
  {
	eListDo(uniq,function(d,i){
		
		arr.push(d);
		
		});
	return arr;
  }
  return uniq;
}

function eFilter(a,id,val){
  var fil=[];
  eListDo(a,function(d,i){
	
	if(d[id]==val)
	fil.push(d);
	});
  return fil;
}