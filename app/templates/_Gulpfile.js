var gulp = require('gulp');



var less = require('gulp-less');
//var livereload = require('gulp-livereload');
var connect = require('gulp-connect');


//connect server
gulp.task('connect',function(){
	connect.server({
		root:'package/',
		port:8080,
		livereload:true
	});
});

//html
gulp.task('html',function(){
	gulp.src('package/**/*.html')
	.pipe(connect.reload());
});

<% if(isUseLess) {%>
//less
gulp.task('less',function(){
	gulp.src('package/less/**/*.less')
	.pipe(less({compress:<%= isCompress %>}))
	.on('error',function(e){
		console.log(e);
	})
	.pipe(gulp.dest('package/css'))
	.pipe(connect.reload());
});
<% } %>
//javascript
gulp.task('js',function(){
	gulp.src('package/js/**/*.js')
	.pipe(connect.reload());
});

//watch
gulp.task('watch',function(){
	gulp.watch(['package/less/**/*.less'],['less']);
	gulp.watch(['package/**/*.html'],['html']);
	gulp.watch(['package/js/**/*.js'],['js']);
});



//default task

gulp.task('default',['less','connect','watch']);