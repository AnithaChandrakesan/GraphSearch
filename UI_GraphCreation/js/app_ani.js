

var App = angular.module("GS",[  ]);

App.controller("GSCtrl",function  ($scope)
{
	var source,target;
	selected_node = null,
	selected_link = null,
	mousedown_link = null,
	mousedown_node = null,
	mouseup_node = null;
	var lastNodeId=1;
	
	

	var json,id=0,count=0;
	var datas=[];
	
	
	//Function to get the whole graph at each updates
	var getalll = function()
	
	{ 
	    getGraph(callBack,0,10);
	}
	//Function to get the whole graph
	$scope.getall=function()
	{ 
	   getGraph(callBack,0,10);
	}
	
	//Function to get the datas from the server
	var callBack = function(url)
	{
		var comments_replies = 0,
            post_published=1,
            likes_count_fb=2,
            comments_all=3,
            type=4,
            post_id=5,
            type_post=6,
            shares=7,
            _type=8,
            id=9,
            likes=10,
            post_link=11,
            comments_base=12,
            post_published_unix=13,
            comment_likes=14,
            engagement=15
            
            eid=16,
            //elabel=17,
            //etype=18,
            //eweight=19,
            source=20,
            target=21;
            
            
            
	    
	    try
	    
		{   lastNodeId=1;
		    $scope.types = [];
		    $scope.rels = [];
		    json = $.parseJSON(url);
			for(count=0;count<json.response.graph.vertices.length;count++)
			{
				
				 var color ="#DF7E13";
				 datas[comments_replies]=json.response.graph.vertices[count].comments_replies;
                                    datas[post_published]=json.response.graph.vertices[count].post_published;
                                    datas[likes_count_fb]=json.response.graph.vertices[count].likes_count_fb;
                                    datas[comments_all]=json.response.graph.vertices[count].comments_all;
                                    datas[type]=json.response.graph.vertices[count].type;
                                    datas[post_id]=json.response.graph.vertices[count].post_id;
                                    datas[type_post]=json.response.graph.vertices[count].type_post;
                                    datas[shares]=json.response.graph.vertices[count].shares;
                                    datas[_type]=json.response.graph.vertices[count]._type;
                                    datas[id]=json.response.graph.vertices[count]._id;
                                    datas[likes]=json.response.graph.vertices[count].likes;
                                    datas[post_link]=json.response.graph.vertices[count].post_link;
                                    datas[comments_base]=json.response.graph.vertices[count].comments_base;
                                    datas[post_published_unix]=json.response.graph.vertices[count].post_published_unix;
                                    datas[comment_likes]=json.response.graph.vertices[count].comment_likes;
                                    datas[engagement]=json.response.graph.vertices[count].engagement;
				    
				     $scope.types.push({
                                                   id:datas[id],
                                                comments_replies :datas[comments_replies],
                                                post_published: datas[post_published],
                                                likes_count_fb:datas[likes_count_fb],
                                                comments_all:datas[comments_all],
                                                type:datas[type],
                                                post_id:datas[post_id],
                                                type_post :datas[type_post],
                                                shares:datas[shares],
                                                _type:datas[_type],
                                               // id:datas[id],
                                                label:datas[id],
                                                likes: datas[likes],
                                                post_link:datas[post_link],
                                                comments_base:datas[comments_base],
                                                post_published_unix :datas[post_published_unix],
                                                comment_likes:datas[comment_likes],
                                                engagement:datas[engagement],
                                               //x:Math.cos(2 * count * Math.PI /json.response.graph.vertices.length),
                                               //y:Math.sin(2 * count * Math.PI /json.response.graph.vertices.length),
                                               
                                                x:Math.random(),
                                                y:Math.random(),
                                                //color:"#"+( Math.floor(Math.random() * 16777215).toString(16) + '000000').substr(0, 6),
                                                color:color
                                                //size:Math.random()
                                                
                                                });
                                   
                                   
			}
			 for(count=0;count<json.response.graph.edges.length;count++)
			{	
                                   
                                    datas[source]=json.response.graph.edges[count]._inV;
                                    datas[target]=json.response.graph.edges[count]._outV;
				    var rel= parseInt(datas[source]);
				    console.log("rellllllllllllllllllll",rel);
				      $scope.rels.push({
                                                 
                                                source: datas[source],
                                                target:datas[target],
                                                  
                                                });              
                                
			}
			console.log($scope.rels);
			render();
		}
		catch (e)
		{
			  console.log("error",e);
		}
			
	}
	
	//to save all the modal textboxes
	

	//to clear all the modal textboxes
	
	
	//to render the graph
	var render= function(){
		clear("svgVisualize");
	    	var width  = 960,height = 800,
		colors = d3.scale.ordinal().range(["#73FF36"]);
		var svg = d3.select('#svgVisualize')
			    .append('svg')
			    .attr('width', width)
			    .attr('height', height);

		// set up initial nodes and links
		// init D3 force layout
		var force = d3.layout.force()
				     .nodes($scope.types)
				     .links($scope.rels)
				     .size([width, height])
				     .linkDistance(10)
				     //.charge(-1000)
				     .on('tick', tick)
				     
		//Adding marker to the graph
		svg.append("svg:defs").selectAll("marker")
					.data(["end"])
					.enter().append("svg:marker")
					.attr("id", String)
					.attr("viewBox", "0 -5 10 10")
					.attr("refX", 7)
					.attr("refY", 0.4)
					.attr("markerWidth", 4)
					.attr("markerHeight", 4)
					.attr("orient", "auto")
					.append("svg:path")
					.attr("d", "M0,-5L10,0L0,5");
    


		// line displayed when dragging new nodes
		var drag_line = svg.append('svg:path')
				    .attr('class', 'link dragline hidden')
				    .attr('d', 'M0,0L0,0');

		// handles to link and node element groups
		var path = svg.append('svg:g').selectAll('path'),
		    circle = svg.append('svg:g').selectAll('g'),
		linktext=svg.append('svg:g').selectAll('linktext');
 
		function resetMouseVars() {
		  mousedown_node = null;
		  mouseup_node = null;
		  mousedown_link = null;
		}

		// update force layout (called automatically each iteration)
		function tick() {
		  // draw directed edges with proper padding from node centers
		    path.attr('d', function(d) {
		    var deltaX = d.target.x - d.source.x,
			deltaY = d.target.y - d.source.y,
			dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
			normX = deltaX / dist,
			normY = deltaY / dist,
			sourcePadding = d.left ? 17 : 12,
			targetPadding = d.right ? 17 : 12,
			sourceX = d.source.x + (sourcePadding * normX),
			sourceY = d.source.y + (sourcePadding * normY),
			targetX = d.target.x - (targetPadding * normX),
			targetY = d.target.y - (targetPadding * normY);
		    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
		     });
		  
		  
		      circle.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		      });
		force.start();
		}

	// update graph (called when needed)
	function restart() {
	  path = path.data($scope.rels);
	
	  // update existing links
	  path.classed('selected', function(d) { return d === selected_link; })
	  .attr("marker-end", "url(#end)");
	
	
	  // add new links
	  path.enter().append('svg:path')
	    .attr('class', 'link')
	    .classed('selected', function(d) { return d === selected_link; })
	    .attr("marker-end", "url(#end)")
	
	    .on('mousedown', function(d) {
	      if(d3.event.ctrlKey) return;
	
	      // select link
	      mousedown_link = d;
	      if(mousedown_link === selected_link) selected_link = null;
	      else selected_link = mousedown_link;
	      selected_node = null;
	      restart();
	    });
	
	    
	    
	    // remove old links
	    path.exit().remove();
	    circle = circle.data($scope.types, function(d) { return d.id;  });
	    
	    var g = circle.enter().append('svg:g');
	  
	    g.append('svg:circle')
	      .attr('class', 'node')
	      .attr('r', 3)
	      .style('fill', colors)
	      //to display on mouseover function
	      .on('mouseover', function(node) {
		  
		  
	      })
	      
	      .on('mousedown', function(d) {
		if(d3.event.ctrlKey) return;
	  
		// select node
		mousedown_node = d;
		if(mousedown_node === selected_node) selected_node = null;
		else selected_node = mousedown_node;
		selected_link = null;
	  
		// reposition drag line
		drag_line
		  .attr("marker-end", "url(#end)")
	  
		  .classed('hidden', false)
		  .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
	  
		restart();
	      })
	      .on('mouseup', function(d) {
		if(!mousedown_node) return;
		drag_line
		  .classed('hidden', true)
		  .attr("marker-end", "url(#end)");
	  
		// check for drag-to-self
		mouseup_node = d;
		if(mouseup_node === mousedown_node) { resetMouseVars(); return; }
	  
		  
		  source = mousedown_node;
		  target = mouseup_node;
		  console.log("sstype",source.TYPE);console.log("ttype",target.TYPE);
		  
				  console.log("inside request for links");
				  var request ={stype : source.TYPE, ttype:target.TYPE,rel:linkName ,aka : "known",fmap : "{'111':'11'}"};
				  sendRequestCreateLinks(request);
				  console.log("request sent ");
		var link;
		  link = {source: source, target: target
		  };
		  $scope.rels.push(link);
		  restart();
		  
		// select new link
		selected_link = link;
		selected_node = null;
		
		restart();
		
	      });

		// show node IDs
		//g.append('svg:text')
		//    .attr('x', 0)
		//    .attr('y', 4)
		//    .attr('class', 'id')
		//    .text(function(d) { return d.id; });
		//     
		// remove old nodes
		circle.exit().remove();
	      
		// set the graph in motion
		force.start();
	      }
	      
	      function mousemove() {
		if(!mousedown_node) return;
	      
		// update drag line
		drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
	      
		restart();
	      }
	      
	      function mouseup() {
		if(mousedown_node) {
		  // hide drag line
		  drag_line
		    .classed('hidden', true)
		    //.style('marker-end', '');
		    .attr("marker-end", "url(#end)");
	      
		}
	      
		// because :active only works in WebKit?
		svg.classed('active', false);
	      
		// clear mouse event vars
		resetMouseVars();
	      }
	      
	      // only respond once per keydown
	      var lastKeyDown = -1;
	      
	      function keydown() {
	      
		if(lastKeyDown !== -1) return;
		lastKeyDown = d3.event.keyCode;
	      
		// ctrl
		if(d3.event.keyCode === 17) {
		  circle.call(force.drag);
		  svg.classed('ctrl', true);
		}
	      
		if(!selected_node && !selected_link) return;
		switch(d3.event.keyCode) {
		  case 46: // delete the selected link
		     if(selected_link) {
			console.log("selected_link source type ",selected_link.source.TYPE);
			console.log("selected_link target type ",selected_link.target.TYPE);
			console.log("selected_link rel ",selected_link.relation);
			sendRequestDeleteLinks(selected_link.source.TYPE,selected_link.target.TYPE,selected_link.relation);
		      $scope.rels.splice($scope.rels.indexOf(selected_link), 1);
		      
		    }
		    selected_link = null;
		    
		    restart();
		    break;
		  case 66: 
		    if(selected_link) {
		      // set link direction to both left and right
		      selected_link.left = true;
		      selected_link.right = true;
		    }
		    restart();
		    break;
		  case 76: 
		    if(selected_link) {
		      // set link direction to left only
		      selected_link.left = true;
		      selected_link.right = false;
		    }
		    restart();
		    break;
		  case 82: 
		    if(selected_node) {
		      // toggle node reflexivity
		      selected_node.reflexive = !selected_node.reflexive;
		    } else if(selected_link) {
		      // set link direction to right only
		      selected_link.left = false;
		      selected_link.right = true;
		    }
		    restart();
		    break;
		}
	      
	      }
	      
	      function keyup() {
		lastKeyDown = -1;
	      
		// ctrl
		if(d3.event.keyCode === 17) {
		  circle
		    .on('mousedown.drag', null)
		    .on('touchstart.drag', null);
		  svg.classed('ctrl', false);
		}
	      }
	      
	      // app starts here
	      svg//.on('mousedown', mousedown)
		.on('mousemove', mousemove)
		.on('mouseup', mouseup);
	      d3.select(window)
		.on('keydown', keydown)
		.on('keyup', keyup);
	      restart();
		      }
		     
	      });

