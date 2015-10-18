// JavaScript Document  
var flag = true;
function IsPC(){  
   var userAgentInfo = navigator.userAgent;  
   var Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}

function compatible()
{
	if(String(window.location).indexOf("http://") != -1)
	{
		return true;
	}
	if(ie("Trident") != -1)	
	{
		return true;
	}
	return false;
}

var version = "MSIE 8.0";
var _layout = false;
var _copatible = false;
function resizeWindow(display,layout,type)
{
	if(ie(version) == -1)
	{
		_layout = layout;
		_copatible = compatible();
		iframeMutualAdapt(type);
		mediaAdapt();//移动端声音适应
		resizeElement(display);
		$(window).resize(function(e) {
			resizeElement(display);
		});
	}else{
		return true;
	}
}

function resizeElement(display)
{
	display.find("*").each(function(index,element) {
		var left = toNumber($(this).css("left"));
		var top = toNumber($(this).css("top"));
		var width = toNumber($(this).css("width"));
		var height = toNumber($(this).css("height"));
		rectangle($(this),[true,true,true,true],[left,top,width,height],point($(this).parent()));
	});
	if(_layout)
	{
		if(_copatible)
		{
			adapting(display,$.cookie("width"),$.cookie("height"));
		}else{
			adapting(display,window.localStorage.getItem("width"),window.localStorage.getItem("height"));
		}
	}else{
		adapting(display,$(window).width(),$(window).height());
	}
}

function toNumber(value)
{
	return value.replace("px","");
}

function adapting(display,width,height)
{
	if(width > 0 && height > 0)
	{
		var screenWidth = 1280;
		var screenHeight = 700;
		if(screenWidth < screenHeight)
		{
			screenWidth = 700;
			screenHeight = 1280;
		}
		var proportion = screenWidth / screenHeight;
		var offsetWidth = width / screenWidth;
		var offsetHeight = height / screenHeight;
		if(offsetWidth < offsetHeight)
		{
			var _width =  width > screenWidth ? screenWidth : width;
			display.width(_width).height(_width / proportion);
		}else{
			var _height =  height > screenHeight ? screenHeight : height;
			display.width(_height * proportion).height(_height);
			}
		screenWidth	= width / 2;
		screenHeight = height / 2;
		offsetWidth = display.width() / 2;
		offsetHeight = display.height() / 2;
		display.css("left",screenWidth - offsetWidth).css("top",screenHeight - offsetHeight);
	}
}

function point(display)
{
	return [display.width(),display.height()];
}

function rectangle(display,resize,p1,p2)
{
	if(resize[0]) display.css("left",adaptLeft(p1[0],p2[0]));
	if(resize[1]) display.css("top",adaptTop(p1[1],p2[1]));
	if(resize[2]) display.css("width",adaptWidth(p1[2],p2[0]));
	if(resize[3]) display.css("height",adaptHeight(p1[3],p2[1]));
}

function adaptLeft(l,w)
{
	return l / w * 100 + "%";
}

function adaptTop(t,w)
{
	return t / w * 100 + "%";
}

function adaptWidth(w1,w2)
{
	return w1 / w2 * 100 + "%";
}

function adaptHeight(w1,w2)
{
	return w1 / w2 * 100 + "%";
}

