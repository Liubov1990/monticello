const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cleanCss = require('gulp-clean-css');
const gulpCopy = require('gulp-copy');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

const browserSyncReload = done => {
  browserSync.reload();
  done();
};

const copy = function () {
  return gulp.src('./src/assets/**/*').pipe(gulpCopy('./dist/', { prefix: 1 }));
};

const html = function () {
  return gulp
    .src('./src/*.html')
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('./dist/'));
};

const css = function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

const js = function () {
  return gulp.src('./src/js/**/*.js').pipe(terser()).pipe(gulp.dest('./dist/js/'));
};

const watchFiles = function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch('./src/scss/**/*.scss', css).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*js', js).on('change', browserSync.reload);
  gulp.watch(['./src/**/*.html', 'index.html'], gulp.series(html, browserSyncReload));
};

exports.default = gulp.series(copy, html, css, js, watchFiles);
exports.build = gulp.parallel(html, css, js);
