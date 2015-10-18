var content = [
	[1,"《咏史》",[[1,"game","history.html","true"]],"true"],
	[2,"说文解字话俭朴",[[1,"game","traditional-virtues-thrift.html","false"]],"false"],
	[3,"传统美德孕俭朴",[[1,"game","Plain.html","false"]],"false"],
	[4,"现代文明尚俭朴",[[1,"game","look-world.html","false"]],"false"]
];
var _index = 0;
$(window).ready(function(e) {
    init();
    Event.addEvent("iframeMutual",function(e){
		if(_pc==false)
		{
			$("div#top-element").width(0);
			$("div#top-element").animate({width:"100%"},1);
			$("div#bottom-element").width(0);
			$("div#bottom-element").animate({width:"100%"},1);
		}
	});
	
	if(scaleMode($("div#navigation"),true,"iframeMutual"))
	{
		alert("浏览器或浏览模式不支持当前页面的访问，\n请更换浏览器或切换浏览模式。");
	}else{
		$("div#home").css("visibility","visible");
	}
});

function locationPage(value,url)
{
	_headPage = true;
	navigation = false;
	var zID = target_id(value);
	targetSection(playList[zID][1],playList[zID][2]);
	_index = value;
	$("circle#circle-"+_index).attr("fill","#0F0");
	$("div#navigation").css("visibility","hidden");
	
	$("div#iframe-div").empty();
	$("div#iframe-div").append(IFRAME());
	$("video#video-video").attr("src","").css("visibility","hidden");
	$("iframe#content-iframe").attr("src",url).css("visibility","visible");
	
	clearInterval(_timer);
	_audio.src = "";
	$("div#animation").children("img").each(function(index,element) {
		$(this).css("visibility","hidden");
    });
	
	$("div#head-div").click(function(e) {
		_headPage = false;
		headPage();
	});
	if(_pc)
	{
		$("div#head-div").css("visibility","visible");
	}else{
		if($("div#bottom-element").css("visibility")=="visible")
		{
			if(_headPage) $("div#head-div").css("visibility","visible");
		}
	}
}

function audioEnd(element)
{
	clearInterval(_timer);
	$("div#animation").children("img").css("visibility","hidden");
	$("img#animation-1").css("visibility","visible");
}

// var _timer = null;
// var _audio = document.getElementById("audio");
// function playImage()
// {
// 	$("div#gif-div").css("visibility","hidden");
// 	_audio.src = "sco/audio/head.mp3";
// 	_audio.play();
// 	clearInterval(_timer);
// 	_timer = setInterval(animation,200);
// }

// var _animation = 0;
// function animation()
// {
// 	++_animation;
// 	$("img#animation-"+_animation).css("visibility","visible");
// 	if(_animation>0)
// 	{$("img#animation-"+(_animation-1)).css("visibility","hidden");}//隐藏下面的图层
// 	if(_animation == 4)
// 	{
// 		$("div#animation").children("img").css("visibility","hidden");
// 		_animation = 1;
// 		$("img#animation-1").css("visibility","visible");//显示第一帧；
// 	}
// }
function divAnimate()
{
    up_div_animate();
	down_div_animate();
}

var navigation = true;
function init()
{
	listElement();
}

function headPage()
{
	navigation = true;
	$("div#iframe-div").empty();
	$("div#iframe-div").append(IFRAME());
	$("video#video-video").attr("src","").css("visibility","hidden");
	
	clearInterval(_timer);
	_audio.src = "";
	$("div#animation").children("img").each(function(index,element) {
		$(this).css("visibility","hidden");
	});
	
	$("div#navigation").css("visibility","visible");
	$("img#animation-1").css("visibility","visible");
	$("div#head-div").css("visibility","hidden");
}

