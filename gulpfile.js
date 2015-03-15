var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso         = require('gulp-csso'),
    uglify       = require('gulp-uglify'),
    jade         = require('gulp-jade'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;
    tinylr       = require('tiny-lr'),
    express      = require('express'),
    app          = express(),
    marked       = require('marked'), // For :markdown filter in jade
    path         = require('path'),
    server       = tinylr();
    rename       = require("gulp-rename");
    gzip         = require('gulp-gzip');
    

var paths = {
  js: ['src/js/**/*.js'],
  scss: ['src/scss/**/*.scss'],
  jade: ['src/jade/**/*.jade']
}
 
// --- Basic Tasks ---
gulp.task('css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe( 
      sass( { 
        includePaths: ['src/scss/'],
        errLogToConsole: true
      } ) )
    .pipe(autoprefixer('last 2 version'))
    .pipe( csso() )
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(rename(function (path) {
        path.extname = ""
    }))
    .pipe( gulp.dest('dist/css/') )
    .pipe(reload({stream:true}));
});
 
gulp.task('js', function() {
  return gulp.src('src/js/footer-animation.js'),
         gulp.src('src/js/sticky-navigation.js'),
         gulp.src('src/js/lazysizes.js'),
         gulp.src('src/js/lazysizes-responsive-images.js'),
         gulp.src('src/js/lazysizes-config.js'),
         gulp.src('src/js/skrollr.js'),
         gulp.src('src/smoothState.js'),
         gulp.src('src/js/mobile-menu-icon.js'),
         gulp.src('src/js/final-touches.js'),
         gulp.src('src/js/init.js'),
         gulp.src('src/js/*.js')
    .pipe( uglify() )
    .pipe( concat('app.min.js'))
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(rename(function (path) {
        path.extname = ""
    }))
    .pipe( gulp.dest('dist/js/'))
    .pipe(reload({stream:true}));
});
 
gulp.task('templates', function() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(jade({ pretty: false}))
    .pipe(rename(function (path) {
        path.extname = ""
    }))
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(rename(function (path) {
        path.extname = ""
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('express', function() {
  app.use(require('connect-livereload')());
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});
 
gulp.task('watch', ['browser-sync'], function() {

  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.jade, ['templates']);
      
});
 
// BROWSER-SYNC reloads your browsers and devices so you don't have to.  
gulp.task('browser-sync', function() {
  var files = [
    'dist/css/*.css',
    'dist/js/*.js',
    'dist/**/*.html',
    'src/js/**/*.js',
    'src/jade/**/*.jade',
    'src/scss/**/*.scss'
  ];
  browserSync.init(files, {
    server: {
      baseDir: 'dist',     
    }
  });
});

// DEFAULT task 
gulp.task('default', ['css','js', 'templates', 'browser-sync', 'watch'], function () {
  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.jade, ['templates']);
});
