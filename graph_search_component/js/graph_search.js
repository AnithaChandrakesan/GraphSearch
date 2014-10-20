
function graphSearch(o){
	this.from=0;
	this.size=20;
	this.altMode=false;
	this.recentResult={};
	this.selectedResults=[];
	var parentHolder=eMake('span',[['class','graphSearchHolder']]);
	this.parent=o.parent;
	eInsertAfter(this.parent,parentHolder);
	parentHolder.appendChild(this.parent);
	this.selectedList=eCreate('span',[['class','graphSearchSelected']],parentHolder);
	eMoveToFirst(this.selectedList);
	
	this.parentHolder=parentHolder;
	
	this.url=o.url;
	this.text=this.text_old=this.parent.value;
	this.parent.addEventListener('keyup',function(ob){
		
		return function(event){
			
			if(event.keyCode==40)
			{
				ob.highlight(1);
				return;
			}
			else if(event.keyCode==38)
			{
				ob.highlight(-1);
				return;
			}
			else if(event.keyCode==27)
			{
				ob.clearResults();
				return;
			}
			else if(event.keyCode==13){
				
				if(event.ctrlKey)
				{
					ob.selectResult(ob.highlightIdx);
					
					//alert('selected');
					return;
				}
				if(ob.altMode)
				  ob.selectResult(ob.highlightIdx);
				else
				{
				  ob.selectResult(ob.highlightIdx,true);
				  ob.onSearch(ob.selectedResults[ob.selectedResults.length-1]);
				} 
				
				ob.clearResults();
				return;
			}
			ob.text=ob.parent.value;
			 
			if(event.keyCode==8 && ob.text=='')
			{
				
				ob.rollBack();
				return;
			}
			 if(ob.text_old!=ob.text)
			  {
				if(ob.altMode)
				{
				ob.altMode=false;
				ob.selectedResults.pop();
				}
				ob.getResult();
			  }
			ob.text_old=ob.text;
			
			
		}
		
		}(this));
	//graphSearchHolder_focus
	this.parent.addEventListener('focus',function(ob){
		
		return function(){
			eAddClass(ob.parentHolder,'graphSearchHolder_focus');
			
			//ob.checkNshowResults();
			
		}
		}(this));
	this.parent.addEventListener('blur',function(ob){
		
		return function(){
			eRemoveClass(ob.parentHolder,'graphSearchHolder_focus');
		}
		}(this));
	this.searchList=eCreate('div',[['class','graphSearchList']],eGet());
	this.latestXMLHttp='';
	this.latestResults={};
	this.latestResultsMode=false;
	window.addEventListener('resize',function(ob){
		
		return function(){
			ob.searchListPos();
		}
		
		}(this));
	
	
	this.highlightIdx=0;
	this.resetWidth();
	this.loading='<div class="graphSearchLoading">'+'Loading'+'</div>';
	this.onSearch=function(a){};
	
	if(o.onSearch)
		this.onSearch=o.onSearch;
}

