;(function ($,window) {
	$.fn.extend({
		pause: function(){
			return this.each(function(){
				this.pause();
			});	
		},
		play: function(){
			return this.each(function(){
				this.play();
			});	
		},
		replay: function(){
			return this.each(function(){
				if(!isNaN(this.duration)){
					this.currentTime = 0;
				}
				this.play();
			});
		},
		ended: function(fn){
			return this.each(function(){
				$(this).on('ended',fn);
			});
		}

	});

})(jQuery,window);
