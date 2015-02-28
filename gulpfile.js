var gulp = require('gulp'),
  connect = require('gulp-connect'),
  $ = require('gulp-load-plugins')();

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
    .pipe(connect.reload());
});



gulp.task('css', function () {
  return gulp.src(path.sourceStyle + 'style.styl')
    .pipe($.plumber())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest(path.buildStyle))
    .pipe(connect.reload());
});



gulp.task('js', function () {
  return gulp.src(path.sourceScript + '**/*.js')
    .pipe($.plumber())
    .pipe($.concat('script.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.buildScript))
    .pipe(connect.reload());
});



gulp.task('server', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', ['build'], function () {
  gulp.watch(path.sourceHtml + '*.html', ['html']);
  gulp.watch(path.sourceScript + '*.js', ['js']);
  gulp.watch(path.sourceStyle + '**/*.styl', ['css']);
});

gulp.task('deploy', ['build'], function () {
  gulp.src(path.build + '**/*')
    .pipe($.ghPages());
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('dev', ['server', 'watch']);
gulp.task('default', ['build']);