graphSearch.prototype.reset=function(){
	eClear(this.searchList);
	this.altMode=false;
	this.highlightIdx=0;
	this.resetWidth();
	this.recentResult={};
	this.selectedResults=[];
	this.latestXMLHttp='';
	this.latestXMLHttp_alternate='';
	this.latestResults={};
	this.latestResultsMode=false;
	this.from=0;
	this.size=20;
}
graphSearch.prototype.resetWidth=function(i){
	var wS=0;
	
	wS+=Math.ceil(parseFloat(eGetStyle(this.selectedList,'width')));
	if(isNaN(wS))
	wS=0;
//	//console.log(wS);
	var wF=parseInt(eGetStyle(this.parentHolder,'width'));
	this.parent.style.width=(wF-wS)+'px';
	
}
graphSearch.prototype.searchListPos=function(){
	this.searchList.style.display='inline-block';
	var offs=eGetOffsets(this.parentHolder);
	var h=eGetFullHeight(this.parentHolder);
	var w=eGetFullWidth (this.parentHolder);
	this.searchList.style.top=(h+offs[1])+'px';
	this.searchList.style.left=offs[0]+'px';
	this.searchList.style.width=w+'px';
}
graphSearch.prototype.getMoreResult=function(){
	var self=this;
	this.from+=this.size;
	this.size=this.size;
	this.latestXMLHttp=fcPost(this.url+'&from='+this.from+'&size='+this.size,{success:function(a){
		self.latestResults=JSON.parse(a);
		//self.latestResultsMode=JSON.parse(JSON.stringify(self.altMode));
		self.showResults(true);
		
		}},this.lastParam);
	
}
graphSearch.prototype.getResult=function(){
  
 // //console.log('getting results');
 
 this.from=0;
 this.size=20;
  var self=this;
  this.searchListPos();
	
  var p='';
  if(!this.altMode)
  p+='q='+this.text;
  
  if(this.selectedResults.length>0)
  {
  var pq=this.selectedResults[this.selectedResults.length-1];
  p+='&pq='+JSON.stringify(pq);
  }
 // //console.log(p);
  this.clearResults();
  if(this.latestXMLHttp!='')
	this.latestXMLHttp.abort();
	this.searchList.innerHTML=this.loading;
	this.lastParam=p;
	this.latestXMLHttp=fcPost(this.url+'&from='+this.from+'&size='+this.size,{success:function(a){
	self.latestResults=JSON.parse(a);
	//self.latestResultsMode=JSON.parse(JSON.stringify(self.altMode));
	self.showResults();
		
		}},p);
}
graphSearch.prototype.showResults=function(add){
	
	this.highlightIdx=0;
	var self=this;
	var j=this.latestResults.response ;
	var searchList=this.searchList;
	this.searchListNodes=[];
	if(add==undefined)
	this.clearResults();
	eListDo(j,function(d,i){
		
		var ele=eCreate('div',[['class','graphSearchResult']],self.searchList);
		ele.addEventListener('mousemove',function(obj,i){
			
			return function(event){
				
				var ofs=i-obj.highlightIdx;
				obj.highlight(ofs,true);
			}
			
			
			}(self,i));
		var ele2=eCreate('div',[['class','graphSearchResult_q']],ele,'<span>'+d.q+'</span>');
		//var qType=eCreate('div',[['class','graphSearchResult_type']],ele);
		if(d.qe && d.qe[d.qe.length-1].ttype)
			eCreate('div',[['class','graphSearchResult_ttype']],ele2,d.qe[d.qe.length-1].ttype);
		else
			eCreate('button',[['class','graphSearchResult_search']],ele).addEventListener('click',function(ob,idx){
				
				return function(event){
					////console.log(ob.altMode);
					if(ob.altMode)
						ob.selectResult(idx);
					else
					{
					  ob.selectResult(idx,true);
					  ob.onSearch(ob.selectedResults[ob.selectedResults.length-1]);
					} 
					//
					ob.clearResults();
					//return;
					event.stopPropagation();
				}
				
				}(self,i));
			
		eCreate('div',[['class','graphSearchResult_type']],ele,d.type);
		ele.addEventListener('click',function(ob,i){
			
			return function(){
				
				ob.selectResult(i);
				
				
			}
			}(self,i));
		self.searchListNodes.push({dom:ele});
		});
	if(eSel('.graphSearchResult_showMore')!=null)
	eDelete(eSel('.graphSearchResult_showMore'));
	if(j.length>0)
	{
	//eCreate('button',[['class','graphSearchResult_showMore buttonType1']],self.searchList,'Show More').addEventListener('click',function(ob){
	//	
	//	return function(){
	//		
	//		ob.getMoreResult();
	//	}
	//	
	//	}(this));
	}
	else
	{
		if(self.altMode)
		self.onSearch(self.selectedResults[self.selectedResults.length-1]);
	}
	this.searchListPos();
	if(add==undefined)
	this.highlight(0);
}
graphSearch.prototype.selectResult=function(i,dontSearch){
	////console.log('normal sel');
	var j=this.latestResults.response[i];
	this.selectedResults.push(j);
	this.recentResult=j;
	var resText=j.q;
	resText=resText.substring(this.selectedList.innerHTML.length);
	this.parent.value=resText;
	if(this.altMode)
	{
	  this.selectedList.innerHTML=j.q;
	  this.parent.value='';
	  this.parent.placeholder=j.qe[j.qe.length-1].ttype;
	}
	this.text=this.parent.value;
	this.text_old=this.text;
	
	////console.log(this.altMode)
	if(this.altMode)
	this.altMode=false;
	else
	this.altMode=true;
	////console.log(this.altMode)
	if(dontSearch==undefined)
	this.getResult();
	//this.clearResults();
	this.resetWidth();
}

graphSearch.prototype.clearResults=function(){
	eClear(this.searchList);
	
}
graphSearch.prototype.highlight=function(x,noscroll){
	if(this.searchListNodes.length==0)
	return;
	this.highlightIdx+=x;
	if(this.highlightIdx<0)
	{
		this.highlightIdx=this.searchListNodes.length-1;
	}
	if(this.highlightIdx>=this.searchListNodes.length)
	{
		this.highlightIdx=0;
	}
	if(eSel('.graphSearchResultHighlight')!=null)
		eRemoveClass(eSel('.graphSearchResultHighlight'),'graphSearchResultHighlight');
	
	var sh=0;
	for(var i=0;i<this.highlightIdx;i++)
		sh+=eGetFullHeight(this.searchList.childNodes[i]);
	if(noscroll==undefined || noscroll==false)
	this.searchList.scrollTop=sh;
	eAddClass(this.searchList.childNodes[this.highlightIdx],'graphSearchResultHighlight');
	this.parent.focus();
	
}
graphSearch.prototype.rollBack=function(){
  
 // //console.log('need to roll back');
  this.selectedResults.pop();
  if(this.altMode)
	this.altMode=false;
  else
	this.altMode=true;
	
	
	if(this.selectedResults.length==0)
	{
		this.parent.value=this.selectedList.innerHTML;
		this.selectedList.innerHTML='';
		this.parent.placeholder='Player, Team, Trophy, Ground, Event';
		return;
	}
	var j=this.selectedResults[this.selectedResults.length-1];
	
	this.selectedList.innerHTML=j.q;
	if(j.qe[j.qe.length-1].ttype)
	this.parent.placeholder=j.qe[j.qe.length-1].ttype;
	else
	this.parent.placeholder='';
	
	
	this.getResult();
	this.resetWidth();
	//if(!this.altMode)
	//this.parent.value='alt';
	////console.log(j);
	//else
	
	//if(this.selectedResults.length==0)
	//return;
	//var j=this.selectedResults[this.selectedResults.length-1];
	//
	//var resText=j.q;
	//resText=resText.substring(this.selectedList.innerHTML.length);
	//this.parent.value=resText;
	//if(this.altMode)
	//{
	//  this.selectedList.innerHTML=j.q;
	//  this.parent.value='';
	//  this.parent.placeholder=j.qe[j.qe.length-1].ttype;
	//}
	//this.text=this.parent.value;
	//this.text_old=this.text;
}