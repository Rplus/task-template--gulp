var gulp = require('gulp'),
  connect = require('gulp-connect'),
  $ = require('gulp-load-plugins')();

var build_path = '_publish';

var iconfont = {
  stylusFileName: '_font.styl'
};

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
    .pipe($.stylus({
      import: ['tmp/' + iconfont.stylusFileName]
    }))
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest(build_path + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src('app/script/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('script.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify())
    .pipe(gulp.dest(build_path + '/js'))
    .pipe(connect.reload());
});

gulp.task('png-min', ['png-clone-no-compress'],function () {
  return gulp.src(['app/images/**/*.png', '!app/images/**/*-no-compress.png'])
    .pipe($.optipng(['-o2', '-strip all']))
    .pipe(gulp.dest(build_path + '/img'));
});

gulp.task('png-clone-no-compress', function () {
  return gulp.src(['app/images/**/*-no-compress.png'])
    .pipe(gulp.dest(build_path + '/img'));
});

gulp.task('iconfont', function () {
  return gulp.src('app/font/svg/*.svg')
    .pipe($.iconfont({
      fontName: 'myfont',
      // centerHorizontally: true,
      // appendCodepoints: true,
      fixedWidth: true
    }))
    .on('codepoints', function(codepoints, options) {
      // console.log(codepoints, options);
      gulp.src('app/style/_font.styl-temp')
        .pipe($.consolidate('lodash', {
          glyphs: codepoints,
          fontName: 'myfont',
          fontPath: '../font/',
          className: 'appicon'
        }))
        .pipe($.rename(iconfont.stylusFileName))
        .pipe(gulp.dest('app/style/tmp'));
    })
    .pipe(gulp.dest(build_path + '/font'));
});

gulp.task('server', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', ['html', 'css', 'js'], function () {
  gulp.watch('app/html/*.html', ['html']);
  gulp.watch('app/script/*.js', ['js']);
  gulp.watch('app/style/**/*.styl', ['css']);
});

gulp.task('deploy', ['png-min'], function () {
  gulp.src(build_path + '/**/*')
    .pipe($.ghPages());
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('dev', ['server', 'watch']);
gulp.task('default', ['build']);
