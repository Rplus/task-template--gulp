var gulp = require('gulp'),
  connect = require('gulp-connect'),
  $ = require('gulp-load-plugins')();

var build_path = '_publish';

gulp.task('html', function () {
  return gulp.src('app/html/*.html')
    .pipe($.plumber())
    .pipe($.minifyHtml({
      quotes: true
    }))
    .pipe(gulp.dest(build_path))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src('app/style/style.styl')
    .pipe($.plumber())
    .pipe($.stylus())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest(build_path + '/css'))
    .pipe(connect.reload());
});

gulp.task('server', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', ['html', 'css'], function () {
  gulp.watch('app/html/*.html', ['html']);
  gulp.watch('app/style/**/*.styl', ['css']);
});

gulp.task('deploy', function () {
  gulp.src(build_path + '/**/*')
    .pipe($.ghPages());
});

gulp.task('build', ['html', 'css']);
gulp.task('dev', ['server', 'watch']);
gulp.task('default', ['build']);