var lineID = 0;
var playList = [];
function listElement()
{
	var x = 10;
	var y = 10;
	var r = 8;
	var _cx = 0;
	var sWidth = 2;
	var offset = parseInt($("div#svg").width() / total(content)) - 1;
	var _circleElements = circle("circle-0",1,1,x,y,r,sWidth,"#0F0");
	var _lineElements = "";
	for(var i=0; i<content.length; i++)
	{
		_cx += (content[i][2].length*offset);
		_circleElements += circle("circle-"+String(i+1),lineID+content[i][2].length,i+2,_cx+x,y,r,sWidth,"#FFF");
		$("div#list-div").append(ElEMENT(P("list-p",i,"Verdana",36,"#FFF",content[i][1]),i*45));
		for(var j=0; j<content[i][2].length; j++)
		{
			playList.push(content[i][2][j]);
			_lineElements += line("line-"+String(lineID+1),lineID*offset+x,y,lineID*offset+offset+x,y,"#FFF",sWidth);
			lineID++;
		}
	}
	
	// $("div#svg").append(SVG(svg,"100%","100%",_lineElements+_circleElements));
	$("circle#circle-"+String(content.length)).attr("r",0);
	
	//zID:章ID,jID:节ID;
	//init_data(1,1);
	addHandler();
	$("div#navigation").css("visibility","visible");
}

//-----------------------------------JS调用--入口-----------------------------------
function init_data(zID,jID)
{
	targetSection(playList[target_id(zID-1)+jID-1][1],playList[target_id(zID-1)+jID-1][2]);
	_index = zID-1;
}

function target_id(zID)
{
	var _zID = 0;
	for(var i=0; i<zID; i++)
	{
		_zID += content[i][2].length;
	}
	return _zID;
}

var _pc = false;
var _headPage = false;
var events = ["touchstart","touchend"];
function addHandler()
{
	if(IsPC())
	{
		_pc = true;
		$("div#container").css("top","20px");
		$("div#bottom-element").append(TIP("tip")).css("height","80px").css("visibility","visible");
		
		$("div#up-div").bind("click",function(){
			if(navigation==false) showLine(false);
			}).css("visibility","visible");
		$("div#down-div").bind("click",function(){
			if(navigation==false) showLine(true);
			});
		$("div#volume-div").bind("click",function(){
			
			});
		$("div#full-screen-div").bind("click",function(){
				if(!document.webkitFullscreenElement)
				{
					$("img#all-img").css("visibility","visible");
					$("img#none-img").css("visibility","hidden");
					document.documentElement.webkitRequestFullScreen(); 
				}else{
					$("img#all-img").css("visibility","hidden");
					$("img#none-img").css("visibility","visible");
					document.webkitCancelFullScreen();
				}
			}).css("visibility","visible");
		
		$("circle").mouseover(function(e) {
			if($(this).attr("fill")=="#0F0")
			{
           	 	$("div#tip-div").css("left",parseInt($("div#svg").css("left"))+parseInt($(this).attr("cx")-15)).css("visibility","visible");
				$("p#text-p").text("知识点-"+$(this).attr("tip"));
			}
        }).mouseout(function(e) {
            $("div#tip-div").css("visibility","hidden");
        }).click(function(e) {
			//-----------------------------------JS调用--当前章节-----------------------------------
			if(navigation==false)
			{
				var _tip = target_id(parseInt($(this).attr("tip"))-1);
				targetSection(playList[_tip][1],playList[_tip][2]);
				_index = parseInt($(this).attr("tip"))-1;
				$("circle#circle-"+_index).attr("fill","#0F0");
			}
        });
		
		// $("div#select-bottom-div").click(function(){
		// 	listAnimate();
		// }).css("visibility","visible");
		
		
		$("div#head-div").click(function(e) {
			_headPage = false;
			headPage();
		});
		
	}else{
			$("div#up-div").bind("click",function(){
				if(navigation==false) showLine(false);
			});
			$("div#down-div").bind("click",function(){
				if(navigation==false) showLine(true);
			});
			var _rotate = false;
			$("div#defunct-div").bind("click",function(){
				if(_rotate)
				{
					_rotate = false;
					$(this).css("transform","rotate(0deg)");
				}else{
					_rotate = true;
					$(this).css("transform","rotate(180deg)");
				}
				divAnimate();
			}).css("visibility","visible");
				
			$("div#select-top-div").bind("click",function(){
				listAnimate();
			});
			
			$("div#head-div").click(function(e) {
				_headPage = false;
				headPage();
			});
		}
	
		//列表中单个选项
		$("p#list-p").click(function(e) {
			_headPage = true;
			navigation = false;
			$("div#navigation").css("visibility","hidden");
			$("div#head-div").click(function(e) {
				_headPage = false;
				headPage();
			}).css("visibility","visible");
			
			clearInterval(_timer);
			_audio.src = "";
			$("div#animation").children("img").each(function(index,element) {
				$(this).css("visibility","hidden");
			});
			//-----------------------------------JS调用--点击列表单个元素-----------------------------------
			var zID = target_id(parseInt($(this).attr("chapter")));
			targetSection(playList[zID][1],playList[zID][2]);
			_index = parseInt($(this).attr("chapter"));
			$("circle#circle-"+_index).attr("fill","#0F0");
			
			listAnimate();
		});
}

