$(function(){
	$(".list-div").fadeOut(0);
	$(".suoxiao").css('visibility','hidden');
	//返回首页
	$(".head-div").on('click',function(){
		window.location.href = "home.html";
	});
	
	//显示导航
	$(".select-bottom-div").on('click',function(){
		$(".list-div").fadeToggle(800);
	});
	
	//全屏
	$(".fangda").on('click',function(){
		$(".fangda").css('visibility','hidden');
		$(".suoxiao").css('visibility','visible');
		launchFullscreen(document.documentElement);
	});

	//退出全屏
	$(".suoxiao").on('click',function(){
		$(".fangda").css('visibility','visible');
		$(".suoxiao").css('visibility','hidden');
		exitFullscreen();
	});

	//suofang
	var r = document.body.offsetWidth / window.screen.availWidth; 
	$(".nextDiv").css("transform","scale(" + r + ")");
	
});

$(window).resize(function(){
	var r = document.body.offsetWidth / window.screen.availWidth; 
	$(".nextDiv").css("transform","scale(" + r + ")");
});
$(function(){
	var r = document.body.offsetWidth / window.screen.availWidth; 
});


function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}