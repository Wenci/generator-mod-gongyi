;
$(function() {
	var $stepVideo = $("#stepVideo");
	var $tagImg = $("#tagImg");
	var $tagImgWrap = $("#tagImgWrap");
	var $tagAudio = $("#tagImgWrap audio");
	var $titleAudio = $("#titleAudio");

	//click satrt btn
	$("#start").click(function(){
		$(".mask").hide();
		$titleAudio.play();
		$("#backgroundAudio").play();
	});

	//first step can click
	$(".step:eq(0)>img").show();
	$(".step:eq(0) .lock").hide();


	$(".step").find('img:eq(0)').click(function() {
		//视频后缀名
		var name = ['2a','2b','2c','2d','3a','3b','3c','3d','3e','3f'];

		var index = $(this).parent().attr('data-index');
		$tagAudio.pause();
		//更新视频路径
		$stepVideo.attr('src', './sco/video/04/4-' + name[index-1] + '.mp4').attr('data-index', index).replay();
	});

	//video playing
	$stepVideo.on('playing',function(){
		$titleAudio.pause();
		$tagAudio.pause();
		$tagImgWrap.hide();
	});

	$tagAudio.on('playing',function(){
		$titleAudio.pause();
	});

	//video end 
	$stepVideo.ended(function() {
		var index = $(this).attr('data-index');
		if (!index || index == "") {
			return;
		}
		$(".step:eq(" + index + ")")
		//unlock next
		.find('img').hide().eq(0).show();

		//set data-lock
		$(".step:eq(" + (index - 1) + ")").attr('data-lock', 'false');

		checkCanFinsish();
	});

	//click tag
	$(".tag").click(function() {
		var index = $(this).attr('data-index');
		$(this).attr('data-click', 'true');
		$tagImg.attr('src', 'sco/image/04/m03u04s01_btn0' + index + '.png');
		$stepVideo.pause();
		$tagAudio.attr('src', 'sco/audio/04/m03u04s01_2_' + index + '.mp3').replay();
		$tagImgWrap.show();
		checkCanFinsish();
	});
	//click close tag btn
	$tagImgWrap.find('.close').click(function() {
		$tagImgWrap.hide();
		$tagAudio.pause();
	});
	//tag audio end close tagWrap
	$tagAudio.ended(function(){
		$tagImgWrap.hide();
	});



	function checkCanFinsish() {
		//check step
		var canFinish = true;
		$('.step').each(function() {
			if ($(this).attr('data-lock') !== 'false') {
				canFinish = false;
			}
		});

		$('.tag').each(function() {
			if ($(this).attr('data-click') !== 'true') {
				canFinish = false;
			}
		});

		if (canFinish) {
			$('#finishBtn').show();
		}
	}

	//click finish btn
	$("#finishBtn").click(function(){
		playAnimate("finish");
	});

	function playAnimate(id) {
		$stepVideo.hide();
		var $wrap = $("#" + id);

		$wrap.show().find('img').hide();
		var index = 0;
		$wrap.find('audio').replay().ended(function(){
			$wrap.hide();
			$stepVideo.show();
			$("#classEnd").show();
		});
		return setInterval(function() {
			index = index % 2;
			$wrap.find("img").eq(index).show().end().eq((index + 1)%2).hide();
			index++;
		},400);
	}

});