function up_div_animate()
{
	$("div#top-element").css("visibility","visible")
	if($("div#top-element").height()==0)
	{
		$("div#top-element").animate({top:0,height:80});
	}else{
		$("div#top-element").animate({top:0,height:0},function(){$(this).css("visibility","hidden")});
		}
}

function listAnimate()
{
	$("div#list-div").css("visibility","visible");
	if($("div#list-div").width()==0)
	{
		$("div#list-div").animate({right:5,width:300});
	}else{
		$("div#list-div").animate({right:5,width:0},function(){$(this).css("visibility","hidden")});
		}
}

function down_div_animate()
{
	$("div#bottom-element").css("visibility","visible");
	if($("div#bottom-element").height()==0)
	{
		if(parseInt($("div#bottom-element").css("bottom"))==80)
			$("div#bottom-element").css("bottom","0px");
		$("div#bottom-element").animate({bottom:0,height:80});
		if(_headPage) $("div#head-div").css("visibility","visible");
	}else{
		$("div#bottom-element").animate({bottom:0,height:0},function(){
			$(this).css("bottom","80px").css("visibility","hidden");
			$("div#head-div").css("visibility","hidden");
			});
		}
}

var path = "";
function targetSection(type,src)
{
	$("div#iframe-div").empty();
	$("div#iframe-div").append(IFRAME());
	$("video#video-video").attr("src","").css("visibility","hidden");
	$("iframe#content-iframe").attr("src","").css("visibility","hidden");
	switch(type)
	{
		case "video":
		{
			path = src;
			$("video#video-video").attr("src",path).bind("onended",videoEnd).css("visibility","visible");
			break;
		}
		
		case "game":
		{
			$("iframe#content-iframe").attr("src",src).css("visibility","visible");
			break;
		}
	}
	svgElement();
}

function svgElement()
{
	lineID = 0;
	$("circle").attr("fill","#FFF");
	$("line").css("stroke","#FFF");
	for(var i=0; i<content.length; i++)
	{
		if(content[i][3]=="true")
		{
			$("circle#circle-"+i).attr("fill","#0F0");
		}
		for(var j=0; j<content[i][2].length; j++)
		{
			lineID++;
			if(content[i][2][j][3]=="true") $("line#line-"+lineID).css("stroke","#0F0");
		}
	}
}

