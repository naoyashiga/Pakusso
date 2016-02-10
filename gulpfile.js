var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {
     sassPath: './resources/sass',
     jadePath: './resources/jade',
}

gulp.task('server', function() {
  gulp.src('public')
    .pipe($.webserver({
      livereload: true,
      port: 8001,
      fallback: 'public/',
      open: true
    }));
});

gulp.task('jade', function() {
  return gulp.src(config.jadePath + "/index.jade")
    .pipe(
		$.jade({
			pretty: true
		})
	)
    .pipe(gulp.dest('public/'));
});

gulp.task('css', function() { 
	return $.rubySass(config.sassPath + '/style.scss', {
            //style: 'compressed'
             style: 'expanded'
		})
    .on("error", $.notify.onError(function (error) {
    	return "Error: " + error.message;
         }))
        .pipe($.autoprefixer({ browsers: [ 'ie >= 10', 'android >= 4.1' ] }))
         .pipe(gulp.dest('./public/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
     gulp.watch(config.jadePath + '/**/*.jade', ['jade']); 
});

  gulp.task('default', ['watch','server']);