function scaleMode(display,layout,type)
{
	if(ie(version) == -1)
	{
		_layout = layout;
		_copatible = compatible();
		iframeMutualAdapt(type);
		var modeUtil = {
				init:function(){
					mediaAdapt();//移动端声音适应
					modeUtil.setTransform();
					display.css("left",modeUtil.getWidth()).css("top",modeUtil.getHeight());
					$(window).resize(function(e) {
						modeUtil.setTransform();
						display.css("left",modeUtil.getWidth()).css("top",modeUtil.getHeight());
					});
				},
				getWidth:function(){
					var _width1 = null;
					if(_layout)
					{
						_width1 = (_copatible ? $.cookie("width") : window.localStorage.getItem("width")) / 2;
					}else{
						_width1 = $(window).width();
					}
					var _width2 = display.width() / 2;
					return _width1 - _width2;
				},
				getHeight:function(){
					var _height1 = null;
					if(_layout)
					{
						_height1 = (_copatible ? $.cookie("height") : window.localStorage.getItem("height")) / 2;
					}else{

						_height1 = $(window).height();
					}
					var _height2 = display.height() / 2;
					return _height1 - _height2;
				},
				setTransform:function(){
					var scaleX = null;
					var scaleY = null;
					if(_layout)
					{
						scaleX = (_copatible ? $.cookie("width") : window.localStorage.getItem("width")) / display.width();
						scaleY = (_copatible ? $.cookie("height") : window.localStorage.getItem("height")) / display.height();
					}else{
						scaleX = $(window).width();
						scaleY = $(window).height();
					}
					if(scaleX < scaleY)
					{
						scaleY = scaleX;
					}else{
						scaleX = scaleY;
						}
					display.css("transform","scale(" + scaleX + "," + scaleY + ")");
				}
		};
		modeUtil.init();
	}else{
		return true;
	}
}

var adaptID = "container";
function iframeMutualAdapt(type)
{
	if(type != undefined)
	{
		memory(type);
		$(window).resize(function(e) {
			memory(type);
		});
	}
}

function memory(type)
{
	if(_copatible)
	{
		$.cookie("width",$("div#"+adaptID).width());
		$.cookie("height",$("div#"+adaptID).height());
	}else{
		window.localStorage.setItem("width",$("div#"+adaptID).width());
		window.localStorage.setItem("height",$("div#"+adaptID).height());
	}
	Event.dispatchEvent(type);
}

var Event = {
    listener:{},
    addEvent:function(type,method)
	{
        if(typeof Event.listener[type] === "undefined")
		{
			Event.listener[type] = [];
		}
        Event.listener[type].push(method);
    },
    dispatchEvent:function(type)
	{
        var _listener = Event.listener[type];
		for(var i=0; i<_listener.length; i++)
		{
			if(typeof _listener[i] === "function")
			{
				_listener[i]({type:type});
			}
		}
    },
    removeEvent:function(type,method)
	{
    	var _listener = Event.listener[type];
        for(var i=0; i<_listener.length; i++)
		{
			if(_listener[i] === method)
			{
				Event.listener[type].splice(i,1);
			}
        }
    }
};

function ie(keyword)
{
	return String(window.navigator.userAgent).indexOf(keyword);
}

//移动端声音适应
var _targetAudio = [];
function mediaAdapt()
{
	var targetAudio = $("audio");
	if(IsPC()==false)
	{
		var _listener = false;
		window.addEventListener("focus",function(e){
			if(_listener==false)
			{
				_listener = true;
				if(_targetAudio.length > 0)
				{
					for(var i=0; i<_targetAudio.length; i++)
					{
						if(_targetAudio[i].paused)
						{
							_targetAudio[i].play();
						}
					}
				}
				_targetAudio = [];
			}
		});
		window.addEventListener("blur",function(e){
			_listener = false;
		});
		if(targetAudio)
		{
			if(targetAudio.length > 0)
			{
				for(var j=0; j<targetAudio.length; j++)
				{
					targetAudio[j].addEventListener("ended",function(e){
						for(var m=0; m<_targetAudio.length; m++)
						{
							if(_targetAudio[m].paused)
							{
								_targetAudio[m].src = "";
							}
						}
						_targetAudio = [];
					});
					targetAudio[j].addEventListener("pause",function(e){
						_targetAudio.push(e.currentTarget);
					});
				}
			}
		}
	}
	
	var targetVideo = $("video");
	if(targetVideo)
	{
		if(targetVideo.length > 0)
		{
			for(var n=0; n<targetVideo.length; n++)
			{
				targetVideo[n].poster = "sco/video/poster.png";
			}
		}
	}
}