function showLine(state)
{
	if(state)
	{
		//-----------------------------------JS调用--下一个章节-----------------------------------
		if(_index < content.length-1)
		{
			_index++;
			targetSection(playList[target_id(_index)][1],playList[target_id(_index)][2]);
			$("circle#circle-"+_index).attr("fill","#0F0");
		}
	}else{
		//-----------------------------------JS调用--上一个章节-----------------------------------
		if(_index > 0)
		{
			_index--;
			targetSection(playList[target_id(_index)][1],playList[target_id(_index)][2]);
			$("circle#circle-"+_index).attr("fill","#0F0");
		}
	}
}

function videoEnd(element)
{
	$("video#video-video").attr("src","").css("visibility","hidden");
	$("iframe#content-iframe").attr("src",path).css("visibility","visible");
}



function TIP(id)
{
	var _circleRect = circleRect(5,5,76,30,"#666","#FFF",2);
	var _triangle1 = triangle(10,33,20,33,15,37,"#666","#FFF",2);
	var _triangle2 = triangle(10,30,20,30,15,37,"#666","#FFF",0);
	var _p = "<p id='text-p' style='left:0px; top:0px; right:0px; bottom:0px; text-align:center; font-size:9px; color:#FFF; position:absolute;'/>";
	return DIV(0,-10,SVG(id,"100%","100%",_circleRect+_triangle1+_triangle2+_p));
}

function total(value)
{
	var _length = 0;
	for(var i=0; i<value.length; i++)
	{
		_length += value[i][2].length;
	}
	return _length;
}

function ElEMENT(element,top)
{
	return "<div style='left:30px; top:"+top+"px; width:180px; height:45px; position:absolute;'>"+element+"<div style='left:0px; top:42px; width:100%; height:1px; background-color:#FFF; position:absolute;'></div></div>";
}

function IFRAME()
{
	return "<iframe id='content-iframe' frameborder='no' scrolling='no' style='left:0px; top:0px; width:100%; height:100%; position:absolute; visibility:hidden;'></iframe>";
}

function DIV(left,top,svg)
{
	return "<div id='tip-div' style='left:"+left+"px; top:"+top+"px; width:80px; height:40px; position:absolute; visibility:hidden;'>"+svg+"</div>";
}

function video(id,width,height,src)
{
	return "<video id='"+id+"' width='"+width+"' height='"+height+"' src='"+src+"' style='left:0px; top:0px; width:"+width+"px; height:"+height+"px; position:absolute;'></video>";
}

function P(id,chapter,family,size,color,text)
{
	return "<p id='"+id+"' chapter='"+chapter+"' style='font-family:"+family+"; font-size:"+size+"; color:"+color+"; cursor:pointer; text-align:left;'>"+text+"</p>";
}

function SVG(id,width,height,elements)
{
	return "<svg id='"+id+"' width='"+width+"' height='"+height+"'>"+elements+"</svg>";
}

function triangle(x1,y1,x2,y2,x3,y3,fill,stroke,sWidth)
{
	return "<path d='M "+x1+" "+y1+" L "+x2+" "+y2+" L "+x3+" "+y3+" Z'"+"' fill='"+fill+"' stroke='"+stroke+"' stroke-width='"+sWidth+"'/>";
}

function circle(id,sectionID,name,cx,cy,r,sWidth,fill)
{
	return "<circle id='"+id+"' sectionID='"+sectionID+"' tip='"+name+"' cx='"+cx+"' cy='"+cy+"' r='"+r+"' stroke-width='"+sWidth+"' fill='"+fill+"' style='cursor:pointer;'/>";
}

function circleRect(rx,ry,width,height,fill,stroke,sWidth)
{
	return "<rect x='2' y='2' rx='"+rx+"' ry='"+ry+"' width='"+width+"' height='"+height+"' style='fill:"+fill+";stroke:"+stroke+";stroke-width:"+sWidth+";'/>";
}

function line(id,x1,y1,x2,y2,stroke,sWidth)
{
	return "<line id='"+id+"' x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' style='stroke:"+stroke+";stroke-width:"+sWidth+";'/>";
}