var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var path = (function () {
  var _path = {
    source: 'app/',
    build: '_publish/'
  };

  _path.sourceHtml = _path.source + 'html/';
  _path.sourceStyle = _path.source + 'style/';
  _path.sourceScript = _path.source + 'script/';
  _path.sourceImage = _path.source + 'images/';
  _path.sourceFont = _path.source + 'font/';

  _path.buildHtml = _path.build;
  _path.buildStyle = _path.build + 'css/';
  _path.buildScript = _path.build + 'js/';
  _path.buildImage = _path.build + 'img/';
  _path.buildFont = _path.build + 'font/';

  return _path;
})();



gulp.task('html', function () {
  return gulp.src(path.sourceHtml + '*.html')
    .pipe($.plumber())
    .pipe($.minifyHtml({
      quotes: true
    }))
    .pipe(gulp.dest(path.buildHtml))
});



gulp.task('css', function () {
  return gulp.src(path.sourceStyle + 'style.styl')
    .pipe($.plumber())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest(path.buildStyle))
});



gulp.task('js', function () {
  return gulp.src(path.sourceScript + '**/*.js')
    .pipe($.plumber())
    .pipe($.concat('script.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.buildScript))
});



// Watch Files For Changes & Reload
gulp.task('serve', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['_publish']
  });

  gulp.watch(path.sourceHtml + '*.html', ['html'], reload);
  gulp.watch(path.sourceScript + '*.js', ['js'], reload);
  gulp.watch(path.sourceStyle + '**/*.styl', ['css'], reload);
});



gulp.task('deploy', ['build'], function () {
  gulp.src(path.build + '**/*')
    .pipe($.ghPages());
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('default', ['build']);
